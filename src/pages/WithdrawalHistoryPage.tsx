import { useState } from "react";
import * as XLSX from "xlsx";
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

  const [agent, setAgent] = useState<string>("All Agents");

  const [dateRange, setDateRange] = useState<string>(
    "1 May - 31 May 2026"
  );

  const [filteredHistory, setFilteredHistory] =
    useState<WithdrawalHistory[]>(history);

  const handleExport = () => {
    const exportData = filteredHistory.map((item) => ({
      Agent: item.agent,
      Amount: item.amount,
      "Request Date": item.date,
      Reference: item.reference,
      Status: item.status,
    }));

    const worksheet =
      XLSX.utils.json_to_sheet(exportData);

    worksheet["!cols"] = [
      { wch: 20 },
      { wch: 15 },
      { wch: 28 },
      { wch: 22 },
      { wch: 15 },
    ];

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Withdrawal History"
    );

    XLSX.writeFile(
      workbook,
      `Withdrawal_History_${
        new Date().toISOString().split("T")[0]
      }.xlsx`
    );
  };

 const handleFilter = () => {
  let filtered = history;

  // Agent filter
  if (agent !== "All Agents") {
    filtered = filtered.filter(
      (item) => item.agent === agent
    );
  }

  // Date filter
  if (dateRange !== "1 May - 31 May 2026") {
    filtered = filtered.filter((item) =>
      item.date.startsWith(dateRange)
    );
  }

  setFilteredHistory(filtered);
};

    return (
    <section className="space-y-8">
      <h1 className="text-[42px] font-bold text-[#22324A]">
        Withdrawal History
      </h1>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row">
          {/* Date Filter */}
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setDateRange(e.target.value)
              }
              className="appearance-none rounded-full border border-[#DCE3EA] bg-white px-6 py-3 pr-12 text-sm font-medium text-black shadow-sm"
            >
              <option>1 May - 31 May 2026</option>
              <option>17 May 2026</option>
              <option>18 May 2026</option>
            </select>

            <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500" />
          </div>

          {/* Agent Filter */}
          <div className="relative">
            <select
              value={agent}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setAgent(e.target.value)
              }
              className="appearance-none rounded-full border border-[#DCE3EA] bg-white px-6 py-3 pr-12 text-sm font-medium text-black shadow-sm"
            >
              <option>All Agents</option>
              <option>Agent Ola</option>
              <option>Agent James</option>
              <option>Agent Kelvin</option>
              <option>Agent Jane</option>
              <option>Agent Ben</option>
              <option>Agent Kate</option>
              <option>Agent Ken</option>
              <option>Agent Chinda</option>
            </select>

            <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500" />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleFilter}
            className="flex items-center gap-2 rounded-full border border-[#DCE3EA] bg-white px-6 py-3 text-sm font-semibold text-[#22324A] shadow-sm hover:bg-slate-50"
          >
            <FiFilter />
            Apply Filters
          </button>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-full bg-[#0D3553] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0B2C45]"
          >
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
              {filteredHistory.map((item) => (
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

              {filteredHistory.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-slate-500"
                  >
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-[#E5EAF0] bg-white px-6 py-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm font-medium text-[#4B5563]">
          Showing {filteredHistory.length} result
          {filteredHistory.length !== 1 && "s"}
        </p>

        <div className="flex items-center gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DCE3EA] text-[#64748B] hover:bg-slate-100">
            <FiChevronLeft />
          </button>

          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#0D3553] bg-[#0D3553] text-white">
            1
          </button>

          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DCE3EA] text-[#64748B] hover:bg-slate-100">
            <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}