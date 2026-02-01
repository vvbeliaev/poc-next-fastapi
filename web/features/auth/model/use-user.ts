"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi, type User } from "@/entities/user";

// Simple user state - in real app would use auth
const DEMO_USER_KEY = "demo_user_id";

export function useUser() {
  const queryClient = useQueryClient();

  // Get stored user ID from localStorage
  const getUserId = (): number | null => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(DEMO_USER_KEY);
    return stored ? parseInt(stored, 10) : null;
  };

  const query = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const userId = getUserId();
      if (!userId) return null;
      try {
        return await userApi.getById(userId);
      } catch {
        localStorage.removeItem(DEMO_USER_KEY);
        return null;
      }
    },
  });

  const createUserMutation = useMutation({
    mutationFn: ({ email, name }: { email: string; name?: string }) =>
      userApi.create(email, name),
    onSuccess: (user: User) => {
      localStorage.setItem(DEMO_USER_KEY, user.id.toString());
      queryClient.setQueryData(["user"], user);
    },
  });

  const logout = () => {
    localStorage.removeItem(DEMO_USER_KEY);
    queryClient.setQueryData(["user"], null);
    queryClient.invalidateQueries({ queryKey: ["favorites"] });
  };

  return {
    user: query.data as User | null,
    isLoading: query.isLoading,
    createUser: createUserMutation.mutate,
    isCreating: createUserMutation.isPending,
    logout,
  };
}
