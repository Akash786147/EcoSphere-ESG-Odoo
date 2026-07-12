import { createFileRoute } from "@tanstack/react-router";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Gift, Coffee, TreePine, Shirt } from "lucide-react";

export const Route = createFileRoute("/dashboard/gamification/rewards")({
  component: GamificationRewards,
});

const mockRewards = [
  { id: "1", name: "Plant a Tree", description: "We plant a tree in your name.", cost: 1000, stock: "Unlimited", active: true, icon: TreePine },
  { id: "2", name: "Company Swag T-Shirt", description: "Eco-friendly cotton t-shirt.", cost: 2500, stock: "42", active: true, icon: Shirt },
  { id: "3", name: "Coffee Shop Gift Card", description: "$10 gift card to local coffee shop.", cost: 1500, stock: "15", active: true, icon: Coffee },
  { id: "4", name: "Extra PTO Day", description: "Take a day off on us.", cost: 10000, stock: "5", active: true, icon: Gift },
];

function GamificationRewards() {
  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto pb-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rewards</h1>
          <p className="text-muted-foreground mt-1">Define the rewards catalog and configure redemption rules.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Reward
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {mockRewards.map((reward) => (
          <Card key={reward.id} className="relative overflow-hidden group">
            <CardHeader className="text-center pb-2 pt-6">
              <div className="mx-auto bg-muted/30 p-4 rounded-full mb-2 w-fit">
                <reward.icon className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-lg">{reward.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4 h-10">{reward.description}</p>
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex flex-col items-start">
                  <span className="text-xs text-muted-foreground">Cost</span>
                  <span className="font-bold">{reward.cost} pts</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-muted-foreground">Stock</span>
                  <span className="font-semibold">{reward.stock}</span>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Edit Reward
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
