import { toast } from 'react-hot-toast'

export default function CategoriesPage() {
  return (
    <section className="space-y-6">
      <header className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
        <h2 className="text-2xl font-semibold text-white">Categories</h2>
        <p className="mt-2 text-slate-400">Manage talent categories, skills, and service offerings available on the platform.</p>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-white">Active categories</h3>
          <p className="mt-3 text-slate-300">View and edit talent categories and skill classifications.</p>
          <button
            type="button"
            onClick={() => toast.success('Categories loaded')}
            className="mt-6 inline-flex items-center justify-center rounded-3xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400"
          >
            Edit categories
          </button>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-white">Category metrics</h3>
          <p className="mt-3 text-slate-300">Track popularity and performance of each category.</p>
          <ul className="mt-6 space-y-3 text-sm text-slate-400">
            <li>Total categories: 48</li>
            <li>Active talents: 2,340</li>
            <li>Most popular: Tech recruitment</li>
          </ul>
        </article>
      </div>
    </section>
  )
}
