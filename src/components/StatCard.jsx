export default function StatCard({ title, value, label, Icon, badge }) {
  return (
    <article className="rounded-[28px] border border-slate-200/75 bg-white/95 p-5 shadow-sm shadow-slate-900/5 text-slate-950 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-100">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-4 text-3xl font-semibold leading-none">{value}</p>
          {label ? <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{label}</p> : null}
        </div>
        {Icon ? (
          <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-slate-100 text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-200">
            <Icon className="h-5 w-5" />
          </div>
        ) : null}
      </div>
      {badge ? (
        <div className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {badge}
        </div>
      ) : null}
    </article>
  )
}
