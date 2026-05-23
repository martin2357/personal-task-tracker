# Personal Task Tracker

A simple FastAPI demo project for practicing a small task tracker app.
The project has a FastAPI backend, a basic HTML/CSS/JavaScript frontend,
a PostgreSQL database connection, Pydantic schemas, pytest tests, and GitHub
Actions CI.

## Project structure

```text
personal-task-tracker/
├── app/
│   ├── main.py
│   ├── config.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── crud.py
│   └── routers/
│       └── tasks.py
├── frontend/
│   ├── index.html
│   ├── app.js
│   └── styles.css
├── tests/
│   └── test_schemas.py
├── .github/
│   └── workflows/
│       └── tests.yml
├── requirements.txt
└── README.md
```

## Setup

Create a virtual environment:

```bash
python -m venv .venv
```

Activate the virtual environment:

```bash
source .venv/bin/activate
```

On Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
python -m pip install -r requirements.txt
```

Create a `.env` file with a PostgreSQL connection string:

```env
DATABASE_URL=postgresql+psycopg://user:password@localhost:5432/personal_task_tracker
```

Update the username, password, host, port, and database name for your local setup.

## Run the backend

Start the FastAPI development server:

```bash
uvicorn app.main:app --reload
```

Useful backend URLs:

```text
http://127.0.0.1:8000/docs
http://127.0.0.1:8000/health
```

The backend does not currently define a root `/` endpoint, so
`http://127.0.0.1:8000/` may return `404 Not Found`. Use `/docs`, `/health`, or
the task endpoints instead.

Available task API endpoints:

```text
GET    /tasks
POST   /tasks
GET    /tasks/{task_id}
PATCH  /tasks/{task_id}
DELETE /tasks/{task_id}
```

## Open the frontend

Open `frontend/index.html` with Live Server.

The frontend expects the backend to be running at:

```text
http://127.0.0.1:8000
```

It calls the backend task endpoints to load, create, update, and delete tasks.
The backend CORS settings allow Live Server from:

```text
http://127.0.0.1:5500
http://localhost:5500
```

## Run tests

```bash
python -m pytest
```

The current tests cover the Pydantic schemas.

## GitHub Actions CI

The workflow in `.github/workflows/tests.yml` runs automatically on every push and
pull request. It uses Ubuntu, sets up Python 3.12, installs dependencies from
`requirements.txt`, and runs `python -m pytest`.

You can check the result in the repository's **Actions** tab on GitHub.

## What I practiced

- Creating a small FastAPI project structure
- Organizing routers, schemas, models, database setup, and CRUD code
- Reading configuration from environment variables
- Connecting the app to PostgreSQL
- Building a simple frontend that calls the API
- Writing basic pytest tests
- Running tests automatically with GitHub Actions

## Possible future improvements

- Add database integration tests
- Add authentication
- Add task filtering and pagination
- Add better error handling
- Add deployment instructions
