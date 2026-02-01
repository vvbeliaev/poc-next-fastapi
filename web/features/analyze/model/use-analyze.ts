"use client";

import { useMutation } from "@tanstack/react-query";
import { analyzeImage } from "../api";
import type { AnalyzeResponse } from "./index";

export function useAnalyzeImage() {
  return useMutation<AnalyzeResponse, Error, File>({
    mutationFn: analyzeImage,
  });
}
