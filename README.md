# PropertyHub PoC: Next.js + FastAPI Real Estate Platform

A modern, full-stack Proof of Concept for a real estate property management and analysis platform. This project demonstrates a robust architecture combining the speed of Next.js with the power of FastAPI, following industry best practices for both frontend and backend development.

## 🚀 Tech Stack

### Frontend (Next.js)

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router) for server-side rendering and optimized routing.
- **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety and better developer experience.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
- **UI Components**: [DaisyUI](https://daisyui.com/) and [Lucide React](https://lucide.dev/) icons.
- **State Management & Data Fetching**: [React Query](https://tanstack.com/query/latest) for client-side state and caching.
- **Database Access**: [Prisma ORM](https://www.prisma.io/) (Read-only access) for efficient data retrieval in Server Components.
- **Architecture**: [Feature-Sliced Design (FSD)](https://feature-sliced.design/) for a scalable and maintainable codebase.

### Backend (FastAPI)

- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) for high-performance Python API development.
- **ORM**: [SQLAlchemy 2.0](https://www.sqlalchemy.org/) for robust database interactions.
- **Migrations**: [Alembic](https://alembic.sqlalchemy.org/) for database schema versioning.
- **Validation**: [Pydantic v2](https://docs.pydantic.dev/) for data validation and settings management.
- **Architecture**: **Hexagonal (Clean) Architecture** to decouple business logic from external concerns.

### Infrastructure & Tools

- **Database**: [PostgreSQL](https://www.postgresql.org/) as the primary relational data store.
- **Containerization**: [Docker](https://www.docker.com/) and Docker Compose for consistent development and deployment environments.
- **Package Management**: `pnpm` for frontend and `uv` for Python backend.

## 🏗️ Architecture Highlights

### Strict Write-Through Policy

To maintain data integrity and a single source of truth for business logic:

- **FastAPI** handles all **Write** operations (Create, Update, Delete). The backend contains the core business rules and validation logic.
- **Next.js** utilizes **Prisma** for high-performance **Read** operations directly from the database, while delegating all state-changing actions to the FastAPI REST API.

### Feature-Sliced Design (FSD)

The frontend is organized into layers that represent their scope of influence:

- `app`: Routing and global configurations.
- `widgets`: Compositional components (e.g., Header, Property Catalog).
- `features`: User-facing actions (e.g., Authentication, Adding to Favorites).
- `entities`: Business entities (e.g., Property, User) with their specific logic and UI.
- `shared`: Reusable, logic-free components and utilities.

### Hexagonal Backend

The backend is split into:

- `domain`: Pure business logic and entities.
- `application`: Use cases and orchestration.
- `adapters`:
  - `in`: HTTP routers and controllers.
  - `out`: Database repositories and external service integrations.

## 🛠️ Getting Started

### Prerequisites

- Docker & Docker Compose
- Node.js & pnpm
- Python & uv

### Local Development

1. Clone the repository.
2. Run `docker-compose up` to start the PostgreSQL database.
3. Navigate to `api/` and run the FastAPI server.
4. Navigate to `web/` and run the Next.js development server.

## 📄 License

This project is licensed under the MIT License.
