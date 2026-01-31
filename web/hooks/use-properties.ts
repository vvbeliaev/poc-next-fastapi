"use client";

import { useQuery } from "@tanstack/react-query";
import { getProperties, getProperty, type Property } from "@/lib/api";

export function useProperties(city?: string, initialData?: Property[]) {
  return useQuery({
    queryKey: ["properties", city],
    queryFn: () => getProperties(city),
    initialData,
  });
}

export function useProperty(id: number) {
  return useQuery({
    queryKey: ["property", id],
    queryFn: () => getProperty(id),
    enabled: !!id,
  });
}
