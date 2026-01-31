"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFavorites, addFavorite, removeFavorite } from "@/lib/api";

export function useFavorites(userId: number | null) {
  return useQuery({
    queryKey: ["favorites", userId],
    queryFn: () => (userId ? getFavorites(userId) : []),
    enabled: !!userId,
  });
}

export function useAddFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      propertyId,
    }: {
      userId: number;
      propertyId: number;
    }) => addFavorite(userId, propertyId),
    onMutate: async ({ userId, propertyId }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["favorites", userId] });

      // Snapshot previous value
      const previousFavorites = queryClient.getQueryData<number[]>([
        "favorites",
        userId,
      ]);

      // Optimistically update
      queryClient.setQueryData<number[]>(["favorites", userId], (old) => [
        ...(old || []),
        propertyId,
      ]);

      return { previousFavorites };
    },
    onError: (_err, { userId }, context) => {
      // Rollback on error
      queryClient.setQueryData(
        ["favorites", userId],
        context?.previousFavorites
      );
    },
    onSettled: (_data, _error, { userId }) => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
    },
  });
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      propertyId,
    }: {
      userId: number;
      propertyId: number;
    }) => removeFavorite(userId, propertyId),
    onMutate: async ({ userId, propertyId }) => {
      await queryClient.cancelQueries({ queryKey: ["favorites", userId] });

      const previousFavorites = queryClient.getQueryData<number[]>([
        "favorites",
        userId,
      ]);

      queryClient.setQueryData<number[]>(["favorites", userId], (old) =>
        (old || []).filter((id) => id !== propertyId)
      );

      return { previousFavorites };
    },
    onError: (_err, { userId }, context) => {
      queryClient.setQueryData(
        ["favorites", userId],
        context?.previousFavorites
      );
    },
    onSettled: (_data, _error, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
    },
  });
}
