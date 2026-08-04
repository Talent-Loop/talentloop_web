import { useEffect, useState } from "react";
import {
  FiGift,
  FiDollarSign,
  FiCreditCard,
  FiPlus,
  FiX,
} from "react-icons/fi";

import StatCard from "../components/StatCard";

import {
  getBonusStats,
  getAllBonuses,
  getAgents,
  assignBonus,
} from "../services/bonus";

import type { BonusStats } from "../types/bonus";

export default function BonusManagementPage() {
  const [tab, setTab] = useState("All Bonuses");

  const [bonuses, setBonuses] = useState<any[]>([]);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [showAssignModal, setShowAssignModal] =
    useState(false);
const [agents, setAgents] = useState<any[]>([]);
  const [stats, setStats] = useState<BonusStats>({
    totalBonusesIssued: 0,
    activeBonuses: 0,
    monthlyBonusSpend: 0,
  });

  const [form, setForm] = useState({
    agent: "",
    type: "",
    amount: "",
    note: "",
  });

  useEffect(() => {
  fetchBonuses();
  fetchBonusStats();
  fetchAgents();
}, []);
if (loading) {
  return (
    <div className="flex h-[75vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#17324D] border-t-transparent"></div>

        <p className="mt-5 text-lg text-slate-500">
          Loading bonuses...
        </p>
      </div>
    </div>
  );
}

  const fetchBonusStats = async () => {
    try {
      const response = await getBonusStats();

      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchAgents = async () => {
  try {
    const response = await getAgents();

    setAgents(response.data.users || []);
  } catch (error) {
    console.error(error);
  }
};

  const fetchBonuses = async (status?: string) => {
  try {
    setLoading(true);
    setError("");

    const response = await getAllBonuses(
      1,
      20,
      status
    );

    setBonuses(response.data.bonuses || []);
  } catch (error) {
    console.error(error);
    setError("Failed to load bonuses.");
    setBonuses([]);
  } finally {
    setLoading(false);
  }
};

  const handleAssignBonus = async () => {
    try {
      await assignBonus({
        userId: form.agent,
        type: form.type,
        amount: Number(form.amount),
        note: form.note,
      });

      setShowAssignModal(false);

      setForm({
        agent: "",
        type: "",
        amount: "",
        note: "",
      });

      fetchBonuses();
      fetchBonusStats();
    } catch (error) {
      console.log(error);
    }
  };

  const statCards = [
    {
      title: "Total Bonuses Issued",
      value: `₦${stats.totalBonusesIssued.toLocaleString()}`,
      Icon: FiGift,
    },
    {
      title: "Active Bonuses",
      value: stats.activeBonuses.toString(),
      Icon: FiCreditCard,
    },
    {
      title: "Monthly Bonus Spend",
      value: `₦${stats.monthlyBonusSpend.toLocaleString()}`,
      Icon: FiDollarSign,
    },
  ];

  const formatBonusType = (
    type: string
  ) =>
    type
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) =>
        c.toUpperCase()
      );

  return (
    <section className="space-y-8">
      <h1 className="text-[42px] font-bold text-[#22324A]">
        Bonus Management
      </h1>

     <div className="grid gap-5 lg:grid-cols-3">
  {statCards.map((item) => (
    <StatCard
      key={item.title}
      title={item.title}
      value={item.value}
      Icon={item.Icon}
    />
  ))}
</div>

      <div className="flex items-center justify-between">
        <div className="flex gap-5">
        {[
  "All Bonuses",
  "Active Bonuses",
  "Completed Bonuses",
].map((item) => (
  <button
    key={item}
    onClick={() => {
      setTab(item);

      if (item === "All Bonuses") {
        fetchBonuses();
      } else if (item === "Active Bonuses") {
        fetchBonuses("pending");
      } else {
        fetchBonuses("paid");
      }
    }}
    className={`rounded-full px-10 py-3 text-sm font-semibold !text-black transition ${
      tab === item
        ? "bg-[#DCE3E8]"
        : "border border-slate-300 bg-white hover:bg-slate-50"
    }`}
  >
    {item}
  </button>
))}
        </div>

        <button
          onClick={() => setShowAssignModal(true)}
          className="flex items-center gap-3 rounded-full bg-[#17324D] px-7 py-3 font-semibold text-white"
        >
          <FiPlus />
          Assign Bonus
        </button>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-[32px] font-bold text-[#22324A]">
          Recent Activities
        </h2>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-slate-400">
                <th className="pb-5 font-medium">Agent</th>
                <th className="pb-5 font-medium">Bonus Type</th>
                <th className="pb-5 font-medium">Amount</th>
                <th className="pb-5 font-medium">Date</th>
                <th className="pb-5 font-medium">Status</th>
                <th className="pb-5 text-right font-medium">Actions</th>
              </tr>
            </thead>

       <tbody>
  {error ? (
    <tr>
      <td
        colSpan={6}
        className="py-12 text-center text-red-500"
      >
        {error}
      </td>
    </tr>
  ) : bonuses.length === 0 ? (
    <tr>
      <td
        colSpan={6}
        className="py-12 text-center text-slate-500"
      >
        No bonuses found.
      </td>
    </tr>
  ) : (
    bonuses.map((item: any) => {
      const agentName =
        item.userId?.firstName && item.userId?.lastName
          ? `${item.userId.firstName} ${item.userId.lastName}`
          : item.userId?.email || "Unknown Agent";

      const initials = agentName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

      return (
        <tr
          key={item._id}
          className="border-t border-slate-100"
        >
          <td className="py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#123552] font-semibold text-white">
                {initials}
              </div>

              <span className="font-medium text-[#22324A]">
                {agentName}
              </span>
            </div>
          </td>

          <td>{formatBonusType(item.type)}</td>

          <td>₦{item.amount.toLocaleString()}</td>

          <td>
            {new Date(item.createdAt).toLocaleDateString()}
          </td>

          <td>
            <span
              className={`rounded-full px-4 py-1 text-sm font-medium ${
                item.status === "paid"
                  ? "bg-[#DCFCE7] text-[#16A34A]"
                  : "bg-[#FEF3C7] text-[#D97706]"
              }`}
            >
              {item.status === "paid"
                ? "Completed"
                : "Pending"}
            </span>
          </td>

          <td className="text-right">
            <button className="text-2xl font-bold text-slate-500">
              ⋮
            </button>
          </td>
        </tr>
      );
    })
  )}
</tbody>
          </table>
        </div>
      </div>

      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-[700px] rounded-[30px] bg-white p-10 shadow-xl">

            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-[30px] font-bold text-[#22324A]">
                Assign Bonus
              </h2>

              <button
                onClick={() => setShowAssignModal(false)}
              >
                <FiX size={28} />
              </button>
            </div>

           <div className="grid grid-cols-2 gap-6">

  {/* Agent */}
  <div>
    <label className="mb-2 block text-sm font-medium text-[#22324A]">
      Agent
    </label>

    <select
      value={form.agent}
      onChange={(e) =>
        setForm({
          ...form,
          agent: e.target.value,
        })
      }
      className="h-12 w-full rounded-xl border border-[#D7DEE5] bg-white px-4"
    >
      <option value="">
        Select Agent
      </option>

      {agents.map((agent: any) => (
        <option
          key={agent._id}
          value={agent._id}
        >
          {agent.firstName && agent.lastName
            ? `${agent.firstName} ${agent.lastName}`
            : agent.email}
        </option>
      ))}
    </select>
  </div>

  {/* Bonus Type */}
  <div>
    <label className="mb-2 block text-sm font-medium text-[#22324A]">
      Bonus
    </label>

    <select
      value={form.type}
      onChange={(e) =>
        setForm({
          ...form,
          type: e.target.value,
        })
      }
      className="h-12 w-full rounded-xl border border-[#D7DEE5] bg-white px-4"
    >
      <option value="">
        Select Bonus Type
      </option>

      <option value="agent_provider_approved">
        Agent Provider Approved
      </option>

      <option value="agent_provider_first_job">
        Agent Provider First Job
      </option>

      <option value="agent_commission_share">
        Agent Commission Share
      </option>

      <option value="client_referral">
        Client Referral
      </option>

      <option value="provider_free_commission">
        Provider Free Commission
      </option>
    </select>
  </div>

  {/* Amount */}
  <div>
    <label className="mb-2 block text-sm font-medium text-[#22324A]">
      Enter Amount
    </label>

    <input
      type="number"
      placeholder="Enter Amount"
      value={form.amount}
      onChange={(e) =>
        setForm({
          ...form,
          amount: e.target.value,
        })
      }
      className="h-12 w-full rounded-xl border border-[#D7DEE5] px-4"
    />
  </div>

  {/* Reason */}
  <div>
    <label className="mb-2 block text-sm font-medium text-[#22324A]">
      Reason
    </label>

    <input
      placeholder="Enter reason for bonus"
      value={form.note}
      onChange={(e) =>
        setForm({
          ...form,
          note: e.target.value,
        })
      }
      className="h-12 w-full rounded-xl border border-[#D7DEE5] px-4"
    />
  </div>

  <div className="col-span-2 mt-4 flex justify-end gap-4">

    <button
      onClick={() => setShowAssignModal(false)}
      className="rounded-xl border px-8 py-3 text-[#22324A]"
    >
      Cancel
    </button>

    <button
      onClick={handleAssignBonus}
      className="rounded-xl bg-[#17324D] px-8 py-3 text-white"
    >
      Assign Bonus
    </button>

  </div>

</div>

          </div>
        </div>
      )}
    </section>
  );
}