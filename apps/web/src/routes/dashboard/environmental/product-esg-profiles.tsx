import { createFileRoute, Link } from "@tanstack/react-router";
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
import { Search, Download, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/dashboard/environmental/product-esg-profiles")({
  component: ProductESGProfiles,
});

const mockProducts = [
  { id: "PROD-A1", name: "EcoWidget Pro", category: "Electronics", footprint: "12.4", rating: "A" },
  { id: "PROD-B2", name: "Recycled Packaging Box", category: "Packaging", footprint: "0.8", rating: "A+" },
  { id: "PROD-C3", name: "Standard Widget", category: "Electronics", footprint: "45.2", rating: "C" },
];

function ProductESGProfiles() {
  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product ESG Profiles</h1>
          <p className="text-muted-foreground mt-1">Catalog of product ESG profiles with lifecycle footprint metrics.</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Catalog
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <CardTitle className="text-lg font-semibold">Product Catalog</CardTitle>
            <div className="flex gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
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
                  <TableHead>SKU / ID</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Lifecycle Footprint (kgCO2e)</TableHead>
                  <TableHead>ESG Rating</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium font-mono text-xs text-muted-foreground">{product.id}</TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right font-semibold">{product.footprint}</TableCell>
                    <TableCell>
                      <Badge variant={product.rating.startsWith("A") ? "default" : "secondary"}>
                        {product.rating}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {/* We will route this to a detailed page later, currently a stub */}
                      <Button variant="ghost" size="sm" render={<Link to="/dashboard" />}>
                        View Profile
                        <ArrowRight className="ml-2 h-3 w-3" />
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
