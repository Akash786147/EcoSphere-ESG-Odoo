import { createFileRoute } from "@tanstack/react-router";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Users, Calendar, Plus } from "lucide-react";

export const Route = createFileRoute("/dashboard/gamification/challenges")({
  component: GamificationChallenges,
});

const mockChallenges = [
  { id: "CH-1", title: "Bike to Work Week", participants: 142, reward: "500 pts", status: "Active", timeframe: "Jun 1 - Jun 7" },
  { id: "CH-2", title: "Paperless Month", participants: 310, reward: "Eco Badge", status: "Active", timeframe: "Jun 1 - Jun 30" },
  { id: "CH-3", title: "Energy Saver Challenge", participants: 85, reward: "1000 pts", status: "Draft", timeframe: "Jul 1 - Jul 14" },
  { id: "CH-4", title: "Community Cleanup", participants: 215, reward: "Hero Badge", status: "Completed", timeframe: "May 15 - May 16" },
];

function GamificationChallenges() {
  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Challenges</h1>
          <p className="text-muted-foreground mt-1">Create and manage time-boxed challenges that users can join.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Challenge
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Challenges</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">452</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Challenge Roster</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Challenge Title</TableHead>
                  <TableHead>Timeframe</TableHead>
                  <TableHead className="text-right">Participants</TableHead>
                  <TableHead>Reward</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockChallenges.map((ch) => (
                  <TableRow key={ch.id}>
                    <TableCell className="font-medium">{ch.title}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        {ch.timeframe}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{ch.participants}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{ch.reward}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        ch.status === "Active" ? "default" : 
                        ch.status === "Completed" ? "secondary" : "outline"
                      }>
                        {ch.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Manage</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
