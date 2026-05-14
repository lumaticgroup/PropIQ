"use client";

import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingDown, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { MetricCard } from "@/components/ui/MetricCard";
import { ScoreIndicator } from "@/components/ui/ScoreIndicator";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { useTranslation } from "@/context/LanguageContext";
import {
  brokerLeaders,
  buildMarketPulseSeries,
  dashboardFeed,
  dashboardPipeline,
  marketPulseCommunities,
  portalStatus,
} from "@/lib/mock/data";
import {
  formatCompactMillionTry,
  formatPerM2,
  formatPercent,
  formatMinutes,
  formatTryMillionsLabel,
} from "@/lib/format";

type RangeKey = "today" | "7" | "30" | "90";

const communityLabel: Record<string, { en: string; tr: string }> = {
  marina: { en: "Dubai Marina", tr: "Dubai Marina" },
  downtown: { en: "Downtown", tr: "Downtown" },
  jvc: { en: "JVC", tr: "JVC" },
  businessbay: { en: "Business Bay", tr: "Business Bay" },
  palm: { en: "Palm Jumeirah", tr: "Palm Jumeirah" },
};

export function DashboardView() {
  const { t, lang } = useTranslation();
  const [dateRange, setDateRange] = useState<RangeKey>("30");
  const chartData = useMemo(() => buildMarketPulseSeries(), []);
  const pulseFilters: { value: RangeKey; label: string }[] = [
    { value: "today", label: t("common.today") },
    { value: "7", label: t("common.days7") },
    { value: "30", label: t("common.days30") },
    { value: "90", label: t("common.days90") },
  ];

  const subtitleDate = lang === "tr" ? "Pazartesi, 5 Mayıs 2026" : "Monday, 5 May 2026";

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-display-md text-text-primary">{t("dashboard.title")}</h1>
          <p className="text-body-sm text-text-secondary mt-2">
            {subtitleDate} · {t("dashboard.greeting")}
          </p>
        </div>
        <SegmentedControl<RangeKey>
          options={pulseFilters.map((o) => ({ value: o.value, label: o.label }))}
          value={dateRange}
          onChange={setDateRange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard
          label={t("dashboard.activeLeads")}
          value="284"
          subtext={t("dashboard.weekPlus")}
          trend={
            <>
              <TrendingUp className="h-3 w-3 text-status-success" aria-hidden /> {t("dashboard.trendWeek")}
            </>
          }
          trendClassName="text-status-success"
        />
        <MetricCard
          label={t("dashboard.pipelineValue")}
          value={formatCompactMillionTry(142.6, lang)}
          subtext={t("dashboard.activeDeals")}
          trend={
            <>
              <TrendingUp className="h-3 w-3 text-status-success" aria-hidden /> {t("dashboard.trendWeek")}
            </>
          }
          trendClassName="text-status-success"
        />
        <MetricCard
          label={t("dashboard.listingsLive")}
          value="67"
          subtext={t("dashboard.pendingApproval")}
          trend={
            <>
              <TrendingUp className="h-3 w-3 text-status-warning" aria-hidden /> 12 {t("dashboard.pendingApproval")}
            </>
          }
          trendClassName="text-status-warning"
        />
        <MetricCard
          label={t("dashboard.avgResponse")}
          value={formatMinutes(4.2, lang)}
          subtext={
            <span className="text-accent-ai">
              ✦ {t("dashboard.viaAi")}
            </span>
          }
          trend={
            <span title={t("dashboard.trendGoodDown")}>
              <TrendingDown className="inline h-3 w-3 text-status-success" aria-hidden /> {t("dashboard.trendGoodDown")}
            </span>
          }
          trendClassName="text-status-success"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
        <div className="space-y-8 xl:col-span-8">
          <Card>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h2 className="text-heading-lg text-text-primary">{t("dashboard.leadFeed")}</h2>
                <span className="flex items-center gap-1 rounded-full bg-status-success-bg px-2 py-0.5 text-caption text-status-success">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-success opacity-40" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-status-success" />
                  </span>
                  {t("common.live")}
                </span>
              </div>
              <Link href="/leads" className="text-body-sm font-medium text-accent-primary focus-ring rounded">
                {t("common.viewAll")} 284 →
              </Link>
            </div>
            <div className="-mx-6 overflow-x-auto scrollbar-thin">
              <table className="w-full min-w-[720px] border-collapse text-left text-body-sm">
                <thead>
                  <tr className="border-b border-default bg-bg-sunken">
                    <th className="sticky left-0 z-10 bg-bg-sunken px-4 py-2 text-label-md text-text-muted">{t("dashboard.tableScore")}</th>
                    <th className="px-4 py-2 text-label-md text-text-muted">{t("dashboard.tableBuyer")}</th>
                    <th className="px-4 py-2 text-label-md text-text-muted">{t("dashboard.tableNationality")}</th>
                    <th className="px-4 py-2 text-label-md text-text-muted">{t("dashboard.tableBudget")}</th>
                    <th className="px-4 py-2 text-label-md text-text-muted">{t("dashboard.tableInterest")}</th>
                    <th className="px-4 py-2 text-label-md text-text-muted">{t("dashboard.tableSource")}</th>
                    <th className="px-4 py-2 text-label-md text-text-muted">{t("common.time")}</th>
                    <th className="px-4 py-2 text-label-md text-text-muted">{t("common.action")}</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardFeed.map((row) => (
                    <tr key={row.buyer} className="border-b border-subtle">
                      <td className="sticky left-0 z-10 bg-bg-surface px-4 py-3">
                        <ScoreIndicator score={row.score} />
                      </td>
                      <td className="px-4 py-3 font-medium text-text-primary">{row.buyer}</td>
                      <td className="px-4 py-3 text-text-secondary">
                        <span className="mr-1">{row.flag}</span>
                        {t(`lookup.nat.${row.nationalityKey}`)}
                      </td>
                      <td className="px-4 py-3">{formatTryMillionsLabel(row.budgetM, lang)}</td>
                      <td className="px-4 py-3 text-text-secondary">{row.interest}</td>
                      <td className="px-4 py-3 text-text-secondary">{t(`lookup.source.${row.sourceKey}`)}</td>
                      <td className="px-4 py-3 text-text-muted">{t(`lookup.time.${row.timeKey}` as never)}</td>
                      <td className="px-4 py-3">
                        <Link href="/leads" className="text-accent-primary focus-ring rounded">
                          →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div id="pipeline" className="scroll-mt-24">
            <Card>
              <h2 className="text-heading-lg text-text-primary mb-4">{t("dashboard.dealPipeline")}</h2>
              <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-2 scrollbar-thin">
                {dashboardPipeline.map((col) => (
                  <div key={col.id} className="flex w-[220px] shrink-0 flex-col rounded-md border border-default bg-bg-sunken p-4">
                    <p className="text-label-sm text-text-muted">{t(`dashboard.${col.labelKey}`)}</p>
                    <p className="text-heading-md text-text-primary mt-2">
                      {col.count} {t("dashboard.leadsSuffix")}
                    </p>
                    <p className="text-display-md text-accent-primary">{formatCompactMillionTry(col.valueM, lang)}</p>
                    <div className="mt-4 space-y-2">
                      {col.cards.map((c) => (
                        <div key={c.title} className="rounded border border-default bg-bg-surface px-3 py-2 text-body-sm">
                          <p className="font-medium text-text-primary">{c.title}</p>
                          <p className="text-caption text-text-muted">{formatTryMillionsLabel(c.subM, lang)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <div className="space-y-8 xl:col-span-4">
          <Card variant="ai">
            <div className="mb-4 flex items-center justify-between gap-2">
              <h2 className="text-heading-lg text-gold-600">✦ {t("dashboard.aiInsights")}</h2>
              <span className="text-caption text-text-muted">{t("dashboard.insightsUpdated")}</span>
            </div>
            <ul className="space-y-4 text-body-sm">
              <li className="flex gap-3">
                <span aria-hidden>🔴</span>
                <div>
                  <p className="font-medium text-status-danger">{t("dashboard.insight1Title")}</p>
                  <p className="text-caption text-text-secondary mt-1">{t("dashboard.insight1Desc")}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span aria-hidden>🟡</span>
                <div>
                  <p className="font-medium text-status-warning">{t("dashboard.insight2Title")}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span aria-hidden>🟢</span>
                <div>
                  <p className="font-medium text-status-success">{t("dashboard.insight3Title")}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span aria-hidden>🔵</span>
                <div>
                  <p className="font-medium text-status-info">{t("dashboard.insight4Title")}</p>
                </div>
              </li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-heading-lg text-text-primary mb-4">{t("dashboard.topBrokers")}</h2>
            <ul className="space-y-3 text-body-sm">
              {brokerLeaders.map((b, i) => (
                <li key={b.name} className="flex items-center justify-between gap-2 border-b border-subtle pb-3 last:border-0">
                  <span className="font-medium text-text-primary">
                    {i + 1}. {b.name}
                  </span>
                  <span className="text-text-secondary">
                    {formatTryMillionsLabel(b.volM, lang)} · {b.deals} {t("dashboard.deals")} · {b.close}%
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h2 className="text-heading-lg text-text-primary mb-4">{t("dashboard.portalHealth")}</h2>
            <ul className="space-y-4 text-body-sm">
              {portalStatus.map((p) => (
                <li key={p.name} className="flex flex-col gap-1 border-b border-subtle pb-4 last:border-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-text-primary">{p.name}</span>
                    <span className={p.ok ? "text-status-success" : "text-status-warning"}>●</span>
                  </div>
                  <p className="text-caption text-text-muted">
                    {p.listings} {t("dashboard.listingsLabel")}
                    {"pending" in p && p.pending != null
                      ? ` · ${p.pending} ${t("dashboard.pendingSuffix")}`
                      : ""}{" "}
                    · {p.minAgo} {t("dashboard.minAgoSuffix")}
                  </p>
                </li>
              ))}
            </ul>
            <button type="button" className="mt-4 text-body-sm font-medium text-accent-primary focus-ring">
              {t("common.syncAll")} →
            </button>
          </Card>
        </div>
      </div>

      <div id="market-pulse" className="scroll-mt-24">
        <Card>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-heading-lg text-text-primary">{t("dashboard.marketPulseTitle")}</h2>
            <SegmentedControl<RangeKey>
              options={pulseFilters.map((o) => ({ value: o.value, label: o.label }))}
              value={dateRange}
              onChange={setDateRange}
            />
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="h-[180px] w-full sm:h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid stroke={typeof window === "undefined" ? "#d1d5db" : "var(--color-border-default)"} horizontal vertical={false} />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="var(--color-text-muted)" />
                    <YAxis
                      domain={[8000, 52000]}
                      tick={{ fontSize: 11 }}
                      stroke="var(--color-text-muted)"
                      width={56}
                    />
                    <Tooltip
                      contentStyle={{
                        borderColor: "var(--color-border-default)",
                        borderWidth: 1,
                        borderRadius: 6,
                        fontSize: 12,
                      }}
                    />
                    <Line type="monotone" dataKey="marina" name="Dubai Marina" stroke="var(--chart-marina)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="downtown" name="Downtown" stroke="var(--chart-downtown)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="jvc" name="JVC" stroke="var(--chart-jvc)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="palm" name="Palm" stroke="var(--chart-palm)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="businessbay" name="Business Bay" stroke="var(--chart-businessbay)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="overflow-x-auto scrollbar-thin">
                <table className="w-full min-w-[360px] text-left text-body-sm">
                  <thead>
                    <tr className="border-b border-default">
                      <th className="py-2 text-label-md text-text-muted">{t("dashboard.community")}</th>
                      <th className="py-2 text-label-md text-text-muted">{t("dashboard.priceM2")}</th>
                      <th className="py-2 text-label-md text-text-muted">{t("dashboard.mom")}</th>
                      <th className="py-2 text-label-md text-text-muted">{t("dashboard.demand")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketPulseCommunities.map((c) => (
                      <tr key={c.id} className="border-b border-subtle">
                        <td className="py-3 font-medium text-text-primary">
                          {communityLabel[c.id][lang === "tr" ? "tr" : "en"]}
                        </td>
                        <td className="py-3">{formatPerM2(c.price, lang)}</td>
                        <td className="py-3 text-status-success">+{formatPercent(c.mom, lang)} ↑</td>
                        <td className="py-3">
                          {c.tone === "hot" ? "🔥 " : "↑ "}
                          {c.demand}/100
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
