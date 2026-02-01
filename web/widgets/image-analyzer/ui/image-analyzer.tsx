"use client";

import { useState, useRef } from "react";
import { Upload, ImageIcon, Loader2 } from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { useAnalyzeImage, AnalysisResults } from "@/features/analyze";

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
