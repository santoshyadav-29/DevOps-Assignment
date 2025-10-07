# Security Policy

## Vulnerability Management

### Current Status

This project uses Docker base images that may contain known vulnerabilities. We follow a risk-based approach to vulnerability management.

### Base Images Used

- **Build Stage**: `node:20-alpine` - Official Node.js Alpine image
- **Production Stage**: `nginx:alpine` - Official Nginx Alpine image

### Why Alpine Images?

Alpine Linux images are chosen because they:
- Are significantly smaller (67MB final image vs 200MB+ for Debian-based)
- Have a smaller attack surface
- Receive regular security updates from the Alpine Security Team
- Are industry-standard for containerized applications

### Known Vulnerabilities

#### Current Status (as of October 2025)

- **Node.js Alpine**: 2 high vulnerabilities (build stage only, not in final image)
- **Nginx Alpine**: 3 high vulnerabilities (in final production image)

#### Why We Accept These

1. **Build Stage Vulnerabilities**: The Node.js image is only used during build time and is NOT included in the final production image. These vulnerabilities don't affect the deployed application.

2. **Production Stage Vulnerabilities**: 
   - Many reported vulnerabilities in Alpine packages have no available fixes yet
   - The vulnerabilities may not be exploitable in our specific use case (static file serving)
   - We monitor for updates and apply them when available

### Our Security Approach

#### 1. **Multi-Stage Builds**
We use multi-stage Docker builds to ensure build dependencies don't make it to production:
```dockerfile
FROM node:20-alpine AS build  # Build artifacts
FROM nginx:alpine AS production  # Only serve static files
```

#### 2. **Regular Updates**
- Monitor Alpine Security advisories
- Update base images monthly or when critical CVEs are announced
- Automated scanning on every release

#### 3. **Trivy Security Scanning**
Every release is automatically scanned with Trivy:
- Scans for CRITICAL and HIGH severity vulnerabilities
- Results uploaded to GitHub Security tab
- Scan is informational (doesn't block releases) to avoid false positive disruption

#### 4. **Minimal Production Image**
Our final image:
- Serves only static files (no dynamic code execution)
- Runs non-root (Nginx default)
- Has no unnecessary packages or tools
- Uses official, signed base images

### Reporting Vulnerabilities

If you discover a security vulnerability:

1. **Do NOT open a public issue**
2. Email: [your-email@example.com] (or use GitHub Security Advisories)
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Security Scanning

You can scan the image yourself:

```bash
# Using Trivy
docker pull ghcr.io/santoshyadav-29/leapfrog-journey:latest
trivy image ghcr.io/santoshyadav-29/leapfrog-journey:latest

# Using Docker Scout
docker scout cves ghcr.io/santoshyadav-29/leapfrog-journey:latest
```

### Mitigation Strategies

Even with known base image vulnerabilities, we mitigate risks through:

1. **Defense in Depth**
   - Nginx security headers (X-Frame-Options, X-Content-Type-Options, etc.)
   - No unnecessary ports exposed
   - Health checks for availability monitoring

2. **Static Content Only**
   - Application serves pre-built static files
   - No server-side code execution
   - No database connections
   - Limited attack surface

3. **Container Best Practices**
   - Don't run as root
   - Read-only file system where possible
   - Resource limits configured
   - Network policies in production

### Update Schedule

- **Critical vulnerabilities**: Immediate update (within 24 hours)
- **High vulnerabilities**: Weekly review and update if fix available
- **Medium/Low vulnerabilities**: Monthly review during maintenance window

### References

- [Alpine Security](https://alpinelinux.org/security/)
- [Docker Security Best Practices](https://docs.docker.com/develop/security-best-practices/)
- [Trivy Documentation](https://aquasecurity.github.io/trivy/)
- [NIST Container Security Guide](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-190.pdf)

---

**Last Updated**: October 2025  
**Next Review**: Monthly or as needed
