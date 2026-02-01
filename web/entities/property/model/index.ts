export interface Property {
  id: number;
  title: string;
  description: string | null;
  price: number;
  address: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  area_sqm: number;
  image_url: string | null;
  created_at: string;
  updated_at: string | null;
}
