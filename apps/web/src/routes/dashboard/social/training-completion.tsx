import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { StatTile } from "@/components/shared/stat-tile";
import { StatusBadge } from "@/components/shared/status-badge";
import { Search, Download } from "lucide-react";

export const Route = createFileRoute("/dashboard/social/training-completion")({
  component: TrainingCompletion,
});

const TRAININGS = [
  "Code of Conduct Refresher",
  "Data Privacy Fundamentals",
  "Workplace Safety Certification",
  "Anti-Harassment Training",
  "Sustainability Awareness 101",
  "Fire Safety & Evacuation",
  "Information Security Basics",
];
const DEPARTMENTS = ["Human Resources", "R&D", "IT & Digital", "Sales & Marketing", "Manufacturing", "Logistics"];

const deptSummary = [
  { dept: "Human Resources", assigned: 24, completed: 24, rate: 100, status: "Complete" },
  { dept: "R&D", assigned: 142, completed: 134, rate: 94, status: "On track" },
  { dept: "IT & Digital", assigned: 68, completed: 63, rate: 93, status: "On track" },
  { dept: "Sales & Marketing", assigned: 96, completed: 84, rate: 88, status: "On track" },
  { dept: "Manufacturing", assigned: 410, completed: 340, rate: 83, status: "Behind" },
  { dept: "Logistics", assigned: 87, completed: 70, rate: 80, status: "Behind" },
];

const mockRecords = [
  { employee: "Aisha Rahman", dept: "Human Resources", training: "Code of Conduct Refresher", assigned: "Jan 10, 2026", due: "Feb 10, 2026", completed: "Jan 28, 2026", status: "Completed" },
  { employee: "Derek Osei", dept: "R&D", training: "Information Security Basics", assigned: "Apr 1, 2026", due: "May 1, 2026", completed: null, status: "Overdue" },
  { employee: "Maya Lindström", dept: "R&D", training: "Sustainability Awareness 101", assigned: "Jun 1, 2026", due: "Jul 1, 2026", completed: null, status: "In progress" },
  { employee: "Liu Wei", dept: "R&D", training: "Data Privacy Fundamentals", assigned: "Mar 1, 2026", due: "Apr 1, 2026", completed: "Mar 20, 2026", status: "Completed" },
  { employee: "Sofia Reyes", dept: "IT & Digital", training: "Information Security Basics", assigned: "Apr 1, 2026", due: "May 1, 2026", completed: "Apr 25, 2026", status: "Completed" },
  { employee: "Fatima Noor", dept: "IT & Digital", training: "Data Privacy Fundamentals", assigned: "Mar 1, 2026", due: "Apr 1, 2026", completed: "Mar 30, 2026", status: "Completed" },
  { employee: "Marcus Webb", dept: "Sales & Marketing", training: "Anti-Harassment Training", assigned: "Feb 1, 2026", due: "Mar 1, 2026", completed: "Feb 28, 2026", status: "Completed" },
  { employee: "Ivan Petrenko", dept: "Sales & Marketing", training: "Code of Conduct Refresher", assigned: "Jan 10, 2026", due: "Feb 10, 2026", completed: null, status: "Overdue" },
  { employee: "Jake Whitfield", dept: "Sales & Marketing", training: "Sustainability Awareness 101", assigned: "Jun 1, 2026", due: "Jul 1, 2026", completed: null, status: "In progress" },
  { employee: "Robert Alvarez", dept: "Manufacturing", training: "Workplace Safety Certification", assigned: "Jan 5, 2026", due: "Feb 5, 2026", completed: "Jan 30, 2026", status: "Completed" },
  { employee: "David Chen", dept: "Manufacturing", training: "Fire Safety & Evacuation", assigned: "May 1, 2026", due: "Jun 1, 2026", completed: null, status: "Overdue" },
  { employee: "David Okafor", dept: "Manufacturing", training: "Workplace Safety Certification", assigned: "Jan 5, 2026", due: "Feb 5, 2026", completed: null, status: "In progress" },
  { employee: "Elena Petrova", dept: "Logistics", training: "Fire Safety & Evacuation", assigned: "May 1, 2026", due: "Jun 1, 2026", completed: "May 22, 2026", status: "Completed" },
  { employee: "Omar Farouk", dept: "Logistics", training: "Anti-Harassment Training", assigned: "Feb 1, 2026", due: "Mar 1, 2026", completed: null, status: "Overdue" },
  { employee: "Priya Anand", dept: "Human Resources", training: "Information Security Basics", assigned: "Apr 1, 2026", due: "May 1, 2026", completed: "Apr 18, 2026", status: "Completed" },
  { employee: "Daniel Cho", dept: "R&D", training: "Fire Safety & Evacuation", assigned: "May 1, 2026", due: "Jun 1, 2026", completed: null, status: "In progress" },
  { employee: "Robert Alvarez", dept: "Manufacturing", training: "Sustainability Awareness 101", assigned: "Jun 1, 2026", due: "Jul 1, 2026", completed: null, status: "Overdue" },
  { employee: "Fatima Noor", dept: "IT & Digital", training: "Anti-Harassment Training", assigned: "Feb 1, 2026", due: "Mar 1, 2026", completed: "Feb 25, 2026", status: "Completed" },
  { employee: "Elena Petrova", dept: "Logistics", training: "Data Privacy Fundamentals", assigned: "Mar 1, 2026", due: "Apr 1, 2026", completed: null, status: "In progress" },
  { employee: "Marcus Webb", dept: "Sales & Marketing", training: "Workplace Safety Certification", assigned: "Jan 5, 2026", due: "Feb 5, 2026", completed: "Jan 25, 2026", status: "Completed" },
];

function TrainingCompletion() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [dept, setDept] = useState("All");
  const [training, setTraining] = useState("All");

  const filtered = mockRecords.filter((r) => {
    if (search && !r.employee.toLowerCase().includes(search.toLowerCase()) && !r.training.toLowerCase().includes(search.toLowerCase())) return false;
    if (status !== "All" && r.status !== status) return false;
    if (dept !== "All" && r.dept !== dept) return false;
    if (training !== "All" && r.training !== training) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Training completion</h1>
          <p className="text-muted-foreground mt-1">
            Mandatory ESG and compliance training progress across the organization.
          </p>
        </div>
        <Button variant="secondary" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Overall completion rate" value="86%" />
        <StatTile label="Overdue training" value={34} delta="78 more in progress" deltaTone="negative" />
        <StatTile label="Completed this month" value={58} delta="715 of 827 total" deltaTone="positive" />
        <StatTile label="Highest completion" value="Human Resources" delta="100% · 24 of 24" deltaTone="positive" />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Completion by department</CardTitle>
          <span className="text-xs text-muted-foreground">86% overall</span>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-right">Assigned</TableHead>
                  <TableHead className="text-right">Completed</TableHead>
                  <TableHead className="text-right">Completion rate</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deptSummary.map((d) => (
                  <TableRow key={d.dept}>
                    <TableCell className="font-medium">{d.dept}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{d.assigned}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{d.completed}</TableCell>
                    <TableCell className="text-right font-medium">{d.rate}%</TableCell>
                    <TableCell><StatusBadge status={d.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
            <CardTitle className="text-lg font-semibold">Individual records</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full sm:w-56">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search employee or training name…"
                  className="pl-8"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <NativeSelect value={status} onChange={(e) => setStatus(e.target.value)}>
                <NativeSelectOption value="All">All statuses</NativeSelectOption>
                <NativeSelectOption value="Completed">Completed</NativeSelectOption>
                <NativeSelectOption value="In progress">In progress</NativeSelectOption>
                <NativeSelectOption value="Overdue">Overdue</NativeSelectOption>
              </NativeSelect>
              <NativeSelect value={dept} onChange={(e) => setDept(e.target.value)}>
                <NativeSelectOption value="All">All departments</NativeSelectOption>
                {DEPARTMENTS.map((d) => (
                  <NativeSelectOption key={d} value={d}>{d}</NativeSelectOption>
                ))}
              </NativeSelect>
              <NativeSelect value={training} onChange={(e) => setTraining(e.target.value)}>
                <NativeSelectOption value="All">All training</NativeSelectOption>
                {TRAININGS.map((t) => (
                  <NativeSelectOption key={t} value={t}>{t}</NativeSelectOption>
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
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Training</TableHead>
                  <TableHead>Assigned Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Completion Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r, idx) => (
                  <TableRow key={`${r.employee}-${r.training}-${idx}`}>
                    <TableCell className="font-medium">{r.employee}</TableCell>
                    <TableCell className="text-muted-foreground">{r.dept}</TableCell>
                    <TableCell>{r.training}</TableCell>
                    <TableCell className="text-muted-foreground">{r.assigned}</TableCell>
                    <TableCell className={r.status === "Overdue" ? "font-semibold text-destructive" : "text-muted-foreground"}>
                      {r.due}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{r.completed ?? "—"}</TableCell>
                    <TableCell><StatusBadge status={r.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">No records match your filters.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
