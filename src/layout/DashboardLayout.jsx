import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import Topbar from '../components/Topbar.jsx'

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
          <Topbar />

          <header className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/90 p-5 shadow-soft backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Admin dashboard</p>
              <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
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
