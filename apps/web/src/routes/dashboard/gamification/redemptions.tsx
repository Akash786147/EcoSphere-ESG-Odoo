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
import { Package, Truck } from "lucide-react";

export const Route = createFileRoute("/dashboard/gamification/redemptions")({
  component: GamificationRedemptions,
});

const mockRedemptions = [
  { id: "RED-1001", user: "Maria Garcia", item: "Company Swag T-Shirt", qty: 1, date: "2026-07-10", status: "Processing" },
  { id: "RED-1002", user: "Alex Johnson", item: "Coffee Shop Gift Card", qty: 2, date: "2026-07-09", status: "Delivered" },
  { id: "RED-1003", user: "Dr. Chen Wei", item: "Plant a Tree", qty: 5, date: "2026-07-08", status: "Completed" },
];

function GamificationRedemptions() {
  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Redemptions</h1>
          <p className="text-muted-foreground mt-1">Manage user reward redemptions, approvals, and inventory.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Fulfillment</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shipped / Delivered</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Redemption Queue</CardTitle>
        </CardHeader>
        <CardContent>
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
                {mockRedemptions.map((red) => (
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
        </CardContent>
      </Card>
    </div>
  );
}
