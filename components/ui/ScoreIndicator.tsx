import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";
import { useTranslation } from "@/context/LanguageContext";

export type ScoreTone = "hot" | "warm" | "cold";

function toneFromScore(score: number): ScoreTone {
  if (score >= 80) return "hot";
  if (score >= 60) return "warm";
  return "cold";
}

const dotColor: Record<ScoreTone, string> = {
  hot: "bg-[var(--green-500)]",
  warm: "bg-[var(--amber-500)]",
  cold: "bg-[var(--red-500)]",
};

export function ScoreIndicator({ score, className }: { score: number; className?: string }) {
  const { t } = useTranslation();
  const tone = toneFromScore(score);
  const label = tone === "hot" ? t("score.hot") : tone === "warm" ? t("score.warm") : t("score.cold");
  const badgeVariant = tone === "hot" ? "success" : tone === "warm" ? "warning" : "danger";
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className={cn("h-2 w-2 shrink-0 rounded-full", dotColor[tone])} aria-hidden />
      <Badge variant={badgeVariant} className="!normal-case !tracking-normal text-[12px]">
        {score} {label}
      </Badge>
    </div>
  );
}
