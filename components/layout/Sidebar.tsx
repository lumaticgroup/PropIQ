"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  BarChart,
  BarChart2,
  Briefcase,
  Building2,
  Calculator,
  Columns,
  FileCheck,
  Fingerprint,
  Globe,
  Home,
  List,
  LogOut,
  MessageCircle,
  PenTool,
  Plug,
  Presentation,
  RefreshCw,
  Settings,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  Users2,
  Video,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useTranslation } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

type NavItem = {
  href: string;
  key: string;
  icon: typeof Home;
  ai?: boolean;
  matchKeys?: string[];
  /** If set, active only when path matches and ?section= matches (default when missing: see pathDefaults). */
  section?: string;
};

type NavSection = { titleKey: string; items: NavItem[] };

function pathBase(href: string): string {
  const noHash = href.split("#")[0];
  return noHash.split("?")[0] || noHash;
}

const SECTION_DEFAULT: Record<string, string> = {
  "/listing-builder": "builder",
  "/concierge": "concierge",
  "/compliance": "registry",
};

function navItemActive(pathname: string, searchParams: URLSearchParams, item: NavItem): boolean {
  if (item.href.includes("#")) return false;
  const base = pathBase(item.href);
  if (pathname !== base) return false;

  if (item.section != null) {
    const fallback = SECTION_DEFAULT[base] ?? "";
    const current = searchParams.get("section") ?? fallback;
    return current === item.section;
  }

  if (item.matchKeys && item.matchKeys.length === 0) return false;
  if (item.matchKeys) return item.matchKeys.includes(item.key);
  return true;
}

function NavLink({
  item,
  pathname,
  searchParams,
}: {
  item: NavItem;
  pathname: string;
  searchParams: URLSearchParams;
}) {
  const { t } = useTranslation();
  const label = t(`nav.${item.key}`);
  const active = navItemActive(pathname, searchParams, item);
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      title={label}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2.5 text-body-sm transition duration-150 ease-out focus-ring",
        active
          ? "border-l-[3px] border-accent-ai bg-bg-sidebar-active text-text-sidebar-active"
          : "border-l-[3px] border-transparent text-text-sidebar md:hover:bg-bg-sidebar-hover",
      )}
    >
      <Icon className={cn("h-5 w-5 shrink-0", item.ai && "text-accent-ai")} aria-hidden />
      <span className={cn("hidden truncate lg:inline", item.ai && active && "text-accent-ai")}>{label}</span>
    </Link>
  );
}

const sections: NavSection[] = [
  {
    titleKey: "overview",
    items: [
      { href: "/dashboard", key: "dashboard", icon: Home, matchKeys: ["dashboard"] },
      { href: "/dashboard#market-pulse", key: "marketPulse", icon: BarChart2 },
    ],
  },
  {
    titleKey: "sales",
    items: [
      { href: "/leads", key: "leadCenter", icon: Users, matchKeys: ["leadCenter"] },
      { href: "/dashboard#pipeline", key: "pipeline", icon: Columns },
      { href: "/dashboard", key: "offPlanMatcher", icon: Building2, matchKeys: [] },
    ],
  },
  {
    titleKey: "listings",
    items: [
      {
        href: "/listing-builder?section=my-listings",
        key: "myListings",
        icon: List,
        section: "my-listings",
      },
      {
        href: "/listing-builder?section=builder",
        key: "listingBuilder",
        icon: Sparkles,
        ai: true,
        section: "builder",
      },
      {
        href: "/listing-builder?section=portal-sync",
        key: "portalSync",
        icon: RefreshCw,
        section: "portal-sync",
      },
    ],
  },
  {
    titleKey: "analytics",
    items: [
      { href: "/dashboard#market-pulse", key: "marketIntel", icon: Globe },
      { href: "/valuation", key: "valuationEngine", icon: Calculator },
      { href: "/dashboard", key: "roiAnalyzer", icon: TrendingUp, matchKeys: [] },
    ],
  },
  {
    titleKey: "clientTools",
    items: [
      {
        href: "/concierge?section=concierge",
        key: "aiConcierge",
        icon: MessageCircle,
        ai: true,
        section: "concierge",
      },
      {
        href: "/concierge?section=tour",
        key: "virtualTour",
        icon: Video,
        section: "tour",
      },
      { href: "/leads", key: "investorProfiles", icon: Briefcase, matchKeys: [] },
    ],
  },
  {
    titleKey: "compliance",
    items: [
      {
        href: "/compliance?section=registry",
        key: "registryMonitor",
        icon: Shield,
        section: "registry",
      },
      {
        href: "/compliance?section=kyc",
        key: "kycAml",
        icon: Fingerprint,
        section: "kyc",
      },
      {
        href: "/compliance?section=deal",
        key: "dealTracker",
        icon: FileCheck,
        section: "deal",
      },
    ],
  },
  {
    titleKey: "marketing",
    items: [
      { href: "/dashboard", key: "contentStudio", icon: PenTool, matchKeys: [] },
      { href: "/dashboard", key: "adPerformance", icon: BarChart, matchKeys: [] },
      { href: "/dashboard", key: "investorDecks", icon: Presentation, matchKeys: [] },
    ],
  },
  {
    titleKey: "settings",
    items: [
      { href: "/dashboard", key: "agencySettings", icon: Settings, matchKeys: [] },
      { href: "/leads", key: "teamBrokers", icon: Users2, matchKeys: [] },
      { href: "/dashboard", key: "integrations", icon: Plug, matchKeys: [] },
    ],
  },
];

export function Sidebar() {
  const { t, lang } = useTranslation();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, logout } = useAuth();

  const displayName =
    user != null ? (lang === "tr" ? user.nameTr : user.name) : t("user.name");
  const displayRole =
    user != null ? (lang === "tr" ? user.roleTr : user.role) : t("user.role");

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-14 flex-col bg-bg-sidebar sm:flex lg:w-60">
      <div className="border-b border-white/10 px-3 py-5 lg:px-6">
        <p className="text-center font-bold text-accent-ai text-[18px] leading-tight lg:text-left">{t("brand.name")}</p>
        <p className="mt-1 hidden text-[11px] text-text-sidebar opacity-80 lg:block">{t("brand.tagline")}</p>
      </div>
      <nav className="flex-1 space-y-6 overflow-y-auto px-2 py-4 scrollbar-thin lg:px-3">
        {sections.map((section) => (
          <div key={section.titleKey}>
            <p className="mb-2 hidden px-3 text-label-sm text-text-sidebar opacity-70 lg:block">
              {t(`nav.${section.titleKey}`)}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={`${section.titleKey}-${item.key}`}
                  item={item}
                  pathname={pathname}
                  searchParams={searchParams}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="mt-auto border-t border-white/10 p-3 lg:p-6">
        <div className="rounded-md bg-white/5 p-3">
          <p className="hidden text-[13px] font-semibold text-text-inverted lg:block">{displayName}</p>
          <p className="hidden text-[12px] text-text-sidebar lg:block">{displayRole}</p>
          <span className="mt-0 inline-block w-full rounded bg-gold-400/20 px-2 py-1 text-center text-[10px] font-medium tracking-wide text-accent-ai lg:mt-2 lg:text-left lg:text-label-sm">
            {t("user.proPlan")}
          </span>
          <button
            type="button"
            className="mt-3 hidden w-full items-center gap-2 rounded-md px-2 py-2 text-left text-[12px] text-text-sidebar transition duration-150 focus-ring md:hover:bg-bg-sidebar-hover lg:flex"
            onClick={() => {
              logout();
              router.push("/login");
            }}
          >
            <LogOut className="h-4 w-4 shrink-0" aria-hidden />
            {t("auth.logout")}
          </button>
        </div>
      </div>
    </aside>
  );
}
