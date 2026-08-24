import {
  Check,
  MessageSquare,
  ShieldCheck,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Job {
  id: number;
  title: string;
  category: string;
  status: "Pending" | "Progress" | "Completed" | "Cancelled";
  biddings: number;
  worker?: string;
}

interface JobProgressModalProps {
  job: Job;
  onClose: () => void;
}

export default function JobProgressModal({
  job,
  onClose,
}: JobProgressModalProps) {
  const navigate = useNavigate();
  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-[#0000004D]
      "
      onClick={onClose}
    >
      {/* =====================================================
          MODAL
      ====================================================== */}

      <div
        className="
          relative
          flex
          h-[519px]
          w-[466px]
          flex-col
          items-center
          rounded-[10px]
          bg-white
        "
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="
            absolute
            right-[16px]
            top-[14px]
            flex
            h-[28px]
            w-[28px]
            items-center
            justify-center
            rounded-full
            text-[#64748B]
            hover:bg-[#F1F5F9]
          "
          aria-label="Close"
        >
          <X className="h-[17px] w-[17px]" />
        </button>

        {/* =================================================
            INNER CONTENT
        ================================================== */}

        <div
          className="
            absolute
            left-[54px]
            top-[54px]
            flex
            w-[358px]
            flex-col
            gap-[16px]
          "
        >
          {/* =================================================
              JOB PROGRESS
          ================================================== */}

          <section
            className="
              flex
              h-[188px]
              w-[358px]
              flex-col
              rounded-[16px]
              border
              border-[#F1F5F9]
              bg-white
              p-[24px]
            "
          >
            <h2
              className="
                font-['Montserrat']
                text-[20px]
                font-semibold
                leading-[24px]
                text-[#1E293B]
              "
            >
              {job.title}
            </h2>

            <p
              className="
                mt-[4px]
                font-['Montserrat']
                text-[13px]
                font-normal
                leading-[18px]
                text-[#8294AA]
              "
            >
              {job.category} · Lekki, Lagos
            </p>

            {/* Progress */}
            <div className="mt-[22px] flex items-start justify-between">
              {/* Accepted */}
              <div className="flex w-[72px] flex-col items-center">
                <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#22C55E]">
                  <Check
                    className="h-[18px] w-[18px] text-white"
                    strokeWidth={3}
                  />
                </div>

                <span className="mt-[8px] font-['Montserrat'] text-[10px] font-medium text-[#64748B]">
                  Accepted
                </span>
              </div>

              {/* Line */}
              <div className="mt-[15px] h-[2px] w-[52px] bg-[#22C55E]" />

              {/* Progress */}
              <div className="flex w-[72px] flex-col items-center">
                <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#22C55E]">
                  <Check
                    className="h-[18px] w-[18px] text-white"
                    strokeWidth={3}
                  />
                </div>

                <span className="mt-[8px] font-['Montserrat'] text-[10px] font-medium text-[#64748B]">
                  Progress
                </span>
              </div>

              {/* Line */}
              <div className="mt-[15px] h-[2px] w-[52px] bg-[#22C55E]" />

              {/* Completed */}
              <div className="flex w-[72px] flex-col items-center">
                <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#22C55E]">
                  <Check
                    className="h-[18px] w-[18px] text-white"
                    strokeWidth={3}
                  />
                </div>

                <span className="mt-[8px] font-['Montserrat'] text-[10px] font-medium text-[#64748B]">
                  Completed
                </span>
              </div>
            </div>
          </section>

          {/* =================================================
              PRICE + WORKER
          ================================================== */}

          <section
            className="
              h-[142px]
              w-[358px]
              rounded-[16px]
              border
              border-[#F1F5F9]
              bg-white
              p-[24px]
              shadow-[0px_1px_2px_0px_#0000000D]
            "
          >
            {/* Price */}
            <div className="flex items-center justify-between">
              <span
                className="
                  font-['Montserrat']
                  text-[14px]
                  font-normal
                  text-[#8294AA]
                "
              >
                Agreed Price
              </span>

              <span
                className="
                  font-['Montserrat']
                  text-[18px]
                  font-semibold
                  text-[#111827]
                "
              >
                ₦3,000
              </span>
            </div>

            {/* Worker */}
            <div className="mt-[27px] flex items-center justify-between">
              <span
                className="
                  font-['Montserrat']
                  text-[14px]
                  font-normal
                  text-[#8294AA]
                "
              >
                Worker
              </span>

              <div className="flex items-center gap-[10px]">
                <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#164D6F] text-[9px] font-semibold text-white">
                  EJ
                </div>

                <span
                  className="
                    font-['Montserrat']
                    text-[14px]
                    font-medium
                    text-[#334155]
                  "
                >
                  Emeka Johnson
                </span>

                <ShieldCheck
                  className="h-[19px] w-[19px] fill-[#1267D6] text-[#1267D6]"
                />
              </div>
            </div>
          </section>

          {/* =================================================
              CHAT
          ================================================== */}

          <button
            type="button"
              onClick={() =>
                navigate(`/dashboard/messages/:id`)}
            className="
              flex
              h-[58px]
              w-[359px]
              items-center
              justify-center
              gap-[8px]
              rounded-[12px]
              border
              border-[#E2E8F0]
              bg-[#164D6F]
              px-[24px]
              py-[16px]
              font-['Montserrat']
              text-[14px]
              font-semibold
              text-white
              shadow-[0px_1px_2px_0px_#0000000D]
            "
          >
            <MessageSquare className="h-[18px] w-[18px]" />

            Chat
          </button>
        </div>
      </div>
    </div>
  );
}