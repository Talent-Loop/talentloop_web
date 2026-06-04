import { toast } from 'react-hot-toast'

export default function UsersPage() {
  return (
    <section className="space-y-6">
      <header className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
        <h2 className="text-2xl font-semibold text-white">Users</h2>
        <p className="mt-2 text-slate-400">Manage admin users, review profiles, and monitor login activity.</p>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-white">Team overview</h3>
          <p className="mt-3 text-slate-300">Track current team capacity and recently onboarded members.</p>
          <button
            type="button"
            onClick={() => toast.success('User list refreshed')}
            className="mt-6 inline-flex items-center justify-center rounded-3xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400"
          >
            Refresh users
          </button>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-white">Recent sign-ins</h3>
          <p className="mt-3 text-slate-300">Review the last login activity across the platform.</p>
          <ul className="mt-6 space-y-3 text-slate-400">
            <li>Rachel Adams — 12 minutes ago</li>
            <li>Dev team — 40 minutes ago</li>
            <li>Brand operations — 1 hour ago</li>
          </ul>
        </article>
      </div>
    </section>
  )
}
