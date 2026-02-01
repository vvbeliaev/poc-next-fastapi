import { apiClient } from "@/shared/api";
import type { User } from "@/entities/user";

export const favoritesApi = {
  // Read operations moved to Prisma (shared/lib/actions.ts)
  add: (userId: number, propertyId: number) =>
    apiClient.post<User>(`/api/users/${userId}/favorites/${propertyId}`),
  remove: (userId: number, propertyId: number) =>
    apiClient.delete<User>(`/api/users/${userId}/favorites/${propertyId}`),
};
