import { useState } from "react";
import { FiSearch, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

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
    avatar: "/src/assets/userHero.png",
  },
  {
    id: 2,
    name: "Chinelo Okoro",
    message: "Thank you for the excellent service!",
    time: "1h ago",
    category: "Home Cleaning",
    avatar: "/src/assets/userHero.png",
  },
  {
    id: 3,
    name: "Chinelo Okoro",
    message: "Thank you for the excellent service!",
    time: "1h ago",
    category: "Home Cleaning",
    avatar: "/src/assets/userHero.png",
  },
  {
    id: 4,
    name: "Chinelo Okoro",
    message: "Thank you for the excellent service!",
    time: "1h ago",
    category: "Home Cleaning",
    avatar: "/src/assets/userHero.png",
  },
  {
    id: 5,
    name: "Chinelo Okoro",
    message: "Thank you for the excellent service!",
    time: "1h ago",
    category: "Home Cleaning",
    avatar: "/src/assets/userHero.png",
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
    <div className="min-h-[1117px] bg-[#F7FAF9]">
      <div className="left-10 pt-[22px]">
        {/* Title */}
        <h1 className="font-['Inter'] text-[24px] font-bold leading-8 text-[#24364B]">
          Messages
        </h1>

        {/* Search */}
        <div className="mt-[38px] flex h-[48px] w-[748px] items-center rounded-full border border-[#D8E0DE] bg-[#F7FAF9] px-4">
          <FiSearch className="h-[19px] w-[19px] text-[#6E7C87]" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or email"
            className="ml-3 w-full bg-transparent font-['Inter'] text-[14px] text-[#24364B] outline-none placeholder:text-[#98A4AD]"
          />
        </div>

        {/* Conversations */}
        <div className="mt-[50px] w-[1000px] space-y-3">
          {filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              type="button"
              onClick={() =>
                navigate(`/dashboard/messages/${conversation.id}`)
              }
              className="flex h-[114.5px] w-full items-center gap-4 rounded-[10px] border-b border-[#0D2E431F] px-5 text-left transition hover:bg-white/60"
            >
              {/* Avatar */}
              <div className="relative h-14 w-14 flex-shrink-0">
                <img
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="h-14 w-14 rounded-full object-cover"
                />

                {conversation.online && (
                  <span className="absolute bottom-0 right-0 h-[12px] w-[12px] rounded-full border-2 border-white bg-[#22C55E]" />
                )}
              </div>

              {/* Content */}
              <div className="flex h-[72.5px] min-w-0 flex-1 flex-col justify-center gap-[2px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-['Inter'] text-[15px] font-semibold text-[#182536]">
                      {conversation.name}
                    </span>

                    {conversation.verified && (
                      <FiCheckCircle className="h-[14px] w-[14px] fill-[#1677FF] text-[#1677FF]" />
                    )}
                  </div>

                  <span className="font-['Inter'] text-[11px] text-[#15557A]">
                    {conversation.time}
                  </span>
                </div>

                <p className="truncate font-['Inter'] text-[13px] text-[#7B858D]">
                  {conversation.message}
                </p>

                <div className="mt-1">
                  <span className="inline-flex rounded-full border border-[#B8D0E0] bg-[#E7EEF3] px-3 py-1 font-['Inter'] text-[10px] font-medium text-[#164D6F]">
                    {conversation.category}
                  </span>
                </div>
              </div>

              {/* Unread */}
              {conversation.unread && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#164D6F] px-2 font-['Inter'] text-[10px] font-semibold text-white">
                  {conversation.unread}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Back */}
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