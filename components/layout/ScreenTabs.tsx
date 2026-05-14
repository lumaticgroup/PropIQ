"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { useTranslation } from "@/context/LanguageContext";

const routes = [
  { href: "/dashboard", path: "/dashboard", key: "dashboard" },
  { href: "/leads", path: "/leads", key: "leads" },
  { href: "/listing-builder?section=builder", path: "/listing-builder", key: "listingBuilder" },
  { href: "/valuation", path: "/valuation", key: "valuation" },
  { href: "/compliance?section=registry", path: "/compliance", key: "compliance" },
  { href: "/concierge?section=concierge", path: "/concierge", key: "concierge" },
] as const;

export function ScreenTabs() {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <div className="border-b border-default bg-bg-surface">
      <div className="flex gap-2 overflow-x-auto px-4 scrollbar-thin md:px-8">
        {routes.map((r) => {
          const active = pathname === r.path || pathname.startsWith(`${r.path}/`);
          return (
            <Link
              key={r.path + r.key}
              href={r.href}
              className={cn(
                "shrink-0 border-b-2 py-3 text-body-sm font-medium transition duration-150 focus-ring",
                active ? "border-accent-primary text-accent-primary" : "border-transparent text-text-secondary",
              )}
            >
              {t(`screenTabs.${r.key}`)}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
