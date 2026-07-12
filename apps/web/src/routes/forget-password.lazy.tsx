import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";

export const Route = createLazyFileRoute("/forget-password")({
  component: ForgetPassword,
});

function ForgetPassword() {
  return (
    <AuthLayout>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Reset password
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email address and we will send you a password reset link.
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              placeholder="m@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              required
            />
          </Field>
          <Button type="submit" className="w-full">
            Send reset link
          </Button>
        </FieldGroup>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link
          to="/auth/login"
          className="underline underline-offset-4 hover:text-primary"
        >
          Back to login
        </Link>
      </p>
    </AuthLayout>
  );
}
