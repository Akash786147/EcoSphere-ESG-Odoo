import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge, SeverityBadge } from "@/components/shared/status-badge";
import { ArrowLeft, FileText } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/governance/compliance-issues/$issueId")({
  component: IssueDetail,
  loader: ({ params }) => {
    const issue = ISSUES[params.issueId];
    if (!issue) throw notFound();
    return issue;
  },
});

interface IssueDetailData {
  desc: string;
  severity: string;
  status: string;
  owner: string;
  dept: string;
  due: string;
  linkedAudit: string | null;
  description: string;
  evidence: string[];
  resolution: string | null;
  activity: string[];
}

const ISSUES: Record<string, IssueDetailData> = {
  "CI-142": {
    desc: "Wastewater discharge report overdue", severity: "Critical", status: "Overdue",
    owner: "Robert Alvarez", dept: "Manufacturing", due: "Jul 8, 2026", linkedAudit: "AUD-2026-08",
    description: "The quarterly wastewater discharge report for Plant 1 has not been filed with the regional environmental authority, identified during the wastewater discharge compliance audit.",
    evidence: ["Plant 1 discharge sampling log — Jun 2026.pdf · 1.2 MB"],
    resolution: null,
    activity: ["Issue created — Jul 5, 2026", "Escalated to plant manager — Jul 9, 2026"],
  },
  "CI-138": {
    desc: "Fleet emissions permit renewal pending", severity: "High", status: "In progress",
    owner: "Elena Petrova", dept: "Logistics", due: "Jul 15, 2026", linkedAudit: "AUD-2026-06",
    description: "Renewal application for the logistics fleet emissions permit is in progress with the issuing authority.",
    evidence: ["Permit renewal application — draft.pdf · 640 KB"],
    resolution: null,
    activity: ["Issue created — Jun 12, 2026", "Renewal application submitted — Jun 28, 2026"],
  },
  "CI-135": {
    desc: "Supplier code of conduct re-certification", severity: "High", status: "In progress",
    owner: "Marcus Webb", dept: "Sales & Marketing", due: "Jul 20, 2026", linkedAudit: "AUD-2026-03",
    description: "Three key suppliers have lapsed Supplier Code of Conduct re-certifications, identified during the ethical sourcing audit.",
    evidence: [],
    resolution: null,
    activity: ["Issue created — Mar 27, 2026", "Two of three suppliers re-certified — Jun 30, 2026"],
  },
  "CI-129": {
    desc: "Data privacy policy gap — vendor contracts", severity: "High", status: "Overdue",
    owner: "Fatima Noor", dept: "IT & Digital", due: "Jun 30, 2026", linkedAudit: "AUD-2026-07",
    description: "Several vendor contracts lack the data-processing terms required by the Data Privacy & Protection Policy.",
    evidence: ["Vendor contract gap analysis.xlsx · 88 KB"],
    resolution: null,
    activity: ["Issue created — Jun 20, 2026"],
  },
  "CI-124": {
    desc: "Fire safety inspection follow-up", severity: "Medium", status: "Open",
    owner: "Robert Alvarez", dept: "Manufacturing", due: "Aug 5, 2026", linkedAudit: "AUD-2026-04",
    description: "Follow-up inspection needed on Plant 1's fire suppression system after the occupational health & safety audit.",
    evidence: [],
    resolution: null,
    activity: ["Issue created — Apr 30, 2026"],
  },
  "CI-119": {
    desc: "Whistleblower policy annual review", severity: "Medium", status: "Open",
    owner: "Priya Anand", dept: "Human Resources", due: "Aug 12, 2026", linkedAudit: "AUD-2026-05",
    description: "Annual review of the Whistleblower Protection Policy is overdue per the program effectiveness review.",
    evidence: [],
    resolution: null,
    activity: ["Issue created — May 20, 2026"],
  },
  "CI-115": {
    desc: "Chemical storage documentation incomplete", severity: "Medium", status: "Open",
    owner: "Daniel Cho", dept: "R&D", due: "Jul 25, 2026", linkedAudit: null,
    description: "Chemical storage documentation for the R&D lab is missing safety data sheets for two compounds.",
    evidence: [],
    resolution: null,
    activity: ["Issue created — Jun 30, 2026"],
  },
  "CI-102": {
    desc: "Third-party vendor risk assessment overdue", severity: "Medium", status: "Overdue",
    owner: "Fatima Noor", dept: "IT & Digital", due: "Jun 20, 2026", linkedAudit: "AUD-2026-07",
    description: "Risk assessments for two IT vendors are overdue, identified during the data privacy & vendor contracts audit.",
    evidence: [],
    resolution: null,
    activity: ["Issue created — Jun 15, 2026"],
  },
  "CI-108": {
    desc: "Signage update — safety exits", severity: "Low", status: "Open",
    owner: "Elena Petrova", dept: "Logistics", due: "Sep 1, 2026", linkedAudit: null,
    description: "Safety exit signage at the logistics warehouse needs updating to current code.",
    evidence: [],
    resolution: null,
    activity: ["Issue created — Jul 1, 2026"],
  },
  "CI-095": {
    desc: "Machine guarding signage outdated", severity: "Low", status: "Resolved",
    owner: "Robert Alvarez", dept: "Manufacturing", due: "May 15, 2026", linkedAudit: "AUD-2026-04",
    description: "Machine guarding signage on the Plant 1 floor was outdated following the occupational health & safety audit.",
    evidence: ["Updated signage photos.zip · 3.4 MB"],
    resolution: "Signage replaced across all affected stations and verified during a follow-up walkthrough on May 10, 2026.",
    activity: ["Issue created — Apr 30, 2026", "Signage replaced — May 8, 2026", "Marked resolved — May 15, 2026"],
  },
  "CI-088": {
    desc: "Anti-corruption training completion gap", severity: "Medium", status: "Closed",
    owner: "Marcus Webb", dept: "Sales & Marketing", due: "Apr 1, 2026", linkedAudit: null,
    description: "A subset of the sales team had not completed mandatory anti-corruption training.",
    evidence: [],
    resolution: "All outstanding team members completed training by Mar 28, 2026; issue closed after verification.",
    activity: ["Issue created — Feb 1, 2026", "Training completed by remaining staff — Mar 28, 2026", "Closed — Apr 1, 2026"],
  },
};

function IssueDetail() {
  const { issueId } = Route.useParams();
  const issue = Route.useLoaderData();
  const [status, setStatus] = useState(issue.status);

  function toggleResolved() {
    if (status === "Resolved" || status === "Closed") {
      setStatus("Open");
      toast.success("Issue reopened");
    } else {
      setStatus("Resolved");
      toast.success("Issue marked resolved");
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-8 w-full">
      <Link to="/dashboard/governance/compliance-issues" className="flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Compliance Issues
      </Link>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{issue.desc}</h1>
          <p className="text-muted-foreground mt-1">{issueId} · {issue.dept}</p>
        </div>
        <div className="flex items-center gap-2">
          <SeverityBadge severity={issue.severity} />
          <StatusBadge status={status} />
          <Button variant={status === "Resolved" || status === "Closed" ? "outline" : "default"} onClick={toggleResolved}>
            {status === "Resolved" || status === "Closed" ? "Reopen issue" : "Mark resolved"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-[100px_1fr] gap-y-3 text-sm">
              <dt className="text-muted-foreground">Owner</dt>
              <dd>{issue.owner}</dd>
              <dt className="text-muted-foreground">Department</dt>
              <dd>{issue.dept}</dd>
              <dt className="text-muted-foreground">Due date</dt>
              <dd className="tabular-nums">{issue.due}</dd>
              <dt className="text-muted-foreground">Linked audit</dt>
              <dd>
                {issue.linkedAudit ? (
                  <Link
                    to="/dashboard/governance/audits/$auditId"
                    params={{ auditId: issue.linkedAudit }}
                    className="text-governance hover:underline"
                  >
                    {issue.linkedAudit}
                  </Link>
                ) : (
                  <span className="text-muted-foreground">No linked audit</span>
                )}
              </dd>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">{issue.description}</p>
            <div>
              <p className="mb-2 text-sm font-medium">Evidence</p>
              {issue.evidence.length === 0 ? (
                <p className="text-sm text-muted-foreground">No evidence attached</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {issue.evidence.map((file) => (
                    <div key={file} className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
                      <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                      {file}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Resolution notes</CardTitle>
          </CardHeader>
          <CardContent>
            {issue.resolution ? (
              <p className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-400">
                {issue.resolution}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                No resolution notes yet — this issue is still {status.toLowerCase()}.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Timeline & activity history</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {issue.activity.map((entry) => (
              <div key={entry} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground" />
                <span className="text-muted-foreground">{entry}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
