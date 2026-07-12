import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatTile } from "@/components/shared/stat-tile";
import { SeverityBadge } from "@/components/shared/status-badge";
import { MiniTrendLine } from "@/components/shared/mini-trend-line";
import { Calendar, Download } from "lucide-react";

export const Route = createFileRoute("/dashboard/governance/overview")({
  component: GovernanceOverview,
});

const ackTrend = [
  { label: "Feb", value: 82 },
  { label: "Mar", value: 84 },
  { label: "Apr", value: 86 },
  { label: "May", value: 88 },
  { label: "Jun", value: 90 },
  { label: "Jul", value: 91 },
];

const issuesBySeverity = [
  { severity: "Critical", count: 1, pct: 11, colorClass: "bg-destructive" },
  { severity: "High", count: 3, pct: 33, colorClass: "bg-amber-500" },
  { severity: "Medium", count: 4, pct: 45, colorClass: "bg-governance" },
  { severity: "Low", count: 1, pct: 11, colorClass: "bg-border" },
];

const deptScores = [
  { dept: "Human Resources", score: 87 },
  { dept: "R&D", score: 86 },
  { dept: "IT & Digital", score: 85 },
  { dept: "Sales & Marketing", score: 80 },
  { dept: "Manufacturing", score: 76 },
  { dept: "Logistics", score: 73 },
];

const auditStatus = [
  { label: "Completed", count: 6, colorClass: "bg-emerald-500" },
  { label: "In progress", count: 3, colorClass: "bg-amber-500" },
  { label: "Scheduled", count: 1, colorClass: "bg-border" },
];

const needsAttention = [
  { id: "CI-142", dept: "Manufacturing", severity: "Critical", due: "Jul 8 · overdue" },
  { id: "CI-129", dept: "IT & Digital", severity: "High", due: "Jun 30 · overdue" },
  { id: "CI-102", dept: "IT & Digital", severity: "Medium", due: "Jun 20 · overdue" },
  { id: "CI-138", dept: "Logistics", severity: "High", due: "Jul 15" },
  { id: "CI-135", dept: "Sales & Marketing", severity: "High", due: "Jul 20" },
];

const policiesBelowTarget = [
  { id: "POL-021", title: "Data Privacy & Protection Policy", ack: 78 },
  { id: "POL-005", title: "Fleet Emissions & Compliance Policy", ack: 82 },
  { id: "POL-027", title: "Supplier Code of Conduct", ack: 88 },
];

function GovernanceOverview() {
  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Governance</h1>
          <p className="text-muted-foreground mt-1">
            Policy acknowledgement, audit status, and compliance issues across the organization.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Last 6 months
          </Button>
          <Button variant="secondary" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Active policies" value={18} delta="2 published this quarter" />
        <StatTile label="Policy acknowledgement rate" value="91%" delta="On target" deltaTone="positive" />
        <StatTile label="Open compliance issues" value={9} delta="3 overdue" deltaTone="warning" />
        <StatTile label="Active audits" value={4} delta="6 completed this year" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Policy acknowledgement trend</CardTitle>
            <p className="text-sm text-muted-foreground">Organization-wide acknowledgement rate, last 6 months</p>
          </CardHeader>
          <CardContent>
            <MiniTrendLine points={ackTrend} color="var(--governance)" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance issues by severity</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex h-2.5 w-full overflow-hidden rounded-full">
              {issuesBySeverity.map((s) => (
                <div key={s.severity} className={s.colorClass} style={{ width: `${s.pct}%` }} />
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {issuesBySeverity.map((s) => (
                <div key={s.severity} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className={`size-2 rounded-full ${s.colorClass}`} />
                    {s.severity}
                  </span>
                  <span className="font-medium">{s.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Governance score by department</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {deptScores.map((d) => (
              <div key={d.dept} className="flex items-center gap-3">
                <span className="w-36 shrink-0 text-sm">{d.dept}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${d.score < 80 ? "bg-amber-500" : "bg-governance"}`}
                    style={{ width: `${d.score}%` }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right text-sm font-medium">{d.score}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Audit status</CardTitle>
            <Link to="/dashboard/governance/audits" className="text-sm text-governance hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {auditStatus.map((s) => (
              <div key={s.label} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className={`size-2 rounded-full ${s.colorClass}`} />
                  {s.label}
                </span>
                <span className="font-medium">{s.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Needs attention</CardTitle>
            <Link to="/dashboard/governance/compliance-issues" className="text-sm text-governance hover:underline">
              View all issues
            </Link>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {needsAttention.map((item, i) => (
              <Link
                key={item.id}
                to="/dashboard/governance/compliance-issues/$issueId"
                params={{ issueId: item.id }}
                className="flex items-center gap-3 rounded-md border p-3 text-sm hover:bg-muted/50"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  {i + 1}
                </span>
                <span className="flex-1 truncate font-medium">{item.id}</span>
                <span className="hidden text-muted-foreground sm:inline">{item.dept}</span>
                <SeverityBadge severity={item.severity} />
                <span className="w-28 shrink-0 text-right text-xs text-muted-foreground">{item.due}</span>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Policies below target</CardTitle>
            <Link to="/dashboard/governance/policies" className="text-sm text-governance hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {policiesBelowTarget.map((p) => (
              <Link key={p.id} to="/dashboard/governance/policies/$policyId" params={{ policyId: p.id }} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{p.title}</span>
                  <span className="text-amber-600">{p.ack}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-amber-500" style={{ width: `${p.ack}%` }} />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
