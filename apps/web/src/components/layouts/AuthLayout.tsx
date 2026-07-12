import * as React from "react";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-2">
      {/* Visual / Branding side */}
      <div className="hidden bg-muted lg:block relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/0 to-background/0" />
        {/* Simple geometric pattern for aesthetics without external images */}
        <svg
          className="absolute inset-0 h-full w-full opacity-20 dark:opacity-10 mix-blend-overlay"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid-pattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 40L40 0H20L0 20M40 40V20L20 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>

        <div className="absolute top-10 left-10 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            {/* Logo placeholder icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <path d="M12 2L2 22h20L12 2z" />
            </svg>
          </div>
          <span className="font-semibold text-xl tracking-tight">EcoSphere</span>
        </div>

        <div className="absolute bottom-10 left-10 right-10">
          <blockquote className="space-y-2">
            <p className="text-lg text-foreground/80 leading-snug">
              &ldquo;Building a sustainable future requires tools that are as
              insightful as they are accessible. We bring ESG tracking into
              focus.&rdquo;
            </p>
            <footer className="text-sm text-muted-foreground font-medium">
              — The EcoSphere Team
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Form side */}
      <div className="flex flex-col p-8 lg:p-12 items-center justify-center min-h-screen">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 max-w-[400px]">
          {children}
        </div>
      </div>
    </div>
  );
}
