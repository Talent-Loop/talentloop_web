import { toast } from 'react-hot-toast'

export default function AgentApplicationsPage() {
  return (
    <section className="space-y-6">
      <header className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
        <h2 className="text-2xl font-semibold text-white">Agent Applications</h2>
        <p className="mt-2 text-slate-400">Review and manage applications from talent agents looking to join the platform.</p>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-white">New applications</h3>
          <p className="mt-3 text-slate-300">Review submissions from agents and approve qualified candidates.</p>
          <button
            type="button"
            onClick={() => toast.success('Applications loaded')}
            className="mt-6 inline-flex items-center justify-center rounded-3xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400"
          >
            View applications
          </button>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-white">Application metrics</h3>
          <p className="mt-3 text-slate-300">Track application statuses and approval rates.</p>
          <ul className="mt-6 space-y-3 text-sm text-slate-400">
            <li>Pending review: 15</li>
            <li>Approved (this month): 32</li>
            <li>Avg approval time: 2 days</li>
          </ul>
        </article>
      </div>
    </section>
  )
}
