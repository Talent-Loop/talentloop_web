
import { FiBell, FiSearch, FiMenu, FiX } from "react-icons/fi";

interface UserTopbarProps {
  showSearch?: boolean;
  onMenuClick?: () => void;
  mobileMenuOpen?: boolean;
}

export default function UserTopbar({
  showSearch = true,
  onMenuClick,
  mobileMenuOpen = false,
}: UserTopbarProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 h-[80px] bg-[#F7FAF9] md:left-[261px]">
      <div className="flex h-full min-w-0 items-center gap-2 px-3 sm:gap-4 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-[#17364A] transition hover:bg-[#E8EFF2] md:hidden"
        >
          {mobileMenuOpen ? (
            <FiX className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </button>

        {/* Search */}
        {showSearch ? (
          <div className="flex h-[44px] min-w-0 flex-1 items-center rounded-full border border-[#0D2E431F] bg-white px-3 sm:h-[48px] sm:px-4 md:max-w-[748px]">
            <FiSearch className="mr-2 h-5 w-5 flex-shrink-0 text-[#64748B] sm:mr-3" />

            <input
              type="search"
              placeholder="Search"
              aria-label="Search"
              className="w-full min-w-0 border-none bg-transparent text-[13px] text-[#24364B] outline-none placeholder:text-[#94A3B8] sm:text-[14px]"
            />
          </div>
        ) : (
          <div className="min-w-0 flex-1" />
        )}

        {/* Right side */}
        <div className="ml-auto flex flex-shrink-0 items-center gap-1 sm:gap-3">
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-9 items-center justify-center rounded-full transition hover:bg-[#E8EFF2] sm:w-10"
          >
            <FiBell className="h-5 w-5 text-[#64748B]" />
            <span className="absolute right-2 top-2 h-[5px] w-[5px] rounded-full bg-red-500" />
          </button>

          {/* User */}
          <div className="flex h-10 items-center gap-2 rounded-full bg-white px-1.5 shadow-sm sm:h-12 sm:px-2 sm:pr-4">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0D2E43] text-[11px] font-semibold text-white sm:h-9 sm:w-9 sm:text-[12px]">
              MA
            </div>

            <span className="hidden whitespace-nowrap text-[13px] font-semibold text-[#24364B] lg:inline">
              Mike Alfred
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
