from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.shared.database import get_db
from app.property.domain.schemas import PropertyResponse, PropertyCreate
from app.property.application.services import PropertyService

router = APIRouter()


def get_property_service(db: AsyncSession = Depends(get_db)) -> PropertyService:
    return PropertyService(db)


@router.get("", response_model=list[PropertyResponse])
async def get_properties(
    skip: int = 0,
    limit: int = 100,
    city: str | None = None,
    service: PropertyService = Depends(get_property_service),
):
    """Get all properties with optional city filter."""
    return await service.get_all(skip=skip, limit=limit, city=city)


@router.get("/{property_id}", response_model=PropertyResponse)
async def get_property(
    property_id: int, 
    service: PropertyService = Depends(get_property_service)
):
    """Get a single property by ID."""
    property_obj = await service.get_by_id(property_id)
    if not property_obj:
        raise HTTPException(status_code=404, detail="Property not found")
    return property_obj


@router.post("", response_model=PropertyResponse)
async def create_property(
    property_data: PropertyCreate, 
    service: PropertyService = Depends(get_property_service)
):
    """Create a new property."""
    return await service.create(property_data)
