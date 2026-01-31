from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import properties, users, analyze

app = FastAPI(
    title="Properties API",
    description="API for property listings",
    version="0.1.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(properties.router, prefix="/api/properties", tags=["properties"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(analyze.router, prefix="/api/analyze", tags=["analyze"])


@app.get("/health")
def health_check():
    return {"status": "ok"}
