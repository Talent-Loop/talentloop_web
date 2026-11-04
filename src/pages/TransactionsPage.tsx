
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
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<TransactionSummary | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [paymentReference, setPaymentReference] = useState("");
  const [waiveReason, setWaiveReason] = useState("");
  const [showWaiveReason, setShowWaiveReason] = useState(false);

  const [roleFilter, setRoleFilter] = useState("All roles");
  const [dateFilter, setDateFilter] = useState("7 days ago");

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const loadTransactions = async () => {
    try {
      setLoading(true);

      const [transactionsResponse, summaryResponse] = await Promise.all([
        getTransactions(),
        getTransactionSummary(),
      ]);

      console.log("Transactions:", transactionsResponse);
      console.log("Summary:", summaryResponse);

      setTransactions(transactionsResponse.data.transactions);
      setSummary(summaryResponse.data);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    } finally {
      setLoading(false);
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
    <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[28px] sm:p-6">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
        {title}
      </p>

      <p
        className={`mt-3 break-words text-2xl font-bold sm:mt-4 sm:text-[26px] ${
          blue ? "text-[#0F4C75]" : "text-slate-900"
        }`}
      >
        {value}
      </p>
    </article>
  );

  const StatusBadge = ({ status }: StatusBadgeProps) => {
    if (status === "paid") {
      return (
        <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-[#1E5A85] sm:px-4 sm:text-sm">
          <span className="h-2 w-2 rounded-full bg-[#1E5A85]" />
          Paid
        </span>
      );
    }

    if (status === "pending") {
      return (
        <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#FFF3D6] px-3 py-1.5 text-xs font-medium text-[#C78317] sm:px-4 sm:text-sm">
          <span className="h-2 w-2 rounded-full bg-[#C78317]" />
          Pending
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-red-100 px-3 py-1.5 text-xs font-medium text-red-600 sm:px-4 sm:text-sm">
        <span className="h-2 w-2 rounded-full bg-red-600" />
        Waived
      </span>
    );
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const search = searchTerm.toLowerCase();

    return (
      transaction._id.toLowerCase().includes(search) ||
      transaction.jobId?.title?.toLowerCase().includes(search) ||
      transaction.providerId?.name?.toLowerCase().includes(search) ||
      transaction.providerId?.email?.toLowerCase().includes(search) ||
      transaction.clientId?.email?.toLowerCase().includes(search)
    );
  });

  const openReviewModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setPaymentReference("");
    setWaiveReason("");
    setShowWaiveReason(false);
    setShowReviewModal(true);
  };

  if (loading) {
    return (
      <div className="flex h-[75vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#17324D] border-t-transparent" />

          <p className="mt-5 text-lg text-slate-500">
            Loading transactions...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-w-0 space-y-5">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-bold leading-tight text-[#24364B] sm:text-3xl lg:text-[48px]">
          Transactions & Commission
        </h1>

        <p className="mt-2 text-sm text-slate-500 sm:text-base lg:text-[18px]">
          Ledger of marketplace transactions and platform commissions.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <StatCard
          title="TOTAL COMMISSION"
          value={`₦${(summary?.totalCommission ?? 0).toLocaleString()}`}
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

      {/* TRANSACTIONS SECTION */}
      <section className="min-w-0 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm sm:rounded-[28px]">
        {/* SEARCH AND FILTERS */}
        <div className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-full flex-1">
            <input
              type="text"
              placeholder="Search by ID or service"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 w-full rounded-full border border-slate-300 px-5 text-sm text-black outline-none placeholder:text-slate-400 focus:border-slate-400 sm:h-14 sm:px-6 sm:text-base"
            />
          </div>

          <div className="flex w-full flex-wrap gap-3 lg:w-auto">
            {/* ROLE DROPDOWN */}
            <div className="relative flex-1 sm:flex-none">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-sm sm:h-12 sm:gap-3 sm:px-5 sm:text-sm"
              >
                {roleFilter}

                <svg
                  className={`h-4 w-4 shrink-0 transition ${
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
                <div className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl">
                  {["All roles", "Agent", "User"].map((item) => (
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
                  ))}
                </div>
              )}
            </div>

            {/* DATE DROPDOWN */}
            <div className="relative flex-1 sm:flex-none">
              <button
                onClick={() => setShowDateDropdown(!showDateDropdown)}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-sm sm:h-12 sm:gap-3 sm:px-5 sm:text-sm"
              >
                {dateFilter}

                <svg
                  className={`h-4 w-4 shrink-0 transition ${
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
                <div className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl">
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

        {/* MOBILE TRANSACTION CARDS */}
        <div className="space-y-4 p-4 md:hidden">
          {filteredTransactions.map((transaction) => (
            <article
              key={transaction._id}
              className="rounded-2xl border border-slate-200 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-slate-400">
                    Transaction ID
                  </p>

                  <p className="mt-1 break-all font-semibold text-slate-700">
                    {transaction._id.slice(-8).toUpperCase()}
                  </p>
                </div>

                <StatusBadge status={transaction.status} />
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-xs text-slate-400">User / Agent</p>
                  <p className="mt-1 break-words text-sm font-medium text-slate-700">
                    {transaction.providerId?.name ??
                      transaction.providerId?.email ??
                      transaction.clientId?.email ??
                      "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Service</p>
                  <p className="mt-1 break-words text-sm text-slate-700">
                    {transaction.jobId?.title ?? "-"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-slate-400">Amount</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      ₦{transaction.agreedPrice.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Commission</p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      ₦{transaction.commissionAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => openReviewModal(transaction)}
                className="mt-5 w-full rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Review Transaction
              </button>
            </article>
          ))}

          {filteredTransactions.length === 0 && (
            <p className="py-10 text-center text-sm text-slate-500">
              No transactions found.
            </p>
          )}
        </div>

        {/* DESKTOP TRANSACTION TABLE */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wider text-slate-400">
                <th className="px-8 py-6">Transaction</th>
                <th className="px-8 py-6">User / Agent</th>
                <th className="px-8 py-6">Service</th>
                <th className="px-8 py-6">Amount</th>
                <th className="px-8 py-6">Commission</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
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
                      onClick={() => openReviewModal(transaction)}
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

      {/* TRANSACTION DETAILS MODAL */}
      {showReviewModal && selectedTransaction && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-black/40 p-3 backdrop-blur-sm sm:p-5">
          <div className="relative my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[24px] bg-white p-5 shadow-2xl sm:rounded-[32px] sm:p-8 lg:p-10">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute right-5 top-5 text-3xl leading-none text-slate-400 hover:text-slate-700 sm:right-8 sm:top-8"
            >
              ×
            </button>

            <h2 className="pr-8 text-center text-2xl font-bold text-[#24364B] sm:pr-0 sm:text-3xl lg:text-4xl">
              Transaction Details
            </h2>

            <div className="mt-8 space-y-4 sm:mt-10 sm:space-y-5">
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                <span className="font-medium text-slate-500">
                  Transaction ID
                </span>
                <span className="break-all text-sm font-semibold text-slate-800 sm:text-right">
                  {selectedTransaction._id}
                </span>
              </div>

              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                <span className="font-medium text-slate-500">Job</span>
                <span className="break-words text-sm sm:text-right">
                  {selectedTransaction.jobId?.title ?? "-"}
                </span>
              </div>

              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                <span className="font-medium text-slate-500">Provider</span>
                <span className="break-words text-sm sm:text-right">
                  {selectedTransaction.providerId?.name ??
                    selectedTransaction.providerId?.email ??
                    "-"}
                </span>
              </div>

              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                <span className="font-medium text-slate-500">Client</span>
                <span className="break-words text-sm sm:text-right">
                  {selectedTransaction.clientId?.name ??
                    selectedTransaction.clientId?.email ??
                    "-"}
                </span>
              </div>

              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                <span className="font-medium text-slate-500">Agent</span>
                <span className="break-words text-sm sm:text-right">
                  {selectedTransaction.agentId?.email ?? "No Agent"}
                </span>
              </div>

              <hr />

              <div className="flex justify-between gap-4">
                <span className="text-sm text-slate-600">Agreed Price</span>
                <span className="text-sm font-semibold">
                  ₦{selectedTransaction.agreedPrice.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-sm text-slate-600">Commission</span>
                <span className="text-sm font-semibold">
                  ₦{selectedTransaction.commissionAmount.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-sm text-slate-600">Agent Fee</span>
                <span className="text-sm font-semibold">
                  ₦{selectedTransaction.agentFee.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-sm text-slate-600">Platform Net</span>
                <span className="text-sm font-semibold">
                  ₦{selectedTransaction.platformNet.toLocaleString()}
                </span>
              </div>

              <hr />

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-slate-600">Status</span>
                <StatusBadge status={selectedTransaction.status} />
              </div>

              {selectedTransaction.status === "paid" && (
                <>
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                    <span className="text-sm text-slate-600">Paid At</span>
                    <span className="break-words text-sm sm:text-right">
                      {selectedTransaction.paidAt
                        ? new Date(
                            selectedTransaction.paidAt
                          ).toLocaleString()
                        : "-"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                    <span className="text-sm text-slate-600">Reference</span>
                    <span className="break-all text-sm sm:text-right">
                      {selectedTransaction.paymentReference ?? "-"}
                    </span>
                  </div>
                </>
              )}

              {selectedTransaction.status === "waived" && (
                <>
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                    <span className="text-sm text-slate-600">Waived At</span>
                    <span className="text-sm sm:text-right">
                      {selectedTransaction.waivedAt
                        ? new Date(
                            selectedTransaction.waivedAt
                          ).toLocaleString()
                        : "-"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                    <span className="text-sm text-slate-600">Reason</span>
                    <span className="break-words text-sm sm:text-right">
                      {selectedTransaction.waivedReason ?? "No reason"}
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
                    className="w-full rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-slate-400 sm:p-4"
                  />

                  {showWaiveReason && (
                    <textarea
                      value={waiveReason}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setWaiveReason(e.target.value)
                      }
                      placeholder="Reason for waiving..."
                      className="mt-4 h-28 w-full rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-slate-400 sm:h-32 sm:p-4"
                    />
                  )}

                  <div className="mt-6 flex flex-col-reverse gap-3 sm:mt-8 sm:flex-row sm:justify-end sm:gap-4">
                    <button
                      onClick={() => setShowReviewModal(false)}
                      className="rounded-xl border border-slate-300 px-6 py-3 text-sm"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => setShowWaiveReason(true)}
                      className="rounded-xl bg-red-600 px-6 py-3 text-sm text-white"
                    >
                      Waive
                    </button>

                    <button className="rounded-xl bg-[#0F4C75] px-6 py-3 text-sm text-white">
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
