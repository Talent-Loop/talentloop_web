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

  const handleChat = () => {
    navigate(`/dashboard/messages/${job.id}`);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#0000004D] p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[466px] rounded-[10px] bg-white"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-[#64748B] transition hover:bg-[#F1F5F9]"
        >
          <X className="h-[17px] w-[17px]" />
        </button>

        <div className="flex w-full flex-col gap-4 p-6 pt-[54px] sm:p-[54px]">
          {/* Job Progress */}
          <section className="w-full rounded-[16px] border border-[#F1F5F9] bg-white p-5 sm:p-6">
            <h2 className="font-['Montserrat'] text-[18px] font-semibold leading-6 text-[#1E293B] sm:text-[20px]">
              {job.title}
            </h2>

            <p className="mt-1 font-['Montserrat'] text-[13px] font-normal leading-[18px] text-[#8294AA]">
              {job.category} · Lekki, Lagos
            </p>

            {/* Progress */}
            <div className="mt-6 flex w-full items-start">
              {/* Accepted */}
              <div className="flex min-w-0 flex-1 flex-col items-center">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#22C55E]">
                  <Check
                    className="h-[18px] w-[18px] text-white"
                    strokeWidth={3}
                  />
                </div>

                <span className="mt-2 text-center font-['Montserrat'] text-[10px] font-medium text-[#64748B]">
                  Accepted
                </span>
              </div>

              {/* Line */}
              <div className="mt-[15px] h-[2px] flex-1 bg-[#22C55E]" />

              {/* Progress */}
              <div className="flex min-w-0 flex-1 flex-col items-center">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#22C55E]">
                  <Check
                    className="h-[18px] w-[18px] text-white"
                    strokeWidth={3}
                  />
                </div>

                <span className="mt-2 text-center font-['Montserrat'] text-[10px] font-medium text-[#64748B]">
                  Progress
                </span>
              </div>

              {/* Line */}
              <div className="mt-[15px] h-[2px] flex-1 bg-[#22C55E]" />

              {/* Completed */}
              <div className="flex min-w-0 flex-1 flex-col items-center">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#22C55E]">
                  <Check
                    className="h-[18px] w-[18px] text-white"
                    strokeWidth={3}
                  />
                </div>

                <span className="mt-2 text-center font-['Montserrat'] text-[10px] font-medium text-[#64748B]">
                  Completed
                </span>
              </div>
            </div>
          </section>

          {/* Price + Worker */}
          <section className="w-full rounded-[16px] border border-[#F1F5F9] bg-white p-5 shadow-[0px_1px_2px_0px_#0000000D] sm:p-6">
            {/* Price */}
            <div className="flex items-center justify-between gap-4">
              <span className="font-['Montserrat'] text-[14px] font-normal text-[#8294AA]">
                Agreed Price
              </span>

              <span className="font-['Montserrat'] text-[17px] font-semibold text-[#111827] sm:text-[18px]">
                ₦3,000
              </span>
            </div>

            {/* Worker */}
            <div className="mt-6 flex items-center justify-between gap-4 sm:mt-[27px]">
              <span className="shrink-0 font-['Montserrat'] text-[14px] font-normal text-[#8294AA]">
                Worker
              </span>

              <div className="flex min-w-0 items-center gap-2">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#164D6F] text-[9px] font-semibold text-white">
                  EJ
                </div>

                <span className="truncate font-['Montserrat'] text-[13px] font-medium text-[#334155] sm:text-[14px]">
                  {job.worker || "Emeka Johnson"}
                </span>

                <ShieldCheck className="h-[19px] w-[19px] shrink-0 fill-[#1267D6] text-[#1267D6]" />
              </div>
            </div>
          </section>

          {/* Chat */}
          <button
            type="button"
            onClick={handleChat}
            className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-[12px] border border-[#E2E8F0] bg-[#164D6F] px-5 py-4 font-['Montserrat'] text-[14px] font-semibold text-white shadow-[0px_1px_2px_0px_#0000000D] transition hover:bg-[#123F5C]"
          >
            <MessageSquare className="h-[18px] w-[18px]" />
            Chat
          </button>
        </div>
      </div>
    </div>
  );
}