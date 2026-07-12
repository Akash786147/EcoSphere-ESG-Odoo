import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

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
        <header className="topbar">
          <button className="icon-btn topbar-menu-btn" aria-label="Open menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
          </button>
          <div className="topbar-titles">
            <div className="topbar-title">{currentTitle}</div>
          </div>
          <div className="topbar-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
            <span>Search departments, goals, issues…</span>
            <kbd>⌘K</kbd>
          </div>
          <div className="topbar-actions">
            <button className="icon-btn" aria-label="Notifications">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8a6 6 0 0 0-12 0c0 5-2 6-2 6h16s-2-1-2-6"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>
              <span className="dot"></span>
            </button>
            <button className="topbar-avatar-btn"><div className="topbar-avatar">SC</div></button>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
