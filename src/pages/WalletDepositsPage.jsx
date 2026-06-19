import { Eye } from "lucide-react";

export default function WalletDepositsPage() {
  const deposits = [
    {
      id: 1,
      name: "Adaeze Okafor",
      initials: "AO",
      amount: "20,000.00",
      date: "2026-05-18",
      status: "Pending",
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
    {
      id: 6,
      name: "Adaeze Okafor",
      initials: "AO",
      amount: "20,000.00",
      date: "2026-05-19",
      status: "Paid",
    },
    {
      id: 7,
      name: "Adaeze Okafor",
      initials: "AO",
      amount: "20,000.00",
      date: "2026-05-19",
      status: "Paid",
    },
    {
      id: 8,
      name: "Adaeze Okafor",
      initials: "AO",
      amount: "20,000.00",
      date: "2026-05-19",
      status: "Paid",
    },
    {
      id: 9,
      name: "Adaeze Okafor",
      initials: "AO",
      amount: "20,000.00",
      date: "2026-05-19",
      status: "Paid",
    },
  ];

  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-[40px] font-bold text-slate-900">
          Wallet Deposits
        </h1>
        <p className="mt-1 text-lg text-slate-500">
          Review payments
        </p>
      </div>

      {/* Table Card */}
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
              {deposits.map((deposit) => (
                <tr
                  key={deposit.id}
                  className="border-b border-slate-100 last:border-none"
                >
                  {/* User */}
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-slate-700">
                        {deposit.initials}
                      </div>

                      <span className="font-medium text-slate-700">
                        {deposit.name}
                      </span>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="px-8 py-6 text-lg text-slate-600">
                    {deposit.amount}
                  </td>

                  {/* Date */}
                  <td className="px-8 py-6 text-lg text-slate-600">
                    {deposit.date}
                  </td>

                  {/* Status */}
                  <td className="px-8 py-6">
                    {deposit.status === "Pending" ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
                        <span className="h-2 w-2 rounded-full bg-amber-500" />
                        Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-sky-700">
                        <span className="h-2 w-2 rounded-full bg-sky-600" />
                        Paid
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-center gap-3">
                      <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
                        <Eye size={18} />
                        <span>Proof</span>
                      </button>

                      <button className="rounded-full border border-slate-300 px-6 py-2 font-medium text-slate-700 transition hover:bg-slate-50">
                        Reject
                      </button>

                      <button className="rounded-full bg-[#0F4C75] px-6 py-2 font-medium text-white transition hover:opacity-90">
                        Approve
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}