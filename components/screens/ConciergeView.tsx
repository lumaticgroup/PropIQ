"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { useTranslation } from "@/context/LanguageContext";
import { conciergeConvos } from "@/lib/mock/data";
import { formatTryMillionsLabel, formatPercent } from "@/lib/format";
import { cn } from "@/lib/cn";
import { Sparkles } from "lucide-react";

const langSegments = [
  { p: 38, label: "TR" },
  { p: 24, label: "EN" },
  { p: 18, label: "RU" },
  { p: 12, label: "AR" },
  { p: 5, label: "ZH" },
  { p: 3, label: "…" },
];

export function ConciergeView() {
  const { t, lang } = useTranslation();
  const [mobileTab, setMobileTab] = useState<"convos" | "chat" | "ctx">("chat");
  const [takeover, setTakeover] = useState(false);

  const convoList = (
    <Card className="h-full">
      <input
        type="search"
        placeholder={t("concierge.searchPh")}
        className="focus-ring mb-4 w-full rounded-md border border-default px-3 py-2 text-body-sm"
      />
      <div className="mb-4 flex flex-wrap gap-2">
        {["filterAll", "wa", "web", "ig", "email"].map((f) => (
          <button
            key={f}
            type="button"
            className={cn(
              "rounded-full border px-3 py-1 text-caption focus-ring",
              f === "filterAll" ? "border-accent-primary bg-navy-50" : "border-default",
            )}
          >
            {f === "filterAll" ? t("concierge.filterAll") : t(`lookup.source.${f}`)}
          </button>
        ))}
      </div>
      <ul className="max-h-[420px] space-y-2 overflow-y-auto scrollbar-thin">
        {conciergeConvos.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              className={cn(
                "flex w-full flex-col rounded-md border px-3 py-2 text-left text-body-sm focus-ring",
                c.id === "1" ? "border-accent-primary bg-navy-50" : "border-transparent bg-bg-sunken md:hover:border-default",
              )}
            >
              <span className="flex items-center gap-2 font-medium text-text-primary">
                <span className="rounded bg-bg-surface px-1.5 text-caption">{c.initials}</span>
                {c.flag} {c.name}
              </span>
              <span className="text-caption text-text-muted mt-1 truncate">{c.preview}</span>
              <span className="mt-1 flex items-center justify-between text-caption text-text-muted">
                {t(`lookup.source.${c.channelKey}`)} · {(t as (k: string) => string)(`lookup.time.${c.timeKey}`)} · {c.score}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );

  const chat = (
    <Card className="flex h-full min-h-[480px] flex-col p-0">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-default px-4 py-3">
        <div className="text-body-sm">
          <span className="font-semibold text-text-primary">Mikhail Petrov</span> 🇷🇺
          <Badge variant="success" className="ml-2 !normal-case">
            WhatsApp
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="!min-h-9 !px-2 text-caption">
            📞 {t("leads.btnCall")}
          </Button>
          <Button variant="secondary" className="!min-h-9 !px-2 text-caption">
            📅 {t("leads.btnSchedule")}
          </Button>
          <Button variant="secondary" className="!min-h-9 !px-2 text-caption">
            👤 {t("leads.btnAssign")}
          </Button>
        </div>
      </div>
      <div className="border-b border-default bg-bg-sunken px-4 py-2 text-caption text-text-secondary">
        {lang === "en" ? t("concierge.langBar") : t("concierge.langBarTr")}
        <button type="button" className="ml-2 text-accent-primary focus-ring">
          {t("concierge.changeLang")} ▼
        </button>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto bg-bg-sunken px-4 py-4 scrollbar-thin">
        <p className="text-center text-caption text-text-muted">
          {t("concierge.today")}, 09:34
        </p>
        <div className="max-w-[85%] rounded-lg bg-bg-surface px-3 py-2 text-body-sm shadow-sm border border-default">
          {t("concierge.buyerMsg1")}
        </div>
        <div className="ml-auto max-w-[85%] rounded-lg bg-navy-700 px-3 py-2 text-body-sm text-text-inverted shadow-sm">
          {t("concierge.msgAi1")}
          <span className="mt-1 block text-right text-accent-ai">✦</span>
        </div>
        <div className="max-w-[85%] rounded-lg bg-bg-surface px-3 py-2 text-body-sm shadow-sm border border-default">
          {t("concierge.buyerMsg2")}
        </div>
        <div className="ml-auto max-w-[85%] rounded-lg bg-navy-700 px-3 py-2 text-body-sm text-text-inverted shadow-sm">
          <p>{t("concierge.msgAi2a")}</p>
          <div className="mt-2 space-y-2 rounded-md bg-navy-700/80 p-2 border border-white/10">
            <p className="text-caption">
              🏠 Dubai Marina · 3BR · {formatTryMillionsLabel(4.2, lang)} · {t("valuation.seaView")} · {t("valuation.readyMove")} ·{" "}
              {formatPercent(5.1, lang)}
            </p>
            <p className="text-caption">
              🏠 Downtown · Boulevard view · 4BR · {formatTryMillionsLabel(6.8, lang)} · {t("valuation.readyMove")} ·{" "}
              {formatPercent(4.8, lang)}
            </p>
          </div>
          <p className="mt-2">{t("concierge.msgAi2b")}</p>
          <span className="mt-1 block text-right text-accent-ai">✦</span>
        </div>
        <div className="max-w-[85%] rounded-lg bg-bg-surface px-3 py-2 text-body-sm shadow-sm border border-default">
          {t("concierge.buyerMsg3")}
        </div>
        <div className="ml-auto max-w-[85%] rounded-lg bg-navy-700 px-3 py-2 text-body-sm text-text-inverted shadow-sm">
          {t("concierge.msgAi3")}
          <span className="mt-1 block text-right text-accent-ai">✦</span>
        </div>
        <p className="text-caption text-text-muted italic">{t("concierge.typing")}</p>
      </div>
      <div className="border-t border-default bg-bg-surface px-4 py-3">
        <div className="flex items-center justify-between gap-4 text-body-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={takeover} onChange={(e) => setTakeover(e.target.checked)} />
            {t("concierge.takeover")}
          </label>
          <span className="text-status-success">{t("concierge.aiHandling")}</span>
        </div>
        <input
          type="text"
          placeholder={t("concierge.inputPh")}
          className="focus-ring mt-2 w-full rounded-md border border-default px-3 py-2 text-body-sm"
        />
      </div>
    </Card>
  );

  const ctx = (
    <div className="space-y-4">
      <Card>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-caption text-text-muted">{t("concierge.leadScore")}</p>
            <p className="text-display-lg text-status-success">95</p>
            <p className="text-caption text-text-muted mt-1">{t("concierge.topLeads")}</p>
          </div>
          <div className="h-14 w-14 rounded-full border-4 border-status-success border-opacity-40" aria-hidden />
        </div>
      </Card>
      <Card>
        <h3 className="text-heading-sm text-text-primary mb-3">{t("concierge.buyerSnapshot")}</h3>
        <dl className="space-y-2 text-body-sm">
          <div className="flex justify-between">
            <dt className="text-text-muted">{t("concierge.budget")}</dt>
            <dd className="font-medium">{formatTryMillionsLabel(4.2, lang)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-text-muted">{t("concierge.type")}</dt>
            <dd className="font-medium">{t("leads.apartment")}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-text-muted">{t("concierge.timeline")}</dt>
            <dd className="font-medium">{t("concierge.immediate")}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-text-muted">{t("concierge.language")}</dt>
            <dd className="font-medium">{t("leads.langs")}</dd>
          </div>
        </dl>
      </Card>
      <Card variant="ai">
        <h3 className="text-heading-sm text-gold-600">✦ {t("concierge.aiSumTitle")}</h3>
        <p className="text-body-sm text-text-secondary mt-2">{t("concierge.aiSumBody")}</p>
      </Card>
      <Card>
        <h3 className="text-heading-sm text-text-primary mb-2">{t("concierge.matchedListings")}</h3>
        <ul className="space-y-2 text-body-sm text-text-secondary">
          <li>Dubai Marina · 3BR · {formatTryMillionsLabel(4.2, lang)} · %97 {lang === "tr" ? "Eşleşme" : "Match"}</li>
          <li>Palm Jumeirah · Garden home · 4BR · {formatTryMillionsLabel(12.4, lang)} · %91 Match</li>
          <li>Business Bay · 3BR · {formatTryMillionsLabel(3.6, lang)} · %88 Match</li>
        </ul>
        <p className="mt-4 text-body-sm text-text-primary">
          {t("concierge.sentiment")} — 87%
        </p>
        <div className="mt-4 flex flex-col gap-2">
          <Button variant="secondary">{t("concierge.quickAssign")}</Button>
          <Button variant="secondary">{t("concierge.quickBook")}</Button>
          <Button variant="ai" leftIcon={<Sparkles className="h-4 w-4" />}>
            ✦ {t("concierge.quickDeck")}
          </Button>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-display-md text-text-primary">
          <span className="text-accent-ai">✦</span> {t("concierge.title")}
        </h1>
        <p className="text-body-sm text-text-secondary mt-2 max-w-3xl">{t("concierge.subtitle")}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { title: "waTitle", a: "waActive", b: "waAvg" },
          { title: "webTitle", a: "webActive", b: "webAvg" },
          { title: "igTitle", a: "igActive", b: "igQueue" },
          { title: "emailTitle", a: "emailQueue", b: "emailAvg" },
        ].map((c) => (
          <Card key={c.title} className="py-4">
            <p className="text-heading-sm text-text-primary">{t(`concierge.${c.title}` as "concierge.waTitle")}</p>
            <p className="text-body-sm text-text-secondary mt-2">{t(`concierge.${c.a}` as "concierge.waActive")}</p>
            <p className="text-caption text-text-muted mt-1">{t(`concierge.${c.b}` as "concierge.waAvg")}</p>
          </Card>
        ))}
      </div>

      <div>
        <p className="text-body-sm text-text-secondary mb-2">{t("concierge.langsTitle")}</p>
        <div className="flex h-3 w-full overflow-hidden rounded-full bg-bg-sunken">
          {langSegments.map((s, i) => (
            <div
              key={i}
              style={{ width: `${s.p}%` }}
              className={cn(
                "first:rounded-l-full last:rounded-r-full",
                i === 0 && "bg-navy-700",
                i === 1 && "bg-status-info",
                i === 2 && "bg-status-danger",
                i === 3 && "bg-status-warning",
                i === 4 && "bg-status-success",
                i === 5 && "bg-text-muted",
              )}
              title={s.label}
            />
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-2 text-caption text-text-muted">
          {langSegments.map((s) => (
            <span key={s.label}>
              {s.label} {s.p}%
            </span>
          ))}
        </div>
      </div>

      <div className="lg:hidden">
        <SegmentedControl
          options={[
            { value: "convos", label: t("concierge.mobileTabConvos") },
            { value: "chat", label: t("concierge.mobileTabChat") },
            { value: "ctx", label: t("concierge.mobileTabCtx") },
          ]}
          value={mobileTab}
          onChange={(v) => setMobileTab(v)}
        />
        <div className="mt-4">{mobileTab === "convos" && convoList}</div>
        <div className="mt-4">{mobileTab === "chat" && chat}</div>
        <div className="mt-4">{mobileTab === "ctx" && ctx}</div>
      </div>

      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-4">
        <div className="lg:col-span-3">{convoList}</div>
        <div className="lg:col-span-5">{chat}</div>
        <div className="lg:col-span-4">{ctx}</div>
      </div>
    </div>
  );
}
