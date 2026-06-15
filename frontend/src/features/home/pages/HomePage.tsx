import { useCurrentUser } from "@/features/auth/api/useAuth";

export function HomePage() {
  const { data: user, isPending, isError, error } = useCurrentUser();

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="animate-pulse">Loading user profile...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">Error loading user profile: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-2">
      <h3 className="text-2xl font-bold">Welcome {user.name}!</h3>
      <p className="mt-2">This is the landing page of your new template.</p>
    </div>
  );
}
