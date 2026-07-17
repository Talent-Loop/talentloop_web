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
} from "recharts";

import {
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiDollarSign,
  FiCheckCircle,
  FiBriefcase,
  FiCreditCard,
  FiTrendingUp,
} from "react-icons/fi";

import type { IconType } from "react-icons";

import StatCard from "../components/StatCard";
import ChartPanel from "../components/ChartPanel";

interface StatItem {
  title: string;
  value: string;
  label: string;
  Icon: IconType;
  color?: string;
}

interface GrowthData {
  month: string;
  users: number;
}

interface ApprovalData {
  name: string;
  value: number;
}

interface VolumeData {
  month: string;
  volume: number;
}

const stats: StatItem[] = [
  {
    title: "Total Users",
    value: "1,247",
    label: "+82 this week",
    Icon: FiUsers,
    color: "text-blue-600",
  },
  {
    title: "Active Users",
    value: "1,108",
    label: "88.9% active rate",
    Icon: FiUserCheck,
  },
  {
    title: "Banned Users",
    value: "23",
    label: "Requires review",
    Icon: FiUserX,
    color: "text-red-600",
  },
  {
    title: "Total Commission",
    value: "₦4,582,500",
    label: "Lifetime",
    Icon: FiDollarSign,
  },
  {
    title: "Pending Verifications",
    value: "4",
    label: "Awaiting review",
    Icon: FiCheckCircle,
  },
  {
    title: "Pending Agents",
    value: "3",
    label: "Application queue",
    Icon: FiBriefcase,
  },
  {
    title: "Pending Deposits",
    value: "3",
    label: "Needs approval",
    Icon: FiCreditCard,
  },
  {
    title: "Approval Rate",
    value: "86.9%",
    label: "Last 30 days",
    Icon: FiTrendingUp,
  },
];

const growthData: GrowthData[] = [
  { month: "Nov", users: 180 },
  { month: "Dec", users: 320 },
  { month: "Jan", users: 520 },
  { month: "Feb", users: 740 },
  { month: "Mar", users: 930 },
  { month: "Apr", users: 1120 },
  { month: "May", users: 1247 },
];

const approvalData: ApprovalData[] = [
  { name: "Approved", value: 87 },
  { name: "Rejected", value: 13 },
];

const volumeData: VolumeData[] = [
  { month: "Jan", volume: 12 },
  { month: "Feb", volume: 18 },
  { month: "Mar", volume: 22 },
  { month: "Apr", volume: 28 },
  { month: "May", volume: 24 },
  { month: "Jun", volume: 30 },
  { month: "Jul", volume: 35 },
];

export default function OverviewPage() {
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

      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <ChartPanel
          label="Analytics"
          title="User growth"
        >
          <p className="mb-6 text-sm text-slate-500">
            Cumulative platform sign-ups, last 7 months
          </p>

          <div className="h-80">
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
                      stopColor="#24364B"
                      stopOpacity={0.25}
                    />
                    <stop
                      offset="100%"
                      stopColor="#24364B"
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
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#24364B"
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

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={approvalData}
                  innerRadius={70}
                  outerRadius={100}
                  dataKey="value"
                >
                  <Cell fill="#24364B" />
                  <Cell fill="#EF4444" />
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-8 text-sm font-semibold text-slate-700">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span>Approved</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span>Rejected</span>
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

        <div className="h-80">
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
                fill="#24364B"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartPanel>
    </section>
  );
}