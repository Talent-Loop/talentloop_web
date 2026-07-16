import { useEffect, useState } from "react";
import { toast } from "react-hot-toast"; // ✅ Imported toast tool
import { 
  getAllTransactions, 
  getTransactionsSummary, 
  markTransactionPaid, 
  waiveTransaction 
} from "../services/transactions.js";

// Hardcoded fallback testing arrays
const MOCK_SUMMARY = {
  totalCommission: "₦16,200",
  pendingPayouts: "₦4,000",
  paidCommissions: "₦11,000"
};

const MOCK_TRANSACTIONS = [
  {
    _id: "6a01aeff83bad3626ca4a0a3",
    id: "TX-1042",
    user: "Tunde Balogun (Mock)",
    service: "Home Cleaning",
    amount: "₦35,000",
    commission: "₦3,500",
    status: "Paid",
  },
  {
    _id: "6a01af4683bad3626ca4a0a9",
    id: "TX-1043",
    user: "Ibrahim Musa (Mock)",
    service: "Plumbing Repair",
    amount: "₦22,000",
    commission: "₦2,200",
    status: "Pending",
  },
];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(MOCK_SUMMARY);
  const [loading, setLoading] = useState(true);

  // 1. Fetch live metrics and transactions ledger
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const [summaryRes, listRes] = await Promise.allSettled([
          getTransactionsSummary(),
          getAllTransactions()
        ]);

        if (summaryRes.status === "fulfilled" && summaryRes.value?.data) {
          setSummary(summaryRes.value.data);
        }

        let listData = null;
        if (listRes.status === "fulfilled" && listRes.value?.data) {
          listData = listRes.value.data.transactions || listRes.value.data;
        }

        if (Array.isArray(listData) && listData.length > 0) {
          setTransactions(listData);
        } else {
          console.warn("⚠️ Empty backend transactions array. Utilizing hardcoded fallback items.");
          setTransactions(MOCK_TRANSACTIONS);
        }
      } catch (err) {
        console.error("❌ Component connection issue. Defaulting to mock fallbacks:", err);
        setTransactions(MOCK_TRANSACTIONS);
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, []);

  // 2. Action Trigger for the Review button
  const handleReview = async (transaction) => {
    const recordId = transaction._id || transaction.id;
    
    if (transaction.status === "Pending") {
      const confirmAction = window.confirm(`Reviewing Transaction ${transaction.id || recordId}.\n\nClick OK to Mark as Paid, or Cancel to Waive.`);
      
      if (confirmAction) {
        try {
          await markTransactionPaid(recordId);
          setTransactions((prev) =>
            prev.map((item) => ((item._id || item.id) === recordId ? { ...item, status: "Paid" } : item))
          );
          toast.success("Transaction marked as Paid!"); // ✅ Toast replacement
        } catch (err) {
          setTransactions((prev) =>
            prev.map((item) => ((item._id || item.id) === recordId ? { ...item, status: "Paid" } : item))
          );
          toast.success("Processed locally (Mock Fallback Active: Paid)."); // ✅ Toast replacement
        }
      } else {
        try {
          await waiveTransaction(recordId);
          setTransactions((prev) =>
            prev.map((item) => ((item._id || item.id) === recordId ? { ...item, status: "Waived", commission: "₦0" } : item))
          );
          toast.success("Commission fee waived!"); // ✅ Toast replacement
        } catch (err) {
          setTransactions((prev) =>
            prev.map((item) => ((item._id || item.id) === recordId ? { ...item, status: "Waived", commission: "₦0" } : item))
          );
          toast.success("Processed locally (Mock Fallback Active: Waived)."); // ✅ Toast replacement
        }
      }
    } else {
      toast.error(`Transaction ${transaction.id || recordId} is already completed.`); // ✅ Toast replacement
    }
  };

  const StatCard = ({ title, value, blue }) => (
    <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
        {title}
      </p>
      <p className={`mt-4 text-[26px] font-bold ${blue ? "text-[#0F4C75]" : "text-slate-900"}`}>
        {value}
      </p>
    </article>
  );

  const StatusBadge = ({ status }) => {
    if (status === "Paid") {
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-[#1E5A85]">
          <span className="h-2 w-2 rounded-full bg-[#1E5A85]" />
          Paid
        </span>
      );
    } else if (status === "Waived") {
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1.5 text-sm font-medium text-purple-700">
          <span className="h-2 w-2 rounded-full bg-purple-500" />
          Waived
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
        <StatCard title="TOTAL COMMISSION" value={summary.totalCommission || summary.total} />
        <StatCard title="PENDING PAYOUTS" value={summary.pendingPayouts || summary.pending} />
        <StatCard title="PAID COMMISSIONS" value={summary.paidCommissions || summary.paid} blue />
      </div>

      {/* Table Container */}
      <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        {/* Search + Filters */}
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

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-lg text-slate-500 font-medium">
              Loading ledger data...
            </div>
          ) : (
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
                {transactions.map((transaction) => {
                  const recordId = transaction._id || transaction.id;

                  return (
                    <tr key={recordId} className="border-b border-slate-100 last:border-none">
                      <td className="px-8 py-8 font-semibold text-slate-700">
                        {transaction.id || `TX-${recordId.slice(-4).toUpperCase()}`}
                      </td>
                      <td className="px-8 py-8 text-slate-700">
                        {transaction.user || "Unknown User"}
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
                        <button 
                          onClick={() => handleReview(transaction)}
                          className="rounded-full border border-slate-300 px-7 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </section>
  );
}