# Leapfrog Journey - DevOps Assignment

[![Build & Test](https://github.com/santoshyadav-29/DevOps-Assignment/actions/workflows/build.yml/badge.svg)](https://github.com/santoshyadav-29/DevOps-Assignment/actions/workflows/build.yml)
[![Deploy](https://github.com/santoshyadav-29/DevOps-Assignment/actions/workflows/deploy.yml/badge.svg)](https://github.com/santoshyadav-29/DevOps-Assignment/actions/workflows/deploy.yml)
[![Release](https://github.com/santoshyadav-29/DevOps-Assignment/actions/workflows/release.yml/badge.svg)](https://github.com/santoshyadav-29/DevOps-Assignment/actions/workflows/release.yml)
[![Latest Release](https://img.shields.io/github/v/release/santoshyadav-29/DevOps-Assignment)](https://github.com/santoshyadav-29/DevOps-Assignment/releases/latest)

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

#### 4. Release Pipeline (`.github/workflows/release.yml`)

**Triggers**: Git tags starting with `v` (e.g., v1.0.0)

**Jobs**:

1. **build-and-release**: Multi-stage build, security scan, push to GHCR, create release

**Purpose**: Assignment 3 - Professional release automation (see `RELEASE_ARCHITECT.md`)

### Deployment

The application is automatically deployed to GitHub Pages on every push to `main`.

**Live URL**: `https://santoshyadav-29.github.io/DevOps-Assignment/`

**Docker Images**: `ghcr.io/santoshyadav-29/leapfrog-journey`

### Key Features

- ✅ Automated testing on every push
- ✅ Docker build validation
- ✅ Automatic deployment to GitHub Pages
- ✅ Security vulnerability scanning (Trivy)
- ✅ Automated release creation
- ✅ Container registry publishing (GHCR)
- ✅ Fail-fast behavior
- ✅ Build caching for faster runs

## Project Structure

```
├── .github/workflows/
│   ├── build.yml              # CI/CD pipeline (test & build)
│   ├── deploy.yml             # Deployment to GitHub Pages
│   ├── debug.yml              # Debug assignment workflow
│   └── release.yml            # Release automation workflow
├── src/                       # React source code
├── public/                    # Static assets
├── Dockerfile                 # Docker configuration (working)
├── Dockerfile.debug           # Docker configuration (for debugging)
├── nginx.conf                 # Nginx server config
├── DEBUGGING.md               # Assignment 2 documentation
├── RELEASE_ARCHITECT.md       # Assignment 3 documentation
└── package.json               # Dependencies
```

## Assignments

### Assignment 1: Docker & CI/CD Setup ✅

- Dockerfile with multi-stage build
- GitHub Actions workflow with test & build jobs
- Automated triggers and deployment

### Assignment 2: The Debugging Detective 🕵️ ✅

- Separate debugging workflow
- Intentional bug introduction and fixing
- Error analysis and documentation
- See `DEBUGGING.md` for details

### Assignment 3: The Release Architect 🚀

- Git tag-triggered release workflow
- Multi-stage Docker builds
- Trivy security scanning
- GitHub Container Registry (GHCR) publishing
- Automated changelog generation
- Professional release creation
- Status badges
- See `RELEASE_ARCHITECT.md` for complete guide

## Releases & Docker Images

### Creating a Release

```bash
# Tag your code with semantic version
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push the tag to trigger release workflow
git push origin v1.0.0
```

**What happens automatically:**

1. ✅ Builds multi-stage Docker image
2. ✅ Scans for security vulnerabilities (Trivy)
3. ✅ Pushes to GitHub Container Registry
4. ✅ Generates changelog
5. ✅ Creates GitHub Release with notes

### Using Released Docker Images

```bash
# Pull specific version
docker pull ghcr.io/santoshyadav-29/leapfrog-journey:v1.0.0

# Pull latest
docker pull ghcr.io/santoshyadav-29/leapfrog-journey:latest

# Run the container
docker run -d -p 8080:80 ghcr.io/santoshyadav-29/leapfrog-journey:v1.0.0
```

## Security

- ✅ Trivy vulnerability scanning on every release
- ✅ Build fails if critical vulnerabilities found
- ✅ SARIF results uploaded to GitHub Security tab
- ✅ Multi-stage builds for minimal attack surface
- ✅ Alpine-based images (~67MB)

## Links

- **Live Application**: https://santoshyadav-29.github.io/DevOps-Assignment/
- **Repository**: https://github.com/santoshyadav-29/DevOps-Assignment
- **Releases**: https://github.com/santoshyadav-29/DevOps-Assignment/releases
- **Container Images**: https://github.com/santoshyadav-29?tab=packages
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
