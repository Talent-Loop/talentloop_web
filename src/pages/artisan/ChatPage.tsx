
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  CheckCheck,
  Send,
  X,
} from "lucide-react";

import ArtisanHeader from "../../components/artisan/ArtisanHeader";
import ArtisanSidebar from "../../components/artisan/ArtisanSidebar";

type Message = {
  id: number;
  text: string;
  time: string;
  sender: "me" | "them";
};

export default function ChatPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const contactName = location.state?.name || "Ayo Adebayo";

  const [messageText, setMessageText] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I can fix your sink today. I'll bring all the tools needed.",
      time: "09:40 AM",
      sender: "me",
    },
    {
      id: 2,
      text: "Great! What time can you come?",
      time: "09:41 AM",
      sender: "them",
    },
    {
      id: 3,
      text: "I can be there by 4:00 PM. Does that work?",
      time: "09:42 AM",
      sender: "me",
    },
    {
      id: 4,
      text: "Perfect, see you then!",
      time: "09:43 AM",
      sender: "them",
    },
  ]);

  const handleSendMessage = () => {
    const trimmedMessage = messageText.trim();

    if (!trimmedMessage) return;

    const now = new Date();

    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages((previousMessages) => [
      ...previousMessages,
      {
        id: Date.now(),
        text: trimmedMessage,
        time: formattedTime,
        sender: "me",
      },
    ]);

    setMessageText("");
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
              AA
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
                Fix Kitchen Sink
              </h3>

              <p className="mt-1 text-[10px] font-medium tracking-wide text-[#929BA4]">
                JOB
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowDetails(true)}
              className="flex h-[32px] items-center rounded-[6px] border border-[#D5DADD] bg-white px-4 text-[11px] font-medium text-[#53616D] transition hover:bg-[#F8FAFA]"
            >
              View details
            </button>
          </div>

          {/* Chat Area */}
          <section className="mt-8 flex-1 overflow-y-auto pr-2">
            <div className="flex min-h-[390px] flex-col justify-end gap-6">
              {messages.map((message) => (
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
                      AA
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
                      <span>{message.time}</span>

                      {message.sender === "me" && (
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
                  setMessageText(event.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="h-[54px] w-full rounded-[9px] border border-[#DCE1E5] bg-white px-5 pr-16 text-[13px] text-[#27364A] outline-none placeholder:text-[#A0A7AF] focus:border-[#9BAFC0]"
              />

              <button
                type="button"
                onClick={handleSendMessage}
                aria-label="Send message"
                className="absolute right-2.5 top-1/2 flex h-[38px] w-[38px] -translate-y-1/2 items-center justify-center rounded-full bg-[#173B56] text-white transition hover:bg-[#214D6D]"
              >
                <Send size={16} strokeWidth={2} />
              </button>
            </div>
          </div>

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
                onClick={() => setShowDetails(false)}
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
                Fix Kitchen Sink
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
              onClick={() => setShowDetails(false)}
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

