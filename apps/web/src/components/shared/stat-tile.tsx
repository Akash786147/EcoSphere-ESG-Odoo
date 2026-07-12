import { Card, CardContent } from "@/components/ui/card";
import { cn } from "src/lib/utils";

interface StatTileProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaTone?: "positive" | "negative" | "neutral" | "warning";
  highlight?: boolean;
}

const deltaToneClass: Record<NonNullable<StatTileProps["deltaTone"]>, string> = {
  positive: "text-emerald-600 dark:text-emerald-500",
  negative: "text-destructive",
  warning: "text-amber-600 dark:text-amber-500",
  neutral: "text-muted-foreground",
};

export function StatTile({ label, value, delta, deltaTone = "neutral", highlight }: StatTileProps) {
  return (
    <Card
      className={cn(
        highlight && "border-amber-500/40 bg-amber-500/5 ring-amber-500/20"
      )}
    >
      <CardContent>
        <p className={cn("text-sm font-medium", highlight ? "text-amber-700 dark:text-amber-500" : "text-muted-foreground")}>
          {label}
        </p>
        <p className={cn("mt-2 text-2xl font-bold tracking-tight", highlight && "text-amber-700 dark:text-amber-500")}>
          {value}
        </p>
        {delta && (
          <p className={cn("mt-1 text-xs font-medium", deltaToneClass[deltaTone])}>{delta}</p>
        )}
      </CardContent>
    </Card>
  );
}
