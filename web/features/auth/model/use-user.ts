"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { userApi, type User } from "@/entities/user";

const DEMO_USER_KEY = "demo_user_id";

export function useUser() {
  const queryClient = useQueryClient();
  const router = useRouter();

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
      router.push("/properties");
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (email: string) => {
      // For this POC, we'll just try to find the user by email
      // Since there's no dedicated login endpoint, we'll use a hacky way
      // In a real app, this would be a POST /api/auth/login
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
        }/api/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      if (!response.ok) throw new Error("Login failed");
      return response.json() as Promise<User>;
    },
    onSuccess: (user: User) => {
      localStorage.setItem(DEMO_USER_KEY, user.id.toString());
      queryClient.setQueryData(["user"], user);
      router.push("/properties");
    },
  });

  const logout = () => {
    localStorage.removeItem(DEMO_USER_KEY);
    queryClient.setQueryData(["user"], null);
    queryClient.invalidateQueries({ queryKey: ["favorites"] });
    router.push("/auth/login");
  };

  return {
    user: query.data as User | null,
    isLoading: query.isLoading,
    createUser: createUserMutation.mutate,
    isCreating: createUserMutation.isPending,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    createError: createUserMutation.error,
    logout,
  };
}
