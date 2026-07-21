import { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import type { IconType } from "react-icons";
import {
  FiCreditCard,
  FiDollarSign,
  FiCheckCircle,
  FiXCircle,
  FiFilter,
  FiDownload,
  FiChevronDown,
} from "react-icons/fi";

import StatCard from "../components/StatCard";

interface Stat {
  title: string;
  value: string;
  label: string;
  Icon: IconType;
}

interface WithdrawalRequest {
  id: number;
  agent: string;
  amount: string;
  date: string;
  method: string;
  status: "Pending";
}

export default function WithdrawalRequestPage() {
  const [agent, setAgent] = useState<string>("All Agents");
  const [method, setMethod] = useState<string>("All Payment Method");
  const [showFilters, setShowFilters] = useState(false);

  const stats: Stat[] = [
    {
      title: "Pending Requests",
      value: "24",
      label: "",
      Icon: FiCreditCard,
    },
    {
      title: "Total Amount Pending",
      value: "₦1,245,500",
      label: "",
      Icon: FiDollarSign,
    },
    {
      title: "Approved Today",
      value: "8",
      label: "₦255,000",
      Icon: FiCheckCircle,
    },
    {
      title: "Rejected Today",
      value: "2",
      label: "₦45,000",
      Icon: FiXCircle,
    },
  ];

  const requests: WithdrawalRequest[] = [
    {
      id: 1,
      agent: "Agent Ola",
      amount: "₦25,000",
      date: "17 May, 2026 - 10:00am",
      method: "Bank Transfer",
      status: "Pending",
    },
    {
      id: 2,
      agent: "Agent James",
      amount: "₦45,000",
      date: "17 May, 2026 - 10:50pm",
      method: "Bank Transfer",
      status: "Pending",
    },
    {
      id: 3,
      agent: "Agent Kelvin",
      amount: "₦4,000",
      date: "18 May, 2026 - 12:50pm",
      method: "Bank Transfer",
      status: "Pending",
    },
    {
      id: 4,
      agent: "Agent Jane",
      amount: "₦16,000",
      date: "18 May, 2026 - 1:15pm",
      method: "Bank Transfer",
      status: "Pending",
    },
    {
      id: 5,
      agent: "Agent Ben",
      amount: "₦65,000",
      date: "18 May, 2026 - 3:45pm",
      method: "Bank Transfer",
      status: "Pending",
    },
    {
      id: 6,
      agent: "Agent Kate",
      amount: "₦85,000",
      date: "18 May, 2026 - 9:50pm",
      method: "Bank Transfer",
      status: "Pending",
    },
    {
      id: 7,
      agent: "Agent Ken",
      amount: "₦15,800",
      date: "18 May, 2026 - 10:05pm",
      method: "Bank Transfer",
      status: "Pending",
    },
    {
      id: 8,
      agent: "Agent Chinda",
      amount: "₦48,000",
      date: "18 May, 2026 - 11:33pm",
      method: "Bank Transfer",
      status: "Pending",
    },
  ];

  const handleExport = () => {
  const exportData = requests.map((item) => ({
    Agent: item.agent,
    Amount: item.amount,
    "Request Date": item.date,
    "Payment Method": item.method,
    Status: item.status,
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);

  // Make columns wider
  worksheet["!cols"] = [
    { wch: 20 },
    { wch: 15 },
    { wch: 28 },
    { wch: 20 },
    { wch: 15 },
  ];

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Withdrawal Requests"
  );

  const fileName = `Withdrawal_Requests_${
    new Date().toISOString().split("T")[0]
  }.xlsx`;

  XLSX.writeFile(workbook, fileName);
};

  return (
    <section className="space-y-7">
      <h1 className="text-[42px] font-bold text-[#22324A]">
        Withdrawal Request
      </h1>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
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

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative">
            <select
              value={agent}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setAgent(e.target.value)
              }
              className="appearance-none rounded-full border border-slate-200 bg-white px-5 py-3 pr-10 text-sm text-black shadow-sm focus:outline-none"
            >
              <option>All Agents</option>
              <option>Agent Ola</option>
              <option>Agent James</option>
              <option>Agent Kelvin</option>
            </select>

            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <div className="relative">
            <select
              value={method}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setMethod(e.target.value)
              }
              className="appearance-none rounded-full border border-slate-200 bg-white px-5 py-3 pr-10 text-sm text-black shadow-sm focus:outline-none"
            >
              <option>All Payment Method</option>
              <option>Bank Transfer</option>
              <option>Wallet</option>
            </select>

            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div className="flex gap-3">
          <button
  onClick={() => setShowFilters(!showFilters)}
  className="flex h-11 items-center gap-2 rounded-full border border-[#D9E2EC] bg-white px-6 text-sm font-semibold text-[#22324A] shadow-sm transition hover:bg-slate-50"
>
  <FiFilter />
  Filter
</button>

          <button
  onClick={handleExport}
  className="flex h-11 items-center gap-2 rounded-full bg-[#0D3553] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0B2C45]"
>
            <FiDownload className="text-base" />
            Export
          </button>
        </div>
      </div>

      {showFilters && (
  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
    <h3 className="mb-5 text-lg font-semibold text-[#22324A]">
      Filter Requests
    </h3>

    <div className="grid gap-5 md:grid-cols-2">
      <div>
        <label className="mb-2 block text-sm font-medium">
          Status
        </label>

        <select className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-black">
          <option className="text-black">All</option>
<option className="text-black">Pending</option>
<option className="text-black">Approved</option>
<option className="text-black">Rejected</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Date
        </label>

        <input
  type="date"
  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-black"
/>
      </div>
    </div>

    <div className="mt-6 flex justify-end gap-3">
      <button
        onClick={() => setShowFilters(false)}
        className="rounded-xl border px-5 py-2"
      >
        Cancel
      </button>

      <button
        className="rounded-xl bg-[#0D3553] px-5 py-2 text-white"
      >
        Apply Filter
      </button>
    </div>
  </div>
)}

      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr className="text-left text-sm font-semibold text-slate-500">
                <th className="px-8 py-5">Agent</th>
                <th className="px-8 py-5">Amount</th>
                <th className="px-8 py-5">Request Date</th>
                <th className="px-8 py-5">Payment Method</th>
                <th className="px-8 py-5">Status</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-8 py-6 font-medium text-[#22324A]">
                    {item.agent}
                  </td>

                  <td className="px-8 py-6 font-semibold text-[#22324A]">
                    {item.amount}
                  </td>

                  <td className="px-8 py-6 text-slate-600">
                    {item.date}
                  </td>

                  <td className="px-8 py-6 text-slate-600">
                    {item.method}
                  </td>

                  <td className="px-8 py-6">
                    <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 px-8 py-5">
          <p className="text-sm text-slate-500">
            Showing 1–8 of 24 Requests
          </p>

          <div className="flex gap-2">
            <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50">
              Previous
            </button>

            <button className="rounded-lg bg-[#0F4C75] px-4 py-2 text-sm text-white">
              1
            </button>

            <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50">
              2
            </button>

            <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50">
              3
            </button>

            <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}