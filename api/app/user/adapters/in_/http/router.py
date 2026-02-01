from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.shared.database import get_db
from app.user.domain.schemas import UserResponse, UserCreate, FavoritesUpdate, UserLogin
from app.user.application.services import UserService

router = APIRouter()


def get_user_service(db: AsyncSession = Depends(get_db)) -> UserService:
    return UserService(db)


@router.post("/login", response_model=UserResponse)
async def login_user(
    login_data: UserLogin, service: UserService = Depends(get_user_service)
):
    """Login a user by email."""
    user = await service.get_by_email(login_data.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.post("", response_model=UserResponse)
async def create_user(
    user_data: UserCreate, service: UserService = Depends(get_user_service)
):
    """Create a new user."""
    # Check if user already exists
    existing = await service.get_by_email(user_data.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    return await service.create(user_data)


@router.put("/{user_id}/favorites", response_model=UserResponse)
async def update_favorites(
    user_id: int,
    favorites_data: FavoritesUpdate,
    service: UserService = Depends(get_user_service),
):
    """Update user's favorites list."""
    user = await service.update_favorites(user_id, favorites_data)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.post("/{user_id}/favorites/{property_id}", response_model=UserResponse)
async def add_favorite(
    user_id: int, property_id: int, service: UserService = Depends(get_user_service)
):
    """Add a property to user's favorites."""
    user = await service.add_favorite(user_id, property_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.delete("/{user_id}/favorites/{property_id}", response_model=UserResponse)
async def remove_favorite(
    user_id: int, property_id: int, service: UserService = Depends(get_user_service)
):
    """Remove a property from user's favorites."""
    user = await service.remove_favorite(user_id, property_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
