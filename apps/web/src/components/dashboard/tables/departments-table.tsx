import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, AlertCircle } from "lucide-react";

interface Department {
  id: string;
  name: string;
  code: string;
  head: string;
  parent: string;
  employees: number;
  env: number;
  social: number;
  gov: number;
  total: number;
  goals: number;
  issues: number;
  status: string;
}

interface DepartmentsTableProps {
  departments: Department[];
}

export function DepartmentsTable({ departments }: DepartmentsTableProps) {
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 72) return "bg-blue-500";
    return "bg-amber-500";
  };
  
  const getProgressColorClass = (score: number) => {
    if (score >= 80) return "[&_[data-slot=progress-indicator]]:bg-emerald-500";
    if (score >= 72) return "[&_[data-slot=progress-indicator]]:bg-blue-500";
    return "[&_[data-slot=progress-indicator]]:bg-amber-500";
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 72) return "text-blue-600 dark:text-blue-400";
    return "text-amber-600 dark:text-amber-400";
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Department</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Head</TableHead>
              <TableHead>Parent</TableHead>
              <TableHead className="text-right">Employees</TableHead>
              <TableHead>ESG Score</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No departments found.
                </TableCell>
              </TableRow>
            ) : (
              departments.map((dept) => (
                <TableRow
                  key={dept.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedDept(dept)}
                >
                  <TableCell className="font-medium">{dept.name}</TableCell>
                  <TableCell>{dept.code}</TableCell>
                  <TableCell>{dept.head}</TableCell>
                  <TableCell>{dept.parent || "—"}</TableCell>
                  <TableCell className="text-right">{dept.employees}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`h-2.5 w-2.5 rounded-full ${getScoreColor(dept.total)}`} />
                      <span className="font-medium">{dept.total}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={dept.status === "Active" ? "default" : "secondary"}>
                      {dept.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Sheet open={!!selectedDept} onOpenChange={(open) => !open && setSelectedDept(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selectedDept && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle>Edit Department</SheetTitle>
                <SheetDescription>
                  Update department details and view ESG performance.
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-8">
                {/* Edit Form */}
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Department name</Label>
                      <Input id="name" defaultValue={selectedDept.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="code">Code</Label>
                      <Input id="code" defaultValue={selectedDept.code} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="head">Department head</Label>
                      <Input id="head" defaultValue={selectedDept.head} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parent">Parent department</Label>
                      <Input id="parent" defaultValue={selectedDept.parent} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Input id="status" defaultValue={selectedDept.status} />
                  </div>
                </div>

                {/* Mini Stat Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-1">
                      <Users className="h-5 w-5 text-muted-foreground mb-1" />
                      <span className="text-2xl font-bold">{selectedDept.employees}</span>
                      <span className="text-xs text-muted-foreground">Employees</span>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-1">
                      <Target className="h-5 w-5 text-muted-foreground mb-1" />
                      <span className="text-2xl font-bold">{selectedDept.goals}</span>
                      <span className="text-xs text-muted-foreground">Active Goals</span>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-1">
                      <AlertCircle className="h-5 w-5 text-muted-foreground mb-1" />
                      <span className="text-2xl font-bold">{selectedDept.issues}</span>
                      <span className="text-xs text-muted-foreground">Open Issues</span>
                    </CardContent>
                  </Card>
                </div>

                {/* ESG Score Breakdown */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium leading-none">ESG Score Breakdown</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Environmental</span>
                        <span className={`font-medium ${getScoreTextColor(selectedDept.env)}`}>{selectedDept.env}</span>
                      </div>
                      <Progress value={selectedDept.env} className={`h-2 [&_[data-slot=progress-track]]:bg-muted ${getProgressColorClass(selectedDept.env)}`} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Social</span>
                        <span className={`font-medium ${getScoreTextColor(selectedDept.social)}`}>{selectedDept.social}</span>
                      </div>
                      <Progress value={selectedDept.social} className={`h-2 [&_[data-slot=progress-track]]:bg-muted ${getProgressColorClass(selectedDept.social)}`} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Governance</span>
                        <span className={`font-medium ${getScoreTextColor(selectedDept.gov)}`}>{selectedDept.gov}</span>
                      </div>
                      <Progress value={selectedDept.gov} className={`h-2 [&_[data-slot=progress-track]]:bg-muted ${getProgressColorClass(selectedDept.gov)}`} />
                    </div>
                    <div className="pt-2 border-t space-y-2">
                      <div className="flex items-center justify-between font-medium">
                        <span>Total ESG Score</span>
                        <span className={getScoreTextColor(selectedDept.total)}>{selectedDept.total}</span>
                      </div>
                      <Progress value={selectedDept.total} className={`h-2.5 [&_[data-slot=progress-track]]:bg-muted ${getProgressColorClass(selectedDept.total)}`} />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setSelectedDept(null)}>Cancel</Button>
                  <Button onClick={() => setSelectedDept(null)}>Save Changes</Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
