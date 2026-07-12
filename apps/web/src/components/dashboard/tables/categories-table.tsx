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
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Category = {
  id: string;
  name: string;
  type: string;
  usage: number;
  status: string;
  updated: string;
};

interface CategoriesTableProps {
  categories: Category[];
}

export function CategoriesTable({ categories }: CategoriesTableProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleRowClick = (category: Category) => {
    setSelectedCategory(category);
    setSheetOpen(true);
  };

  const getStatusBadgeVariant = (status: string) => {
    if (status === "Active") {
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400";
    }
    return "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300";
  };

  const getTypeBadgeVariant = (type: string) => {
    if (type === "Challenge") {
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400";
    }
    return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400";
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Usage count</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow
              key={category.id}
              onClick={() => handleRowClick(category)}
              className="cursor-pointer hover:bg-muted/50"
            >
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>
                <Badge variant="outline" className={cn("border-none", getTypeBadgeVariant(category.type))}>
                  {category.type}
                </Badge>
              </TableCell>
              <TableCell>{category.usage}</TableCell>
              <TableCell>
                <Badge variant="outline" className={cn("border-none", getStatusBadgeVariant(category.status))}>
                  {category.status}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{category.updated}</TableCell>
            </TableRow>
          ))}
          {categories.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No categories found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Edit Category</SheetTitle>
          </SheetHeader>
          {selectedCategory && (
            <div className="flex flex-col gap-6 py-6">
              <div className="flex flex-col gap-3">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={selectedCategory.name} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="type">Type</Label>
                <Select defaultValue={selectedCategory.type}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CSR Activity">CSR Activity</SelectItem>
                    <SelectItem value="Challenge">Challenge</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={selectedCategory.status}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Category description..." 
                  rows={4}
                  defaultValue={`Description for ${selectedCategory.name}`}
                />
              </div>
            </div>
          )}
          <SheetFooter>
            <Button variant="outline" onClick={() => setSheetOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setSheetOpen(false)}>Save Changes</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
