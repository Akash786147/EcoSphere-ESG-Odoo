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
import { Calendar } from "lucide-react";

export function ChallengesTable({ challenges }: { challenges: any[] }) {
  return (
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
          {challenges.map((ch) => (
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
  );
}
