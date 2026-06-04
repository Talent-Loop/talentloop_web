import { toast } from 'react-hot-toast'

export default function WalletDepositsPage() {
  return (
    <section className="space-y-6">
      <header className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
        <h2 className="text-2xl font-semibold text-white">Wallet Deposits</h2>
        <p className="mt-2 text-slate-400">Track and manage wallet deposits, funding requests, and balance updates from users.</p>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-white">Recent deposits</h3>
          <p className="mt-3 text-slate-300">View the latest wallet funding transactions and deposit requests.</p>
          <button
            type="button"
            onClick={() => toast.success('Deposit list loaded')}
            className="mt-6 inline-flex items-center justify-center rounded-3xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400"
          >
            View deposits
          </button>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-white">Deposit statistics</h3>
          <p className="mt-3 text-slate-300">Monitor deposit activity and wallet balance trends.</p>
          <ul className="mt-6 space-y-3 text-sm text-slate-400">
            <li>Total deposits: $1.8M</li>
            <li>This month: $342.5k</li>
            <li>Avg deposit: $2,450</li>
          </ul>
        </article>
      </div>
    </section>
  )
}
