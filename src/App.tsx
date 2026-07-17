/*import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import DashboardLayout from './layout/DashboardLayout.jsx'
import OverviewPage from './pages/OverviewPage.jsx'
import UsersPage from './pages/UsersPage.jsx'
import AgentApplicationsPage from './pages/AgentApplicationsPage.jsx'
import TransactionsPage from './pages/TransactionsPage.jsx'
import WalletDepositsPage from './pages/WalletDepositsPage.jsx'
import CategoriesPage from './pages/CategoriesPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'*/

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import type { ReactNode } from "react";

import DashboardLayout from "./layout/DashboardLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import OverviewPage from "./pages/OverviewPage.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import AgentApplicationsPage from "./pages/AgentApplicationsPage.jsx";
import TransactionsPage from "./pages/TransactionsPage.jsx";
import WalletDepositsPage from "./pages/WalletDepositsPage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import WithdrawalRequestPage from "./pages/WithdrawalRequestPage.jsx";
import WithdrawalHistoryPage from "./pages/WithdrawalHistoryPage";
import AgentEarningsReportPage from "./pages/AgentEarningsReportPage";
import BonusManagementPage from "./pages/BonusManagementPage";
function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Dashboard */}
        <Route
          path="/"
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
70e21daeb5dda1ef7e7d98993dafc036ab27c1da
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="wallet-deposits" element={<WalletDepositsPage />} />
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
  path="/bonus-management"
  element={<BonusManagementPage />}
/>
          <Route path="categories" element={<CategoriesPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{ duration: 3000 }}
      />
    </BrowserRouter>
  );
}

export default App;