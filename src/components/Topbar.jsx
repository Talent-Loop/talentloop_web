import { FiBell, FiSearch } from 'react-icons/fi'

export default function Topbar() {
  return (
    <div className="mb-6 rounded-[2rem] border border-slate-800/60 bg-slate-950/95 px-4 py-4 shadow-soft backdrop-blur-xl sm:px-6 sm:py-5">
      <div className="flex h-20 items-center justify-between gap-4">
        <div className="flex-1" />

        <div className="relative mx-auto w-full max-w-3xl">
          <FiSearch className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search reports"
            className="h-16 w-full rounded-full border border-slate-200/10 bg-white/95 px-5 pl-14 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-300/40"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="relative inline-flex h-14 w-14 items-center justify-center rounded-3xl border border-slate-700 bg-slate-900 text-slate-100 transition hover:border-slate-500"
            aria-label="Notifications"
          >
            <FiBell className="h-5 w-5" />
            <span className="absolute -right-1 top-1 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-slate-950" />
          </button>

          <button
            type="button"
            className="flex items-center gap-3 rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-left transition hover:border-slate-500"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-sm font-semibold uppercase text-white">
              A
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">Admin</p>
              <p className="text-xs text-slate-500">talentloop</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
