# Leapfrog Journey - DevOps Assignment

A single-page React application documenting the Leapfrog Student Partnership Program experience.

## Tech Stack

- React 19 + TypeScript
- Vite (Build tool)
- pnpm (Package manager)
- Docker + Nginx
- GitHub Actions (CI/CD)

## Local Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm run dev

# Build for production
pnpm run build

# Run linter
pnpm run lint
```

## Docker

### Build & Run

```bash
# Build image
docker build -t leapfrog-journey:latest .

# Run container
docker run -d -p 8080:80 --name leapfrog-app leapfrog-journey:latest

# Access at http://localhost:8080
```

### Architecture

- **Multi-stage build**: Node.js (build) → Nginx (serve)
- **Base images**: Alpine Linux for minimal size
- **Final image size**: ~67MB
- **Port**: 80 (mapped to host 8080)

## CI/CD Pipeline

### Workflow: `.github/workflows/build.yml`

**Triggers**: Push/PR to `main` branch

**Jobs**:

1. **test-job**: Runs linter and builds application
2. **build-job**: Builds Docker image (depends on test-job)

```
Push to main → test-job → build-job → Success
                   ↓
                  Fail → Workflow stops
```

### Key Features

- ✅ Automated testing on every push
- ✅ Docker build validation
- ✅ Fail-fast behavior
- ✅ Build caching for faster runs

## Project Structure

```
├── .github/workflows/build.yml    # CI/CD pipeline
├── src/                           # React source code
├── public/                        # Static assets
├── Dockerfile                     # Docker configuration
├── nginx.conf                     # Nginx server config
└── package.json                   # Dependencies
```

## Assignment Requirements

✅ Dockerfile with multi-stage build  
✅ GitHub Actions workflow with test & build jobs  
✅ Automated triggers on push to main  
✅ Job dependency using `needs` keyword  
✅ Docker build validation without push

---

**Leapfrog Student Partnership Program** | October 2025
