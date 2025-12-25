# Impactin — Project README (Draft)

## 1. Developer Team

- **Developer Team:** _(fill this in)_

---

## 2. Architecture 🔧

### 2.1 Overview

This project runs as a set of containers on a VM (example: Azure VM) orchestrated by Docker Compose. The architecture diagram (provided) can be summarized as:

- React.js frontends (admin & user) serve the UI and call the public API on the VM.
- Go backend (Gin framework) exposes REST API endpoints under `/api` and handles business logic.
- MySQL database stores persistent data.
- All services are packaged as containers and started together by `docker compose`.

### 2.2 Data / Request Flow

1. User connects to the public address of the VM (frontends or API directly).
2. Frontend (React) calls the backend API endpoints (e.g., `http://<host>:8080/api/...`).
3. Backend (Go Gin) authenticates requests (JWT middleware), performs queries via GORM to MySQL, and returns JSON responses.
4. MySQL persists users, events, profiles, skills, applicants, and admin accounts.

> Diagram elements (from the pasted image): Azure VM (host) → Docker Compose → React.js (frontend) → Go Gin API → MySQL DB.

---

## 3. Code structure 📁

```txt
IPPL/
|-- backend/  # Go API (Gin + GORM)
|   |-- `cmd/` (entrypoint: `main.go`) — wires services, seeds admin, starts Gin server
|   |-- `Dockerfile` — image for backend service
|   |-- `internal/` — main application code
|   |   |-- `app/controllers/` — controllers (HTTP handlers)
|   |   |-- `app/dtos/` — request/response DTOs
|   |   |-- `app/models/` — GORM models (Event, User, Profile, Skill, Applicant, Admin)
|   |   |-- `app/repositories/` — DB access layer
|   |   |-- `app/routes/` — route definitions (e.g., `/api/user`, `/api/admin`, `/api/user/events`)
|   |   |-- `app/services/` — business logic
|   |   |-- `app/utils/` — middleware (CORS, Auth), JWT helpers
|   |   `-- config/` — database initialization and migration (`database.go`)
|
|-- frontend-admin/  # React admin frontend (Vite)
|   |-- `Dockerfile`
|   |-- `src/` — components, pages, API helpers
|
|-- frontend-user/   # React user frontend (Vite)
|   |-- `Dockerfile`
|   |-- `src/` — components, pages, API helpers (`src/api/api.js` sets `baseURL: http://localhost:8080/api`)
|
|-- `docker-compose.yml` — orchestrates services: `mysql`, `phpmyadmin`, `backend`, `frontend_admin`, `frontend_user`
|-- `sequence-diagram/` and `usecases/` — UML / flow diagrams

Notes and specifics:
- Backend seeds an admin user on first run (username: `admin`, password: `admin123`).
- Backend reads DB config from environment variables: `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_NAME` (defaults provided).
- In Docker mode the backend reads `RESET_DB` env var and will drop & recreate tables if `RESET_DB=true`.
- JWT secret defaults to `defaultsecret` if `JWT_SECRET` is not set (recommended to override in production).

---
```
## 4. Try Local — Quick start ✅

### 4.1 Prerequisites

- Docker & Docker Compose (v2) installed
- Git (optional)

### 4.2 Start services

1. From project root:

```bash
docker compose up --build
```

2. Containers and ports used by default (check `docker-compose.yml`):
- Backend: http://localhost:8080
- Frontend admin (dev): http://localhost:5173
- Frontend user (dev): http://localhost:5174
- phpMyAdmin: http://localhost:8081 (connects to MySQL service)

3. The backend will auto-create the database and run migrations. When `RESET_DB=true` in Docker Compose it will drop and recreate tables on container start.

### 4.3 Run backend without Docker (optional)

1. Ensure you have a local MySQL instance.
2. Set environment variables (e.g., `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_NAME`).
3. Run:

```bash
cd backend
go run ./cmd
```

> Local CLI mode will prompt `Delete all tables and start fresh? (yes/no):` if your DB already exists.

---

## 5. Access public (placeholder) 🌐

- **Public deployment steps / DNS / ports / firewall:** _(to be filled in)_
- Example items to include later:
  - VM IP / DNS name
  - Reverse proxy / SSL / firewall rules
  - CI/CD or docker-compose on VM services

---

## 6. Environment variables & useful notes 🔑

- Backend env vars used in Docker Compose:
  - `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `RESET_DB`
- JWT secret: `JWT_SECRET` (set for production)
- MySQL credentials in `docker-compose.yml`:
  - `MYSQL_ROOT_PASSWORD=root`
  - `MYSQL_USER=impactin_user`, `MYSQL_PASSWORD=impactin_pass`
- Default backend port: `8080` — frontends use this as `baseURL` in `src/api/api.js`.

---

## 7. Next steps / TODOs 👇

1. Fill **Developer Team** section.
2. Add **Access public** details (DNS, firewall, domain, SSL).
3. Add CI/CD / deployment playbook to publish to an Azure VM (or other cloud).

---

If you'd like, I can:
- Move this draft into the root `readme.md` (replace the file), or
- Make a more compact `README.md` and keep this as `README_GENERATED.md` (draft), or
- Expand each section (e.g., full environment variables recap, health checks, API endpoint list).

---

If you want, tell me which format you prefer (replace root `readme.md` or create/update one), and I will apply it.