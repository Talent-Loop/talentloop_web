
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiSend,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import clientApi from "../../services/clientApi";

type ApiObject = Record<string, unknown>;

type ChatMessage = {
  id: string;
  content: string;
  senderId: string;
  createdAt?: string;
};

type ChatDetails = {
  name: string;
  avatar: string;
  verified: boolean;
  online: boolean;
  jobTitle: string;
  agreedPrice: string;
  jobId: string;
};

const DEFAULT_AVATAR = "/src/assets/userHero.png";

const pageVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

const messageVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

function asObject(value: unknown): ApiObject {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as ApiObject)
    : {};
}

function getText(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value;
    if (typeof value === "number") return String(value);
  }

  return "";
}

function getId(value: unknown): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  const object = asObject(value);
  return getText(object._id, object.id, object.userId);
}

function getCurrentUserId(): string {
  try {
    const token =
      localStorage.getItem("accessToken") ||
      localStorage.getItem("token");

    if (!token) return "";

    const payload = token.split(".")[1];
    if (!payload) return "";

    const decoded = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    ) as ApiObject;

    return getText(decoded.sub, decoded.id, decoded.userId);
  } catch {
    return "";
  }
}

function getErrorMessage(error: unknown): string {
  const object = asObject(error);
  const response = asObject(object.response);
  const data = asObject(response.data);

  return getText(data.message, object.message) || "Something went wrong.";
}

function getTime(value?: string): string {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getAvatar(value: unknown): string {
  const object = asObject(value);

  return (
    getText(
      object.profilePhotoUrl,
      object.avatar,
      object.photo,
      object.imageUrl,
      object.photoUrl
    ) || DEFAULT_AVATAR
  );
}

function mapMessage(value: unknown): ChatMessage | null {
  const item = asObject(value);
  const sender = item.sender;

  const id = getText(item._id, item.id, item.messageId);
  const content = getText(item.content, item.text, item.message);
  const senderId = getId(item.senderId ?? sender);

  if (!id || !content) return null;

  const createdAt = getText(item.createdAt, item.sentAt);

  return {
    id,
    content,
    senderId,
    ...(createdAt ? { createdAt } : {}),
  };
}

function extractMessages(value: unknown): unknown[] {
  const body = asObject(value);
  const data = body.data;

  if (Array.isArray(data)) return data;

  const nested = asObject(data);

  if (Array.isArray(nested.data)) return nested.data;
  if (Array.isArray(nested.messages)) return nested.messages;

  if (Array.isArray(body.messages)) return body.messages;

  return [];
}

function extractConversation(value: unknown): ApiObject {
  const body = asObject(value);
  const data = asObject(body.data);

  return Object.keys(data).length > 0 ? data : body;
}

function mapChatDetails(value: unknown): ChatDetails {
  const item = extractConversation(value);
  const participants = Array.isArray(item.participants)
    ? item.participants
    : [];

  const currentUserId = getCurrentUserId();

  const otherParticipant =
    participants.find((participant) => {
      const participantId = getId(participant);
      return participantId && participantId !== currentUserId;
    }) ??
    item.otherUser ??
    item.recipient ??
    item.provider ??
    item.client ??
    item.participant;

  const user = asObject(otherParticipant);
  const job = asObject(item.job);

  return {
    name:
      getText(
        user.fullName,
        user.name,
        user.displayName,
        user.username,
        user.email
      ) || "Conversation",
    avatar: getAvatar(user),
    verified: Boolean(user.isVerified ?? user.verified),
    online: Boolean(user.online),
    jobTitle: getText(job.title, item.jobTitle) || "Conversation",
    agreedPrice: getText(
      job.agreedPrice,
      item.agreedPrice,
      job.budget,
      item.budget
    ),
    jobId: getText(job._id, job.id, item.jobId),
  };
}

export default function UserChatPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [details, setDetails] = useState<ChatDetails>({
    name: "Conversation",
    avatar: DEFAULT_AVATAR,
    verified: false,
    online: false,
    jobTitle: "Conversation",
    agreedPrice: "",
    jobId: "",
  });
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [sendError, setSendError] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserId = getCurrentUserId();

  const loadMessages = useCallback(async () => {
    if (!id) {
      setError("No conversation ID was provided.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await clientApi.get(`/messages/${id}`);
      const body = asObject(response.data);

      if (body.success === false) {
        throw new Error(
          getText(body.message) || "Unable to load messages."
        );
      }

      const loadedMessages = extractMessages(response.data)
        .map(mapMessage)
        .filter((item): item is ChatMessage => item !== null);

      setMessages(loadedMessages);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    let cancelled = false;

    async function loadConversationDetails() {
      if (!id) return;

      try {
        const response = await clientApi.get(`/conversations/${id}`);

        if (!cancelled) {
          setDetails(mapChatDetails(response.data));
        }
      } catch {
        // Keep safe fallback details if the conversation endpoint fails.
      }
    }

    void loadConversationDetails();

    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    void loadMessages();
  }, [loadMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const content = message.trim();

    if (!content || !id || sending) return;

    setSending(true);
    setSendError("");

    try {
      const response = await clientApi.post("/messages", {
        conversationId: id,
        content,
      });

      const body = asObject(response.data);

      if (body.success === false) {
        throw new Error(
          getText(body.message) || "Unable to send message."
        );
      }

      setMessage("");

      // Reload the conversation so the UI reflects the server's saved messages.
      await loadMessages();
    } catch (err: unknown) {
      setSendError(getErrorMessage(err));
    } finally {
      setSending(false);
    }
  };

  const viewJobDetails = () => {
    if (details.jobId) {
      navigate(`/dashboard/jobs/${details.jobId}`);
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen w-full min-w-0 overflow-x-hidden bg-[#F7FAF9] pb-8 pt-[5px]"
    >
      {/* Page heading */}
      <motion.div
        variants={pageVariants}
        className="pt-4 sm:pt-[22px]"
      >
        <h1 className="font-['Inter'] text-[21px] font-bold leading-8 text-[#24364B] sm:text-[24px]">
          Messages
        </h1>
      </motion.div>

      {/* Conversation header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-5 flex min-h-[75px] w-full max-w-[1000px] items-center gap-3 rounded-[10px] border border-[#D8E0DE] bg-[#F7FAF9] px-3 py-3 sm:mt-[30px] sm:gap-[27px] sm:px-5 sm:py-0"
      >
        <motion.button
          type="button"
          onClick={() => navigate("/dashboard/messages")}
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.9 }}
          className="flex flex-shrink-0 items-center justify-center"
          aria-label="Back to conversations"
        >
          <FiArrowLeft className="h-5 w-5 text-[#182536]" />
        </motion.button>

        <div className="flex min-w-0 items-center gap-3 sm:gap-[17px]">
          <div className="relative flex-shrink-0">
            <img
              src={details.avatar}
              alt={details.name}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = DEFAULT_AVATAR;
              }}
              className="h-11 w-11 rounded-full object-cover sm:h-[54px] sm:w-[54px]"
            />

            {details.online && (
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#22C55E]" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate font-['Inter'] text-[14px] font-semibold text-[#182536] sm:text-[15px]">
                {details.name}
              </h1>

              {details.verified && (
                <FiCheckCircle className="h-[14px] w-[14px] flex-shrink-0 fill-[#1677FF] text-[#1677FF]" />
              )}
            </div>

            <p className="mt-1 font-['Inter'] text-[10px] text-[#1C6690]">
              {details.online ? "Online" : "Conversation"}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Related job */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.18 }}
        className="mt-6 flex min-h-[64px] w-full max-w-[1000px] items-center justify-between gap-3 rounded-[14px] border border-black/10 bg-[#E8EDF1] px-3 py-3 sm:mt-[50px] sm:px-4"
      >
        <div className="min-w-0">
          <h2 className="truncate font-['Inter'] text-[14px] font-semibold text-[#182536] sm:text-[15px]">
            {details.jobTitle}
          </h2>

          {details.agreedPrice && (
            <p className="mt-1 font-['Inter'] text-[11px] text-[#7B858D]">
              ₦{Number(details.agreedPrice).toLocaleString("en-NG")}
            </p>
          )}
        </div>

        <motion.button
          type="button"
          onClick={viewJobDetails}
          disabled={!details.jobId}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="flex-shrink-0 rounded-full bg-[#D5E2EA] px-3 py-2 font-['Inter'] text-[10px] font-medium text-[#245C7E] disabled:cursor-not-allowed disabled:opacity-50 sm:px-5 sm:text-[11px]"
        >
          View details
        </motion.button>
      </motion.div>

      {/* Messages */}
      <div className="mt-4 h-[min(52vh,382px)] min-h-[260px] w-full max-w-[1000px] space-y-6 overflow-y-auto overflow-x-hidden rounded-lg px-1 py-2 sm:h-[382px] sm:px-0">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.p
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-10 text-center font-['Inter'] text-[13px] text-[#7B858D]"
            >
              Loading messages...
            </motion.p>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="px-4 py-10 text-center"
            >
              <p className="font-['Inter'] text-[13px] text-red-600">
                {error}
              </p>

              <motion.button
                type="button"
                onClick={() => void loadMessages()}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="mt-3 rounded-lg bg-[#164D6F] px-4 py-2 font-['Inter'] text-[12px] text-white"
              >
                Try again
              </motion.button>
            </motion.div>
          ) : messages.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="py-10 text-center font-['Inter'] text-[13px] text-[#7B858D]"
            >
              No messages yet. Send a message to start the conversation.
            </motion.p>
          ) : (
            <motion.div
              key="messages"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.06 },
                },
              }}
              className="space-y-6"
            >
              {messages.map((item) => {
                const isMine =
                  Boolean(currentUserId) &&
                  item.senderId === currentUserId;

                return (
                  <motion.div
                    key={item.id}
                    variants={messageVariants}
                    layout
                    className={
                      isMine
                        ? "flex justify-end"
                        : "flex items-start gap-2 sm:gap-3"
                    }
                  >
                    {!isMine && (
                      <img
                        src={details.avatar}
                        alt=""
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = DEFAULT_AVATAR;
                        }}
                        className="mt-[22px] h-[23px] w-[23px] flex-shrink-0 rounded-full object-cover"
                      />
                    )}

                    <div className="min-w-0 max-w-[85%] sm:max-w-[75%]">
                      <div
                        className={
                          isMine
                            ? "rounded-[16px] rounded-br-[4px] bg-[#164D6F] px-3 py-3 text-white shadow-sm sm:px-4 sm:py-4"
                            : "rounded-[16px] bg-[#F1F5F9] px-3 py-3 sm:px-[17px]"
                        }
                      >
                        <p
                          className={`whitespace-pre-wrap break-words font-['Inter'] text-[13px] leading-[20px] sm:text-[14px] ${
                            isMine ? "text-white" : "text-[#44515D]"
                          }`}
                        >
                          {item.content}
                        </p>
                      </div>

                      {item.createdAt && (
                        <p
                          className={`mt-1 font-['Inter'] text-[10px] text-[#9BA8B2] ${
                            isMine ? "text-right" : ""
                          }`}
                        >
                          {getTime(item.createdAt)}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="mt-5 flex h-[46px] w-full max-w-[1000px] items-center rounded-full border border-[#D8E0E4] bg-[#F3F6F7] px-3 sm:mt-[163px] sm:h-[44px] sm:px-4"
      >
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void sendMessage();
            }
          }}
          placeholder="Type a message..."
          disabled={loading || Boolean(error) || sending || !id}
          className="min-w-0 flex-1 bg-transparent font-['Inter'] text-[13px] outline-none placeholder:text-[#9EACB7] disabled:cursor-not-allowed"
        />

        <motion.button
          type="button"
          onClick={() => void sendMessage()}
          disabled={!message.trim() || loading || Boolean(error) || sending || !id}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Send message"
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#164D6F] text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <motion.span
            animate={sending ? { x: [0, 3, 0] } : { x: 0 }}
            transition={
              sending
                ? { repeat: Infinity, duration: 0.6 }
                : { duration: 0.2 }
            }
          >
            <FiSend className="h-4 w-4" />
          </motion.span>
        </motion.button>
      </motion.div>

      {sendError && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 max-w-[1000px] font-['Inter'] text-[12px] text-red-600"
        >
          {sendError}
        </motion.p>
      )}

      {/* Back */}
      <motion.button
        type="button"
        onClick={() => navigate("/dashboard/messages")}
        whileHover={{ y: -2, scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        className="mt-8 flex h-12 w-[90px] items-center justify-center rounded-lg border border-[#0D2E431F] bg-[#0D2E43] font-['Inter'] text-[14px] font-medium text-white sm:mt-[51px]"
      >
        Back
      </motion.button>
    </motion.div>
  );
}
