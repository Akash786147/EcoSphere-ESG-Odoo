import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatTile } from "@/components/shared/stat-tile";
import { StatusBadge } from "@/components/shared/status-badge";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/dashboard/social/csr-activities/$activityId")({
  component: ActivityDetail,
  loader: ({ params }) => {
    const activity = ACTIVITIES[params.activityId];
    if (!activity) throw notFound();
    return activity;
  },
});

interface Participant {
  employee: string;
  dept: string;
  proof: boolean;
  status: "Approved" | "Pending" | "Rejected";
  pts: number | null;
}

interface ActivityDetailData {
  title: string;
  category: string;
  date: string;
  location: string;
  organizer: string;
  participants: number;
  capacity: number;
  points: number;
  status: string;
  evidence: boolean;
  hours: number;
  desc: string;
  list: Participant[];
}

const ACTIVITIES: Record<string, ActivityDetailData> = {
  "CSR-101": {
    title: "Riverside Park Clean-Up Day", category: "Environmental cleanup", date: "Jul 18, 2026",
    location: "Riverside Park, Sector 4", organizer: "David Chen", participants: 42, capacity: 50,
    points: 80, status: "Active", evidence: true, hours: 3,
    desc: "Volunteers will clear litter, remove invasive plant growth, and restore trail markers along the riverside walking paths.",
    list: [
      { employee: "Aisha Rahman", dept: "Human Resources", proof: true, status: "Approved", pts: 80 },
      { employee: "Liu Wei", dept: "R&D", proof: true, status: "Approved", pts: 80 },
      { employee: "Ivan Petrenko", dept: "Sales & Marketing", proof: false, status: "Pending", pts: null },
    ],
  },
  "CSR-102": {
    title: "Coastal Plastic Collection Drive", category: "Environmental cleanup", date: "Aug 2, 2026",
    location: "Harbor Point Beach", organizer: "Elena Petrova", participants: 18, capacity: 40,
    points: 90, status: "Upcoming", evidence: true, hours: 4,
    desc: "A coastal clean-up focused on collecting microplastics and debris ahead of the summer tourism season.",
    list: [
      { employee: "Jake Whitfield", dept: "Sales & Marketing", proof: false, status: "Rejected", pts: null },
    ],
  },
  "CSR-103": {
    title: "Urban Tree Planting Initiative", category: "Environmental cleanup", date: "Jun 14, 2026",
    location: "Meridian Business Park", organizer: "David Okafor", participants: 65, capacity: 65,
    points: 100, status: "Completed", evidence: true, hours: 3,
    desc: "Planted 200 native saplings across the business park perimeter as part of the urban canopy expansion program.",
    list: [
      { employee: "Liu Wei", dept: "R&D", proof: true, status: "Approved", pts: 100 },
      { employee: "David Chen", dept: "Manufacturing", proof: true, status: "Approved", pts: 100 },
    ],
  },
  "CSR-104": {
    title: "Wetlands Restoration Volunteer Day", category: "Environmental cleanup", date: "Jul 25, 2026",
    location: "Cedar Creek Wetlands", organizer: "Elena Petrova", participants: 12, capacity: 30,
    points: 90, status: "Active", evidence: true, hours: 4,
    desc: "Wetland habitat restoration including invasive reed removal and native grass replanting.",
    list: [{ employee: "Omar Farouk", dept: "Logistics", proof: false, status: "Pending", pts: null }],
  },
  "CSR-105": {
    title: "Community Recycling Drive", category: "Environmental cleanup", date: "May 30, 2026",
    location: "HQ Loading Dock", organizer: "David Chen", participants: 54, capacity: 54,
    points: 60, status: "Completed", evidence: false, hours: 2,
    desc: "Employees dropped off electronics and household recyclables for responsible processing.",
    list: [{ employee: "Sofia Reyes", dept: "IT & Digital", proof: false, status: "Approved", pts: 60 }],
  },
  "CSR-106": {
    title: "Youth STEM Mentorship Program", category: "Education & mentorship", date: "Ongoing · Jul–Sep 2026",
    location: "Lincoln High School", organizer: "Priya Anand", participants: 22, capacity: 25,
    points: 120, status: "Active", evidence: true, hours: 8,
    desc: "A 10-week mentorship program pairing employees with high school students interested in STEM careers.",
    list: [{ employee: "Maya Lindström", dept: "R&D", proof: true, status: "Approved", pts: 120 }],
  },
  "CSR-107": {
    title: "Financial Literacy Workshop for Teens", category: "Education & mentorship", date: "Jul 11, 2026",
    location: "Community Center Hall B", organizer: "Priya Anand", participants: 15, capacity: 20,
    points: 70, status: "Completed", evidence: false, hours: 2,
    desc: "A half-day workshop covering budgeting, saving, and credit basics for local teens.",
    list: [{ employee: "Aisha Rahman", dept: "Human Resources", proof: false, status: "Approved", pts: 70 }],
  },
  "CSR-108": {
    title: "Digital Skills Bootcamp for Job Seekers", category: "Education & mentorship", date: "Aug 8, 2026",
    location: "IT Training Lab", organizer: "Fatima Noor", participants: 9, capacity: 25,
    points: 100, status: "Upcoming", evidence: true, hours: 6,
    desc: "Employees will lead sessions on office software, resume building, and basic coding for job seekers.",
    list: [],
  },
  "CSR-109": {
    title: "Blood Donation Drive", category: "Health & wellness", date: "Jul 21, 2026",
    location: "HQ Wellness Center", organizer: "Robert Alvarez", participants: 78, capacity: 100,
    points: 50, status: "Active", evidence: true, hours: 1,
    desc: "Quarterly blood donation drive in partnership with the regional blood bank.",
    list: [
      { employee: "Derek Osei", dept: "R&D", proof: false, status: "Pending", pts: null },
      { employee: "David Chen", dept: "Manufacturing", proof: true, status: "Approved", pts: 50 },
    ],
  },
  "CSR-110": {
    title: "Community Health Screening Day", category: "Health & wellness", date: "Jun 28, 2026",
    location: "Downtown Clinic Annex", organizer: "Robert Alvarez", participants: 46, capacity: 46,
    points: 60, status: "Completed", evidence: false, hours: 3,
    desc: "Free basic health screenings offered to the local community by volunteer employee medical staff.",
    list: [{ employee: "Robert Alvarez", dept: "Manufacturing", proof: false, status: "Approved", pts: 60 }],
  },
  "CSR-111": {
    title: "Mental Health Awareness Walk", category: "Health & wellness", date: "Jul 15, 2026",
    location: "Riverside Park", organizer: "Priya Anand", participants: 61, capacity: 80,
    points: 40, status: "Active", evidence: false, hours: 2,
    desc: "A community walk raising awareness and funds for regional mental health support services.",
    list: [{ employee: "Ivan Petrenko", dept: "Sales & Marketing", proof: false, status: "Approved", pts: 40 }],
  },
  "CSR-112": {
    title: "Affordable Housing Build Day", category: "Community development", date: "Aug 15, 2026",
    location: "Habitat Build Site — Elmwood", organizer: "Marcus Webb", participants: 20, capacity: 30,
    points: 130, status: "Upcoming", evidence: true, hours: 6,
    desc: "Volunteers assist with framing and finishing work on a Habitat for Humanity affordable housing build.",
    list: [],
  },
  "CSR-113": {
    title: "Local Food Bank Restocking Drive", category: "Community development", date: "Jun 20, 2026",
    location: "Meridian Food Bank", organizer: "Marcus Webb", participants: 33, capacity: 33,
    points: 55, status: "Completed", evidence: false, hours: 2,
    desc: "Sorted and shelved donated food items ahead of peak summer demand at the regional food bank.",
    list: [{ employee: "Marcus Webb", dept: "Sales & Marketing", proof: false, status: "Approved", pts: 55 }],
  },
  "CSR-114": {
    title: "Flood Relief Supply Packing Drive", category: "Disaster relief", date: "Jul 9, 2026",
    location: "HQ Warehouse Bay 2", organizer: "David Chen", participants: 37, capacity: 50,
    points: 75, status: "Active", evidence: true, hours: 3,
    desc: "Packed emergency supply kits for families affected by regional flooding, in partnership with the Red Cross.",
    list: [{ employee: "Omar Farouk", dept: "Logistics", proof: false, status: "Pending", pts: null }],
  },
};

function ActivityDetail() {
  const { activityId } = Route.useParams();
  const activity = Route.useLoaderData();
  const estHours = (activity.participants * activity.hours).toLocaleString();

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-8 w-full">
      <Link to="/dashboard/social/csr-activities" className="flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        CSR Activities
      </Link>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{activity.title}</h1>
          <p className="text-muted-foreground mt-1">{activityId} · {activity.category}</p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={activity.status} />
          <Button variant="outline" render={<Link to="/dashboard/social/employee-participation" />}>
            Review submissions
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Participants" value={`${activity.participants} / ${activity.capacity}`} />
        <StatTile label="Points per completion" value={`+${activity.points}`} />
        <StatTile label="Est. volunteer hours generated" value={estHours} />
        <StatTile label="Evidence required" value={activity.evidence ? "Yes" : "No"} />
      </div>

      <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{activity.desc}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Logistics</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-[100px_1fr] gap-y-3 text-sm">
              <dt className="text-muted-foreground">Date</dt>
              <dd>{activity.date}</dd>
              <dt className="text-muted-foreground">Location</dt>
              <dd>{activity.location}</dd>
              <dt className="text-muted-foreground">Organizer</dt>
              <dd>{activity.organizer}</dd>
              <dt className="text-muted-foreground">Category</dt>
              <dd className="text-social">{activity.category}</dd>
            </dl>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Participants</CardTitle>
          <span className="text-xs text-muted-foreground">
            {activity.list.length} shown of {activity.participants}
          </span>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Proof</TableHead>
                  <TableHead>Approval status</TableHead>
                  <TableHead className="text-right">Points earned</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activity.list.map((p) => (
                  <TableRow key={p.employee} className="cursor-pointer">
                    <TableCell>
                      <Link to="/dashboard/social/employee-participation" className="font-medium hover:underline">{p.employee}</Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{p.dept}</TableCell>
                    <TableCell>
                      {!activity.evidence ? (
                        <span className="text-xs text-muted-foreground">Not required</span>
                      ) : p.proof ? (
                        <span className="flex items-center gap-1 text-xs text-emerald-600">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Attached
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-destructive">
                          <XCircle className="h-3.5 w-3.5" /> Missing
                        </span>
                      )}
                    </TableCell>
                    <TableCell><StatusBadge status={p.status} /></TableCell>
                    <TableCell className="text-right font-medium">{p.pts ? `+${p.pts}` : "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {activity.list.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">No participant submissions yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
