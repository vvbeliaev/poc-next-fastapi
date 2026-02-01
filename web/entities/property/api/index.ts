import { apiClient } from "@/shared/api";
import type { Property } from "../model";

export const propertyApi = {
  getAll: (city?: string) =>
    apiClient.get<Property[]>("/api/properties", city ? { city } : undefined),
  getById: (id: number) => apiClient.get<Property>(`/api/properties/${id}`),
};

// Convenience exports for direct use
export const getProperties = propertyApi.getAll;
export const getProperty = propertyApi.getById;
