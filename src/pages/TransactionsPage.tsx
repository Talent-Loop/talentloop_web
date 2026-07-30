import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

import {
  getTransactions,
  getTransactionSummary,
} from "../services/transactions";

import type { Transaction } from "../types/transactions";

interface TransactionSummary {
  totalGMV: number;
  totalCommission: number;
  totalAgentFees: number;
  totalPlatformNet: number;
  pendingCommission: number;
  paidCommission: number;
}

interface StatCardProps {
  title: string;
  value: string;
  blue?: boolean;
}

interface StatusBadgeProps {
  status: "paid" | "pending" | "waived";
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] =
    useState<TransactionSummary | null>(null);

    const [searchTerm, setSearchTerm] = useState("");

    const [selectedTransaction, setSelectedTransaction] =
  useState<Transaction | null>(null);

const [showReviewModal, setShowReviewModal] =
  useState(false);

const [paymentReference, setPaymentReference] =
  useState("");

const [waiveReason, setWaiveReason] =
  useState("");

const [showWaiveReason, setShowWaiveReason] =
  useState(false);

  const [roleFilter, setRoleFilter] =
  useState("All roles");

const [dateFilter, setDateFilter] =
  useState("7 days ago");

const [showRoleDropdown, setShowRoleDropdown] =
  useState(false);

const [showDateDropdown, setShowDateDropdown] =
  useState(false);

  const loadTransactions = async () => {
    try {
      const [transactionsResponse, summaryResponse] =
        await Promise.all([
          getTransactions(),
          getTransactionSummary(),
        ]);

      console.log("Transactions:", transactionsResponse);
      console.log("Summary:", summaryResponse);

      setTransactions(
        transactionsResponse.data.transactions
      );

      setSummary(summaryResponse.data);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const StatCard = ({
    title,
    value,
    blue = false,
  }: StatCardProps) => (
    <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
        {title}
      </p>

      <p
        className={`mt-4 text-[26px] font-bold ${
          blue
            ? "text-[#0F4C75]"
            : "text-slate-900"
        }`}
      >
        {value}
      </p>
    </article>
  );

  const StatusBadge = ({
    status,
  }: StatusBadgeProps) => {
    if (status === "paid") {
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-[#1E5A85]">
          <span className="h-2 w-2 rounded-full bg-[#1E5A85]" />
          Paid
        </span>
      );
    }

    if (status === "pending") {
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF3D6] px-4 py-1.5 text-sm font-medium text-[#C78317]">
          <span className="h-2 w-2 rounded-full bg-[#C78317]" />
          Pending
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-1.5 text-sm font-medium text-red-600">
        <span className="h-2 w-2 rounded-full bg-red-600" />
        Waived
      </span>
    );
  };

  const filteredTransactions = transactions.filter((transaction) => {
  const search = searchTerm.toLowerCase();

  return (
    transaction._id.toLowerCase().includes(search) ||

    transaction.jobId?.title
      ?.toLowerCase()
      .includes(search) ||

    transaction.providerId?.name
      ?.toLowerCase()
      .includes(search) ||

    transaction.providerId?.email
      ?.toLowerCase()
      .includes(search) ||

    transaction.clientId?.email
      ?.toLowerCase()
      .includes(search)
  );
});

  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-[48px] font-bold text-[#24364B]">
          Transactions & Commission
        </h1>

        <p className="mt-2 text-[18px] text-slate-500">
          Ledger of marketplace transactions and
          platform commissions.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <StatCard
          title="TOTAL COMMISSION"
          value={`₦${(
            summary?.totalCommission ?? 0
          ).toLocaleString()}`}
        />

        <StatCard
  title="TOTAL COMMISSION"
  value={`₦${(summary?.totalCommission ?? 0).toLocaleString()}`}
/>

<StatCard
  title="PENDING PAYOUTS"
  value={`₦${(summary?.pendingCommission ?? 0).toLocaleString()}`}
/>

<StatCard
  title="PAID COMMISSIONS"
  value={`₦${(summary?.paidCommission ?? 0).toLocaleString()}`}
  blue
/>
      </div>

      <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1">
            <input
  type="text"
  placeholder="Search by ID or service"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="h-14 w-full rounded-full border border-slate-300 px-6 text-[16px] text-black outline-none placeholder:text-slate-400 focus:border-slate-400"
/>
          </div>

          <div className="flex gap-3">

  {/* ROLE DROPDOWN */}

  <div className="relative">

    <button
      onClick={() =>
        setShowRoleDropdown(!showRoleDropdown)
      }
      className="flex h-12 items-center gap-3 rounded-full border border-slate-200 bg-white px-5 text-sm text-slate-700 shadow-sm"
    >
      {roleFilter}

      <svg
        className={`h-4 w-4 transition ${
          showRoleDropdown ? "rotate-180" : ""
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>

    {showRoleDropdown && (
      <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl">

        {["All roles", "Agent", "User"].map(
          (item) => (
            <button
              key={item}
              onClick={() => {
                setRoleFilter(item);
                setShowRoleDropdown(false);
              }}
              className="block w-full px-5 py-3 text-left text-sm hover:bg-slate-50"
            >
              {item}
            </button>
          )
        )}

      </div>
    )}

  </div>

  {/* DATE DROPDOWN */}

  <div className="relative">

    <button
      onClick={() =>
        setShowDateDropdown(!showDateDropdown)
      }
      className="flex h-12 items-center gap-3 rounded-full border border-slate-200 bg-white px-5 text-sm text-slate-700 shadow-sm"
    >
      {dateFilter}

      <svg
        className={`h-4 w-4 transition ${
          showDateDropdown ? "rotate-180" : ""
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>

    {showDateDropdown && (
      <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl">

        {[
          "1 day ago",
          "7 days ago",
          "1 month ago",
          "6 month ago",
        ].map((item) => (
          <button
            key={item}
            onClick={() => {
              setDateFilter(item);
              setShowDateDropdown(false);
            }}
            className="block w-full px-5 py-3 text-left text-sm hover:bg-slate-50"
          >
            {item}
          </button>
        ))}

      </div>
    )}

  </div>

</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wider text-slate-400">
                <th className="px-8 py-6">
                  Transaction
                </th>

                <th className="px-8 py-6">
                  User / Agent
                </th>

                <th className="px-8 py-6">
                  Service
                </th>

                <th className="px-8 py-6">
                  Amount
                </th>

                <th className="px-8 py-6">
                  Commission
                </th>

                <th className="px-8 py-6">
                  Status
                </th>

                <th className="px-8 py-6 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
             {filteredTransactions.map((transaction) => (
  <tr
    key={transaction._id}
    className="border-b border-slate-100 last:border-none"
  >
    <td className="px-8 py-8 font-semibold text-slate-700">
      {transaction._id.slice(-8).toUpperCase()}
    </td>

    <td className="px-8 py-8 text-slate-700">
      {transaction.providerId?.name ??
        transaction.providerId?.email ??
        transaction.clientId?.email}
    </td>

    <td className="px-8 py-8 text-slate-600">
      {transaction.jobId?.title}
    </td>

    <td className="px-8 py-8 font-semibold text-slate-800">
      ₦{transaction.agreedPrice.toLocaleString()}
    </td>

    <td className="px-8 py-8 font-medium text-slate-700">
      ₦{transaction.commissionAmount.toLocaleString()}
    </td>

    <td className="px-8 py-8">
      <StatusBadge status={transaction.status} />
    </td>

    <td className="px-8 py-8 text-right">
      <button
  onClick={() => {
    setSelectedTransaction(transaction);
    setPaymentReference("");
    setWaiveReason("");
    setShowWaiveReason(false);
    setShowReviewModal(true);
  }}
  className="rounded-full border border-slate-300 px-7 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
>
  Review
</button>
    </td>
  </tr>
))}

{filteredTransactions.length === 0 && (
  <tr>
    <td
      colSpan={7}
      className="px-8 py-12 text-center text-slate-500"
    >
      No transactions found.
    </td>
  </tr>
)}
            </tbody>
          </table>
        </div>
      </section>

{showReviewModal && selectedTransaction && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

    <div className="relative w-full max-w-3xl rounded-[32px] bg-white p-10 shadow-2xl">

      <button
        onClick={() => setShowReviewModal(false)}
        className="absolute right-8 top-8 text-3xl text-slate-400"
      >
        ×
      </button>

      <h2 className="text-center text-4xl font-bold text-[#24364B]">
        Transaction Details
      </h2>

      <div className="mt-10 space-y-5">

        <div className="flex justify-between">
          <span className="font-medium text-slate-500">
            Transaction ID
          </span>

          <span className="font-semibold">
            {selectedTransaction._id}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-slate-500">
            Job
          </span>

          <span>
            {selectedTransaction.jobId?.title}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-slate-500">
            Provider
          </span>

          <span>
            {selectedTransaction.providerId?.name ??
              selectedTransaction.providerId?.email}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-slate-500">
            Client
          </span>

          <span>
            {selectedTransaction.clientId?.name ??
              selectedTransaction.clientId?.email}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-slate-500">
            Agent
          </span>

          <span>
            {selectedTransaction.agentId?.email ??
              "No Agent"}
          </span>
        </div>

        <hr />

        <div className="flex justify-between">
          <span>Agreed Price</span>

          <span>
            ₦{selectedTransaction.agreedPrice.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Commission</span>

          <span>
            ₦{selectedTransaction.commissionAmount.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Agent Fee</span>

          <span>
            ₦{selectedTransaction.agentFee.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Platform Net</span>

          <span>
            ₦{selectedTransaction.platformNet.toLocaleString()}
          </span>
        </div>

        <hr />

        <div className="flex justify-between">
          <span>Status</span>

          <StatusBadge
            status={selectedTransaction.status}
          />
        </div>

        {selectedTransaction.status === "paid" && (
          <>
            <div className="flex justify-between">
              <span>Paid At</span>

              <span>
                {selectedTransaction.paidAt
                  ? new Date(
                      selectedTransaction.paidAt
                    ).toLocaleString()
                  : "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Reference</span>

              <span>
                {selectedTransaction.paymentReference ??
                  "-"}
              </span>
            </div>
          </>
        )}

        {selectedTransaction.status === "waived" && (
          <>
            <div className="flex justify-between">
              <span>Waived At</span>

              <span>
                {selectedTransaction.waivedAt
                  ? new Date(
                      selectedTransaction.waivedAt
                    ).toLocaleString()
                  : "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Reason</span>

              <span>
                {selectedTransaction.waivedReason ??
                  "No reason"}
              </span>
            </div>
          </>
        )}

        {selectedTransaction.status === "pending" && (
          <>
            <hr />

            <input
              value={paymentReference}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPaymentReference(e.target.value)
              }
              placeholder="Payment Reference"
              className="w-full rounded-xl border p-4"
            />

            {showWaiveReason && (
              <textarea
                value={waiveReason}
                onChange={(
                  e: ChangeEvent<HTMLTextAreaElement>
                ) =>
                  setWaiveReason(e.target.value)
                }
                placeholder="Reason for waiving..."
                className="mt-4 h-32 w-full rounded-xl border p-4"
              />
            )}

            <div className="mt-8 flex justify-end gap-4">

              <button
                onClick={() =>
                  setShowReviewModal(false)
                }
                className="rounded-xl border px-8 py-3"
              >
                Cancel
              </button>

              <button
                onClick={() =>
                  setShowWaiveReason(true)
                }
                className="rounded-xl bg-red-600 px-8 py-3 text-white"
              >
                Waive
              </button>

              <button
                className="rounded-xl bg-[#0F4C75] px-8 py-3 text-white"
              >
                Mark Paid
              </button>

            </div>
          </>
        )}

      </div>

    </div>

  </div>
)}

    </section>
  );
}