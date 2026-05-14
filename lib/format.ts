export type Lang = "en" | "tr";

/** All listing and budget figures in the demo are AED (UAE). Turkish UI uses Turkish numerals; currency stays AED. */

function formatAed(amount: number, lang: Lang, fractionDigits = 0): string {
  return new Intl.NumberFormat(lang === "tr" ? "tr-TR" : "en-AE", {
    style: "currency",
    currency: "AED",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount);
}

/** Full amount in AED (kept name for minimal import churn). */
export function formatCurrencyTry(amount: number, lang: Lang): string {
  return formatAed(Math.round(amount), lang, 0);
}

/** Pipeline-style compact millions in AED. */
export function formatCompactMillionTry(valueMAed: number, lang: Lang): string {
  const s = valueMAed.toLocaleString(lang === "tr" ? "tr-TR" : "en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  return lang === "tr" ? `${s}M AED` : `AED ${s}M`;
}

/** Budget line e.g. `AED 4.2M`. */
export function formatTryMillionsLabel(amountMAed: number, lang: Lang): string {
  const s = amountMAed.toLocaleString(lang === "tr" ? "tr-TR" : "en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  return `AED ${s}M`;
}

/** AED per m² */
export function formatPerM2(aedPerM2: number, lang: Lang): string {
  const rounded = Math.round(aedPerM2);
  return `${formatAed(rounded, lang, 0)}/m²`;
}

export function formatPercent(value: number, lang: Lang, fractionDigits = 1): string {
  const n = value.toLocaleString(lang === "tr" ? "tr-TR" : "en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
  return `${n}%`;
}

export function formatDateLong(date: Date, lang: Lang): string {
  if (lang === "tr") {
    return new Intl.DateTimeFormat("tr-TR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  }
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatDateShort(date: Date, lang: Lang): string {
  if (lang === "tr") {
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear();
    return `${d}.${m}.${y}`;
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatMinutes(value: number, lang: Lang): string {
  if (lang === "tr") {
    return `${value.toLocaleString("tr-TR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} dk`;
  }
  return `${value.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} min`;
}
