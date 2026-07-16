import type { IconType } from "react-icons";

interface StatCardProps {
  title: string;
  value: string;
  label?: string;
  Icon: IconType;
}

export default function StatCard({
  title,
  value,
  label,
  Icon,
}: StatCardProps) {
  return (
    <article className="rounded-[28px] border border-[#E6EBF0] bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-3 text-3xl font-bold text-[#24364B]">
            {value}
          </h3>

          {label && (
            <p className="mt-2 text-sm text-slate-400">
              {label}
            </p>
          )}
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#DBEAFE]">
          <Icon className="h-7 w-7 text-[#1D4ED8]" />
        </div>
      </div>
    </article>
  );
}