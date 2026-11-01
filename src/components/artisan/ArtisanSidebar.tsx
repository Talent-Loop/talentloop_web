
import { useEffect, useState } from "react";
import {
  Bell,
  BriefcaseBusiness,
  Grid2X2,
  Mail,
  User,
  WalletCards,
  ShieldCheck,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface ArtisanSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ArtisanSidebar({
  isOpen,
  onClose,
}: ArtisanSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [profilePhoto, setProfilePhoto] = useState("");

  useEffect(() => {
    const savedPhoto = localStorage.getItem("profilePhotoUrl");

    if (savedPhoto) {
      setProfilePhoto(savedPhoto);
    }
  }, []);

  const goTo = (path: string) => {
    navigate(path);
    onClose();
  };

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
    <>
      {/* Mobile overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[254px] shrink-0 flex-col overflow-hidden bg-[#10344A] px-4 py-6 shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="mb-10 flex shrink-0 items-center justify-between px-2">
          <div className="flex items-center gap-2">
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

          {/* Mobile close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-white transition hover:bg-white/10 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex shrink-0 flex-col gap-2">
          {/* Dashboard */}
          <button
            type="button"
            onClick={() => goTo("/artisan")}
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
            onClick={() => goTo("/artisan/my-jobs")}
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
            onClick={() => goTo("/messages")}
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
            onClick={() => goTo("/commission")}
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
            onClick={() => goTo("/notification")}
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
            onClick={() => goTo("/profile")}
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
        <div className="mt-auto flex shrink-0 items-center gap-3 border-t border-white/10 px-2 pt-5">
          {/* Profile Photo */}
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt="Profile"
              className="h-9 w-9 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-[#17324D]">
              DE
            </div>
          )}

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
    </>
  );
}
