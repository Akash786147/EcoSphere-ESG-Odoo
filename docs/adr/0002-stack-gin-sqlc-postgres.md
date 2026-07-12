# Stack: Go (Gin) + pgx/sqlc + goose + PostgreSQL, React frontend

Backend is Go with Gin, raw SQL via pgx + sqlc code generation, goose for migrations, PostgreSQL. Frontend is React (Vite) + Tailwind + TanStack Query. sqlc over an ORM is deliberate: the hackathon is judged heavily on database design, so the schema and queries should be first-class, readable artifacts rather than hidden behind ORM abstractions. Gin over chi/Echo/Fiber for its maturity and middleware ecosystem; Fiber rejected for not being net/http-compatible.
