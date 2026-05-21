from fastapi import FastAPI

from app.routers import tasks

app = FastAPI(
    title="Personal Task Tracker API",
    description="Simple local API for managing personal tasks.",
    version="0.1.0",
)

app.include_router(tasks.router)


@app.get("/health")
def health_check():
    return {"status": "ok"}
