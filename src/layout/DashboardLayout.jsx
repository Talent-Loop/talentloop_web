import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import { FiBell, FiSearch } from 'react-icons/fi'

const routeTitles = {
  '/': 'Overview',
  '/users': 'Users',
  '/verification': 'Verification',
  '/agent-applications': 'Agent Applications',
  '/transactions': 'Transactions',
  '/wallet-deposits': 'Wallet Deposits',
  '/categories': 'Categories',
}

export default function DashboardLayout() {
  const location = useLocation()
  const title = routeTitles[location.pathname] ?? 'Dashboard'

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <header className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/90 p-5 shadow-soft backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Admin dashboard</p>
              <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative flex w-full items-center rounded-3xl border border-slate-800 bg-slate-950/80 px-3 py-2 shadow-soft sm:max-w-xs">
                <FiSearch className="h-5 w-5 text-slate-400" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search reports"
                  className="ml-3 w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
                />
              </div>
              <button
                type="button"
                className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-slate-800 bg-slate-900 text-slate-300 transition hover:border-brand-500 hover:text-white"
                aria-label="Notifications"
              >
                <FiBell className="h-5 w-5" />
              </button>
            </div>
          </header>

          <main className="space-y-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
