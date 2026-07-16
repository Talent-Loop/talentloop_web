type TransactionStatus = "Paid" | "Pending";

interface Transaction {
  id: string;
  user: string;
  service: string;
  amount: string;
  commission: string;
  status: TransactionStatus;
}

interface StatCardProps {
  title: string;
  value: string;
  blue?: boolean;
}

interface StatusBadgeProps {
  status: TransactionStatus;
}

export default function TransactionsPage() {
  const transactions: Transaction[] = [
    {
      id: "TX-1042",
      user: "Tunde Balogun",
      service: "Home Cleaning",
      amount: "₦35,000",
      commission: "₦3,500",
      status: "Paid",
    },
    {
      id: "TX-1043",
      user: "Ibrahim Musa",
      service: "Plumbing Repair",
      amount: "₦22,000",
      commission: "₦2,200",
      status: "Pending",
    },
    {
      id: "TX-1044",
      user: "Aminat Bello",
      service: "Tutoring",
      amount: "₦18,000",
      commission: "₦1,800",
      status: "Pending",
    },
    {
      id: "TX-1045",
      user: "Tunde Balogun",
      service: "Furniture Assembly",
      amount: "₦12,000",
      commission: "₦1,200",
      status: "Pending",
    },
    {
      id: "TX-1046",
      user: "Ibrahim Musa",
      service: "AC Installation",
      amount: "₦75,000",
      commission: "₦7,500",
      status: "Paid",
    },
  ];

  const StatCard = ({ title, value, blue = false }: StatCardProps) => (
    <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
        {title}
      </p>

      <p
        className={`mt-4 text-[26px] font-bold ${
          blue ? "text-[#0F4C75]" : "text-slate-900"
        }`}
      >
        {value}
      </p>
    </article>
  );

  const StatusBadge = ({ status }: StatusBadgeProps) => {
    if (status === "Paid") {
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-[#1E5A85]">
          <span className="h-2 w-2 rounded-full bg-[#1E5A85]" />
          Paid
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF3D6] px-4 py-1.5 text-sm font-medium text-[#C78317]">
        <span className="h-2 w-2 rounded-full bg-[#C78317]" />
        Pending
      </span>
    );
  };

  return (
    <section className="space-y-5">
      {/* Heading */}
      <div>
        <h1 className="text-[48px] font-bold text-[#24364B]">
          Transactions & Commission
        </h1>

        <p className="mt-2 text-[18px] text-slate-500">
          Ledger of marketplace transactions and platform commissions.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 lg:grid-cols-3">
        <StatCard title="TOTAL COMMISSION" value="₦16,200" />
        <StatCard title="PENDING PAYOUTS" value="₦4,000" />
        <StatCard
          title="PAID COMMISSIONS"
          value="₦11,000"
          blue
        />
      </div>

      {/* Table */}
      <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1">
            <input
              type="text"
              placeholder="Search by ID or service"
              className="h-14 w-full rounded-full border border-slate-300 px-6 text-[16px] text-black outline-none focus:border-slate-400 placeholder:text-slate-400"
            />
          </div>

          <div className="flex gap-3">
            <select className="h-12 rounded-full border border-slate-200 bg-white px-5 text-sm text-slate-700 outline-none">
              <option>All roles</option>
            </select>

            <select className="h-12 rounded-full border border-slate-200 bg-white px-5 text-sm text-slate-700 outline-none">
              <option>7 days ago</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
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
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-slate-100 last:border-none"
                >
                  <td className="px-8 py-8 font-semibold text-slate-700">
                    {transaction.id}
                  </td>

                  <td className="px-8 py-8 text-slate-700">
                    {transaction.user}
                  </td>

                  <td className="px-8 py-8 text-slate-600">
                    {transaction.service}
                  </td>

                  <td className="px-8 py-8 font-semibold text-slate-800">
                    {transaction.amount}
                  </td>

                  <td className="px-8 py-8 font-medium text-slate-700">
                    {transaction.commission}
                  </td>

                  <td className="px-8 py-8">
                    <StatusBadge status={transaction.status} />
                  </td>

                  <td className="px-8 py-8 text-right">
                    <button className="rounded-full border border-slate-300 px-7 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}