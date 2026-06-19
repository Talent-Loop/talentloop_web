import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import Topbar from '../components/Topbar.jsx'

const routeTitles = {
  '/': 'Overview',
  '/users': 'User',
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
    <div className="min-h-screen bg-[#F5F7F9]">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex-1 px-8 py-6 lg:px-10">
          <Topbar />

          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}