"use client";

import { useQuery } from "@tanstack/react-query";
import { type Property } from "@/entities/property";
import { getProperties } from "@/entities/property/api/server";

export function useProperties(initialData?: Property[]) {
  return useQuery<Property[], Error>({
    queryKey: ["properties"],
    queryFn: () => getProperties() as unknown as Property[],
    initialData: initialData as unknown as Property[],
  });
}
