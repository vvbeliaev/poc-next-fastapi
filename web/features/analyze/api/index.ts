import { API_URL } from "@/shared/api";
import type { AnalyzeResponse } from "../model";

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
