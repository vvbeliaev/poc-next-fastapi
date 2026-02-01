# Project Overview & Guidelines

This project is a Proof of Concept (PoC) for a real estate property management and analysis platform, built with a modern stack featuring **Next.js** for the frontend and **FastAPI** for the backend.

## Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, DaisyUI, Lucide React.
- **Backend**: FastAPI (Python), SQLAlchemy ORM, Alembic (migrations).
- **Database**: PostgreSQL (managed via Prisma on the frontend and SQLAlchemy on the backend).
- **Architecture**: Strict Feature-Sliced Design (FSD) on the frontend, Hexagonal/Clean Architecture on the backend.

## Core Principles & Rules

### 1. Backend Architecture (Python/FastAPI)

- **Hexagonal Architecture**: The backend is organized into layers:
  - `domain`: Core business logic and entities.
  - `application`: Use cases and services.
  - `adapters/in`: Entry points (HTTP routers).
  - `adapters/out`: External integrations (Database/ORM).
- **ORM Logic**: SQLAlchemy is used for database interactions. All write operations (Create, Update, Delete) MUST be performed through the Python API.

### 2. Frontend Architecture (Next.js)

- **Strict Feature-Sliced Design (FSD)**: The `web/` directory follows FSD strictly:
  - `app/`: Routing and pages.
  - `widgets/`: Complex components composed of features/entities.
  - `features/`: User-facing actions (e.g., `auth`, `favorites`).
  - `entities/`: Domain-specific data and logic (e.g., `property`, `user`).
  - `shared/`: Reusable UI components, API clients, and utilities.
- **Database Access Rule**:
  - **Read-Only Prisma**: Next.js is allowed to read directly from the database using Prisma for performance and type safety in Server Components.
  - **Write via API**: Next.js MUST NOT perform write operations directly to the database. All writes must go through the FastAPI backend.

### 3. Development Workflow

- **Migrations**: Database schema changes are managed via Alembic in the `api/` directory.
- **Environment**: Use `docker-compose` for local development.
- **Mock Content**: Always write mock content and documentation in English unless specified otherwise.

## Project Structure

- `api/`: FastAPI backend implementation.
- `web/`: Next.js frontend implementation.
- `prisma/`: Prisma schema for frontend read-only access.
- `compose.yml`: Docker orchestration for the full stack.
