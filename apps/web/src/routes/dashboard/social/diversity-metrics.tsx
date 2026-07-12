import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MiniTrendLine } from "@/components/shared/mini-trend-line";
import { Shield, Download } from "lucide-react";

export const Route = createFileRoute("/dashboard/social/diversity-metrics")({
  component: DiversityMetrics,
});

const deptDistribution = [
  { dept: "Manufacturing", count: 410 },
  { dept: "R&D", count: 142 },
  { dept: "Sales & Marketing", count: 96 },
  { dept: "Logistics", count: 87 },
  { dept: "IT & Digital", count: 68 },
  { dept: "Human Resources", count: 24 },
];

const leadershipByLevel = [
  { level: "Executive", pct: 25 },
  { level: "Director", pct: 35 },
  { level: "Manager", pct: 44 },
];

const trend = [
  { label: "2022", value: 33 },
  { label: "2023", value: 38 },
  { label: "2024", value: 42 },
  { label: "2025", value: 44 },
  { label: "2026", value: 41 },
];

const maxDept = Math.max(...deptDistribution.map((d) => d.count));

function DiversityMetrics() {
  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Diversity metrics</h1>
          <p className="text-muted-foreground mt-1">
            Aggregated workforce composition and leadership representation across the organization.
          </p>
        </div>
        <Button variant="secondary" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="flex items-start gap-2 rounded-md border bg-muted/30 p-3 text-xs text-muted-foreground">
        <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        All figures on this page are aggregated at the department and organization level. No individual employee
        demographic data is shown or exportable from this view.
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Workforce composition</CardTitle>
            <span className="text-xs text-muted-foreground">827 employees</span>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex h-3 w-full overflow-hidden rounded-full">
              <div className="bg-governance" style={{ width: "54%" }} />
              <div className="bg-social" style={{ width: "46%" }} />
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-governance" />Male</span>
                <span className="font-medium">54% · 447</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-social" />Female</span>
                <span className="font-medium">46% · 380</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {deptDistribution.map((d) => (
              <div key={d.dept} className="flex items-center gap-3">
                <span className="w-36 shrink-0 text-sm">{d.dept}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-social" style={{ width: `${(d.count / maxDept) * 100}%` }} />
                </div>
                <span className="w-10 shrink-0 text-right text-sm font-medium">{d.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Leadership representation</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <p className="text-3xl font-bold">41%</p>
              <p className="text-xs text-muted-foreground">women in leadership roles, org-wide</p>
            </div>
            <div className="flex flex-col gap-3">
              {leadershipByLevel.map((l) => (
                <div key={l.level} className="flex items-center gap-3">
                  <span className="w-24 shrink-0 text-sm">{l.level}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-social" style={{ width: `${l.pct}%` }} />
                  </div>
                  <span className="w-10 shrink-0 text-right text-sm font-medium">{l.pct}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trend over time</CardTitle>
            <p className="text-sm text-muted-foreground">Women in leadership, year-end snapshot</p>
          </CardHeader>
          <CardContent>
            <MiniTrendLine points={trend} color="var(--social)" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
