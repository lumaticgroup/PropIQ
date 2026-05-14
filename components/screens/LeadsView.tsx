"use client";

import { useState } from "react";
import { Sparkles, UserRound } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Drawer } from "@/components/ui/Drawer";
import { ScoreIndicator } from "@/components/ui/ScoreIndicator";
import { useTranslation } from "@/context/LanguageContext";
import { brokerShort, leadRows } from "@/lib/mock/data";
import { formatCurrencyTry, formatTryMillionsLabel } from "@/lib/format";
import { cn } from "@/lib/cn";

const tabs = ["drawerProfile", "drawerActivity", "drawerMatched", "drawerNotes", "drawerWhatsApp"] as const;

const statusTKey: Record<string, string> = {
  newLead: "leads.statusNewLead",
  viewing: "leads.statusViewing",
  followUp: "leads.statusFollowUp",
  active: "leads.statusActive",
  contacted: "leads.statusContacted",
  cold: "leads.statusCold",
};

function statusBadgeVariant(statusKey: string): "info" | "success" | "danger" | "neutral" | "warning" {
  switch (statusKey) {
    case "newLead":
      return "info";
    case "viewing":
      return "success";
    case "followUp":
      return "danger";
    case "active":
      return "neutral";
    case "contacted":
      return "warning";
    case "cold":
      return "neutral";
    default:
      return "neutral";
  }
}

export function LeadsView() {
  const { t, lang } = useTranslation();
  const [selectedId, setSelectedId] = useState("1");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [tab, setTab] = useState<(typeof tabs)[number]>("drawerProfile");

  const selected = leadRows.find((r) => r.id === selectedId)!;
  const initials = selected.buyer
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-display-md text-text-primary">{t("leads.title")}</h1>
          <p className="text-body-sm text-text-secondary mt-2">
            {t("leads.subtitlePrefix")}
            <span className="text-status-danger">{t("leads.subtitleAlert")}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary">{t("leads.exportCsv")}</Button>
          <Button variant="ai" leftIcon={<Sparkles className="h-4 w-4 text-accent-ai" />}>
            ✦ {t("leads.aiAssign")}
          </Button>
        </div>
      </div>

      <Card className="sticky top-16 z-20 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-center">
          <span className="text-body-sm text-text-muted">{t("common.filter")}:</span>
          {["nationality", "budgetRange", "areaInterest", "leadScore", "source"].map((k) => (
            <button
              key={k}
              type="button"
              className="rounded-md border border-default bg-bg-surface px-3 py-2 text-body-sm text-text-secondary focus-ring md:hover:bg-bg-sunken"
            >
              {t(`leads.${k}` as "leads.nationality")} ▼
            </button>
          ))}
          <input
            type="search"
            placeholder={t("leads.searchPlaceholder")}
            className="focus-ring min-w-[200px] flex-1 rounded-md border border-default bg-bg-surface px-3 py-2 text-body-sm"
          />
          <button type="button" className="text-body-sm text-accent-primary focus-ring">
            {t("common.clearFilters")}
          </button>
        </div>
      </Card>

      <div className="-mx-4 overflow-x-auto px-4 scrollbar-thin md:mx-0 md:px-0">
        <table className="w-full min-w-[960px] border-collapse text-left text-body-sm">
          <thead>
            <tr className="border-b border-default bg-bg-sunken">
              <th className="sticky left-0 z-10 w-10 bg-bg-sunken px-3 py-3 text-label-md text-text-muted">□</th>
              <th className="sticky left-10 z-10 bg-bg-sunken px-3 py-3 text-label-md text-text-muted">{t("leads.tableScore")}</th>
              <th className="px-3 py-3 text-label-md text-text-muted">{t("leads.tableBuyer")}</th>
              <th className="px-3 py-3 text-label-md text-text-muted">{t("leads.tableNat")}</th>
              <th className="px-3 py-3 text-label-md text-text-muted">{t("leads.tableBudget")}</th>
              <th className="px-3 py-3 text-label-md text-text-muted">{t("leads.tableArea")}</th>
              <th className="px-3 py-3 text-label-md text-text-muted">{t("leads.tableSource")}</th>
              <th className="px-3 py-3 text-label-md text-text-muted">{t("leads.tableBroker")}</th>
              <th className="px-3 py-3 text-label-md text-text-muted">{t("leads.tableLast")}</th>
              <th className="px-3 py-3 text-label-md text-text-muted">{t("leads.tableStatus")}</th>
              <th className="px-3 py-3 text-label-md text-text-muted">⋮</th>
            </tr>
          </thead>
          <tbody>
            {leadRows.map((row) => {
              const sel = row.id === selectedId;
              return (
                <tr
                  key={row.id}
                  onClick={() => {
                    setSelectedId(row.id);
                    setDrawerOpen(true);
                  }}
                  className={cn(
                    "cursor-pointer border-b border-subtle transition-colors",
                    sel && "border-l-[3px] border-l-navy-700 bg-navy-50",
                  )}
                >
                  <td className={cn("sticky left-0 z-10 px-3 py-3", sel ? "bg-navy-50" : "bg-bg-surface")}>□</td>
                  <td className={cn("sticky left-10 z-10 px-3 py-3", sel ? "bg-navy-50" : "bg-bg-surface")}>
                    <ScoreIndicator score={row.score} />
                  </td>
                  <td className="px-3 py-3 font-medium text-text-primary">{row.buyer}</td>
                  <td className="px-3 py-3">
                    <span className="mr-1">{row.flag}</span>
                    {t(`lookup.nat.${row.nationalityKey}`)}
                  </td>
                  <td className="px-3 py-3">{formatTryMillionsLabel(row.budgetM, lang)}</td>
                  <td className="px-3 py-3 text-text-secondary">{row.area}</td>
                  <td className="px-3 py-3 text-text-secondary">{t(`lookup.source.${row.sourceKey}`)}</td>
                  <td className="px-3 py-3">
                    {row.brokerKey ? (
                      <span className="text-text-primary">{brokerShort[row.brokerKey]}</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-status-danger">
                        <UserRound className="h-4 w-4" aria-hidden />
                        {t("leads.unassigned")}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3 text-text-muted">{(t as (k: string) => string)(`lookup.time.${row.lastKey}`)}</td>
                  <td className="px-3 py-3">
                    <Badge variant={statusBadgeVariant(row.statusKey)} className="!normal-case !tracking-normal">
                      {t(statusTKey[row.statusKey] as "leads.statusNewLead")}
                    </Badge>
                  </td>
                  <td className="px-3 py-3 text-text-muted">⋮</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-sunken text-label-md font-semibold text-text-primary">
              {initials}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-heading-md text-text-primary">{selected.buyer}</span>
                <span>{selected.flag}</span>
                {selected.score >= 80 && (
                  <Badge variant="success" className="!normal-case">
                    {t("score.hot")}
                  </Badge>
                )}
                {selected.score >= 60 && selected.score < 80 && (
                  <Badge variant="warning" className="!normal-case">
                    {t("score.warm")}
                  </Badge>
                )}
                {selected.score < 60 && (
                  <Badge variant="danger" className="!normal-case">
                    {t("score.cold")}
                  </Badge>
                )}
                <span className="text-body-sm text-text-muted">{selected.score}</span>
              </div>
            </div>
          </div>
        }
        footer={
          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary">📞 {t("leads.btnCall")}</Button>
            <Button variant="secondary">💬 WhatsApp</Button>
            <Button variant="secondary">📅 {t("leads.btnSchedule")}</Button>
            <Button variant="primary">👤 {t("leads.btnAssign")}</Button>
          </div>
        }
      >
        {selected.id === "1" && (
          <Card variant="ai" className="mb-4 p-4">
            <p className="text-body-sm text-text-primary leading-relaxed">{t("leads.aiSummary")}</p>
          </Card>
        )}
        <div className="mb-4 flex gap-1 overflow-x-auto border-b border-default">
          {tabs.map((tk) => (
            <button
              key={tk}
              type="button"
              onClick={() => setTab(tk)}
              className={cn(
                "shrink-0 border-b-2 px-3 py-2 text-body-sm font-medium focus-ring",
                tab === tk ? "border-accent-primary text-accent-primary" : "border-transparent text-text-secondary",
              )}
            >
              {t(`leads.${tk}`)}
            </button>
          ))}
        </div>
        {tab === "drawerProfile" && (
          <dl className="space-y-3 text-body-sm">
            <div className="flex justify-between gap-4 border-b border-subtle py-2">
              <dt className="text-text-muted">{t("leads.fieldBudget")}</dt>
              <dd className="font-medium text-text-primary">
                {formatCurrencyTry(selected.budgetM * 1_000_000, lang)}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-subtle py-2">
              <dt className="text-text-muted">{t("leads.fieldType")}</dt>
              <dd className="font-medium text-text-primary">{t("leads.apartment")}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-subtle py-2">
              <dt className="text-text-muted">{t("leads.fieldTimeline")}</dt>
              <dd className="font-medium text-text-primary">{t("leads.within2mo")}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-subtle py-2">
              <dt className="text-text-muted">{t("leads.fieldArea")}</dt>
              <dd className="font-medium text-text-primary">{selected.area}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-subtle py-2">
              <dt className="text-text-muted">{t("leads.fieldCitizenship")}</dt>
              <dd className="font-medium text-status-success">
                {selected.id === "1" ? `${t("leads.yes")} ✓` : "—"}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-subtle py-2">
              <dt className="text-text-muted">{t("leads.fieldMortgage")}</dt>
              <dd className="font-medium text-text-primary">{t("leads.no")}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-subtle py-2">
              <dt className="text-text-muted">{t("leads.fieldFinancing")}</dt>
              <dd className="font-medium text-text-primary">{t("leads.cashBuyer")}</dd>
            </div>
            <div className="flex justify-between gap-4 py-2">
              <dt className="text-text-muted">{t("leads.fieldLanguage")}</dt>
              <dd className="font-medium text-text-primary">{t("leads.langs")}</dd>
            </div>
          </dl>
        )}
        {tab === "drawerMatched" && (
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {[
              { title: "Dubai Marina · 3BR", sub: `Sea view · ${formatTryMillionsLabel(4.2, lang)}`, m: 97 },
              { title: "Palm Jumeirah · Garden home", sub: `4BR · ${formatTryMillionsLabel(12.4, lang)}`, m: 91 },
              { title: "Business Bay · 3BR", sub: `Boulevard view · ${formatTryMillionsLabel(3.6, lang)}`, m: 88 },
            ].map((p) => (
              <div key={p.title} className="min-w-[200px] shrink-0 rounded-md border border-default bg-bg-sunken p-3 text-body-sm">
                <p className="font-medium text-text-primary">{p.title}</p>
                <p className="text-caption text-text-muted mt-1">{p.sub}</p>
                <p className="text-caption text-accent-ai mt-2">
                  ✦ {t("leads.matchPct")} %{p.m}
                </p>
              </div>
            ))}
          </div>
        )}
        {tab !== "drawerProfile" && tab !== "drawerMatched" && (
          <p className="text-body-sm text-text-muted">—</p>
        )}
      </Drawer>
    </div>
  );
}
