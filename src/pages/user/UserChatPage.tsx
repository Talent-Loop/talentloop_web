import { useState } from "react";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiSend,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

export default function UserChatPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessage("");
  };

  return (
    <div className="min-h-[1117px] bg-[#F7FAF9] left-10 pt-[5px]">
      <div className="left-10 pt-[22px]">
              {/* Title */}
              <h1 className="font-['Inter'] text-[24px] font-bold leading-8 text-[#24364B]">
                Messages
              </h1>
      </div>
              
      {/* Conversation header */}
      <div className="flex h-[75px] w-[1000px] mt-[30px] items-center gap-[27px] rounded-[10px] border border-[#D8E0DE] bg-[#F7FAF9] px-5">
        <button
          type="button"
          onClick={() => navigate("/dashboard/messages")}
          className="flex items-center justify-center"
        >
          <FiArrowLeft className="h-5 w-5 text-[#182536]" />
        </button>

        <div 
          onClick={() => navigate(`/dashboard/messages/${id}/profile`)}
          className="flex h-[54px] items-center gap-[17px]">
          <div className="relative">
            <img
              src="/src/assets/userHero.png"
              alt="Emeka Johnson"
              className="h-[54px] w-[54px] rounded-full object-cover"
            />

            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#22C55E]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-['Inter'] text-[15px] font-semibold text-[#182536]">
                Emeka Johnson
              </h1>

              <FiCheckCircle className="h-[14px] w-[14px] fill-[#1677FF] text-[#1677FF]" />
            </div>

            <p className="mt-1 font-['Inter'] text-[10px] text-[#1C6690]">
              Online
            </p>
          </div>
        </div>
      </div>

      {/* Job header */}
      <div className="mt-[50px] flex h-[64px] w-[1000px] items-center justify-between rounded-[14px] border border-black/10 bg-[#E8EDF1] px-4">
        <div>
          <h2 className="font-['Inter'] text-[15px] font-semibold text-[#182536]">
            Fix Kitchen Sink
          </h2>

          <p className="mt-1 font-['Inter'] text-[11px] text-[#7B858D]">
            3,000
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate(`./Recent-activities`)}
          className="rounded-full bg-[#D5E2EA] px-5 py-2 font-['Inter'] text-[11px] font-medium text-[#245C7E]"
        >
          View details
        </button>
      </div>

      {/* Messages */}
      <div className="mt-4 h-[382px] w-[1000px] space-y-6 overflow-y-auto">
        {/* Received */}
        <div className="flex items-start gap-3">
          <img
            src="/src/assets/userHero.png"
            alt=""
            className="mt-[22px] h-[23px] w-[23px] rounded-full object-cover"
          />

          <div>
            <div className="w-[270px] rounded-[16px] bg-[#F1F5F9] px-[17px] py-3">
              <p className="font-['Inter'] text-[14px] leading-[20px] text-[#44515D]">
                Hello! I can fix your sink today. I'll bring all the tools
                needed.
              </p>
            </div>

            <p className="mt-1 font-['Inter'] text-[10px] text-[#9BA8B2]">
              09:41 AM
            </p>
          </div>
        </div>

        {/* Sent */}
        <div className="flex justify-end">
          <div className="max-w-[304px]">
            <div className="rounded-[16px] rounded-br-[4px] bg-[#164D6F] px-4 py-4 text-white shadow-sm">
              <p className="font-['Inter'] text-[14px] leading-[20px]">
                Great! What time can you come?
              </p>
            </div>

            <div className="mt-1 flex justify-end">
              <span className="font-['Inter'] text-[10px] text-[#9BA8B2]">
                09:43 AM
              </span>
            </div>
          </div>
        </div>

        {/* Received */}
        <div className="flex items-start gap-3">
          <img
            src="/src/assets/userHero.png"
            alt=""
            className="mt-[22px] h-[23px] w-[23px] rounded-full object-cover"
          />

          <div>
            <div className="w-[270px] rounded-[16px] bg-[#F1F5F9] px-[17px] py-3">
              <p className="font-['Inter'] text-[14px] leading-[20px] text-[#44515D]">
                Hello! I can fix your sink today. I'll bring all the tools
                needed.
              </p>
            </div>

            <p className="mt-1 font-['Inter'] text-[10px] text-[#9BA8B2]">
              09:41 AM
            </p>
          </div>
        </div>

        {/* Sent */}
        <div className="flex justify-end">
          <div className="max-w-[304px]">
            <div className="rounded-[16px] rounded-br-[4px] bg-[#164D6F] px-4 py-4 text-white shadow-sm">
              <p className="font-['Inter'] text-[14px] leading-[20px]">
                Perfect, see you then!
              </p>
            </div>

            <div className="mt-1 flex justify-end">
              <span className="font-['Inter'] text-[10px] text-[#9BA8B2]">
                09:48 AM
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Message input */}
      <div className="mt-[163px] flex h-[44px] w-[1000px] items-center rounded-full border border-[#D8E0E4] bg-[#F3F6F7] px-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Type a message..."
          className="flex-1 bg-transparent font-['Inter'] text-[13px] outline-none placeholder:text-[#9EACB7]"
        />

        <button
          type="button"
          onClick={sendMessage}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#164D6F] text-white"
        >
          <FiSend className="h-4 w-4" />
        </button>
      </div>

      {/* Back */}
      <button
        type="button"
        onClick={() => navigate("/dashboard/messages")}
        className="mt-[51px] flex h-12 w-[90px] items-center justify-center rounded-lg border border-[#0D2E431F] bg-[#0D2E43] font-['Inter'] text-[14px] font-medium text-white"
      >
        Back
      </button>
    </div>
  );
}