"""
--------------
File: auth_service.py
Description: Service layer for handling Supabase authentication and user management
--------------
"""

import os
from typing import Optional, Dict, Any
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase import create_client, Client
from jose import JWTError, jwt
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

security = HTTPBearer()

# Initialize Supabase client
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_SERVICE_KEY")

if not supabase_url or not supabase_key:
    raise ValueError("SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in .env")

supabase: Client = create_client(supabase_url, supabase_key)

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> Dict[str, Any]:
    """
    Validate JWT token and return the current user.
    Raises HTTPException if token is invalid.
    """
    try:
        # Verify the JWT token
        token = credentials.credentials
        payload = jwt.decode(
            token,
            os.getenv("SUPABASE_JWT_SECRET", "your-jwt-secret"),
            algorithms=["HS256"]
        )
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
            )

        # Fetch user data from Supabase
        user = supabase.auth.admin.get_user_by_id(user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )

        return {
            "id": user.id,
            "email": user.email,
            "role": user.user_metadata.get("role", "customer"),
            "full_name": user.user_metadata.get("full_name"),
        }

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )

class AuthService:
    async def update_user_profile(
        self, user_id: str, profile_data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Update user profile in Supabase."""
        try:
            # Update user metadata
            user = supabase.auth.admin.update_user_by_id(
                user_id,
                {"user_metadata": profile_data}
            )

            return {
                "id": user.id,
                "email": user.email,
                "role": user.user_metadata.get("role", "customer"),
                "full_name": user.user_metadata.get("full_name"),
            }

        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(e),
            ) 