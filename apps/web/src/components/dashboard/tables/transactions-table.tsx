import * as React from "react";
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
import { ExternalLink, Info, Calculator, CalendarClock, Receipt } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function TransactionsTable({ transactions }: { transactions: any[] }) {
  const [selectedTx, setSelectedTx] = React.useState<any | null>(null);

  return (
    <>
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
            {transactions.map((tx) => (
              <TableRow 
                key={tx.id} 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setSelectedTx(tx)}
              >
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
                  <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()} render={<a href="#" target="_blank" rel="noopener noreferrer" />}>
                    Certificate
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Sheet open={!!selectedTx} onOpenChange={(open) => !open && setSelectedTx(null)}>
        <SheetContent className="sm:max-w-[540px] overflow-y-auto">
          {selectedTx && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl">{selectedTx.id}</SheetTitle>
                <SheetDescription className="text-base text-foreground font-medium">
                  {selectedTx.record}
                </SheetDescription>
              </SheetHeader>
              
              <div className="flex flex-col gap-8">
                {/* Status & Source */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Status</h4>
                    <Badge className={
                      selectedTx.status === 'Posted' ? 'bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 border-0' :
                      selectedTx.status === 'Flagged' ? 'bg-red-500/10 text-red-700 hover:bg-red-500/20 border-0' :
                      'bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 border-0'
                    }>
                      {selectedTx.status}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Source record</h4>
                    <div className="text-sm font-medium flex items-center gap-2">
                      <Receipt className="w-4 h-4 text-muted-foreground" />
                      {selectedTx.record} · {selectedTx.dept} · {selectedTx.sourceType}
                    </div>
                  </div>
                </div>

                {/* Calculation Block */}
                {selectedTx.formula && (
                  <div className="bg-muted/30 rounded-lg p-5 border border-border/50">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Calculator className="w-4 h-4" /> Calculation
                    </h4>
                    <div className="font-mono text-sm mb-4">
                      {selectedTx.formula}
                    </div>
                    <div className="font-mono text-sm font-bold border-t border-border/50 pt-4">
                      {selectedTx.result}
                    </div>
                  </div>
                )}

                {/* Granular Details */}
                <div className="grid gap-6">
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-2">
                      <Info className="w-4 h-4" /> Emission factor used
                    </h4>
                    <p className="text-sm">{selectedTx.factor} — {selectedTx.factorVal}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Quantity</h4>
                      <p className="text-sm font-medium">{selectedTx.qty}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Final CO2e</h4>
                      <p className="text-sm font-medium">{selectedTx.co2e}CO2e</p>
                    </div>
                  </div>
                </div>

                {/* Audit & History */}
                {selectedTx.audit && selectedTx.audit.length > 0 && (
                  <div className="border-t border-border/50 pt-6">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                      <CalendarClock className="w-4 h-4" /> Audit history
                    </h4>
                    <div className="relative pl-4 border-l-2 border-muted">
                      {selectedTx.audit.map((entry: string, i: number) => (
                        <div key={i} className={`relative ${i < selectedTx.audit.length - 1 ? 'mb-4' : ''}`}>
                          <div className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border-2 border-background ${i === 0 ? 'bg-primary' : 'bg-muted'}`} />
                          <p className="text-sm font-medium">{entry}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Created */}
                {selectedTx.created && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Created</h4>
                    <p className="text-sm text-muted-foreground">{selectedTx.created}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
