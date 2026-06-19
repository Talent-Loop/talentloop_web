import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import {
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiDollarSign,
  FiCheckCircle,
  FiBriefcase,
  FiCreditCard,
  FiTrendingUp,
} from 'react-icons/fi'

import StatCard from '../components/StatCard'
import ChartPanel from '../components/ChartPanel'

const stats = [
  {
    title: 'Total Users',
    value: '1,247',
    label: '+82 this week',
    Icon: FiUsers,
  },
  {
    title: 'Active Users',
    value: '1,108',
    label: '88.8% active',
    Icon: FiUserCheck,
  },
  {
    title: 'Banned Users',
    value: '23',
    label: '',
    Icon: FiUserX,
  },
  {
    title: 'Total Commission',
    value: '₦4,582,500',
    label: 'Lifetime',
    Icon: FiDollarSign,
  },
  {
    title: 'Pending Verifications',
    value: '4',
    label: '',
    Icon: FiCheckCircle,
  },
  {
    title: 'Pending Agents',
    value: '3',
    label: '',
    Icon: FiBriefcase,
  },
  {
    title: 'Pending Deposits',
    value: '3',
    label: '',
    Icon: FiCreditCard,
  },
  {
    title: 'Approval Rate',
    value: '86.9%',
    label: 'Last 30 days',
    Icon: FiTrendingUp,
  },
]

const growthData = [
  { month: 'Nov', users: 180 },
  { month: 'Dec', users: 280 },
  { month: 'Jan', users: 380 },
  { month: 'Feb', users: 480 },
  { month: 'Mar', users: 620 },
  { month: 'Apr', users: 760 },
  { month: 'May', users: 860 },
]

const approvalData = [
  { name: 'Approved', value: 87 },
  { name: 'Rejected', value: 13 },
]

const volumeData = [
  { month: 'Jan', volume: 0.5 },
  { month: 'Feb', volume: 1.0 },
  { month: 'Mar', volume: 1.5 },
  { month: 'Apr', volume: 2.5 },
  { month: 'May', volume: 3.5 },
  { month: 'Jun', volume: 5.5 },
  { month: 'Jul', volume: 7.0 },
  { month: 'Aug', volume: 8.5 },
  { month: 'Sep', volume: 10.0 },
  { month: 'Oct', volume: 11.5 },
]

export default function DashboardHome() {
  return (
    
    <section className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            label={item.label}
            Icon={item.Icon}
          />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.9fr_0.9fr]">
        <ChartPanel
          label="Analytics"
          title="User growth"
        >
          <p className="mb-6 text-sm text-slate-500">
            Cumulative platform sign-ups, last 7 months
          </p>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient
                    id="growthGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#0D3553"
                      stopOpacity={0.18}
                    />
                    <stop
                      offset="100%"
                      stopColor="#0D3553"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke="#E5E7EB"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94A3B8' }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94A3B8' }}
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#0D3553"
                  fill="url(#growthGradient)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartPanel>

        <ChartPanel
          label="Performance"
          title="Approval split"
        >
          <p className="mb-6 text-sm text-slate-500">
            Last 30 days
          </p>

          <div className="flex h-72 items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={approvalData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                >
                  <Cell fill="#0D3553" />
                  <Cell fill="#F04D4D" />
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 flex justify-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#0D3553]" />
              Approved
            </div>

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#F04D4D]" />
              Rejected
            </div>
          </div>
        </ChartPanel>
      </div>

      <ChartPanel
        label="Finance"
        title="Transaction volume"
      >
        <p className="mb-6 text-sm text-slate-500">
          Monthly GMV in ₦ millions
        </p>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={volumeData}>
              <CartesianGrid
                stroke="#E5E7EB"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
              />

              <Tooltip />

              <Bar
                dataKey="volume"
                fill="#062B45"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartPanel>
    </section>
  )
}