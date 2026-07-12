import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CATEGORY_OPTIONS = [
  "Stationary Combustion",
  "Purchased Energy",
  "Mobile Combustion",
  "Business Travel",
  "Fugitive Emissions",
  "Waste",
];

const STATUS_OPTIONS = ["Active", "Draft", "Retired"] as const;

function statusVariant(status: string) {
  switch (status) {
    case "Active":
      return "default";
    case "Draft":
      return "secondary";
    case "Retired":
      return "destructive";
    default:
      return "outline";
  }
}

export function EmissionFactorsTable({ factors }: { factors: any[] }) {
  const [selected, setSelected] = React.useState<any | null>(null);
  const [form, setForm] = React.useState<any>({});

  const openSheet = (factor: any) => {
    setSelected(factor);
    setForm({ ...factor });
  };

  const closeSheet = () => {
    setSelected(null);
    setForm({});
  };

  const updateField = (field: string, value: string) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Factor</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Effective date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {factors.map((factor) => (
              <TableRow
                key={factor.id}
                className="cursor-pointer"
                onClick={() => openSheet(factor)}
              >
                <TableCell>
                  <div>
                    <span className="font-medium">{factor.name}</span>
                    <span className="block text-xs text-muted-foreground font-mono">
                      {factor.id}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{factor.category}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {factor.activity}
                </TableCell>
                <TableCell className="text-right">
                  <span className="font-semibold">{factor.value}</span>
                  <span className="ml-1 text-xs text-muted-foreground">
                    {factor.unit}
                  </span>
                </TableCell>
                <TableCell>{factor.region}</TableCell>
                <TableCell className="text-muted-foreground">
                  {factor.date}
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant(factor.status)}>
                    {factor.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Sheet */}
      <Sheet open={!!selected} onOpenChange={(open) => !open && closeSheet()}>
        <SheetContent className="sm:max-w-[480px] overflow-y-auto">
          {selected && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle className="text-xl">Edit emission factor</SheetTitle>
                <SheetDescription>
                  {selected.id} — Update details for this factor.
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-5 px-4">
                {/* Name */}
                <div className="grid gap-2">
                  <Label htmlFor="ef-name">Name</Label>
                  <Input
                    id="ef-name"
                    value={form.name ?? ""}
                    onChange={(e) => updateField("name", e.target.value)}
                  />
                </div>

                {/* Category (select) */}
                <div className="grid gap-2">
                  <Label>Category</Label>
                  <Select
                    value={form.category ?? ""}
                    onValueChange={(val) => updateField("category", val)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORY_OPTIONS.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Status (select) */}
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <Select
                    value={form.status ?? ""}
                    onValueChange={(val) => updateField("status", val)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Activity */}
                <div className="grid gap-2">
                  <Label htmlFor="ef-activity">Activity</Label>
                  <Input
                    id="ef-activity"
                    value={form.activity ?? ""}
                    onChange={(e) => updateField("activity", e.target.value)}
                  />
                </div>

                {/* Factor value + Unit row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="ef-value">Factor value</Label>
                    <Input
                      id="ef-value"
                      type="text"
                      inputMode="decimal"
                      value={form.value ?? ""}
                      onChange={(e) => updateField("value", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="ef-unit">Unit</Label>
                    <Input
                      id="ef-unit"
                      value={form.unit ?? ""}
                      onChange={(e) => updateField("unit", e.target.value)}
                    />
                  </div>
                </div>

                {/* Region */}
                <div className="grid gap-2">
                  <Label htmlFor="ef-region">Region</Label>
                  <Input
                    id="ef-region"
                    value={form.region ?? ""}
                    onChange={(e) => updateField("region", e.target.value)}
                  />
                </div>

                {/* Effective date */}
                <div className="grid gap-2">
                  <Label htmlFor="ef-date">Effective date</Label>
                  <Input
                    id="ef-date"
                    type="date"
                    value={form.date ?? ""}
                    onChange={(e) => updateField("date", e.target.value)}
                  />
                </div>

                {/* Source */}
                <div className="grid gap-2">
                  <Label htmlFor="ef-source">Source</Label>
                  <Input
                    id="ef-source"
                    value={form.source ?? ""}
                    onChange={(e) => updateField("source", e.target.value)}
                  />
                </div>
              </div>

              <SheetFooter className="flex-row justify-end gap-2 pt-6">
                <Button variant="outline" onClick={closeSheet}>
                  Cancel
                </Button>
                <Button onClick={closeSheet}>Save</Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
