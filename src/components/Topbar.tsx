
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiBell,
  FiSearch,
} from "react-icons/fi";
import { getCurrentUser } from "../services/auth";
import type { User } from "../types/users";
import axios from "axios";

interface TopbarProps {
  onMenuClick: () => void;
  isMenuOpen: boolean;
}

export default function Topbar({
  onMenuClick,
  isMenuOpen,
}: TopbarProps) {
  const [user, setUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      try {
        const response = await getCurrentUser();

        console.log("CURRENT USER:", response);

        setUser(response.data);
      } catch (error: unknown) {
        console.error("Failed to fetch user:", error);

        if (
          axios.isAxiosError(error) &&
          error.response?.status === 401
        ) {
          localStorage.removeItem("token");
          window.location.href = "/admin/login";
        }
      }
    };

    fetchUser();
  }, []);

  const handleLogout = (): void => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  const fullName =
    user ? `${user.firstName} ${user.lastName}` : "";

  const initials =
    fullName
      .split(" ")
      .map((part: string) => part.charAt(0))
      .join("")
      .toUpperCase() || "AD";

  return (
    <div className="mb-5 sm:mb-6">
      <div className="flex items-center justify-between gap-3 sm:gap-6">
        {/* Animated Mobile Hamburger */}
        <motion.button
          type="button"
          onClick={onMenuClick}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          whileTap={{ scale: 0.9 }}
          className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#17364C] shadow-sm transition-colors hover:bg-slate-50 md:hidden"
        >
          <span className="relative flex h-5 w-6 flex-col items-center justify-center">
            <motion.span
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 0 : -7,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute h-[2px] w-6 rounded-full bg-current"
            />

            <motion.span
              animate={{
                opacity: isMenuOpen ? 0 : 1,
                scaleX: isMenuOpen ? 0 : 1,
              }}
              transition={{ duration: 0.2 }}
              className="absolute h-[2px] w-6 rounded-full bg-current"
            />

            <motion.span
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? 0 : 7,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute h-[2px] w-6 rounded-full bg-current"
            />
          </span>
        </motion.button>

        {/* Search */}
        <div className="hidden flex-1 sm:block">
          <div className="relative w-full">
            <FiSearch className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or email"
              className="h-12 w-full rounded-full border border-slate-200 bg-white pl-14 pr-5 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200 sm:h-14"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="ml-auto flex flex-shrink-0 items-center gap-2 sm:gap-4">
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center text-slate-500 transition hover:text-slate-700"
          >
            <FiBell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-slate-200 px-2.5 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100 sm:px-3 sm:text-sm"
          >
            Logout
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#123B5D] text-xs font-semibold text-white sm:h-10 sm:w-10 sm:text-sm">
              {initials}
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-700">
                {fullName || "Loading..."}
              </p>

              <p className="text-xs text-slate-500">
                {user?.email || ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
