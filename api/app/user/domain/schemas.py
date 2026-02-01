from datetime import datetime
from pydantic import BaseModel, EmailStr


class FavoritesData(BaseModel):
    property_ids: list[int] = []


class UserBase(BaseModel):
    email: EmailStr
    name: str | None = None


class UserCreate(UserBase):
    pass


class UserLogin(BaseModel):
    email: EmailStr


class UserResponse(UserBase):
    id: int
    favorites: FavoritesData
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True


class FavoritesUpdate(BaseModel):
    property_ids: list[int]
