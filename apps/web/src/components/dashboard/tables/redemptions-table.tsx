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

export function RedemptionsTable({ redemptions }: { redemptions: any[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Reward Item</TableHead>
            <TableHead className="text-right">Qty</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {redemptions.map((red) => (
            <TableRow key={red.id}>
              <TableCell className="font-medium font-mono text-xs">{red.id}</TableCell>
              <TableCell>{red.user}</TableCell>
              <TableCell>{red.item}</TableCell>
              <TableCell className="text-right">{red.qty}</TableCell>
              <TableCell className="text-muted-foreground text-sm">{red.date}</TableCell>
              <TableCell>
                <Badge variant={
                  red.status === "Delivered" || red.status === "Completed" ? "default" : 
                  red.status === "Processing" ? "secondary" : "outline"
                }>
                  {red.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {red.status === "Processing" ? (
                  <Button size="sm">Mark Shipped</Button>
                ) : (
                  <Button variant="ghost" size="sm">View Details</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
