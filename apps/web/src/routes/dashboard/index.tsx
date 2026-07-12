import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, DownloadIcon, ArrowUpRight, AlertCircle, FileText, CheckCircle2, Award } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardOverview,
});

function DashboardOverview() {
  return (
    <div className="flex flex-col gap-8 max-w-[1200px] mx-auto pb-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Good morning, Sarah</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Here is how your organization is performing across ESG today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Last 6 months
          </Button>
          <Button variant="secondary" className="h-9">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export summary
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm">
          <CardContent className="p-5">
            <div className="text-sm font-medium text-muted-foreground mb-2">Overall ESG Score</div>
            <div className="text-3xl font-bold font-mono tracking-tight">78.4</div>
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-500 mt-2 text-xs font-medium">
              <ArrowUpRight className="h-3.5 w-3.5" />
              +4.2% vs previous period
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground mb-2">
              <span className="w-2 h-2 rounded-sm bg-emerald-500 shrink-0" />
              Environmental
            </div>
            <div className="text-3xl font-bold font-mono tracking-tight">82</div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mt-3">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: "82%" }} />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground mb-2">
              <span className="w-2 h-2 rounded-sm bg-blue-500 shrink-0" />
              Social
            </div>
            <div className="text-3xl font-bold font-mono tracking-tight">76</div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mt-3">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: "76%" }} />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground mb-2">
              <span className="w-2 h-2 rounded-sm bg-purple-500 shrink-0" />
              Governance
            </div>
            <div className="text-3xl font-bold font-mono tracking-tight">74</div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mt-3">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: "74%" }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 md:grid-cols-[1.7fr_1fr]">
        <Card className="shadow-sm flex flex-col">
          <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
            <div>
              <CardTitle className="text-lg font-semibold">ESG performance trend</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Weighted score by pillar, last 6 months</p>
            </div>
            <div className="flex flex-wrap gap-4 text-xs font-medium text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-foreground shrink-0" /> Overall
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-emerald-500 shrink-0" /> Env
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-blue-500 shrink-0" /> Soc
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-purple-500 shrink-0" /> Gov
              </div>
            </div>
          </CardHeader>
          <CardContent className="mt-4 flex-1 flex flex-col justify-end">
            <svg viewBox="0 0 640 220" className="w-full h-auto text-muted/30">
              <g stroke="currentColor" strokeWidth="1">
                <line x1="40" y1="20" x2="620" y2="20"/>
                <line x1="40" y1="80" x2="620" y2="80"/>
                <line x1="40" y1="140" x2="620" y2="140"/>
                <line x1="40" y1="200" x2="620" y2="200"/>
              </g>
              <g className="text-[10.5px] fill-muted-foreground font-mono">
                <text x="8" y="24">90</text><text x="8" y="84">80</text><text x="8" y="144">70</text><text x="8" y="204">60</text>
              </g>
              <g className="text-[10.5px] fill-muted-foreground">
                <text x="34" y="216">Feb</text><text x="146" y="216">Mar</text><text x="258" y="216">Apr</text><text x="370" y="216">May</text><text x="482" y="216">Jun</text><text x="592" y="216">Jul</text>
              </g>
              {/* Governance */}
              <polyline points="40,152 152,146 264,140 376,134 488,122 600,116" fill="none" className="stroke-purple-500" strokeWidth="2"/>
              {/* Social */}
              <polyline points="40,140 152,134 264,122 376,116 488,110 600,104" fill="none" className="stroke-blue-500" strokeWidth="2"/>
              {/* Env */}
              <polyline points="40,116 152,104 264,92 376,86 488,74 600,68" fill="none" className="stroke-emerald-500" strokeWidth="2"/>
              {/* Overall */}
              <polyline points="40,134 152,128 264,116 376,110 488,98 600,90" fill="none" className="stroke-foreground" strokeWidth="2.5"/>
              <circle cx="600" cy="90" r="4" className="fill-foreground"/>
            </svg>
          </CardContent>
        </Card>

        <Card className="shadow-sm flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Carbon emissions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col flex-1">
            <div className="flex flex-col">
              <div className="text-4xl font-bold font-mono tracking-tight">
                1,842 <span className="text-sm font-semibold text-muted-foreground font-sans tracking-normal">tCO2e</span>
              </div>
              <div className="text-xs font-medium text-emerald-600 dark:text-emerald-500 mt-1">↓ 8.4% vs previous quarter</div>
            </div>
            
            <div className="mt-auto pt-6">
              <svg viewBox="0 0 260 70" className="w-full h-auto text-muted/50">
                <g>
                  <rect x="4" y="34" width="26" height="30" rx="2" fill="currentColor"/>
                  <rect x="38" y="26" width="26" height="38" rx="2" fill="currentColor"/>
                  <rect x="72" y="30" width="26" height="34" rx="2" fill="currentColor"/>
                  <rect x="106" y="18" width="26" height="46" rx="2" fill="currentColor"/>
                  <rect x="140" y="22" width="26" height="42" rx="2" fill="currentColor"/>
                  <rect x="174" y="10" width="26" height="54" rx="2" fill="currentColor"/>
                  <rect x="208" y="8" width="26" height="56" rx="2" className="fill-emerald-500"/>
                </g>
              </svg>
              
              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="flex justify-between items-center text-xs text-muted-foreground font-medium mb-2">
                  <span>2026 target: 1,200 tCO2e</span>
                  <span>62%</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "62%" }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Depts & Goals */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-sm flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-semibold">Department performance</CardTitle>
            <Badge variant="secondary">6 departments</Badge>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 flex-1">
            {[
              { name: "Human Resources", score: 88, w: "88%", rank: 1, color: "bg-primary" },
              { name: "R&D", score: 85, w: "85%", rank: 2, color: "bg-primary" },
              { name: "IT & Digital", score: 82, w: "82%", rank: 3, color: "bg-primary" },
              { name: "Sales & Marketing", score: 79, w: "79%", rank: 4, color: "bg-primary" },
              { name: "Manufacturing", score: 71, w: "71%", rank: 5, color: "bg-amber-500" },
              { name: "Logistics", score: 68, w: "68%", rank: 6, color: "bg-amber-500" },
            ].map((dept) => (
              <div key={dept.name} className="flex items-center gap-3">
                <span className="w-5 text-xs text-muted-foreground font-bold shrink-0">{dept.rank}</span>
                <span className="w-32 text-sm font-semibold truncate shrink-0">{dept.name}</span>
                <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${dept.color}`} style={{ width: dept.w }} />
                </div>
                <span className="w-8 text-right text-sm font-bold font-mono shrink-0">{dept.score}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-sm flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-semibold">Goals progress</CardTitle>
            <Button variant="ghost" size="sm" render={<Link to="/dashboard" />}>
              View all
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-0 flex-1">
            {[
              { title: "Reduce Scope 1 & 2 emissions by 30%", pct: 64, meta: "Operations · Due Dec 2026" },
              { title: "100% renewable electricity at manufacturing sites", pct: 41, meta: "Facilities · Due Jun 2027" },
              { title: "Zero landfill waste across all facilities", pct: 78, meta: "Operations · Due Mar 2026" },
              { title: "Achieve gender parity in leadership roles", pct: 52, meta: "People & Culture · Due Dec 2027" },
            ].map((goal, i, arr) => (
              <div key={i} className={`py-3.5 ${i !== arr.length - 1 ? 'border-b border-border/50' : ''}`}>
                <div className="flex justify-between items-baseline gap-2 mb-2">
                  <span className="text-sm font-semibold">{goal.title}</span>
                  <span className="text-sm font-bold text-primary/80 shrink-0 font-mono">{goal.pct}%</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${goal.pct}%` }} />
                </div>
                <div className="text-xs text-muted-foreground font-medium">
                  {goal.meta}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Action & Engagement */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-sm flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-semibold">Needs attention</CardTitle>
            <Badge variant="destructive" className="bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20">5 items</Badge>
          </CardHeader>
          <CardContent className="flex flex-col gap-0 flex-1">
            <div className="flex items-start gap-3 py-3 border-b border-border/50">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold leading-snug">3 compliance issues are overdue</div>
                <div className="text-xs text-muted-foreground mt-0.5">Critical: Wastewater discharge report — Manufacturing, 4 days overdue</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 py-3 border-b border-border/50">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold leading-snug">12 employees have not acknowledged a policy</div>
                <div className="text-xs text-muted-foreground mt-0.5">Data Privacy Policy v3.2 — due in 3 days</div>
              </div>
            </div>

            <div className="flex items-start gap-3 py-3 border-b border-border/50">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold leading-snug">8 CSR submissions await approval</div>
                <div className="text-xs text-muted-foreground mt-0.5">Coastal Cleanup Drive, Blood Donation Camp and 2 more</div>
              </div>
            </div>

            <div className="flex items-start gap-3 py-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold leading-snug">2 challenge submissions await review</div>
                <div className="text-xs text-muted-foreground mt-0.5">Zero-Waste Desk Challenge — evidence attached</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Employee engagement</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center pb-8">
            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
              <div>
                <div className="text-2xl font-bold font-mono tracking-tight">71%</div>
                <div className="text-xs text-muted-foreground font-medium mt-1">Participation rate this quarter</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono tracking-tight">6</div>
                <div className="text-xs text-muted-foreground font-medium mt-1">Active challenges</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono tracking-tight">340</div>
                <div className="text-xs text-muted-foreground font-medium mt-1">CSR participants this month</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono tracking-tight">+12,400</div>
                <div className="text-xs text-muted-foreground font-medium mt-1">XP earned this week</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
