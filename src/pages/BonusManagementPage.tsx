
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

  const [showAssignModal, setShowAssignModal] = useState(false);
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

      const response = await getAllBonuses(1, 20, status);
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

  const formatBonusType = (type: string) =>
    type
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const getAgentName = (item: any) =>
    item.userId?.firstName && item.userId?.lastName
      ? `${item.userId.firstName} ${item.userId.lastName}`
      : item.userId?.email || "Unknown Agent";

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

  return (
    <section className="min-w-0 space-y-6 md:space-y-8">
      <h1 className="text-2xl font-bold text-[#22324A] sm:text-3xl lg:text-[42px]">
        Bonus Management
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {statCards.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            Icon={item.Icon}
          />
        ))}
      </div>

      {/* Tabs and Assign Bonus */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap gap-2 sm:gap-3">
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
              className={`rounded-full px-4 py-2.5 text-xs font-semibold !text-black transition sm:px-6 sm:py-3 sm:text-sm lg:px-10 ${
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
          className="flex w-full items-center justify-center gap-3 rounded-full bg-[#17324D] px-6 py-3 font-semibold text-white transition hover:bg-[#10283D] sm:w-fit sm:px-7"
        >
          <FiPlus />
          Assign Bonus
        </button>
      </div>

      {/* Recent Activities */}
      <div className="min-w-0 rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
        <h2 className="text-2xl font-bold text-[#22324A] sm:text-3xl">
          Recent Activities
        </h2>

        {/* Mobile Bonus Cards */}
        <div className="mt-6 space-y-4 md:hidden">
          {error ? (
            <p className="py-10 text-center text-red-500">{error}</p>
          ) : bonuses.length === 0 ? (
            <p className="py-10 text-center text-slate-500">
              No bonuses found.
            </p>
          ) : (
            bonuses.map((item: any) => {
              const agentName = getAgentName(item);
              const isPaid = item.status === "paid";

              return (
                <div
                  key={item._id}
                  className="rounded-2xl border border-slate-100 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#123552] text-sm font-semibold text-white">
                      {getInitials(agentName)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-[#22324A]">
                        {agentName}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {formatBonusType(item.type)}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                        isPaid
                          ? "bg-[#DCFCE7] text-[#16A34A]"
                          : "bg-[#FEF3C7] text-[#D97706]"
                      }`}
                    >
                      {isPaid ? "Completed" : "Pending"}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
                    <div>
                      <p className="text-xs text-slate-400">Amount</p>
                      <p className="mt-1 font-semibold text-[#22324A]">
                        ₦{item.amount.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">Date</p>
                      <p className="mt-1 font-medium text-[#22324A]">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Desktop Table */}
        <div className="mt-8 hidden overflow-x-auto md:block">
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
                  const agentName = getAgentName(item);
                  const initials = getInitials(agentName);

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

      {/* Assign Bonus Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm">
          <div className="my-auto max-h-[90vh] w-full max-w-[700px] overflow-y-auto rounded-[24px] bg-white p-5 shadow-xl sm:rounded-[30px] sm:p-8 lg:p-10">
            <div className="mb-6 flex items-center justify-between sm:mb-8">
              <h2 className="text-2xl font-bold text-[#22324A] sm:text-[30px]">
                Assign Bonus
              </h2>

              <button
                onClick={() => setShowAssignModal(false)}
                className="shrink-0 rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
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
                  className="h-12 w-full rounded-xl border border-[#D7DEE5] bg-white px-4 text-sm"
                >
                  <option value="">Select Agent</option>

                  {agents.map((agent: any) => (
                    <option key={agent._id} value={agent._id}>
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
                  className="h-12 w-full rounded-xl border border-[#D7DEE5] bg-white px-4 text-sm"
                >
                  <option value="">Select Bonus Type</option>
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
                  className="h-12 w-full rounded-xl border border-[#D7DEE5] px-4 text-sm"
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
                  className="h-12 w-full rounded-xl border border-[#D7DEE5] px-4 text-sm"
                />
              </div>

              {/* Modal Actions */}
              <div className="mt-2 flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:justify-end sm:gap-4">
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="rounded-xl border border-slate-200 px-8 py-3 text-[#22324A] transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAssignBonus}
                  className="rounded-xl bg-[#17324D] px-8 py-3 text-white transition hover:bg-[#10283D]"
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
