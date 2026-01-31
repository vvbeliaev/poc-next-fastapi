import random
from fastapi import APIRouter, UploadFile, File, HTTPException

from app.schemas import AnalyzeResponse

router = APIRouter()


@router.post("", response_model=AnalyzeResponse)
async def analyze_image(file: UploadFile = File(...)):
    """
    Pseudo-analyze an uploaded image.
    This is a dummy endpoint that simulates image analysis.
    """
    # Validate file type
    allowed_types = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid file type. Allowed: {', '.join(allowed_types)}"
        )
    
    # Read file to get size
    contents = await file.read()
    file_size = len(contents)
    
    # Simulate analysis results (dummy data)
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
        filename=file.filename or "unknown",
        file_size=file_size,
        content_type=file.content_type or "unknown",
        analysis=analysis,
    )
