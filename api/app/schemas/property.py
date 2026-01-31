from datetime import datetime
from pydantic import BaseModel


class PropertyBase(BaseModel):
    title: str
    description: str | None = None
    price: float
    address: str
    city: str
    bedrooms: int = 1
    bathrooms: int = 1
    area_sqm: float
    image_url: str | None = None


class PropertyCreate(PropertyBase):
    pass


class PropertyResponse(PropertyBase):
    id: int
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True
