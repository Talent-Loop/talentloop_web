
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import type { ReactNode } from "react";

import DashboardLayout from "./layout/DashboardLayout";
import UserDashboardLayout from "./layout/UserDashboardLayout";

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

// ================= ARTISAN =================

import ArtisanDashboardPage from "./pages/artisan/ArtisanDashboardPage";
import PlaceBidPage from "./pages/artisan/PlaceBidPage";
import MyJobsPage from "./pages/artisan/MyJobsPage";
import JobProgressPage from "./pages/artisan/JobProgressPage";
import UpdateJobStatusPage from "./pages/artisan/UpdateJobStatusPage";
import MessagesPage from "./pages/artisan/MessagesPage";
import ChatPage from "./pages/artisan/ChatPage";
import CommissionPage from "./pages/artisan/CommissionPage";
import ProfilePage from "./pages/artisan/ProfilePage";
import WorkerProfilePage from "./pages/artisan/WorkerProfilePage";
import EditProfilePage from "./pages/artisan/EditProfilePage";
import NotificationPage from "./pages/artisan/NotificationPage";

// ================= GENERAL =================

import NotFoundPage from "./pages/NotFoundPage";

// ================= USER DASHBOARD =================

import UserDashboardPage from "./pages/user/UserDashboardPage";
import PostJobPage from "./pages/user/PostJobPage";
import UserMyJobsPage from "./pages/user/MyJobsPage";
import ViewBidsPage from "./pages/user/ViewBidsPage";
import UserMessagesPage from "./pages/user/MessagesPage";
import UserChatPage from "./pages/user/UserChatPage";
import UserProfilePage from "./pages/user/UserProfilePage";
import UserEditProfilePage from "./pages/user/UserEditProfilePage";
import UserSecuritySettingsPage from "./pages/user/UserSecuritySettingsPage";
import UserNotificationsPage from "./pages/user/UserNotificationsPage";
import UserWorkerProfilePage from "./pages/user/WorkerProfilePage";
import RecentActivities from "./pages/user/RecentActivities";

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
        {/* ================= USER / PUBLIC ================= */}

        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterUserPage />} />

        <Route
          path="/register/professional"
          element={<RegisterProfessionalPage />}
        />

        {/* ================= ARTISAN ================= */}

        <Route path="/artisan" element={<ArtisanDashboardPage />} />

        <Route path="/artisan/my-jobs" element={<MyJobsPage />} />

        <Route path="/my-jobs/:jobId" element={<JobProgressPage />} />

        <Route path="/artisan/place-bid" element={<PlaceBidPage />} />

        <Route
          path="/my-jobs/update-status"
          element={<UpdateJobStatusPage />}
        />

        <Route path="/messages" element={<MessagesPage />} />

        <Route path="/messages/chat" element={<ChatPage />} />

        <Route path="/commission" element={<CommissionPage />} />

        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/profile/view" element={<WorkerProfilePage />} />

        <Route path="/profile/edit" element={<EditProfilePage />} />

        <Route path="/notification" element={<NotificationPage />} />

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

          <Route path="bonus-management" element={<BonusManagementPage />} />

          <Route path="categories" element={<CategoriesPage />} />
        </Route>

        {/* ================= USER DASHBOARD ================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboardPage />} />

          <Route path="jobs" element={<UserMyJobsPage />} />

          <Route path="jobs/bids" element={<ViewBidsPage />} />

          <Route path="post" element={<PostJobPage />} />

          <Route path="messages" element={<UserMessagesPage />} />

          <Route path="messages/:id" element={<UserChatPage />} />

          <Route path="profile" element={<UserProfilePage />} />

          <Route path="profile/edit" element={<UserEditProfilePage />} />

          <Route
            path="profile/security"
            element={<UserSecuritySettingsPage />}
          />

          <Route
            path="notifications"
            element={<UserNotificationsPage />}
          />

          <Route
            path="messages/:id/profile"
            element={<UserWorkerProfilePage />}
          />

          <Route
            path="messages/:id/recent-activities"
            element={<RecentActivities />}
          />
        </Route>

        {/* ================= 404 ================= */}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
    </BrowserRouter>
  );
}

