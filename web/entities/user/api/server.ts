"use server";

import { prisma } from "@/shared/lib/prisma";

export async function getUser(userId: number) {
  return await prisma.users.findUnique({
    where: { id: userId },
  });
}

export async function getFavorites(userId: number) {
  const user = await prisma.users.findUnique({
    where: { id: userId },
    select: { favorites: true },
  });

  // Extract property_ids from JSONB structure: {"property_ids": [1, 2, 3]}
  const favoritesData = user?.favorites as { property_ids?: number[] } | null;
  return favoritesData?.property_ids || [];
}
