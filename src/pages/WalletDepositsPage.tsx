import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface Deposit {
  id: number;
  _id?: string; // Support backend IDs if present
  name: string;
  initials?: string;
  amount: string;
  date?: string;
  createdAt?: string; // Support backend dates if present
  status: "Pending" | "Paid" | "Rejected";
  proofUrl?: string;
}

export default function WalletDepositsPage() {
  // Sample hardcoded data
  const [deposits, setDeposits] = useState<Deposit[]>([
    {
      id: 1,
      name: "Adaeze Okafor",
      initials: "AO",
      amount: "20,000.00",
      date: "2026-05-18",
      status: "Pending",
      proofUrl: "#",
    },
    {
      id: 2,
      name: "Adaeze Okafor",
      initials: "AO",
      amount: "20,000.00",
      date: "2026-05-19",
      status: "Pending",
    },
    {
      id: 3,
      name: "Adaeze Okafor",
      initials: "AO",
      amount: "20,000.00",
      date: "2026-05-19",
      status: "Pending",
    },
    {
      id: 4,
      name: "Adaeze Okafor",
      initials: "AO",
      amount: "20,000.00",
      date: "2026-05-19",
      status: "Pending",
    },
    {
      id: 5,
      name: "Adaeze Okafor",
      initials: "AO",
      amount: "20,000.00",
      date: "2026-05-19",
      status: "Paid",
    },
  ]);

  // Action Handlers
  const handleApprove = (id: number | string) => {
    const targetDeposit = deposits.find((dep) => dep.id === id || dep._id === id);
    const userName = targetDeposit ? targetDeposit.name : "User";

    setDeposits((prev) =>
      prev.map((dep) =>
        dep.id === id || dep._id === id ? { ...dep, status: "Paid" } : dep
      )
    );

    // Modern Success Toast
    toast.success(`Deposit approved successfully for ${userName}!`, {
      style: {
        borderRadius: "16px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const handleReject = (id: number | string) => {
    const targetDeposit = deposits.find((dep) => dep.id === id || dep._id === id);
    const userName = targetDeposit ? targetDeposit.name : "User";

    setDeposits((prev) =>
      prev.map((dep) =>
        dep.id === id || dep._id === id ? { ...dep, status: "Rejected" } : dep
      )
    );

    // Modern Error/Warning Toast
    toast.error(`Deposit rejected for ${userName}.`, {
      style: {
        borderRadius: "16px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <section className="space-y-8">
      {/* This is the toast container that listens to the `toast()` triggers 
        and positions them beautifully at the top-right.
      */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header */}
      <div>
        <h1 className="text-[40px] font-bold text-slate-900">
          Wallet Deposits
        </h1>
        <p className="mt-1 text-lg text-slate-500">
          Review payments
        </p>
      </div>

      {/* Table Card Wrapper */}
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
              {deposits.map((deposit) => {
                const recordId = deposit.id || deposit._id || "";
                
                const displayInitials = deposit.initials || 
                  (deposit.name ? deposit.name.split(" ").map(n => n[0]).join("").toUpperCase() : "??");

                return (
                  <tr
                    key={recordId}
                    className="border-b border-slate-100 last:border-none"
                  >
                    {/* User info */}
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-slate-700">
                          {displayInitials}
                        </div>
                        <span className="font-medium text-slate-700">
                          {deposit.name || "Unknown User"}
                        </span>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-8 py-6 text-lg text-slate-600">
                      ₦{deposit.amount}
                    </td>

                    {/* Date */}
                    <td className="px-8 py-6 text-lg text-slate-600">
                      {deposit.date || deposit.createdAt?.split("T")[0] || "N/A"}
                    </td>

                    {/* Status Badge */}
                    <td className="px-8 py-6">
                      {deposit.status === "Pending" ? (
                        <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
                          <span className="h-2 w-2 rounded-full bg-amber-500" />
                          Pending
                        </span>
                      ) : deposit.status === "Rejected" ? (
                        <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-sm font-medium text-rose-700">
                          <span className="h-2 w-2 rounded-full bg-rose-500" />
                          Rejected
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-sky-700">
                          <span className="h-2 w-2 rounded-full bg-sky-600" />
                          {deposit.status || "Paid"}
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => deposit.proofUrl && window.open(deposit.proofUrl, "_blank")}
                          disabled={!deposit.proofUrl}
                          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <Eye size={18} />
                          <span>Proof</span>
                        </button>

                        <button 
                          onClick={() => handleReject(recordId)}
                          disabled={deposit.status !== "Pending"}
                          className="rounded-full border border-slate-300 px-6 py-2 font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Reject
                        </button>

                        <button 
                          onClick={() => handleApprove(recordId)}
                          disabled={deposit.status !== "Pending"}
                          className="rounded-full bg-[#0F4C75] px-6 py-2 font-medium text-white transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Approve
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}