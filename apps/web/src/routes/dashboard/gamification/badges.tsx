import { createFileRoute } from "@tanstack/react-router";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge as UiBadge } from "@/components/ui/badge";
import { Plus, Award, ShieldCheck, Trophy, Sparkles } from "lucide-react";

export const Route = createFileRoute("/dashboard/gamification/badges")({
  component: GamificationBadges,
});

const mockBadges = [
  { id: "1", name: "Eco Warrior", description: "Completed 5 environmental challenges.", points: 500, active: true, icon: ShieldCheck },
  { id: "2", name: "Top Contributor", description: "Ranked #1 on the leaderboard for a month.", points: 1000, active: true, icon: Trophy },
  { id: "3", name: "Zero Waste Hero", description: "Consistently reported zero waste for 3 weeks.", points: 250, active: true, icon: Sparkles },
  { id: "4", name: "Early Adopter", description: "Joined the platform in the first 30 days.", points: 100, active: false, icon: Award },
];

function GamificationBadges() {
  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Badges</h1>
          <p className="text-muted-foreground mt-1">Manage badge definitions and assignable rewards for achievements.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Badge
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {mockBadges.map((badge) => (
          <Card key={badge.id} className="relative overflow-hidden group">
            <CardHeader className="text-center pb-2 pt-6">
              <div className="mx-auto bg-muted/30 p-4 rounded-full mb-2 w-fit">
                <badge.icon className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-lg">{badge.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4 h-10">{badge.description}</p>
              <div className="flex items-center justify-center gap-2 mb-4">
                <UiBadge variant="secondary" className="font-mono">{badge.points} pts</UiBadge>
                {badge.active ? (
                  <UiBadge variant="outline" className="text-[var(--env)] border-[var(--env)]">Active</UiBadge>
                ) : (
                  <UiBadge variant="outline" className="text-muted-foreground">Inactive</UiBadge>
                )}
              </div>
              <Button variant="ghost" className="w-full opacity-0 group-hover:opacity-100 transition-opacity">
                Edit Badge
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
