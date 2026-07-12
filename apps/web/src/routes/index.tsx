import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Leaf,
  Users,
  Shield,
  Trophy,
  FileText,
  Settings,
  LayoutDashboard,
  KeyRound,
  ArrowRight,
  ChevronRight,
  Info,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

interface ModuleLink {
  label: string;
  to: string;
}

interface ModuleCard {
  title: string;
  icon: typeof Leaf;
  colorClass: string;
  links: ModuleLink[];
  planned?: boolean;
}

const MODULES: ModuleCard[] = [
  {
    title: "Authentication",
    icon: KeyRound,
    colorClass: "text-muted-foreground bg-muted",
    links: [
      { label: "Sign in", to: "/auth/login" },
      { label: "Sign up", to: "/auth/signup" },
      { label: "Forgot password", to: "/forget-password" },
    ],
  },
  {
    title: "Organization Overview",
    icon: LayoutDashboard,
    colorClass: "text-primary bg-primary/10",
    links: [{ label: "Organization ESG dashboard", to: "/dashboard" }],
  },
  {
    title: "Environmental",
    icon: Leaf,
    colorClass: "text-emerald-600 bg-emerald-500/10",
    links: [
      { label: "Overview", to: "/dashboard/environmental/overview" },
      { label: "Carbon transactions", to: "/dashboard/environmental/carbon-transactions" },
      { label: "Emission factors", to: "/dashboard/environmental/emission-factors" },
      { label: "Product ESG profiles", to: "/dashboard/environmental/product-esg-profiles" },
      { label: "Sustainability goals", to: "/dashboard/environmental/sustainability-goals" },
    ],
  },
  {
    title: "Social",
    icon: Users,
    colorClass: "text-social bg-social/10",
    links: [
      { label: "Overview", to: "/dashboard/social/overview" },
      { label: "CSR activities", to: "/dashboard/social/csr-activities" },
      { label: "Employee participation", to: "/dashboard/social/employee-participation" },
      { label: "Diversity metrics", to: "/dashboard/social/diversity-metrics" },
      { label: "Training completion", to: "/dashboard/social/training-completion" },
    ],
  },
  {
    title: "Governance",
    icon: Shield,
    colorClass: "text-governance bg-governance/10",
    links: [
      { label: "Overview", to: "/dashboard/governance/overview" },
      { label: "ESG policies", to: "/dashboard/governance/policies" },
      { label: "Policy acknowledgements", to: "/dashboard/governance/policy-acknowledgements" },
      { label: "Audits", to: "/dashboard/governance/audits" },
      { label: "Compliance issues", to: "/dashboard/governance/compliance-issues" },
    ],
  },
  {
    title: "Gamification",
    icon: Trophy,
    colorClass: "text-amber-600 bg-amber-500/10",
    links: [
      { label: "Challenges", to: "/dashboard/gamification/challenges" },
      { label: "Participation approvals", to: "/dashboard/gamification/participation-approvals" },
      { label: "Badges", to: "/dashboard/gamification/badges" },
      { label: "Rewards", to: "/dashboard/gamification/rewards" },
      { label: "Redemptions", to: "/dashboard/gamification/redemptions" },
      { label: "Leaderboard", to: "/dashboard/gamification/leaderboard" },
    ],
  },
  {
    title: "Reports",
    icon: FileText,
    colorClass: "text-muted-foreground bg-muted",
    links: [],
    planned: true,
  },
  {
    title: "Administration",
    icon: Settings,
    colorClass: "text-foreground bg-muted",
    links: [
      { label: "Departments", to: "/dashboard/administration/departments" },
      { label: "Categories", to: "/dashboard/administration/categories" },
      { label: "ESG configuration", to: "/dashboard/administration/esg-configuration" },
      { label: "Notification settings", to: "/dashboard/administration/notification-settings" },
    ],
  },
  {
    title: "Account",
    icon: Settings,
    colorClass: "text-foreground bg-muted",
    links: [{ label: "Settings", to: "/dashboard/settings" }],
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-neutral-950 px-6 py-20 text-white">
        <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-start gap-6">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Leaf className="size-5" />
            </div>
            <span className="text-base font-semibold tracking-tight">EcoSphere</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Enterprise ESG management, built for daily use.
          </h1>
          <p className="max-w-xl text-emerald-100/80">
            A working prototype of the EcoSphere platform — carbon tracking, employee CSR participation, governance
            compliance, and gamified engagement in one connected workspace for Meridian Industries.
          </p>
          <div className="flex flex-col gap-2">
            <Link
              to="/dashboard"
              className="flex w-fit items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Enter EcoSphere
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-xs text-emerald-100/60">Opens the Administrator / ESG Manager workspace</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-6 py-12">
        <p className="mb-6 text-sm font-medium text-muted-foreground">Available now — Administrator workspace</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {MODULES.map((mod) => (
            <div
              key={mod.title}
              className={`rounded-xl border p-5 ${mod.planned ? "opacity-60" : ""}`}
            >
              <div className="mb-3 flex items-center gap-3">
                <span className={`flex size-9 items-center justify-center rounded-lg ${mod.colorClass}`}>
                  <mod.icon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h3 className="font-semibold leading-tight">{mod.title}</h3>
                  <span className="text-xs text-muted-foreground">
                    {mod.planned ? "Planned" : `${mod.links.length} screen${mod.links.length === 1 ? "" : "s"}`}
                  </span>
                </div>
              </div>
              {mod.planned ? (
                <p className="text-sm text-muted-foreground">Challenges, Badges, Rewards, Leaderboard…</p>
              ) : (
                <div className="flex flex-col">
                  {mod.links.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="flex items-center justify-between border-t py-2 text-sm text-foreground/90 first:border-t-0 hover:text-primary"
                    >
                      {link.label}
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-2 rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          This prototype covers authentication, the organization dashboard, the full Environmental, Social, and
          Governance modules, Gamification, Administration, and account Settings. Reports will link in from this
          page as it's built.
        </div>
      </section>
    </div>
  );
}
