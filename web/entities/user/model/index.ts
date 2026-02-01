export interface FavoritesData {
  property_ids: number[];
}

export interface User {
  id: number;
  email: string;
  name: string | null;
  favorites: FavoritesData;
  created_at: string;
  updated_at: string | null;
}
