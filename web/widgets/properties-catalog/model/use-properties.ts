"use client";

import { useQuery } from "@tanstack/react-query";
import { propertyApi, type Property } from "@/entities/property";

export function useProperties(city?: string, initialData?: Property[]) {
  return useQuery({
    queryKey: ["properties", city],
    queryFn: () => propertyApi.getAll(city),
    initialData,
  });
}
