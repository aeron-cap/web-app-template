---
_This is updated regularly._
---

# Quick Starter template for a Minimalist Editorial React frontend with Vite
A production-ready frontend template designed to pair with the NestJS backend, following a "Minimalist Editorial" design philosophy with premium typography and functional clarity.

## Tech Stack
- [**React 19**](https://react.dev/) – Modern UI library
- [**Vite**](https://vitejs.dev/) – High-performance build tool
- [**TypeScript**](https://www.typescriptlang.org/) – Type-safe JavaScript
- [**TanStack Query v5**](https://tanstack.com/query/latest) – Robust server-state management
- [**React Router v7**](https://reactrouter.com/) – Declarative routing
- [**Radix UI**](https://www.radix-ui.com/) – Accessible, unstyled UI primitives
- [**Axios**](https://axios-http.com/) – HTTP client with interceptors

## Features Implemented
- **Minimalist Editorial Design:** A clean, typography-focused aesthetic using `Instrument Serif` and `Inter`.
- **Global Auth Provider:** Centralized `AuthContext` managing secure session state via HttpOnly cookies.
- **Protected Routes:** Built-in route guards to handle unauthorized access and redirects.
- **Auto-Login:** Automatic session verification on app startup via the `/auth/me` endpoint.
- **Secure API Client:** Pre-configured Axios instance with `withCredentials: true` and interceptors for 401 handling.
- **Responsive Layout:** Mobile-first design using CSS Modules and Variables for extreme flexibility.

## How to Start
```bash
    npm install
    # Ensure the Backend is running on port 3000
    npm run dev
```

## Design Direction
The project uses a custom design system defined in global CSS variables.

```css
    :root {
      --font-serif: 'Instrument Serif', serif;
      --font-sans: 'Inter', sans-serif;
      --royal-blue: #2563eb;
      --white: #ffffff;
      --black: #000000;
    }
```

## Project Structure
```bash
    ├── src
    │   ├── api/            # Axios instance and API service hooks
    │   ├── components/     # Atomic UI components (Button, Header, Sidebar)
    │   ├── context/        # Auth and Theme providers
    │   ├── hooks/          # Custom hooks
    │   │   └── queries/    # TanStack Query data fetching hooks (Layered Architecture)
    │   ├── layouts/        # Page wrappers (DashboardLayout, MainLayout)
    │   ├── pages/          # Full page components (Login, Signup, Home)
    │   ├── styles/         # Global variables, typography, and resets
    │   └── main.tsx        # App entry & Provider setup
```

## Authentication flow
By default, protected routes require a valid session and use the `DashboardLayout` (which includes the responsive Sidebar):

```tsx
<Route element={<ProtectedRoute />}>
  <Route path="/" element={
    <DashboardLayout>
      <HomePage />
    </DashboardLayout>
  } />
</Route>
```

## Developer Guide: Adding Features

The frontend uses a **Layered Architecture** and is structured to scale cleanly. When adding new features for your client, follow this workflow:

### 1. Adding a New Page
1. Create a new file in `src/pages/` (e.g., `UsersPage.tsx`).
2. Add your page component using the standard UI components.
3. Register the route in `src/App.tsx` inside the `<ProtectedRoute>` block.
4. Add a link to your new route in the `navItems` array within `src/components/Sidebar.tsx`.

### 2. Fetching Data (Server State)
Always use **TanStack Query** for fetching and caching server data. Create custom hooks in the `src/hooks/queries/` directory to separate data logic from UI components.

**Example Hook (`src/hooks/queries/useUsers.ts`):**
```tsx
import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await api.get('/user');
      return data;
    },
  });
}
```

**Using the Hook in a Component:**
```tsx
import { useUsers } from '../hooks/queries/useUsers';

export function UsersPage() {
  const { data, isLoading } = useUsers();
  
  if (isLoading) return <p>Loading...</p>;
  return <div>{JSON.stringify(data)}</div>;
}
```

### 3. Styling Components
- Use **CSS Modules** (`Component.module.css`) to prevent class name collisions.
- Always utilize the global CSS variables defined in `src/index.css` (e.g., `var(--royal-blue)`, `var(--font-serif)`) to maintain the Minimalist Editorial design.


## Common commands
```bash
    npm run dev         # Starts development server
    npm run build       # Creates production build
    npm run preview     # Previews production build locally
    npm run lint        # Runs ESLint checks
```

## Future Additions
- [ ] Zod-based form validation (React Hook Form)
- [ ] Framer Motion for editorial transitions
- [ ] Dark Mode support
- [ ] Unit testing (Vitest + React Testing Library)
- [ ] Storybook for component documentation
