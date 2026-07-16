import { useEffect, useState } from "react";
import {
  FiGift,
  FiDollarSign,
  FiCreditCard,
  FiPlus,
  FiChevronDown,
  FiX,
} from "react-icons/fi";

import StatCard from "../components/StatCard";

// import {
//   getBonuses,
//   assignBonus,
// } from "../services/bonuses";

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

export default function BonusManagementPage() {
  const [tab, setTab] = useState("All Bonuses");

  const [bonuses, setBonuses] = useState([]);

  const [loading, setLoading] = useState(false);

  const [showAssignModal, setShowAssignModal] = useState(false);

  const [form, setForm] = useState({
    agent: "",
    type: "",
    amount: "",
    note: "",
  });

  useEffect(() => {
    fetchBonuses();
  }, []);

  const fetchBonuses = async () => {
    try {
      setLoading(true);

      // const response = await getBonuses();
      // setBonuses(response.data.bonuses);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignBonus = async () => {
    try {
      // await assignBonus(form);

      setShowAssignModal(false);

      setForm({
        agent: "",
        type: "",
        amount: "",
        note: "",
      });

      fetchBonuses();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="space-y-8">
      <h1 className="text-[42px] font-bold text-[#22324A]">
        Bonus Management
      </h1>

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
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-slate-400"
                  >
                    Loading...
                  </td>
                </tr>
              ) : (
                bonuses.map((item: any) => (
                  <tr
                    key={item._id}
                    className="border-t border-slate-100"
                  >
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#123552] font-semibold text-white">
                          {item.agent?.firstName?.[0]}
                        </div>

                        <span className="font-medium text-[#22324A]">
                          {item.agent?.firstName} {item.agent?.lastName}
                        </span>
                      </div>
                    </td>

                    <td>{item.type}</td>

                    <td>{item.amount}</td>

                    <td>
                      {new Date(item.createdAt).toLocaleDateString()}
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
                ))
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

            <div className="grid gap-6">
              <input
                placeholder="Agent ID"
                value={form.agent}
                onChange={(e) =>
                  setForm({
                    ...form,
                    agent: e.target.value,
                  })
                }
                className="rounded-xl border p-4"
              />

              <input
                placeholder="Bonus Type"
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value,
                  })
                }
                className="rounded-xl border p-4"
              />

              <input
                placeholder="Amount"
                value={form.amount}
                onChange={(e) =>
                  setForm({
                    ...form,
                    amount: e.target.value,
                  })
                }
                className="rounded-xl border p-4"
              />

              <textarea
                rows={4}
                placeholder="Reason"
                value={form.note}
                onChange={(e) =>
                  setForm({
                    ...form,
                    note: e.target.value,
                  })
                }
                className="rounded-xl border p-4"
              />

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="rounded-xl border px-8 py-3"
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