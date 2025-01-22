"""
--------------
File: main.py
Description: Main FastAPI application entry point
--------------
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from api.auth import router as auth_router

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Auto CRM API",
    description="Backend API for the Auto CRM system",
    version="0.1.0"
)

# Configure CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite's default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router)

@app.get("/")
async def read_root():
    """Root endpoint returning a welcome message."""
    return {"message": "Welcome to Auto CRM API"} 