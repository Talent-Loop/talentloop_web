
import { useEffect, useState } from "react";
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

const API_BASE_URL =
  "https://backend-talentloop.onrender.com/api/v1";

type Profile = {
  _id: string;
  title: string;
  bio: string;
  photoUrl?: string;
  location?: {
    coordinates?: {
      type: string;
      coordinates: number[];
    };
    city?: string;
    country?: string;
  };
  rate: number;
  skills: string[];
  services: unknown[];
  categories: unknown[];
  portfolio: unknown[];
  ratingAvg: number;
  ratingCount: number;
};

type ProfileResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Profile;
};

type UnreadCountResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data:
    | number
    | {
        unreadCount?: number;
        count?: number;
      };
};

export default function ProfilePage() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("accessToken");

        if (!token) {
          setError("You are not authenticated.");
          return;
        }

        const [profileResponse, unreadResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/profile/me`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),

          fetch(`${API_BASE_URL}/notifications/unread-count`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),
        ]);

        if (!profileResponse.ok) {
          throw new Error(
            `Failed to fetch profile (${profileResponse.status})`
          );
        }

        const profileResult: ProfileResponse =
          await profileResponse.json();

        setProfile(profileResult.data);

        if (unreadResponse.ok) {
          const unreadResult: UnreadCountResponse =
            await unreadResponse.json();

          if (typeof unreadResult.data === "number") {
            setUnreadCount(unreadResult.data);
          } else {
            setUnreadCount(
              unreadResult.data?.unreadCount ??
                unreadResult.data?.count ??
                0
            );
          }
        }
      } catch (err) {
        console.error("PROFILE ERROR:", err);
        setError("Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const locationText = profile?.location
    ? [profile.location.city, profile.location.country]
        .filter(Boolean)
        .join(", ")
    : "Location not available";

  const titleText = profile?.title || "Professional";

  // Use the photo returned by the backend first.
  // If the backend GET response does not include photoUrl yet,
  // use the photo URL saved after the successful upload.
  const profilePhoto =
    profile?.photoUrl ||
    localStorage.getItem("profilePhotoUrl") ||
    "";

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

            {loading ? (
              <div className="rounded-[7px] border border-[#E2E8E7] bg-white px-8 py-10 text-center text-[11px] text-[#8A9AA3]">
                Loading profile...
              </div>
            ) : error ? (
              <div className="rounded-[7px] border border-[#E2E8E7] bg-white px-8 py-10 text-center text-[11px] text-[#FF4B4B]">
                {error}
              </div>
            ) : (
              <>
                {/* Profile Card */}
                <div className="mb-5 flex min-h-[96px] items-center justify-between rounded-[7px] border border-[#E2E8E7] bg-white px-8">

                  {/* Profile Information */}
                  <div className="flex items-center gap-5">

                    {/* Profile Image */}
                    <div className="relative">
                      <div className="flex h-[74px] w-[74px] items-center justify-center overflow-hidden rounded-full border-[3px] border-[#E4E7E6] bg-[#DDE3E3]">

                        {profilePhoto ? (
                          <img
                            src={profilePhoto}
                            alt="Profile"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-[20px] font-semibold text-[#10344A]">
                            DE
                          </span>
                        )}

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
                        {titleText}
                      </p>

                      <p className="mt-1 text-[12px] text-[#8A9AA3]">
                        {locationText}
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

                    {unreadCount > 0 && (
                      <span className="flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#FF4B4B] px-1 text-[8px] font-semibold text-white">
                        {unreadCount > 99 ? "99+" : unreadCount}
                      </span>
                    )}

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
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
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
              </>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
