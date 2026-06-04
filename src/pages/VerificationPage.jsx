import { toast } from 'react-hot-toast'

export default function VerificationPage() {
  return (
    <section className="space-y-6">
      <header className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
        <h2 className="text-2xl font-semibold text-white">Verification</h2>
        <p className="mt-2 text-slate-400">Review and manage pending user verifications, KYC documents, and identity checks.</p>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-white">Pending verifications</h3>
          <p className="mt-3 text-slate-300">Review and approve identity documents for new users.</p>
          <button
            type="button"
            onClick={() => toast.success('Verification list updated')}
            className="mt-6 inline-flex items-center justify-center rounded-3xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400"
          >
            Review pending
          </button>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-white">Verification status</h3>
          <p className="mt-3 text-slate-300">Monitor approval rates and processing times across the platform.</p>
          <ul className="mt-6 space-y-3 text-sm text-slate-400">
            <li>Pending: 42 documents</li>
            <li>Approved (today): 28 users</li>
            <li>Average processing: 4.5 hours</li>
          </ul>
        </article>
      </div>
    </section>
  )
}
