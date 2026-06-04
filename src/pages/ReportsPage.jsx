export default function ReportsPage() {
  return (
    <section className="space-y-6">
      <header className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
        <h2 className="text-2xl font-semibold text-white">Reports</h2>
        <p className="mt-2 text-slate-400">Download KPI summaries, export data, and review the last reporting cycle.</p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        <article className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-white">Export status</h3>
          <p className="mt-3 text-slate-300">All reporting assets are ready to export for the current month.</p>
        </article>
        <article className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-white">Latest summary</h3>
          <p className="mt-3 text-slate-300">Review the summary for sales, engagement, and product performance.</p>
        </article>
      </div>
    </section>
  )
}
