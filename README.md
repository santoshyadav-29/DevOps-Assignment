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

### Workflows

#### 1. Build & Test (`.github/workflows/build.yml`)

**Triggers**: Push/PR to `main` branch

**Jobs**:

1. **test-job**: Runs linter and builds application
2. **build-job**: Builds Docker image (depends on test-job)

#### 2. Deploy (`.github/workflows/deploy.yml`)

**Triggers**: Push to `main` branch

**Jobs**:

1. **build**: Builds the application
2. **deploy**: Deploys to GitHub Pages

#### 3. Debug Assignment (`.github/workflows/debug.yml`)

**Triggers**: Changes to `Dockerfile.debug` or manual trigger

**Jobs**:

1. **test-job**: Runs tests
2. **build-job**: Builds Docker image from `Dockerfile.debug`

**Purpose**: Assignment 2 - Debugging practice (see `DEBUG_ASSIGNMENT.md`)

### Deployment

The application is automatically deployed to GitHub Pages on every push to `main`.

**Live URL**: `https://santoshyadav-29.github.io/DevOps-Assignment/`

### Key Features

- ✅ Automated testing on every push
- ✅ Docker build validation
- ✅ Automatic deployment to GitHub Pages
- ✅ Fail-fast behavior
- ✅ Build caching for faster runs

## Project Structure

```
├── .github/workflows/
│   ├── build.yml              # CI/CD pipeline (test & build)
│   ├── deploy.yml             # Deployment to GitHub Pages
│   └── debug.yml              # Debug assignment workflow
├── src/                       # React source code
├── public/                    # Static assets
├── Dockerfile                 # Docker configuration (working)
├── Dockerfile.debug           # Docker configuration (for debugging)
├── nginx.conf                 # Nginx server config
├── DEBUGGING.md               # Assignment 2 documentation
└── package.json               # Dependencies
```

## Assignments

### Assignment 1: Docker & CI/CD Setup ✅

- Dockerfile with multi-stage build
- GitHub Actions workflow with test & build jobs
- Automated triggers and deployment

### Assignment 2: The Debugging Detective 🕵️

- Separate debugging workflow
- Intentional bug introduction and fixing
- Error analysis and documentation
- See `DEBUG_ASSIGNMENT.md` for instructions

## Assignment Requirements

✅ Dockerfile with multi-stage build  
✅ GitHub Actions workflow with test & build jobs  
✅ Automated triggers on push to main  
✅ Job dependency using `needs` keyword  
✅ Docker build validation without push

---

**Leapfrog Student Partnership Program** | October 2025
