---
_This is updated regularly._
---

# Quick Starter template for a Dockerized NestJS backend with Drizzle ORM with PostgreSQL
A production-ready backend template using the NestJS framework, Drizzle ORM for type-safe database interactions, and a PostgreSQL database, all containerized with Docker.

## Tech Stack
- [**NestJS**](https://docs.nestjs.com/) – Progressive Node.js framework
- [**Drizzle ORM**](https://orm.drizzle.team/) – Type-safe SQL ORM
- **PostgreSQL** – Relational database
- **Docker** – Containerized environment
- [**Passport & JWT**](https://docs.nestjs.com/security/authentication) – Secure authentication
- [**Terminus**](https://docs.nestjs.com/recipes/terminus) – Health checks & monitoring
- [**Throttler**](https://docs.nestjs.com/security/rate-limiting) – Rate limiting / Brute-force protection

## Features Implemented
- **Global Authentication Guard:** All routes are protected by default via `JwtAuthGuard`. Use the `@Public()` decorator to bypass it.
- **Rate Limiting:** Global rate limiting configured to prevent API abuse.
- **Health Checks:** Accessible at `/health` for monitoring system vitals (Database connection, external services).
- **Type-safe Database:** Drizzle ORM provides full TypeScript support for all SQL operations.
- **Global Exception Filter:** Specialized handling for database-specific errors.

## How to Start
```bash
    npm install
    # Ensure Docker is running
    docker-compose up -d
    
    # Run migrations
    npm run generate
    npm run migrate

    # Start the app
    npm run start:dev
```

## Docker Setup
The template includes a pre-configured `docker-compose.yml` for local development.

```yaml
    version: '3.8'
    
    services:
       dev-db:
          image: postgres:17-alpine
          container_name: dev-postgres
          # ... (Standard PG config)
```

## Project Structure
```bash
    ├── src
    │   ├── auth
    │   │   ├── guards/jwt.guard.ts     # Global Auth Logic
    │   │   └── decorator/public.decorator.ts
    │   ├── common
    │   │   └── filters/                # Global Error Handling
    │   ├── db
    │   │   ├── schema.ts               # Database Models
    │   │   └── drizzle.module.ts
    │   ├── health                      # Monitoring Module
    │   └── main.ts                     # App entry & Global Middlewares
```

## Authentication & Authorization
By default, every endpoint is **PRIVATE**.
To make an endpoint public, use the custom decorator:

```typescript
@Public()
@Get('some-open-route')
findAll() { ... }
```

## Common commands
```bash
    npm run generate    # Creates Migration for database schema changes
    npm run migrate     # Performs the Migrations to the database
    npm run studio      # Opens Drizzle Studio UI to manage data
```

## Future Additions
- [ ] Structured Logging (nestjs-pino)
- [ ] Email Service Integration
- [ ] Multi-stage Production Dockerfile
- [ ] CI/CD Pipelines (GitHub Actions)
pens Drizzle Studio UI to manage data