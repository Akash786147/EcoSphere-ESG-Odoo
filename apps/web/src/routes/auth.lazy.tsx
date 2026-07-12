import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import { AuthLayout } from "@/components/layouts/AuthLayout";

export const Route = createLazyFileRoute("/auth")({
  component: AuthComponent,
});

function AuthComponent() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
