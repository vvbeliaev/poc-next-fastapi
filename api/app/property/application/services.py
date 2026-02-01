from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.property.domain.model import Property
from app.property.domain.schemas import PropertyCreate


class PropertyService:
    """Application service for Property domain operations."""
    
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def get_all(
        self, 
        skip: int = 0, 
        limit: int = 100, 
        city: str | None = None
    ) -> list[Property]:
        """Get all properties with optional filtering."""
        query = select(Property)
        if city:
            query = query.where(Property.city == city)
        query = query.offset(skip).limit(limit)
        result = await self.db.execute(query)
        return list(result.scalars().all())
    
    async def get_by_id(self, property_id: int) -> Property | None:
        """Get a property by ID."""
        result = await self.db.execute(
            select(Property).where(Property.id == property_id)
        )
        return result.scalar_one_or_none()
    
    async def create(self, property_data: PropertyCreate) -> Property:
        """Create a new property."""
        property_obj = Property(**property_data.model_dump())
        self.db.add(property_obj)
        await self.db.commit()
        await self.db.refresh(property_obj)
        return property_obj
