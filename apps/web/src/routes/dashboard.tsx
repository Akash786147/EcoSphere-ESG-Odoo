import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  const location = useLocation();
  const titleMap: Record<string, string> = {
    "/dashboard": "Overview",
    "/dashboard/settings": "Settings",
  };
  
  const currentTitle = titleMap[location.pathname] || "Dashboard";

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col flex-1 overflow-hidden h-screen bg-muted/20">
        <header className="h-14 border-b flex items-center px-4 gap-4 bg-background shrink-0">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-semibold">{currentTitle}</h1>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <div className="flex h-9 w-64 items-center rounded-md border border-input bg-background px-3 pl-9 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground cursor-pointer text-muted-foreground hover:bg-muted/50">
                Search departments, goals...
                <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-primary" />
              <span className="sr-only">Notifications</span>
            </Button>
            
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarFallback className="text-xs">SC</AvatarFallback>
            </Avatar>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
