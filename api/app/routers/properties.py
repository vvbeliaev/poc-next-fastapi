from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import Property
from app.schemas import PropertyResponse, PropertyCreate

router = APIRouter()


@router.get("", response_model=list[PropertyResponse])
async def get_properties(
    skip: int = 0,
    limit: int = 100,
    city: str | None = None,
    db: AsyncSession = Depends(get_db),
):
    query = select(Property)
    if city:
        query = query.where(Property.city == city)
    query = query.offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/{property_id}", response_model=PropertyResponse)
async def get_property(property_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Property).where(Property.id == property_id))
    property = result.scalar_one_or_none()
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    return property


@router.post("", response_model=PropertyResponse)
async def create_property(property_data: PropertyCreate, db: AsyncSession = Depends(get_db)):
    property = Property(**property_data.model_dump())
    db.add(property)
    await db.commit()
    await db.refresh(property)
    return property
