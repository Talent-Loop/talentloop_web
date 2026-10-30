
import { useEffect } from "react";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  reference: string;
  amount: number;
  status: "Paid" | "Pending" | "Failed";
  professionalName: string;
  jobId: string;
  onClose: () => void;
}

const currency = (amount: number) =>
  `₦${amount.toLocaleString("en-NG")}`;

export default function PaymentSuccessModal({
  isOpen,
  reference,
  amount,
  status,
  professionalName,
  jobId,
  onClose,
}: PaymentSuccessModalProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleGoToJobDetails = () => {
    onClose();
    navigate(`/dashboard/jobs/${encodeURIComponent(jobId)}`);
  };

  const statusStyles = {
    Paid: "bg-[#DDF5E5] text-[#27844D]",
    Pending: "bg-[#F9DFC4] text-[#BD6C28]",
    Failed: "bg-[#F8D9D9] text-[#B93C3C]",
  } as const;

  return (
    <div
      className="fixed inset-0 z-[240] flex items-center justify-center overflow-y-auto bg-[#6B737A]/60 px-4 py-5 sm:px-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-success-title"
        className="relative flex min-h-[560px] w-full max-w-[940px] flex-col items-center rounded-[20px] bg-white px-5 py-10 shadow-[0_16px_50px_rgba(15,35,50,0.18)] sm:min-h-[590px] sm:px-10 sm:py-10"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close payment confirmation"
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#E0E6E8] text-[#64748B] transition-colors hover:bg-[#F0F4F6] hover:text-[#10344A] focus:outline-none focus:ring-2 focus:ring-[#185779]/30 sm:right-6 sm:top-6"
        >
          <X size={20} strokeWidth={1.8} />
        </button>

        {/* Success icon */}
        <div className="mt-5 flex h-[110px] w-[110px] shrink-0 items-center justify-center rounded-full bg-[#E2F6E9]">
          <div className="flex h-[62px] w-[62px] items-center justify-center rounded-full bg-[#35B86B]">
            <Check
              aria-hidden="true"
              className="h-[34px] w-[34px] text-white"
              strokeWidth={3}
            />
          </div>
        </div>

        {/* Heading */}
        <h2
          id="payment-success-title"
          className="mt-6 text-center text-[24px] font-bold leading-8 tracking-[-0.4px] text-[#202C40] sm:text-[26px]"
        >
          Payment Successful!
        </h2>

        {/* Confirmation message */}
        <p className="mt-3 max-w-full text-center text-[14px] leading-6 text-[#64748B] sm:text-[15px]">
          Your booking has been confirmed and {professionalName} has been
          notified.
        </p>

        {/* Payment details */}
        <div className="mt-7 w-full max-w-[430px] space-y-4">
          <div className="flex items-center justify-between gap-5">
            <span className="text-[13px] text-[#849197] sm:text-[14px]">
              Reference
            </span>
            <span className="break-all text-right text-[13px] font-semibold text-[#202C40] sm:text-[14px]">
              {reference || "—"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-5">
            <span className="text-[13px] text-[#849197] sm:text-[14px]">
              Amount
            </span>
            <span className="text-right text-[14px] font-semibold text-[#202C40] sm:text-[15px]">
              {currency(amount)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-5">
            <span className="text-[13px] text-[#849197] sm:text-[14px]">
              Status
            </span>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${statusStyles[status]}`}
            >
              {status}
            </span>
          </div>
        </div>

        {/* Primary action */}
        <button
          type="button"
          onClick={handleGoToJobDetails}
          className="mt-8 flex h-[48px] w-full max-w-[250px] items-center justify-center rounded-[9px] bg-[#185779] px-5 text-[14px] font-semibold text-white transition-colors hover:bg-[#104661] focus:outline-none focus:ring-2 focus:ring-[#185779]/40 focus:ring-offset-2"
        >
          Go to Job Details
        </button>
      </section>
    </div>
  );
}
