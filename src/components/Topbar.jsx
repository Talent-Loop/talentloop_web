import { useEffect, useState } from "react";
import { FiBell, FiSearch } from "react-icons/fi";
import { getCurrentUser } from "../services/auth";

export default function Topbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();

        console.log("CURRENT USER:", response);

        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);

        if (error?.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "AD";

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-6">
        <div className="flex-1">
          <div className="relative w-full">
            <FiSearch className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              placeholder="Search name or email"
              className="h-14 w-full rounded-full border border-slate-200 bg-white pl-14 pr-5 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center text-slate-500 transition hover:text-slate-700"
          >
            <FiBell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Logout
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#123B5D] text-sm font-semibold text-white">
              {initials}
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-700">
                {user?.name || "Loading..."}
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