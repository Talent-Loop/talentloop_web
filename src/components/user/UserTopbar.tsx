import { FiBell, FiMenu, FiSearch } from "react-icons/fi";

interface UserTopbarProps {
  showSearch?: boolean;
  onMenuClick?: () => void;
}

export default function UserTopbar({
  showSearch = true,
  onMenuClick,
}: UserTopbarProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 h-[80px] bg-[#F7FAF9] lg:left-[254px]">
      <div className="flex h-full items-center gap-3 px-4 sm:px-6 lg:gap-5 lg:px-8">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-[#24364B] transition hover:bg-white lg:hidden"
        >
          <FiMenu size={22} />
        </button>

        {/* Search */}
        {showSearch ? (
          <div className="flex h-11 min-w-0 flex-1 items-center rounded-full border border-[#0D2E431F] bg-white px-4 sm:h-12 sm:max-w-[748px]">
            <FiSearch className="mr-3 h-5 w-5 flex-shrink-0 text-[#64748B]" />

            <input
              type="text"
              placeholder="Search"
              className="w-full min-w-0 border-none bg-transparent text-[14px] text-[#24364B] outline-none placeholder:text-[#94A3B8]"
            />
          </div>
        ) : (
          <div className="flex-1" />
        )}

        {/* Right side */}
        <div className="ml-auto flex flex-shrink-0 items-center gap-2 sm:gap-3">
          {/* Notification */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white"
          >
            <FiBell className="h-5 w-5 text-[#64748B]" />

            <span className="absolute right-[9px] top-[7px] h-[5px] w-[5px] rounded-full bg-red-500" />
          </button>

          {/* User */}
          <div className="flex h-12 items-center gap-2 rounded-full bg-white px-2 shadow-sm sm:pr-4">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#0D2E43] text-[12px] font-semibold text-white">
              MA
            </div>

            <span className="hidden text-[13px] font-semibold text-[#24364B] sm:block">
              Mike Alfred
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}