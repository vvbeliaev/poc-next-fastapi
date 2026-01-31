from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import User
from app.schemas import UserResponse, UserCreate, FavoritesUpdate

router = APIRouter()


@router.post("", response_model=UserResponse)
async def create_user(user_data: UserCreate, db: AsyncSession = Depends(get_db)):
    # Check if user already exists
    result = await db.execute(select(User).where(User.email == user_data.email))
    existing = result.scalar_one_or_none()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user = User(**user_data.model_dump(), favorites={"property_ids": []})
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.get("/{user_id}/favorites", response_model=list[int])
async def get_favorites(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user.favorites.get("property_ids", [])


@router.put("/{user_id}/favorites", response_model=UserResponse)
async def update_favorites(
    user_id: int, 
    favorites_data: FavoritesUpdate, 
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.favorites = {"property_ids": favorites_data.property_ids}
    await db.commit()
    await db.refresh(user)
    return user


@router.post("/{user_id}/favorites/{property_id}", response_model=UserResponse)
async def add_favorite(user_id: int, property_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    current_favorites = user.favorites.get("property_ids", [])
    if property_id not in current_favorites:
        current_favorites.append(property_id)
        user.favorites = {"property_ids": current_favorites}
        await db.commit()
        await db.refresh(user)
    
    return user


@router.delete("/{user_id}/favorites/{property_id}", response_model=UserResponse)
async def remove_favorite(user_id: int, property_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    current_favorites = user.favorites.get("property_ids", [])
    if property_id in current_favorites:
        current_favorites.remove(property_id)
        user.favorites = {"property_ids": current_favorites}
        await db.commit()
        await db.refresh(user)
    
    return user
