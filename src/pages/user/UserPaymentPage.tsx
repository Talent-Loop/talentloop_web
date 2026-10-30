
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmProfessionalModal from "../../components/user/ConfirmProfessionalModal";
import VerificationInProgressModal from "../../components/user/VerificationInProgressModal";
import BankTransferVerificationModal from "../../components/user/BankTransferVerificationModal";
import PaymentSummaryModal from "../../components/user/PaymentSummaryModal";
import PaymentMethodModal, {
  type PaymentMethod,
} from "../../components/user/PaymentMethodModal";
import PaymentSuccessModal from "../../components/user/PaymentSuccessModal";

type PaymentStatus = "Completed" | "Pending" | "Failed";
type PaymentTab = "All" | PaymentStatus;

interface Payment {
  id: number;
  title: string;
  professional: string;
  category: string;
  date: string;
  amount: number;
  status: PaymentStatus;
  avatar: string;
  initials: string;
}

const payments: Payment[] = [
  {
    id: 1,
    title: "Fix Kitchen Sink",
    professional: "Emeka Johnson",
    category: "Plumbing",
    date: "Sep 01, 2026",
    amount: 3000,
    status: "Completed",
    avatar: "https://i.pravatar.cc/100?img=12",
    initials: "EJ",
  },
  {
    id: 2,
    title: "Fix Ceiling Fan",
    professional: "Austin Olatuji",
    category: "Electrical",
    date: "Sep 01, 2026",
    amount: 5500,
    status: "Pending",
    avatar: "https://i.pravatar.cc/100?img=11",
    initials: "AO",
  },
  {
    id: 3,
    title: "Paint 2 Bedroom Apartment",
    professional: "James Frank",
    category: "Painting",
    date: "Aug 28, 2026",
    amount: 18000,
    status: "Completed",
    avatar: "https://i.pravatar.cc/100?img=13",
    initials: "JF",
  },
];

const tabs: PaymentTab[] = ["All", "Pending", "Completed", "Failed"];

const categories = [
  "All Categories",
  "Plumbing",
  "Electrical",
  "Painting",
];

const currency = (amount: number) =>
  `₦${amount.toLocaleString("en-NG")}`;

export default function UserPaymentPage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<PaymentTab>("All");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [filterOpen, setFilterOpen] = useState(false);

  const [selectedPayment, setSelectedPayment] =
    useState<Payment | null>(null);

  const [showVerification, setShowVerification] = useState(false);
  const [showPaymentSummary, setShowPaymentSummary] = useState(false);
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [showBankTransferVerification, setShowBankTransferVerification] =
    useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  const filteredPayments = useMemo(() => {
    const query = search.trim().toLowerCase();

    return payments.filter((payment) => {
      const matchesStatus =
        activeTab === "All" || payment.status === activeTab;

      const matchesCategory =
        category === "All Categories" ||
        payment.category === category;

      const searchableText = [
        payment.title,
        payment.professional,
        payment.category,
        payment.status,
        payment.date,
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesStatus &&
        matchesCategory &&
        searchableText.includes(query)
      );
    });
  }, [activeTab, search, category]);

  const resetFilters = () => {
    setActiveTab("All");
    setSearch("");
    setCategory("All Categories");
    setFilterOpen(false);
  };

  // Existing confirmation flow.
  const handleContinueToPayment = () => {
    setShowVerification(true);
  };

  const handleCancelConfirmation = () => {
    setSelectedPayment(null);
  };

  const handleCancelVerification = () => {
    setShowVerification(false);
  };

  const handleOpenPaymentSummary = () => {
    setShowVerification(false);
    setShowPaymentSummary(true);
  };

  const handleCancelPaymentSummary = () => {
    setShowPaymentSummary(false);
    setSelectedPayment(null);
  };

  const handleProceedToPayment = () => {
    if (!selectedPayment) return;

    setShowPaymentSummary(false);
    setShowPaymentMethod(true);
  };

  const handleCancelPaymentMethod = () => {
    setShowPaymentMethod(false);
    setShowPaymentSummary(true);
  };

  // Open bank-transfer verification or retain the card placeholder.
  const handleSelectPaymentMethod = (method: PaymentMethod) => {
    if (!selectedPayment) return;

    setShowPaymentMethod(false);

    if (method === "bank-transfer") {
      setShowBankTransferVerification(true);
      return;
    }

    console.log("Selected card payment (UI preview only)", {
      paymentId: selectedPayment.id,
      amount: selectedPayment.amount,
    });
  };

  // TEMPORARY UI PREVIEW ONLY.
  // This does not verify a transaction or initiate a real payment.
  const handlePreviewPaymentSuccess = () => {
    setShowBankTransferVerification(false);
    setShowPaymentSuccess(true);
  };

  const handlePaymentSuccessClose = () => {
    setShowPaymentSuccess(false);
    setSelectedPayment(null);
  };

  return (
    <main className="min-h-full w-full min-w-0 bg-[#F6F9F9] font-['Montserrat'] text-[#202C40]">
      <div className="mx-auto w-full max-w-[1200px] px-4 pb-10 pt-5 sm:px-6 lg:px-7 lg:pt-7">
        {/* Page heading */}
        <header className="mb-8">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="mb-4 text-[13px] font-medium text-[#23658B] transition-colors hover:text-[#10344A]"
          >
            Back
          </button>

          <h1 className="text-[23px] font-bold leading-tight tracking-[-0.5px] text-[#202C40] sm:text-[25px]">
            Payment
          </h1>

          <p className="mt-2 text-[13px] leading-5 text-[#344155] sm:text-[15px]">
            Manage your payments and transaction history
          </p>
        </header>

        {/* Payment summary cards */}
        <section
          aria-label="Payment summary"
          className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6"
        >
          <SummaryCard title="Total Paid" value="₦45,000" />
          <SummaryCard title="Pending" value="₦4,000" />
          <SummaryCard title="Completed" value="12" />
          <SummaryCard title="Failed" value="0" />
        </section>

        {/* Status tabs */}
        <nav
          aria-label="Filter payments by status"
          className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5 xl:max-w-[770px] xl:gap-8"
        >
          {tabs.map((tab) => {
            const selected = activeTab === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                aria-pressed={selected}
                className={`flex h-[42px] items-center justify-center rounded-full border px-4 text-[12px] font-medium transition-colors sm:text-[13px] ${
                  selected
                    ? "border-[#DFE6E8] bg-[#DFE6E8] text-[#163B51]"
                    : "border-[#DFE5E8] bg-white text-[#171717] hover:bg-[#F0F4F5]"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </nav>

        {/* Search and filter */}
        <div className="relative mb-7 flex w-full items-center gap-3 sm:gap-6">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search Payments"
            aria-label="Search payments"
            className="h-[47px] min-w-0 flex-1 rounded-full border border-[#DDE3E3] bg-white px-5 text-[12px] text-[#253447] outline-none placeholder:text-[#929CA8] focus:border-[#185779] sm:text-[13px]"
          />

          <button
            type="button"
            onClick={() => setFilterOpen((open) => !open)}
            aria-expanded={filterOpen}
            className="flex h-[47px] shrink-0 items-center justify-center rounded-full bg-[#185779] px-6 text-[12px] font-medium text-white transition-colors hover:bg-[#104661] sm:min-w-[100px] sm:text-[13px]"
          >
            Filter
          </button>

          {filterOpen && (
            <div className="absolute right-0 top-[55px] z-30 w-[230px] rounded-xl border border-[#E0E6E8] bg-white p-4 shadow-lg">
              <label
                htmlFor="payment-category"
                className="mb-2 block text-[12px] font-medium text-[#344155]"
              >
                Category
              </label>

              <select
                id="payment-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-[40px] w-full rounded-lg border border-[#DFE5E8] bg-white px-3 text-[12px] text-[#344155] outline-none focus:border-[#185779]"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-3 w-full rounded-lg border border-[#DFE5E8] px-3 py-2.5 text-[12px] font-medium text-[#185779] hover:bg-[#F3F7F8]"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Transaction history */}
        <section
          aria-label="Payment transactions"
          className="flex flex-col gap-4"
        >
          {filteredPayments.map((payment) => (
            <article
              key={payment.id}
              role="button"
              tabIndex={0}
              aria-label={`Select ${payment.professional} for ${payment.title}`}
              onClick={() => setSelectedPayment(payment)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedPayment(payment);
                }
              }}
              className="flex min-h-[108px] w-full cursor-pointer items-center justify-between gap-3 rounded-[15px] border border-[#DCE5E9] bg-white px-4 py-5 transition-colors hover:border-[#185779] hover:bg-[#FBFDFD] focus:outline-none focus:ring-2 focus:ring-[#185779] sm:min-h-[138px] sm:gap-5 sm:px-8"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E8EEF0] text-[12px] font-semibold text-[#17364A] sm:h-[66px] sm:w-[66px]">
                  <img
                    src={payment.avatar}
                    alt={payment.professional}
                    loading="lazy"
                    className="h-full w-full rounded-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                  <span className="sr-only">{payment.initials}</span>
                </div>

                <div className="min-w-0">
                  <h2 className="break-words text-[12px] font-medium leading-5 text-[#344155] sm:text-[13px]">
                    {payment.title}
                  </h2>

                  <p className="mt-1 break-words text-[11px] leading-5 text-[#46546B] sm:text-[13px]">
                    {payment.professional} ({payment.category})
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-[#46546B] sm:text-[12px]">
                    {payment.date}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-3 sm:gap-4">
                <p className="whitespace-nowrap text-[12px] font-bold tabular-nums text-[#202C40] sm:text-[13px]">
                  {currency(payment.amount)}
                </p>

                <StatusBadge status={payment.status} />
              </div>
            </article>
          ))}

          {filteredPayments.length === 0 && (
            <div className="rounded-[15px] border border-[#DCE5E9] bg-white px-4 py-12 text-center">
              <p className="text-[14px] font-semibold text-[#202C40]">
                No payments found
              </p>

              <p className="mt-2 text-[12px] text-[#849197]">
                Try another search or change your filters.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 text-[12px] font-semibold text-[#185779] underline underline-offset-4 hover:text-[#104661]"
              >
                Reset filters
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Confirm selected professional */}
      {selectedPayment &&
        !showVerification &&
        !showPaymentSummary &&
        !showPaymentMethod &&
        !showBankTransferVerification &&
        !showPaymentSuccess && (
          <ConfirmProfessionalModal
            isOpen={true}
            professional={{
              id: String(selectedPayment.id),
              name: selectedPayment.professional,
              photo: selectedPayment.avatar,
              category: selectedPayment.category,
            }}
            job={{
              id: String(selectedPayment.id),
              title: selectedPayment.title,
            }}
            agreedPrice={selectedPayment.amount}
            onCancel={handleCancelConfirmation}
            onContinue={handleContinueToPayment}
          />
        )}

      {/* Existing verification flow */}
      <VerificationInProgressModal
        isOpen={showVerification}
        onCancel={handleCancelVerification}
        onComplete={handleOpenPaymentSummary}
      />

      {/* Payment summary */}
      <PaymentSummaryModal
        isOpen={showPaymentSummary}
        professionalName={selectedPayment?.professional ?? "Emeka Johnson"}
        professionalPhoto={selectedPayment?.avatar}
        serviceFee={selectedPayment?.amount ?? 3000}
        onCancel={handleCancelPaymentSummary}
        onProceed={handleProceedToPayment}
      />

      {/* Choose payment method */}
      <PaymentMethodModal
        isOpen={showPaymentMethod}
        onCancel={handleCancelPaymentMethod}
        onContinue={handleSelectPaymentMethod}
      />

      {/* Bank-transfer verification */}
      <BankTransferVerificationModal
        isOpen={showBankTransferVerification}
        onPreviewSuccess={handlePreviewPaymentSuccess}
      />

      {/* Payment success */}
      <PaymentSuccessModal
        isOpen={showPaymentSuccess}
        reference="UI-PREVIEW-REFERENCE"
        amount={selectedPayment?.amount ?? 3000}
        status="Paid"
        professionalName={selectedPayment?.professional ?? "Emeka Johnson"}
        jobId={String(selectedPayment?.id ?? "")}
        onClose={handlePaymentSuccessClose}
      />
    </main>
  );
}

function SummaryCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <article className="flex min-h-[112px] flex-col items-center justify-center gap-5 rounded-[9px] border border-[#DCE5E9] bg-white px-4 py-5 sm:min-h-[130px]">
      <p className="text-center text-[13px] font-normal leading-5 text-[#344155] sm:text-[15px]">
        {title}
      </p>

      <p className="text-center text-[22px] font-bold leading-tight tracking-[-0.4px] text-[#202C40] sm:text-[24px]">
        {value}
      </p>
    </article>
  );
}

function StatusBadge({ status }: { status: PaymentStatus }) {
  const styles: Record<PaymentStatus, string> = {
    Completed: "bg-[#C9F0DA] text-[#27844D]",
    Pending: "bg-[#F9DFC4] text-[#BD6C28]",
    Failed: "bg-[#F8D9D9] text-[#B93C3C]",
  };

  return (
    <span
      className={`inline-flex min-h-[24px] items-center justify-center rounded-full px-3 py-1 text-[9px] font-medium leading-none ${styles[status]}`}
    >
      {status}
    </span>
  );
}
