
import { useEffect } from "react";

export interface SelectedProfessional {
  id: string;
  name: string;
  photo?: string;
  rating?: number;
  reviewCount?: number;
  category?: string;
}

export interface SelectedJob {
  id: string;
  title: string;
  location?: string;
}

interface ConfirmProfessionalModalProps {
  isOpen: boolean;
  professional: SelectedProfessional;
  job: SelectedJob;
  agreedPrice: number;
  onCancel: () => void;
  onContinue: () => void;
  isContinuing?: boolean;
}

const currency = (amount: number) =>
  `₦${amount.toLocaleString("en-NG")}`;

export default function ConfirmProfessionalModal({
  isOpen,
  professional,
  job,
  agreedPrice,
  onCancel,
  onContinue,
  isContinuing = false,
}: ConfirmProfessionalModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isContinuing) {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isContinuing, onCancel]);

  if (!isOpen) return null;

  const initials = professional.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#102332]/60 px-4 py-6 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isContinuing) {
          onCancel();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-professional-title"
        className="my-auto w-full max-w-[540px] overflow-hidden rounded-[20px] border border-[#E1E8EC] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.20)]"
      >
        <div className="px-5 pb-6 pt-7 sm:px-8 sm:pb-8 sm:pt-8">
          <header className="mb-7">
            <h2
              id="confirm-professional-title"
              className="text-[21px] font-bold leading-tight text-[#17364A] sm:text-[24px]"
            >
              Confirm Selected Professional
            </h2>

            <p className="mt-2 text-[13px] leading-6 text-[#64748B]">
              Review your selected professional and confirm the agreed
              price before proceeding.
            </p>
          </header>

          {/* Selected professional */}
          <div className="flex items-center gap-4 rounded-[14px] border border-[#DCE5E9] bg-[#F8FAFB] p-4">
            <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E5EDF1] text-[18px] font-semibold text-[#17364A]">
              {professional.photo ? (
                <img
                  src={professional.photo}
                  alt={professional.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                initials
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="break-words text-[15px] font-semibold text-[#17364A] sm:text-[16px]">
                {professional.name}
              </h3>

              {professional.category && (
                <p className="mt-1 text-[12px] text-[#64748B]">
                  {professional.category}
                </p>
              )}

              {professional.rating !== undefined && (
                <p className="mt-2 text-[12px] font-medium text-[#344155]">
                  <span className="text-[#D99A25]">★</span>{" "}
                  {professional.rating.toFixed(1)}
                  {professional.reviewCount !== undefined &&
                    ` (${professional.reviewCount} reviews)`}
                </p>
              )}
            </div>
          </div>

          {/* Job details */}
          <div className="mt-6">
            <h3 className="mb-4 text-[15px] font-semibold text-[#17364A]">
              Job Details
            </h3>

            <div className="space-y-4 rounded-[14px] border border-[#DCE5E9] p-4 sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <span className="text-[13px] text-[#64748B]">
                  Job title
                </span>
                <span className="max-w-[60%] break-words text-right text-[13px] font-medium text-[#253447]">
                  {job.title}
                </span>
              </div>

              {job.location && (
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[13px] text-[#64748B]">
                    Location
                  </span>
                  <span className="max-w-[60%] break-words text-right text-[13px] font-medium text-[#253447]">
                    {job.location}
                  </span>
                </div>
              )}

              <div className="border-t border-[#E7ECEF]" />

              <div className="flex items-center justify-between gap-4">
                <span className="text-[13px] font-medium text-[#344155]">
                  Agreed Price
                </span>
                <span className="text-[21px] font-bold text-[#17364A] sm:text-[24px]">
                  {currency(agreedPrice)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment information */}
          <div className="mt-5 rounded-[12px] border border-[#D8E5EC] bg-[#F0F6F9] p-4">
            <p className="text-[13px] font-semibold text-[#17364A]">
              Before you continue
            </p>

            <p className="mt-2 text-[12px] leading-6 text-[#526579]">
              Please confirm that the professional and agreed price
              are correct. You will proceed to the payment step to
              review the payment details before completing payment.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onCancel}
              disabled={isContinuing}
              className="flex h-[48px] flex-1 items-center justify-center rounded-[9px] border border-[#B7C8D2] bg-white px-5 text-[13px] font-semibold text-[#17364A] transition-colors hover:bg-[#F3F7F8] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onContinue}
              disabled={isContinuing || agreedPrice <= 0}
              className="flex h-[48px] flex-1 items-center justify-center rounded-[9px] bg-[#10344A] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#0B293A] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isContinuing ? "Please wait..." : "Continue to Payment"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
