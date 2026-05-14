/** Typed mock data — Dubai / UAE listings; global buyers; Turkish locale only affects UI language. */

export type LeadTier = "hot" | "warm" | "cold";

export type DashboardFeedRow = {
  score: number;
  tier: LeadTier;
  buyer: string;
  flag: string;
  nationalityKey: string;
  budgetM: number;
  interest: string;
  sourceKey: string;
  timeKey: string;
};

export const dashboardFeed: DashboardFeedRow[] = [
  { score: 95, tier: "hot", buyer: "Mikhail Petrov", flag: "🇷🇺", nationalityKey: "ru", budgetM: 4.2, interest: "Dubai Marina 2BR", sourceKey: "instagram", timeKey: "4m" },
  { score: 88, tier: "hot", buyer: "Priya Nambiar", flag: "🇮🇳", nationalityKey: "in", budgetM: 2.1, interest: "Dubai Hills off-plan", sourceKey: "bayut", timeKey: "11m" },
  { score: 74, tier: "warm", buyer: "James Thornton", flag: "🇬🇧", nationalityKey: "uk", budgetM: 8.5, interest: "Palm Jumeirah villa", sourceKey: "referral", timeKey: "23m" },
  { score: 72, tier: "warm", buyer: "Liu Wei", flag: "🇨🇳", nationalityKey: "cn", budgetM: 3.6, interest: "Business Bay tower", sourceKey: "propertyfinder", timeKey: "1h" },
  { score: 61, tier: "warm", buyer: "Fatma Al Rashidi", flag: "🇦🇪", nationalityKey: "ae", budgetM: 1.9, interest: "JVC 1BR", sourceKey: "whatsapp", timeKey: "2h" },
  { score: 44, tier: "cold", buyer: "Thomas Müller", flag: "🇩🇪", nationalityKey: "de", budgetM: 5.5, interest: "Downtown penthouse", sourceKey: "website", timeKey: "3h" },
];

export type PipelineColumn = {
  id: string;
  labelKey: string;
  count: number;
  valueM: number;
  cards: { title: string; subM: number }[];
};

export const dashboardPipeline: PipelineColumn[] = [
  { id: "new", labelKey: "pipelineNew", count: 84, valueM: 62, cards: [{ title: "DXB-0192", subM: 4.2 }, { title: "DXB-0201", subM: 2.1 }] },
  { id: "view", labelKey: "pipelineViewing", count: 52, valueM: 44, cards: [{ title: "DXB-0188", subM: 3.1 }, { title: "DXB-0199", subM: 3.9 }] },
  { id: "offer", labelKey: "pipelineOffer", count: 31, valueM: 38, cards: [{ title: "DXB-0171", subM: 5.8 }, { title: "DXB-0174", subM: 2.7 }] },
  { id: "agree", labelKey: "pipelineAgreement", count: 12, valueM: 21, cards: [{ title: "DXB-0155", subM: 6.1 }, { title: "DXB-0160", subM: 1.8 }] },
  { id: "tapu", labelKey: "pipelineTitle", count: 3, valueM: 12, cards: [{ title: "DXB-0139", subM: 2.2 }, { title: "DXB-0142", subM: 3.4 }] },
];

export const brokerLeaders = [
  { name: "Omar Al-Farsi", volM: 14.2, deals: 4, close: 100 },
  { name: "Selin Kaya", volM: 9.8, deals: 3, close: 69 },
  { name: "James Okonkwo", volM: 7.4, deals: 3, close: 52 },
  { name: "Raj Patel", volM: 5.1, deals: 2, close: 36 },
  { name: "Elena Volkov", volM: 3.6, deals: 1, close: 25 },
];

export const portalStatus = [
  { name: "Bayut", ok: true, listings: 67, minAgo: 4 },
  { name: "Property Finder", ok: false, listings: 64, pending: 3, minAgo: 8 },
  { name: "Dubizzle", ok: true, listings: 58, minAgo: 8 },
];

export type LeadRow = {
  id: string;
  score: number;
  tier: LeadTier;
  buyer: string;
  flag: string;
  nationalityKey: string;
  budgetM: number;
  area: string;
  sourceKey: string;
  brokerKey: string | null;
  lastKey: string;
  statusKey: string;
};

export const leadRows: LeadRow[] = [
  { id: "1", score: 95, tier: "hot", buyer: "Mikhail Petrov", flag: "🇷🇺", nationalityKey: "ru", budgetM: 4.2, area: "Dubai Marina", sourceKey: "instagram", brokerKey: "selin", lastKey: "4m", statusKey: "newLead" },
  { id: "2", score: 88, tier: "hot", buyer: "Priya Nambiar", flag: "🇮🇳", nationalityKey: "in", budgetM: 2.1, area: "Dubai Hills", sourceKey: "bayut", brokerKey: "omar", lastKey: "11m", statusKey: "viewing" },
  { id: "3", score: 82, tier: "hot", buyer: "Yuki Tanaka", flag: "🇯🇵", nationalityKey: "jp", budgetM: 9.2, area: "Palm Jumeirah", sourceKey: "referral", brokerKey: "selin", lastKey: "34m", statusKey: "active" },
  { id: "4", score: 74, tier: "warm", buyer: "James Thornton", flag: "🇬🇧", nationalityKey: "uk", budgetM: 8.5, area: "Downtown", sourceKey: "referral", brokerKey: null, lastKey: "23m", statusKey: "followUp" },
  { id: "5", score: 72, tier: "warm", buyer: "Liu Wei", flag: "🇨🇳", nationalityKey: "cn", budgetM: 3.6, area: "Business Bay", sourceKey: "propertyfinder", brokerKey: "james", lastKey: "1h", statusKey: "active" },
  { id: "6", score: 68, tier: "warm", buyer: "Fatma Al Rashidi", flag: "🇦🇪", nationalityKey: "ae", budgetM: 1.9, area: "JVC", sourceKey: "whatsapp", brokerKey: "raj", lastKey: "2h", statusKey: "contacted" },
  { id: "7", score: 61, tier: "warm", buyer: "Mehmet Yılmaz", flag: "🇹🇷", nationalityKey: "tr", budgetM: 2.8, area: "JBR", sourceKey: "whatsapp", brokerKey: "selin", lastKey: "2h", statusKey: "active" },
  { id: "8", score: 55, tier: "cold", buyer: "Thomas Müller", flag: "🇩🇪", nationalityKey: "de", budgetM: 5.5, area: "Downtown", sourceKey: "website", brokerKey: null, lastKey: "3h", statusKey: "cold" },
  { id: "9", score: 48, tier: "cold", buyer: "Luca Ferretti", flag: "🇮🇹", nationalityKey: "it", budgetM: 3.2, area: "Bluewaters", sourceKey: "google", brokerKey: null, lastKey: "5h", statusKey: "cold" },
  { id: "10", score: 44, tier: "cold", buyer: "Amara Okafor", flag: "🇳🇬", nationalityKey: "ng", budgetM: 4.1, area: "Meydan", sourceKey: "meta", brokerKey: null, lastKey: "yesterday", statusKey: "newLead" },
];

export const brokerShort: Record<string, string> = {
  omar: "Omar A.",
  selin: "Selin K.",
  james: "James O.",
  raj: "Raj P.",
  elena: "Elena V.",
};

export const marketPulseCommunities = [
  { id: "marina", price: 28_800, mom: 6.4, demand: 98, tone: "hot" as const },
  { id: "downtown", price: 31_200, mom: 5.1, demand: 94, tone: "hot" as const },
  { id: "jvc", price: 10_100, mom: 8.2, demand: 91, tone: "hot" as const },
  { id: "businessbay", price: 22_400, mom: 3.7, demand: 86, tone: "up" as const },
  { id: "palm", price: 46_500, mom: 4.3, demand: 88, tone: "up" as const },
];

export type MarketPulsePoint = {
  day: string;
  marina: number;
  downtown: number;
  jvc: number;
  palm: number;
  businessbay: number;
};

/** 30-day synthetic index: AED per m² */
export function buildMarketPulseSeries(): MarketPulsePoint[] {
  const out: MarketPulsePoint[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(2026, 4, 5);
    d.setDate(d.getDate() - i);
    const day = `${d.getMonth() + 1}/${d.getDate()}`;
    const t = (29 - i) / 29;
    out.push({
      day,
      marina: Math.round(26200 + t * 2600 + (i % 3) * 120),
      downtown: Math.round(28500 + t * 2800 + (i % 4) * 110),
      jvc: Math.round(9200 + t * 900 + (i % 5) * 80),
      palm: Math.round(43800 + t * 2800 + (i % 3) * 200),
      businessbay: Math.round(20600 + t * 1800 + (i % 4) * 95),
    });
  }
  return out;
}

export type ComplianceRow = {
  id: string;
  property: string;
  district: string;
  portal: string;
  tapu: "ok" | "bad";
  price: "ok" | "warn";
  ad: "ok" | "warn";
  status: "ok" | "one" | "crit";
  action?: "fix" | "review";
};

export const complianceRows: ComplianceRow[] = [
  { id: "DXB-0041", property: "Marina Gate 2 · 1408", district: "Dubai Marina", portal: "Bayut", tapu: "ok", price: "ok", ad: "ok", status: "ok" },
  { id: "DXB-0042", property: "JVC Studio · Mira 4B", district: "JVC", portal: "Property Finder", tapu: "bad", price: "ok", ad: "ok", status: "crit", action: "fix" },
  { id: "DXB-0043", property: "Burj Royale 2BR", district: "Downtown", portal: "Dubizzle", tapu: "ok", price: "warn", ad: "ok", status: "one", action: "review" },
  { id: "DXB-0044", property: "Springs 9 Villa", district: "Springs", portal: "Bayut", tapu: "ok", price: "ok", ad: "warn", status: "one", action: "review" },
  { id: "DXB-0045", property: "Creek Edge 3BR", district: "Dubai Creek", portal: "Bayut", tapu: "ok", price: "ok", ad: "ok", status: "ok" },
  { id: "DXB-0046", property: "Executive Tower L · 1207", district: "Business Bay", portal: "Property Finder", tapu: "ok", price: "ok", ad: "ok", status: "ok" },
  { id: "DXB-0047", property: "FIVE Palm suite", district: "Palm Jumeirah", portal: "Dubizzle", tapu: "ok", price: "warn", ad: "ok", status: "one" },
  { id: "DXB-0048", property: "Town Square 2BR", district: "Town Square", portal: "Bayut", tapu: "ok", price: "ok", ad: "ok", status: "ok" },
  { id: "DXB-0049", property: "Damac Hills 3BR", district: "DAMAC Hills", portal: "Property Finder", tapu: "bad", price: "ok", ad: "ok", status: "crit" },
  { id: "DXB-0050", property: "Boulevard Point penthouse", district: "Downtown", portal: "Bayut", tapu: "ok", price: "ok", ad: "ok", status: "ok" },
  { id: "DXB-0051", property: "Remraam 3BR", district: "Remraam", portal: "Dubizzle", tapu: "ok", price: "ok", ad: "warn", status: "one" },
  { id: "DXB-0052", property: "Sunrise Bay 2BR", district: "Emaar Beachfront", portal: "Bayut", tapu: "ok", price: "ok", ad: "ok", status: "ok" },
  { id: "DXB-0053", property: "Dubai Hills Park 3BR", district: "Dubai Hills", portal: "Property Finder", tapu: "ok", price: "ok", ad: "ok", status: "ok" },
  { id: "DXB-0054", property: "Azizi Aliyah loft", district: "Jebel Ali", portal: "Dubizzle", tapu: "ok", price: "warn", ad: "ok", status: "one" },
];

export const regulationFeed = [
  { date: "2026-04-22", level: "high", titleKey: "reg1Title", bodyKey: "reg1Body" },
  { date: "2026-04-08", level: "medium", titleKey: "reg2Title", bodyKey: "reg2Body" },
  { date: "2026-03-31", level: "high", titleKey: "reg3Title", bodyKey: "reg3Body" },
  { date: "2026-03-15", level: "low", titleKey: "reg4Title", bodyKey: "reg4Body" },
  { date: "2026-02-28", level: "medium", titleKey: "reg5Title", bodyKey: "reg5Body" },
];

export type ConciergeConvo = {
  id: string;
  initials: string;
  name: string;
  flag: string;
  channelKey: string;
  preview: string;
  timeKey: string;
  score: number;
};

export const conciergeConvos: ConciergeConvo[] = [
  { id: "1", initials: "MP", name: "Mikhail Petrov", flag: "🇷🇺", channelKey: "wa", preview: "Dubai Marina viewing…", timeKey: "4m", score: 95 },
  { id: "2", initials: "PN", name: "Priya Nambiar", flag: "🇮🇳", channelKey: "wa", preview: "Payment plan question…", timeKey: "12m", score: 88 },
  { id: "3", initials: "LW", name: "Liu Wei", flag: "🇨🇳", channelKey: "web", preview: "Business Bay inventory…", timeKey: "1h", score: 72 },
  { id: "4", initials: "JT", name: "James Thornton", flag: "🇬🇧", channelKey: "email", preview: "Palm villa info…", timeKey: "1h", score: 74 },
  { id: "5", initials: "FA", name: "Fatma Al Rashidi", flag: "🇦🇪", channelKey: "wa", preview: "السلام عليكم، أريد...", timeKey: "2h", score: 68 },
  { id: "6", initials: "YT", name: "Yuki Tanaka", flag: "🇯🇵", channelKey: "ig", preview: "Hello, I'm interested in…", timeKey: "3h", score: 82 },
  { id: "7", initials: "AO", name: "Amara Okafor", flag: "🇳🇬", channelKey: "web", preview: "Best areas for 2BR…", timeKey: "5h", score: 44 },
  { id: "8", initials: "MY", name: "Mehmet Yılmaz", flag: "🇹🇷", channelKey: "wa", preview: "Marina fiyatları nedir?", timeKey: "6h", score: 61 },
];

export const valuationComparables = [
  { date: "2026-04-28", unit: "8/4", mSq: 101, floor: 8, price: 2_520_000, type: "2BR", status: "ready" },
  { date: "2026-04-14", unit: "6/2", mSq: 94, floor: 6, price: 2_310_000, type: "2BR", status: "ready" },
  { date: "2026-03-31", unit: "10/1", mSq: 102, floor: 10, price: 2_640_000, type: "2BR", status: "ready" },
  { date: "2026-03-18", unit: "4/3", mSq: 96, floor: 4, price: 2_260_000, type: "2BR", status: "ready" },
  { date: "2026-02-22", unit: "7/1", mSq: 99, floor: 7, price: 2_480_000, type: "2BR", status: "ready" },
];

export const listingAmenities = {
  selected: ["pool", "gym", "parking", "sea", "balcony"] as const,
  unselected: ["porter", "smart", "pets", "bbq", "sauna", "playground", "heat"] as const,
};
