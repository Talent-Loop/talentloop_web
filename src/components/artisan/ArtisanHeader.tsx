
import { Bell, Search } from "lucide-react";

interface ArtisanHeaderProps {
  isMenuOpen: boolean;
  onMenuClick: () => void;
}

export default function ArtisanHeader({
  isMenuOpen,
  onMenuClick,
}: ArtisanHeaderProps) {
  return (
    <header className="flex h-[78px] w-full items-center gap-3 px-4 sm:gap-5 sm:px-6 lg:px-8">
      {/* Mobile Hamburger */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label={isMenuOpen ? "Close sidebar" : "Open sidebar"}
        aria-expanded={isMenuOpen}
        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#17324D] transition hover:bg-white lg:hidden"
      >
        {/* Top line */}
        <span
          className={`absolute h-[2px] w-6 rounded-full bg-current transition-all duration-300 ${
            isMenuOpen
              ? "translate-y-0 rotate-45"
              : "-translate-y-[7px]"
          }`}
        />

        {/* Middle line */}
        <span
          className={`absolute h-[2px] w-6 rounded-full bg-current transition-all duration-200 ${
            isMenuOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
          }`}
        />

        {/* Bottom line */}
        <span
          className={`absolute h-[2px] w-6 rounded-full bg-current transition-all duration-300 ${
            isMenuOpen
              ? "translate-y-0 -rotate-45"
              : "translate-y-[7px]"
          }`}
        />
      </button>

      {/* Search */}
      <div className="relative min-w-0 w-full max-w-[710px] flex-1">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777777]"
        />

        <input
          type="text"
          placeholder="Search jobs"
          className="h-12 w-full rounded-full border border-[#D9DEDF] bg-transparent pl-11 pr-3 text-sm text-[#17324D] outline-none placeholder:text-[#9AA1A5] focus:border-[#1C5B7E] sm:pr-5"
        />
      </div>

      {/* Right side */}
      <div className="ml-1 flex shrink-0 items-center gap-2 sm:ml-4 sm:gap-5 lg:ml-8">
        {/* Notification */}
        <button
          type="button"
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#17324D] transition hover:bg-white"
        >
          <Bell size={21} strokeWidth={1.8} />

          {/* Notification dot */}
          <span className="absolute right-[8px] top-[7px] h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>

        {/* User */}
        <button
          type="button"
          className="flex shrink-0 items-center gap-2 rounded-full bg-white px-2 py-2 shadow-sm sm:gap-3 sm:px-3"
        >
          {/* Avatar */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#17324D] text-xs font-semibold text-white">
            DE
          </div>

          <span className="hidden whitespace-nowrap text-sm font-medium text-[#17324D] sm:inline">
            Dave Ejike
          </span>
        </button>
      </div>
    </header>
  );
}
