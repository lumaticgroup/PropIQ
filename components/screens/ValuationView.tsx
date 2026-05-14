"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useTranslation } from "@/context/LanguageContext";
import { formatCurrencyTry, formatDateShort, formatPerM2, formatPercent } from "@/lib/format";
import { valuationComparables } from "@/lib/mock/data";
import { cn } from "@/lib/cn";

export function ValuationView() {
  const { t, lang } = useTranslation();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-display-md text-text-primary">
          <span className="text-accent-ai">✦</span> {t("valuation.title")}
        </h1>
        <p className="text-body-sm text-text-secondary mt-2 max-w-3xl">{t("valuation.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Card>
            <h2 className="text-heading-lg text-text-primary mb-4">{t("valuation.sectionForm")}</h2>
            <div className="space-y-4">
              <label className="block text-body-sm">
                <span className="text-text-secondary">{t("valuation.sectionForm")}</span>
                <select className="mt-1 w-full rounded-md border border-default px-3 py-2 focus-ring">
                  <option>{t("valuation.aptType")}</option>
                </select>
              </label>
              <label className="block text-body-sm">
                <span className="text-text-secondary">{t("valuation.district")}</span>
                <input type="text" defaultValue="Dubai Marina" className="mt-1 w-full rounded-md border border-default px-3 py-2 focus-ring" />
              </label>
              <label className="block text-body-sm">
                <span className="text-text-secondary">{t("valuation.neighbourhood")}</span>
                <input type="text" defaultValue="JBR" className="mt-1 w-full rounded-md border border-default px-3 py-2 focus-ring" />
              </label>
              <label className="block text-body-sm">
                <span className="text-text-secondary">{t("valuation.bedrooms")}</span>
                <select className="mt-1 w-full rounded-md border border-default px-3 py-2 focus-ring">
                  <option>2BR</option>
                </select>
              </label>
              <label className="block text-body-sm">
                <span className="text-text-secondary">{t("valuation.netM2")}</span>
                <input type="number" defaultValue={98} className="mt-1 w-full rounded-md border border-default px-3 py-2 focus-ring" />
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="text-body-sm">
                  <span className="text-text-secondary">{t("valuation.floor")}</span>
                  <input type="number" defaultValue={8} className="mt-1 w-full rounded-md border border-default px-3 py-2 focus-ring" />
                </label>
                <label className="text-body-sm">
                  <span className="text-text-secondary">{t("valuation.totalFloors")}</span>
                  <input type="number" defaultValue={12} className="mt-1 w-full rounded-md border border-default px-3 py-2 focus-ring" />
                </label>
              </div>
              <label className="block text-body-sm">
                <span className="text-text-secondary">{t("valuation.view")}</span>
                <select className="mt-1 w-full rounded-md border border-default px-3 py-2 focus-ring">
                  <option>{t("valuation.seaView")}</option>
                </select>
              </label>
              <label className="block text-body-sm">
                <span className="text-text-secondary">{t("valuation.furnishing")}</span>
                <select className="mt-1 w-full rounded-md border border-default px-3 py-2 focus-ring">
                  <option>{t("valuation.unfurnished")}</option>
                </select>
              </label>
              <label className="block text-body-sm">
                <span className="text-text-secondary">{t("valuation.condition")}</span>
                <select className="mt-1 w-full rounded-md border border-default px-3 py-2 focus-ring">
                  <option>{t("valuation.wellMaintained")}</option>
                </select>
              </label>
              <label className="block text-body-sm">
                <span className="text-text-secondary">{t("valuation.age")}</span>
                <select className="mt-1 w-full rounded-md border border-default px-3 py-2 focus-ring">
                  <option>{t("valuation.age510")}</option>
                </select>
              </label>
              <label className="flex items-center gap-2 text-body-sm">
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-default" />
                {t("valuation.dask")}
              </label>
            </div>
            <div className="mt-6 rounded-md bg-bg-sunken p-4 text-body-sm text-text-secondary">
              <p className="font-medium text-text-primary mb-1">{t("valuation.sourcesTitle")}</p>
              <p>{t("valuation.sourcesLine")}</p>
            </div>
            <div className="mt-6 space-y-2">
              <Button variant="ai" leftIcon={<Sparkles className="h-4 w-4 text-accent-ai" />}>
                ✦ {t("valuation.run")} →
              </Button>
              <p className="text-caption text-text-muted">{t("valuation.runNote")}</p>
            </div>
          </Card>
        </div>
        <div className="lg:col-span-7 space-y-6">
          <Card variant="ai">
            <p className="text-label-md text-gold-600">{t("valuation.estValue")}</p>
            <p className="text-display-lg text-text-primary mt-2">{formatCurrencyTry(2_420_000, lang)}</p>
            <p className="text-body-sm text-text-secondary mt-2">
              {`${formatCurrencyTry(2_280_000, lang)} — ${formatCurrencyTry(2_560_000, lang)}`}
            </p>
            <span className="mt-3 inline-block rounded-md bg-status-success-bg px-2 py-1 text-label-sm text-status-success">
              91% {t("valuation.confidence")}
            </span>
            <p className="text-caption text-text-muted mt-4">
              {t("valuation.analysisRun")}: 5 {lang === "tr" ? "Mayıs 2026, 09:41" : "May 2026, 09:41 AM"} · {t("valuation.tkgmTo")}
            </p>
          </Card>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { k: "pillM2", v: formatPerM2(Math.round(2_420_000 / 98), lang) },
              { k: "pillGross", v: formatPercent(5.8, lang) },
              { k: "pillNet", v: formatPercent(4.6, lang) },
              { k: "pillDom", v: lang === "tr" ? "42 gün" : "42 days" },
            ].map((p) => (
              <div key={p.k} className="rounded-md border border-default bg-bg-surface px-3 py-2 text-center">
                <p className="text-caption text-text-muted">{t(`valuation.${p.k}` as "valuation.pillM2")}</p>
                <p className="text-body-sm font-semibold text-text-primary">{p.v}</p>
              </div>
            ))}
          </div>
          <Card>
            <h3 className="text-heading-md text-text-primary">{t("valuation.compTitle")}</h3>
            <p className="text-caption text-text-muted mb-4">{t("valuation.compSub")}</p>
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full min-w-[640px] text-left text-body-sm">
                <thead>
                  <tr className="border-b border-default">
                    <th className="py-2 text-label-md text-text-muted">{t("valuation.colDate")}</th>
                    <th className="py-2 text-label-md text-text-muted">{t("valuation.colUnit")}</th>
                    <th className="py-2 text-label-md text-text-muted">{t("valuation.colM2")}</th>
                    <th className="py-2 text-label-md text-text-muted">{t("valuation.colFloor")}</th>
                    <th className="py-2 text-label-md text-text-muted">{t("valuation.colPrice")}</th>
                    <th className="py-2 text-label-md text-text-muted">{t("valuation.colM2Price")}</th>
                    <th className="py-2 text-label-md text-text-muted">{t("valuation.colType")}</th>
                  </tr>
                </thead>
                <tbody>
                  {valuationComparables.map((r) => {
                    const isYou = r.unit === "8/4";
                    const d = new Date(r.date);
                    return (
                      <tr
                        key={r.date + r.unit}
                        className={cn("border-b border-subtle", isYou && "bg-navy-50 font-semibold")}
                      >
                        <td className="py-3">{formatDateShort(d, lang)}</td>
                        <td className="py-3">
                          {t("valuation.colUnit")} {r.unit}
                          {isYou ? ` · ${t("valuation.yourUnit")}` : ""}
                        </td>
                        <td className="py-3">{r.mSq}m²</td>
                        <td className="py-3">{r.floor}</td>
                        <td className="py-3">{formatCurrencyTry(r.price, lang)}</td>
                        <td className="py-3">{formatPerM2(Math.round(r.price / r.mSq), lang)}</td>
                        <td className="py-3">
                          {r.type} · {t("valuation.readyMove")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-caption text-text-muted mt-3 inline-block rounded bg-bg-sunken px-2 py-1">
              {t("valuation.sourceBadge")}
            </p>
          </Card>
          <Card variant="ai">
            <h3 className="text-heading-sm text-gold-600">✦ {t("valuation.aiTitle")}</h3>
            <p className="text-body-sm text-text-secondary mt-3 leading-relaxed">{t("valuation.aiBody")}</p>
          </Card>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary">↓ {t("valuation.downloadPdf")}</Button>
            <Button variant="secondary">↗ {t("valuation.shareClient")}</Button>
            <Button variant="primary">+ {t("valuation.createListing")}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
