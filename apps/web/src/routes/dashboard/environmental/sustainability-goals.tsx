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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Plus } from "lucide-react";

export const Route = createFileRoute("/dashboard/environmental/sustainability-goals")({
  component: SustainabilityGoals,
});

const mockGoals = [
  { id: "1", title: "Net Zero by 2030", owner: "Sarah Coleman", timeframe: "2020 - 2030", progress: 65, status: "On Track" },
  { id: "2", title: "100% Renewable Energy", owner: "Robert Evans", timeframe: "2024 - 2028", progress: 40, status: "At Risk" },
  { id: "3", title: "Zero Waste to Landfill", owner: "Maria Garcia", timeframe: "2025 - 2026", progress: 15, status: "Off Track" },
];

function SustainabilityGoals() {
  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sustainability Goals</h1>
          <p className="text-muted-foreground mt-1">Track and manage organizational targets and milestone progress.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Goal
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Target className="mr-2 h-5 w-5 text-muted-foreground" />
            Active Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
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
                {mockGoals.map((goal) => (
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
        </CardContent>
      </Card>
    </div>
  );
}
