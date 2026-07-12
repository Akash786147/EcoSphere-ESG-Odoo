import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Pencil } from "lucide-react";

interface Lifecycle {
  materials: number;
  manufacturing: number;
  distribution: number;
  use: number;
  eol: number;
}

interface Product {
  id: string;
  name: string;
  category: string;
  rating: string;
  footprint: string;
  lifecycle: Lifecycle;
  certs: string[];
  recyclable: string;
  status: string;
}

const RATING_STYLES: Record<string, string> = {
  A: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-0",
  B: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-0",
  C: "bg-red-500/15 text-red-700 dark:text-red-400 border-0",
};

const STATUS_STYLES: Record<string, string> = {
  Published: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-0",
  Draft: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400 border-0",
  "Under review": "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-0",
};

const LIFECYCLE_ROWS: { key: keyof Lifecycle; label: string; color: string }[] = [
  { key: "materials", label: "Materials", color: "bg-sky-500" },
  { key: "manufacturing", label: "Manufacturing", color: "bg-violet-500" },
  { key: "distribution", label: "Distribution", color: "bg-amber-500" },
  { key: "use", label: "Use phase", color: "bg-emerald-500" },
  { key: "eol", label: "End of life", color: "bg-rose-500" },
];

export function ProductProfilesTable({ products }: { products: Product[] }) {
  const [selected, setSelected] = React.useState<Product | null>(null);

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Carbon footprint</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Recyclability</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setSelected(product)}
              >
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{product.name}</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {product.id}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {product.category}
                </TableCell>
                <TableCell className="font-semibold">
                  {product.footprint}
                </TableCell>
                <TableCell>
                  <Badge
                    className={RATING_STYLES[product.rating] ?? ""}
                  >
                    {product.rating}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{product.recyclable}</TableCell>
                <TableCell>
                  <Badge
                    className={STATUS_STYLES[product.status] ?? "bg-secondary text-secondary-foreground border-0"}
                  >
                    {product.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Detail Sheet */}
      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="sm:max-w-[540px] overflow-y-auto">
          {selected && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl">{selected.name}</SheetTitle>
                <SheetDescription className="text-base text-foreground font-medium font-mono">
                  {selected.id}
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-8 px-4">
                {/* Rating + Footprint */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      ESG Rating
                    </h4>
                    <Badge
                      className={`text-base px-3 py-1 h-auto ${RATING_STYLES[selected.rating] ?? ""}`}
                    >
                      {selected.rating}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Carbon footprint
                    </h4>
                    <p className="text-sm font-semibold">{selected.footprint}</p>
                  </div>
                </div>

                {/* Lifecycle breakdown */}
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                    Lifecycle breakdown
                  </h4>
                  <div className="flex flex-col gap-3">
                    {LIFECYCLE_ROWS.map(({ key, label, color }) => (
                      <div key={key} className="flex items-center gap-3">
                        <span className="w-28 shrink-0 text-sm text-muted-foreground">
                          {label}
                        </span>
                        <div className="flex-1 h-5 rounded-full bg-muted/40 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${color} transition-all duration-500`}
                            style={{ width: `${selected.lifecycle[key]}%` }}
                          />
                        </div>
                        <span className="w-10 text-right text-sm font-medium tabular-nums">
                          {selected.lifecycle[key]}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Certifications
                  </h4>
                  {selected.certs.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selected.certs.map((cert) => (
                        <Badge key={cert} variant="outline">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No certifications recorded
                    </p>
                  )}
                </div>

                {/* Recyclability */}
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Recyclability
                  </h4>
                  <p className="text-sm font-semibold">{selected.recyclable}</p>
                </div>

                {/* Status */}
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Status
                  </h4>
                  <Badge
                    className={STATUS_STYLES[selected.status] ?? "bg-secondary text-secondary-foreground border-0"}
                  >
                    {selected.status}
                  </Badge>
                </div>
              </div>

              <SheetFooter className="flex-row justify-end gap-2 border-t border-border/50 pt-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setSelected(null)}
                >
                  Close
                </Button>
                <Button>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit profile
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
