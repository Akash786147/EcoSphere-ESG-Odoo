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
import { Trophy, Medal } from "lucide-react";

export const Route = createFileRoute("/dashboard/gamification/leaderboard")({
  component: Leaderboard,
});

const mockLeaderboard = [
  { rank: 1, name: "Sarah Coleman", department: "Corporate HQ", points: 12500, badges: 8 },
  { rank: 2, name: "Robert Evans", department: "Manufacturing", points: 11200, badges: 6 },
  { rank: 3, name: "Maria Garcia", department: "Logistics", points: 9800, badges: 5 },
  { rank: 4, name: "Dr. Chen Wei", department: "R&D", points: 8450, badges: 4 },
  { rank: 5, name: "Alex Johnson", department: "Logistics", points: 7200, badges: 3 },
];

function Leaderboard() {
  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
          <p className="text-muted-foreground mt-1">Display ranked users and teams by points and badges.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Global</Button>
          <Button variant="ghost">Department</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Trophy className="mr-2 h-5 w-5 text-[var(--social)]" />
            Top Contributors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px] text-center">Rank</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-right">Badges</TableHead>
                  <TableHead className="text-right">Total Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockLeaderboard.map((user) => (
                  <TableRow key={user.rank}>
                    <TableCell className="text-center font-bold">
                      {user.rank === 1 ? (
                        <Medal className="h-5 w-5 mx-auto text-yellow-500" />
                      ) : user.rank === 2 ? (
                        <Medal className="h-5 w-5 mx-auto text-gray-400" />
                      ) : user.rank === 3 ? (
                        <Medal className="h-5 w-5 mx-auto text-amber-700" />
                      ) : (
                        user.rank
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.department}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline">{user.badges}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">{user.points.toLocaleString()}</TableCell>
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
