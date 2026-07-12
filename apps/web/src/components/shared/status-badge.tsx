import { Badge } from "@/components/ui/badge";
import { cn } from "src/lib/utils";

const STATUS_CLASS: Record<string, string> = {
  Active: "text-emerald-600 border-emerald-600/30 bg-emerald-500/10",
  Completed: "text-emerald-600 border-emerald-600/30 bg-emerald-500/10",
  Approved: "text-emerald-600 border-emerald-600/30 bg-emerald-500/10",
  Acknowledged: "text-emerald-600 border-emerald-600/30 bg-emerald-500/10",
  Resolved: "text-emerald-600 border-emerald-600/30 bg-emerald-500/10",
  "On track": "text-emerald-600 border-emerald-600/30 bg-emerald-500/10",
  Complete: "text-emerald-600 border-emerald-600/30 bg-emerald-500/10",

  Pending: "text-amber-600 border-amber-600/30 bg-amber-500/10",
  "In progress": "text-amber-600 border-amber-600/30 bg-amber-500/10",
  "Under review": "text-amber-600 border-amber-600/30 bg-amber-500/10",
  Behind: "text-amber-600 border-amber-600/30 bg-amber-500/10",

  Overdue: "text-destructive border-destructive/30 bg-destructive/10",
  Rejected: "text-destructive border-destructive/30 bg-destructive/10",

  Scheduled: "text-muted-foreground border-border bg-muted",
  Upcoming: "text-blue-600 border-blue-600/30 bg-blue-500/10",
  Closed: "text-muted-foreground border-border bg-muted",
  "Not required": "text-muted-foreground border-border bg-muted",
  Missing: "text-destructive border-destructive/30 bg-destructive/10",
  Attached: "text-emerald-600 border-emerald-600/30 bg-emerald-500/10",
};

const SEVERITY_CLASS: Record<string, string> = {
  Critical: "text-destructive border-destructive/30 bg-destructive/10",
  High: "text-amber-600 border-amber-600/30 bg-amber-500/10",
  Medium: "text-governance border-governance/30 bg-governance/10",
  Moderate: "text-governance border-governance/30 bg-governance/10",
  Low: "text-muted-foreground border-border bg-muted",
  Minor: "text-muted-foreground border-border bg-muted",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <Badge variant="outline" className={cn(STATUS_CLASS[status] ?? "", className)}>
      {status}
    </Badge>
  );
}

export function SeverityBadge({ severity, className }: { severity: string; className?: string }) {
  return (
    <Badge variant="outline" className={cn(SEVERITY_CLASS[severity] ?? "", className)}>
      {severity}
    </Badge>
  );
}
