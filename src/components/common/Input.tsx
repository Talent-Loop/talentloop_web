import type { InputHTMLAttributes } from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export default function Input({
  icon,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>
      )}

      <input
        className={`h-14 w-full rounded-xl border border-[#D9E2EC] bg-white px-5 ${
          icon ? "pl-12" : ""
        } outline-none transition focus:border-[#17324D] ${className}`}
        {...props}
      />
    </div>
  );
}