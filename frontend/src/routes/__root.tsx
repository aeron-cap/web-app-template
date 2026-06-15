import { createRootRoute, Link, Outlet, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

function RootComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isAuthPage = pathname === '/login' || pathname === '/signup'

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      {!isAuthPage && (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center px-4">
            <div className="mr-4 flex">
              <Link to="/" className="mr-6 flex items-center space-x-2 font-bold">
                Template App
              </Link>
              <div className="flex gap-4 text-sm font-medium">
                <Link to="/" className="transition-colors hover:text-foreground/80 [&.active]:text-foreground [&:not(.active)]:text-foreground/60">
                  Home
                </Link>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-end space-x-4">
              <Link to="/login" className="text-sm font-medium transition-colors hover:text-foreground/80 [&.active]:text-foreground [&:not(.active)]:text-foreground/60">
                Login
              </Link>
              <Link to="/signup" className="text-sm font-medium transition-colors hover:text-foreground/80 [&.active]:text-foreground [&:not(.active)]:text-foreground/60">
                Sign up
              </Link>
            </div>
          </div>
        </nav>
      )}
      <main className={isAuthPage ? "" : "container mx-auto px-4 py-8"}>
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})

