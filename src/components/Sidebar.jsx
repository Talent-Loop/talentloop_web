import { NavLink } from 'react-router-dom'
import { FiBarChart2, FiFileText, FiHome, FiUsers, FiCheckCircle, FiDollarSign, FiList, FiCheck } from 'react-icons/fi'

const links = [
  { label: 'Overview', to: '/', icon: FiHome },
  { label: 'User', to: '/users', icon: FiUsers },
  { label: 'Verification', to: '/verification', icon: FiCheckCircle },
  { label: 'Agent Application', to: '/agent-applications', icon: FiFileText },
  { label: 'Transactions', to: '/transactions', icon: FiBarChart2 },
  { label: 'Wallet Deposits', to: '/wallet-deposits', icon: FiDollarSign },
  { label: 'Categories', to: '/categories', icon: FiList },
]

export default function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r border-slate-700/40 bg-gradient-to-b from-slate-900 to-slate-950 px-6 py-8 text-slate-300 md:flex">
      <div className="mb-12 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold text-sm">
          <FiCheck className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white leading-none">Admin</h2>
          <p className="text-xs uppercase tracking-widest text-slate-500 mt-1">Talent Loop Management</p>
        </div>
      </div>

      <nav className="space-y-2 text-sm font-medium flex-1">
        {links.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-3 rounded-lg px-4 py-2.5 bg-white text-slate-900 font-medium shadow-md transition'
                : 'flex items-center gap-3 rounded-lg px-4 py-2.5 text-slate-400 hover:text-slate-200 transition'
            }
          >
            <Icon className="h-5 w-5 flex-shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-slate-700/40 pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-white font-semibold text-xs flex-shrink-0">
            AO
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">Admin Operator</p>
            <p className="text-xs text-slate-500 truncate">admin@servo.io</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
