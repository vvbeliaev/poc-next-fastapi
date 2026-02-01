import { apiClient } from "@/shared/api";
import type { User } from "../model";

export const userApi = {
  getById: (userId: number) => apiClient.get<User>(`/api/users/${userId}`),
  create: (email: string, name?: string) =>
    apiClient.post<User>("/api/users", { email, name }),
};

// Convenience exports for direct use
export const getUser = userApi.getById;
export const createUser = userApi.create;
