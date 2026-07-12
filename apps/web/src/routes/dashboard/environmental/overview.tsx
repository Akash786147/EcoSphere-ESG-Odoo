import { createFileRoute } from "@tanstack/react-router";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Leaf, Activity } from "lucide-react";

export const Route = createFileRoute("/dashboard/environmental/overview")({
  component: EnvironmentalOverview,
});

function EnvironmentalOverview() {
  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Environmental Overview</h1>
          <p className="text-muted-foreground mt-1">High-level environmental metrics and trend visualizations.</p>
        </div>
        <Button variant="outline">Download Report</Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Emissions</CardTitle>
            <Leaf className="h-4 w-4 text-[var(--env)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,450 tCO2e</div>
            <p className="text-xs text-muted-foreground">-4% from last quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Target Progress</CardTitle>
            <BarChart3 className="h-4 w-4 text-[var(--env)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">On track for 2026 goal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Anomalies</CardTitle>
            <Activity className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Requires immediate review</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Emissions Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-muted/20 border border-dashed rounded-lg flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Chart Visualization Placeholder</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Environmental Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Emission factor updated</p>
                    <p className="text-xs text-muted-foreground">By Sarah Coleman • 2 hours ago</p>
                  </div>
                  <Button variant="ghost" size="icon" render={<button />}>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
