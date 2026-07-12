# Multi-tenancy: Postgres schema-per-tenant

EcoSphere is multi-tenant, isolated by a dedicated Postgres schema per organization. A shared schema (e.g. `public`) holds cross-tenant data (organizations registry, platform auth); each org's ESG data lives in its own schema, created at org signup by running the tenant migration set. Chosen over the more common shared-schema + `organization_id` (+ RLS) approach for hard isolation at the database boundary. Accepted costs: goose tenant migrations run once per org schema, runtime DDL at signup, and per-request schema switching (`search_path`) in the connection layer.

## Considered Options

- Shared schema + `organization_id` + Postgres RLS — recommended default, rejected by team in favor of stronger isolation
- Database-per-tenant — heaviest operationally, rejected
