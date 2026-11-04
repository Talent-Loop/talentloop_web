
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

import {
  getWalletDeposits,
  approveWalletDeposit,
  rejectWalletDeposit,
} from "../services/walletDeposits";

import type { WalletDeposit } from "../types/walletDeposits";

export default function WalletDepositsPage() {
  const [deposits, setDeposits] = useState<WalletDeposit[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showProofModal, setShowProofModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [selectedDeposit, setSelectedDeposit] =
    useState<WalletDeposit | null>(null);

  const [rejectReason, setRejectReason] = useState("");

  const fetchDeposits = async () => {
    try {
      setLoading(true);

      const response = await getWalletDeposits();

      console.log(response);

      const deposits = response.data.data.deposits;

      setDeposits(deposits);
    } catch (error) {
      console.error("Failed to fetch deposits:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await approveWalletDeposit(id);

      alert("Deposit approved successfully!");

      fetchDeposits();
    } catch (error) {
      console.error(error);
      alert("Failed to approve deposit.");
    }
  };

  const handleReject = async () => {
    if (!selectedDeposit) return;

    if (!rejectReason.trim()) {
      alert("Reason is required.");
      return;
    }

    try {
      await rejectWalletDeposit(
        selectedDeposit._id,
        rejectReason
      );

      alert("Deposit rejected successfully!");

      setShowRejectModal(false);
      setRejectReason("");
      setSelectedDeposit(null);

      fetchDeposits();
    } catch (error) {
      console.error(error);
      alert("Failed to reject deposit.");
    }
  };

  const filteredDeposits = deposits.filter((deposit) => {
    const term = search.toLowerCase();

    return (
      deposit.userId.name.toLowerCase().includes(term) ||
      deposit.userId.email.toLowerCase().includes(term)
    );
  });

  const openProofModal = (deposit: WalletDeposit) => {
    setSelectedDeposit(deposit);
    setShowProofModal(true);
  };

  const openRejectModal = (deposit: WalletDeposit) => {
    setSelectedDeposit(deposit);
    setRejectReason("");
    setShowRejectModal(true);
  };

  const closeProofModal = () => {
    setShowProofModal(false);
    setSelectedDeposit(null);
  };

  if (loading) {
    return (
      <div className="flex h-[75vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#17324D] border-t-transparent" />

          <p className="mt-5 text-lg text-slate-500">
            Loading wallet deposits...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-w-0 space-y-6 sm:space-y-8">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-[40px]">
          Wallet Deposits
        </h1>

        <p className="mt-1 text-sm text-slate-500 sm:text-lg">
          Review payments
        </p>
      </div>

      {/* DEPOSITS CONTAINER */}
      <div className="min-w-0 overflow-hidden rounded-[24px] border border-slate-200 bg-white sm:rounded-[32px]">
        {/* SEARCH */}
        <div className="border-b border-slate-100 p-4 sm:p-5">
          <input
            type="text"
            placeholder="Search by user name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 w-full rounded-full border border-slate-300 px-5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#0F4C75] sm:h-14 sm:px-6 sm:text-base"
          />
        </div>

        {/* MOBILE DEPOSIT CARDS */}
        <div className="space-y-4 p-4 md:hidden">
          {filteredDeposits.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-500">
              No pending deposits found.
            </p>
          ) : (
            filteredDeposits.map((deposit) => (
              <article
                key={deposit._id}
                className="rounded-2xl border border-slate-200 p-4"
              >
                {/* USER AND STATUS */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-slate-700">
                      {deposit.userId.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="break-words font-semibold text-slate-700">
                        {deposit.userId.name}
                      </p>

                      <p className="break-all text-xs text-slate-400">
                        {deposit.userId.email}
                      </p>
                    </div>
                  </div>

                  {deposit.status === "pending" ? (
                    <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-700">
                      <span className="h-2 w-2 rounded-full bg-amber-500" />
                      Pending
                    </span>
                  ) : (
                    <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium capitalize text-green-700">
                      <span className="h-2 w-2 rounded-full bg-green-600" />
                      {deposit.status}
                    </span>
                  )}
                </div>

                {/* DEPOSIT INFORMATION */}
                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs text-slate-400">Amount</p>
                    <p className="mt-1 text-lg font-semibold text-slate-800">
                      ₦{deposit.amount.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Submitted</p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {new Date(deposit.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
                  <button
                    onClick={() => openProofModal(deposit)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-300 px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                  >
                    <Eye size={17} />
                    Proof
                  </button>

                  <button
                    onClick={() => openRejectModal(deposit)}
                    className="flex-1 rounded-full border border-slate-300 px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => handleApprove(deposit._id)}
                    className="flex-1 rounded-full bg-[#0F4C75] px-3 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    Approve
                  </button>
                </div>
              </article>
            ))
          )}
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-8 py-6 text-left text-sm font-semibold uppercase tracking-wide text-slate-400">
                  User
                </th>

                <th className="px-8 py-6 text-left text-sm font-semibold uppercase tracking-wide text-slate-400">
                  Amount
                </th>

                <th className="px-8 py-6 text-left text-sm font-semibold uppercase tracking-wide text-slate-400">
                  Submitted
                </th>

                <th className="px-8 py-6 text-left text-sm font-semibold uppercase tracking-wide text-slate-400">
                  Status
                </th>

                <th className="px-8 py-6 text-center text-sm font-semibold uppercase tracking-wide text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredDeposits.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-slate-500"
                  >
                    No pending deposits found.
                  </td>
                </tr>
              ) : (
                filteredDeposits.map((deposit) => (
                  <tr
                    key={deposit._id}
                    className="border-b border-slate-100 last:border-none"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-slate-700">
                          {deposit.userId.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </div>

                        <span className="font-medium text-slate-700">
                          {deposit.userId.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-8 py-6 text-lg text-slate-600">
                      ₦{deposit.amount.toLocaleString()}
                    </td>

                    <td className="px-8 py-6 text-lg text-slate-600">
                      {new Date(deposit.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-8 py-6">
                      {deposit.status === "pending" ? (
                        <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
                          <span className="h-2 w-2 rounded-full bg-amber-500" />
                          Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium capitalize text-green-700">
                          <span className="h-2 w-2 rounded-full bg-green-600" />
                          {deposit.status}
                        </span>
                      )}
                    </td>

                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => openProofModal(deposit)}
                          className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
                        >
                          <Eye size={18} />
                          <span>Proof</span>
                        </button>

                        <button
                          onClick={() => openRejectModal(deposit)}
                          className="rounded-full border border-slate-300 px-6 py-2 font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                          Reject
                        </button>

                        <button
                          onClick={() => handleApprove(deposit._id)}
                          className="rounded-full bg-[#0F4C75] px-6 py-2 font-medium text-white transition hover:opacity-90"
                        >
                          Approve
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* REJECT MODAL */}
      {showRejectModal && selectedDeposit && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-black/40 p-3 backdrop-blur-sm sm:p-5">
          <div className="relative my-auto w-full max-w-[700px] rounded-[24px] bg-white p-5 shadow-xl sm:rounded-[32px] sm:p-8 lg:p-10">
            <button
              onClick={() => {
                setShowRejectModal(false);
                setRejectReason("");
                setSelectedDeposit(null);
              }}
              className="absolute right-5 top-5 text-2xl text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>

            <h2 className="pr-8 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              Reject Deposit
            </h2>

            <p className="mt-3 text-sm text-slate-500 sm:text-base lg:text-lg">
              Reject deposit from{" "}
              <span className="font-semibold">
                {selectedDeposit.userId.name}
              </span>
            </p>

            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Reason for rejection..."
              className="mt-6 h-32 w-full resize-none rounded-2xl border border-slate-300 p-4 text-sm outline-none focus:border-[#0F4C75] sm:mt-8 sm:h-40 sm:p-5"
            />

            <div className="mt-6 flex flex-col-reverse gap-3 sm:mt-8 sm:flex-row sm:justify-end sm:gap-4">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason("");
                  setSelectedDeposit(null);
                }}
                className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-medium sm:px-8"
              >
                Cancel
              </button>

              <button
                onClick={handleReject}
                className="rounded-xl bg-red-600 px-6 py-3 text-sm font-medium text-white hover:bg-red-700 sm:px-8"
              >
                Reject Deposit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAYMENT PROOF MODAL */}
      {showProofModal && selectedDeposit && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-black/40 p-3 backdrop-blur-sm sm:p-5">
          <div className="relative my-auto max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-[24px] bg-white p-5 shadow-xl sm:rounded-[32px] sm:p-8">
            {/* HEADER */}
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Payment Proof
              </h2>

              <button
                onClick={closeProofModal}
                className="shrink-0 rounded-full p-2 text-slate-500 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-6 sm:mt-8">
              {/* DEPOSIT DETAILS */}
              <div className="grid grid-cols-1 gap-5 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2 sm:gap-6 sm:p-6">
                <div>
                  <p className="text-sm text-slate-500">User</p>
                  <p className="mt-1 break-words font-semibold text-slate-800">
                    {selectedDeposit.userId?.name || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="mt-1 break-all font-semibold text-slate-800">
                    {selectedDeposit.userId?.email || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Amount</p>
                  <p className="mt-1 font-semibold text-slate-800">
                    ₦{selectedDeposit.amount?.toLocaleString() || 0}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <p className="mt-1 font-semibold capitalize text-slate-800">
                    {selectedDeposit.status}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Submitted</p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {selectedDeposit.createdAt
                      ? new Date(
                          selectedDeposit.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Reference</p>
                  <p className="mt-1 break-all font-semibold text-slate-800">
                    {selectedDeposit.pendingReference || "N/A"}
                  </p>
                </div>
              </div>

              {/* RECEIPT */}
              <div>
                <h3 className="mb-4 text-lg font-semibold text-slate-900 sm:text-xl">
                  Payment Receipt
                </h3>

                {selectedDeposit.proofImageUrl ? (
                  <img
                    src={selectedDeposit.proofImageUrl}
                    alt="Payment Proof"
                    className="max-h-[450px] w-full rounded-2xl object-contain sm:max-h-[600px]"
                  />
                ) : (
                  <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-slate-300 text-sm text-slate-500 sm:h-80">
                    No proof uploaded
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
