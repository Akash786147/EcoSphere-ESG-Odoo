import { createFileRoute } from "@tanstack/react-router";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bell, Mail, MessageSquare, Plus, Send } from "lucide-react";

export const Route = createFileRoute("/dashboard/administration/notification-settings")({
  component: NotificationSettings,
});

const templates = [
  { id: "1", name: "Goal Achieved", channels: ["Email", "In-App"], triggers: 124, active: true },
  { id: "2", name: "Data Anomaly Detected", channels: ["Email", "Webhook"], triggers: 14, active: true },
  { id: "3", name: "Weekly Report Digest", channels: ["Email"], triggers: 450, active: true },
  { id: "4", name: "New Challenge Available", channels: ["In-App"], triggers: 0, active: false },
];

function NotificationSettings() {
  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notification Settings</h1>
          <p className="text-muted-foreground mt-1">Global notification templates and delivery preferences.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Send className="mr-2 h-4 w-4" />
            Test Notification
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Template
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email Channel</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Active</p>
              <p className="text-xs text-muted-foreground">SMTP Configured</p>
            </div>
            <Switch defaultChecked />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In-App Channel</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Active</p>
              <p className="text-xs text-muted-foreground">Websockets Connected</p>
            </div>
            <Switch defaultChecked />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Webhooks</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Inactive</p>
              <p className="text-xs text-muted-foreground">Needs configuration</p>
            </div>
            <Switch />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification Templates</CardTitle>
          <CardDescription>Manage message templates triggered by system events.</CardDescription>
        </CardHeader>
        <CardContent>
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
                      {template.channels.map(channel => (
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
        </CardContent>
      </Card>
    </div>
  );
}
