import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { StatusBadge } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/governance/policies/")({
  component: Policies,
});

const CATEGORIES = [
  "Business Ethics",
  "Data Privacy",
  "Anti-Corruption",
  "Whistleblower",
  "Health & Safety",
  "Supply Chain",
  "HR & Labor",
  "Environmental",
];

const mockPolicies = [
  { id: "POL-014", title: "Code of Business Conduct & Ethics", category: "Business Ethics", version: "v3.2", owner: "Sarah Coleman", effective: "Jan 15, 2026", required: 847, acked: 813, status: "Active" },
  { id: "POL-021", title: "Data Privacy & Protection Policy", category: "Data Privacy", version: "v2.1", owner: "Fatima Noor", effective: "Jun 1, 2026", required: 847, acked: 661, status: "Active" },
  { id: "POL-009", title: "Anti-Bribery & Anti-Corruption Policy", category: "Anti-Corruption", version: "v4.0", owner: "Sarah Coleman", effective: "Mar 1, 2025", required: 847, acked: 838, status: "Active" },
  { id: "POL-033", title: "Whistleblower Protection Policy", category: "Whistleblower", version: "v1.4", owner: "Priya Anand", effective: "Feb 1, 2026", required: 847, acked: 771, status: "Active" },
  { id: "POL-018", title: "Health & Safety Management Policy", category: "Health & Safety", version: "v5.1", owner: "Robert Alvarez", effective: "Apr 10, 2026", required: 847, acked: 796, status: "Active" },
  { id: "POL-027", title: "Supplier Code of Conduct", category: "Supply Chain", version: "v2.0", owner: "Marcus Webb", effective: "May 1, 2026", required: 847, acked: 745, status: "Active" },
  { id: "POL-011", title: "Diversity, Equity & Inclusion Policy", category: "HR & Labor", version: "v1.2", owner: "Priya Anand", effective: "Jan 1, 2026", required: 847, acked: 822, status: "Active" },
  { id: "POL-040", title: "Environmental Management Policy", category: "Environmental", version: "v3.0", owner: "David Okafor", effective: "Jan 1, 2026", required: 847, acked: 805, status: "Active" },
  { id: "POL-005", title: "Fleet Emissions & Compliance Policy", category: "Environmental", version: "v1.0", owner: "Elena Petrova", effective: "Jun 15, 2026", required: 847, acked: 694, status: "Under review" },
];

type FilterKey = "all" | "active" | "review" | "below90";

function Policies() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [open, setOpen] = useState(false);

  const withAck = mockPolicies.map((p) => ({ ...p, ack: Math.round((p.acked / p.required) * 100) }));
  const filtered = withAck.filter((p) => {
    if (filter === "active") return p.status === "Active";
    if (filter === "review") return p.status === "Under review";
    if (filter === "below90") return p.ack < 90;
    return true;
  });

  const chips: { key: FilterKey; label: string }[] = [
    { key: "all", label: `All policies (${mockPolicies.length})` },
    { key: "active", label: `Active (${withAck.filter((p) => p.status === "Active").length})` },
    { key: "review", label: `Under review (${withAck.filter((p) => p.status === "Under review").length})` },
    { key: "below90", label: `Below 90% acknowledged (${withAck.filter((p) => p.ack < 90).length})` },
  ];

  function handlePublish(e: React.FormEvent) {
    e.preventDefault();
    setOpen(false);
    toast.success("Policy published and queued for employee acknowledgement");
  }

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ESG policies</h1>
          <p className="text-muted-foreground mt-1">
            Organization-wide policies with acknowledgement tracking across 847 employees.
          </p>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New policy
          </Button>
          <SheetContent>
            <form onSubmit={handlePublish} className="flex flex-1 flex-col overflow-hidden">
              <SheetHeader>
                <SheetTitle>New policy</SheetTitle>
              </SheetHeader>
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4">
                <div className="flex flex-col gap-1.5">
                  <Label>Policy title *</Label>
                  <Input required placeholder="e.g. Remote Work Policy" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Category *</Label>
                  <NativeSelect required defaultValue="">
                    <NativeSelectOption value="" disabled>Select category</NativeSelectOption>
                    {CATEGORIES.map((c) => (
                      <NativeSelectOption key={c} value={c}>{c}</NativeSelectOption>
                    ))}
                  </NativeSelect>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label>Version *</Label>
                    <Input required placeholder="v1.0" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Owner *</Label>
                    <Input required placeholder="Policy owner" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Effective date *</Label>
                  <Input required type="date" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Policy document</Label>
                  <div className="flex h-24 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
                    Drag and drop a PDF, or click to upload
                  </div>
                </div>
              </div>
              <SheetFooter className="flex-row justify-end gap-2">
                <SheetClose render={<Button type="button" variant="outline">Cancel</Button>} />
                <Button type="submit">Publish policy</Button>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <Button
            key={chip.key}
            size="sm"
            variant={filter === chip.key ? "default" : "outline"}
            onClick={() => setFilter(chip.key)}
          >
            {chip.label}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-12 text-center">
            <p className="font-medium">No policies match</p>
            <p className="text-sm text-muted-foreground">Try a different filter.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((policy) => (
            <Link
              key={policy.id}
              to="/dashboard/governance/policies/$policyId"
              params={{ policyId: policy.id }}
              className="block"
            >
              <Card className="h-full transition-colors hover:border-governance/40">
                <CardContent className="flex h-full flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-governance border-governance/30 bg-governance/10">
                      {policy.category}
                    </Badge>
                    <StatusBadge status={policy.status} />
                  </div>
                  <h4 className="font-semibold leading-snug">{policy.title}</h4>
                  <p className="font-mono text-xs text-muted-foreground">
                    {policy.id} · {policy.version}
                  </p>
                  <div className="mt-auto flex flex-col gap-2">
                    <div className="flex items-baseline justify-between">
                      <span className={`text-xl font-bold ${policy.ack >= 90 ? "text-emerald-600" : "text-amber-600"}`}>
                        {policy.ack}%
                      </span>
                      <span className="text-xs text-muted-foreground">
                        acknowledged ({policy.acked} of {policy.required})
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${policy.ack >= 90 ? "bg-emerald-500" : "bg-amber-500"}`}
                        style={{ width: `${policy.ack}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <span className="flex size-5 items-center justify-center rounded-full bg-muted font-medium text-foreground">
                          {policy.owner.split(" ").map((n) => n[0]).join("")}
                        </span>
                        {policy.owner}
                      </span>
                      <span>Eff. {policy.effective}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
