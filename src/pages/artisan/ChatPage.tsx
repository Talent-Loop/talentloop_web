import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCheck,
  Send,
  X,
} from "lucide-react";

import ArtisanHeader from "../../components/artisan/ArtisanHeader";
import ArtisanSidebar from "../../components/artisan/ArtisanSidebar";

type Message = {
  id: string;
  text: string;
  time: string;
  sender: "me" | "them";
};

type ApiMessage = {
  _id: string;
  senderId?: {
    _id?: string;
    name?: string;
  } | string;
  receiverId?: {
    _id?: string;
    name?: string;
  } | string;
  content?: string;
  text?: string;
  message?: string;
  createdAt?: string;
  sentAt?: string;
  isRead?: boolean;
};

export default function ChatPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const conversationId = location.state?.conversationId;
  const contactName = location.state?.name || "Ayo Adebayo";
  const jobTitle = location.state?.job || "Fix Kitchen Sink";

  const [messageText, setMessageText] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  /*
   * Mark the conversation as read when the chat page opens.
   */
  useEffect(() => {
    const markConversationAsRead = async () => {
      if (!conversationId) return;

      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) return;

      try {
        const response = await fetch(
          `https://backend-talentloop.onrender.com/api/v1/conversations/${conversationId}/read`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: "*/*",
            },
          }
        );

        const result = await response.json();

        console.log("MARK CONVERSATION AS READ RESPONSE:", result);

        if (!response.ok) {
          console.error(
            "MARK CONVERSATION AS READ ERROR:",
            result
          );
        }
      } catch (err) {
        console.error(
          "MARK CONVERSATION AS READ ERROR:",
          err
        );
      }
    };

    markConversationAsRead();
  }, [conversationId]);

  /*
   * Fetch messages for this conversation.
   */
  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversationId) {
        setError("Conversation not found.");
        setLoading(false);
        return;
      }

      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://backend-talentloop.onrender.com/api/v1/messages/${conversationId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: "*/*",
            },
          }
        );

        const result = await response.json();

        console.log("MESSAGES API RESPONSE:", result);

        if (!response.ok) {
          throw new Error(
            result?.message || "Failed to fetch messages."
          );
        }

        const apiMessages: ApiMessage[] = Array.isArray(
          result?.data
        )
          ? result.data
          : [];

        const currentUserId =
          localStorage.getItem("userId");

        const formattedMessages: Message[] =
          apiMessages.map((message) => {
            const senderId =
              typeof message.senderId === "string"
                ? message.senderId
                : message.senderId?._id;

            const isMine =
              currentUserId && senderId
                ? senderId === currentUserId
                : false;

            const messageTime =
              message.createdAt || message.sentAt;

            return {
              id: message._id,
              text:
                typeof message.content === "string"
                  ? message.content
                  : typeof message.text === "string"
                  ? message.text
                  : typeof message.message === "string"
                  ? message.message
                  : "",
              time: messageTime
                ? new Date(
                    messageTime
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "",
              sender: isMine ? "me" : "them",
            };
          });

        setMessages(formattedMessages);
      } catch (err) {
        console.error("MESSAGES FETCH ERROR:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load messages."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [conversationId]);

  /*
   * Send a new message.
   */
  const handleSendMessage = async () => {
    const trimmedMessage = messageText.trim();

    if (!trimmedMessage || sending) return;

    if (!conversationId) {
      setError("Conversation not found.");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      setError("You are not logged in.");
      return;
    }

    try {
      setSending(true);
      setError("");

      const response = await fetch(
        "https://backend-talentloop.onrender.com/api/v1/messages",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            Accept: "*/*",
          },
          body: JSON.stringify({
            conversationId: conversationId,
            content: trimmedMessage,
          }),
        }
      );

      const result = await response.json();

      console.log(
        "SEND MESSAGE API RESPONSE:",
        result
      );

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Failed to send message."
        );
      }

      /*
       * The API response has this structure:
       *
       * data: {
       *   message: {
       *     _id,
       *     conversationId,
       *     senderId,
       *     type,
       *     content,
       *     ...
       *   },
       *   conversation: {...}
       * }
       */

      const sentMessage: ApiMessage | undefined =
        result?.data?.message &&
        typeof result.data.message === "object"
          ? result.data.message
          : undefined;

      const messageContent =
        typeof sentMessage?.content === "string"
          ? sentMessage.content
          : trimmedMessage;

      const messageTime =
        sentMessage?.createdAt ||
        sentMessage?.sentAt ||
        new Date().toISOString();

      const newMessage: Message = {
        id:
          sentMessage?._id ||
          `local-${Date.now()}`,
        text: messageContent,
        time: new Date(
          messageTime
        ).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sender: "me",
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        newMessage,
      ]);

      setMessageText("");
    } catch (err) {
      console.error(
        "SEND MESSAGE ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to send message."
      );
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFA]">
      {/* Sidebar */}
      <ArtisanSidebar />

      {/* Main Content */}
      <main className="min-w-0 flex-1">
        <ArtisanHeader />

        <div className="flex min-h-[calc(100vh-76px)] flex-col px-8 pb-8 pt-10 md:px-12">
          {/* Page Title */}
          <h1 className="text-[22px] font-semibold text-[#27364A]">
            Messages
          </h1>

          {/* Conversation Header */}
          <div className="mt-8 flex items-center border-b border-[#E0E4E7] pb-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mr-5 flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-[#E9EEF1]"
            >
              <ArrowLeft
                size={19}
                strokeWidth={1.8}
                className="text-[#27364A]"
              />
            </button>

            {/* Avatar */}
            <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#D6D8D7] text-[14px] font-semibold text-[#27364A]">
              {contactName
                .split(" ")
                .map(
                  (word: string) =>
                    word[0]
                )
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>

            {/* Name */}
            <div className="ml-4">
              <h2 className="text-[15px] font-semibold text-[#182438]">
                {contactName}
              </h2>

              <p className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-[#3E8B62]">
                <span className="h-[6px] w-[6px] rounded-full bg-[#3E8B62]" />
                Online
              </p>
            </div>
          </div>

          {/* Job Information */}
          <div className="mt-6 flex min-h-[72px] items-center justify-between rounded-[8px] border border-[#E0E4E7] bg-[#F3F5F5] px-6">
            <div>
              <h3 className="text-[14px] font-semibold text-[#27364A]">
                {jobTitle}
              </h3>

              <p className="mt-1 text-[10px] font-medium tracking-wide text-[#929BA4]">
                JOB
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowDetails(true)
              }
              className="flex h-[32px] items-center rounded-[6px] border border-[#D5DADD] bg-white px-4 text-[11px] font-medium text-[#53616D] transition hover:bg-[#F8FAFA]"
            >
              View details
            </button>
          </div>

          {/* Chat Area */}
          <section className="mt-8 flex-1 overflow-y-auto pr-2">
            <div className="flex min-h-[390px] flex-col justify-end gap-6">
              {loading && (
                <div className="flex min-h-[390px] items-center justify-center">
                  <p className="text-[12px] text-[#929BA4]">
                    Loading messages...
                  </p>
                </div>
              )}

              {!loading && error && (
                <div className="flex min-h-[390px] items-center justify-center">
                  <p className="text-[12px] text-red-500">
                    {error}
                  </p>
                </div>
              )}

              {!loading &&
                !error &&
                messages.length === 0 && (
                  <div className="flex min-h-[390px] items-center justify-center">
                    <p className="text-[12px] text-[#929BA4]">
                      No messages yet.
                    </p>
                  </div>
                )}

              {!loading &&
                !error &&
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "me"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {/* Received message avatar */}
                    {message.sender === "them" && (
                      <div className="mr-3 mt-1 flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#D6D8D7] text-[10px] font-semibold text-[#27364A]">
                        {contactName
                          .split(" ")
                          .map(
                            (word: string) =>
                              word[0]
                          )
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                    )}

                    <div
                      className={`flex max-w-[470px] flex-col ${
                        message.sender === "me"
                          ? "items-end"
                          : "items-start"
                      }`}
                    >
                      <div
                        className={`rounded-[13px] px-5 py-3.5 text-[13px] leading-[1.55] ${
                          message.sender === "me"
                            ? "rounded-br-[4px] bg-[#173B56] text-white"
                            : "rounded-bl-[4px] border border-[#E0E4E7] bg-white text-[#27364A]"
                        }`}
                      >
                        {message.text}
                      </div>

                      <div
                        className={`mt-1.5 flex items-center gap-1.5 text-[9px] ${
                          message.sender === "me"
                            ? "text-[#929BA4]"
                            : "text-[#A0A7AF]"
                        }`}
                      >
                        <span>
                          {message.time}
                        </span>

                        {message.sender ===
                          "me" && (
                          <CheckCheck
                            size={12}
                            strokeWidth={2}
                            className="text-[#537B96]"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* Message Input */}
          <div className="mt-8 flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={messageText}
                onChange={(event) =>
                  setMessageText(
                    event.target.value
                  )
                }
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                disabled={sending}
                className="h-[54px] w-full rounded-[9px] border border-[#DCE1E5] bg-white px-5 pr-16 text-[13px] text-[#27364A] outline-none placeholder:text-[#A0A7AF] focus:border-[#9BAFC0] disabled:opacity-60"
              />

              <button
                type="button"
                onClick={handleSendMessage}
                disabled={sending}
                aria-label="Send message"
                className="absolute right-2.5 top-1/2 flex h-[38px] w-[38px] -translate-y-1/2 items-center justify-center rounded-full bg-[#173B56] text-white transition hover:bg-[#214D6D] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send
                  size={16}
                  strokeWidth={2}
                />
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && !loading && (
            <p className="mt-3 text-[11px] text-red-500">
              {error}
            </p>
          )}

          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-7 flex h-[43px] w-[82px] items-center justify-center gap-2 rounded-[7px] bg-[#172D4A] text-[12px] font-medium text-white transition hover:bg-[#203B5D]"
          >
            <ArrowLeft size={14} />
            Back
          </button>
        </div>
      </main>

      {/* Job Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-5">
          <div className="w-full max-w-[430px] rounded-[12px] border border-[#E0E4E7] bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-[17px] font-semibold text-[#182438]">
                Job details
              </h2>

              <button
                type="button"
                onClick={() =>
                  setShowDetails(false)
                }
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#7D8794] hover:bg-[#F1F3F4]"
              >
                <X size={17} />
              </button>
            </div>

            <div className="mt-6">
              <p className="text-[10px] font-medium uppercase tracking-wide text-[#929BA4]">
                Job
              </p>

              <h3 className="mt-1 text-[15px] font-semibold text-[#27364A]">
                {jobTitle}
              </h3>

              <div className="mt-5 border-t border-[#E5E8EA] pt-5">
                <p className="text-[10px] font-medium uppercase tracking-wide text-[#929BA4]">
                  Category
                </p>

                <p className="mt-1 text-[13px] text-[#27364A]">
                  Plumbing
                </p>
              </div>

              <div className="mt-5 border-t border-[#E5E8EA] pt-5">
                <p className="text-[10px] font-medium uppercase tracking-wide text-[#929BA4]">
                  Location
                </p>

                <p className="mt-1 text-[13px] text-[#27364A]">
                  Lekki Phase 1
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowDetails(false)
              }
              className="mt-7 h-[42px] w-full rounded-[7px] bg-[#172D4A] text-[12px] font-medium text-white transition hover:bg-[#203B5D]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}