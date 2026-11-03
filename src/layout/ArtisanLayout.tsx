
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import ArtisanHeader from "../components/artisan/ArtisanHeader";
import ArtisanSidebar from "../components/artisan/ArtisanSidebar";

export default function ArtisanLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close the mobile sidebar whenever navigation changes.
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Prevent background scrolling while the mobile sidebar is open.
  useEffect(() => {
    if (!sidebarOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen((previous) => !previous);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-[#F5F7F8]">
      <ArtisanSidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      <div className="min-h-screen min-w-0 lg:ml-[254px]">
        <ArtisanHeader
          isMenuOpen={sidebarOpen}
          onMenuClick={toggleSidebar}
        />

        <main className="min-w-0 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
