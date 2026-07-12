import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { StatTile } from "@/components/shared/stat-tile";
import { StatusBadge } from "@/components/shared/status-badge";
import { Search, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/social/employee-participation")({
  component: EmployeeParticipation,
});

type SubmissionStatus = "Pending" | "Approved" | "Rejected";

interface Submission {
  id: number;
  employee: string;
  activity: string;
  dept: string;
  proof: boolean;
  notes: string;
  status: SubmissionStatus;
  pts: number | null;
  completed: string | null;
  reason?: string;
}

const ACTIVITY_INFO: Record<string, { category: string; points: number; evidence: boolean }> = {
  "Riverside Park Clean-Up Day": { category: "Environmental cleanup", points: 80, evidence: true },
  "Coastal Plastic Collection Drive": { category: "Environmental cleanup", points: 90, evidence: true },
  "Urban Tree Planting Initiative": { category: "Environmental cleanup", points: 100, evidence: true },
  "Wetlands Restoration Volunteer Day": { category: "Environmental cleanup", points: 90, evidence: true },
  "Community Recycling Drive": { category: "Environmental cleanup", points: 60, evidence: false },
  "Youth STEM Mentorship Program": { category: "Education & mentorship", points: 120, evidence: true },
  "Financial Literacy Workshop for Teens": { category: "Education & mentorship", points: 70, evidence: false },
  "Digital Skills Bootcamp for Job Seekers": { category: "Education & mentorship", points: 100, evidence: true },
  "Blood Donation Drive": { category: "Health & wellness", points: 50, evidence: true },
  "Community Health Screening Day": { category: "Health & wellness", points: 60, evidence: false },
  "Mental Health Awareness Walk": { category: "Health & wellness", points: 40, evidence: false },
  "Affordable Housing Build Day": { category: "Community development", points: 130, evidence: true },
  "Local Food Bank Restocking Drive": { category: "Community development", points: 55, evidence: false },
  "Flood Relief Supply Packing Drive": { category: "Disaster relief", points: 75, evidence: true },
};

const DEPARTMENTS = ["Human Resources", "R&D", "IT & Digital", "Sales & Marketing", "Manufacturing", "Logistics"];

const SEED_SUBMISSIONS: Submission[] = [
  { id: 1, employee: "Aisha Rahman", activity: "Riverside Park Clean-Up Day", dept: "Human Resources", proof: true, notes: "Attended full shift, photos attached.", status: "Approved", pts: 80, completed: "Jul 19, 2026" },
  { id: 2, employee: "Derek Osei", activity: "Blood Donation Drive", dept: "R&D", proof: false, notes: "Donated blood, forgot to take a photo.", status: "Pending", pts: null, completed: null },
  { id: 3, employee: "Liu Wei", activity: "Urban Tree Planting Initiative", dept: "R&D", proof: true, notes: "Planted 8 saplings.", status: "Approved", pts: 100, completed: "Jun 15, 2026" },
  { id: 4, employee: "Omar Farouk", activity: "Flood Relief Supply Packing Drive", dept: "Logistics", proof: false, notes: "Helped pack supplies for 3 hours.", status: "Pending", pts: null, completed: null },
  { id: 5, employee: "Ivan Petrenko", activity: "Youth STEM Mentorship Program", dept: "Sales & Marketing", proof: true, notes: "Week 3 mentorship session completed.", status: "Approved", pts: 120, completed: "Jul 20, 2026" },
  { id: 6, employee: "Jake Whitfield", activity: "Coastal Plastic Collection Drive", dept: "Sales & Marketing", proof: false, notes: "Submitted a beach photo.", status: "Rejected", pts: null, completed: null, reason: "The submitted photo does not clearly show Harbor Point Beach or the volunteer in question. Please resubmit with a clearer photo." },
  { id: 7, employee: "Maya Lindström", activity: "Digital Skills Bootcamp for Job Seekers", dept: "R&D", proof: true, notes: "Led the resume-building session.", status: "Approved", pts: 100, completed: "Aug 9, 2026" },
  { id: 8, employee: "Sofia Reyes", activity: "Community Recycling Drive", dept: "IT & Digital", proof: false, notes: "Dropped off two boxes of e-waste.", status: "Approved", pts: 60, completed: "May 31, 2026" },
  { id: 9, employee: "David Chen", activity: "Blood Donation Drive", dept: "Manufacturing", proof: true, notes: "Donated blood, receipt attached.", status: "Approved", pts: 50, completed: "Jul 22, 2026" },
  { id: 10, employee: "Elena Petrova", activity: "Wetlands Restoration Volunteer Day", dept: "Logistics", proof: true, notes: "Full day restoration work.", status: "Pending", pts: null, completed: null },
  { id: 11, employee: "Priya Anand", activity: "Financial Literacy Workshop for Teens", dept: "Human Resources", proof: false, notes: "Facilitated the budgeting module.", status: "Approved", pts: 70, completed: "Jul 12, 2026" },
  { id: 12, employee: "Marcus Webb", activity: "Local Food Bank Restocking Drive", dept: "Sales & Marketing", proof: false, notes: "Sorted donations for 2 hours.", status: "Approved", pts: 55, completed: "Jun 21, 2026" },
  { id: 13, employee: "Robert Alvarez", activity: "Community Health Screening Day", dept: "Manufacturing", proof: false, notes: "Assisted with intake for screenings.", status: "Approved", pts: 60, completed: "Jun 29, 2026" },
  { id: 14, employee: "Fatima Noor", activity: "Digital Skills Bootcamp for Job Seekers", dept: "IT & Digital", proof: false, notes: "Co-led the coding basics session, photo pending.", status: "Pending", pts: null, completed: null },
  { id: 15, employee: "Daniel Cho", activity: "Urban Tree Planting Initiative", dept: "R&D", proof: false, notes: "Planted 5 saplings, no photo taken.", status: "Pending", pts: null, completed: null },
  { id: 16, employee: "David Okafor", activity: "Riverside Park Clean-Up Day", dept: "Manufacturing", proof: true, notes: "Collected 3 bags of litter.", status: "Approved", pts: 80, completed: "Jul 19, 2026" },
  { id: 17, employee: "Aisha Rahman", activity: "Mental Health Awareness Walk", dept: "Human Resources", proof: false, notes: "Completed the 5k walk.", status: "Approved", pts: 40, completed: "Jul 16, 2026" },
  { id: 18, employee: "Omar Farouk", activity: "Wetlands Restoration Volunteer Day", dept: "Logistics", proof: false, notes: "Helped clear invasive reeds, evidence still pending upload.", status: "Pending", pts: null, completed: null },
  { id: 19, employee: "Liu Wei", activity: "Youth STEM Mentorship Program", dept: "R&D", proof: false, notes: "Mentorship session 2, forgot proof.", status: "Pending", pts: null, completed: null },
  { id: 20, employee: "Jake Whitfield", activity: "Affordable Housing Build Day", dept: "Sales & Marketing", proof: false, notes: "Signed up but proof not yet submitted.", status: "Pending", pts: null, completed: null },
  { id: 21, employee: "Elena Petrova", activity: "Coastal Plastic Collection Drive", dept: "Logistics", proof: true, notes: "Collected two bags of plastic debris.", status: "Approved", pts: 90, completed: "Aug 3, 2026" },
  { id: 22, employee: "Sofia Reyes", activity: "Blood Donation Drive", dept: "IT & Digital", proof: false, notes: "Donated blood.", status: "Pending", pts: null, completed: null },
  { id: 23, employee: "Derek Osei", activity: "Flood Relief Supply Packing Drive", dept: "R&D", proof: true, notes: "Packed 40 supply kits.", status: "Approved", pts: 75, completed: "Jul 10, 2026" },
];

function EmployeeParticipation() {
  const [submissions, setSubmissions] = useState<Submission[]>(SEED_SUBMISSIONS);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [rejectPanelOpen, setRejectPanelOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activityFilter, setActivityFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All");

  const selected = submissions.find((s) => s.id === selectedId) ?? null;
  const selectedInfo = selected ? ACTIVITY_INFO[selected.activity] : null;

  const filtered = submissions.filter((s) => {
    if (search && !s.employee.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "All" && s.status !== statusFilter) return false;
    if (activityFilter !== "All" && s.activity !== activityFilter) return false;
    if (deptFilter !== "All" && s.dept !== deptFilter) return false;
    return true;
  });

  const pendingCount = submissions.filter((s) => s.status === "Pending").length;
  const missingEvidenceCount = submissions.filter(
    (s) => s.status === "Pending" && ACTIVITY_INFO[s.activity].evidence && !s.proof
  ).length;
  const approvedCount = submissions.filter((s) => s.status === "Approved").length;
  const approvedPoints = submissions.filter((s) => s.status === "Approved").reduce((sum, s) => sum + (s.pts ?? 0), 0);
  const rejectedCount = submissions.filter((s) => s.status === "Rejected").length;

  function openReview(id: number) {
    setSelectedId(id);
    setRejectPanelOpen(false);
    setRejectReason("");
    setSheetOpen(true);
  }

  const canApprove =
    !!selected && selected.status === "Pending" && (!selectedInfo?.evidence || selected.proof);

  function handleApprove() {
    if (!selected || !selectedInfo || !canApprove) return;
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === selected.id ? { ...s, status: "Approved", pts: selectedInfo.points, completed: "Today" } : s
      )
    );
    toast.success(`${selected.employee} approved — ${selectedInfo.points} points awarded`);
    setSheetOpen(false);
  }

  function handleConfirmReject() {
    if (!selected) return;
    if (!rejectReason.trim()) {
      toast.error("Add a reason for rejection before confirming.");
      return;
    }
    setSubmissions((prev) =>
      prev.map((s) => (s.id === selected.id ? { ...s, status: "Rejected", reason: rejectReason } : s))
    );
    toast.success(`Submission rejected — reason sent to ${selected.employee}`);
    setSheetOpen(false);
  }

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employee participation</h1>
          <p className="text-muted-foreground mt-1">
            Review CSR activity submissions, verify evidence, and award points.
          </p>
        </div>
        <Button variant="outline" render={<Link to="/dashboard/social/csr-activities" />}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to activities
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Pending review" value={pendingCount} delta="Oldest waiting 6 days" deltaTone="warning" />
        <StatTile
          label="Missing required evidence"
          value={missingEvidenceCount}
          delta="Cannot be approved yet"
          deltaTone="warning"
          highlight
        />
        <StatTile label="Approved this month" value={approvedCount} delta={`${approvedPoints.toLocaleString()} points awarded`} deltaTone="positive" />
        <StatTile label="Rejected this month" value={rejectedCount} delta="Reason logged for employee" />
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
            <CardTitle className="text-lg font-semibold">Submissions</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full sm:w-56">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search employee name…"
                  className="pl-8"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <NativeSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <NativeSelectOption value="All">All statuses</NativeSelectOption>
                <NativeSelectOption value="Pending">Pending</NativeSelectOption>
                <NativeSelectOption value="Approved">Approved</NativeSelectOption>
                <NativeSelectOption value="Rejected">Rejected</NativeSelectOption>
              </NativeSelect>
              <NativeSelect value={activityFilter} onChange={(e) => setActivityFilter(e.target.value)}>
                <NativeSelectOption value="All">All activities</NativeSelectOption>
                {Object.keys(ACTIVITY_INFO).map((a) => (
                  <NativeSelectOption key={a} value={a}>{a}</NativeSelectOption>
                ))}
              </NativeSelect>
              <NativeSelect value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
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
                  <TableHead>Employee</TableHead>
                  <TableHead>CSR Activity</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Proof</TableHead>
                  <TableHead>Approval Status</TableHead>
                  <TableHead className="text-right">Points Earned</TableHead>
                  <TableHead>Completion Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((s) => {
                  const info = ACTIVITY_INFO[s.activity];
                  return (
                    <TableRow key={s.id} className="cursor-pointer" onClick={() => openReview(s.id)}>
                      <TableCell className="font-medium">{s.employee}</TableCell>
                      <TableCell>{s.activity}</TableCell>
                      <TableCell className="text-muted-foreground">{s.dept}</TableCell>
                      <TableCell>
                        {!info.evidence ? (
                          <span className="text-xs text-muted-foreground">Not required</span>
                        ) : s.proof ? (
                          <span className="flex items-center gap-1 text-xs text-emerald-600">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Attached
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs text-destructive">
                            <XCircle className="h-3.5 w-3.5" /> Missing
                          </span>
                        )}
                      </TableCell>
                      <TableCell><StatusBadge status={s.status} /></TableCell>
                      <TableCell className="text-right font-medium">{s.pts ? `+${s.pts}` : "—"}</TableCell>
                      <TableCell className="text-muted-foreground">{s.completed ?? "—"}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">No submissions match your filters.</p>
          )}
        </CardContent>
      </Card>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent>
          {selected && selectedInfo && (
            <div className="flex flex-1 flex-col overflow-hidden">
              <SheetHeader>
                <SheetTitle>{selected.employee}</SheetTitle>
                <p className="text-sm text-muted-foreground">{selected.dept} · {selected.activity}</p>
              </SheetHeader>
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4">
                <dl className="grid grid-cols-[110px_1fr] gap-y-3 text-sm">
                  <dt className="text-muted-foreground">Activity</dt>
                  <dd className="flex items-center gap-2">
                    {selectedInfo.category}
                    <span className="text-social font-medium">+{selectedInfo.points} pts</span>
                  </dd>
                  <dt className="text-muted-foreground">Submission notes</dt>
                  <dd>{selected.notes}</dd>
                  <dt className="text-muted-foreground">Proof</dt>
                  <dd>
                    {!selectedInfo.evidence ? (
                      <span className="text-muted-foreground">No proof required</span>
                    ) : selected.proof ? (
                      <div className="flex flex-col gap-1">
                        <div className="flex h-24 w-40 items-center justify-center rounded-md border bg-muted/40 text-xs text-muted-foreground">
                          submission-photo.jpg
                        </div>
                        <span className="text-xs text-muted-foreground">Uploaded by {selected.employee}</span>
                      </div>
                    ) : (
                      <span className="text-destructive">Missing</span>
                    )}
                  </dd>
                  <dt className="text-muted-foreground">Current status</dt>
                  <dd className="flex flex-col gap-1">
                    <StatusBadge status={selected.status} />
                    {selected.status === "Rejected" && selected.reason && (
                      <span className="text-xs text-muted-foreground">{selected.reason}</span>
                    )}
                  </dd>
                </dl>

                {rejectPanelOpen && (
                  <div className="flex flex-col gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-3">
                    <label className="text-sm font-medium">Reason for rejection *</label>
                    <Textarea
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder="Explain why this submission is being rejected"
                    />
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" size="sm" onClick={() => setRejectPanelOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="button" variant="destructive" size="sm" onClick={handleConfirmReject}>
                        Confirm rejection
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <SheetFooter className="flex-row justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={selected.status !== "Pending"}
                  onClick={() => setRejectPanelOpen(true)}
                >
                  Reject
                </Button>
                <Button type="button" disabled={!canApprove} onClick={handleApprove}>
                  Approve & award points
                </Button>
              </SheetFooter>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
