
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import UserSidebar from "../components/user/UserSidebar";
import UserTopbar from "../components/user/UserTopbar";

export default function UserDashboardLayout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const hideSearch =
    location.pathname === "/dashboard/profile" ||
    location.pathname === "/dashboard/profile/security" ||
    location.pathname === "/dashboard/notifications" ||
    location.pathname === "/dashboard/messages" ||
    location.pathname === "/dashboard/profile/edit";

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-[#F7FAF9]">
      {/* Mobile backdrop */}
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-[60] bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-[70] h-dvh w-[261px] max-w-[85vw] transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <UserSidebar />
      </aside>

      {/* Main content */}
      <div className="min-h-screen min-w-0 md:ml-[261px]">
        <UserTopbar
          showSearch={!hideSearch}
          onMenuClick={() => setMobileMenuOpen((open) => !open)}
          mobileMenuOpen={mobileMenuOpen}
        />

        <main className="min-w-0 px-3 pt-[80px] sm:px-5 md:px-6">
          <div className="mx-auto w-full max-w-[1000px] pb-8 sm:pb-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
