"use client";

import { useMutation } from "@tanstack/react-query";
import { analyzeImage, type AnalyzeResponse } from "@/lib/api";

export function useAnalyzeImage() {
  return useMutation<AnalyzeResponse, Error, File>({
    mutationFn: analyzeImage,
  });
}
