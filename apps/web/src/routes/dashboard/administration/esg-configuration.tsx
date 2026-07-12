import { createFileRoute } from "@tanstack/react-router";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save } from "lucide-react";

export const Route = createFileRoute("/dashboard/administration/esg-configuration")({
  component: ESGConfiguration,
});

function ESGConfiguration() {
  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ESG Configuration</h1>
          <p className="text-muted-foreground mt-1">Configure ESG-specific settings, metrics, and reporting thresholds.</p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="metrics" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="metrics">Metrics & Units</TabsTrigger>
          <TabsTrigger value="factors">Emission Factors</TabsTrigger>
          <TabsTrigger value="reporting">Reporting Cadence</TabsTrigger>
        </TabsList>
        
        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle>Global Metrics Settings</CardTitle>
              <CardDescription>
                Define the default units and boundaries used for calculating emissions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="base-currency">Base Currency</Label>
                  <Input id="base-currency" defaultValue="USD" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="base-weight">Base Weight Unit</Label>
                  <Input id="base-weight" defaultValue="kg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="base-energy">Base Energy Unit</Label>
                  <Input id="base-energy" defaultValue="kWh" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reporting-year">Default Reporting Year</Label>
                  <Input id="reporting-year" defaultValue="2026" />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-4">Advanced Settings</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto-convert Units</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically convert mismatched input units to the base unit during calculations.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="factors">
          <Card>
            <CardHeader>
              <CardTitle>Default Emission Factor Sets</CardTitle>
              <CardDescription>Manage which factor databases are prioritized.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Factor configuration UI is currently in read-only mode for this demo.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reporting">
          <Card>
            <CardHeader>
              <CardTitle>Reporting Cadence</CardTitle>
              <CardDescription>Set up automated reporting thresholds and timelines.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Reporting cadence settings will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
