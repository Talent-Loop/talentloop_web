
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiSearch, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../../assets/userHero.png";
import clientApi from "../../services/clientApi";

type ApiObject = Record<string, unknown>;

type Conversation = {
  id: string;
  name: string;
  message: string;
  time: string;
  category: string;
  unread: number;
  verified: boolean;
  online: boolean;
  avatar: string;
};

const DEFAULT_AVATAR = defaultAvatar;

const conversationVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
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

function getName(value: unknown): string {
  const object = asObject(value);

  return getText(
    object.fullName,
    object.name,
    object.displayName,
    object.username,
    object.email
  );
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

function getRelativeTime(value: unknown): string {
  if (typeof value !== "string" || !value) return "";

  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) return "";

  const minutes = Math.max(
    0,
    Math.floor((Date.now() - timestamp) / 60000)
  );

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return new Date(value).toLocaleDateString();
}

function mapConversation(
  value: unknown,
  currentUserId: string
): Conversation | null {
  const item = asObject(value);
  const id = getText(item._id, item.id, item.conversationId);

  if (!id) return null;

  const participants = Array.isArray(item.participants)
    ? item.participants
    : [];

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

  const lastMessage = asObject(item.lastMessage);
  const job = asObject(item.job);
  const service = asObject(job.service);

  const messageText =
    typeof item.lastMessage === "string"
      ? item.lastMessage
      : getText(
          lastMessage.content,
          lastMessage.text,
          lastMessage.message,
          item.lastMessageText,
          item.lastMessageContent
        );

  const unreadValue = Number(
    item.unreadCount ?? item.unreadMessagesCount ?? 0
  );

  return {
    id,
    name: getName(otherParticipant) || "Conversation",
    message: messageText || "No messages yet",
    time: getRelativeTime(
      lastMessage.createdAt ??
        item.lastMessageAt ??
        item.updatedAt ??
        item.createdAt
    ),
    category:
      getText(
        job.title,
        job.titleOfJob,
        service.name,
        job.category,
        item.jobTitle,
        item.category
      ) || "General conversation",
    unread:
      Number.isFinite(unreadValue) && unreadValue > 0
        ? unreadValue
        : 0,
    verified: Boolean(
      asObject(otherParticipant).isVerified ??
        asObject(otherParticipant).verified
    ),
    online: Boolean(asObject(otherParticipant).online),
    avatar: getAvatar(otherParticipant),
  };
}

export default function MessagesPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadConversations() {
      setLoading(true);
      setError("");

      try {
        const response = await clientApi.get("/conversations");
        const body = asObject(response.data);

        if (body.success === false) {
          throw new Error(
            getText(body.message) || "Unable to load conversations."
          );
        }

        const result = body.data;

        const list = Array.isArray(result)
          ? result
          : Array.isArray(asObject(result).data)
            ? (asObject(result).data as unknown[])
            : [];

        const currentUserId = getCurrentUserId();

        const mapped = list
          .map((item) => mapConversation(item, currentUserId))
          .filter((item): item is Conversation => item !== null);

        if (!cancelled) {
          setConversations(mapped);
        }
      } catch (err: unknown) {
        const errorObject = asObject(err);
        const responseObject = asObject(errorObject.response);
        const responseData = asObject(responseObject.data);

        if (!cancelled) {
          setError(
            getText(responseData.message, errorObject.message) ||
              "Unable to load your conversations. Please try again."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadConversations();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredConversations = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return conversations;

    return conversations.filter((conversation) =>
      `${conversation.name} ${conversation.message} ${conversation.category}`
        .toLowerCase()
        .includes(query)
    );
  }, [conversations, search]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="min-h-[1117px] bg-[#F7FAF9]"
    >
      <div className="left-10 pt-[22px]">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="font-['Inter'] text-[24px] font-bold leading-8 text-[#24364B]"
        >
          Messages
        </motion.h1>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18 }}
          whileHover={{
            borderColor: "#A7BAC5",
            boxShadow: "0px 4px 12px rgba(22, 77, 111, 0.05)",
          }}
          className="mt-[38px] flex h-[48px] w-full max-w-[748px] items-center rounded-full border border-[#D8E0DE] bg-[#F7FAF9] px-4 transition-colors"
        >
          <motion.span
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <FiSearch className="h-[19px] w-[19px] flex-shrink-0 text-[#6E7C87]" />
          </motion.span>

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name or email"
            className="ml-3 w-full bg-transparent font-['Inter'] text-[14px] text-[#24364B] outline-none placeholder:text-[#98A4AD]"
          />
        </motion.div>

        {/* Conversations */}
        <div className="mt-[50px] w-full max-w-[1000px] space-y-3">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="rounded-[10px] border border-[#D8E0DE] px-5 py-10 text-center font-['Inter'] text-[14px] text-[#7B858D]"
              >
                Loading conversations...
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-[10px] border border-red-200 bg-white px-5 py-8 text-center"
              >
                <p className="font-['Inter'] text-[14px] text-red-600">
                  {error}
                </p>

                <motion.button
                  type="button"
                  onClick={() => window.location.reload()}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="mt-4 rounded-lg bg-[#0D2E43] px-4 py-2 font-['Inter'] text-sm text-white"
                >
                  Try again
                </motion.button>
              </motion.div>
            ) : filteredConversations.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="rounded-[10px] border border-[#D8E0DE] px-5 py-12 text-center"
              >
                <h2 className="font-['Inter'] text-[16px] font-semibold text-[#182536]">
                  {search.trim()
                    ? "No matching conversations"
                    : "No conversations yet"}
                </h2>

                <p className="mt-2 font-['Inter'] text-[13px] text-[#7B858D]">
                  {search.trim()
                    ? "Try searching with a different name or keyword."
                    : "When you start chatting with a provider, your conversations will appear here."}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="conversation-list"
                initial="hidden"
                animate="visible"
                className="space-y-3"
                transition={{
                  staggerChildren: 0.09,
                  delayChildren: 0.05,
                }}
              >
                <AnimatePresence mode="popLayout">
                  {filteredConversations.map((conversation) => (
                    <motion.button
                      key={conversation.id}
                      layout
                      variants={conversationVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{
                        duration: 0.35,
                        ease: "easeOut",
                        layout: { duration: 0.25 },
                      }}
                      type="button"
                      onClick={() =>
                        navigate(`/dashboard/messages/${conversation.id}`)
                      }
                      whileHover={{
                        y: -3,
                        backgroundColor: "#FFFFFF",
                        boxShadow: "0px 6px 18px rgba(13, 46, 67, 0.06)",
                      }}
                      whileTap={{ scale: 0.995 }}
                      className="flex min-h-[114.5px] w-full items-center gap-4 rounded-[10px] border-b border-[#0D2E431F] px-5 py-4 text-left transition-colors"
                    >
                      {/* Avatar */}
                      <motion.div
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.2 }}
                        className="relative h-14 w-14 flex-shrink-0"
                      >
                        <img
                          src={conversation.avatar}
                          alt={conversation.name}
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = DEFAULT_AVATAR;
                          }}
                          className="h-14 w-14 rounded-full object-cover"
                        />

                        {conversation.online && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 350,
                              delay: 0.2,
                            }}
                            className="absolute bottom-0 right-0 h-[12px] w-[12px] rounded-full border-2 border-white bg-[#22C55E]"
                          />
                        )}
                      </motion.div>

                      {/* Conversation details */}
                      <div className="flex min-w-0 flex-1 flex-col justify-center gap-[2px]">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-2">
                            <span className="truncate font-['Inter'] text-[15px] font-semibold text-[#182536]">
                              {conversation.name}
                            </span>

                            {conversation.verified && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                }}
                              >
                                <FiCheckCircle className="h-[14px] w-[14px] flex-shrink-0 fill-[#1677FF] text-[#1677FF]" />
                              </motion.span>
                            )}
                          </div>

                          <span className="flex-shrink-0 font-['Inter'] text-[11px] text-[#15557A]">
                            {conversation.time}
                          </span>
                        </div>

                        <p className="truncate font-['Inter'] text-[13px] text-[#7B858D]">
                          {conversation.message}
                        </p>

                        <div className="mt-1">
                          <motion.span
                            whileHover={{ scale: 1.03 }}
                            className="inline-flex max-w-full truncate rounded-full border border-[#B8D0E0] bg-[#E7EEF3] px-3 py-1 font-['Inter'] text-[10px] font-medium text-[#164D6F]"
                          >
                            {conversation.category}
                          </motion.span>
                        </div>
                      </div>

                      {/* Unread count */}
                      <AnimatePresence>
                        {conversation.unread > 0 && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 350,
                            }}
                            className="flex h-5 min-w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#164D6F] px-2 font-['Inter'] text-[10px] font-semibold text-white"
                          >
                            {conversation.unread}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Back */}
        <motion.button
          type="button"
          onClick={() => navigate(-1)}
          whileHover={{
            scale: 1.04,
            backgroundColor: "#164D6F",
          }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="mt-[157px] flex h-12 w-[90px] items-center justify-center rounded-lg border border-[#0D2E431F] bg-[#0D2E43] font-['Inter'] text-[14px] font-medium text-white"
        >
          Back
        </motion.button>
      </div>
    </motion.div>
  );
}
