import { toast } from 'react-hot-toast'

export default function SupportPage() {
  return (
    <section className="space-y-6">
      <header className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
        <h2 className="text-2xl font-semibold text-white">Support</h2>
        <p className="mt-2 text-slate-400">Create new tickets, track open issues, and get help from the support team.</p>
      </header>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
        <h3 className="text-xl font-semibold text-white">Need a hand?</h3>
        <p className="mt-3 text-slate-300">Submit a request to the operations team or review common support items.</p>
        <button
          type="button"
          onClick={() => toast('Support request queued', { icon: '✅' })}
          className="mt-6 inline-flex items-center justify-center rounded-3xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400"
        >
          Create support ticket
        </button>
      </div>
    </section>
  )
}
