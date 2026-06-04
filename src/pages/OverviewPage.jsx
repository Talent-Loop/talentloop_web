import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { FiCheckCircle, FiDollarSign, FiShield, FiTrendingUp, FiUsers } from 'react-icons/fi'
import ChartPanel from '../components/ChartPanel.jsx'
import StatCard from '../components/StatCard.jsx'

const summaryCards = [
  { title: 'Total users', value: '12.4k', label: 'Up 18% this month', Icon: FiUsers },
  { title: 'Pending verifications', value: '48', label: '2 new requests', Icon: FiCheckCircle },
  { title: 'Active agents', value: '1.6k', label: '90% active', Icon: FiTrendingUp },
  { title: 'Total commission', value: '₦4.6M', label: 'Includes fees', Icon: FiDollarSign },
  { title: 'Pending deposits', value: '12', label: 'Waiting approval', Icon: FiDollarSign },
  { title: 'Pending agents', value: '7', label: 'New applications', Icon: FiShield },
  { title: 'Approved wallets', value: '94%', label: 'Trusted deposit flow', Icon: FiCheckCircle },
  { title: 'Active categories', value: '18', label: 'Talent verticals', Icon: FiShield },
]

const growthData = [
  { month: 'Jan', value: 420 },
  { month: 'Feb', value: 520 },
  { month: 'Mar', value: 610 },
  { month: 'Apr', value: 580 },
  { month: 'May', value: 730 },
  { month: 'Jun', value: 820 },
]

const approvalData = [
  { name: 'Approved', value: 72 },
  { name: 'Rejected', value: 18 },
  { name: 'Pending', value: 10 },
]

const volumeData = [
  { name: 'Jan', volume: 18 },
  { name: 'Feb', volume: 24 },
  { name: 'Mar', volume: 32 },
  { name: 'Apr', volume: 28 },
  { name: 'May', volume: 38 },
  { name: 'Jun', volume: 46 },
]

const approvalColors = ['#36b37e', '#f59e0b', '#ef4444']
const verificationRequests = [
  { name: 'Ayesha Bello', type: 'ID verification', status: 'Pending' },
  { name: 'John Doe', type: 'Agent onboarding', status: 'Approved' },
  { name: 'Linda Okoro', type: 'Wallet deposit', status: 'Review' },
  { name: 'Michael K.', type: 'Category update', status: 'Pending' },
]

export default function OverviewPage() {
  return (
    <section className="space-y-8">
      <div className="rounded-[28px] border border-slate-200/75 bg-white/95 p-6 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950/95">
        <div className="grid gap-4 md:grid-cols-[1.5fr_auto] md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Overview</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">TalentLoop platform overview</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              Monitor user growth, verification velocity, and transaction health across the entire admin platform.
            </p>
          </div>
          <div className="rounded-[24px] bg-slate-950 px-4 py-3 text-sm text-slate-100 shadow-soft">
            <p className="text-slate-400">Live update</p>
            <p className="mt-2 text-xl font-semibold">4:38 PM UTC</p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((item) => (
          <StatCard key={item.title} title={item.title} value={item.value} label={item.label} Icon={item.Icon} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[2fr_1fr]">
        <ChartPanel label="User growth" title="Weekly platform growth">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0' }} />
                <Area type="monotone" dataKey="value" stroke="#4f46e5" fill="url(#growthGradient)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartPanel>

        <ChartPanel label="Verification" title="Approval breakdown">
          <div className="flex min-h-[320px] flex-col items-center justify-center gap-5 md:flex-row md:items-start">
            <div className="h-72 w-full max-w-xs">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={approvalData} dataKey="value" innerRadius={60} outerRadius={90} paddingAngle={4}>
                    {approvalData.map((entry, index) => (
                      <Cell key={entry.name} fill={approvalColors[index]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ paddingTop: 8 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-3">
              {approvalData.map((item, index) => (
                <div key={item.name} className="rounded-3xl border border-slate-200/70 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold">{item.name}</p>
                    <span className="text-slate-500">{item.value}%</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Share of checks this week</p>
                </div>
              ))}
            </div>
          </div>
        </ChartPanel>
      </div>

      <div className="grid gap-5 xl:grid-cols-[2fr_1fr]">
        <ChartPanel label="Transactions" title="Deposit volume">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0' }} />
                <Bar dataKey="volume" fill="#4338ca" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartPanel>

        <section className="rounded-[28px] border border-slate-200/75 bg-white/95 p-6 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950/95">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Verification queue</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">Recent requests</h2>
          </div>
          <div className="overflow-hidden rounded-[24px] border border-slate-200/70 dark:border-slate-800">
            <table className="min-w-full border-collapse text-left text-sm text-slate-700 dark:text-slate-200">
              <thead className="bg-slate-50 text-slate-500 dark:bg-slate-900/80 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Request</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {verificationRequests.map((request) => (
                  <tr key={request.name} className="bg-white dark:bg-slate-950/90">
                    <td className="px-4 py-4 font-medium text-slate-900 dark:text-slate-100">{request.name}</td>
                    <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{request.type}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        request.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300'
                          : request.status === 'Pending'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-900/80 dark:text-slate-300'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  )
}
