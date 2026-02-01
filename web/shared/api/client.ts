export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) url.searchParams.set(key, value);
      });
    }
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
    return res.json();
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: data instanceof FormData ? {} : { "Content-Type": "application/json" },
      body: data instanceof FormData ? data : JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Failed to post to ${endpoint}`);
    return res.json();
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Failed to put to ${endpoint}`);
    return res.json();
  }

  async delete<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`Failed to delete ${endpoint}`);
    return res.json();
  }
}

export const apiClient = new ApiClient(API_URL);
