import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export type MetricCardProps = {
  label: ReactNode;
  value: ReactNode;
  subtext?: ReactNode;
  trend?: ReactNode;
  trendClassName?: string;
};

export function MetricCard({ label, value, subtext, trend, trendClassName }: MetricCardProps) {
  return (
    <div className="rounded-md border border-default bg-bg-surface p-6 shadow-sm">
      <p className="text-body-sm text-text-secondary">{label}</p>
      <p className="text-display-lg text-text-primary mt-2">{value}</p>
      {subtext != null && <p className="text-caption text-text-muted mt-1">{subtext}</p>}
      {trend != null && <p className={cn("text-caption mt-2 flex items-center gap-1", trendClassName)}>{trend}</p>}
    </div>
  );
}
