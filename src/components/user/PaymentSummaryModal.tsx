import { useEffect, useState } from "react";
import { BadgeCheck, MapPin, Star, X } from "lucide-react";

interface PaymentSummaryModalProps {
  isOpen: boolean;
  professionalName?: string;
  professionalPhoto?: string;
  serviceFee: number;
  onCancel: () => void;
  onProceed: () => void;
}

const currency = (amount: number) =>
  `₦${amount.toLocaleString("en-NG")}`;

export default function PaymentSummaryModal({
  isOpen,
  professionalName = "Emeka Johnson",
  professionalPhoto = "https://i.pravatar.cc/100?img=12",
  serviceFee,
  onCancel,
  onProceed,
}: PaymentSummaryModalProps) {
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setConfirmed(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const total = serviceFee;

  const handleProceed = () => {
    if (!confirmed) return;
    onProceed();
  };

  return (
    <div
      className="fixed inset-0 z-[210] flex items-center justify-center overflow-y-auto bg-[#6B737A]/60 px-4 py-5 sm:px-6"
      onClick={onCancel}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-summary-title"
        onClick={(event) => event.stopPropagation()}
        className="relative my-auto w-full max-w-[980px] rounded-[20px] bg-white px-5 py-7 shadow-[0_16px_50px_rgba(15,35,50,0.18)] sm:px-9 sm:py-9 lg:px-12"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close payment summary"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-[#64748B] transition-colors hover:bg-[#F0F4F6] hover:text-[#10344A] focus:outline-none focus:ring-2 focus:ring-[#185779]/30 sm:right-6 sm:top-6"
        >
          <X size={22} strokeWidth={1.8} />
        </button>

        {/* Header */}
        <header className="pr-10">
          <h2
            id="payment-summary-title"
            className="text-[22px] font-bold leading-tight tracking-[-0.4px] text-[#202C40] sm:text-[26px]"
          >
            Payment Summary
          </h2>

          <p className="mt-2 text-[12px] leading-5 text-[#849197] sm:text-[14px]">
            Review your booking before making payment.
          </p>
        </header>

        {/* Professional details */}
        <div className="mt-7 flex items-center gap-4 rounded-[14px] border border-[#DCE5E9] bg-[#FBFDFD] p-4 sm:mt-8 sm:p-5">
          <img
            src={professionalPhoto}
            alt={professionalName}
            onError={(event) => {
              event.currentTarget.src =
                "https://i.pravatar.cc/100?img=12";
            }}
            className="h-[64px] w-[64px] shrink-0 rounded-full border border-[#E0E7EA] object-cover sm:h-[76px] sm:w-[76px]"
          />

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <h3 className="text-[14px] font-semibold text-[#202C40] sm:text-[16px]">
                {professionalName}
              </h3>

              <BadgeCheck
                size={17}
                aria-label="Verified professional"
                className="shrink-0 fill-[#DDF5E6] text-[#27965A]"
              />
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-[#64748B] sm:text-[12px]">
              <span className="inline-flex items-center gap-1">
                <Star
                  size={14}
                  className="fill-[#F4C542] text-[#F4C542]"
                />
                <span className="font-semibold text-[#344155]">4.8</span>
                <span>(126 reviews)</span>
              </span>

              <span className="hidden text-[#CBD5DB] sm:inline">|</span>

              <span className="inline-flex items-center gap-1">
                <MapPin size={14} className="text-[#849197]" />
                2.4 km away
              </span>
            </div>
          </div>
        </div>

        {/* Payment breakdown */}
        <section
          aria-label="Payment breakdown"
          className="mt-8 sm:mt-9"
        >
          <h3 className="mb-5 text-[14px] font-semibold text-[#202C40] sm:text-[15px]">
            Payment Breakdown
          </h3>

          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4 text-[13px] sm:text-[14px]">
              <span className="text-[#64748B]">Service Fee</span>
              <span className="whitespace-nowrap font-medium tabular-nums text-[#344155]">
                {currency(serviceFee)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 text-[13px] sm:text-[14px]">
              <span className="text-[#64748B]">Platform Fee</span>
              <span className="whitespace-nowrap font-medium tabular-nums text-[#344155]">
                {currency(0)}
              </span>
            </div>
          </div>

          <div className="my-5 border-t border-[#DCE5E9]" />

          <div className="flex items-center justify-between gap-4">
            <span className="text-[15px] font-semibold text-[#202C40] sm:text-[16px]">
              Total
            </span>

            <span className="whitespace-nowrap text-[20px] font-bold tabular-nums tracking-[-0.3px] text-[#10344A] sm:text-[23px]">
              {currency(total)}
            </span>
          </div>
        </section>

        {/* Booking confirmation */}
        <label className="mt-7 flex cursor-pointer items-start gap-3 sm:mt-8">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(event) => setConfirmed(event.target.checked)}
            className="mt-0.5 h-[17px] w-[17px] shrink-0 cursor-pointer accent-[#185779] focus:ring-[#185779]"
          />

          <span className="text-[12px] leading-[21px] text-[#46546B] sm:text-[13px]">
            I understand this payment confirms my booking with the selected
            professional.
          </span>
        </label>

        {/* Actions */}
        <div className="mt-8 flex flex-col-reverse justify-end gap-3 sm:flex-row sm:gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-[46px] items-center justify-center rounded-[9px] border border-[#D5E0E5] bg-white px-7 text-[13px] font-medium text-[#344155] transition-colors hover:bg-[#F6F9F9] focus:outline-none focus:ring-2 focus:ring-[#185779]/25 sm:min-w-[120px]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleProceed}
            disabled={!confirmed}
            className="inline-flex h-[46px] items-center justify-center rounded-[9px] bg-[#185779] px-7 text-[13px] font-semibold text-white transition-colors hover:bg-[#104661] focus:outline-none focus:ring-2 focus:ring-[#185779]/35 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#A9BEC9] disabled:text-white sm:min-w-[190px]"
          >
            Proceed to Payment
          </button>
        </div>
      </section>
    </div>
  );
}