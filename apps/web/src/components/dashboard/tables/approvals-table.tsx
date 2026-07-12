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
import { CheckCircle2, XCircle } from "lucide-react";

export function ApprovalsTable({ requests }: { requests: any[] }) {
  return (
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
          {requests.map((req) => (
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
  );
}
