---
_This is updated regularly._
---

# Quick Starter template for a React Frontend with TanStack and Shadcn UI
A modern, production-ready frontend template using React (Vite), TanStack Router & Query for state and routing, and Shadcn UI (Tailwind CSS) for styling. Structured using a Feature-Driven Architecture.

## Tech Stack
- [**React & Vite**](https://vitejs.dev/) – Lightning-fast frontend tooling
- [**TanStack Router**](https://tanstack.com/router) – Type-safe, file-based routing
- [**TanStack Query**](https://tanstack.com/query) – Powerful asynchronous state management
- [**Tailwind CSS**](https://tailwindcss.com/) – Utility-first styling framework
- [**Shadcn UI**](https://ui.shadcn.com/) – Beautifully designed, accessible components
- [**Axios**](https://axios-http.com/) – HTTP client configured for secure cookie-based auth

## Features Implemented
- **Feature-Driven Architecture:** Code is organized by domain/feature (e.g., `auth`, `home`) rather than by type, keeping routes "thin" and features cohesive.
- **Type-Safe Routing:** TanStack Router automatically generates the route tree (`routeTree.gen.ts`) for strict typing across navigation and link parameters.
- **API Connectivity:** Pre-configured Axios client setup with `/api` proxying and `withCredentials: true` to handle HTTP-only JWT cookies seamlessly.
- **Dark Mode Ready:** Base Shadcn UI CSS variables are configured to support easy toggling between light and dark themes.

## How to Start
```bash
    # Install dependencies
    npm install
    
    # Start the development server
    npm run dev
    
    # Build for production
    npm run build
```

## Project Structure
```bash
    ├── src
    │   ├── api
    │   │   └── client.ts           # Global Axios instance
    │   ├── components
    │   │   └── ui/                 # Shared Shadcn components
    │   ├── features
    │   │   ├── auth/               # Auth Feature Module
    │   │   │   ├── api/
    │   │   │   ├── components/
    │   │   │   └── pages/
    │   │   └── home/               # Home Feature Module
    │   ├── routes
    │   │   ├── __root.tsx          # Global Layout
    │   │   ├── index.tsx           # Thin Route -> Renders HomePage
    │   │   └── login.tsx           # Thin Route -> Renders LoginPage
    │   └── main.tsx                # App entry & Providers
```

## Routing & Architecture
Routing is handled via **TanStack Router**. To add a new page, create a `.tsx` file in the `src/routes/` directory. The Vite router plugin will automatically generate the corresponding types in `routeTree.gen.ts`.

Following the **Feature-Driven** paradigm, ensure `src/routes/` files remain "thin." Isolate API calls, components, and hooks into `src/features/` and import the main page component into your route file.

## Common commands
```bash
    npm run dev         # Starts the local development server
    npm run build       # Builds the app for production
    npm run lint        # Runs ESLint
    npx shadcn@latest add [component] # Adds a new Shadcn UI component
```

## Future Additions
- [ ] Authentication Context & Hooks
- [ ] Login & Signup UI Forms
- [ ] Global Error Handling & Toast Notifications
- [ ] CI/CD Pipeline (GitHub Actions)
