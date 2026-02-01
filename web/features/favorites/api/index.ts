import { apiClient } from "@/shared/api";
import type { User } from "@/entities/user";

export const favoritesApi = {
  getAll: (userId: number) =>
    apiClient.get<number[]>(`/api/users/${userId}/favorites`),
  add: (userId: number, propertyId: number) =>
    apiClient.post<User>(`/api/users/${userId}/favorites/${propertyId}`),
  remove: (userId: number, propertyId: number) =>
    apiClient.delete<User>(`/api/users/${userId}/favorites/${propertyId}`),
};
