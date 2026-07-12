import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export function SustainabilityGoalsTable({ goals }: { goals: any[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Goal Title</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Timeframe</TableHead>
            <TableHead className="w-[200px]">Progress</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {goals.map((goal) => (
            <TableRow key={goal.id}>
              <TableCell className="font-medium">{goal.title}</TableCell>
              <TableCell>{goal.owner}</TableCell>
              <TableCell className="text-muted-foreground text-sm">{goal.timeframe}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-muted-foreground">{goal.progress}% completed</span>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={
                  goal.status === "On Track" ? "default" : 
                  goal.status === "At Risk" ? "secondary" : "destructive"
                }>
                  {goal.status}
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
