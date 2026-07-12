import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import { StatusBadge } from "@/components/shared/status-badge";
import { TreePine, GraduationCap, Heart, Building2, Target, Plus, LayoutGrid, List, MapPin, Calendar } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/social/csr-activities/")({
  component: CsrActivities,
});

const CATEGORIES = ["Environmental cleanup", "Education & mentorship", "Health & wellness", "Community development", "Disaster relief"];

const CATEGORY_META: Record<string, { Icon: typeof TreePine; className: string }> = {
  "Environmental cleanup": { Icon: TreePine, className: "text-emerald-600 bg-emerald-500/10" },
  "Education & mentorship": { Icon: GraduationCap, className: "text-governance bg-governance/10" },
  "Health & wellness": { Icon: Heart, className: "text-social bg-social/10" },
  "Community development": { Icon: Building2, className: "text-amber-600 bg-amber-500/10" },
  "Disaster relief": { Icon: Target, className: "text-destructive bg-destructive/10" },
};

const mockActivities = [
  { id: "CSR-101", title: "Riverside Park Clean-Up Day", category: "Environmental cleanup", date: "Jul 18, 2026", location: "Riverside Park, Sector 4", participants: 42, capacity: 50, points: 80, status: "Active" },
  { id: "CSR-102", title: "Coastal Plastic Collection Drive", category: "Environmental cleanup", date: "Aug 2, 2026", location: "Harbor Point Beach", participants: 18, capacity: 40, points: 90, status: "Upcoming" },
  { id: "CSR-103", title: "Urban Tree Planting Initiative", category: "Environmental cleanup", date: "Jun 14, 2026", location: "Meridian Business Park", participants: 65, capacity: 65, points: 100, status: "Completed" },
  { id: "CSR-104", title: "Wetlands Restoration Volunteer Day", category: "Environmental cleanup", date: "Jul 25, 2026", location: "Cedar Creek Wetlands", participants: 12, capacity: 30, points: 90, status: "Active" },
  { id: "CSR-105", title: "Community Recycling Drive", category: "Environmental cleanup", date: "May 30, 2026", location: "HQ Loading Dock", participants: 54, capacity: 54, points: 60, status: "Completed" },
  { id: "CSR-106", title: "Youth STEM Mentorship Program", category: "Education & mentorship", date: "Ongoing · Jul–Sep 2026", location: "Lincoln High School", participants: 22, capacity: 25, points: 120, status: "Active" },
  { id: "CSR-107", title: "Financial Literacy Workshop for Teens", category: "Education & mentorship", date: "Jul 11, 2026", location: "Community Center Hall B", participants: 15, capacity: 20, points: 70, status: "Completed" },
  { id: "CSR-108", title: "Digital Skills Bootcamp for Job Seekers", category: "Education & mentorship", date: "Aug 8, 2026", location: "IT Training Lab", participants: 9, capacity: 25, points: 100, status: "Upcoming" },
  { id: "CSR-109", title: "Blood Donation Drive", category: "Health & wellness", date: "Jul 21, 2026", location: "HQ Wellness Center", participants: 78, capacity: 100, points: 50, status: "Active" },
  { id: "CSR-110", title: "Community Health Screening Day", category: "Health & wellness", date: "Jun 28, 2026", location: "Downtown Clinic Annex", participants: 46, capacity: 46, points: 60, status: "Completed" },
  { id: "CSR-111", title: "Mental Health Awareness Walk", category: "Health & wellness", date: "Jul 15, 2026", location: "Riverside Park", participants: 61, capacity: 80, points: 40, status: "Active" },
  { id: "CSR-112", title: "Affordable Housing Build Day", category: "Community development", date: "Aug 15, 2026", location: "Habitat Build Site — Elmwood", participants: 20, capacity: 30, points: 130, status: "Upcoming" },
  { id: "CSR-113", title: "Local Food Bank Restocking Drive", category: "Community development", date: "Jun 20, 2026", location: "Meridian Food Bank", participants: 33, capacity: 33, points: 55, status: "Completed" },
  { id: "CSR-114", title: "Flood Relief Supply Packing Drive", category: "Disaster relief", date: "Jul 9, 2026", location: "HQ Warehouse Bay 2", participants: 37, capacity: 50, points: 75, status: "Active" },
];

type StatusFilter = "all" | "Active" | "Upcoming" | "Completed";

function CsrActivities() {
  const [view, setView] = useState<"cards" | "table">("cards");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [category, setCategory] = useState("All categories");
  const [open, setOpen] = useState(false);

  const filtered = mockActivities.filter((a) => {
    if (statusFilter !== "all" && a.status !== statusFilter) return false;
    if (category !== "All categories" && a.category !== category) return false;
    return true;
  });

  const chips: { key: StatusFilter; label: string }[] = [
    { key: "all", label: `All statuses (${mockActivities.length})` },
    { key: "Active", label: `Active (${mockActivities.filter((a) => a.status === "Active").length})` },
    { key: "Upcoming", label: `Upcoming (${mockActivities.filter((a) => a.status === "Upcoming").length})` },
    { key: "Completed", label: `Completed (${mockActivities.filter((a) => a.status === "Completed").length})` },
  ];

  function handlePublish(e: React.FormEvent) {
    e.preventDefault();
    setOpen(false);
    toast.success("CSR activity published and open for participation");
  }

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CSR activities</h1>
          <p className="text-muted-foreground mt-1">
            Corporate social responsibility programs open for employee participation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-md border p-0.5">
            <Button size="icon-sm" variant={view === "cards" ? "default" : "ghost"} onClick={() => setView("cards")}>
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button size="icon-sm" variant={view === "table" ? "default" : "ghost"} onClick={() => setView("table")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <Button onClick={() => setOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New activity
            </Button>
            <SheetContent>
              <form onSubmit={handlePublish} className="flex flex-1 flex-col overflow-hidden">
                <SheetHeader>
                  <SheetTitle>New activity</SheetTitle>
                </SheetHeader>
                <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4">
                  <div className="flex flex-col gap-1.5">
                    <Label>Activity title *</Label>
                    <Input required placeholder="e.g. Riverside Park Clean-Up Day" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <Label>Category *</Label>
                      <NativeSelect required defaultValue="">
                        <NativeSelectOption value="" disabled>Select category</NativeSelectOption>
                        {CATEGORIES.map((c) => (
                          <NativeSelectOption key={c} value={c}>{c}</NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label>Points *</Label>
                      <Input required type="number" placeholder="80" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Description</Label>
                    <Textarea placeholder="What will volunteers be doing?" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <Label>Date *</Label>
                      <Input required type="date" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label>Participant capacity</Label>
                      <Input type="number" placeholder="50" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Location *</Label>
                    <Input required placeholder="Venue or address" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Organizer *</Label>
                    <Input required placeholder="Activity organizer" />
                  </div>
                </div>
                <SheetFooter className="flex-row justify-end gap-2">
                  <SheetClose render={<Button type="button" variant="outline">Cancel</Button>} />
                  <Button type="submit">Publish activity</Button>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <Button
              key={chip.key}
              size="sm"
              variant={statusFilter === chip.key ? "default" : "outline"}
              onClick={() => setStatusFilter(chip.key)}
            >
              {chip.label}
            </Button>
          ))}
        </div>
        <NativeSelect value={category} onChange={(e) => setCategory(e.target.value)}>
          <NativeSelectOption value="All categories">All categories</NativeSelectOption>
          {CATEGORIES.map((c) => (
            <NativeSelectOption key={c} value={c}>{c}</NativeSelectOption>
          ))}
        </NativeSelect>
      </div>

      {view === "cards" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => {
            const { Icon, className } = CATEGORY_META[a.category];
            const pct = Math.round((a.participants / a.capacity) * 100);
            return (
              <Link key={a.id} to="/dashboard/social/csr-activities/$activityId" params={{ activityId: a.id }}>
                <Card className="h-full overflow-hidden transition-colors hover:border-social/40">
                  <div className={`flex h-20 items-center justify-center ${className}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <CardContent className="flex flex-col gap-2 pt-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={className}>{a.category}</Badge>
                      <StatusBadge status={a.status} />
                    </div>
                    <h4 className="font-semibold leading-snug">{a.title}</h4>
                    <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{a.date}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{a.location}</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-social" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground">{a.participants} of {a.capacity} participants</p>
                    <div className="mt-1 flex items-center justify-between text-xs">
                      <span className="font-semibold text-social">+{a.points} pts</span>
                      <span className="font-mono text-muted-foreground">{a.id}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Activity</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Participants</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((a) => {
                    const { className } = CATEGORY_META[a.category];
                    return (
                      <TableRow key={a.id}>
                        <TableCell>
                          <Link to="/dashboard/social/csr-activities/$activityId" params={{ activityId: a.id }} className="font-medium hover:underline">
                            {a.title}
                          </Link>
                        </TableCell>
                        <TableCell><Badge variant="outline" className={className}>{a.category}</Badge></TableCell>
                        <TableCell className="text-muted-foreground">{a.date}</TableCell>
                        <TableCell className="text-muted-foreground">{a.location}</TableCell>
                        <TableCell className="text-right">{a.participants} / {a.capacity} ({Math.round((a.participants / a.capacity) * 100)}%)</TableCell>
                        <TableCell className="text-right font-medium">+{a.points}</TableCell>
                        <TableCell><StatusBadge status={a.status} /></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
