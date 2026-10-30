
import { useEffect } from "react";
import { Clock3 } from "lucide-react";

interface VerificationInProgressModalProps {
  isOpen: boolean;
  onPreviewSuccess?: () => void;
}

export default function VerificationInProgressModal({
  isOpen,
  onPreviewSuccess,
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
      className="fixed inset-0 z-[230] flex items-center justify-center overflow-y-auto bg-[#6B737A]/60 px-4 py-5 sm:px-6"
      aria-live="polite"
      aria-busy="true"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="verification-progress-title"
        className="relative flex min-h-[520px] w-full max-w-[940px] flex-col items-center rounded-[20px] bg-white px-5 pb-10 pt-[65px] shadow-[0_16px_50px_rgba(15,35,50,0.18)] sm:h-[640px] sm:max-h-[calc(100dvh-32px)] sm:px-8 sm:pt-[65px]"
      >
        {/* Clock icon */}
        <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full bg-[#EDF3F6]">
          <Clock3
            aria-hidden="true"
            className="h-[27px] w-[27px] text-[#E59A6B]"
            strokeWidth={1.7}
          />
        </div>

        {/* Heading */}
        <h2
          id="verification-progress-title"
          className="mt-[22px] text-center text-[22px] font-bold leading-[31px] tracking-[-0.35px] text-[#202C40] sm:text-[24px]"
        >
          Verification in Progress
        </h2>

        {/* Animated circular spinner */}
        <div
          className="mt-[68px] h-[180px] w-[180px] shrink-0"
          role="status"
          aria-label="Verification in progress"
        >
          <svg
            viewBox="0 0 180 180"
            className="h-full w-full"
            aria-hidden="true"
          >
            <circle
              cx="90"
              cy="90"
              r="79"
              fill="none"
              stroke="#DCE7ED"
              strokeWidth="18"
            />

            <circle
              cx="90"
              cy="90"
              r="79"
              fill="none"
              stroke="#185779"
              strokeWidth="18"
              strokeLinecap="round"
              strokeDasharray="137 359"
              transform="rotate(-90 90 90)"
              className="origin-center animate-[verification-spin_1.8s_linear_infinite]"
            />
          </svg>
        </div>

        {/* Temporary UI preview button — remove before production */}
        {onPreviewSuccess && (
          <button
            type="button"
            onClick={onPreviewSuccess}
            className="mt-8 rounded-[9px] bg-[#185779] px-6 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#104661]"
          >
            Preview Payment Success
          </button>
        )}
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
