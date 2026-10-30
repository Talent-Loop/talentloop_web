
import { useEffect, useMemo, useState } from "react";
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

  return getText(
    object.profilePhotoUrl,
    object.avatar,
    object.photo,
    object.imageUrl,
    object.photoUrl
  ) || DEFAULT_AVATAR;
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
  const lastSender = asObject(lastMessage.sender);

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
    <div className="min-h-[1117px] bg-[#F7FAF9]">
      <div className="left-10 pt-[22px]">
        <h1 className="font-['Inter'] text-[24px] font-bold leading-8 text-[#24364B]">
          Messages
        </h1>

        <div className="mt-[38px] flex h-[48px] w-full max-w-[748px] items-center rounded-full border border-[#D8E0DE] bg-[#F7FAF9] px-4">
          <FiSearch className="h-[19px] w-[19px] flex-shrink-0 text-[#6E7C87]" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name or email"
            className="ml-3 w-full bg-transparent font-['Inter'] text-[14px] text-[#24364B] outline-none placeholder:text-[#98A4AD]"
          />
        </div>

        <div className="mt-[50px] w-full max-w-[1000px] space-y-3">
          {loading ? (
            <div className="rounded-[10px] border border-[#D8E0DE] px-5 py-10 text-center font-['Inter'] text-[14px] text-[#7B858D]">
              Loading conversations...
            </div>
          ) : error ? (
            <div className="rounded-[10px] border border-red-200 bg-white px-5 py-8 text-center">
              <p className="font-['Inter'] text-[14px] text-red-600">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 rounded-lg bg-[#0D2E43] px-4 py-2 font-['Inter'] text-sm text-white"
              >
                Try again
              </button>
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="rounded-[10px] border border-[#D8E0DE] px-5 py-12 text-center">
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
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                type="button"
                onClick={() =>
                  navigate(`/dashboard/messages/${conversation.id}`)
                }
                className="flex min-h-[114.5px] w-full items-center gap-4 rounded-[10px] border-b border-[#0D2E431F] px-5 py-4 text-left transition hover:bg-white/60"
              >
                <div className="relative h-14 w-14 flex-shrink-0">
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
                    <span className="absolute bottom-0 right-0 h-[12px] w-[12px] rounded-full border-2 border-white bg-[#22C55E]" />
                  )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-center gap-[2px]">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="truncate font-['Inter'] text-[15px] font-semibold text-[#182536]">
                        {conversation.name}
                      </span>

                      {conversation.verified && (
                        <FiCheckCircle className="h-[14px] w-[14px] flex-shrink-0 fill-[#1677FF] text-[#1677FF]" />
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
                    <span className="inline-flex max-w-full truncate rounded-full border border-[#B8D0E0] bg-[#E7EEF3] px-3 py-1 font-['Inter'] text-[10px] font-medium text-[#164D6F]">
                      {conversation.category}
                    </span>
                  </div>
                </div>

                {conversation.unread > 0 && (
                  <span className="flex h-5 min-w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#164D6F] px-2 font-['Inter'] text-[10px] font-semibold text-white">
                    {conversation.unread}
                  </span>
                )}
              </button>
            ))
          )}
        </div>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-[157px] flex h-12 w-[90px] items-center justify-center rounded-lg border border-[#0D2E431F] bg-[#0D2E43] font-['Inter'] text-[14px] font-medium text-white"
        >
          Back
        </button>
      </div>
    </div>
  );
}
