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
import { CheckCircle2, XCircle, Clock } from "lucide-react";

export const Route = createFileRoute("/dashboard/gamification/participation-approvals")({
  component: ParticipationApprovals,
});

const mockRequests = [
  { id: "REQ-01", user: "John Doe", challenge: "Bike to Work Week", date: "2026-06-02", status: "Pending" },
  { id: "REQ-02", user: "Alice Smith", challenge: "Paperless Month", date: "2026-06-01", status: "Approved" },
  { id: "REQ-03", user: "Bob Wilson", challenge: "Community Cleanup", date: "2026-05-14", status: "Rejected" },
];

function ParticipationApprovals() {
  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Participation Approvals</h1>
          <p className="text-muted-foreground mt-1">Approve or reject user requests to participate in gamified programs.</p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
            Request Queue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Challenge</TableHead>
                  <TableHead>Date Requested</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockRequests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="font-medium font-mono text-xs">{req.id}</TableCell>
                    <TableCell>{req.user}</TableCell>
                    <TableCell>{req.challenge}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{req.date}</TableCell>
                    <TableCell>
                      <Badge variant={
                        req.status === "Approved" ? "default" : 
                        req.status === "Pending" ? "outline" : "destructive"
                      }>
                        {req.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {req.status === "Pending" ? (
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                            <XCircle className="mr-1 h-3 w-3" /> Reject
                          </Button>
                          <Button size="sm">
                            <CheckCircle2 className="mr-1 h-3 w-3" /> Approve
                          </Button>
                        </div>
                      ) : (
                        <Button variant="ghost" size="sm">View Log</Button>
                      )}
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
