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
import { Switch } from "@/components/ui/switch";

export function NotificationTemplatesTable({ templates }: { templates: any[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Template Name</TableHead>
          <TableHead>Channels</TableHead>
          <TableHead className="text-right">Sends (30d)</TableHead>
          <TableHead>Status</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {templates.map((template) => (
          <TableRow key={template.id}>
            <TableCell className="font-medium">{template.name}</TableCell>
            <TableCell>
              <div className="flex gap-1">
                {template.channels.map((channel: string) => (
                  <Badge key={channel} variant="secondary" className="text-xs">{channel}</Badge>
                ))}
              </div>
            </TableCell>
            <TableCell className="text-right">{template.triggers}</TableCell>
            <TableCell>
              <Switch checked={template.active} />
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">Edit</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
