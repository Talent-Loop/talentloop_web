import { NavLink } from 'react-router-dom'
import { FiBarChart2, FiFileText, FiHome, FiUsers, FiCheckCircle, FiDollarSign, FiList } from 'react-icons/fi'

const links = [
  { label: 'Overview', to: '/', icon: FiHome },
  { label: 'Users', to: '/users', icon: FiUsers },
  { label: 'Verification', to: '/verification', icon: FiCheckCircle },
  { label: 'Agent Applications', to: '/agent-applications', icon: FiFileText },
  { label: 'Transactions', to: '/transactions', icon: FiBarChart2 },
  { label: 'Wallet Deposits', to: '/wallet-deposits', icon: FiDollarSign },
  { label: 'Categories', to: '/categories', icon: FiList },
]

export default function Sidebar() {
  return (
    <aside className="hidden w-72 flex-col border-r border-slate-800 bg-slate-950 px-5 py-8 text-slate-300 md:flex">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-soft">
          <span className="text-lg font-semibold">TL</span>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Talentloop</p>
          <h2 className="text-xl font-semibold text-white">Admin</h2>
        </div>
      </div>

      <nav className="space-y-1 text-sm font-medium">
        {links.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-3xl px-4 py-3 transition ${
                isActive
                  ? 'bg-slate-800 text-white shadow-soft ring-1 ring-brand-500'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-3xl border border-slate-800 bg-slate-900/90 p-5 text-sm text-slate-400 shadow-soft">
        <p className="font-semibold text-white">TalentLoop Platform</p>
        <p className="mt-2">Manage users, verify identities, and oversee all platform operations.</p>
      </div>
    </aside>
  )
}
