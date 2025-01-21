"""
--------------
File: auth.py
Description: FastAPI routes for user authentication and profile management
--------------
"""

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from services.auth_service import AuthService, get_current_user

router = APIRouter(prefix="/auth", tags=["auth"])
auth_service = AuthService()

class UserProfile(BaseModel):
    id: str
    email: str
    full_name: Optional[str] = None
    role: str = "customer"

class UserProfileUpdate(BaseModel):
    full_name: Optional[str] = None

@router.get("/me")
async def get_profile(user: dict = Depends(get_current_user)) -> UserProfile:
    """Get the current user's profile."""
    return UserProfile(**user)

@router.patch("/me")
async def update_profile(
    profile: UserProfileUpdate,
    user: dict = Depends(get_current_user)
) -> UserProfile:
    """Update the current user's profile."""
    updated_user = await auth_service.update_user_profile(user["id"], profile.dict(exclude_unset=True))
    return UserProfile(**updated_user)

@router.get("/roles")
async def get_roles(user: dict = Depends(get_current_user)) -> dict:
    """Get the current user's role."""
    return {"role": user.get("role", "customer")} 