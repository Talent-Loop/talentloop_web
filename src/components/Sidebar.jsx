import { NavLink } from 'react-router-dom'
import {
  FiBarChart2,
  FiFileText,
  FiHome,
  FiUsers,
  FiCheckCircle,
  FiDollarSign,
  FiList,
} from 'react-icons/fi'
const links = [
  { label: 'Overview', to: '/', icon: FiHome },
  { label: 'User', to: '/users', icon: FiUsers },
 
  { label: 'Agent Application', to: '/agent-applications', icon: FiFileText },
  { label: 'Transactions', to: '/transactions', icon: FiBarChart2 },
  { label: 'Wallet Deposits', to: '/wallet-deposits', icon: FiDollarSign },
  { label: 'Categories', to: '/categories', icon: FiList },
]

export default function Sidebar() {
  return (
    <aside className="hidden w-56 flex-col border-r border-white/10 bg-[#10344D] text-white md:flex">
    
     
<div className="px-6 py-6">
  <div className="flex items-center gap-3">
    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1B4866]">
      <FiCheckCircle className="h-6 w-6 text-white" />
    </div>

    <div>
      <h2 className="text-base font-bold text-white leading-none">
        Admin
      </h2>

      <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.15em] text-slate-300">
        Talent Loop Management
      </p>
    </div>
  </div>
</div>
      <div className="border-t border-white/10" />

    
      <nav className="flex-1 px-4 py-8">
        <div className="space-y-2">
          {links.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center gap-3 rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-200'
                  : 'flex items-center gap-3 rounded-full px-4 py-3 text-sm font-medium text-slate-100 transition-all duration-200 hover:bg-white/10 hover:text-white'
              }
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

    
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB] text-xs font-semibold text-white shadow-md">
            AO
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              Admin Operator
            </p>

            <p className="truncate text-xs text-slate-300">
              admin@servo.io
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}