import { ImageAnalyzer } from "@/widgets/image-analyzer";

export default function AnalyzePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Analyze Property</h1>
        <p className="text-muted-foreground">
          Upload an image of a property to get an automated analysis of its
          features and condition.
        </p>
      </div>
      <ImageAnalyzer />
    </div>
  );
}
