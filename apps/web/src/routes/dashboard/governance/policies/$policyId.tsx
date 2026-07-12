import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/dashboard/governance/policies/$policyId")({
  component: PolicyDetail,
  loader: ({ params }) => {
    const policy = POLICIES[params.policyId];
    if (!policy) throw notFound();
    return policy;
  },
});

interface PolicyDetailData {
  title: string;
  category: string;
  version: string;
  owner: string;
  effective: string;
  status: string;
  required: number;
  acked: number;
  description: string;
  doc: string;
  history: { version: string; date: string; note: string }[];
  pending: { dept: string; count: number }[];
}

const POLICIES: Record<string, PolicyDetailData> = {
  "POL-014": {
    title: "Code of Business Conduct & Ethics",
    category: "Business Ethics",
    version: "v3.2",
    owner: "Sarah Coleman",
    effective: "Jan 15, 2026",
    status: "Active",
    required: 847,
    acked: 813,
    description: "Sets the baseline standard of conduct expected of every employee, contractor, and board member, covering conflicts of interest, gifts and entertainment, confidentiality, and use of company assets.",
    doc: "This Code of Business Conduct & Ethics applies to all Meridian Industries employees worldwide. It establishes expectations around honest dealing, conflicts of interest, protection of confidential information, fair competition, and reporting of suspected violations through the whistleblower channel. Employees who identify a potential conflict of interest must disclose it to their manager or the Ethics Office within 5 business days.",
    history: [
      { version: "v3.2", date: "Jan 15, 2026", note: "Clarified gift and entertainment thresholds" },
      { version: "v3.1", date: "Jul 1, 2025", note: "Added remote work confidentiality guidance" },
      { version: "v3.0", date: "Jan 1, 2025", note: "Annual review, no material changes" },
    ],
    pending: [
      { dept: "Manufacturing", count: 15 },
      { dept: "Sales & Marketing", count: 9 },
      { dept: "Logistics", count: 6 },
      { dept: "R&D", count: 4 },
    ],
  },
  "POL-021": {
    title: "Data Privacy & Protection Policy",
    category: "Data Privacy",
    version: "v2.1",
    owner: "Fatima Noor",
    effective: "Jun 1, 2026",
    status: "Active",
    required: 847,
    acked: 661,
    description: "Governs how personal data of employees, customers, and partners is collected, stored, and processed, including vendor and third-party contract requirements.",
    doc: "This policy defines minimum data protection standards across all systems handling personal data, including retention limits, breach notification timelines, and vendor due diligence requirements. Vendor contracts lacking adequate data processing terms are tracked as compliance issue CI-129 pending remediation.",
    history: [
      { version: "v2.1", date: "Jun 1, 2026", note: "Added vendor contract data-processing addendum requirement" },
      { version: "v2.0", date: "Jan 1, 2025", note: "Aligned with updated regional privacy regulations" },
    ],
    pending: [
      { dept: "IT & Digital", count: 22 },
      { dept: "Sales & Marketing", count: 41 },
      { dept: "Manufacturing", count: 63 },
      { dept: "Logistics", count: 34 },
    ],
  },
  "POL-009": {
    title: "Anti-Bribery & Anti-Corruption Policy",
    category: "Anti-Corruption",
    version: "v4.0",
    owner: "Sarah Coleman",
    effective: "Mar 1, 2025",
    status: "Active",
    required: 847,
    acked: 838,
    description: "Prohibits offering, giving, soliciting, or receiving bribes in any form, and establishes due diligence requirements for third-party intermediaries.",
    doc: "Applies to all interactions with government officials, customers, and suppliers. Facilitation payments are strictly prohibited. All third-party agents and distributors must complete anti-corruption due diligence screening before engagement, tracked historically as compliance issue CI-088.",
    history: [
      { version: "v4.0", date: "Mar 1, 2025", note: "Expanded third-party due diligence requirements" },
      { version: "v3.0", date: "Mar 1, 2023", note: "Annual review" },
    ],
    pending: [
      { dept: "Sales & Marketing", count: 5 },
      { dept: "Manufacturing", count: 4 },
    ],
  },
  "POL-033": {
    title: "Whistleblower Protection Policy",
    category: "Whistleblower",
    version: "v1.4",
    owner: "Priya Anand",
    effective: "Feb 1, 2026",
    status: "Active",
    required: 847,
    acked: 771,
    description: "Protects employees who report suspected misconduct in good faith from retaliation, and outlines confidential reporting channels.",
    doc: "Reports may be submitted anonymously through the ethics hotline or directly to Internal Audit. This policy's effectiveness is reviewed annually — see audit AUD-2026-05 for the most recent program effectiveness review, which identified findings tracked as compliance issue CI-119.",
    history: [
      { version: "v1.4", date: "Feb 1, 2026", note: "Added anonymous hotline option" },
      { version: "v1.3", date: "Feb 1, 2025", note: "Clarified retaliation examples" },
    ],
    pending: [
      { dept: "Human Resources", count: 3 },
      { dept: "R&D", count: 18 },
      { dept: "Manufacturing", count: 40 },
    ],
  },
  "POL-018": {
    title: "Health & Safety Management Policy",
    category: "Health & Safety",
    version: "v5.1",
    owner: "Robert Alvarez",
    effective: "Apr 10, 2026",
    status: "Active",
    required: 847,
    acked: 796,
    description: "Establishes workplace safety standards, incident reporting procedures, and PPE requirements across all manufacturing and logistics sites.",
    doc: "Covers machine guarding, chemical handling, fire safety, and incident escalation procedures. Findings from occupational health and safety audits (e.g. AUD-2026-04) feed directly into this policy's periodic review cycle.",
    history: [
      { version: "v5.1", date: "Apr 10, 2026", note: "Updated PPE requirements for Plant 2" },
      { version: "v5.0", date: "Oct 1, 2025", note: "Consolidated site-specific safety addenda" },
    ],
    pending: [
      { dept: "Manufacturing", count: 38 },
      { dept: "Logistics", count: 13 },
    ],
  },
  "POL-027": {
    title: "Supplier Code of Conduct",
    category: "Supply Chain",
    version: "v2.0",
    owner: "Marcus Webb",
    effective: "May 1, 2026",
    status: "Active",
    required: 847,
    acked: 745,
    description: "Sets ethical, labor, and environmental expectations for suppliers and requires periodic re-certification for high-risk vendors.",
    doc: "Suppliers must attest to fair labor practices, conflict-minerals sourcing standards, and environmental compliance. Re-certification gaps are tracked as compliance issue CI-135, identified during audit AUD-2026-03.",
    history: [
      { version: "v2.0", date: "May 1, 2026", note: "Added conflict-minerals attestation requirement" },
      { version: "v1.0", date: "May 1, 2024", note: "Initial publication" },
    ],
    pending: [
      { dept: "Sales & Marketing", count: 31 },
      { dept: "Logistics", count: 22 },
    ],
  },
  "POL-011": {
    title: "Diversity, Equity & Inclusion Policy",
    category: "HR & Labor",
    version: "v1.2",
    owner: "Priya Anand",
    effective: "Jan 1, 2026",
    status: "Active",
    required: 847,
    acked: 822,
    description: "Commits the organization to equitable hiring, promotion, and pay practices, and outlines reporting channels for discrimination concerns.",
    doc: "Sets annual representation goals reviewed by the Diversity Council and referenced in the Diversity Metrics dashboard's leadership-representation tracking.",
    history: [
      { version: "v1.2", date: "Jan 1, 2026", note: "Added pay equity review cadence" },
      { version: "v1.1", date: "Jan 1, 2025", note: "Expanded reporting channels" },
    ],
    pending: [
      { dept: "Manufacturing", count: 20 },
      { dept: "R&D", count: 5 },
    ],
  },
  "POL-040": {
    title: "Environmental Management Policy",
    category: "Environmental",
    version: "v3.0",
    owner: "David Okafor",
    effective: "Jan 1, 2026",
    status: "Active",
    required: 847,
    acked: 805,
    description: "Defines organization-wide environmental management commitments including emissions reduction targets and waste handling standards.",
    doc: "Aligns with ISO 14001 certification requirements (see audit AUD-2026-01) and sets the framework under which site-specific environmental permits, including fleet emissions, are managed.",
    history: [
      { version: "v3.0", date: "Jan 1, 2026", note: "Updated emissions reduction targets" },
      { version: "v2.0", date: "Jan 1, 2024", note: "ISO 14001 alignment" },
    ],
    pending: [
      { dept: "Manufacturing", count: 30 },
      { dept: "Logistics", count: 12 },
    ],
  },
  "POL-005": {
    title: "Fleet Emissions & Compliance Policy",
    category: "Environmental",
    version: "v1.0",
    owner: "Elena Petrova",
    effective: "Jun 15, 2026",
    status: "Under review",
    required: 847,
    acked: 694,
    description: "Sets emissions thresholds and permitting requirements for the logistics fleet, currently under review pending renewal of key permits.",
    doc: "Fleet emissions permit renewal is pending, tracked as compliance issue CI-138 following findings from audit AUD-2026-06. This policy is under review until the renewal is finalized.",
    history: [
      { version: "v1.0", date: "Jun 15, 2026", note: "Initial publication, pending permit renewal review" },
    ],
    pending: [
      { dept: "Logistics", count: 45 },
      { dept: "Manufacturing", count: 108 },
    ],
  },
};

function PolicyDetail() {
  const { policyId } = Route.useParams();
  const policy = Route.useLoaderData();
  const ackPct = Math.round((policy.acked / policy.required) * 100);
  const ringColor = ackPct >= 90 ? "text-emerald-500" : ackPct >= 80 ? "text-amber-500" : "text-destructive";
  const circumference = 2 * Math.PI * 68;
  const offset = circumference - (ackPct / 100) * circumference;

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-8 w-full">
      <Link to="/dashboard/governance/policies" className="flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        ESG Policies
      </Link>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{policy.title}</h1>
          <p className="text-muted-foreground mt-1">{policyId} · {policy.category}</p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={policy.status} />
          <Button variant="outline" render={<Link to="/dashboard/governance/policy-acknowledgements" />}>
            View acknowledgements
          </Button>
          <Button>Edit policy</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
        <Card>
          <CardHeader>
            <CardTitle>Acknowledgement progress</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <svg viewBox="0 0 160 160" className="h-40 w-40 -rotate-90">
              <circle cx="80" cy="80" r="68" fill="none" strokeWidth="14" className="stroke-muted" />
              <circle
                cx="80"
                cy="80"
                r="68"
                fill="none"
                strokeWidth="14"
                strokeLinecap="round"
                className={ringColor}
                stroke="currentColor"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
              />
            </svg>
            <div className="-mt-28 text-center">
              <p className="text-3xl font-bold">{ackPct}%</p>
              <p className="text-xs text-muted-foreground">Acknowledged</p>
            </div>
            <div className="mt-16 grid w-full grid-cols-3 divide-x text-center">
              <div>
                <p className="text-lg font-semibold">{policy.required}</p>
                <p className="text-xs text-muted-foreground">Required</p>
              </div>
              <div>
                <p className="text-lg font-semibold">{policy.acked}</p>
                <p className="text-xs text-muted-foreground">Acknowledged</p>
              </div>
              <div>
                <p className="text-lg font-semibold">{policy.required - policy.acked}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Policy details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-[120px_1fr] gap-y-3 text-sm">
              <dt className="text-muted-foreground">Category</dt>
              <dd>{policy.category}</dd>
              <dt className="text-muted-foreground">Version</dt>
              <dd className="font-mono">{policy.version}</dd>
              <dt className="text-muted-foreground">Owner</dt>
              <dd>{policy.owner}</dd>
              <dt className="text-muted-foreground">Effective date</dt>
              <dd>{policy.effective}</dd>
              <dt className="text-muted-foreground">Summary</dt>
              <dd>{policy.description}</dd>
            </dl>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Policy document</CardTitle>
          <StatusBadge status="Preview" className="text-muted-foreground border-border bg-muted" />
        </CardHeader>
        <CardContent>
          <p className="rounded-md border bg-muted/30 p-4 text-sm leading-relaxed text-muted-foreground">
            {policy.doc}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Version history</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {policy.history.map((h) => (
              <div key={h.version} className="flex items-start justify-between gap-4 border-b pb-3 last:border-0 last:pb-0">
                <div>
                  <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{h.version}</span>
                  <p className="mt-1 text-sm">{h.note}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{h.date}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending acknowledgement by department</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {policy.pending.map((row) => (
              <div key={row.dept} className="flex items-center gap-3">
                <span className="w-32 shrink-0 text-sm">{row.dept}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-amber-500" style={{ width: `${Math.min(100, row.count * 2)}%` }} />
                </div>
                <span className="w-6 shrink-0 text-right text-sm font-medium">{row.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
