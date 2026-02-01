import { usersModel } from "@/generated/prisma/models/users";

export interface FavoritesData {
  property_ids: number[];
}

export type User = usersModel & {
  favorites: FavoritesData;
};
