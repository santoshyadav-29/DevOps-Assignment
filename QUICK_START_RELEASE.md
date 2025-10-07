# Quick Start - Assignment 3: Release Architect 🚀

## Prerequisites ✅

Before creating your first release, make sure:

- [ ] All code is tested and working
- [ ] All workflows (build.yml, deploy.yml) are passing
- [ ] Your Dockerfile is optimized (multi-stage build)
- [ ] You understand semantic versioning

## Step-by-Step Guide

### Step 1: Verify Everything is Working

```bash
# Make sure you're on main branch
git checkout main

# Pull latest changes
git pull origin main

# Check that workflows are passing
# Go to: https://github.com/santoshyadav-29/DevOps-Assignment/actions
```

### Step 2: Create Your First Release (v1.0.0)

```bash
# Create an annotated tag
git tag -a v1.0.0 -m "🎉 First official release

Features:
- Leapfrog Journey single-page application
- Responsive design with hamburger menu
- Multiple sections (Team, Design Thinking, AI, DevOps)
- Multi-stage Docker build
- Automated CI/CD pipeline
"

# Push the tag
git push origin v1.0.0
```

### Step 3: Watch the Magic Happen ✨

1. **Go to Actions Tab**
   - https://github.com/santoshyadav-29/DevOps-Assignment/actions
2. **Click on "Release Pipeline" workflow**

   - You'll see it running

3. **Monitor Progress** (~3-5 minutes)
   - ✅ Checkout code
   - ✅ Build Docker image
   - ✅ Security scan (Trivy)
   - ✅ Push to GHCR
   - ✅ Generate changelog
   - ✅ Create release

### Step 4: View Your Release

1. **Go to Releases**

   - https://github.com/santoshyadav-29/DevOps-Assignment/releases

2. **You'll see:**
   - Release title (Release v1.0.0)
   - Docker pull command
   - Automated changelog
   - Security status
   - Live demo link

### Step 5: Test the Docker Image

```bash
# Pull your published image
docker pull ghcr.io/santoshyadav-29/leapfrog-journey:v1.0.0

# Run it
docker run -d -p 8080:80 --name leapfrog-v1 ghcr.io/santoshyadav-29/leapfrog-journey:v1.0.0

# Test in browser
# Open: http://localhost:8080

# Cleanup
docker stop leapfrog-v1
docker rm leapfrog-v1
```

## Creating Future Releases

### Bug Fix Release (v1.0.1)

```bash
# Fix the bug, commit changes
git add .
git commit -m "fix: Fix navigation issue"
git push origin main

# Create patch version tag
git tag -a v1.0.1 -m "Bug fix release"
git push origin v1.0.1
```

### Feature Release (v1.1.0)

```bash
# Add new feature, commit changes
git add .
git commit -m "feat: Add contact section"
git push origin main

# Create minor version tag
git tag -a v1.1.0 -m "New feature release"
git push origin v1.1.0
```

### Major Release (v2.0.0)

```bash
# Make breaking changes, commit
git add .
git commit -m "feat!: Complete redesign"
git push origin main

# Create major version tag
git tag -a v2.0.0 -m "Major release with breaking changes"
git push origin v2.0.0
```

### Pre-release Versions

```bash
# Alpha version
git tag -a v1.2.0-alpha.1 -m "Alpha testing version"
git push origin v1.2.0-alpha.1

# Beta version
git tag -a v1.2.0-beta.1 -m "Beta testing version"
git push origin v1.2.0-beta.1

# Release candidate
git tag -a v1.2.0-rc.1 -m "Release candidate"
git push origin v1.2.0-rc.1
```

## Troubleshooting

### Security Scan Fails

**Error**: "Trivy found CRITICAL or HIGH vulnerabilities"

**Solution**:

```bash
# Update dependencies locally
pnpm update

# Test build
docker build -t test-image .

# If passes, commit and retag
git add pnpm-lock.yaml
git commit -m "chore: Update dependencies for security"
git push origin main

# Delete old tag
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0

# Create new tag
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

### Image Not Appearing in GHCR

**Check**:

1. Go to repository Settings → Actions → General
2. Scroll to "Workflow permissions"
3. Ensure "Read and write permissions" is selected
4. Save changes
5. Re-run the workflow

### Release Not Creating

**Check**:

1. Tag starts with 'v' (v1.0.0, not 1.0.0)
2. Tag was pushed (`git push origin v1.0.0`)
3. Workflow has `contents: write` permission
4. Check Actions tab for error details

### Changelog is Empty

**Tip**: Use conventional commits:

```bash
# Good commits for changelog
git commit -m "feat: Add new feature"
git commit -m "fix: Fix critical bug"
git commit -m "docs: Update README"

# These will show up in categorized changelog
```

## Best Practices

### ✅ DO:

- Test locally before tagging
- Use semantic versioning
- Write descriptive tag messages
- Wait for all workflows to pass
- Check security scan results
- Verify image in GHCR

### ❌ DON'T:

- Tag broken code
- Reuse version numbers
- Skip testing
- Ignore security warnings
- Push tags without testing workflows

## Verification Checklist

Before considering the assignment complete:

- [ ] Release workflow exists (`.github/workflows/release.yml`)
- [ ] First release created successfully (v1.0.0)
- [ ] Docker image appears in GHCR
- [ ] Security scan passed
- [ ] Changelog generated automatically
- [ ] Release page looks professional
- [ ] Status badges added to README
- [ ] `RELEASE_ARCHITECT.md` documentation complete
- [ ] Can pull and run image from GHCR
- [ ] Understand semantic versioning

## Success Indicators

You've completed Assignment 3 when:

✅ You can create releases with one command (`git push origin vX.X.X`)  
✅ Images automatically appear in GitHub Container Registry  
✅ Security scans pass (or you know how to fix them)  
✅ Releases have professional-looking notes  
✅ Status badges show green in your README  
✅ Anyone can `docker pull` your image and run it

## Example: Perfect First Release

```bash
# 1. Final check
git status  # Clean working directory
git log --oneline -5  # Review recent commits

# 2. Create release tag
git tag -a v1.0.0 -m "🎉 Release v1.0.0 - Leapfrog Journey

This is the first official release of the Leapfrog Journey application.

Features:
- ✨ Single-page React application
- 🎨 Responsive design with mobile menu
- 📸 Photo gallery of program experiences
- 🐳 Dockerized with multi-stage build
- 🚀 Automated CI/CD pipeline
- 🔒 Security scanning with Trivy

Breaking Changes:
- None (first release)

Known Issues:
- None
"

# 3. Push the tag
git push origin v1.0.0

# 4. Wait 3-5 minutes

# 5. Check results
# - Actions tab: All green
# - Releases: v1.0.0 appears
# - Packages: Image available

# 6. Test the image
docker pull ghcr.io/santoshyadav-29/leapfrog-journey:v1.0.0
docker run -d -p 8080:80 ghcr.io/santoshyadav-29/leapfrog-journey:v1.0.0

# 7. Celebrate! 🎉
```

---

**Ready to become a Release Architect?** 🚀

Start with **Step 1** above and create your first release!
