import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import DashboardLayout from "./layout/DashboardLayout.jsx";

import LoginPage from "./pages/LoginPage.jsx";
import OverviewPage from "./pages/OverviewPage.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import VerificationPage from "./pages/VerificationPage.jsx";
import AgentApplicationsPage from "./pages/AgentApplicationsPage.jsx";
import TransactionsPage from "./pages/TransactionsPage.jsx";
import WalletDepositsPage from "./pages/WalletDepositsPage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function ProtectedRoute({ children }) {
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
          <Route path="verification" element={<VerificationPage />} />
          <Route
            path="agent-applications"
            element={<AgentApplicationsPage />}
          />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="wallet-deposits" element={<WalletDepositsPage />} />
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