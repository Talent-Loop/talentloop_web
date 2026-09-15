
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
} from "lucide-react";

import ArtisanHeader from "../../components/artisan/ArtisanHeader";
import ArtisanSidebar from "../../components/artisan/ArtisanSidebar";

const messages = [
  {
    name: "Ayo Adebayo",
    message: "Perfect, see you then!",
    time: "2m ago",
    job: "Kitchen Sink Repair",
    unread: 2,
    active: true,
  },
  {
    name: "Chinelo Okoro",
    message: "Thank you for the excellent service!",
    time: "1h ago",
    job: "Home Cleaning",
    unread: 0,
    active: false,
  },
  {
    name: "Chinelo Okoro",
    message: "Thank you for the excellent service!",
    time: "1h ago",
    job: "Home Cleaning",
    unread: 0,
    active: false,
  },
  {
    name: "Chinelo Okoro",
    message: "Thank you for the excellent service!",
    time: "1h ago",
    job: "Home Cleaning",
    unread: 0,
    active: false,
  },
  {
    name: "Chinelo Okoro",
    message: "Thank you for the excellent service!",
    time: "1h ago",
    job: "Home Cleaning",
    unread: 0,
    active: false,
  },
];

export default function MessagesPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleOpenChat = (name: string) => {
    navigate("/messages/chat", {
      state: {
        name,
      },
    });
  };

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
              className="h-[47px] w-full rounded-[24px] border border-[#DCE1E5] bg-white pl-11 pr-5 text-[13px] text-[#27364A] outline-none placeholder:text-[#A0A7AF] focus:border-[#9BAFC0]"
            />
          </div>

          {/* Messages List */}
          <section className="mt-12 w-full max-w-[1065px]">
            <div>
              {messages.map((message, index) => (
                <article
                  key={index}
                  onClick={() => handleOpenChat(message.name)}
                  className={`relative flex min-h-[112px] cursor-pointer items-center border-b border-[#E0E4E7] px-5 transition ${
                    message.active
                      ? "bg-[#F8FAFA]"
                      : "bg-transparent hover:bg-white"
                  }`}
                >
                  {/* Avatar */}
                  <div className="mr-5 flex h-[58px] w-[58px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D9DEE1]">
                    {message.name === "Ayo Adebayo" ? (
                      <div className="flex h-full w-full items-center justify-center bg-[#D6D8D7] text-[16px] font-semibold text-[#27364A]">
                        AA
                      </div>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#D7D9DA] text-[16px] font-semibold text-[#27364A]">
                        CO
                      </div>
                    )}
                  </div>

                  {/* Message Content */}
                  <div className="min-w-0 flex-1 self-center">
                    <h2 className="text-[15px] font-semibold text-[#182438]">
                      {message.name}
                    </h2>

                    <p
                      className={`mt-1 text-[13px] ${
                        message.active
                          ? "text-[#27364A]"
                          : "text-[#969DA5]"
                      }`}
                    >
                      {message.message}
                    </p>

                    {/* Job Tag */}
                    <span className="mt-2 inline-flex h-[23px] items-center rounded-full border border-[#BFD0DE] bg-[#E6EDF2] px-3 text-[10px] font-medium text-[#205274]">
                      {message.job}
                    </span>
                  </div>

                  {/* Right Side */}
                  <div className="flex h-full shrink-0 flex-col items-end justify-center gap-7 pl-5">
                    <span
                      className={`text-[10px] ${
                        message.active
                          ? "text-[#205274]"
                          : "text-[#A0AAB4]"
                      }`}
                    >
                      {message.time}
                    </span>

                    {message.unread > 0 && (
                      <div className="flex h-[21px] min-w-[21px] items-center justify-center rounded-full bg-[#205274] px-1.5 text-[10px] font-semibold text-white">
                        {message.unread}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
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

