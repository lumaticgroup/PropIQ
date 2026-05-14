import { cn } from "@/lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "ai";
  children: ReactNode;
};

export function Card({ variant = "default", className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-md border bg-bg-surface p-6 transition duration-150",
        variant === "default" && "border-default shadow-sm",
        variant === "ai" && "border-accent-ai-border bg-accent-ai-bg",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
