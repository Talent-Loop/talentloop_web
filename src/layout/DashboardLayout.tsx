import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const routeTitles: Record<string, string> = {
  "/": "Overview",
  "/users": "User",
  "/agent-applications": "Agent Applications",
  "/transactions": "Transactions",
  "/wallet-deposits": "Wallet Deposits",
  "/withdrawal-request": "Withdrawal Request",
  "/withdrawal-history": "Withdrawal History",
  "/agent-earnings-report": "Agent Earnings Report",
  "/bonus-management": "Bonus Management",
  "/categories": "Categories",
};

export default function DashboardLayout() {
  const location = useLocation();

  const title =
    routeTitles[location.pathname] ?? "Dashboard";

  return (
    <div className="min-h-screen bg-[#F5F7F9]">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex-1 px-8 py-6 lg:px-10">
          <Topbar />

          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}