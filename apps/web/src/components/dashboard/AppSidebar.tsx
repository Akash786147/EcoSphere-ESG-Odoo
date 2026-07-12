import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Leaf,
  Users,
  Shield,
  Trophy,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
  ChevronsUpDown,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const NAV_MAIN = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Environmental",
    icon: Leaf,
    items: [
      { title: "Overview", url: "/dashboard/environmental/overview" },
      { title: "Carbon Transactions", url: "/dashboard/environmental/carbon-transactions" },
      { title: "Emission Factors", url: "/dashboard/environmental/emission-factors" },
      { title: "Product ESG Profiles", url: "/dashboard/environmental/product-esg-profiles" },
      { title: "Sustainability Goals", url: "/dashboard/environmental/sustainability-goals" },
    ],
  },
  {
    title: "Social",
    icon: Users,
    items: [
      { title: "Overview", url: "/dashboard/social/overview" },
      { title: "CSR Activities", url: "/dashboard/social/csr-activities" },
      { title: "Employee Participation", url: "/dashboard/social/employee-participation" },
      { title: "Diversity Metrics", url: "/dashboard/social/diversity-metrics" },
      { title: "Training Completion", url: "/dashboard/social/training-completion" },
    ],
  },
  {
    title: "Governance",
    icon: Shield,
    items: [
      { title: "Overview", url: "/dashboard/governance/overview" },
      { title: "ESG Policies", url: "/dashboard/governance/policies" },
      { title: "Policy Acknowledgements", url: "/dashboard/governance/policy-acknowledgements" },
      { title: "Audits", url: "/dashboard/governance/audits" },
      { title: "Compliance Issues", url: "/dashboard/governance/compliance-issues" },
    ],
  },
  {
    title: "Gamification",
    icon: Trophy,
    items: [
      { title: "Challenges", url: "/dashboard/gamification/challenges" },
      { title: "Participation Approvals", url: "/dashboard/gamification/participation-approvals" },
      { title: "Badges", url: "/dashboard/gamification/badges" },
      { title: "Rewards", url: "/dashboard/gamification/rewards" },
      { title: "Redemptions", url: "/dashboard/gamification/redemptions" },
      { title: "Leaderboard", url: "/dashboard/gamification/leaderboard" },
    ],
  },
  {
    title: "Reports",
    icon: FileText,
    items: [
      { title: "Reports Overview", url: "/dashboard/reports/overview" },
      { title: "Environmental Report", url: "/dashboard/reports/environmental-report" },
      { title: "Social Report", url: "/dashboard/reports/social-report" },
      { title: "Governance Report", url: "/dashboard/reports/governance-report" },
      { title: "ESG Summary", url: "/dashboard/reports/esg-summary" },
      { title: "Custom Report Builder", url: "/dashboard/reports/custom-report-builder" },
    ],
  },
  {
    title: "Administration",
    icon: Settings,
    items: [
      { title: "Departments", url: "/dashboard/administration/departments" },
      { title: "Categories", url: "/dashboard/administration/categories" },
      { title: "ESG Configuration", url: "/dashboard/administration/esg-configuration" },
      { title: "Notification Settings", url: "/dashboard/administration/notification-settings" },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 flex items-center justify-start px-4 border-b">
        <div className="flex items-center gap-2 text-sidebar-primary">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Leaf className="size-5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold text-base leading-none tracking-tight">EcoSphere</span>
            <span className="text-xs text-muted-foreground leading-none">Meridian Industries</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_MAIN.map((item) => {
                if (!item.items) {
                  const isActive =
                    item.url === "/dashboard"
                      ? location.pathname === "/dashboard"
                      : location.pathname.startsWith(item.url || "");
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton render={<Link to={item.url! as any} />} isActive={isActive}>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                const isActiveGroup = item.items.some((subItem) => location.pathname === subItem.url);

                return (
                  <Collapsible key={item.title} defaultOpen={isActiveGroup} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger>
                        <SidebarMenuButton tooltip={item.title}>
                          <item.icon />
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                render={<Link to={subItem.url as any} />}
                                isActive={location.pathname === subItem.url}
                              >
                                <span>{subItem.title}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted text-sidebar-primary-foreground font-medium text-xs">
                    SC
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Sarah Coleman</span>
                    <span className="truncate text-xs text-muted-foreground">Administrator</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              } />
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-muted text-sidebar-primary-foreground font-medium text-xs">
                        SC
                      </div>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">Sarah Coleman</span>
                        <span className="truncate text-xs text-muted-foreground">Administrator</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem render={<Link to="/dashboard/settings" className="w-full cursor-pointer flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>} />
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem render={<Link to="/auth/login" className="w-full cursor-pointer flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Link>} />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
