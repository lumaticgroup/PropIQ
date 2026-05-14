"use client";

import { cn } from "@/lib/cn";
import type { ReactNode } from "react";
import { useEffect } from "react";

export function Drawer({
  open,
  onClose,
  children,
  title,
  footer,
  className,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex">
      <button type="button" className="absolute inset-0 bg-[rgba(10,15,30,0.25)]" aria-label="Close" onClick={onClose} />
      <div
        className={cn(
          "relative ml-auto flex h-[90vh] w-full max-w-[380px] flex-col border-l border-default bg-bg-surface shadow-sm md:h-full md:max-h-none md:translate-x-0",
          className,
        )}
      >
        {title != null && (
          <div className="border-b border-default px-6 py-4">
            <div className="text-heading-md text-text-primary">{title}</div>
          </div>
        )}
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4 scrollbar-thin">{children}</div>
        {footer != null && <div className="border-t border-default px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
}
