import { useState } from "react";
import { FiSearch, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import userHero from "../../assets/userHero.png";

type Conversation = {
  id: number;
  name: string;
  message: string;
  time: string;
  category: string;
  unread?: number;
  verified?: boolean;
  online?: boolean;
  avatar: string;
};

const conversations: Conversation[] = [
  {
    id: 1,
    name: "Ayo Adebayo",
    message: "I can be there by 4:00 PM. Does that work?",
    time: "2m ago",
    category: "Kitchen Sink Repair",
    unread: 2,
    verified: true,
    online: true,
    avatar: userHero,
  },
  {
    id: 2,
    name: "Chinelo Okoro",
    message: "Thank you for the excellent service!",
    time: "1h ago",
    category: "Home Cleaning",
    avatar: userHero,
  },
  {
    id: 3,
    name: "Chinelo Okoro",
    message: "Thank you for the excellent service!",
    time: "1h ago",
    category: "Home Cleaning",
    avatar: userHero,
  },
  {
    id: 4,
    name: "Chinelo Okoro",
    message: "Thank you for the excellent service!",
    time: "1h ago",
    category: "Home Cleaning",
    avatar: userHero,
  },
  {
    id: 5,
    name: "Chinelo Okoro",
    message: "Thank you for the excellent service!",
    time: "1h ago",
    category: "Home Cleaning",
    avatar: userHero,
  },
];

export default function MessagesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredConversations = conversations.filter((conversation) =>
    `${conversation.name} ${conversation.message} ${conversation.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="w-full pb-10 pt-6 sm:pt-7">
      {/* Header */}
      <div className="w-full">
        <h1 className="font-['Inter'] text-[22px] font-bold leading-8 text-[#24364B] sm:text-[24px]">
          Messages
        </h1>

        {/* Search */}
        <div className="mt-6 flex h-12 w-full max-w-[748px] items-center rounded-full border border-[#D8E0DE] bg-white px-4 sm:mt-8">
          <FiSearch className="h-[19px] w-[19px] flex-shrink-0 text-[#6E7C87]" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or email"
            className="ml-3 min-w-0 flex-1 bg-transparent font-['Inter'] text-[14px] text-[#24364B] outline-none placeholder:text-[#98A4AD]"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="mt-8 w-full max-w-[1000px] space-y-2 sm:mt-10 sm:space-y-3">
        {filteredConversations.map((conversation) => (
          <button
            key={conversation.id}
            type="button"
            onClick={() =>
              navigate(`/dashboard/messages/${conversation.id}`)
            }
            className="
              flex
              w-full
              min-w-0
              items-center
              gap-3
              rounded-[10px]
              border-b
              border-[#0D2E431F]
              px-2
              py-4
              text-left
              transition
              hover:bg-white/60
              sm:gap-4
              sm:px-4
              sm:py-5
            "
          >
            {/* Avatar */}
            <div className="relative h-12 w-12 flex-shrink-0 sm:h-14 sm:w-14">
              <img
                src={conversation.avatar}
                alt={conversation.name}
                className="h-full w-full rounded-full object-cover"
              />

              {conversation.online && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#22C55E] sm:h-[12px] sm:w-[12px]" />
              )}
            </div>

            {/* Conversation content */}
            <div className="min-w-0 flex-1">
              {/* Name + time */}
              <div className="flex min-w-0 items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="truncate font-['Inter'] text-[14px] font-semibold text-[#182536] sm:text-[15px]">
                    {conversation.name}
                  </span>

                  {conversation.verified && (
                    <FiCheckCircle className="h-[14px] w-[14px] flex-shrink-0 fill-[#1677FF] text-[#1677FF]" />
                  )}
                </div>

                <span className="flex-shrink-0 font-['Inter'] text-[10px] text-[#15557A] sm:text-[11px]">
                  {conversation.time}
                </span>
              </div>

              {/* Message */}
              <p className="mt-1 truncate font-['Inter'] text-[12px] text-[#7B858D] sm:text-[13px]">
                {conversation.message}
              </p>

              {/* Category */}
              <div className="mt-2">
                <span className="inline-flex max-w-full truncate rounded-full border border-[#B8D0E0] bg-[#E7EEF3] px-3 py-1 font-['Inter'] text-[9px] font-medium text-[#164D6F] sm:text-[10px]">
                  {conversation.category}
                </span>
              </div>
            </div>

            {/* Unread */}
            {conversation.unread && (
              <span className="flex h-5 min-w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#164D6F] px-1.5 font-['Inter'] text-[10px] font-semibold text-white">
                {conversation.unread}
              </span>
            )}
          </button>
        ))}

        {/* Empty state */}
        {filteredConversations.length === 0 && (
          <div className="flex min-h-[160px] w-full items-center justify-center rounded-[12px] bg-white text-sm text-[#94A3B8]">
            No conversations found.
          </div>
        )}
      </div>

      {/* Back */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="
          mt-12
          flex
          h-12
          w-[90px]
          items-center
          justify-center
          rounded-lg
          border
          border-[#0D2E431F]
          bg-[#0D2E43]
          font-['Inter']
          text-[14px]
          font-medium
          text-white
          transition
          hover:bg-[#164D6F]
          sm:mt-16
        "
      >
        Back
      </button>
    </section>
  );
}