"use client";

import { useState, useRef } from "react";
import { Upload, ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAnalyzeImage } from "@/hooks/use-analyze";
import type { AnalyzeResponse } from "@/lib/api";

export function ImageAnalyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: analyze, data, isPending, error, reset } = useAnalyzeImage();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      reset();
    }
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      analyze(selectedFile);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreview(null);
    reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Property Image Analyzer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="max-h-48 mx-auto rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Upload className="h-8 w-8" />
              <p>Click to upload an image</p>
              <p className="text-xs">Supports JPEG, PNG, WebP, GIF</p>
            </div>
          )}
        </div>

        {selectedFile && (
          <div className="flex gap-2">
            <Button
              onClick={handleAnalyze}
              disabled={isPending}
              className="flex-1"
            >
              {isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {isPending ? "Analyzing..." : "Analyze Image"}
            </Button>
            <Button variant="outline" onClick={handleClear}>
              Clear
            </Button>
          </div>
        )}

        {error && (
          <p className="text-sm text-destructive">
            Analysis failed: {error.message}
          </p>
        )}

        {data && <AnalysisResults result={data} />}
      </CardContent>
    </Card>
  );
}

function AnalysisResults({ result }: { result: AnalyzeResponse }) {
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
