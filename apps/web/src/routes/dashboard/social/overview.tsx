import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatTile } from "@/components/shared/stat-tile";
import { MiniTrendLine } from "@/components/shared/mini-trend-line";
import { Calendar, Plus } from "lucide-react";

export const Route = createFileRoute("/dashboard/social/overview")({
  component: SocialOverview,
});

const participationTrend = [
  { label: "Feb", value: 62 },
  { label: "Mar", value: 64 },
  { label: "Apr", value: 66 },
  { label: "May", value: 68 },
  { label: "Jun", value: 70 },
  { label: "Jul", value: 71 },
];

const activitiesByCategory = [
  { category: "Environmental cleanup", count: 5 },
  { category: "Education & mentorship", count: 3 },
  { category: "Health & wellness", count: 3 },
  { category: "Community development", count: 2 },
  { category: "Disaster relief", count: 1 },
];

const deptScores = [
  { dept: "Human Resources", score: 92 },
  { dept: "IT & Digital", score: 83 },
  { dept: "Sales & Marketing", score: 81 },
  { dept: "R&D", score: 80 },
  { dept: "Manufacturing", score: 74 },
  { dept: "Logistics", score: 70 },
];

const pendingApprovals = [
  { employee: "Aisha Rahman", activity: "Riverside Park Clean-Up Day", proof: "Attached", submitted: "2 days ago" },
  { employee: "Derek Osei", activity: "Blood Donation Drive", proof: "Missing", submitted: "3 days ago" },
  { employee: "Liu Wei", activity: "Urban Tree Planting Initiative", proof: "Attached", submitted: "4 days ago" },
  { employee: "Omar Farouk", activity: "Flood Relief Supply Packing Drive", proof: "Missing", submitted: "5 days ago" },
  { employee: "Ivan Petrenko", activity: "Youth STEM Mentorship Program", proof: "Attached", submitted: "6 days ago" },
];

const trainingBelowTarget = [
  { dept: "Logistics", rate: 80 },
  { dept: "Manufacturing", rate: 83 },
  { dept: "Sales & Marketing", rate: 88 },
];

const maxCategory = Math.max(...activitiesByCategory.map((c) => c.count));

function SocialOverview() {
  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Social</h1>
          <p className="text-muted-foreground mt-1">
            CSR participation, training completion, and workforce diversity across the organization.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Last 6 months
          </Button>
          <Button variant="secondary" size="sm" render={<Link to="/dashboard/social/csr-activities" />}>
            <Plus className="mr-2 h-4 w-4" />
            New activity
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Active CSR activities" value={14} delta="340 participants this month" />
        <StatTile label="Employee participation rate" value="71%" delta="+5.2 pts vs previous quarter" deltaTone="positive" />
        <StatTile label="Training completion rate" value="86%" />
        <StatTile label="Volunteer hours this year" value="3,240" delta="Across 14 activities" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Participation trend</CardTitle>
            <p className="text-sm text-muted-foreground">Employee participation rate, last 6 months</p>
          </CardHeader>
          <CardContent>
            <MiniTrendLine points={participationTrend} color="var(--social)" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CSR activities by category</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {activitiesByCategory.map((c) => (
              <div key={c.category} className="flex items-center gap-3">
                <span className="w-36 shrink-0 text-xs">{c.category}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-social" style={{ width: `${(c.count / maxCategory) * 100}%` }} />
                </div>
                <span className="w-4 shrink-0 text-right text-sm font-medium">{c.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Social score by department</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {deptScores.map((d) => (
              <div key={d.dept} className="flex items-center gap-3">
                <span className="w-36 shrink-0 text-sm">{d.dept}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${d.score < 80 ? "bg-amber-500" : "bg-social"}`}
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
            <CardTitle>Diversity overview</CardTitle>
            <Link to="/dashboard/social/diversity-metrics" className="text-sm text-social hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">Workforce composition</p>
              <div className="flex h-2 w-full overflow-hidden rounded-full">
                <div className="bg-governance" style={{ width: "54%" }} />
                <div className="bg-social" style={{ width: "46%" }} />
              </div>
              <div className="mt-2 flex flex-col gap-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-governance" />Male 54%</span>
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-social" />Female 46%</span>
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">Leadership representation</p>
              <p className="text-2xl font-bold">41%</p>
              <p className="text-xs text-muted-foreground">Women in leadership roles, org-wide</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pending CSR approvals</CardTitle>
            <Link to="/dashboard/social/employee-participation" className="text-sm text-social hover:underline">
              Review all
            </Link>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {pendingApprovals.map((item, i) => (
              <Link
                key={`${item.employee}-${item.activity}`}
                to="/dashboard/social/employee-participation"
                className="flex items-center gap-3 rounded-md border p-3 text-sm hover:bg-muted/50"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  {i + 1}
                </span>
                <span className="flex-1 truncate font-medium">{item.employee}</span>
                <span className="hidden truncate text-muted-foreground sm:inline">{item.activity}</span>
                <span className={item.proof === "Attached" ? "text-xs text-emerald-600" : "text-xs text-destructive"}>
                  {item.proof}
                </span>
                <span className="w-20 shrink-0 text-right text-xs text-muted-foreground">{item.submitted}</span>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Training below target</CardTitle>
            <Link to="/dashboard/social/training-completion" className="text-sm text-social hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {trainingBelowTarget.map((t) => (
              <div key={t.dept} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{t.dept}</span>
                  <span className="text-amber-600">{t.rate}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-amber-500" style={{ width: `${t.rate}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
