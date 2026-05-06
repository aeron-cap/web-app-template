---
_This is updated regularly._
---

# Quick Starter template for a Dockerized NestJS backend with Drizzle ORM with PostgreSQL
A backend template using the NestJS framework, Drizzle ORM for type-safe database interactions, and a PostgreSQL database, all containerized with Docker.

## Tech Stack
- [**NestJS**](https://docs.nestjs.com/) – Progressive Node.js framework
- [**Drizzle ORM**](https://orm.drizzle.team/) – Type-safe SQL ORM
- **PostgreSQL** – Relational database
- **Docker** – Containerized environment

## How to Start
```bash
    npm install
    # run these if it's not installed for some reason :>
    npm install drizzle-orm pg
    npm install -D drizzle-kit

    npm run start:dev
    docker-compose up --build -d
```

## Docker Setup
```yaml
    version: '3.8'
    
    services:
       dev-db:
          image: postgres:15-alpine
          container_name: dev-postgres
          restart: unless-stopped
          ports:
             - "5438:5432"
          environment:
            POSTGRES_USER: user
            POSTGRES_PASSWORD: password
            POSTGRES_DB: devdb
          volumes:
            - pgdata-dev:/var/lib/postgresql/data

        # Will add the api service soon
    
    volumes:
      pgdata-dev:
```

## Project Structure
```bash
    ├── docker-compose.yml
    ├── drizzle
    │   └── drizzle.provider.ts
    ├── drizzle.config.ts
    ├── eslint.config.mjs
    ├── nest-cli.json
    ├── package.json
    ├── README.md
    ├── src
    │   ├── app.controller.spec.ts
    │   ├── app.controller.ts
    │   ├── app.module.ts
    │   ├── app.service.ts
    │   ├── <feature>
    │   │   ├── feature.controller.ts
    │   │   ├── feature.module.ts
    │   │   ├── feature.service.ts
    │   │   ├── dto
    │   │   │   └── feature.dto.ts
    │   ├── db
    │   │   ├── drizzle.module.ts
    │   │   └── schema.ts
    └── └── main.ts
```

## Model Pattern
Features are added by following this pattern
```bash
    <feature>/
    ├── feature.controller.ts   # Handles HTTP requests
    ├── feature.service.ts      # Business logic
    ├── feature.module.ts       # Module definition
```

## Common commands
```bash
    npm run generate    # Creates Migration for database schema changes
    npm run migrate     # Performs the Migrations to the database
```

## Preferred Practice
- Use modules per feature
- Keep controllers clean and services rich
- Use Validation Pipes in DTOs

## Future Additions
1. Add Auth Strategies and Guards (JWT)
2. Add Testing
3. Add CI/CD
