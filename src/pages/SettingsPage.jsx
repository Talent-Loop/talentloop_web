export default function SettingsPage() {
  return (
    <section className="space-y-6">
      <header className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
        <h2 className="text-2xl font-semibold text-white">Settings</h2>
        <p className="mt-2 text-slate-400">Configure application preferences, security, and team accesses.</p>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-white">User controls</h3>
          <p className="mt-3 text-slate-300">Adjust password policies, invited users, and access levels from this panel.</p>
        </article>
        <article className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-white">System status</h3>
          <p className="mt-3 text-slate-300">Monitor uptime, queue status, and scheduled maintenance windows.</p>
        </article>
      </div>
    </section>
  )
}
