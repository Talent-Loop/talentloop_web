
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import clientApi from "../../services/clientApi";
import {
  Check,
  MessageSquare,
  ShieldCheck,
  X,
} from "lucide-react";

type JobStatus = "Open" | "Progress" | "Completed" | "Cancelled";

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

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 12,
    transition: { duration: 0.2 },
  },
};

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

  const progressReached =
    job.status === "Progress" || job.status === "Completed";

  const completed = job.status === "Completed";

  return (
    <motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.2 }}
      className="
        fixed inset-0 z-[100] flex items-center justify-center
        overflow-y-auto bg-[#0000004D] p-4
      "
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(event) => event.stopPropagation()}
        className="
          relative flex w-[466px] max-w-full flex-col items-center
          rounded-[10px] bg-white shadow-[0px_20px_50px_rgba(0,0,0,0.15)]
          max-h-[calc(100dvh-32px)] overflow-y-auto
          sm:min-h-[519px]
        "
      >
        {/* CLOSE BUTTON */}
        <motion.button
          type="button"
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="
            absolute right-[16px] top-[14px] z-10
            flex h-[28px] w-[28px] items-center justify-center
            rounded-full text-[#64748B]
            hover:bg-[#F1F5F9]
          "
          aria-label="Close"
        >
          <X className="h-[17px] w-[17px]" />
        </motion.button>

        <div className="
          flex w-[358px] max-w-full flex-col gap-[16px]
          px-0 pb-6 pt-[54px]
          max-sm:w-full max-sm:px-4 max-sm:pb-5 max-sm:pt-[48px]
        ">
          {/* JOB PROGRESS CARD */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.08 }}
            className="
              flex min-h-[188px] w-full flex-col
              rounded-[16px] border border-[#F1F5F9]
              bg-white p-[24px]
              max-sm:p-[18px]
            "
          >
            <h2 className="
              break-words font-['Montserrat'] text-[20px]
              font-semibold leading-[24px] text-[#1E293B]
              max-sm:text-[18px]
            ">
              {job.title}
            </h2>

            <p className="
              mt-[4px] font-['Montserrat'] text-[13px]
              font-normal leading-[18px] text-[#8294AA]
            ">
              {job.category}
            </p>

            {/* PROGRESS STEPS */}
            <div className="mt-[22px] flex w-full items-start justify-between">
              {/* ACCEPTED */}
              <div className="flex min-w-0 flex-1 flex-col items-center">
                <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-[#22C55E]">
                  <Check
                    className="h-[18px] w-[18px] text-white"
                    strokeWidth={3}
                  />
                </div>

                <span className="mt-[8px] whitespace-nowrap font-['Montserrat'] text-[10px] font-medium text-[#64748B]">
                  Accepted
                </span>
              </div>

              <div className="mt-[15px] h-[2px] min-w-[12px] flex-1 bg-[#22C55E]" />

              {/* IN PROGRESS */}
              <div className="flex min-w-0 flex-1 flex-col items-center">
                <div
                  className={`flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full ${
                    progressReached
                      ? "bg-[#22C55E]"
                      : "bg-[#DCE4E9]"
                  }`}
                >
                  {progressReached && (
                    <Check
                      className="h-[18px] w-[18px] text-white"
                      strokeWidth={3}
                    />
                  )}
                </div>

                <span className="mt-[8px] whitespace-nowrap font-['Montserrat'] text-[10px] font-medium text-[#64748B]">
                  Progress
                </span>
              </div>

              <div className="mt-[15px] h-[2px] min-w-[12px] flex-1 bg-[#DCE4E9]" />

              {/* COMPLETED */}
              <div className="flex min-w-0 flex-1 flex-col items-center">
                <div
                  className={`flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full ${
                    completed
                      ? "bg-[#22C55E]"
                      : "bg-[#DCE4E9]"
                  }`}
                >
                  {completed && (
                    <Check
                      className="h-[18px] w-[18px] text-white"
                      strokeWidth={3}
                    />
                  )}
                </div>

                <span className="mt-[8px] whitespace-nowrap font-['Montserrat'] text-[10px] font-medium text-[#64748B]">
                  Completed
                </span>
              </div>
            </div>
          </motion.section>

          {/* JOB DETAILS CARD */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.14 }}
            className="
              min-h-[142px] w-full rounded-[16px]
              border border-[#F1F5F9] bg-white
              p-[24px] shadow-[0px_1px_2px_0px_#0000000D]
              max-sm:p-[18px]
            "
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-['Montserrat'] text-[14px] font-normal text-[#8294AA]">
                Status
              </span>

              <span className="text-right font-['Montserrat'] text-[14px] font-semibold text-[#334155]">
                {job.status === "Progress"
                  ? "In Progress"
                  : job.status}
              </span>
            </div>

            <div className="
              mt-[27px] flex items-center justify-between gap-3
              max-sm:mt-[22px] max-sm:flex-wrap
            ">
              <span className="shrink-0 font-['Montserrat'] text-[14px] font-normal text-[#8294AA]">
                Worker
              </span>

              <div className="flex min-w-0 items-center gap-[10px]">
                <div className="
                  flex h-[36px] w-[36px] shrink-0 items-center
                  justify-center rounded-full bg-[#164D6F]
                  text-[9px] font-semibold text-white
                ">
                  {initials}
                </div>

                <span className="
                  break-words font-['Montserrat'] text-[14px]
                  font-medium text-[#334155]
                ">
                  {workerName ?? "Not assigned"}
                </span>

                {workerName && (
                  <ShieldCheck className="
                    h-[19px] w-[19px] shrink-0
                    fill-[#1267D6] text-[#1267D6]
                  " />
                )}
              </div>
            </div>
          </motion.section>

          {/* CHAT BUTTON */}
          <motion.button
            type="button"
            disabled={openingChat || !providerId || !job._id}
            onClick={handleOpenChat}
            whileHover={
              !openingChat && providerId && job._id
                ? {
                    y: -2,
                    boxShadow: "0px 6px 14px rgba(22, 77, 111, 0.2)",
                  }
                : undefined
            }
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="
              flex h-[58px] w-full shrink-0 items-center
              justify-center gap-[8px] rounded-[12px]
              border border-[#E2E8F0] bg-[#164D6F]
              px-[24px] py-[16px]
              font-['Montserrat'] text-[14px] font-semibold
              text-white shadow-[0px_1px_2px_0px_#0000000D]
              disabled:cursor-not-allowed disabled:opacity-50
            "
          >
            <MessageSquare className="h-[18px] w-[18px]" />
            {openingChat ? "Opening chat..." : "Chat"}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
