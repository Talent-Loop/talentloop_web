import { useNavigate } from "react-router-dom";
import {
  FiBell,
  FiCamera,
  FiChevronRight,
  FiLogOut,
  FiShield,
} from "react-icons/fi";
import userHero from "../../assets/userHero.png";

export default function UserProfilePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <section className="w-full pb-12 pt-5 sm:pt-7">
      {/* Title */}
      <h1 className="font-['Inter'] text-[22px] font-bold leading-8 text-[#24364B] sm:text-[24px]">
        Profile
      </h1>

      {/* Profile header */}
      <div className="mt-7 flex w-full flex-col gap-6 rounded-[10px] border border-[#D8E0DE] bg-[#F7FAF9] p-5 sm:mt-9 sm:min-h-[161px] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-7 lg:px-10">
        {/* Profile information */}
        <div className="flex min-w-0 items-center gap-5 sm:gap-7 lg:gap-10">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="h-[96px] w-[96px] overflow-hidden rounded-full border-[4px] border-white shadow-md sm:h-[112px] sm:w-[112px] lg:h-[128px] lg:w-[128px]">
              <img
                src={userHero}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>

            <button
              type="button"
              aria-label="Change profile photo"
              onClick={() => navigate("/dashboard/profile/edit")}
              className="absolute bottom-1 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#164D6F] text-white transition hover:bg-[#123F5B] sm:bottom-2"
            >
              <FiCamera className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Name and email */}
          <div className="min-w-0">
            <h2 className="truncate font-['Inter'] text-[18px] font-bold text-[#182536] sm:text-[20px]">
              Emeka Johnson
            </h2>

            <p className="mt-1 truncate font-['Inter'] text-[13px] text-[#7B8FA3] sm:text-[14px]">
              emekajohnson@gmail.com
            </p>
          </div>
        </div>

        {/* Edit profile */}
        <button
          type="button"
          onClick={() => navigate("edit")}
          className="h-[48px] w-full rounded-[12px] border border-[#164D6F] bg-transparent px-5 font-['Inter'] text-[15px] font-semibold text-[#164D6F] transition hover:bg-[#164D6F] hover:text-white sm:w-[220px] lg:w-[280px]"
        >
          Edit profile
        </button>
      </div>

      {/* Settings */}
      <div className="mt-7 w-full space-y-3 sm:mt-8 sm:space-y-[18px]">
        {/* Notifications */}
        <button
          type="button"
          onClick={() => navigate("/dashboard/notifications")}
          className="flex min-h-[58px] w-full items-center justify-between gap-4 rounded-[16px] border border-[#F9FAFB] bg-white px-4 py-3 shadow-sm transition hover:border-[#D8E0DE] hover:shadow-md sm:px-5"
        >
          <div className="flex min-w-0 items-center gap-4">
            <FiBell className="h-[21px] w-[21px] shrink-0 text-[#164D6F]" />

            <span className="truncate font-['Inter'] text-[14px] text-[#182536]">
              Notifications
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <span className="flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-[#EF4444] px-1 text-[10px] font-semibold text-white">
              3
            </span>

            <FiChevronRight className="h-5 w-5 text-[#9BA8B2]" />
          </div>
        </button>

        {/* Privacy & Security */}
        <button
          type="button"
          onClick={() => navigate("security")}
          className="flex min-h-[58px] w-full items-center justify-between gap-4 rounded-[16px] border border-[#F9FAFB] bg-white px-4 py-3 shadow-sm transition hover:border-[#D8E0DE] hover:shadow-md sm:px-5"
        >
          <div className="flex min-w-0 items-center gap-4">
            <FiShield className="h-[21px] w-[21px] shrink-0 text-[#164D6F]" />

            <span className="truncate font-['Inter'] text-[14px] text-[#182536]">
              Privacy & Security
            </span>
          </div>

          <FiChevronRight className="h-5 w-5 shrink-0 text-[#9BA8B2]" />
        </button>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex min-h-[58px] w-full items-center gap-4 rounded-[16px] border border-[#FEE2E2] bg-white px-4 py-3 shadow-sm transition hover:bg-[#FEF2F2] sm:px-5"
        >
          <FiLogOut className="h-[21px] w-[21px] shrink-0 text-[#EF4444]" />

          <span className="font-['Montserrat'] text-[14px] font-semibold text-[#EF4444]">
            Log Out
          </span>
        </button>
      </div>

      {/* Back */}
      <div className="mt-8 sm:mt-12 lg:mt-16">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-12 w-[90px] items-center justify-center rounded-lg border border-[#0D2E431F] bg-[#0D2E43] font-['Inter'] text-[14px] font-medium text-white transition hover:bg-[#164D6F]"
        >
          Back
        </button>
      </div>
    </section>
  );
}