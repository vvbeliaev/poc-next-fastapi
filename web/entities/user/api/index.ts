import { apiClient } from "@/shared/api";
import type { User } from "../model";

export const userApi = {
  create: (email: string, name?: string) =>
    apiClient.post<User>("/api/users", { email, name }),
};

// Convenience exports for direct use
export const createUser = userApi.create;
