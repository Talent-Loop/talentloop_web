
import { useEffect, useState } from "react";
import { Building2, CreditCard, X, Check } from "lucide-react";

export type PaymentMethod = "card" | "bank-transfer";

interface PaymentMethodModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onContinue: (method: PaymentMethod) => void;
}

export default function PaymentMethodModal({
  isOpen,
  onCancel,
  onContinue,
}: PaymentMethodModalProps) {
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethod | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedMethod(null);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleContinue = () => {
    if (!selectedMethod) return;
    onContinue(selectedMethod);
  };

  const paymentMethods = [
    {
      id: "card" as const,
      title: "Debit / Credit Card",
      description: "Visa, Mastercard & Verve",
      Icon: CreditCard,
    },
    {
      id: "bank-transfer" as const,
      title: "Bank Transfer",
      description: "Generate account details",
      Icon: Building2,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[220] flex items-center justify-center overflow-y-auto bg-[#6B737A]/60 px-4 py-5 sm:px-6"
      onClick={onCancel}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-method-title"
        onClick={(event) => event.stopPropagation()}
        className="relative my-auto w-full max-w-[1100px] rounded-[20px] bg-white px-5 py-7 shadow-[0_16px_50px_rgba(15,35,50,0.18)] sm:px-9 sm:py-9 lg:px-12"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close payment method selection"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-[#64748B] transition-colors hover:bg-[#F0F4F6] hover:text-[#10344A] focus:outline-none focus:ring-2 focus:ring-[#185779]/30 sm:right-6 sm:top-6"
        >
          <X size={22} strokeWidth={1.8} />
        </button>

        {/* Header */}
        <header className="border-b border-[#DCE5E9] pb-6 pr-10 sm:pb-7">
          <h2
            id="payment-method-title"
            className="text-[22px] font-bold leading-tight tracking-[-0.4px] text-[#202C40] sm:text-[26px]"
          >
            Choose Payment Method
          </h2>

          <p className="mt-2 text-[12px] leading-5 text-[#849197] sm:text-[14px]">
            Use large selectable cards rather than a dropdown.
          </p>
        </header>

        {/* Payment methods */}
        <section className="mt-7 sm:mt-8">
          <h3 className="mb-5 text-[14px] font-semibold text-[#202C40] sm:text-[15px]">
            Select Payment Method
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {paymentMethods.map(({ id, title, description, Icon }) => {
              const isSelected = selectedMethod === id;

              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedMethod(id)}
                  className={`relative flex min-h-[190px] w-full flex-col items-start rounded-[16px] border p-5 text-left transition-all duration-200 sm:min-h-[220px] sm:p-7 ${
                    isSelected
                      ? "border-2 border-[#185779] bg-[#F0F7FA] shadow-[0_3px_12px_rgba(24,87,121,0.08)]"
                      : "border border-[#D5E0E5] bg-white hover:border-[#8EAFBF] hover:bg-[#FBFDFD]"
                  } focus:outline-none focus:ring-2 focus:ring-[#185779]/30 focus:ring-offset-2`}
                >
                  <div className="flex w-full items-start justify-between">
                    <div
                      className={`flex h-[52px] w-[52px] items-center justify-center rounded-[12px] ${
                        isSelected
                          ? "bg-[#DDECF3] text-[#185779]"
                          : "bg-[#F0F4F6] text-[#344155]"
                      }`}
                    >
                      <Icon size={26} strokeWidth={1.7} />
                    </div>

                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        isSelected
                          ? "border-[#185779] bg-[#185779] text-white"
                          : "border-[#C8D5DC] bg-white text-transparent"
                      }`}
                      aria-hidden="true"
                    >
                      {isSelected && <Check size={13} strokeWidth={2.5} />}
                    </span>
                  </div>

                  <span className="mt-5 text-[15px] font-semibold text-[#202C40] sm:text-[16px]">
                    {title}
                  </span>

                  <span className="mt-2 text-[12px] leading-5 text-[#64748B] sm:text-[13px]">
                    {description}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Actions */}
        <div className="mt-8 flex flex-col-reverse justify-end gap-3 border-t border-[#DCE5E9] pt-6 sm:flex-row sm:gap-4 sm:pt-7">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-[46px] items-center justify-center rounded-[9px] border border-[#D5E0E5] bg-white px-7 text-[13px] font-medium text-[#344155] transition-colors hover:bg-[#F6F9F9] focus:outline-none focus:ring-2 focus:ring-[#185779]/25 sm:min-w-[120px]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedMethod}
            className="inline-flex h-[46px] items-center justify-center rounded-[9px] bg-[#185779] px-7 text-[13px] font-semibold text-white transition-colors hover:bg-[#104661] focus:outline-none focus:ring-2 focus:ring-[#185779]/35 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#A9BEC9] disabled:text-white sm:min-w-[190px]"
          >
            Continue
          </button>
        </div>
      </section>
    </div>
  );
}
