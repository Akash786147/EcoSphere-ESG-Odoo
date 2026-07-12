import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge, SeverityBadge } from "@/components/shared/status-badge";
import { ArrowLeft, CheckCircle2, Clock, Circle } from "lucide-react";

export const Route = createFileRoute("/dashboard/governance/audits/$auditId")({
  component: AuditDetail,
  loader: ({ params }) => {
    const audit = AUDITS[params.auditId];
    if (!audit) throw notFound();
    return audit;
  },
});

interface Finding {
  severity: string;
  title: string;
  description: string;
  linkedIssue?: string;
}

interface TimelineStep {
  label: string;
  status: "done" | "progress" | "pending";
}

interface AuditDetailData {
  name: string;
  dept: string;
  scope: string;
  auditor: string;
  started: string;
  end: string;
  status: string;
  objective: string;
  timeline: TimelineStep[];
  findings: Finding[];
  activity: string[];
}

const AUDITS: Record<string, AuditDetailData> = {
  "AUD-2026-01": {
    name: "ISO 14001 Environmental Management Recertification",
    dept: "Manufacturing", scope: "Manufacturing", auditor: "SGS Global",
    started: "Jan 5, 2026", end: "Jan 22, 2026", status: "Completed",
    objective: "Recertify the environmental management system against ISO 14001 requirements across all manufacturing sites.",
    timeline: [
      { label: "Kickoff & document review", status: "done" },
      { label: "Site visits", status: "done" },
      { label: "Findings review", status: "done" },
      { label: "Final report", status: "done" },
    ],
    findings: [
      { severity: "Minor", title: "Waste segregation labeling inconsistent at Plant 2", description: "Recycling and hazardous waste bins were not consistently labeled per procedure." },
      { severity: "Low", title: "Signage update required for safety exits", description: "Minor non-conformance, linked to compliance issue CI-108.", linkedIssue: "CI-108" },
    ],
    activity: ["Audit scheduled — Dec 10, 2025", "Kickoff meeting held — Jan 5, 2026", "Site visits completed — Jan 16, 2026", "Final report issued — Jan 22, 2026"],
  },
  "AUD-2026-02": {
    name: "Annual Data Privacy Compliance Audit",
    dept: "IT & Digital", scope: "IT & Digital", auditor: "Internal Compliance Team",
    started: "Feb 2, 2026", end: "Feb 18, 2026", status: "Completed",
    objective: "Assess compliance with the Data Privacy & Protection Policy across customer-facing and internal systems.",
    timeline: [
      { label: "Kickoff & document review", status: "done" },
      { label: "System access review", status: "done" },
      { label: "Findings review", status: "done" },
      { label: "Final report", status: "done" },
    ],
    findings: [
      { severity: "Moderate", title: "Data retention schedule not enforced on legacy CRM", description: "Customer records exceeded the retention limit defined in the privacy policy." },
    ],
    activity: ["Audit scheduled — Jan 12, 2026", "Kickoff meeting held — Feb 2, 2026", "Final report issued — Feb 18, 2026"],
  },
  "AUD-2026-03": {
    name: "Supplier Ethical Sourcing Audit",
    dept: "Sales & Marketing", scope: "Sales & Marketing", auditor: "Bureau Veritas",
    started: "Mar 9, 2026", end: "Mar 27, 2026", status: "Completed",
    objective: "Verify supplier compliance with the Supplier Code of Conduct, including labor and sourcing standards.",
    timeline: [
      { label: "Kickoff & document review", status: "done" },
      { label: "Supplier site visits", status: "done" },
      { label: "Findings review", status: "done" },
      { label: "Final report", status: "done" },
    ],
    findings: [
      { severity: "High", title: "Supplier code of conduct re-certification overdue", description: "Three key suppliers had lapsed re-certification, tracked as compliance issue CI-135.", linkedIssue: "CI-135" },
      { severity: "Low", title: "Minor documentation gaps in two supplier files", description: "Missing signed attestations for two lower-risk suppliers." },
      { severity: "Low", title: "Delayed response from one supplier", description: "Follow-up requested, no material risk identified." },
    ],
    activity: ["Audit scheduled — Feb 1, 2026", "Kickoff meeting held — Mar 9, 2026", "Final report issued — Mar 27, 2026"],
  },
  "AUD-2026-04": {
    name: "Occupational Health & Safety Audit",
    dept: "Manufacturing", scope: "Manufacturing", auditor: "Internal EHS Team",
    started: "Apr 14, 2026", end: "Apr 30, 2026", status: "Completed",
    objective: "Evaluate workplace safety procedures and PPE compliance across manufacturing floor operations.",
    timeline: [
      { label: "Kickoff & document review", status: "done" },
      { label: "Floor walkthroughs", status: "done" },
      { label: "Findings review", status: "done" },
      { label: "Final report", status: "done" },
    ],
    findings: [
      { severity: "Medium", title: "Fire safety inspection follow-up required", description: "Follow-up inspection needed on Plant 1 fire suppression system, tracked as compliance issue CI-124.", linkedIssue: "CI-124" },
    ],
    activity: ["Audit scheduled — Mar 20, 2026", "Kickoff meeting held — Apr 14, 2026", "Final report issued — Apr 30, 2026"],
  },
  "AUD-2026-05": {
    name: "Whistleblower Program Effectiveness Review",
    dept: "Human Resources", scope: "Human Resources", auditor: "Internal Audit",
    started: "May 4, 2026", end: "May 20, 2026", status: "Completed",
    objective: "Assess awareness and effectiveness of the whistleblower reporting channel across the organization.",
    timeline: [
      { label: "Kickoff & document review", status: "done" },
      { label: "Employee survey", status: "done" },
      { label: "Findings review", status: "done" },
      { label: "Final report", status: "done" },
    ],
    findings: [
      { severity: "Medium", title: "Whistleblower policy annual review overdue", description: "Policy review cadence had lapsed, tracked as compliance issue CI-119.", linkedIssue: "CI-119" },
    ],
    activity: ["Audit scheduled — Apr 10, 2026", "Kickoff meeting held — May 4, 2026", "Final report issued — May 20, 2026"],
  },
  "AUD-2026-06": {
    name: "Fleet Emissions Compliance Audit",
    dept: "Logistics", scope: "Logistics", auditor: "TÜV Rheinland",
    started: "May 28, 2026", end: "Jun 12, 2026", status: "Completed",
    objective: "Verify fleet vehicles meet current emissions permitting requirements.",
    timeline: [
      { label: "Kickoff & document review", status: "done" },
      { label: "Fleet inspection", status: "done" },
      { label: "Findings review", status: "done" },
      { label: "Final report", status: "done" },
    ],
    findings: [
      { severity: "High", title: "Fleet emissions permit renewal pending", description: "Renewal for the logistics fleet permit is pending, tracked as compliance issue CI-138.", linkedIssue: "CI-138" },
    ],
    activity: ["Audit scheduled — Apr 25, 2026", "Kickoff meeting held — May 28, 2026", "Final report issued — Jun 12, 2026"],
  },
  "AUD-2026-07": {
    name: "Data Privacy & Vendor Contracts Audit",
    dept: "IT & Digital", scope: "IT & Digital", auditor: "Internal Compliance Team",
    started: "Jun 15, 2026", end: "Jul 25, 2026", status: "In progress",
    objective: "Review vendor data-processing agreements and third-party risk assessments for compliance with the Data Privacy Policy.",
    timeline: [
      { label: "Kickoff & document review", status: "done" },
      { label: "Vendor contract review", status: "progress" },
      { label: "Findings review", status: "pending" },
      { label: "Final report", status: "pending" },
    ],
    findings: [
      { severity: "High", title: "Data privacy policy gap in vendor contracts", description: "Several vendor contracts lack required data-processing terms, tracked as compliance issue CI-129.", linkedIssue: "CI-129" },
      { severity: "Medium", title: "Third-party vendor risk assessment overdue", description: "Risk assessments for two vendors are overdue, tracked as compliance issue CI-102.", linkedIssue: "CI-102" },
    ],
    activity: ["Audit scheduled — May 15, 2026", "Kickoff meeting held — Jun 15, 2026", "Vendor contract review in progress — Jul 1, 2026"],
  },
  "AUD-2026-08": {
    name: "Wastewater Discharge Compliance Audit",
    dept: "Manufacturing", scope: "Manufacturing", auditor: "Environmental Resources Management",
    started: "Jun 20, 2026", end: "Jul 18, 2026", status: "In progress",
    objective: "Assess wastewater discharge practices at Plant 1 against permit requirements.",
    timeline: [
      { label: "Kickoff & document review", status: "done" },
      { label: "Site sampling", status: "progress" },
      { label: "Findings review", status: "pending" },
      { label: "Final report", status: "pending" },
    ],
    findings: [
      { severity: "Critical", title: "Wastewater discharge report overdue", description: "Quarterly discharge report has not been filed, tracked as compliance issue CI-142.", linkedIssue: "CI-142" },
    ],
    activity: ["Audit scheduled — May 30, 2026", "Kickoff meeting held — Jun 20, 2026", "Site sampling in progress — Jul 5, 2026"],
  },
  "AUD-2026-09": {
    name: "Governance & Board Oversight Review",
    dept: "Corporate HQ", scope: "Corporate HQ", auditor: "Deloitte",
    started: "Jul 1, 2026", end: "Aug 10, 2026", status: "In progress",
    objective: "Review board governance practices, oversight committees, and disclosure controls.",
    timeline: [
      { label: "Kickoff & document review", status: "progress" },
      { label: "Interviews", status: "pending" },
      { label: "Findings review", status: "pending" },
      { label: "Final report", status: "pending" },
    ],
    findings: [],
    activity: ["Audit scheduled — Jun 10, 2026", "Kickoff meeting held — Jul 1, 2026"],
  },
  "AUD-2026-10": {
    name: "ISO 45001 Health & Safety Recertification",
    dept: "Manufacturing", scope: "Manufacturing", auditor: "SGS Global",
    started: "—", end: "Aug 3, 2026", status: "Scheduled",
    objective: "Recertify occupational health and safety management system against ISO 45001 requirements.",
    timeline: [
      { label: "Kickoff & document review", status: "pending" },
      { label: "Site visits", status: "pending" },
      { label: "Findings review", status: "pending" },
      { label: "Final report", status: "pending" },
    ],
    findings: [],
    activity: ["Audit scheduled — Jun 28, 2026"],
  },
};

const TIMELINE_ICON = {
  done: { Icon: CheckCircle2, className: "text-emerald-600 bg-emerald-500/10" },
  progress: { Icon: Clock, className: "text-amber-600 bg-amber-500/10" },
  pending: { Icon: Circle, className: "text-muted-foreground bg-muted" },
};

function AuditDetail() {
  const { auditId } = Route.useParams();
  const audit = Route.useLoaderData();

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-8 w-full">
      <Link to="/dashboard/governance/audits" className="flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Audits
      </Link>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{audit.name}</h1>
          <p className="text-muted-foreground mt-1">{auditId} · {audit.dept}</p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={audit.status} />
          <Button variant="outline">Download report</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-[140px_1fr] gap-y-3 text-sm">
              <dt className="text-muted-foreground">Scope</dt>
              <dd>{audit.scope}</dd>
              <dt className="text-muted-foreground">Auditor</dt>
              <dd>{audit.auditor}</dd>
              <dt className="text-muted-foreground">Started</dt>
              <dd className="tabular-nums">{audit.started}</dd>
              <dt className="text-muted-foreground">{audit.status === "Completed" ? "Completed" : "Estimated completion"}</dt>
              <dd className="tabular-nums">{audit.end}</dd>
              <dt className="text-muted-foreground">Objective</dt>
              <dd>{audit.objective}</dd>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {audit.timeline.map((step) => {
              const { Icon, className } = TIMELINE_ICON[step.status];
              return (
                <div key={step.label} className="flex items-center gap-3">
                  <span className={`flex size-7 shrink-0 items-center justify-center rounded-full ${className}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm">{step.label}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Findings</CardTitle>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium">{audit.findings.length}</span>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {audit.findings.length === 0 ? (
              <p className="text-sm text-muted-foreground">No findings recorded yet.</p>
            ) : (
              audit.findings.map((f) => (
                <div key={f.title} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <SeverityBadge severity={f.severity} />
                    <p className="font-medium text-sm">{f.title}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>
                  {f.linkedIssue && (
                    <Link
                      to="/dashboard/governance/compliance-issues/$issueId"
                      params={{ issueId: f.linkedIssue }}
                      className="mt-1 inline-block text-sm text-governance hover:underline"
                    >
                      View compliance issue {f.linkedIssue} →
                    </Link>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity history</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {audit.activity.map((entry) => (
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
