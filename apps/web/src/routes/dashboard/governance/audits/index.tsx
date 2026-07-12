import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { StatusBadge } from "@/components/shared/status-badge";
import { Search, Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/governance/audits/")({
  component: Audits,
});

const DEPARTMENTS = ["Human Resources", "R&D", "IT & Digital", "Sales & Marketing", "Manufacturing", "Logistics", "Corporate HQ"];

const mockAudits = [
  { id: "AUD-2026-01", name: "ISO 14001 Environmental Management Recertification", dept: "Manufacturing", auditor: "SGS Global", started: "Jan 5, 2026", end: "Jan 22, 2026", findings: 2, status: "Completed" },
  { id: "AUD-2026-02", name: "Annual Data Privacy Compliance Audit", dept: "IT & Digital", auditor: "Internal Compliance Team", started: "Feb 2, 2026", end: "Feb 18, 2026", findings: 1, status: "Completed" },
  { id: "AUD-2026-03", name: "Supplier Ethical Sourcing Audit", dept: "Sales & Marketing", auditor: "Bureau Veritas", started: "Mar 9, 2026", end: "Mar 27, 2026", findings: 3, status: "Completed" },
  { id: "AUD-2026-04", name: "Occupational Health & Safety Audit", dept: "Manufacturing", auditor: "Internal EHS Team", started: "Apr 14, 2026", end: "Apr 30, 2026", findings: 1, status: "Completed" },
  { id: "AUD-2026-05", name: "Whistleblower Program Effectiveness Review", dept: "Human Resources", auditor: "Internal Audit", started: "May 4, 2026", end: "May 20, 2026", findings: 1, status: "Completed" },
  { id: "AUD-2026-06", name: "Fleet Emissions Compliance Audit", dept: "Logistics", auditor: "TÜV Rheinland", started: "May 28, 2026", end: "Jun 12, 2026", findings: 1, status: "Completed" },
  { id: "AUD-2026-07", name: "Data Privacy & Vendor Contracts Audit", dept: "IT & Digital", auditor: "Internal Compliance Team", started: "Jun 15, 2026", end: "Jul 25, 2026", findings: 2, status: "In progress" },
  { id: "AUD-2026-08", name: "Wastewater Discharge Compliance Audit", dept: "Manufacturing", auditor: "Environmental Resources Management", started: "Jun 20, 2026", end: "Jul 18, 2026", findings: 1, status: "In progress" },
  { id: "AUD-2026-09", name: "Governance & Board Oversight Review", dept: "Corporate HQ", auditor: "Deloitte", started: "Jul 1, 2026", end: "Aug 10, 2026", findings: 0, status: "In progress" },
  { id: "AUD-2026-10", name: "ISO 45001 Health & Safety Recertification", dept: "Manufacturing", auditor: "SGS Global", started: "—", end: "Aug 3, 2026", findings: 0, status: "Scheduled" },
];

function Audits() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [dept, setDept] = useState("All");
  const [open, setOpen] = useState(false);

  const filtered = mockAudits.filter((a) => {
    const q = search.toLowerCase();
    if (q && !a.name.toLowerCase().includes(q) && !a.auditor.toLowerCase().includes(q)) return false;
    if (status !== "All" && a.status !== status) return false;
    if (dept !== "All" && a.dept !== dept) return false;
    return true;
  });

  const completed = mockAudits.filter((a) => a.status === "Completed").length;
  const inProgress = mockAudits.filter((a) => a.status === "In progress").length;
  const scheduled = mockAudits.filter((a) => a.status === "Scheduled").length;
  const totalFindings = mockAudits.reduce((sum, a) => sum + a.findings, 0);

  function handleSchedule(e: React.FormEvent) {
    e.preventDefault();
    setOpen(false);
    toast.success("Audit scheduled");
  }

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audits</h1>
          <p className="text-muted-foreground mt-1">
            Internal and third-party audits across environmental, safety, privacy, and governance domains.
          </p>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Schedule audit
          </Button>
          <SheetContent>
            <form onSubmit={handleSchedule} className="flex flex-1 flex-col overflow-hidden">
              <SheetHeader>
                <SheetTitle>Schedule audit</SheetTitle>
              </SheetHeader>
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4">
                <div className="flex flex-col gap-1.5">
                  <Label>Audit name *</Label>
                  <Input required placeholder="e.g. Annual Data Privacy Compliance Audit" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Scope / department *</Label>
                  <NativeSelect required defaultValue="">
                    <NativeSelectOption value="" disabled>Select department</NativeSelectOption>
                    {DEPARTMENTS.map((d) => (
                      <NativeSelectOption key={d} value={d}>{d}</NativeSelectOption>
                    ))}
                  </NativeSelect>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Auditor *</Label>
                  <Input required placeholder="e.g. SGS Global" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label>Start date *</Label>
                    <Input required type="date" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Estimated completion *</Label>
                    <Input required type="date" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Notes</Label>
                  <Textarea placeholder="Optional context for this audit" />
                </div>
              </div>
              <SheetFooter className="flex-row justify-end gap-2">
                <SheetClose render={<Button type="button" variant="outline">Cancel</Button>} />
                <Button type="submit">Schedule audit</Button>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Completed this year" value={completed} />
        <StatTile label="In progress" value={inProgress} delta="Est. completion by Aug 10" />
        <StatTile label="Scheduled" value={scheduled} />
        <StatTile label="Findings → open issues" value={totalFindings} delta="of 9 open compliance issues" />
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <CardTitle className="text-lg font-semibold">All audits</CardTitle>
            <div className="flex flex-wrap gap-2">
              <div className="relative w-full sm:w-56">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search audit name or auditor…"
                  className="pl-8"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <NativeSelect value={status} onChange={(e) => setStatus(e.target.value)}>
                <NativeSelectOption value="All">All statuses</NativeSelectOption>
                <NativeSelectOption value="Completed">Completed</NativeSelectOption>
                <NativeSelectOption value="In progress">In progress</NativeSelectOption>
                <NativeSelectOption value="Scheduled">Scheduled</NativeSelectOption>
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
                  <TableHead>Audit</TableHead>
                  <TableHead>Auditor</TableHead>
                  <TableHead>Started</TableHead>
                  <TableHead>Completed / Est.</TableHead>
                  <TableHead className="text-right">Findings</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((audit) => (
                  <TableRow key={audit.id} className="cursor-pointer">
                    <TableCell>
                      <Link to="/dashboard/governance/audits/$auditId" params={{ auditId: audit.id }} className="block">
                        <span className="font-medium">{audit.name}</span>
                        <p className="font-mono text-xs text-muted-foreground">{audit.id} · {audit.dept}</p>
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{audit.auditor}</TableCell>
                    <TableCell className="text-muted-foreground">{audit.started}</TableCell>
                    <TableCell className="text-muted-foreground">{audit.end}</TableCell>
                    <TableCell className="text-right">{audit.findings || "—"}</TableCell>
                    <TableCell>
                      <StatusBadge status={audit.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">No audits match your filters.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
