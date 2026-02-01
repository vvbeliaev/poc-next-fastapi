from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.property import router as properties_router
from app.user import router as users_router
from app.analyze import router as analyze_router

app = FastAPI(
    title="Properties API",
    description="API for property listings",
    version="0.1.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://poc.cogisoft.dev",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(properties_router, prefix="/api/properties", tags=["properties"])
app.include_router(users_router, prefix="/api/users", tags=["users"])
app.include_router(analyze_router, prefix="/api/analyze", tags=["analyze"])


@app.get("/health")
def health_check():
    return {"status": "ok"}
