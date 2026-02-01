from fastapi import APIRouter, UploadFile, File, HTTPException

from app.analyze.domain.schemas import AnalyzeResponse
from app.analyze.application.services import AnalyzeService

router = APIRouter()


def get_analyze_service() -> AnalyzeService:
    return AnalyzeService()


@router.post("", response_model=AnalyzeResponse)
async def analyze_image(file: UploadFile = File(...)):
    """
    Analyze an uploaded property image.
    This is a pseudo-analysis endpoint that simulates image analysis.
    """
    service = get_analyze_service()
    
    # Validate file type
    if not file.content_type or not service.is_valid_content_type(file.content_type):
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid file type. Allowed: {', '.join(service.ALLOWED_CONTENT_TYPES)}"
        )
    
    # Read file to get size
    contents = await file.read()
    file_size = len(contents)
    
    return service.analyze(
        filename=file.filename or "unknown",
        file_size=file_size,
        content_type=file.content_type or "unknown",
    )
