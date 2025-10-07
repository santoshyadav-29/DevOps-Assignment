# Assignment 3: The Release Architect 🚀

## Overview

This assignment implements a professional, automated software release pipeline that triggers on Git tags and creates official releases with Docker images, vulnerability scans, and automated changelogs.

---

## Research & Concepts

### 1. Git Tags & Semantic Versioning

**What are Git Tags?**
Git tags are references that point to specific points in Git history. They're commonly used to mark release points (v1.0.0, v2.0.0, etc.).

**Semantic Versioning (SemVer)**
Format: `MAJOR.MINOR.PATCH` (e.g., v1.2.3)

- **MAJOR**: Incompatible API changes (v2.0.0)
- **MINOR**: New functionality, backwards compatible (v1.1.0)
- **PATCH**: Bug fixes, backwards compatible (v1.0.1)

**Pre-release versions:**

- `v1.0.0-alpha` - Early testing phase
- `v1.0.0-beta` - Feature complete, testing
- `v1.0.0-rc.1` - Release candidate

**Resources:**

- [Semantic Versioning](https://semver.org/)
- [Git Tagging Basics](https://git-scm.com/book/en/v2/Git-Basics-Tagging)

### 2. Release Automation

**GitHub Actions for Releases**

**softprops/action-gh-release:**

- Industry-standard action for creating GitHub releases
- Automatic changelog generation
- Asset uploading (binaries, archives)
- Pre-release detection
- Draft release support

**Why Automate Releases?**

- ✅ Consistency across releases
- ✅ Reduces human error
- ✅ Automatic documentation
- ✅ Professional appearance
- ✅ Integration with CI/CD pipeline

**Resources:**

- [softprops/action-gh-release](https://github.com/softprops/action-gh-release)
- [GitHub Releases Documentation](https://docs.github.com/en/repositories/releasing-projects-on-github)

### 3. Multi-Stage Docker Builds

**What is Multi-Stage Build?**
A Dockerfile technique using multiple `FROM` statements to create optimized images.

**Benefits:**

- **Smaller images**: Build dependencies aren't in final image
- **Better security**: Fewer packages = smaller attack surface
- **Separation of concerns**: Build environment vs. runtime environment

**Our Implementation:**

```dockerfile
# Stage 1: Build (Node.js + dependencies)
FROM node:20-alpine AS build
# ... build steps ...

# Stage 2: Production (Nginx only)
FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
```

**Result:** Final image is ~67MB instead of 300MB+

**Resources:**

- [Docker Multi-Stage Builds](https://docs.docker.com/build/building/multi-stage/)

### 4. Security Scanning with Trivy

**What is Trivy?**
Open-source vulnerability scanner for containers and other artifacts.

**What it Scans:**

- OS packages (Alpine, Debian, etc.)
- Language-specific dependencies (npm, pip, etc.)
- Known CVEs (Common Vulnerabilities and Exposures)

**Severity Levels:**

- CRITICAL: Immediate action required
- HIGH: Important to fix
- MEDIUM: Should fix when possible
- LOW: Minor issues

**Our Configuration:**

- Scans for CRITICAL and HIGH vulnerabilities
- Fails build if found
- Uploads results to GitHub Security tab

**Resources:**

- [Trivy Documentation](https://aquasecurity.github.io/trivy/)
- [GitHub Security Features](https://docs.github.com/en/code-security)

### 5. GitHub Container Registry (GHCR)

**What is GHCR?**
GitHub's container registry for storing Docker images.

**Benefits:**

- Integrated with GitHub
- Free for public repositories
- Automatic authentication with GITHUB_TOKEN
- Fine-grained access control

**Image Naming:**

```
ghcr.io/<owner>/<repository>:<tag>
ghcr.io/santoshyadav-29/leapfrog-journey:v1.0.0
```

**Resources:**

- [Working with Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)

---

## Release Workflow Architecture

### Trigger

```yaml
on:
  push:
    tags:
      - "v*"
```

**Explanation:**

- Only triggers when you push a tag starting with 'v'
- Examples: v1.0.0, v2.1.3-beta, v1.0.0-rc.1
- Does NOT trigger on regular commits

### Workflow Steps

#### 1. Checkout Code

```yaml
- uses: actions/checkout@v4
  with:
    fetch-depth: 0 # Full history for changelog
```

#### 2. Extract Version

Extracts version from tag (e.g., "refs/tags/v1.0.0" → "v1.0.0")

#### 3. Login to GHCR

Uses GitHub token for authentication

#### 4. Build Docker Image

Multi-stage build with caching

#### 5. Security Scan (Trivy)

```yaml
- uses: aquasecurity/trivy-action@master
  with:
    severity: "CRITICAL,HIGH"
    exit-code: "1" # Fail if vulnerabilities found
```

**Critical Step:** Build fails if security issues found!

#### 6. Push to Registry

Only happens if security scan passes

#### 7. Generate Changelog

Automatically creates changelog from commits and PRs

#### 8. Create GitHub Release

```yaml
- uses: softprops/action-gh-release@v1
  with:
    body: |
      ## 🚀 Release ${{ version }}
      ### 📦 Docker Image
      ### 📝 Changelog
      ### 🔒 Security
```

**Includes:**

- Docker pull command
- Changelog
- Security status
- Live demo link
- Auto-detects pre-releases

---

## How to Use

### Creating a Release

#### Step 1: Prepare Your Code

```bash
# Make sure all changes are committed
git add .
git commit -m "feat: Add new feature for release"
git push origin main
```

#### Step 2: Create a Tag

```bash
# For a new version
git tag v1.0.0

# For a pre-release
git tag v1.0.0-beta

# With annotation (recommended)
git tag -a v1.0.0 -m "Release version 1.0.0"
```

#### Step 3: Push the Tag

```bash
git push origin v1.0.0
```

#### Step 4: Watch the Magic ✨

1. GitHub Actions workflow triggers automatically
2. Builds Docker image
3. Scans for vulnerabilities
4. Pushes to GHCR
5. Creates GitHub Release

### Version Numbering Guide

**First Release:**

```bash
git tag v1.0.0
```

**Bug Fix:**

```bash
git tag v1.0.1  # Patch increment
```

**New Feature:**

```bash
git tag v1.1.0  # Minor increment
```

**Breaking Change:**

```bash
git tag v2.0.0  # Major increment
```

**Pre-releases:**

```bash
git tag v1.1.0-alpha.1  # Alpha testing
git tag v1.1.0-beta.1   # Beta testing
git tag v1.1.0-rc.1     # Release candidate
```

---

## Using Released Docker Images

### Pull from GHCR

```bash
# Pull specific version
docker pull ghcr.io/santoshyadav-29/leapfrog-journey:v1.0.0

# Pull latest
docker pull ghcr.io/santoshyadav-29/leapfrog-journey:latest

# Run the container
docker run -d -p 8080:80 ghcr.io/santoshyadav-29/leapfrog-journey:v1.0.0
```

### In Docker Compose

```yaml
services:
  leapfrog:
    image: ghcr.io/santoshyadav-29/leapfrog-journey:v1.0.0
    ports:
      - "8080:80"
```

### In Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: leapfrog-journey
spec:
  containers:
    - name: app
      image: ghcr.io/santoshyadav-29/leapfrog-journey:v1.0.0
```

---

## Security Features

### 1. Vulnerability Scanning

- Automated Trivy scan on every release
- Checks for CRITICAL and HIGH severity issues
- Build fails if vulnerabilities found

### 2. Multi-Stage Build

- Minimal final image size
- No build tools in production image
- Alpine Linux base (security-focused)

### 3. SARIF Upload

- Security results uploaded to GitHub
- Visible in Security tab
- Automated alerts for new vulnerabilities

### 4. Image Signing (Future Enhancement)

Consider adding:

- Cosign for image signing
- SBOM (Software Bill of Materials) generation

---

## Changelog Configuration

Located in `.github/changelog-config.json`

**Categories:**

- 🚀 Features
- 🐛 Bug Fixes
- 📝 Documentation
- 🔧 Maintenance
- 🔒 Security

**How to Use:**
Label your PRs and commits appropriately:

```bash
git commit -m "feat: Add new feature"      # → Features
git commit -m "fix: Fix critical bug"       # → Bug Fixes
git commit -m "docs: Update README"         # → Documentation
git commit -m "chore: Update dependencies"  # → Maintenance
git commit -m "security: Patch vulnerability" # → Security
```

---

## Monitoring & Status Badges

### Build Status Badge

Add to your README.md:

```markdown
[![Build & Test](https://github.com/santoshyadav-29/DevOps-Assignment/actions/workflows/build.yml/badge.svg)](https://github.com/santoshyadav-29/DevOps-Assignment/actions/workflows/build.yml)
```

### Release Status Badge

```markdown
[![Release](https://github.com/santoshyadav-29/DevOps-Assignment/actions/workflows/release.yml/badge.svg)](https://github.com/santoshyadav-29/DevOps-Assignment/actions/workflows/release.yml)
```

### Latest Release Badge

```markdown
[![Latest Release](https://img.shields.io/github/v/release/santoshyadav-29/DevOps-Assignment)](https://github.com/santoshyadav-29/DevOps-Assignment/releases/latest)
```

---

## Troubleshooting

### Release Not Creating?

**Check:**

1. Did you push the tag? `git push origin v1.0.0`
2. Does tag start with 'v'?
3. Check Actions tab for errors
4. Verify GITHUB_TOKEN permissions

### Security Scan Failing?

**Solutions:**

1. Update base images: `FROM node:20-alpine`
2. Update npm packages: `pnpm update`
3. Check Trivy results in Security tab
4. Fix or suppress specific vulnerabilities

### Docker Push Failing?

**Check:**

1. GHCR permissions set correctly
2. Repository is public or permissions granted
3. GITHUB_TOKEN has `packages: write`

---

## Best Practices Learned

### 1. Git Workflow

- ✅ Use semantic versioning
- ✅ Tag only stable, tested code
- ✅ Write meaningful commit messages
- ✅ Create annotated tags with descriptions

### 2. Security

- ✅ Scan every release
- ✅ Never ignore CRITICAL vulnerabilities
- ✅ Keep dependencies updated
- ✅ Use minimal base images

### 3. Automation

- ✅ Automate everything that can be automated
- ✅ Make releases reproducible
- ✅ Document the process
- ✅ Monitor build status

### 4. Documentation

- ✅ Clear release notes
- ✅ Docker usage examples
- ✅ Changelog for users
- ✅ Security status transparency

---

## Professional DevOps Practices Implemented

✅ **Semantic Versioning** - Industry-standard version numbering  
✅ **Automated Releases** - No manual GitHub release creation  
✅ **Security Scanning** - Vulnerability detection before deployment  
✅ **Container Registry** - Professional image distribution  
✅ **Changelog Generation** - Automatic release notes  
✅ **Multi-Stage Builds** - Optimized Docker images  
✅ **Status Badges** - Transparency and monitoring  
✅ **Event-Driven Workflows** - Responds to Git actions

---

## Resources & Further Reading

### Documentation

- [Semantic Versioning](https://semver.org/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Docker Multi-Stage Builds](https://docs.docker.com/build/building/multi-stage/)
- [Trivy Scanner](https://aquasecurity.github.io/trivy/)
- [GitHub Packages](https://docs.github.com/en/packages)

### Tools Used

- [softprops/action-gh-release](https://github.com/softprops/action-gh-release)
- [aquasecurity/trivy-action](https://github.com/aquasecurity/trivy-action)
- [docker/build-push-action](https://github.com/docker/build-push-action)
- [mikepenz/release-changelog-builder](https://github.com/mikepenz/release-changelog-builder-action)

### Real-World Examples

- [Kubernetes Releases](https://github.com/kubernetes/kubernetes/releases)
- [Docker Releases](https://github.com/docker/docker-ce/releases)
- [React Releases](https://github.com/facebook/react/releases)

---

## Submission

**Repository:** https://github.com/santoshyadav-29/DevOps-Assignment

**Workflows:**

- Build & Test: `.github/workflows/build.yml`
- Deployment: `.github/workflows/deploy.yml`
- Debug: `.github/workflows/debug.yml`
- **Release: `.github/workflows/release.yml`** ⭐

**Example Release:**
[To be added after first release]

**Docker Images:**

- `ghcr.io/santoshyadav-29/leapfrog-journey:latest`
- `ghcr.io/santoshyadav-29/leapfrog-journey:v1.0.0`

---

**Assignment Completed By:** Santosh Yadav  
**Date:** October 2025  
**Status:** 🚀 Release Architect Achieved!
