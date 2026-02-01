from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.user.domain.model import User
from app.user.domain.schemas import UserCreate, FavoritesUpdate


class UserService:
    """Application service for User domain operations."""
    
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def get_by_id(self, user_id: int) -> User | None:
        """Get a user by ID."""
        result = await self.db.execute(
            select(User).where(User.id == user_id)
        )
        return result.scalar_one_or_none()
    
    async def get_by_email(self, email: str) -> User | None:
        """Get a user by email."""
        result = await self.db.execute(
            select(User).where(User.email == email)
        )
        return result.scalar_one_or_none()
    
    async def create(self, user_data: UserCreate) -> User:
        """Create a new user."""
        user = User(
            **user_data.model_dump(), 
            favorites={"property_ids": []}
        )
        self.db.add(user)
        await self.db.commit()
        await self.db.refresh(user)
        return user
    
    async def get_favorites(self, user_id: int) -> list[int]:
        """Get user's favorite property IDs."""
        user = await self.get_by_id(user_id)
        if not user:
            return []
        return user.favorites.get("property_ids", [])
    
    async def update_favorites(
        self, 
        user_id: int, 
        favorites_data: FavoritesUpdate
    ) -> User | None:
        """Update user's favorites list."""
        user = await self.get_by_id(user_id)
        if not user:
            return None
        
        user.favorites = {"property_ids": favorites_data.property_ids}
        await self.db.commit()
        await self.db.refresh(user)
        return user
    
    async def add_favorite(self, user_id: int, property_id: int) -> User | None:
        """Add a property to user's favorites."""
        user = await self.get_by_id(user_id)
        if not user:
            return None
        
        current_favorites = user.favorites.get("property_ids", [])
        if property_id not in current_favorites:
            current_favorites.append(property_id)
            user.favorites = {"property_ids": current_favorites}
            await self.db.commit()
            await self.db.refresh(user)
        
        return user
    
    async def remove_favorite(self, user_id: int, property_id: int) -> User | None:
        """Remove a property from user's favorites."""
        user = await self.get_by_id(user_id)
        if not user:
            return None
        
        current_favorites = user.favorites.get("property_ids", [])
        if property_id in current_favorites:
            current_favorites.remove(property_id)
            user.favorites = {"property_ids": current_favorites}
            await self.db.commit()
            await self.db.refresh(user)
        
        return user
