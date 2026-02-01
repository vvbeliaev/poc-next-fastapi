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
