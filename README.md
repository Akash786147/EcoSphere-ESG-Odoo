# EcoSphere ESG Platform

EcoSphere is a standalone ESG (Environmental, Social, Governance) management platform designed to help organizations track, manage, and improve their sustainability metrics. 

Organizations use EcoSphere to record operational activity, derive carbon emissions, track social participation and governance compliance, and gamify sustainability initiatives for their employees. These metrics are rolled up into comprehensive department and organization-level ESG scores.

## Features

### 🌍 Environmental
Track the true carbon cost of your business operations.
- **Operations Tracking:** Import or manually enter operations (purchases, manufacturing, fleet usage) that produce emissions.
- **Emission Factors:** Manage master-data conversion rates to accurately calculate CO₂-equivalent emissions from raw operation quantities.
- **Carbon Transactions:** Automatically derive and store immutable records of calculated carbon emissions.

### 🤝 Social & Gamification
Engage employees and foster a culture of sustainability.
- **CSR Activities:** Organize social initiatives and training programs that employees can join.
- **Challenges:** Create sustainability challenges with specific targets for employees to achieve.
- **XP & Points:** Gamify participation! Employees earn XP (lifetime achievement score) to climb leaderboards and unlock badges, as well as Points (spendable balance) to redeem for rewards.
- **Approval Workflows:** Department managers review and approve employee participation, maintaining data integrity.

### ⚖️ Governance
Ensure your organization meets its compliance requirements.
- **Compliance & Auditing:** Keep track of internal and external audits, manage compliance issues, and enforce organizational policies.
- **Framework Mapping:** Map your initiatives to global ESG frameworks.

### 📊 Scoring & Analytics
Get a clear picture of your ESG performance.
- **Pillar Scores:** Generate 0–100 scores for each ESG pillar (Environmental, Social, Governance) at the department level.
- **Snapshots & Dashboards:** Capture periodic score snapshots to visualize trends and track improvements over time.

## Architecture

EcoSphere is a modern full-stack monorepo application:
- **Backend (API):** Express.js API built with TypeScript and Bun. Uses Drizzle ORM to interface with PostgreSQL for robust relational data management, including multi-tenant schema isolation. BullMQ and Redis are used for background jobs.
- **Frontend (Web):** A React-based web application (found in `apps/web`) for the user interface.

## Getting Started

### Prerequisites
- Node.js / Bun
- PostgreSQL database
- Redis (for background jobs/rate limiting)

### Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Configure environment variables in `apps/api/.env` based on `apps/api/.env.example`.
3. Start the development server:
   ```bash
   cd apps/api
   bun run dev
   ```

## Testing

EcoSphere includes a comprehensive End-to-End integration test suite that tests complete CRUD lifecycles and tests complex relational constraints like soft-deletion.

To run the full exhaustive test suite across all modules:
```bash
cd apps/api
bun run scripts/test-all.ts
```

For more details on backend testing conventions, see `apps/api/TESTING_GUIDE.md`.

## Terminology
For a detailed glossary of terms used in the codebase (e.g. why we use "Operation" instead of "ERP Record" or "Participation" instead of "Enrollment"), please refer to `CONTEXT.md`.
