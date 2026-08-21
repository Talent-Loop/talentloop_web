import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
}

export default function Badge({
  children,
}: BadgeProps) {
  return (
    <div className="inline-flex items-center rounded-full bg-[#E9FAEE] px-5 py-2 text-sm font-medium text-[#22A45D]">
      {children}
    </div>
  );
}