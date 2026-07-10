import { useState } from "react";
import {
  FiGift,
  FiDollarSign,
  FiCreditCard,
  FiPlus,
  FiChevronDown,
  FiX,
} from "react-icons/fi";

import StatCard from "../components/StatCard";

const stats = [
  {
    title: "Total Bonuses Issued",
    value: "₦2,450,500",
    Icon: FiGift,
  },
  {
    title: "Active Bonuses",
    value: "5",
    Icon: FiCreditCard,
  },
  {
    title: "Monthly Bonus Spend",
    value: "₦450,500",
    Icon: FiDollarSign,
  },
];

const bonusActivities = [
  {
    id: 1,
    agent: "Austin Olatunji",
    type: "Performance Bonus",
    amount: "₦45,000",
    date: "28 May 2026",
    status: "Completed",
  },
  {
    id: 2,
    agent: "James Frank",
    type: "Referral Bonus",
    amount: "₦05,000",
    date: "27 May 2026",
    status: "Completed",
  },
  {
    id: 3,
    agent: "Obinna Ike",
    type: "Monthly Target",
    amount: "₦23,415",
    date: "27 May 2026",
    status: "Completed",
  },
  {
    id: 4,
    agent: "Kate Asana",
    type: "Campaign Bonus",
    amount: "₦68,700",
    date: "26 May 2026",
    status: "Completed",
  },
  {
    id: 5,
    agent: "Ese Obiro",
    type: "Performance Bonus",
    amount: "₦34,950",
    date: "25 May 2026",
    status: "Completed",
  },
];

export default function BonusManagementPage() {
  const [tab, setTab] = useState("All Bonuses");

  return (
    <section className="space-y-8">
      {/* Heading */}
      <h1 className="text-[42px] font-bold text-[#22324A]">
        Bonus Management
      </h1>

      {/* Cards */}
      <div className="grid gap-5 lg:grid-cols-3">
        {stats.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            Icon={item.Icon}
          />
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex gap-5">
          {[
            "All Bonuses",
            "Active Bonuses",
            "Completed Bonuses",
          ].map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`rounded-full px-10 py-3 text-sm font-medium transition ${
                tab === item
                  ? "bg-[#DCE3E8] text-[#22324A]"
                  : "border border-slate-300 bg-white text-[#22324A]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-3 rounded-full bg-[#17324D] px-7 py-3 font-semibold text-white">
          <FiPlus />
          Assign Bonus
        </button>
      </div>

      {/* Recent Activities */}
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
              {bonusActivities.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-100"
                >
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#123552] font-semibold text-white">
                        AO
                      </div>

                      <span className="font-medium text-[#22324A]">
                        {item.agent}
                      </span>
                    </div>
                  </td>

                  <td className="font-medium text-[#22324A]">
                    {item.type}
                  </td>

                  <td className="font-semibold text-[#22324A]">
                    {item.amount}
                  </td>

                  <td className="text-[#22324A]">
                    {item.date}
                  </td>

                  <td>
                    <span className="rounded-full bg-[#DCFCE7] px-4 py-1 text-sm font-medium text-[#16A34A]">
                      {item.status}
                    </span>
                  </td>

                  <td className="text-right">
                    <button className="text-2xl font-bold text-slate-500">
                      ⋮
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Bonus Form */}
      <div className="rounded-[28px] border border-slate-200 bg-white p-10 shadow-sm">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-[32px] font-bold text-[#22324A]">
            Assign Bonus
          </h2>

          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-100">
            <FiX className="text-xl text-[#22324A]" />
          </button>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Agent */}
          <div>
            <label className="mb-3 block text-lg font-medium text-[#22324A]">
              Agent
            </label>

            <div className="relative">
              <select className="h-16 w-full appearance-none rounded-xl border border-[#C7D2E3] bg-white px-5 text-lg text-[#22324A]">
                <option>Select Agent</option>
              </select>

              <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-slate-500" />
            </div>
          </div>

          {/* Bonus */}
          <div>
            <label className="mb-3 block text-lg font-medium text-[#22324A]">
              Bonus
            </label>

            <div className="relative">
              <select className="h-16 w-full appearance-none rounded-xl border border-[#C7D2E3] bg-white px-5 text-lg text-[#22324A]">
                <option>Select Bonus Type</option>
              </select>

              <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-slate-500" />
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="mb-3 block text-lg font-medium text-[#22324A]">
              Amount (₦)
            </label>

            <input
  type="number"
  placeholder="Enter Amount"
  className="h-14 w-full rounded-xl border border-[#C9D6E2] bg-white px-5 text-[#22324A] placeholder:text-[#9DB1CC] focus:outline-none focus:ring-2 focus:ring-[#17324D]"
/>
          </div>

          {/* Reason */}
          <div>
            <label className="mb-3 block text-lg font-medium text-[#22324A]">
              Reason/Note
            </label>

            <textarea
  rows={4}
  placeholder="Enter reason for bonus"
  className="w-full rounded-xl border border-[#C9D6E2] bg-white px-5 py-4 text-[#22324A] placeholder:text-[#9DB1CC] focus:outline-none focus:ring-2 focus:ring-[#17324D]"
></textarea>
          </div>
        </div>
      </div>
    </section>
  );
}