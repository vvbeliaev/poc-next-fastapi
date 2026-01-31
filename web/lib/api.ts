const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

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

export interface User {
  id: number;
  email: string;
  name: string | null;
  favorites: {
    property_ids: number[];
  };
  created_at: string;
  updated_at: string | null;
}

export interface AnalyzeResponse {
  filename: string;
  file_size: number;
  content_type: string;
  analysis: {
    property_type: string;
    estimated_rooms: number;
    has_balcony: boolean;
    has_parking: boolean;
    condition: string;
    style: string;
    natural_light: string;
    confidence_score: number;
  };
}

// Properties API
export async function getProperties(city?: string): Promise<Property[]> {
  const url = new URL(`${API_URL}/api/properties`);
  if (city) url.searchParams.set("city", city);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch properties");
  return res.json();
}

export async function getProperty(id: number): Promise<Property> {
  const res = await fetch(`${API_URL}/api/properties/${id}`);
  if (!res.ok) throw new Error("Failed to fetch property");
  return res.json();
}

// Users API
export async function createUser(email: string, name?: string): Promise<User> {
  const res = await fetch(`${API_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, name }),
  });
  if (!res.ok) throw new Error("Failed to create user");
  return res.json();
}

export async function getUser(userId: number): Promise<User> {
  const res = await fetch(`${API_URL}/api/users/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export async function getFavorites(userId: number): Promise<number[]> {
  const res = await fetch(`${API_URL}/api/users/${userId}/favorites`);
  if (!res.ok) throw new Error("Failed to fetch favorites");
  return res.json();
}

export async function addFavorite(
  userId: number,
  propertyId: number
): Promise<User> {
  const res = await fetch(
    `${API_URL}/api/users/${userId}/favorites/${propertyId}`,
    { method: "POST" }
  );
  if (!res.ok) throw new Error("Failed to add favorite");
  return res.json();
}

export async function removeFavorite(
  userId: number,
  propertyId: number
): Promise<User> {
  const res = await fetch(
    `${API_URL}/api/users/${userId}/favorites/${propertyId}`,
    { method: "DELETE" }
  );
  if (!res.ok) throw new Error("Failed to remove favorite");
  return res.json();
}

// Analyze API
export async function analyzeImage(file: File): Promise<AnalyzeResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/api/analyze`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to analyze image");
  return res.json();
}
