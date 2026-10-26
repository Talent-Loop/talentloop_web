
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import clientApi from "../../services/clientApi";
import {
  Check,
  MessageSquare,
  ShieldCheck,
  X,
} from "lucide-react";

type JobStatus = "Pending" | "Progress" | "Completed" | "Cancelled";

interface Job {
  id: number;
  _id: string;
  title: string;
  category: string;
  status: JobStatus;
  biddings: number;
  worker?: string;
  providerId?: string | { _id?: string; id?: string };
  provider?:
    | string
    | {
        _id?: string;
        id?: string;
        name?: string;
        fullName?: string;
      };
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
  const [openingChat, setOpeningChat] = useState(false);

  const workerName =
    job.worker ??
    (typeof job.provider === "object" && job.provider
      ? job.provider.fullName ?? job.provider.name
      : undefined);

  const providerId =
    typeof job.providerId === "string"
      ? job.providerId
      : job.providerId?._id ??
        job.providerId?.id ??
        (typeof job.provider === "object" && job.provider
          ? job.provider._id ?? job.provider.id
          : undefined);

  const initials = workerName
    ? workerName
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  const handleOpenChat = async () => {
    if (openingChat) return;

    if (!providerId || !job._id) {
      toast.error(
        "Chat is available when a worker has been assigned."
      );
      return;
    }

    setOpeningChat(true);

    try {
      const response = await clientApi.post("/conversations", {
        recipientId: providerId,
        jobId: job._id,
      });

      const body = response.data;

    
      const data = body?.data;

      const conversation =
        data?.conversation ??
        data?.data?.conversation ??
        data?.data ??
        data ??
        body?.conversation ??
        body;

      

      const conversationId =
        typeof conversation === "string"
          ? conversation
          : conversation?._id ??
            conversation?.id ??
            conversation?.conversationId;

     

      if (
        typeof conversationId !== "string" ||
        !/^[a-f\d]{24}$/i.test(conversationId)
      ) {
        toast.error(
          "The conversation could not be opened. Please try again."
        );
        return;
      }

      onClose();
      navigate(`/dashboard/messages/${conversationId}`);
    } catch (error: unknown) {
      console.error("Error opening conversation:", error);

      const message =
        typeof error === "object" &&
        error !== null &&
        "response" in error
          ? (
              error as {
                response?: {
                  data?: { message?: string | string[] };
                };
              }
            ).response?.data?.message
          : undefined;

      toast.error(
        Array.isArray(message)
          ? message.join(", ")
          : message ||
              "Unable to open chat. Please try again."
      );
    } finally {
      setOpeningChat(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0000004D]"
      onClick={onClose}
    >
      <div
        className="relative flex h-[519px] w-[466px] flex-col items-center rounded-[10px] bg-white"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-[16px] top-[14px] flex h-[28px] w-[28px] items-center justify-center rounded-full text-[#64748B] hover:bg-[#F1F5F9]"
          aria-label="Close"
        >
          <X className="h-[17px] w-[17px]" />
        </button>

        <div className="absolute left-[54px] top-[54px] flex w-[358px] flex-col gap-[16px]">
          <section className="flex h-[188px] w-[358px] flex-col rounded-[16px] border border-[#F1F5F9] bg-white p-[24px]">
            <h2 className="font-['Montserrat'] text-[20px] font-semibold leading-[24px] text-[#1E293B]">
              {job.title}
            </h2>

            <p className="mt-[4px] font-['Montserrat'] text-[13px] font-normal leading-[18px] text-[#8294AA]">
              {job.category}
            </p>

            <div className="mt-[22px] flex items-start justify-between">
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

              <div className="mt-[15px] h-[2px] w-[52px] bg-[#22C55E]" />

              <div className="flex w-[72px] flex-col items-center">
                <div
                  className={`flex h-[32px] w-[32px] items-center justify-center rounded-full ${
                    job.status === "Progress" ||
                    job.status === "Completed"
                      ? "bg-[#22C55E]"
                      : "bg-[#DCE4E9]"
                  }`}
                >
                  {job.status === "Progress" ||
                  job.status === "Completed" ? (
                    <Check
                      className="h-[18px] w-[18px] text-white"
                      strokeWidth={3}
                    />
                  ) : null}
                </div>

                <span className="mt-[8px] font-['Montserrat'] text-[10px] font-medium text-[#64748B]">
                  Progress
                </span>
              </div>

              <div className="mt-[15px] h-[2px] w-[52px] bg-[#DCE4E9]" />

              <div className="flex w-[72px] flex-col items-center">
                <div
                  className={`flex h-[32px] w-[32px] items-center justify-center rounded-full ${
                    job.status === "Completed"
                      ? "bg-[#22C55E]"
                      : "bg-[#DCE4E9]"
                  }`}
                >
                  {job.status === "Completed" ? (
                    <Check
                      className="h-[18px] w-[18px] text-white"
                      strokeWidth={3}
                    />
                  ) : null}
                </div>

                <span className="mt-[8px] font-['Montserrat'] text-[10px] font-medium text-[#64748B]">
                  Completed
                </span>
              </div>
            </div>
          </section>

          <section className="h-[142px] w-[358px] rounded-[16px] border border-[#F1F5F9] bg-white p-[24px] shadow-[0px_1px_2px_0px_#0000000D]">
            <div className="flex items-center justify-between">
              <span className="font-['Montserrat'] text-[14px] font-normal text-[#8294AA]">
                Status
              </span>

              <span className="font-['Montserrat'] text-[14px] font-semibold text-[#334155]">
                {job.status === "Progress"
                  ? "In Progress"
                  : job.status}
              </span>
            </div>

            <div className="mt-[27px] flex items-center justify-between">
              <span className="font-['Montserrat'] text-[14px] font-normal text-[#8294AA]">
                Worker
              </span>

              <div className="flex items-center gap-[10px]">
                <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#164D6F] text-[9px] font-semibold text-white">
                  {initials}
                </div>

                <span className="font-['Montserrat'] text-[14px] font-medium text-[#334155]">
                  {workerName ?? "Not assigned"}
                </span>

                {workerName ? (
                  <ShieldCheck className="h-[19px] w-[19px] fill-[#1267D6] text-[#1267D6]" />
                ) : null}
              </div>
            </div>
          </section>

          <button
            type="button"
            disabled={openingChat || !providerId || !job._id}
            onClick={handleOpenChat}
            className="flex h-[58px] w-[359px] items-center justify-center gap-[8px] rounded-[12px] border border-[#E2E8F0] bg-[#164D6F] px-[24px] py-[16px] font-['Montserrat'] text-[14px] font-semibold text-white shadow-[0px_1px_2px_0px_#0000000D] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <MessageSquare className="h-[18px] w-[18px]" />
            {openingChat ? "Opening chat..." : "Chat"}
          </button>
        </div>
      </div>
    </div>
  );
}
