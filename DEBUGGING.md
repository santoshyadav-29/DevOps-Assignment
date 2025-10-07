# DEBUGGING.md - Assignment 2: The Debugging Detective 🕵️

## Part A: How the Working Pipeline Works

### Overview

The working pipeline from Assignment 1 is defined in `.github/workflows/build.yml` and consists of two sequential jobs that test and validate the application before deployment.

### Workflow Trigger

The workflow is triggered by two events:

```yaml
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
```

**What this means:**

- The workflow runs automatically whenever code is **pushed** to the `main` branch
- It also runs when a **pull request** is created or updated targeting the `main` branch
- This ensures all code is tested before it reaches production

### Job 1: test-job

**Purpose:** Validates code quality and ensures the application builds correctly

**Runs on:** `ubuntu-latest` (GitHub-hosted runner)

**Steps:**

1. **Checkout code** - Downloads the repository code
2. **Setup Node.js** - Installs Node.js version 20
3. **Install pnpm** - Installs pnpm package manager (v8.14.1)
4. **Get pnpm cache** - Determines cache location for dependencies
5. **Setup pnpm cache** - Caches dependencies for faster future builds
6. **Install dependencies** - Runs `pnpm install --frozen-lockfile`
7. **Run linter** - Executes ESLint to check code quality
8. **Build application** - Runs `pnpm run build` to compile TypeScript and bundle assets
9. **Verify build artifacts** - Checks that `dist/` folder and `index.html` exist

**If this job fails:** The entire workflow stops (fail-fast behavior)

### Job 2: build-job

**Purpose:** Validates that the Docker image can be built successfully

**Runs on:** `ubuntu-latest`

**Critical Configuration:**

```yaml
needs: test-job
```

**What the `needs` keyword does:**

- Creates a **dependency relationship** between jobs
- `build-job` will **only run** if `test-job` completes successfully
- If `test-job` fails, `build-job` is automatically **skipped**
- This prevents wasting resources building Docker images from broken code
- Ensures a logical execution order: test first, then build

**Steps:**

1. **Checkout code** - Downloads the repository code again (each job runs in isolation)
2. **Setup Docker Buildx** - Configures advanced Docker build features
3. **Build Docker image** - Builds image using `Dockerfile` with caching
4. **Test Docker image** - Verifies the image was created successfully

**Result:** Validates that the Dockerfile is correct and the image can be built

### Pipeline Flow Diagram

```
Push to main branch
        ↓
    Workflow starts
        ↓
    ┌─────────┐
    │test-job │ ← Runs first
    └────┬────┘
         │
    Pass or Fail?
         │
    ┌────┴────┐
    ↓         ↓
  Pass       Fail
    │         │
    ↓         └─→ Workflow stops ❌
┌──────────┐
│build-job │ ← Only runs if test-job passes
└────┬─────┘
     │
Pass or Fail?
     │
  Success ✅ or Failure ❌
```

### Key Concepts Explained

**1. Fail-Fast Behavior**

- If any step in a job fails, subsequent steps in that job are skipped
- The job is marked as failed
- Dependent jobs (like `build-job`) won't run

**2. Job Dependencies (`needs`)**

- Ensures proper execution order
- Prevents wasting CI/CD resources
- In this pipeline: We don't build Docker images from code that doesn't compile

**3. Caching**

- Speeds up builds by reusing dependencies
- The pnpm cache stores node_modules between runs
- Docker build cache stores image layers

**4. Isolation**

- Each job runs in a fresh environment
- That's why we checkout code in both jobs
- Jobs don't share state unless explicitly configured

### Why This Design?

This two-job design follows DevOps best practices:

- **Fast feedback:** Linting and build errors are caught early
- **Resource efficient:** Don't build Docker images if code doesn't compile
- **Clear separation:** Testing logic vs. Docker containerization logic
- **Debugging friendly:** Easy to identify whether issue is in code or Docker

---

## Part B: The "Break and Fix" Challenge

### Step 1: The Bug Introduction

**File Modified:** `Dockerfile.debug`

**Intentional Change Made:**
Changed line 2 from:

```dockerfile
FROM node:20-alpine AS build
```

To (example - document your actual bug):

```dockerfile
FROM node:18-this-is-a-fake-tag AS build
```

**Purpose:** Simulate a common mistake - using a non-existent Docker image tag

### Step 2: Pipeline Failure

**Failed Workflow Run:**
https://github.com/santoshyadav-29/DevOps-Assignment/actions/runs/[add-run-number]

**Screenshot of Error:**

![Debugging Error Screenshot](../public/debugging.png)

_Figure: Failed workflow showing Docker build error - "failed to resolve source metadata for docker.io/library/node:18-this-is-a-fake-tag"_

### Step 3: Error Analysis

**Error Message Received:**

```
[Paste the exact error message from Docker here]
```

**What the Error Means:**
[Explain in your own words what this error is telling you. For example:

- What part of the build process failed?
- Why did Docker give this specific error?
- What was it trying to do when it failed?]

**Root Cause:**
[Explain why this error occurred. For example:

- The image tag doesn't exist in Docker Hub
- Docker couldn't find/pull the base image
- The build process couldn't start without a valid base image]

### Step 4: The Fix

**Action Taken:**
[Describe what you changed to fix the issue]

**Corrected Code:**

```dockerfile
FROM node:20-alpine AS build
```

**Why This Fix Works:**
[Explain why this solution resolves the error. For example:

- node:20-alpine is a valid, existing image on Docker Hub
- Alpine is a lightweight Linux distribution perfect for containers
- This is the same version used in the working Dockerfile]

### Step 5: Verification

**Successful Workflow Run:**
[Add link to your successful workflow run here]

**Result:**

- ✅ test-job: Passed
- ✅ build-job: Passed
- ✅ Docker image built successfully

### Lessons Learned

**1. Reading Error Logs**
[What did you learn about reading CI/CD error messages?]

**2. Docker Image Tags**
[What did you learn about Docker image naming and tags?]

**3. Debugging Process**
[What steps did you follow to identify and fix the issue?]

**4. Prevention**
[How could this error be prevented in the future?]

### Key Takeaways

- ✅ Always verify Docker image tags exist before using them
- ✅ Read error messages carefully - they often contain the exact problem
- ✅ CI/CD pipelines provide fast feedback about infrastructure issues
- ✅ The `needs` keyword prevents cascading failures
- ✅ Documentation helps team members learn from mistakes

---

## Submission

**Repository:** https://github.com/santoshyadav-29/DevOps-Assignment

**Workflow Runs:**

- Failed run: [Add link]
- Successful run: [Add link]

**Assignment Completed:** [Add date]

---

_Note: This documentation is part of Assignment 2 - The Debugging Detective. The intentional bug was introduced as a learning exercise to practice reading error logs and troubleshooting CI/CD pipeline failures._
