"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutList, MessageCircle, MoreHorizontal, Users } from "lucide-react";
import { cn } from "@/lib/cn";
import { useTranslation } from "@/context/LanguageContext";
import { useState } from "react";

const tabs = [
  { href: "/dashboard", path: "/dashboard", key: "home", icon: Home },
  { href: "/leads", path: "/leads", key: "leads", icon: Users },
  { href: "/listing-builder?section=builder", path: "/listing-builder", key: "listings", icon: LayoutList },
  { href: "/concierge?section=concierge", path: "/concierge", key: "concierge", icon: MessageCircle },
  { href: "more", key: "more", icon: MoreHorizontal },
] as const;

export function MobileNav() {
  const pathname = usePathname();
  const { t, lang, setLang } = useTranslation();
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-default bg-bg-surface sm:hidden"
        aria-label="Mobile primary"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          if (tab.href === "more") {
            return (
              <button
                key="more"
                type="button"
                onClick={() => setMoreOpen(true)}
                className="flex min-h-14 min-w-0 flex-1 flex-col items-center justify-center gap-1 border-t-2 border-transparent py-2 text-text-muted transition duration-150 focus-ring"
              >
                <Icon className="h-5 w-5" aria-hidden />
                <span className="text-caption">{t("mobileNav.more")}</span>
              </button>
            );
          }
          const active = pathname === tab.path || pathname.startsWith(`${tab.path}/`);
          return (
            <Link
              key={tab.key}
              href={tab.href}
              className={cn(
                "flex min-h-14 min-w-0 flex-1 flex-col items-center justify-center gap-1 py-2 transition duration-150 focus-ring",
                active ? "border-t-2 border-accent-ai text-accent-primary" : "border-t-2 border-transparent text-text-muted",
              )}
            >
              <Icon className={cn("h-5 w-5", active && "text-accent-primary")} aria-hidden />
              <span className="text-caption">
                {tab.key === "home"
                  ? t("mobileNav.home")
                  : tab.key === "leads"
                    ? t("mobileNav.leads")
                    : tab.key === "listings"
                      ? t("mobileNav.listings")
                      : t("mobileNav.concierge")}
              </span>
            </Link>
          );
        })}
      </nav>

      {moreOpen && (
        <div className="fixed inset-0 z-[70] sm:hidden">
          <button type="button" className="absolute inset-0 bg-[rgba(10,15,30,0.35)]" onClick={() => setMoreOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[90vh] rounded-t-xl border border-default bg-bg-surface p-6 shadow-sm">
            <p className="text-heading-sm text-text-primary mb-4">{t("mobileNav.more")}</p>
            <div className="flex flex-col gap-2">
              <Link
                href="/valuation"
                className="rounded-md border border-default px-4 py-3 text-body-md focus-ring"
                onClick={() => setMoreOpen(false)}
              >
                {t("moreMenu.valuation")}
              </Link>
              <Link
                href="/compliance?section=registry"
                className="rounded-md border border-default px-4 py-3 text-body-md focus-ring"
                onClick={() => setMoreOpen(false)}
              >
                {t("moreMenu.compliance")}
              </Link>
              <Link
                href="/dashboard#market-pulse"
                className="rounded-md border border-default px-4 py-3 text-body-md focus-ring"
                onClick={() => setMoreOpen(false)}
              >
                {t("moreMenu.marketPulse")}
              </Link>
              <div className="mt-4 flex gap-2 border-t border-default pt-4">
                <button
                  type="button"
                  className={cn(
                    "flex-1 rounded-md border px-3 py-2 text-body-sm font-medium focus-ring",
                    lang === "en" ? "border-accent-primary bg-navy-50" : "border-default",
                  )}
                  onClick={() => setLang("en")}
                >
                  EN
                </button>
                <button
                  type="button"
                  className={cn(
                    "flex-1 rounded-md border px-3 py-2 text-body-sm font-medium focus-ring",
                    lang === "tr" ? "border-accent-primary bg-navy-50" : "border-default",
                  )}
                  onClick={() => setLang("tr")}
                >
                  TR
                </button>
              </div>
            </div>
            <button
              type="button"
              className="mt-4 w-full rounded-md border border-default py-3 text-body-sm focus-ring"
              onClick={() => setMoreOpen(false)}
            >
              {t("moreMenu.close")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
