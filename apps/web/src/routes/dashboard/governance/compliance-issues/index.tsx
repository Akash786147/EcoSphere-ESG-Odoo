import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { StatTile } from "@/components/shared/stat-tile";
import { StatusBadge, SeverityBadge } from "@/components/shared/status-badge";
import { Search, Plus, Info } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/governance/compliance-issues/")({
  component: ComplianceIssues,
});

const DEPARTMENTS = ["Human Resources", "R&D", "IT & Digital", "Sales & Marketing", "Manufacturing", "Logistics"];
const AUDITS = ["AUD-2026-07", "AUD-2026-08", "AUD-2026-09"];

const mockIssues = [
  { id: "CI-142", audit: "AUD-2026-08", severity: "Critical", desc: "Wastewater discharge report overdue", owner: "Robert Alvarez", dept: "Manufacturing", due: "Jul 8, 2026", status: "Overdue" },
  { id: "CI-138", audit: "AUD-2026-06", severity: "High", desc: "Fleet emissions permit renewal pending", owner: "Elena Petrova", dept: "Logistics", due: "Jul 15, 2026", status: "In progress" },
  { id: "CI-135", audit: "AUD-2026-03", severity: "High", desc: "Supplier code of conduct re-certification", owner: "Marcus Webb", dept: "Sales & Marketing", due: "Jul 20, 2026", status: "In progress" },
  { id: "CI-129", audit: "AUD-2026-07", severity: "High", desc: "Data privacy policy gap — vendor contracts", owner: "Fatima Noor", dept: "IT & Digital", due: "Jun 30, 2026", status: "Overdue" },
  { id: "CI-124", audit: "AUD-2026-04", severity: "Medium", desc: "Fire safety inspection follow-up", owner: "Robert Alvarez", dept: "Manufacturing", due: "Aug 5, 2026", status: "Open" },
  { id: "CI-119", audit: "AUD-2026-05", severity: "Medium", desc: "Whistleblower policy annual review", owner: "Priya Anand", dept: "Human Resources", due: "Aug 12, 2026", status: "Open" },
  { id: "CI-115", audit: "—", severity: "Medium", desc: "Chemical storage documentation incomplete", owner: "Daniel Cho", dept: "R&D", due: "Jul 25, 2026", status: "Open" },
  { id: "CI-102", audit: "AUD-2026-07", severity: "Medium", desc: "Third-party vendor risk assessment overdue", owner: "Fatima Noor", dept: "IT & Digital", due: "Jun 20, 2026", status: "Overdue" },
  { id: "CI-108", audit: "—", severity: "Low", desc: "Signage update — safety exits", owner: "Elena Petrova", dept: "Logistics", due: "Sep 1, 2026", status: "Open" },
  { id: "CI-095", audit: "AUD-2026-04", severity: "Low", desc: "Machine guarding signage outdated", owner: "Robert Alvarez", dept: "Manufacturing", due: "May 15, 2026", status: "Resolved" },
  { id: "CI-088", audit: "—", severity: "Medium", desc: "Anti-corruption training completion gap", owner: "Marcus Webb", dept: "Sales & Marketing", due: "Apr 1, 2026", status: "Closed" },
];

function ComplianceIssues() {
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("All");
  const [status, setStatus] = useState("All");
  const [dept, setDept] = useState("All");
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState("");

  const filtered = mockIssues.filter((i) => {
    const q = search.toLowerCase();
    if (q && !i.id.toLowerCase().includes(q) && !i.desc.toLowerCase().includes(q)) return false;
    if (severity !== "All" && i.severity !== severity) return false;
    if (status !== "All" && i.status !== status) return false;
    if (dept !== "All" && i.dept !== dept) return false;
    return true;
  });

  const open_ = mockIssues.filter((i) => i.status === "Open" || i.status === "In progress" || i.status === "Overdue").length;
  const overdue = mockIssues.filter((i) => i.status === "Overdue").length;
  const critical = mockIssues.filter((i) => i.severity === "Critical").length;
  const resolved = mockIssues.filter((i) => i.status === "Resolved").length;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const owner = String(form.get("owner") || "").trim();
    const due = String(form.get("due") || "").trim();
    if (!owner || !due) {
      setFormError("Owner and due date are required to save this issue.");
      return;
    }
    setFormError("");
    setOpen(false);
    toast.success(`Compliance issue created and assigned to ${owner}`);
  }

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Compliance issues</h1>
          <p className="text-muted-foreground mt-1">Findings from audits and internal reviews, tracked to resolution.</p>
        </div>
        <Sheet open={open} onOpenChange={(v) => { setOpen(v); if (!v) setFormError(""); }}>
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New issue
          </Button>
          <SheetContent>
            <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
              <SheetHeader>
                <SheetTitle>New issue</SheetTitle>
              </SheetHeader>
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4">
                <div className="flex items-start gap-2 rounded-md border bg-muted/30 p-3 text-xs text-muted-foreground">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  Issues without an owner and due date cannot be saved. Open issues past their due date are automatically flagged as overdue.
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Description *</Label>
                  <Input name="desc" required placeholder="Brief description of the issue" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Severity *</Label>
                  <NativeSelect name="severity" defaultValue="Medium">
                    <NativeSelectOption value="Critical">Critical</NativeSelectOption>
                    <NativeSelectOption value="High">High</NativeSelectOption>
                    <NativeSelectOption value="Medium">Medium</NativeSelectOption>
                    <NativeSelectOption value="Low">Low</NativeSelectOption>
                  </NativeSelect>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Linked audit</Label>
                  <NativeSelect name="linkedAudit" defaultValue="">
                    <NativeSelectOption value="">None</NativeSelectOption>
                    {AUDITS.map((a) => (
                      <NativeSelectOption key={a} value={a}>{a}</NativeSelectOption>
                    ))}
                  </NativeSelect>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Owner *</Label>
                  <Input name="owner" placeholder="Issue owner" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Department *</Label>
                  <NativeSelect name="dept" required defaultValue="">
                    <NativeSelectOption value="" disabled>Select department</NativeSelectOption>
                    {DEPARTMENTS.map((d) => (
                      <NativeSelectOption key={d} value={d}>{d}</NativeSelectOption>
                    ))}
                  </NativeSelect>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Due date *</Label>
                  <Input name="due" type="date" />
                </div>
                {formError && (
                  <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                    {formError}
                  </div>
                )}
              </div>
              <SheetFooter className="flex-row justify-end gap-2">
                <SheetClose render={<Button type="button" variant="outline">Cancel</Button>} />
                <Button type="submit">Save issue</Button>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Open" value={open_} />
        <StatTile label="Overdue" value={overdue} deltaTone="negative" />
        <StatTile label="Critical" value={critical} />
        <StatTile label="Resolved this year" value={resolved} />
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <CardTitle className="text-lg font-semibold">All issues</CardTitle>
            <div className="flex flex-wrap gap-2">
              <div className="relative w-full sm:w-56">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search issue ID or description…"
                  className="pl-8"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <NativeSelect value={severity} onChange={(e) => setSeverity(e.target.value)}>
                <NativeSelectOption value="All">All severities</NativeSelectOption>
                <NativeSelectOption value="Critical">Critical</NativeSelectOption>
                <NativeSelectOption value="High">High</NativeSelectOption>
                <NativeSelectOption value="Medium">Medium</NativeSelectOption>
                <NativeSelectOption value="Low">Low</NativeSelectOption>
              </NativeSelect>
              <NativeSelect value={status} onChange={(e) => setStatus(e.target.value)}>
                <NativeSelectOption value="All">All statuses</NativeSelectOption>
                <NativeSelectOption value="Overdue">Overdue</NativeSelectOption>
                <NativeSelectOption value="Open">Open</NativeSelectOption>
                <NativeSelectOption value="In progress">In progress</NativeSelectOption>
                <NativeSelectOption value="Resolved">Resolved</NativeSelectOption>
                <NativeSelectOption value="Closed">Closed</NativeSelectOption>
              </NativeSelect>
              <NativeSelect value={dept} onChange={(e) => setDept(e.target.value)}>
                <NativeSelectOption value="All">All departments</NativeSelectOption>
                {DEPARTMENTS.map((d) => (
                  <NativeSelectOption key={d} value={d}>{d}</NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Issue</TableHead>
                  <TableHead>Audit</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Due date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell>
                      <Link to="/dashboard/governance/compliance-issues/$issueId" params={{ issueId: issue.id }} className="block">
                        <span className="font-mono text-xs">{issue.id}</span>
                        <p className="font-medium">{issue.desc}</p>
                      </Link>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{issue.audit}</TableCell>
                    <TableCell><SeverityBadge severity={issue.severity} /></TableCell>
                    <TableCell className="text-muted-foreground">{issue.owner}</TableCell>
                    <TableCell className="text-muted-foreground">{issue.dept}</TableCell>
                    <TableCell className="text-muted-foreground">{issue.due}</TableCell>
                    <TableCell><StatusBadge status={issue.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">No issues match your filters.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
