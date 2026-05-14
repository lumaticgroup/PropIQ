import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "ai";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
  leftIcon?: ReactNode;
};

export function Button({ variant = "primary", className, children, leftIcon, type = "button", ...props }: ButtonProps) {
  const base =
    "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md text-body-md font-medium transition duration-150 ease-out focus-ring disabled:pointer-events-none disabled:opacity-50 md:hover:opacity-95";
  const styles: Record<Variant, string> = {
    primary: "bg-accent-primary text-white dark:text-[#0b0f17] px-4 py-2",
    secondary: "border border-default bg-bg-surface text-text-primary px-4 py-2",
    ghost: "text-accent-primary px-3 py-2",
    ai: "bg-accent-ai-bg text-gold-600 border border-accent-ai-border px-4 py-2",
  };
  return (
    <button type={type} className={cn(base, styles[variant], className)} {...props}>
      {leftIcon}
      {children}
    </button>
  );
}
