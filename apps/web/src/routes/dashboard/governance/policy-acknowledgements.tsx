import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/shared/status-badge";
import { Search, Bell } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/governance/policy-acknowledgements")({
  component: PolicyAcknowledgements,
});

const POLICIES = [
  "Data Privacy & Protection Policy",
  "Whistleblower Protection Policy",
  "Supplier Code of Conduct",
  "Fleet Emissions & Compliance Policy",
  "Health & Safety Management Policy",
];
const DEPARTMENTS = ["Human Resources", "R&D", "IT & Digital", "Sales & Marketing", "Manufacturing", "Logistics"];

const mockRecords = [
  { employee: "Marcus Webb", dept: "Sales & Marketing", policy: "Data Privacy & Protection Policy", version: "v2.1", assigned: "Jun 1, 2026", acked: null, status: "Overdue" },
  { employee: "Priya Anand", dept: "Human Resources", policy: "Whistleblower Protection Policy", version: "v1.4", assigned: "Feb 1, 2026", acked: "Feb 3, 2026", status: "Acknowledged" },
  { employee: "Daniel Cho", dept: "R&D", policy: "Supplier Code of Conduct", version: "v2.0", assigned: "May 1, 2026", acked: null, status: "Pending" },
  { employee: "Elena Petrova", dept: "Logistics", policy: "Fleet Emissions & Compliance Policy", version: "v1.0", assigned: "Jun 15, 2026", acked: null, status: "Pending" },
  { employee: "Robert Alvarez", dept: "Manufacturing", policy: "Health & Safety Management Policy", version: "v5.1", assigned: "Apr 10, 2026", acked: "Apr 12, 2026", status: "Acknowledged" },
  { employee: "Fatima Noor", dept: "IT & Digital", policy: "Data Privacy & Protection Policy", version: "v2.1", assigned: "Jun 1, 2026", acked: null, status: "Overdue" },
  { employee: "Aisha Rahman", dept: "Human Resources", policy: "Whistleblower Protection Policy", version: "v1.4", assigned: "Feb 1, 2026", acked: "Feb 5, 2026", status: "Acknowledged" },
  { employee: "David Chen", dept: "Manufacturing", policy: "Health & Safety Management Policy", version: "v5.1", assigned: "Apr 10, 2026", acked: null, status: "Pending" },
  { employee: "Liu Wei", dept: "R&D", policy: "Supplier Code of Conduct", version: "v2.0", assigned: "May 1, 2026", acked: "May 4, 2026", status: "Acknowledged" },
  { employee: "Omar Farouk", dept: "Logistics", policy: "Fleet Emissions & Compliance Policy", version: "v1.0", assigned: "Jun 15, 2026", acked: null, status: "Overdue" },
  { employee: "Ivan Petrenko", dept: "Sales & Marketing", policy: "Data Privacy & Protection Policy", version: "v2.1", assigned: "Jun 1, 2026", acked: null, status: "Pending" },
  { employee: "Sofia Reyes", dept: "IT & Digital", policy: "Whistleblower Protection Policy", version: "v1.4", assigned: "Feb 1, 2026", acked: "Feb 6, 2026", status: "Acknowledged" },
  { employee: "Jake Whitfield", dept: "Sales & Marketing", policy: "Supplier Code of Conduct", version: "v2.0", assigned: "May 1, 2026", acked: null, status: "Overdue" },
  { employee: "Maya Lindström", dept: "R&D", policy: "Health & Safety Management Policy", version: "v5.1", assigned: "Apr 10, 2026", acked: "Apr 15, 2026", status: "Acknowledged" },
];

function PolicyAcknowledgements() {
  const [search, setSearch] = useState("");
  const [policy, setPolicy] = useState("All");
  const [dept, setDept] = useState("All");
  const [status, setStatus] = useState("All");
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const filtered = mockRecords
    .map((r, idx) => ({ ...r, idx }))
    .filter((r) => {
      if (search && !r.employee.toLowerCase().includes(search.toLowerCase())) return false;
      if (policy !== "All" && r.policy !== policy) return false;
      if (dept !== "All" && r.dept !== dept) return false;
      if (status !== "All" && r.status !== status) return false;
      return true;
    });

  const selectable = filtered.filter((r) => r.status !== "Acknowledged");
  const allSelected = selectable.length > 0 && selectable.every((r) => checked.has(r.idx));

  function toggleAll() {
    setChecked(allSelected ? new Set() : new Set(selectable.map((r) => r.idx)));
  }

  function toggleRow(idx: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  function handleReminder() {
    const overdueCount = mockRecords.filter((r) => r.status === "Overdue").length;
    toast.success(`Reminder sent to ${overdueCount} overdue employees`);
  }

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Policy acknowledgements</h1>
          <p className="text-muted-foreground mt-1">
            Individual employee acknowledgement status across all published policies.
          </p>
        </div>
        <Button variant="outline" onClick={handleReminder}>
          <Bell className="mr-2 h-4 w-4" />
          Send reminder to overdue
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
            <CardTitle className="text-lg font-semibold">Acknowledgement records</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full sm:w-56">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by employee name…"
                  className="pl-8"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <NativeSelect value={policy} onChange={(e) => setPolicy(e.target.value)}>
                <NativeSelectOption value="All">All policies</NativeSelectOption>
                {POLICIES.map((p) => (
                  <NativeSelectOption key={p} value={p}>{p}</NativeSelectOption>
                ))}
              </NativeSelect>
              <NativeSelect value={dept} onChange={(e) => setDept(e.target.value)}>
                <NativeSelectOption value="All">All departments</NativeSelectOption>
                {DEPARTMENTS.map((d) => (
                  <NativeSelectOption key={d} value={d}>{d}</NativeSelectOption>
                ))}
              </NativeSelect>
              <NativeSelect value={status} onChange={(e) => setStatus(e.target.value)}>
                <NativeSelectOption value="All">All statuses</NativeSelectOption>
                <NativeSelectOption value="Acknowledged">Acknowledged</NativeSelectOption>
                <NativeSelectOption value="Pending">Pending</NativeSelectOption>
                <NativeSelectOption value="Overdue">Overdue</NativeSelectOption>
              </NativeSelect>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
                  </TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Policy</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Assigned</TableHead>
                  <TableHead>Acknowledged</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.idx}>
                    <TableCell>
                      <Checkbox
                        checked={checked.has(r.idx)}
                        disabled={r.status === "Acknowledged"}
                        onCheckedChange={() => toggleRow(r.idx)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-[10px]">
                            {r.employee.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{r.employee}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{r.dept}</TableCell>
                    <TableCell>{r.policy}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{r.version}</TableCell>
                    <TableCell className="text-muted-foreground">{r.assigned}</TableCell>
                    <TableCell className="text-muted-foreground">{r.acked ?? "—"}</TableCell>
                    <TableCell><StatusBadge status={r.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No records match your filters.</p>
          ) : (
            <p className="mt-3 text-xs text-muted-foreground">
              Showing {filtered.length} of {mockRecords.length} records
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
