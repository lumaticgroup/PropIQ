"use client";

import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export type SegmentedOption<T extends string> = { value: T; label: ReactNode };

export type SegmentedControlProps<T extends string> = {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
};

export function SegmentedControl<T extends string>({ options, value, onChange, className }: SegmentedControlProps<T>) {
  return (
    <div
      role="tablist"
      className={cn("inline-flex rounded-md border border-default bg-bg-sunken p-1", className)}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "min-h-11 min-w-[44px] rounded px-3 text-body-sm font-medium transition duration-150 ease-out focus-ring",
              active ? "bg-bg-surface text-text-primary shadow-sm" : "text-text-secondary md:hover:text-text-primary",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
