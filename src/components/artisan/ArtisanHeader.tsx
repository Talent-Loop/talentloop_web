import { Bell, Search } from "lucide-react";

export default function ArtisanHeader() {
  return (
    <header className="flex h-[78px] items-center justify-between px-8">
      {/* Search */}
      <div className="relative w-full max-w-[710px]">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777777]"
        />

        <input
          type="text"
          placeholder="Search jobs"
          className="h-12 w-full rounded-full border border-[#D9DEDF] bg-transparent pl-11 pr-5 text-sm text-[#17324D] outline-none placeholder:text-[#9AA1A5] focus:border-[#1C5B7E]"
        />
      </div>

      {/* Right side */}
      <div className="ml-8 flex items-center gap-5">
        {/* Notification */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#17324D] transition hover:bg-white"
        >
          <Bell size={21} strokeWidth={1.8} />

          {/* Notification dot */}
          <span className="absolute right-[8px] top-[7px] h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>

        {/* User */}
        <button
          type="button"
          className="flex items-center gap-3 rounded-full bg-white px-3 py-2 shadow-sm"
        >
          {/* Avatar */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#17324D] text-xs font-semibold text-white">
            DE
          </div>

          <span className="whitespace-nowrap text-sm font-medium text-[#17324D]">
            Dave Ejike
          </span>
        </button>
      </div>
    </header>
  );
}