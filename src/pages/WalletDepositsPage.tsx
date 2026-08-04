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

  const [rejectReason, setRejectReason] =
    useState("");

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
if (loading) {
  return (
    <div className="flex h-[75vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#17324D] border-t-transparent"></div>

        <p className="mt-5 text-lg text-slate-500">
          Loading wallet deposits...
        </p>
      </div>
    </div>
  );
}
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
      deposit.userId.name
        .toLowerCase()
        .includes(term) ||
      deposit.userId.email
        .toLowerCase()
        .includes(term)
    );
  });

  return (
    <section className="space-y-8">

      <div>
        <h1 className="text-[40px] font-bold text-slate-900">
          Wallet Deposits
        </h1>

        <p className="mt-1 text-lg text-slate-500">
          Review payments
        </p>
      </div>

      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white">
        <div className="overflow-x-auto">

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
          {new Date(
            deposit.createdAt
          ).toLocaleDateString()}
        </td>

        <td className="px-8 py-6">

          {deposit.status === "pending" ? (

            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Pending
            </span>

          ) : (

            <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              <span className="h-2 w-2 rounded-full bg-green-600" />
              {deposit.status}
            </span>

          )}

        </td>

        <td className="px-8 py-6">

          <div className="flex items-center justify-center gap-3">

            <button
              onClick={() => {
                setSelectedDeposit(deposit);
                setShowProofModal(true);
              }}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
            >
              <Eye size={18} />
              <span>Proof</span>
            </button>

            <button
              onClick={() => {
                setSelectedDeposit(deposit);
                setRejectReason("");
                setShowRejectModal(true);
              }}
              className="rounded-full border border-slate-300 px-6 py-2 font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Reject
            </button>

            <button
              onClick={() =>
                handleApprove(deposit._id)
              }
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

      {/* Reject Modal */}

      {showRejectModal && selectedDeposit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-[700px] rounded-[32px] bg-white p-10 shadow-xl">

            <h2 className="text-4xl font-bold text-slate-900">
              Reject Deposit
            </h2>

            <p className="mt-3 text-lg text-slate-500">
              Reject deposit from{" "}
              <span className="font-semibold">
                {selectedDeposit.userId.name}
              </span>
            </p>

            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Reason for rejection..."
              className="mt-8 h-40 w-full resize-none rounded-2xl border border-slate-300 p-5 outline-none focus:border-[#0F4C75]"
            />

            <div className="mt-8 flex justify-end gap-4">

              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason("");
                  setSelectedDeposit(null);
                }}
                className="rounded-xl border border-slate-300 px-8 py-3 font-medium"
              >
                Cancel
              </button>

              <button
                onClick={handleReject}
                className="rounded-xl bg-red-600 px-8 py-3 font-medium text-white hover:bg-red-700"
              >
                Reject Deposit
              </button>

            </div>

          </div>
        </div>
      )}

    {/* Proof Modal */}

{showProofModal && selectedDeposit && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

    <div className="w-full max-w-4xl rounded-[32px] bg-white p-8 shadow-xl">

      {/* Header */}
      <div className="flex items-center justify-between">

        <h2 className="text-3xl font-bold">
          Payment Proof
        </h2>

        <button
          onClick={() => {
            setShowProofModal(false);
            setSelectedDeposit(null);
          }}
          className="rounded-full p-2 hover:bg-slate-100"
        >
          ✕
        </button>

      </div>


      <div className="mt-8 space-y-6">

        {/* Deposit Details */}

        <div className="grid grid-cols-2 gap-6 rounded-2xl bg-slate-50 p-6">

          <div>
            <p className="text-sm text-slate-500">
              User
            </p>
            <p className="font-semibold">
              {selectedDeposit.userId?.name || "N/A"}
            </p>
          </div>


          <div>
            <p className="text-sm text-slate-500">
              Email
            </p>
            <p className="font-semibold">
              {selectedDeposit.userId?.email || "N/A"}
            </p>
          </div>


          <div>
            <p className="text-sm text-slate-500">
              Amount
            </p>
            <p className="font-semibold">
              ₦{selectedDeposit.amount?.toLocaleString() || 0}
            </p>
          </div>


          <div>
            <p className="text-sm text-slate-500">
              Status
            </p>

            <p className="font-semibold capitalize">
              {selectedDeposit.status}
            </p>
          </div>


          <div>
            <p className="text-sm text-slate-500">
              Submitted
            </p>

            <p className="font-semibold">
              {selectedDeposit.createdAt
                ? new Date(
                    selectedDeposit.createdAt
                  ).toLocaleDateString()
                : "N/A"}
            </p>
          </div>


          <div>
            <p className="text-sm text-slate-500">
              Reference
            </p>

            <p className="font-semibold break-all">
              {selectedDeposit.pendingReference || "N/A"}
            </p>
          </div>

        </div>


        {/* Receipt */}

        <div>

          <h3 className="mb-4 text-xl font-semibold">
            Payment Receipt
          </h3>


          {selectedDeposit.proofImageUrl ? (

            <img
              src={selectedDeposit.proofImageUrl}
              alt="Payment Proof"
              className="max-h-[600px] w-full rounded-2xl object-contain"
            />

          ) : (

            <div className="flex h-80 items-center justify-center rounded-2xl border border-dashed border-slate-300 text-slate-500">
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