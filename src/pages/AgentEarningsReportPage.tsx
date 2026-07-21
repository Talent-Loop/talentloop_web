import { useState } from "react";
import * as XLSX from "xlsx";
import {
  FiChevronDown,
  FiDownload,
  FiDollarSign,
  FiCreditCard,
} from "react-icons/fi";
import type { IconType } from "react-icons";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import StatCard from "../components/StatCard";

interface EarningsData {
  day: string;
  value: number;
}

interface SourceData {
  name: string;
  value: number;
  color: string;
}

interface Activity {
  rank: number;
  name: string;
  earnings: string;
  workers: number;
  growth: string;
}

interface StatItem {
  title: string;
  value: string;
  label: string;
  Icon: IconType;
}

const earningsData: EarningsData[] = [
  { day: "May 1", value: 15 },
  { day: "May 3", value: 18 },
  { day: "May 5", value: 30 },
  { day: "May 8", value: 35 },
  { day: "May 12", value: 35 },
  { day: "May 15", value: 42 },
  { day: "May 17", value: 35 },
  { day: "May 20", value: 55 },
  { day: "May 24", value: 65 },
  { day: "May 26", value: 60 },
  { day: "May 29", value: 90 },
  { day: "May 31", value: 95 },
];

const sourceData: SourceData[] = [
  {
    name: "Commission",
    value: 82,
    color: "#17324D",
  },
  {
    name: "Bonus",
    value: 18,
    color: "#AFC4E8",
  },
];

const recentActivities: Activity[] = [
  {
    rank: 1,
    name: "Austin Olatunji",
    earnings: "₦145,000",
    workers: 54,
    growth: "+24.5%",
  },
  {
    rank: 2,
    name: "James Frank",
    earnings: "₦105,000",
    workers: 46,
    growth: "+20.1%",
  },
  {
    rank: 3,
    name: "Obinna Ike",
    earnings: "₦83,415",
    workers: 38,
    growth: "+14.5%",
  },
  {
    rank: 4,
    name: "Kate Asana",
    earnings: "₦68,700",
    workers: 26,
    growth: "+8.5%",
  },
  {
    rank: 5,
    name: "Ese Obiro",
    earnings: "₦44,950",
    workers: 18,
    growth: "+4.5%",
  },
];

const stats: StatItem[] = [
  {
    title: "Total Agent Earning",
    value: "24",
    label: "",
    Icon: FiCreditCard,
  },
  {
    title: "Total Payout",
    value: "₦1,245,500",
    label: "",
    Icon: FiDollarSign,
  },
];

export default function AgentEarningsReportPage() {
  const [month, setMonth] = useState<string>("May");
  const [agent, setAgent] = useState<string>("All Agent");

  const handleExport = () => {
    const exportData = recentActivities.map((item) => ({
      Rank: item.rank,
      Agent: item.name,
      Earnings: item.earnings,
      Workers: item.workers,
      Growth: item.growth,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    worksheet["!cols"] = [
      { wch: 10 },
      { wch: 30 },
      { wch: 18 },
      { wch: 15 },
      { wch: 15 },
    ];

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Top Performing Agents"
    );

    XLSX.writeFile(
      workbook,
      `Agent_Earnings_Report_${
        new Date().toISOString().split("T")[0]
      }.xlsx`
    );
  };


  return (
    <section className="space-y-8">
      <h1 className="text-[42px] font-bold text-[#22324A]">
        Agent Earnings Report
      </h1>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative">
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="appearance-none rounded-full border border-slate-200 bg-white px-6 py-3 pr-10 text-sm font-medium text-[#22324A] shadow-sm focus:outline-none"
            >
              <option value="May">May</option>
              <option value="April">April</option>
              <option value="March">March</option>
              <option value="February">February</option>
            </select>

            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <div className="relative">
            <select
              value={agent}
              onChange={(e) => setAgent(e.target.value)}
              className="appearance-none rounded-full border border-slate-200 bg-white px-6 py-3 pr-10 text-sm font-medium text-[#22324A] shadow-sm focus:outline-none"
            >
              <option value="All Agent">All Agent</option>
              <option value="Agent Ola">Agent Ola</option>
              <option value="Agent James">Agent James</option>
              <option value="Agent Kate">Agent Kate</option>
            </select>

            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

       <button
  onClick={handleExport}
  className="flex h-11 items-center gap-2 rounded-full bg-[#0D3553] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0B2C45]"
>
  <FiDownload />
  Export
</button>
      </div>

      <div className="grid max-w-3xl gap-5 md:grid-cols-2">
        {stats.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            label={item.label}
            Icon={item.Icon}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.8fr_0.9fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-[#22324A]">
            Earnings Overview
          </h2>

          <p className="mt-2 text-slate-400">This Month</p>

          <div className="mt-6 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={earningsData}>
                <CartesianGrid stroke="#E5E7EB" vertical={false} />

                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                  tickFormatter={(value) => `₦${value}k`}
                />

                <Tooltip
                  formatter={(value) => [`₦${value}k`, "Earnings"]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #E5E7EB",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#24364B"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#24364B" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="h-[380px] rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-[#22324A]">
            Earnings by Source
          </h2>

          <p className="mt-2 text-slate-400">Last 30 days</p>

          <div className="mt-6 h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  dataKey="value"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={2}
                >
                  {sourceData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.color}
                    />
                  ))}
                </Pie>

                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-sm text-slate-600">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

          

           {/* Top Performing Agents */}
      <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-[34px] font-bold text-[#22324A]">
          Top Performing Agents
        </h2>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 text-left text-sm text-slate-400">
                <th className="pb-5 font-medium">Rank</th>
                <th className="pb-5 font-medium">Agent</th>
                <th className="pb-5 font-medium">Earnings</th>
                <th className="pb-5 font-medium">Workers</th>
                <th className="pb-5 font-medium text-right">Growth</th>
              </tr>
            </thead>

            <tbody>
              {recentActivities.map((item) => (
                <tr
                  key={item.rank}
                  className="border-b border-slate-100 last:border-none"
                >
                  <td className="py-6 font-semibold text-[#22324A]">
                    {item.rank}
                  </td>

                  <td className="py-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#17324D] font-semibold text-white">
                        {item.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>

                      <span className="font-semibold text-[#22324A]">
                        {item.name}
                      </span>
                    </div>
                  </td>

                  <td className="py-6 font-semibold text-[#22324A]">
                    {item.earnings}
                  </td>

                  <td className="py-6 font-semibold text-[#22324A]">
                    {item.workers}
                  </td>

                  <td className="py-6 text-right font-semibold text-[#22C55E]">
                    ▲ {item.growth}
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