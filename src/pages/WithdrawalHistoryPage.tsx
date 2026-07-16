import { useState } from "react";
import {
  FiFilter,
  FiDownload,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

interface WithdrawalHistory {
  id: number;
  agent: string;
  amount: string;
  date: string;
  reference: string;
  status: "Completed";
}

export default function WithdrawalHistoryPage() {
  const [agent, setAgent] = useState<string>("All Agents");
  const [dateRange, setDateRange] = useState<string>(
    "1 May - 31 May 2026"
  );

  const history: WithdrawalHistory[] = [
    {
      id: 1,
      agent: "Agent Ola",
      amount: "₦25,000",
      date: "17 May, 2026 - 10:40am",
      reference: "ATL-0010-0023",
      status: "Completed",
    },
    {
      id: 2,
      agent: "Agent James",
      amount: "₦45,000",
      date: "17 May, 2026 - 11:25pm",
      reference: "ATL-0010-0024",
      status: "Completed",
    },
    {
      id: 3,
      agent: "Agent Kelvin",
      amount: "₦4,000",
      date: "18 May, 2026 - 12:58pm",
      reference: "ATL-0010-0025",
      status: "Completed",
    },
    {
      id: 4,
      agent: "Agent Jane",
      amount: "₦16,000",
      date: "18 May, 2026 - 1:45pm",
      reference: "ATL-0010-0026",
      status: "Completed",
    },
    {
      id: 5,
      agent: "Agent Ben",
      amount: "₦65,000",
      date: "18 May, 2026 - 3:56pm",
      reference: "ATL-0010-0027",
      status: "Completed",
    },
    {
      id: 6,
      agent: "Agent Kate",
      amount: "₦85,000",
      date: "18 May, 2026 - 9:59pm",
      reference: "ATL-0010-0028",
      status: "Completed",
    },
    {
      id: 7,
      agent: "Agent Ken",
      amount: "₦15,800",
      date: "18 May, 2026 - 10:25pm",
      reference: "ATL-0010-0029",
      status: "Completed",
    },
    {
      id: 8,
      agent: "Agent Chinda",
      amount: "₦48,000",
      date: "18 May, 2026 - 11:39pm",
      reference: "ATL-0010-0030",
      status: "Completed",
    },
  ];

  return (
    <section className="space-y-8">
      <h1 className="text-[42px] font-bold text-[#22324A]">
        Withdrawal History
      </h1>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setDateRange(e.target.value)
              }
              className="appearance-none rounded-full border border-[#DCE3EA] bg-white px-6 py-3 pr-12 text-sm font-medium text-[#22324A] shadow-sm"
            >
              <option>1 May - 31 May 2026</option>
            </select>

            <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500" />
          </div>

          <div className="relative">
            <select
              value={agent}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setAgent(e.target.value)
              }
              className="appearance-none rounded-full border border-[#DCE3EA] bg-white px-6 py-3 pr-12 text-sm font-medium text-[#22324A] shadow-sm"
            >
              <option>All Agents</option>
              <option>Agent Ola</option>
              <option>Agent James</option>
              <option>Agent Kelvin</option>
            </select>

            <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500" />
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-full border border-[#DCE3EA] bg-white px-6 py-3 text-sm font-semibold text-[#22324A] shadow-sm hover:bg-slate-50">
            <FiFilter />
            Filter
          </button>

          <button className="flex items-center gap-2 rounded-full border border-[#DCE3EA] bg-white px-6 py-3 text-sm font-semibold text-[#22324A] shadow-sm hover:bg-slate-50">
            <FiDownload />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-[#E5EAF0] bg-white shadow-sm">
        <div className="px-7 pt-7">
          <h2 className="text-3xl font-semibold text-[#22324A]">
            Recent Activities
          </h2>
        </div>

        <div className="p-6">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#EEF2F6] text-left text-sm font-semibold text-[#22324A]">
                <th className="rounded-l-xl px-5 py-4">Agent</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Request Date</th>
                <th className="px-5 py-4">Reference</th>
                <th className="rounded-r-xl px-5 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[#EEF2F6] last:border-0"
                >
                  <td className="px-5 py-6 font-semibold text-[#22324A]">
                    {item.agent}
                  </td>

                  <td className="px-5 py-6 font-semibold text-[#22324A]">
                    {item.amount}
                  </td>

                  <td className="px-5 py-6 text-[#4B5563]">
                    {item.date}
                  </td>

                  <td className="px-5 py-6 text-[#4B5563]">
                    {item.reference}
                  </td>

                  <td className="px-5 py-6">
                    <span className="inline-flex rounded-full bg-[#DCFCE7] px-4 py-1 text-sm font-medium text-[#16A34A]">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-[#E5EAF0] bg-white px-6 py-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm font-medium text-[#4B5563]">
          Showing 1 to 8 of 24 results
        </p>

        <div className="flex items-center gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DCE3EA] text-[#64748B] hover:bg-slate-100">
            <FiChevronLeft />
          </button>

          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#0D3553] bg-[#0D3553] text-white">
            1
          </button>

          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DCE3EA] text-[#22324A] hover:bg-slate-100">
            2
          </button>

          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DCE3EA] text-[#22324A] hover:bg-slate-100">
            3
          </button>

          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DCE3EA] text-[#64748B] hover:bg-slate-100">
            <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}