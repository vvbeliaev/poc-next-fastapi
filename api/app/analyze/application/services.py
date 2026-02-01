import random

from app.analyze.domain.schemas import AnalyzeResponse


class AnalyzeService:
    """Application service for image analysis operations."""
    
    ALLOWED_CONTENT_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    
    def is_valid_content_type(self, content_type: str) -> bool:
        """Check if the content type is allowed."""
        return content_type in self.ALLOWED_CONTENT_TYPES
    
    def analyze(
        self, 
        filename: str, 
        file_size: int, 
        content_type: str
    ) -> AnalyzeResponse:
        """
        Analyze an image and return pseudo-analysis results.
        This is a dummy implementation that simulates image analysis.
        """
        analysis = {
            "property_type": random.choice(["apartment", "house", "studio", "penthouse"]),
            "estimated_rooms": random.randint(1, 5),
            "has_balcony": random.choice([True, False]),
            "has_parking": random.choice([True, False]),
            "condition": random.choice(["excellent", "good", "needs_renovation"]),
            "style": random.choice(["modern", "classic", "minimalist", "industrial"]),
            "natural_light": random.choice(["abundant", "moderate", "limited"]),
            "confidence_score": round(random.uniform(0.7, 0.99), 2),
        }
        
        return AnalyzeResponse(
            filename=filename,
            file_size=file_size,
            content_type=content_type,
            analysis=analysis,
        )
