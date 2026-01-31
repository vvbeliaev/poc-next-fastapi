db:
	docker compose -f compose.local.yml up -d db

dev:
	docker compose -f compose.local.yml up -d --build

# API commands
api-dev:
	cd api && uv run uvicorn main:app --reload --host 0.0.0.0 --port 8000

api-migrate:
	cd api && uv run alembic upgrade head

api-migrate-down:
	cd api && uv run alembic downgrade -1

# Web commands
web-dev:
	cd web && pnpm dev