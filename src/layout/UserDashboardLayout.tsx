import { Outlet, useLocation } from "react-router-dom";

import UserSidebar from "../components/user/UserSidebar";
import UserTopbar from "../components/user/UserTopbar";

export default function UserDashboardLayout() {
  const location = useLocation();

  const hideSearch =
    location.pathname === "/dashboard/profile" ||
    location.pathname === "/dashboard/profile/security" ||
    location.pathname === "/dashboard/notifications" ||
    location.pathname === "/dashboard/messages" ||
    location.pathname === "/dashboard/profile/edit";

  return (
    <div className="flex min-h-screen w-full bg-[#F7FAF9]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-50 h-screen w-[261px] flex-shrink-0">
        <UserSidebar />
      </aside>

      {/* Main area */}
      <div className="ml-[261px] min-h-screen min-w-0 flex-1 bg-[#F7FAF9]">
        {/* Topbar */}
        <UserTopbar showSearch={!hideSearch} />

        {/* Page content */}
        <main className="min-h-screen px-[10px] pt-[80px]">
          <div className="mx-auto w-full max-w-[1000px] pb-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}