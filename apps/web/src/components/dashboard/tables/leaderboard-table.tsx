import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Medal } from "lucide-react";

export function LeaderboardTable({ leaderboard }: { leaderboard: any[] }) {
  return (
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
          {leaderboard.map((user) => (
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
  );
}
