import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const metrics = [
  { title: 'Active users', value: '18.2k' },
  { title: 'Revenue', value: '$124.6k' },
  { title: 'Projects', value: '84' },
  { title: 'New tickets', value: '23' },
]

const chartData = [
  { day: 'Mon', value: 48 },
  { day: 'Tue', value: 65 },
  { day: 'Wed', value: 78 },
  { day: 'Thu', value: 55 },
  { day: 'Fri', value: 93 },
  { day: 'Sat', value: 82 },
  { day: 'Sun', value: 68 },
]

export default function DashboardHome() {
  return (
    <section className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((item) => (
          <article key={item.title} className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 shadow-soft">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{item.title}</p>
            <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Weekly activity</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Performance overview</h2>
            </div>
            <span className="rounded-full bg-brand-500 px-3 py-1 text-sm font-semibold text-white">+12.5%</span>
          </div>

          <div className="mt-8 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1e293b" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }} />
                <Area type="monotone" dataKey="value" stroke="#818cf8" fill="url(#chartGradient)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="grid gap-5">
          <article className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Today’s goals</p>
            <h2 className="mt-3 text-xl font-semibold text-white">Focus on customer retention</h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">Set up a quick review cycle with the product team and work through the top support issues from the last 24 hours.</p>
          </article>

          <article className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Upcoming launch</p>
            <h2 className="mt-3 text-xl font-semibold text-white">Mobile onboarding campaign</h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">Review the campaign performance and finalize creative assets for the next sprint.</p>
          </article>
        </section>
      </div>
    </section>
  )
}
