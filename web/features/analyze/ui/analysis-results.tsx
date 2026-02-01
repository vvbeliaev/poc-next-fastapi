"use client";

import { Badge } from "@/shared/ui";
import type { AnalyzeResponse } from "../model";

interface AnalysisResultsProps {
  result: AnalyzeResponse;
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4 pt-4 border-t">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{result.filename}</span>
        <span className="text-muted-foreground">
          {formatBytes(result.file_size)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Property Type</p>
          <Badge variant="secondary">{result.analysis.property_type}</Badge>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Estimated Rooms</p>
          <Badge variant="secondary">{result.analysis.estimated_rooms}</Badge>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Style</p>
          <Badge variant="secondary">{result.analysis.style}</Badge>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Condition</p>
          <Badge variant="secondary">{result.analysis.condition}</Badge>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Natural Light</p>
          <Badge variant="secondary">{result.analysis.natural_light}</Badge>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Confidence</p>
          <Badge variant="outline">
            {(result.analysis.confidence_score * 100).toFixed(0)}%
          </Badge>
        </div>
      </div>

      <div className="flex gap-2">
        {result.analysis.has_balcony && (
          <Badge variant="outline">Has Balcony</Badge>
        )}
        {result.analysis.has_parking && (
          <Badge variant="outline">Has Parking</Badge>
        )}
      </div>
    </div>
  );
}
