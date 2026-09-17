import { useState } from "react";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiSend,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import userHero from "../../assets/userHero.png";

export default function UserChatPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;

    // Add API message submission here.
    setMessage("");
  };

  return (
    <section className="w-full pb-10 pt-5 sm:pt-7">
      {/*  PAGE HEADER*/}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard/messages")}
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            transition
            hover:bg-[#E8EEF3]
            sm:hidden
          "
          aria-label="Back to messages"
        >
          <FiArrowLeft className="h-5 w-5 text-[#182536]" />
        </button>

        <h1
          className="
            font-['Inter']
            text-[22px]
            font-bold
            leading-8
            text-[#24364B]
            sm:text-[24px]
          "
        >
          Messages
        </h1>
      </div>

      {/* CONVERSATION HEADER*/}
      <div
        className="
          mt-6
          flex
          min-h-[75px]
          w-full
          items-center
          gap-3
          rounded-[10px]
          border
          border-[#D8E0DE]
          bg-[#F7FAF9]
          px-3
          py-3
          sm:mt-7
          sm:gap-5
          sm:px-5
        "
      >
        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/dashboard/messages")}
          className="
            hidden
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            transition
            hover:bg-[#E8EEF3]
            sm:flex
          "
          aria-label="Back to messages"
        >
          <FiArrowLeft className="h-5 w-5 text-[#182536]" />
        </button>

        {/* Worker */}
        <button
          type="button"
          onClick={() => navigate("/dashboard/profile")}
          className="
            flex
            min-w-0
            flex-1
            items-center
            gap-3
            text-left
            sm:gap-4
          "
        >
          <div className="relative shrink-0">
            <img
              src={userHero}
              alt="Emeka Johnson"
              className="
                h-11
                w-11
                rounded-full
                object-cover
                sm:h-[54px]
                sm:w-[54px]
              "
            />

            <span
              className="
                absolute
                bottom-0
                right-0
                h-3
                w-3
                rounded-full
                border-2
                border-white
                bg-[#22C55E]
              "
            />
          </div>

          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
              <h2
                className="
                  truncate
                  font-['Inter']
                  text-[14px]
                  font-semibold
                  text-[#182536]
                  sm:text-[15px]
                "
              >
                Emeka Johnson
              </h2>

              <FiCheckCircle
                className="
                  h-[14px]
                  w-[14px]
                  shrink-0
                  fill-[#1677FF]
                  text-[#1677FF]
                "
              />
            </div>

            <p
              className="
                mt-0.5
                font-['Inter']
                text-[10px]
                text-[#1C6690]
                sm:mt-1
              "
            >
              Online
            </p>
          </div>
        </button>
      </div>

      {/*JOB HEADER*/}
      <div
        className="
          mt-5
          flex
          min-h-[64px]
          w-full
          items-center
          justify-between
          gap-3
          rounded-[14px]
          border
          border-black/10
          bg-[#E8EDF1]
          px-3
          py-3
          sm:mt-8
          sm:px-4
        "
      >
        <div className="min-w-0">
          <h2
            className="
              truncate
              font-['Inter']
              text-[14px]
              font-semibold
              text-[#182536]
              sm:text-[15px]
            "
          >
            Fix Kitchen Sink
          </h2>

          <p
            className="
              mt-1
              font-['Inter']
              text-[10px]
              text-[#7B858D]
              sm:text-[11px]
            "
          >
            ₦3,000
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/dashboard/jobs")}
          className="
            shrink-0
            rounded-full
            bg-[#D5E2EA]
            px-3
            py-2
            font-['Inter']
            text-[10px]
            font-medium
            text-[#245C7E]
            transition
            hover:bg-[#C9DAE4]
            sm:px-5
            sm:text-[11px]
          "
        >
          View details
        </button>
      </div>

      {/*MESSAGE AREA */}
      <div
        className="
          mt-4
          flex
          h-[calc(100vh-420px)]
          min-h-[320px]
          max-h-[520px]
          w-full
          flex-col
          gap-5
          overflow-y-auto
          rounded-[10px]
          px-1
          py-2
          sm:gap-6
          sm:px-2
        "
      >
        {/* Received */}
        <div className="flex items-start gap-2.5 sm:gap-3">
          <img
            src={userHero}
            alt=""
            className="
              mt-5
              h-6
              w-6
              shrink-0
              rounded-full
              object-cover
            "
          />

          <div className="min-w-0 max-w-[82%] sm:max-w-[70%]">
            <div
              className="
                w-fit
                max-w-full
                rounded-[16px]
                bg-[#F1F5F9]
                px-4
                py-3
              "
            >
              <p
                className="
                  break-words
                  font-['Inter']
                  text-[13px]
                  leading-5
                  text-[#44515D]
                  sm:text-[14px]
                "
              >
                Hello! I can fix your sink today. I'll bring all the tools
                needed.
              </p>
            </div>

            <p
              className="
                mt-1
                font-['Inter']
                text-[9px]
                text-[#9BA8B2]
                sm:text-[10px]
              "
            >
              09:41 AM
            </p>
          </div>
        </div>

        {/* Sent */}
        <div className="flex justify-end">
          <div className="max-w-[82%] sm:max-w-[70%]">
            <div
              className="
                rounded-[16px]
                rounded-br-[4px]
                bg-[#164D6F]
                px-4
                py-3
                text-white
                shadow-sm
              "
            >
              <p
                className="
                  break-words
                  font-['Inter']
                  text-[13px]
                  leading-5
                  sm:text-[14px]
                "
              >
                Great! What time can you come?
              </p>
            </div>

            <div className="mt-1 flex justify-end">
              <span
                className="
                  font-['Inter']
                  text-[9px]
                  text-[#9BA8B2]
                  sm:text-[10px]
                "
              >
                09:43 AM
              </span>
            </div>
          </div>
        </div>

        {/* Received */}
        <div className="flex items-start gap-2.5 sm:gap-3">
          <img
            src={userHero}
            alt=""
            className="
              mt-5
              h-6
              w-6
              shrink-0
              rounded-full
              object-cover
            "
          />

          <div className="min-w-0 max-w-[82%] sm:max-w-[70%]">
            <div
              className="
                w-fit
                max-w-full
                rounded-[16px]
                bg-[#F1F5F9]
                px-4
                py-3
              "
            >
              <p
                className="
                  break-words
                  font-['Inter']
                  text-[13px]
                  leading-5
                  text-[#44515D]
                  sm:text-[14px]
                "
              >
                Hello! I can fix your sink today. I'll bring all the tools
                needed.
              </p>
            </div>

            <p
              className="
                mt-1
                font-['Inter']
                text-[9px]
                text-[#9BA8B2]
                sm:text-[10px]
              "
            >
              09:41 AM
            </p>
          </div>
        </div>

        {/* Sent */}
        <div className="flex justify-end">
          <div className="max-w-[82%] sm:max-w-[70%]">
            <div
              className="
                rounded-[16px]
                rounded-br-[4px]
                bg-[#164D6F]
                px-4
                py-3
                text-white
                shadow-sm
              "
            >
              <p
                className="
                  break-words
                  font-['Inter']
                  text-[13px]
                  leading-5
                  sm:text-[14px]
                "
              >
                Perfect, see you then!
              </p>
            </div>

            <div className="mt-1 flex justify-end">
              <span
                className="
                  font-['Inter']
                  text-[9px]
                  text-[#9BA8B2]
                  sm:text-[10px]
                "
              >
                09:48 AM
              </span>
            </div>
          </div>
        </div>
      </div>

      {/*  MESSAGE INPUT */}
      <div
        className="
          mt-4
          flex
          h-11
          w-full
          items-center
          rounded-full
          border
          border-[#D8E0E4]
          bg-[#F3F6F7]
          px-3
          sm:mt-5
          sm:h-[44px]
          sm:px-4
        "
      >
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Type a message..."
          className="
            min-w-0
            flex-1
            bg-transparent
            font-['Inter']
            text-[12px]
            outline-none
            placeholder:text-[#9EACB7]
            sm:text-[13px]
          "
        />

        <button
          type="button"
          onClick={sendMessage}
          disabled={!message.trim()}
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#164D6F]
            text-white
            transition
            hover:bg-[#123F5B]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
          aria-label="Send message"
        >
          <FiSend className="h-4 w-4" />
        </button>
      </div>

      {/* =====================================================
          BACK BUTTON
      ====================================================== */}

      <button
        type="button"
        onClick={() => navigate("/dashboard/messages")}
        className="
          mt-8
          hidden
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
          hover:bg-[#123B54]
          sm:flex
        "
      >
        Back
      </button>
    </section>
  );
}