
import { useEffect } from "react";
import { Clock3, X } from "lucide-react";

interface VerificationInProgressModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onComplete: () => void;
}

export default function VerificationInProgressModal({
  isOpen,
  onCancel,
  onComplete,
}: VerificationInProgressModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-[#6B737A]/60 px-4 py-4 sm:px-6"
      aria-live="polite"
      aria-busy="true"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="verification-progress-title"
        className="relative flex h-[725px] max-h-[calc(100dvh-32px)] w-full max-w-[980px] shrink-0 flex-col items-center overflow-y-auto rounded-[22px] bg-white px-5 pt-[65px] shadow-[0_12px_40px_rgba(15,35,50,0.12)] sm:px-8"
      >
        {/* Close icon */}
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close verification"
          className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full text-[#64748B] transition-colors hover:bg-[#F0F4F6] hover:text-[#10344A] focus:outline-none focus:ring-2 focus:ring-[#10344A]/30"
        >
          <X size={22} strokeWidth={1.8} />
        </button>

        {/* Clock icon */}
        <div className="flex h-[82px] w-[82px] shrink-0 items-center justify-center rounded-full bg-[#EDF3F6]">
          <Clock3
            aria-hidden="true"
            className="h-[34px] w-[34px] text-[#E59A6B]"
            strokeWidth={1.65}
          />
        </div>

        {/* Heading */}
        <h2
          id="verification-progress-title"
          className="mt-[23px] text-center text-[23px] font-semibold leading-[31px] tracking-[-0.35px] text-[#243746] sm:text-[25px]"
        >
          Verification in Progress
        </h2>

        {/* Circular loading indicator */}
        <div
          className="mt-[68px] flex h-[210px] w-[210px] shrink-0 items-center justify-center"
          role="status"
          aria-label="Verification in progress"
        >
          <svg
            viewBox="0 0 210 210"
            className="h-full w-full animate-[verification-spin_1.8s_linear_infinite]"
            aria-hidden="true"
          >
            <circle
              cx="105"
              cy="105"
              r="94"
              fill="none"
              stroke="#DCE7ED"
              strokeWidth="18"
            />

            <circle
              cx="105"
              cy="105"
              r="94"
              fill="none"
              stroke="#10344A"
              strokeWidth="19"
              strokeLinecap="round"
              strokeDasharray="137 454"
              transform="rotate(-90 105 105)"
            />
          </svg>
        </div>

        {/* Temporary button for testing the next modal */}
        <button
          type="button"
          onClick={onComplete}
          className="mt-8 mb-8 shrink-0 rounded-[9px] bg-[#185779] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#104661] focus:outline-none focus:ring-2 focus:ring-[#185779]/40 focus:ring-offset-2"
        >
          Continue to Payment Summary
        </button>
      </section>

      <style>{`
        @keyframes verification-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-\\[verification-spin_1\\.8s_linear_infinite\\] {
            animation-duration: 8s;
          }
        }
      `}</style>
    </div>
  );
}
