import {
  Bell,
  BriefcaseBusiness,
  Grid2X2,
  Mail,
  User,
  WalletCards,
  ShieldCheck,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ArtisanSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboardActive = location.pathname === "/artisan";
  const isMyJobsActive = location.pathname === "/artisan/my-jobs";

  const isMessagesActive =
    location.pathname === "/messages" ||
    location.pathname === "/messages/chat";

  const isCommissionActive = location.pathname === "/commission";

  const isNotificationActive = location.pathname === "/notification";
  const isProfileActive =
  location.pathname === "/profile" ||
  location.pathname === "/profile/view";

  return (
    <aside className="flex min-h-screen w-[254px] shrink-0 flex-col bg-[#10344A] px-4 py-6">
      {/* Logo */}
      <div className="mb-10 flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
          <ShieldCheck size={20} className="text-white" />
        </div>

        <div>
          <h1 className="text-[15px] font-bold tracking-wide text-white">
            TALENTLOOP
          </h1>

          <p className="mt-0.5 text-[8px] font-medium tracking-wide text-white/60">
            HELLO DAVE!
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {/* Dashboard */}
        <button
          type="button"
          onClick={() => navigate("/artisan")}
          className={`flex w-full items-center gap-3 rounded-full px-4 py-3 text-sm transition-colors ${
            isDashboardActive
              ? "bg-white text-[#17324D]"
              : "text-white hover:bg-white/10"
          }`}
        >
          <Grid2X2 size={17} strokeWidth={2} />
          <span>Dashboard</span>
        </button>

        {/* My Jobs */}
        <button
          type="button"
          onClick={() => navigate("/artisan/my-jobs")}
          className={`flex w-full items-center gap-3 rounded-full px-4 py-3 text-sm transition-colors ${
            isMyJobsActive
              ? "bg-white text-[#17324D]"
              : "text-white hover:bg-white/10"
          }`}
        >
          <BriefcaseBusiness size={17} strokeWidth={2} />
          <span>My Jobs</span>
        </button>

        {/* Messages */}
        <button
          type="button"
          onClick={() => navigate("/messages")}
          className={`flex w-full items-center gap-3 rounded-full px-4 py-3 text-sm transition-colors ${
            isMessagesActive
              ? "bg-white text-[#17324D]"
              : "text-white hover:bg-white/10"
          }`}
        >
          <Mail size={17} strokeWidth={2} />
          <span>Messages</span>
        </button>

        {/* Commission */}
        <button
          type="button"
          onClick={() => navigate("/commission")}
          className={`flex w-full items-center gap-3 rounded-full px-4 py-3 text-sm transition-colors ${
            isCommissionActive
              ? "bg-white text-[#17324D]"
              : "text-white hover:bg-white/10"
          }`}
        >
          <WalletCards size={17} strokeWidth={2} />
          <span>Commission</span>
        </button>

        {/* Notification */}
        <button
          type="button"
          onClick={() => navigate("/notification")}
          className={`flex w-full items-center gap-3 rounded-full px-4 py-3 text-sm transition-colors ${
            isNotificationActive
              ? "bg-white text-[#17324D]"
              : "text-white hover:bg-white/10"
          }`}
        >
          <Bell size={17} strokeWidth={2} />
          <span>Notification</span>
        </button>

        {/* Profile */}
        <button
          type="button"
          onClick={() => navigate("/profile")}
          className={`flex w-full items-center gap-3 rounded-full px-4 py-3 text-sm transition-colors ${
            isProfileActive
              ? "bg-white text-[#17324D]"
              : "text-white hover:bg-white/10"
          }`}
        >
          <User size={17} strokeWidth={2} />
          <span>Profile</span>
        </button>
      </nav>

      {/* User */}
      <div className="mt-auto flex items-center gap-3 border-t border-white/10 px-2 pt-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-[#17324D]">
          DE
        </div>

        <div className="min-w-0">
          <p className="truncate text-[12px] font-medium text-white">
            Dave Ejike
          </p>

          <p className="truncate text-[9px] text-white/50">
            daveejike@gmail.com
          </p>
        </div>
      </div>
    </aside>
  );
}