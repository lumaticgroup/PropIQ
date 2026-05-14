"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { useTranslation } from "@/context/LanguageContext";
import { formatCurrencyTry, formatPerM2, formatPercent } from "@/lib/format";
import { listingAmenities } from "@/lib/mock/data";
import { cn } from "@/lib/cn";

const steps = ["step1", "step2", "step3", "step4"] as const;

const amenityKey: Record<string, { en: string; tr: string }> = {
  pool: { en: "Pool", tr: "Havuz" },
  gym: { en: "Gym", tr: "Spor Salonu" },
  parking: { en: "Indoor Parking", tr: "Kapalı Otopark" },
  sea: { en: "Sea View", tr: "Deniz Manzarası" },
  balcony: { en: "Balcony", tr: "Balkon" },
  porter: { en: "Porter", tr: "Kapıcı" },
  smart: { en: "Smart Home", tr: "Akıllı Ev" },
  pets: { en: "Pet Friendly", tr: "Evcil Hayvan Dostu" },
  bbq: { en: "BBQ Area", tr: "Mangal Alanı" },
  sauna: { en: "Sauna", tr: "Sauna" },
  playground: { en: "Kids Playground", tr: "Çocuk Oyun Alanı" },
  heat: { en: "Central Heating", tr: "Isıtma Sistemi" },
};

export function ListingBuilderView() {
  const { t, lang } = useTranslation();
  const searchParams = useSearchParams();
  const section = searchParams.get("section") ?? "builder";
  const [step, setStep] = useState(0);
  const [previewLang, setPreviewLang] = useState<"en" | "tr">("tr");
  const price = 3_200_000;
  const gross = 165;
  const perM2 = useMemo(() => Math.round(price / gross), [price, gross]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-display-md text-text-primary">
          <span className="text-accent-ai">✦</span> {t("listingBuilder.title")}
        </h1>
        <p className="text-body-sm text-text-secondary mt-2 max-w-3xl">{t("listingBuilder.subtitle")}</p>
        {section === "my-listings" && (
          <p className="mt-4 rounded-md border border-default bg-bg-sunken px-4 py-3 text-body-sm text-text-secondary">
            {t("listingBuilder.bannerMyListings")}
          </p>
        )}
        {section === "portal-sync" && (
          <p className="mt-4 rounded-md border border-default bg-bg-sunken px-4 py-3 text-body-sm text-text-secondary">
            {t("listingBuilder.bannerPortal")}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-2 border-b border-default pb-4">
        {steps.map((s, i) => (
          <button
            key={s}
            type="button"
            onClick={() => setStep(i)}
            className={cn(
              "rounded-md border px-3 py-2 text-body-sm font-medium focus-ring",
              step === i ? "border-accent-primary bg-navy-50 text-accent-primary" : "border-default text-text-secondary",
            )}
          >
            {i + 1} {t(`listingBuilder.${s}`)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6">
          <Card>
            <h2 className="text-heading-lg text-text-primary mb-6">{t("listingBuilder.sectionDetails")}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="text-body-sm">
                <span className="text-text-secondary">{t("listingBuilder.propertyType")}</span>
                <select className="mt-1 w-full rounded-md border border-default bg-bg-surface px-3 py-2 focus-ring">
                  <option>{t("listingBuilder.optApartment")}</option>
                  <option>{t("listingBuilder.optVilla")}</option>
                  <option>{t("listingBuilder.optDetached")}</option>
                  <option>{t("listingBuilder.optPenthouse")}</option>
                  <option>{t("listingBuilder.optStudio")}</option>
                  <option>{t("listingBuilder.optPlot")}</option>
                </select>
              </label>
              <label className="text-body-sm">
                <span className="text-text-secondary">{t("listingBuilder.status")}</span>
                <select className="mt-1 w-full rounded-md border border-default bg-bg-surface px-3 py-2 focus-ring">
                  <option>{t("listingBuilder.stReady")}</option>
                  <option>{t("listingBuilder.stOffPlan")}</option>
                  <option>{t("listingBuilder.stConstruction")}</option>
                </select>
              </label>
              <label className="text-body-sm sm:col-span-2">
                <span className="text-text-secondary">{t("listingBuilder.developer")}</span>
                <input type="text" defaultValue="Emaar Properties" className="mt-1 w-full rounded-md border border-default px-3 py-2 focus-ring" />
              </label>
              <label className="text-body-sm sm:col-span-2">
                <span className="text-text-secondary">{t("listingBuilder.projectName")}</span>
                <input type="text" defaultValue="Marina Shores Residences" className="mt-1 w-full rounded-md border border-default px-3 py-2 focus-ring" />
              </label>
              <label className="text-body-sm sm:col-span-2">
                <span className="text-text-secondary">{t("listingBuilder.district")}</span>
                <input type="text" defaultValue="Dubai Marina, UAE" className="mt-1 w-full rounded-md border border-default px-3 py-2 focus-ring" />
              </label>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <label className="text-body-sm">
                <span className="text-text-secondary">{t("listingBuilder.bedrooms")}</span>
                <input type="text" defaultValue="3+1" className="mt-1 w-full rounded-md border border-default px-3 py-2 focus-ring" />
              </label>
              <label className="text-body-sm">
                <span className="text-text-secondary">{t("listingBuilder.bathrooms")}</span>
                <input type="text" defaultValue="2" className="mt-1 w-full rounded-md border border-default px-3 py-2 focus-ring" />
              </label>
              <label className="text-body-sm">
                <span className="text-text-secondary">{t("listingBuilder.floor")}</span>
                <input type="text" defaultValue="12" className="mt-1 w-full rounded-md border border-default px-3 py-2 focus-ring" />
              </label>
              <label className="text-body-sm">
                <span className="text-text-secondary">{t("listingBuilder.totalFloors")}</span>
                <input type="text" defaultValue="28" className="mt-1 w-full rounded-md border border-default px-3 py-2 focus-ring" />
              </label>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <label className="text-body-sm">
                <span className="text-text-secondary">{t("listingBuilder.grossM2")}</span>
                <input type="number" defaultValue={165} className="mt-1 w-full rounded-md border border-default px-3 py-2 focus-ring" />
              </label>
              <label className="text-body-sm">
                <span className="text-text-secondary">{t("listingBuilder.netM2")}</span>
                <input type="number" defaultValue={142} className="mt-1 w-full rounded-md border border-default px-3 py-2 focus-ring" />
              </label>
            </div>
            <label className="mt-4 block text-body-sm">
              <span className="text-text-secondary">{t("listingBuilder.askingPrice")}</span>
              <input
                type="text"
                defaultValue={lang === "tr" ? "3.200.000" : "3200000"}
                className="mt-1 w-full rounded-md border border-default px-3 py-2 focus-ring"
              />
              <p className="text-caption text-text-muted mt-1">
                {t("listingBuilder.perM2")}: {formatPerM2(perM2, lang)}
              </p>
            </label>
            <label className="mt-4 block text-body-sm">
              <span className="text-text-secondary">{t("listingBuilder.aidat")}</span>
              <input type="text" defaultValue={lang === "tr" ? "850 AED/ay" : "850"} className="mt-1 w-full rounded-md border border-default px-3 py-2 focus-ring" />
            </label>
            <label className="mt-4 flex items-center gap-2 text-body-sm">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-default" />
              <span>{t("listingBuilder.dask")}</span>
            </label>
            <div className="mt-4 flex flex-wrap items-end gap-2">
              <label className="min-w-[200px] flex-1 text-body-sm">
                <span className="text-text-secondary">{t("listingBuilder.tapuNo")}</span>
                <input type="text" placeholder={t("listingBuilder.tapuPlaceholder")} className="mt-1 w-full rounded-md border border-default px-3 py-2 focus-ring" />
              </label>
              <Link
                href="https://dubailand.gov.ae"
                target="_blank"
                rel="noopener noreferrer"
                className="mb-1 text-body-sm text-accent-primary underline-offset-2 focus-ring hover:underline"
              >
                {t("listingBuilder.lookup")} ↗
              </Link>
            </div>
            <div className="mt-6 rounded-md border border-dashed border-default bg-bg-sunken p-8 text-center text-body-sm text-text-muted">
              {t("listingBuilder.photos")}
            </div>
            <div className="mt-6">
              <p className="text-heading-sm text-text-primary mb-2">{t("listingBuilder.amenities")}</p>
              <div className="flex flex-wrap gap-2">
                {listingAmenities.selected.map((k) => (
                  <span key={k} className="rounded-full border border-accent-primary bg-accent-ai-bg px-3 py-1 text-caption text-accent-primary">
                    {amenityKey[k][lang]}
                  </span>
                ))}
                {listingAmenities.unselected.map((k) => (
                  <span key={k} className="rounded-full border border-default bg-bg-surface px-3 py-1 text-caption text-text-muted">
                    {amenityKey[k][lang]}
                  </span>
                ))}
              </div>
            </div>
            <label className="mt-6 block text-body-sm">
              <span className="text-text-secondary">{t("listingBuilder.keyFeatures")}</span>
              <textarea
                placeholder={t("listingBuilder.featuresPlaceholder")}
                rows={3}
                className="mt-1 w-full rounded-md border border-default px-3 py-2 focus-ring"
              />
            </label>
            <div className="mt-6 space-y-2">
              <Button variant="ai" leftIcon={<Sparkles className="h-4 w-4 text-accent-ai" />}>
                ✦ {t("listingBuilder.generate")} →
              </Button>
              <p className="text-caption text-text-muted max-w-xl">{t("listingBuilder.generateNote")}</p>
            </div>
          </Card>
        </div>
        <div className="lg:col-span-5">
          <div className="sticky top-24 space-y-4">
            <SegmentedControl
              options={[
                { value: "tr", label: t("listingBuilder.langTr") },
                { value: "en", label: t("listingBuilder.langEn") },
              ]}
              value={previewLang}
              onChange={setPreviewLang}
            />
            <Card>
              <div className="h-[180px] rounded-md bg-bg-sunken flex items-center justify-center text-body-sm text-text-muted">
                3+1 · 165 m² {lang === "tr" ? "brüt" : "gross"}
              </div>
              <h3 className="text-heading-md text-text-primary mt-4">
                {previewLang === "tr"
                  ? "Muhteşem 3+1 | Tam Deniz Manzarası | Dubai Marina | Marina Shores"
                  : "Stunning 3+1 | Full Sea View | Dubai Marina | Marina Shores"}
              </h3>
              <p className="text-display-md text-accent-primary mt-2">
                {formatCurrencyTry(price, previewLang)}
              </p>
              <p className="text-caption text-text-muted">{formatPerM2(perM2, previewLang)}</p>
              <div className="mt-4 space-y-2 text-body-sm text-text-secondary">
                {previewLang === "tr" ? (
                  <>
                    <p>Dubai Marina&apos;da eşsiz konum, geniş balkon ve panoramik deniz manzarası.</p>
                    <p>Açık mutfak, yüzme havuzu ve spor salonu, kapalı otopark.</p>
                  </>
                ) : (
                  <>
                    <p>Prime Dubai Marina address with a wide balcony and panoramic sea views.</p>
                    <p>Open kitchen, pool and gym, covered parking.</p>
                  </>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Dubai Marina", "Emaar", previewLang === "tr" ? "Anahtar Teslim" : "Ready to Move", previewLang === "tr" ? "Deniz Manzarası" : "Sea View"].map(
                  (tag) => (
                    <span key={tag} className="rounded-md bg-bg-sunken px-2 py-1 text-caption text-text-secondary">
                      {tag}
                    </span>
                  ),
                )}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2 border-t border-default pt-4 text-caption">
                <div>
                  <p className="text-text-muted">{t("listingBuilder.estRent")}</p>
                  <p className="font-medium text-text-primary">{formatCurrencyTry(220_000, lang)}</p>
                </div>
                <div>
                  <p className="text-text-muted">{t("listingBuilder.grossYield")}</p>
                  <p className="font-medium text-text-primary">{formatPercent(4.8, lang)}</p>
                </div>
                <div>
                  <p className="text-text-muted">{t("listingBuilder.monthlyAidat")}</p>
                  <p className="font-medium text-text-primary">
                    {lang === "tr" ? `${formatCurrencyTry(850, lang)}/ay` : `${formatCurrencyTry(850, lang)}/mo`}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-md bg-status-success-bg px-2 py-1 text-caption text-status-success">
                  ✓ {t("listingBuilder.badgeTkgm")}
                </span>
                <span className="rounded-md bg-status-success-bg px-2 py-1 text-caption text-status-success">
                  ✓ {t("listingBuilder.badgePrice")}
                </span>
                <span className="rounded-md bg-accent-ai-bg px-2 py-1 text-caption text-gold-600">
                  🏅 {t("listingBuilder.badgeCitizen")}
                </span>
              </div>
            </Card>
            <Card>
              <h3 className="text-heading-sm text-text-primary mb-3">{t("listingBuilder.syncTitle")}</h3>
              <ul className="space-y-2 text-body-sm">
                <li className="flex gap-2">
                  <input type="checkbox" defaultChecked readOnly className="mt-1" /> Bayut — 67
                </li>
                <li className="flex gap-2">
                  <input type="checkbox" defaultChecked readOnly className="mt-1" /> Property Finder — 64
                </li>
                <li className="flex gap-2">
                  <input type="checkbox" defaultChecked readOnly className="mt-1" /> Dubizzle — 58
                </li>
                <li className="flex gap-2">
                  <input type="checkbox" defaultChecked readOnly className="mt-1" /> Agency site — propiq-demo.ae
                </li>
              </ul>
              <Button variant="ai" className="mt-4 w-full">
                ✦ {t("listingBuilder.syncBtn")}
              </Button>
              <p className="text-caption text-text-muted mt-2">{t("listingBuilder.syncNote")}</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
