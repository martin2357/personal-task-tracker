# Personal Task Tracker

A simple FastAPI demo project for practicing the structure of a small backend API.
The project includes a basic task tracker layout, a PostgreSQL database connection,
Pydantic schemas, local pytest tests, and a GitHub Actions workflow that runs tests
automatically.

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

## Run the app

Start the FastAPI development server:

```bash
uvicorn app.main:app --reload
```

Then open:

```text
http://127.0.0.1:8000/docs
```

## Run tests locally

```bash
python -m pytest
```

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
- Writing basic pytest tests
- Running tests automatically with GitHub Actions

## Possible future improvements

- Add database integration tests
- Add authentication
- Add task filtering and pagination
- Add better error handling
- Add frontend build or deployment steps
