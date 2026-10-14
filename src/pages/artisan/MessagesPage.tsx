import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
} from "lucide-react";

import ArtisanHeader from "../../components/artisan/ArtisanHeader";
import ArtisanSidebar from "../../components/artisan/ArtisanSidebar";

interface Participant {
  userId: {
    _id: string;
    name: string;
  };
  role: string;
  lastReadAt: string | null;
}

interface Conversation {
  _id: string;
  participants: Participant[];
  jobId?: {
    _id: string;
    title: string;
    status: string;
  } | null;
  unread: number;
  createdAt: string;
  updatedAt: string;
  lastMessage?: {
    messageId: string;
    text: string;
    sentAt: string;
  } | null;
}

export default function MessagesPage() {
  const navigate = useNavigate();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchConversations = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setError("You are not authenticated.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://backend-talentloop.onrender.com/api/v1/conversations",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: "*/*",
            },
          }
        );

        const data = await response.json();

        console.log("CONVERSATIONS API RESPONSE:", data);

        if (!response.ok) {
          setError(
            data?.message || "Failed to fetch conversations."
          );
          return;
        }

        setConversations(data?.data || []);
      } catch (err) {
        console.error("CONVERSATIONS API ERROR:", err);
        setError(
          "Something went wrong while loading your messages."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleOpenChat = (conversation: Conversation) => {
    navigate("/messages/chat", {
      state: {
        conversationId: conversation._id,
        name: getOtherParticipantName(conversation),
        job: conversation.jobId?.title || "",
      },
    });
  };

  const getOtherParticipantName = (
    conversation: Conversation
  ) => {
    const currentUserId = localStorage.getItem("userId");

    const otherParticipant = conversation.participants.find(
      (participant) =>
        participant.userId?._id !== currentUserId
    );

    return (
      otherParticipant?.userId?.name ||
      conversation.participants[0]?.userId?.name ||
      "Unknown User"
    );
  };

  const formatTime = (dateString?: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const now = new Date();

    const difference =
      now.getTime() - date.getTime();

    const minutes = Math.floor(
      difference / (1000 * 60)
    );

    const hours = Math.floor(
      difference / (1000 * 60 * 60)
    );

    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    if (minutes < 1) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes}m ago`;
    }

    if (hours < 24) {
      return `${hours}h ago`;
    }

    if (days < 7) {
      return `${days}d ago`;
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const filteredConversations =
    conversations.filter((conversation) => {
      const name = getOtherParticipantName(
        conversation
      ).toLowerCase();

      const lastMessage =
        conversation.lastMessage?.text?.toLowerCase() || "";

      const job =
        conversation.jobId?.title?.toLowerCase() || "";

      const search = searchTerm.toLowerCase();

      return (
        name.includes(search) ||
        lastMessage.includes(search) ||
        job.includes(search)
      );
    });

  return (
    <div className="flex min-h-screen bg-[#F8FAFA]">
      {/* Sidebar */}
      <ArtisanSidebar />

      {/* Main Content */}
      <main className="min-w-0 flex-1">
        <ArtisanHeader />

        <div className="px-8 pb-12 pt-10 md:px-12">
          {/* Page Title */}
          <h1 className="text-[22px] font-semibold text-[#27364A]">
            Messages
          </h1>

          {/* Message Search */}
          <div className="relative mt-10 w-full max-w-[710px]">
            <Search
              size={18}
              strokeWidth={1.7}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7D8794]"
            />

            <input
              type="text"
              placeholder="Search name or email"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="h-[47px] w-full rounded-[24px] border border-[#DCE1E5] bg-white pl-11 pr-5 text-[13px] text-[#27364A] outline-none placeholder:text-[#A0A7AF] focus:border-[#9BAFC0]"
            />
          </div>

          {/* Messages List */}
          <section className="mt-12 w-full max-w-[1065px]">
            {loading && (
              <div className="py-10 text-center text-[13px] text-[#8994A2]">
                Loading messages...
              </div>
            )}

            {!loading && error && (
              <div className="py-10 text-center text-[13px] text-red-500">
                {error}
              </div>
            )}

            {!loading &&
              !error &&
              filteredConversations.length === 0 && (
                <div className="py-10 text-center text-[13px] text-[#8994A2]">
                  {searchTerm
                    ? "No messages found."
                    : "No conversations found."}
                </div>
              )}

            {!loading &&
              !error &&
              filteredConversations.length > 0 && (
                <div>
                  {filteredConversations.map(
                    (conversation, index) => {
                      const name =
                        getOtherParticipantName(
                          conversation
                        );

                      const initials = name
                        .split(" ")
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((part) =>
                          part.charAt(0).toUpperCase()
                        )
                        .join("");

                      return (
                        <article
                          key={conversation._id}
                          onClick={() =>
                            handleOpenChat(
                              conversation
                            )
                          }
                          className={`relative flex min-h-[112px] cursor-pointer items-center border-b border-[#E0E4E7] px-5 transition ${
                            index === 0
                              ? "bg-[#F8FAFA]"
                              : "bg-transparent hover:bg-white"
                          }`}
                        >
                          {/* Avatar */}
                          <div className="mr-5 flex h-[58px] w-[58px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D9DEE1]">
                            <div className="flex h-full w-full items-center justify-center bg-[#D7D9DA] text-[16px] font-semibold text-[#27364A]">
                              {initials || "U"}
                            </div>
                          </div>

                          {/* Message Content */}
                          <div className="min-w-0 flex-1 self-center">
                            <h2 className="text-[15px] font-semibold text-[#182438]">
                              {name}
                            </h2>

                            <p
                              className={`mt-1 text-[13px] ${
                                conversation.unread > 0
                                  ? "text-[#27364A]"
                                  : "text-[#969DA5]"
                              }`}
                            >
                              {conversation.lastMessage
                                ?.text ||
                                "No messages yet."}
                            </p>

                            {/* Job Tag */}
                            {conversation.jobId
                              ?.title && (
                              <span className="mt-2 inline-flex h-[23px] max-w-[500px] items-center overflow-hidden text-ellipsis whitespace-nowrap rounded-full border border-[#BFD0DE] bg-[#E6EDF2] px-3 text-[10px] font-medium text-[#205274]">
                                {conversation.jobId.title}
                              </span>
                            )}
                          </div>

                          {/* Right Side */}
                          <div className="flex h-full shrink-0 flex-col items-end justify-center gap-7 pl-5">
                            <span
                              className={`text-[10px] ${
                                conversation.unread > 0
                                  ? "text-[#205274]"
                                  : "text-[#A0AAB4]"
                              }`}
                            >
                              {formatTime(
                                conversation
                                  .lastMessage
                                  ?.sentAt ||
                                  conversation.updatedAt
                              )}
                            </span>

                            {conversation.unread >
                              0 && (
                              <div className="flex h-[21px] min-w-[21px] items-center justify-center rounded-full bg-[#205274] px-1.5 text-[10px] font-semibold text-white">
                                {conversation.unread}
                              </div>
                            )}
                          </div>
                        </article>
                      );
                    }
                  )}
                </div>
              )}
          </section>

          {/* Back Button */}
          <button
            type="button"
            onClick={handleBack}
            className="mt-[108px] flex h-[47px] w-[88px] items-center justify-center gap-2 rounded-[7px] bg-[#172D4A] text-[13px] font-medium text-white transition hover:bg-[#203B5D]"
          >
            <ArrowLeft size={15} />
            Back
          </button>
        </div>
      </main>
    </div>
  );
}