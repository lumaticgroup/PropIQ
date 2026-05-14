"use client";

import { Fragment, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useTranslation } from "@/context/LanguageContext";
import { complianceRows, regulationFeed } from "@/lib/mock/data";
import { cn } from "@/lib/cn";

function pill(status: (typeof complianceRows)[number]["status"], t: (k: string) => string) {
  if (status === "ok") return <Badge variant="success" className="!normal-case">{t("compliance.statusOk")}</Badge>;
  if (status === "one") return <Badge variant="warning" className="!normal-case">{t("compliance.statusOne")}</Badge>;
  return <Badge variant="danger" className="!normal-case">{t("compliance.statusCrit")}</Badge>;
}

const regLevelKey: Record<string, string> = {
  high: "levelHigh",
  medium: "levelMedium",
  low: "levelLow",
};

export function ComplianceView() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<string | null>("DXB-0042");

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-display-md text-text-primary">{t("compliance.title")}</h1>
          <p className="text-body-sm text-text-secondary mt-2">{t("compliance.subtitle")}</p>
          <p className="text-caption text-text-muted mt-2">{t("compliance.lastScan")}</p>
        </div>
        <Button variant="secondary">↺ {t("compliance.rescan")}</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="flex items-center gap-3 py-4">
          <span className="text-status-success text-xl">●</span>
          <div>
            <p className="text-display-md text-text-primary">51</p>
            <p className="text-body-sm text-text-secondary">{t("compliance.compliantCount")}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3 py-4">
          <span className="text-status-warning text-xl">●</span>
          <div>
            <p className="text-display-md text-text-primary">12</p>
            <p className="text-body-sm text-text-secondary">{t("compliance.issuesCount")}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3 py-4">
          <span className="text-status-danger text-xl">●</span>
          <div>
            <p className="text-display-md text-text-primary">4</p>
            <p className="text-body-sm text-text-secondary">{t("compliance.criticalCount")}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Card className="p-0 overflow-hidden">
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full min-w-[900px] text-left text-body-sm">
                <thead>
                  <tr className="border-b border-default bg-bg-sunken">
                    <th className="px-4 py-3 text-label-md text-text-muted">{t("compliance.colId")}</th>
                    <th className="px-4 py-3 text-label-md text-text-muted">{t("compliance.colProperty")}</th>
                    <th className="px-4 py-3 text-label-md text-text-muted">{t("compliance.colDistrict")}</th>
                    <th className="px-4 py-3 text-label-md text-text-muted">{t("compliance.colPortal")}</th>
                    <th className="px-4 py-3 text-label-md text-text-muted">{t("compliance.colTapu")}</th>
                    <th className="px-4 py-3 text-label-md text-text-muted">{t("compliance.colPrice")}</th>
                    <th className="px-4 py-3 text-label-md text-text-muted">{t("compliance.colAd")}</th>
                    <th className="px-4 py-3 text-label-md text-text-muted">{t("compliance.colStatus")}</th>
                    <th className="px-4 py-3 text-label-md text-text-muted">{t("common.action")}</th>
                  </tr>
                </thead>
                <tbody>
                  {complianceRows.map((row) => (
                    <Fragment key={row.id}>
                      <tr className={cn("border-b border-subtle", expanded === row.id && "bg-navy-50/50")}>
                        <td className="px-4 py-3 font-mono text-caption">{row.id}</td>
                        <td className="px-4 py-3 text-text-primary">{row.property}</td>
                        <td className="px-4 py-3 text-text-secondary">{row.district}</td>
                        <td className="px-4 py-3">{row.portal}</td>
                        <td className="px-4 py-3">
                          {row.tapu === "ok" ? `✓ ${t("compliance.deedOk")}` : `✗ ${t("compliance.deedBad")}`}
                        </td>
                        <td className="px-4 py-3">
                          {row.price === "ok" ? `✓ ${t("compliance.priceOk")}` : `⚠ ${t("compliance.priceWarn")}`}
                        </td>
                        <td className="px-4 py-3">
                          {row.ad === "ok" ? `✓ ${t("compliance.adOk")}` : `⚠ ${t("compliance.adWarn")}`}
                        </td>
                        <td className="px-4 py-3">{pill(row.status, t)}</td>
                        <td className="px-4 py-3">
                          {row.action === "fix" && (
                            <button
                              type="button"
                              className="text-accent-primary focus-ring"
                              onClick={() => setExpanded(expanded === row.id ? null : row.id)}
                            >
                              {t("compliance.actionFix")}
                            </button>
                          )}
                          {row.action === "review" && (
                            <button type="button" className="text-accent-primary focus-ring">
                              {t("compliance.actionReview")}
                            </button>
                          )}
                          {row.action == null && "—"}
                        </td>
                      </tr>
                      {expanded === row.id && row.id === "DXB-0042" && (
                        <tr key={`${row.id}-exp`} className="bg-bg-sunken">
                          <td colSpan={9} className="px-4 py-6">
                            <p className="text-heading-sm text-status-danger">
                              {t("compliance.expandTitle")} — {row.id} — {row.property}
                            </p>
                            <dl className="mt-4 grid gap-3 text-body-sm sm:grid-cols-2">
                              <div>
                                <dt className="text-text-muted">{t("compliance.violType")}</dt>
                                <dd className="font-medium text-text-primary">{t("compliance.violTypeVal")}</dd>
                              </div>
                              <div>
                                <dt className="text-text-muted">{t("compliance.regulation")}</dt>
                                <dd className="font-medium text-text-primary">{t("compliance.regulationVal")}</dd>
                              </div>
                              <div className="sm:col-span-2">
                                <dt className="text-text-muted">{t("compliance.risk")}</dt>
                                <dd className="font-medium text-status-danger">{t("compliance.riskVal")}</dd>
                              </div>
                              <div className="sm:col-span-2">
                                <dt className="text-text-muted">{t("compliance.portalAff")}</dt>
                                <dd className="font-medium text-text-primary">{t("compliance.portalAffVal")}</dd>
                              </div>
                            </dl>
                            <Card variant="ai" className="mt-6 p-4">
                              <p className="text-body-sm text-text-primary">{t("compliance.aiFixIntro")}</p>
                              <p className="text-display-md text-navy-700 mt-3 font-bold">
                                34-K-IV-a-D03-BLOK:4-NO:8
                              </p>
                              <p className="text-body-sm text-text-secondary mt-2">{t("compliance.aiFixMatch")}</p>
                              <div className="mt-4 flex flex-wrap gap-2">
                                <Button variant="ai">✦ {t("compliance.applyFix")}</Button>
                                <Button variant="secondary">{t("compliance.reviewManual")}</Button>
                              </div>
                              <p className="text-caption text-text-muted mt-3">{t("compliance.fixNote")}</p>
                            </Card>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        <div className="lg:col-span-4">
          <Card>
            <h2 className="text-heading-lg text-text-primary mb-2">{t("compliance.regFeed")}</h2>
            <p className="text-caption text-text-muted mb-4">{t("compliance.last90")}</p>
            <ul className="space-y-4">
              {regulationFeed.map((item, i) => (
                <li key={i} className="border-b border-subtle pb-4 text-body-sm last:border-0">
                  <p className="text-caption text-text-muted">
                    {item.date}{" "}
                    <span className="font-medium text-status-danger">
                      — {t(`compliance.${regLevelKey[item.level]}` as "compliance.levelHigh")}
                    </span>
                  </p>
                  <p className="font-medium text-text-primary mt-1">{t(`compliance.${item.titleKey}` as never)}</p>
                  <p className="text-caption text-text-secondary mt-1">{t(`compliance.${item.bodyKey}` as never)}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
