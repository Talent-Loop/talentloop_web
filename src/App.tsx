import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import type { ReactNode } from "react";

import DashboardLayout from "./layout/DashboardLayout";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import RegisterUserPage from "./pages/RegisterUserPage";
import RegisterProfessionalPage from "./pages/RegisterProfessionalPage";

import OverviewPage from "./pages/OverviewPage";
import UsersPage from "./pages/UsersPage";
import AgentApplicationsPage from "./pages/AgentApplicationsPage";
import TransactionsPage from "./pages/TransactionsPage";
import WalletDepositsPage from "./pages/WalletDepositsPage";
import CategoriesPage from "./pages/CategoriesPage";
import WithdrawalRequestPage from "./pages/WithdrawalRequestPage";
import WithdrawalHistoryPage from "./pages/WithdrawalHistoryPage";
import AgentEarningsReportPage from "./pages/AgentEarningsReportPage";
import BonusManagementPage from "./pages/BonusManagementPage";
import NotFoundPage from "./pages/NotFoundPage";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= USER ================= */}

        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterUserPage />} />

        <Route
          path="/register/professional"
          element={<RegisterProfessionalPage />}
        />

        {/* ================= ADMIN ================= */}

        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<OverviewPage />} />

          <Route path="users" element={<UsersPage />} />

          <Route
            path="agent-applications"
            element={<AgentApplicationsPage />}
          />

          <Route
            path="transactions"
            element={<TransactionsPage />}
          />

          <Route
            path="wallet-deposits"
            element={<WalletDepositsPage />}
          />

          <Route
            path="withdrawal-request"
            element={<WithdrawalRequestPage />}
          />

          <Route
            path="withdrawal-history"
            element={<WithdrawalHistoryPage />}
          />

          <Route
            path="agent-earnings-report"
            element={<AgentEarningsReportPage />}
          />

          <Route
            path="bonus-management"
            element={<BonusManagementPage />}
          />

          <Route
            path="categories"
            element={<CategoriesPage />}
          />
        </Route>

        {/* ================= 404 ================= */}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{ duration: 3000 }}
      />
    </BrowserRouter>
  );
}