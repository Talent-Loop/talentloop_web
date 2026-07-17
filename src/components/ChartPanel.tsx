import type { ReactNode } from "react";

interface ChartPanelProps {
  label: string;
  title: string;
  children: ReactNode;
}

export default function ChartPanel({
  label,
  title,
  children,
}: ChartPanelProps) {
  return (
    <section className="rounded-[28px] border border-slate-200/75 bg-white/95 p-6 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          {label}
        </p>

        <h2 className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">
          {title}
        </h2>
      </div>

      {children}
    </section>
  );
}