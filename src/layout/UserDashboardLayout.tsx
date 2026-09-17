import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import UserSidebar from "../components/user/UserSidebar";
import UserTopbar from "../components/user/UserTopbar";

export default function UserDashboardLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const hideSearch =
    location.pathname === "/dashboard/profile" ||
    location.pathname === "/dashboard/profile/security" ||
    location.pathname === "/dashboard/notifications" ||
    location.pathname === "/dashboard/messages" ||
    location.pathname === "/dashboard/profile/edit";

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F7FAF9]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed left-0 top-0 z-50 h-screen w-[254px]",
          "transform transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <UserSidebar onNavigate={() => setSidebarOpen(false)} />
      </aside>

      {/* Main area */}
      <div className="min-h-screen w-full lg:pl-[254px]">
        {/* Topbar */}
        <UserTopbar
          showSearch={!hideSearch}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Page content */}
        <main className="min-h-screen px-4 pt-[80px] sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1113px] pb-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}