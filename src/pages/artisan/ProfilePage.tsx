import { useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronRight,
  LogOut,
  Shield,
  ArrowLeft,
  Camera,
} from "lucide-react";

import ArtisanHeader from "../../components/artisan/ArtisanHeader";
import ArtisanSidebar from "../../components/artisan/ArtisanSidebar";

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#F7FAF9]">
      {/* Sidebar */}
      <ArtisanSidebar />

      {/* Main Content */}
      <div className="min-w-0 flex-1">
        {/* Header */}
        <ArtisanHeader />

        {/* Content */}
        <main className="px-8 pb-8 pt-5">
          <div className="max-w-[900px]">

            {/* Page Title */}
            <h1 className="mb-6 text-[20px] font-semibold text-[#172B3A]">
              Profile
            </h1>

            {/* Profile Card */}
            <div className="mb-5 flex min-h-[96px] items-center justify-between rounded-[7px] border border-[#E2E8E7] bg-white px-8">

              {/* Profile Information */}
              <div className="flex items-center gap-5">

                {/* Profile Image */}
                <div className="relative">
                  <div className="flex h-[74px] w-[74px] items-center justify-center overflow-hidden rounded-full border-[3px] border-[#E4E7E6] bg-[#DDE3E3]">
                    <span className="text-[20px] font-semibold text-[#10344A]">
                      DE
                    </span>
                  </div>

                  {/* Camera Icon */}
                  <div className="absolute bottom-[-2px] right-[-2px] flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-white bg-[#10344A]">
                    <Camera
                      size={11}
                      color="white"
                      strokeWidth={2}
                    />
                  </div>
                </div>

                {/* Name and Details */}
                <div>
                  <h2 className="text-[15px] font-semibold text-[#172B3A]">
                    Dave Ejike
                  </h2>

                  <p className="mt-1 text-[12px] text-[#8A9AA3]">
                    Professional Plumber
                  </p>

                  <p className="mt-1 text-[12px] text-[#8A9AA3]">
                    Lagos, Nigeria
                  </p>
                </div>

              </div>

              {/* View Profile Button */}
              <button
                type="button"
                onClick={() => navigate("/profile/view")}
                className="h-[30px] w-[205px] rounded-[6px] border border-[#10344A] bg-white text-[11px] font-medium text-[#10344A] transition hover:bg-[#10344A] hover:text-white"
              >
                View profile
              </button>

            </div>

            {/* Notifications */}
            <button
              type="button"
              onClick={() => navigate("/profile/notifications")}
              className="mb-3 flex h-[44px] w-full items-center rounded-[7px] border border-[#E5E9E8] bg-white px-4 transition hover:border-[#10344A]"
            >
              <div className="flex items-center gap-3">

                <Bell
                  size={17}
                  strokeWidth={1.7}
                  className="text-[#10344A]"
                />

                <span className="text-[12px] font-medium text-[#263842]">
                  Notifications
                </span>

              </div>

              <div className="ml-auto flex items-center gap-3">

                <span className="flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#FF4B4B] px-1 text-[8px] font-semibold text-white">
                  3
                </span>

                <ChevronRight
                  size={16}
                  strokeWidth={1.8}
                  className="text-[#71818A]"
                />

              </div>
            </button>

            {/* Privacy & Security */}
            <button
              type="button"
              onClick={() => navigate("/profile/security")}
              className="mb-3 flex h-[44px] w-full items-center rounded-[7px] border border-[#E5E9E8] bg-white px-4 transition hover:border-[#10344A]"
            >
              <div className="flex items-center gap-3">

                <Shield
                  size={17}
                  strokeWidth={1.7}
                  className="text-[#10344A]"
                />

                <span className="text-[12px] font-medium text-[#263842]">
                  Privacy & Security
                </span>

              </div>

              <div className="ml-auto flex items-center gap-3">

                <span className="flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#FF4B4B] px-1 text-[8px] font-semibold text-white">
                  3
                </span>

                <ChevronRight
                  size={16}
                  strokeWidth={1.8}
                  className="text-[#71818A]"
                />

              </div>
            </button>

            {/* Log Out */}
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className="flex h-[44px] w-full items-center rounded-[7px] border border-[#E5E9E8] bg-white px-4 text-left transition hover:border-[#FF4B4B]"
            >
              <div className="flex items-center gap-3">

                <LogOut
                  size={17}
                  strokeWidth={1.8}
                  className="text-[#FF4B4B]"
                />

                <span className="text-[12px] font-medium text-[#FF4B4B]">
                  Log Out
                </span>

              </div>
            </button>

            {/* Back Button */}
            <div className="mt-8">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex h-[31px] items-center gap-2 rounded-[5px] bg-[#10344A] px-4 text-[11px] font-medium text-white transition hover:bg-[#0B293A]"
              >
                <ArrowLeft
                  size={14}
                  strokeWidth={2}
                />

                Back
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}