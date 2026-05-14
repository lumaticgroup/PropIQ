import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "neutral" | "success" | "warning" | "danger" | "info" | "ai";
};

export function Badge({ variant = "neutral", className, ...props }: BadgeProps) {
  const map: Record<NonNullable<BadgeProps["variant"]>, string> = {
    neutral: "bg-bg-sunken text-text-secondary",
    success: "bg-status-success-bg text-status-success",
    warning: "bg-status-warning-bg text-status-warning",
    danger: "bg-status-danger-bg text-status-danger",
    info: "bg-status-info-bg text-status-info",
    ai: "bg-accent-ai-bg text-gold-600 border border-accent-ai-border",
  };
  return (
    <span
      className={cn("inline-flex items-center rounded px-2 py-0.5 text-label-sm font-medium", map[variant], className)}
      {...props}
    />
  );
}
