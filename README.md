### Template for a monolithic architecture web app

#### Usage:
- Personal setup for Web app projects and possibly clients soon.
- Frontend and Backend have their own specific READMEs.

#### Current:
- Setting up Backend in-house auth.
- Setting up third-party auth providers.

#### Next:
- Frontend
- Test scripts for Backend.
- Test scripts for Frontend.

#### Future:
- Caching
- CI/CD
- Sample Project using this template.

#### Stack (The Lineup):
- **Frontend**
  - **Framework:** React 19 (TypeScript)
  - **Routing:** TanStack Router (Type-safe routing)
  - **Data Fetching:** TanStack Query (v5)
  - **Validation:** Zod
  - **Styling:** Tailwind CSS + Shadcn UI
  - **Icons:** Lucide React
- **Backend**
  - **Framework:** NestJS (v11)
  - **Database:** PostgreSQL
  - **ORM:** Drizzle ORM
  - **Validation:** class-validator / Zod
  - **Auth:** Passport.js (JWT)
- **Infrastructure**
  - **Runtime:** Node.js (Managed via Mise)
  - **Containerization:** Docker & Docker Compose
  - **CI/CD:** GitHub Actions
