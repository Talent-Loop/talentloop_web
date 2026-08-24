import { FiBell, FiSearch } from "react-icons/fi";

interface UserTopbarProps {
  showSearch?: boolean;
}

export default function UserTopbar({
  showSearch = true,
}: UserTopbarProps) {
  return (
    <header className="fixed left-[261px] right-0 top-0 z-40 h-[80px] bg-[#F7FAF9]">
      <div className="flex h-full items-center justify-between px-8">
        {/* Search */}
        {showSearch ? (
          <div className="flex h-[48px] w-full max-w-[748px] items-center rounded-full border border-[#0D2E431F] bg-white px-4">
            <FiSearch className="mr-3 h-5 w-5 flex-shrink-0 text-[#64748B]" />

            <input
              type="text"
              placeholder="Search"
              className="w-full border-none bg-transparent text-[14px] text-[#24364B] outline-none placeholder:text-[#94A3B8]"
            />
          </div>
        ) : (
          <div />
        )}

        {/* Right side */}
        <div className="ml-auto flex flex-shrink-0 items-center gap-3">
          {/* Notification */}
          <button
            type="button"
            className="relative flex h-[40px] w-[40px] items-center justify-center"
          >
            <FiBell className="h-[20px] w-[20px] text-[#64748B]" />

            <span className="absolute right-[9px] top-[7px] h-[5px] w-[5px] rounded-full bg-red-500" />
          </button>

          {/* User */}
          <div className="flex h-[48px] items-center gap-2 rounded-full bg-white px-2 pr-4 shadow-sm">
            <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#0D2E43] text-[12px] font-semibold text-white">
              MA
            </div>

            <span className="text-[13px] font-semibold text-[#24364B]">
              Mike Alfred
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}