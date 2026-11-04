
import { NavLink } from "react-router-dom";
import type { IconType } from "react-icons";

import {
  FiBarChart2,
  FiFileText,
  FiHome,
  FiUsers,
  FiCheckCircle,
  FiDollarSign,
  FiList,
  FiCreditCard,
  FiRotateCcw,
  FiClipboard,
  FiGift,
} from "react-icons/fi";

interface SidebarLink {
  label: string;
  to: string;
  icon: IconType;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const links: SidebarLink[] = [
  { label: "Overview", to: "/admin", icon: FiHome },
  { label: "User", to: "/admin/users", icon: FiUsers },
  {
    label: "Agent Application",
    to: "/admin/agent-applications",
    icon: FiFileText,
  },
  {
    label: "Transactions",
    to: "/admin/transactions",
    icon: FiBarChart2,
  },
  {
    label: "Wallet Deposits",
    to: "/admin/wallet-deposits",
    icon: FiDollarSign,
  },
  {
    label: "Withdrawal Request",
    to: "/admin/withdrawal-request",
    icon: FiCreditCard,
  },
  {
    label: "Categories",
    to: "/admin/categories",
    icon: FiList,
  },
  {
    label: "Withdrawal History",
    to: "/admin/withdrawal-history",
    icon: FiRotateCcw,
  },
  {
    label: "Agent Earnings Report",
    to: "/admin/agent-earnings-report",
    icon: FiClipboard,
  },
  {
    label: "Bonus Management",
    to: "/admin/bonus-management",
    icon: FiGift,
  },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside
     className={`fixed inset-y-0 left-0 z-[70] flex h-screen w-56 flex-col overflow-hidden border-r border-white/10 bg-[#10344D] text-white shadow-xl transition-transform duration-300 ease-in-out md:sticky md:top-0 md:flex md:h-auto md:min-h-screen md:self-stretch md:shrink-0 md:translate-x-0 md:shadow-none ${
  isOpen ? "translate-x-0" : "-translate-x-full"
}`}
    >
      {/* Logo */}
      <div className="shrink-0 px-6 py-6 md:py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1B4866]">
            <FiCheckCircle className="h-6 w-6 text-white" />
          </div>

          <div>
            <h2 className="text-base font-bold leading-none text-white">
              Admin
            </h2>

            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.15em] text-slate-300">
              Talent Loop Management
            </p>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-white/10" />

      {/* Navigation */}
      <nav className="min-h-0 flex-1 overflow-y-auto px-4 py-8 md:py-4">
        <div className="space-y-2 md:space-y-1.5">
          {links.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/admin"}
              onClick={onClose}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-3 rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-200 md:py-2.5"
                  : "flex items-center gap-3 rounded-full px-4 py-3 text-sm font-medium text-slate-100 transition-all duration-200 hover:bg-white/10 hover:text-white md:py-2.5"
              }
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Admin Profile */}
      <div className="shrink-0 border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB] text-xs font-semibold text-white shadow-md">
            AO
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              Admin Operator
            </p>

            <p className="truncate text-xs text-slate-300">
              admin@servo.io
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
