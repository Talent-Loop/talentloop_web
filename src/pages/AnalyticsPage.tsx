export default function AnalyticsPage() {
  return (
    <section className="space-y-6">
      <header className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
        <h2 className="text-2xl font-semibold text-white">Analytics</h2>
        <p className="mt-2 text-slate-400">Review traffic, conversions, and campaign performance for the current quarter.</p>
      </header>

      <div className="grid gap-5 lg:grid-cols-3">
        <article className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Conversion rate</p>
          <p className="mt-4 text-3xl font-semibold text-white">8.4%</p>
        </article>
        <article className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Average session</p>
          <p className="mt-4 text-3xl font-semibold text-white">4m 12s</p>
        </article>
        <article className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Active campaigns</p>
          <p className="mt-4 text-3xl font-semibold text-white">12</p>
        </article>
      </div>
    </section>
  )
}
