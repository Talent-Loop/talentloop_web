
import { NavLink } from "react-router-dom";

import {
  FiShield,
  FiGrid,
  FiBriefcase,
  FiMessageSquare,
  FiCreditCard,
  FiBell,
  FiUser,
} from "react-icons/fi";

const links = [
  { label: "Dashboard", to: "/dashboard", icon: FiGrid },
  { label: "My Jobs", to: "/dashboard/jobs", icon: FiBriefcase },
  { label: "Messages", to: "/dashboard/messages", icon: FiMessageSquare },
  { label: "Payment", to: "/dashboard/payment", icon: FiCreditCard },
  { label: "Notification", to: "/dashboard/notifications", icon: FiBell },
  { label: "Profile", to: "/dashboard/profile", icon: FiUser },
];

export default function UserSidebar() {
  return (
    <aside className="flex h-dvh w-full flex-col overflow-hidden bg-[#0D2E43] text-white">
      {/* Logo */}
      <div className="flex h-[80px] flex-shrink-0 items-center border-b border-white/10 px-5">
        <div className="flex items-center gap-[9px]">
          <div className="flex h-[31px] w-[31px] items-center justify-center rounded-[6px] bg-[#175071]">
            <FiShield className="h-[19px] w-[19px] text-white" strokeWidth={2} />
          </div>

          <div className="flex flex-col">
            <h1 className="font-['Montserrat'] text-[14px] font-semibold leading-4 text-white">
              TALENTLOOP
            </h1>

            <p className="mt-[2px] font-['Montserrat'] text-[9px] font-medium leading-[11px] tracking-[0.02em] text-[#B8C8D2]">
              HELLO MIKE!
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Dashboard navigation"
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-6 sm:py-8"
      >
        <div className="flex flex-col gap-3">
          {links.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/dashboard"}
              className={({ isActive }) =>
                [
                  "flex h-12 flex-shrink-0 items-center gap-4",
                  "font-['Montserrat'] text-[13px] leading-none sm:text-[14px]",
                  "transition-colors duration-200",
                  isActive
                    ? "ml-4 w-[calc(100%-16px)] rounded-l-full bg-[#F7FAF9] pl-5 font-bold text-[#17364A] sm:pl-7"
                    : "mx-6 w-[calc(100%-48px)] rounded-l-full pl-4 font-semibold text-[#F1F5F7] hover:bg-white/10",
                ].join(" ")
              }
            >
              <Icon className="h-5 w-5 flex-shrink-0" strokeWidth={1.7} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* User footer */}
      <div className="flex min-h-[82px] flex-shrink-0 items-center border-t border-white/10 px-4 sm:h-[91px]">
        <div className="flex min-w-0 items-center gap-[10px]">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#175071] font-['Montserrat'] text-[10px] font-semibold text-white">
            MA
          </div>

          <div className="min-w-0">
            <p className="font-['Montserrat'] text-[12px] font-semibold leading-[15px] text-white">
              Mike Alfred
            </p>

            <p className="mt-[2px] max-w-[175px] truncate font-['Montserrat'] text-[9px] leading-[11px] text-[#B8C8D2]">
              www.alfredo@gmail.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
