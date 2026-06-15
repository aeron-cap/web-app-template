import { useQuery } from "@tanstack/react-query";
import { authApi } from "./auth";

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: authApi.getCurrentUser,
    retry: false,
  });
}