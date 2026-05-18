from fastapi import FastAPI

app = FastAPI(
    title="Personal Task Tracker API",
    description="Simple local API for managing personal tasks.",
    version="0.1.0",
)


@app.get("/health")
def health_check():
    return {"status": "ok"}
