"use client";

import { Bell, Moon, Search, Sparkles, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import type { Lang } from "@/lib/format";
import Link from "next/link";

const breadcrumbKey: Record<string, string> = {
  "/dashboard": "nav.dashboard",
  "/leads": "nav.leadCenter",
  "/listing-builder": "nav.listingBuilder",
  "/valuation": "nav.valuationEngine",
  "/compliance": "compliance.title",
  "/concierge": "nav.aiConcierge",
};

export function Header() {
  const pathname = usePathname();
  const { t, lang, setLang } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const base = "/" + pathname.split("/")[1] || "/dashboard";
  const crumbKey = breadcrumbKey[base] ?? "nav.dashboard";

  return (
    <header className="sticky top-0 z-30 flex min-h-16 flex-col gap-3 border-b border-default bg-bg-surface px-4 py-3 md:flex-row md:items-center md:justify-between md:px-8">
      <div className="min-w-[140px] text-body-sm text-text-secondary">
        <span className="text-text-primary">{t(crumbKey)}</span>
      </div>

      <div className="hidden min-w-0 flex-1 px-0 sm:block md:px-6">
        <label className="relative block">
          <span className="sr-only">{t("header.searchPlaceholder")}</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="search"
            placeholder={t("header.searchPlaceholder")}
            className="focus-ring w-full rounded-md border border-default bg-bg-sunken py-2.5 pl-9 pr-3 text-body-sm outline-none"
          />
        </label>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-default bg-bg-surface text-text-secondary"
          aria-label={t("header.themeToggle")}
          title={t("header.themeToggle")}
        >
          {theme === "dark" ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
        </button>
        <SegmentedControl<Lang>
          options={[
            { value: "en", label: "EN" },
            { value: "tr", label: "TR" },
          ]}
          value={lang}
          onChange={setLang}
          className="shrink-0"
        />
        <button
          type="button"
          className="focus-ring relative flex h-11 w-11 items-center justify-center rounded-md border border-default bg-bg-surface"
          aria-label={t("header.notifications")}
        >
          <Bell className="h-5 w-5 text-text-secondary" />
          <span className="absolute right-1 top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-status-danger px-1 text-[10px] font-semibold text-text-inverted">
            7
          </span>
        </button>
        <Link href="/listing-builder?section=builder">
          <Button variant="ai" leftIcon={<Sparkles className="h-4 w-4 text-accent-ai" aria-hidden />}>
            <span className="text-heading-sm">✦ + {t("header.newListing")}</span>
          </Button>
        </Link>
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-700 text-label-md text-text-inverted"
          aria-hidden
        >
          AY
        </div>
      </div>
    </header>
  );
}
