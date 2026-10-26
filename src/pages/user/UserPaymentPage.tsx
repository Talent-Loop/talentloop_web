
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiFilter,
  FiSearch,
  FiXCircle,
  FiChevronDown,
} from "react-icons/fi";

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

  const filteredPayments = useMemo(() => {
    const query = search.trim().toLowerCase();

    return payments.filter((payment) => {
      const matchesStatus =
        activeTab === "All" || payment.status === activeTab;

      const matchesCategory =
        category === "All Categories" || payment.category === category;

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

  return (
    <div className="w-full min-w-0 bg-white font-['Montserrat'] text-[#333333]">
      <div className="w-full pb-8">
        {/* Back navigation and page heading */}
        <div className="mb-7">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="mb-4 inline-flex items-center gap-2 text-[12px] font-medium text-[#526A79] transition-colors hover:text-[#0D2E43]"
          >
            <FiArrowLeft className="h-[15px] w-[15px]" />
            Back to Dashboard
          </button>

          <h1 className="text-[25px] font-semibold leading-tight text-[#333333]">
            Payment
          </h1>

          <p className="mt-2 text-[13px] leading-5 text-[#777777]">
            Manage your payments and transaction history.
          </p>
        </div>

        {/* Four summary cards */}
        <section
          aria-label="Payment summary"
          className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <SummaryCard
            title="Total Paid"
            value="₦45,000"
            icon={<FiCreditCard />}
          />

          <SummaryCard
            title="Pending"
            value="₦4,000"
            icon={<FiClock />}
          />

          <SummaryCard
            title="Completed"
            value="12"
            icon={<FiCheckCircle />}
          />

          <SummaryCard
            title="Failed"
            value="0"
            icon={<FiXCircle />}
          />
        </section>

        {/* Transaction history */}
        <section className="w-full">
          <div className="mb-4">
            <h2 className="text-[18px] font-semibold leading-6 text-[#333333]">
              Transaction History
            </h2>

            <p className="mt-1 text-[12px] leading-5 text-[#777777]">
              View and track your recent payments.
            </p>
          </div>

          {/* Status tabs */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {tabs.map((tab) => {
              const selected = activeTab === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  aria-pressed={selected}
                  className={[
                    "inline-flex h-[35px] items-center justify-center rounded-md px-4 text-[12px] font-medium transition-colors duration-200",
                    selected
                      ? "bg-[#E9EDF0] text-[#0D2E43]"
                      : "bg-white text-[#777777] hover:bg-[#F6F8F9] hover:text-[#0D2E43]",
                  ].join(" ")}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Search and category filter */}
          <div className="relative mb-5 flex w-full items-center gap-3">
            <div className="relative min-w-0 flex-1">
              <FiSearch
                aria-hidden="true"
                className="absolute left-3.5 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-[#849197]"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search Payments"
                aria-label="Search payments"
                className="h-[42px] w-full rounded-md border border-[#E1E5E8] bg-white pl-10 pr-3 text-[12px] text-[#333333] outline-none placeholder:text-[#8A969D] transition-colors focus:border-[#526F81]"
              />
            </div>

            <button
              type="button"
              onClick={() => setFilterOpen((open) => !open)}
              aria-expanded={filterOpen}
              className="inline-flex h-[42px] flex-shrink-0 items-center justify-center gap-2 rounded-md bg-[#0D2E43] px-4 text-[12px] font-medium text-white transition-colors hover:bg-[#17445D]"
            >
              <FiFilter className="h-[15px] w-[15px]" />
              Filter
              <FiChevronDown
                className={`h-[13px] w-[13px] transition-transform ${
                  filterOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {filterOpen && (
              <div className="absolute right-0 top-[49px] z-30 w-[220px] rounded-md border border-[#E1E5E8] bg-white p-4 shadow-lg">
                <label
                  htmlFor="payment-category"
                  className="mb-2 block text-[12px] font-medium text-[#333333]"
                >
                  Category
                </label>

                <select
                  id="payment-category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="h-[38px] w-full rounded-md border border-[#E1E5E8] bg-white px-2 text-[12px] text-[#526A79] outline-none focus:border-[#526F81]"
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
                  className="mt-3 w-full rounded-md border border-[#DDE3E7] px-3 py-2 text-[12px] font-medium text-[#0D2E43] transition-colors hover:bg-[#F6F8F9]"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>

          {/* Individual transaction rows */}
          <div className="flex flex-col gap-3">
            {filteredPayments.map((payment) => (
              <article
                key={payment.id}
                className="flex min-h-[98px] w-full items-center justify-between gap-4 rounded-lg border border-[#E3E7E9] bg-white px-4 py-4 transition-colors hover:border-[#CCD6DC] sm:px-5"
              >
                {/* Worker and job information */}
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="relative h-[42px] w-[42px] flex-shrink-0 overflow-hidden rounded-full bg-[#E9EDF0]">
                    <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-[#0D2E43]">
                      {payment.initials}
                    </span>

                    <img
                      src={payment.avatar}
                      alt={payment.professional}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full rounded-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="break-words text-[12px] font-semibold leading-[18px] text-[#34454E] sm:text-[13px]">
                      {payment.title}
                    </h3>

                    <p className="mt-1 break-words text-[11px] leading-[17px] text-[#849197] sm:text-[12px]">
                      {payment.professional} ({payment.category})
                    </p>

                    <p className="mt-1 text-[10px] leading-[15px] text-[#849197] sm:text-[11px]">
                      {payment.date}
                    </p>
                  </div>
                </div>

                {/* Amount and status */}
                <div className="flex flex-shrink-0 flex-col items-end gap-2">
                  <p className="whitespace-nowrap text-[13px] font-semibold tabular-nums text-[#34454E] sm:text-[14px]">
                    {currency(payment.amount)}
                  </p>

                  <StatusBadge status={payment.status} />
                </div>
              </article>
            ))}

            {filteredPayments.length === 0 && (
              <div className="rounded-lg border border-[#E3E7E9] bg-white px-4 py-10 text-center">
                <p className="text-[13px] font-semibold text-[#34454E]">
                  No payments found
                </p>

                <p className="mt-1 text-[12px] text-[#849197]">
                  Try another search or change your filters.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-3 text-[12px] font-semibold text-[#0D2E43] underline underline-offset-4 hover:text-[#17445D]"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Bottom back button */}
        <div className="mt-7">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="inline-flex h-[38px] min-w-[72px] items-center justify-center gap-2 rounded-[6px] bg-[#10344A] px-4 text-[11px] font-medium text-white transition-colors hover:bg-[#0B293A]"
          >
            <FiArrowLeft className="h-[14px] w-[14px]" />
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

interface SummaryCardProps {
  title: string;
  value: string;
  icon: ReactNode;
}

function SummaryCard({ title, value, icon }: SummaryCardProps) {
  return (
    <article className="flex min-h-[106px] items-center justify-between gap-3 rounded-lg border border-[#E3E7E9] bg-white px-4 py-4 sm:px-5">
      <div className="min-w-0">
        <p className="text-[11px] font-medium leading-4 text-[#849197] sm:text-[12px]">
          {title}
        </p>

        <p className="mt-2 text-[21px] font-semibold leading-tight tracking-[-0.3px] text-[#34454E] sm:text-[23px]">
          {value}
        </p>
      </div>

      <div className="flex h-[36px] w-[36px] flex-shrink-0 items-center justify-center rounded-md bg-[#EDF2F5] text-[17px] text-[#10344A]">
        {icon}
      </div>
    </article>
  );
}

function StatusBadge({ status }: { status: PaymentStatus }) {
  const styles: Record<PaymentStatus, string> = {
    Completed: "bg-[#E3F1E8] text-[#39805A]",
    Pending: "bg-[#FFF1D9] text-[#B77924]",
    Failed: "bg-[#FBE7E7] text-[#BF4646]",
  };

  return (
    <span
      className={`inline-flex min-h-[22px] items-center justify-center rounded-full px-2.5 py-1 text-[10px] font-medium leading-none ${styles[status]}`}
    >
      {status}
    </span>
  );
}
