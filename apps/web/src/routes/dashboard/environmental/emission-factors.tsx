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
import { Search, Upload } from "lucide-react";

export const Route = createFileRoute("/dashboard/environmental/emission-factors")({
  component: EmissionFactors,
});

const mockFactors = [
  { id: "EF-1", category: "Electricity", activity: "Grid Mix (US)", unit: "kWh", value: "0.385", date: "2026-01-01" },
  { id: "EF-2", category: "Mobile Combustion", activity: "Diesel (Retail)", unit: "gallon", value: "10.21", date: "2026-01-01" },
  { id: "EF-3", category: "Stationary Combustion", activity: "Natural Gas", unit: "therm", value: "5.3", date: "2025-06-01" },
];

function EmissionFactors() {
  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Emission Factors</h1>
          <p className="text-muted-foreground mt-1">Browse and manage emission factor datasets used for calculations.</p>
        </div>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Import CSV
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <CardTitle className="text-lg font-semibold">Factor Database</CardTitle>
            <div className="flex gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search factors..."
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
                  <TableHead>ID</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Activity / Source</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead className="text-right">Value (kgCO2e)</TableHead>
                  <TableHead className="text-right">Effective Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockFactors.map((factor) => (
                  <TableRow key={factor.id}>
                    <TableCell className="font-medium font-mono text-xs text-muted-foreground">{factor.id}</TableCell>
                    <TableCell>{factor.category}</TableCell>
                    <TableCell>{factor.activity}</TableCell>
                    <TableCell>{factor.unit}</TableCell>
                    <TableCell className="text-right font-semibold">{factor.value}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{factor.date}</TableCell>
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
