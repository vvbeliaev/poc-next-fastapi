from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.shared.database import get_db
from app.property.domain.schemas import PropertyResponse, PropertyCreate
from app.property.application.services import PropertyService

router = APIRouter()


def get_property_service(db: AsyncSession = Depends(get_db)) -> PropertyService:
    return PropertyService(db)


@router.post("", response_model=PropertyResponse)
async def create_property(
    property_data: PropertyCreate,
    service: PropertyService = Depends(get_property_service),
):
    """Create a new property."""
    return await service.create(property_data)
