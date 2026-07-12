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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink, Plus } from "lucide-react";

export const Route = createFileRoute("/dashboard/environmental/carbon-transactions")({
  component: CarbonTransactions,
});

const mockTransactions = [
  { id: "TX-9921", date: "2026-06-12", amount: "5,000", source: "Verra Project 1234", counterparty: "South Pole", status: "Verified" },
  { id: "TX-9922", date: "2026-06-15", amount: "1,200", source: "Gold Standard Wind", counterparty: "ClimatePartner", status: "Pending" },
  { id: "TX-9923", date: "2026-07-01", amount: "10,000", source: "Reforestation Brazil", counterparty: "Pachama", status: "Verified" },
];

function CarbonTransactions() {
  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Carbon Transactions</h1>
          <p className="text-muted-foreground mt-1">List and manage carbon credit transactions and offsets.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Transaction
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <CardTitle className="text-lg font-semibold">Transaction Ledger</CardTitle>
            <div className="flex gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Filter by project..."
                  className="pl-8"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Source / Project</TableHead>
                  <TableHead>Counterparty</TableHead>
                  <TableHead className="text-right">Amount (tCO2e)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium font-mono text-xs">{tx.id}</TableCell>
                    <TableCell className="text-muted-foreground">{tx.date}</TableCell>
                    <TableCell>{tx.source}</TableCell>
                    <TableCell>{tx.counterparty}</TableCell>
                    <TableCell className="text-right font-semibold">{tx.amount}</TableCell>
                    <TableCell>
                      <Badge variant={tx.status === "Verified" ? "default" : "secondary"}>
                        {tx.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" render={<a href="#" target="_blank" rel="noopener noreferrer" />}>
                        Certificate
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
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
