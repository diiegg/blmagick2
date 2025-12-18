# Deployment Quality Assurance Guide

## Why CI/CD Missed the Netlify Issues

### Root Causes Identified

1. **Environment Mismatch**
   - CI ran with Node 20, Netlify was configured with Node 18
   - No validation that CI environment matches production deployment

2. **Configuration Not Validated**
   - `netlify.toml` wasn't checked for correctness
   - Invalid redirect to `/index.html` (doesn't exist in Next.js static exports)
   - Build command inconsistency (npm vs pnpm)

3. **Build Output Not Inspected**
   - CI built successfully but didn't verify `out/` directory structure
   - No check that required files exist for static hosting

4. **Integration Testing Gap**
   - No actual deployment preview testing in CI
   - Tests passed locally but deployment failed

---

## Prevention Strategy Implemented

### 1. Pre-Build Validation Script

**Location:** `scripts/validate-deployment.js`

**What it checks:**
- ✅ Node.js version compatibility (local vs Netlify)
- ✅ Netlify.toml configuration correctness
- ✅ Next.js static export configuration
- ✅ Build output structure and critical files
- ✅ Package manager consistency
- ✅ Environment variables presence

**Usage:**
```bash
# Manual validation
pnpm validate:deployment

# Automatic (runs before every build)
pnpm build  # validation runs automatically via prebuild hook
```

### 2. Enhanced CI/CD Pipeline

**Added Steps:**

#### Pre-Build Validation
```yaml
- name: Validate Deployment Configuration
  run: pnpm validate:deployment
  continue-on-error: false  # FAIL FAST if config is wrong
```

#### Post-Build Verification
```yaml
- name: Post-build Validation
  run: |
    pnpm validate:deployment  # Re-validate with build output
    test -f out/index.html    # Critical files must exist
    test -d out/_next         # Static assets must exist
```

### 3. Branch Protection Rules

**Recommended Settings:**

For `main` branch:
- ✅ Require status checks to pass: `All Checks Passed ✓`
- ✅ Require branches to be up to date
- ✅ Include administrators in restrictions

For `dev` branch:
- ✅ Require status checks to pass
- ✅ Allow force pushes (for quick fixes)

---

## Quality Gates Checklist

### Before Merging to Dev

- [ ] All unit tests pass
- [ ] Linting and type checks pass
- [ ] Local build succeeds (`pnpm build`)
- [ ] Deployment validation passes (`pnpm validate:deployment`)
- [ ] Changes reviewed by at least one person

### Before Merging Dev → Main

- [ ] All CI/CD checks pass
- [ ] Deployment validation passes
- [ ] Netlify preview build succeeds
- [ ] Manual QA on Netlify preview URL
- [ ] No console errors in browser DevTools
- [ ] All critical pages load correctly

### Post-Deployment Verification

After merging to main, verify:

1. **Production URL loads** - https://yourdomain.com
2. **No 404 errors** - Check browser Network tab
3. **Static assets load** - Images, fonts, CSS, JS
4. **No console errors** - Check DevTools Console
5. **Footer effects work** - Hover glowing text
6. **Forms function** - Contact form submission
7. **Analytics working** - Sentry events tracked

---

## Automated Checks Added

### 1. Node Version Validation
```javascript
// Checks package.json engines field
// Compares with netlify.toml NODE_VERSION
// FAILS if mismatch detected
```

### 2. Netlify Config Validation
```javascript
// Validates:
// - NODE_VERSION >= 20
// - No invalid redirects to /index.html
// - Uses pnpm (not npm)
// - publish = "out"
// - Security headers present
```

### 3. Next.js Config Validation
```javascript
// Validates:
// - output: "export" (required for static)
// - images.unoptimized: true
// - trailingSlash configuration
```

### 4. Build Output Validation
```javascript
// Validates:
// - out/ directory exists
// - index.html or index page present
// - _next/ static assets present
// - 404 page exists
// - Reasonable build size
```

---

## Manual Testing Workflow

### Local Testing
```bash
# 1. Clean build
rm -rf .next out
pnpm build

# 2. Validate deployment config
pnpm validate:deployment

# 3. Test build locally
pnpm start  # or use `serve out/`

# 4. Check in browser
open http://localhost:3000
# Verify all pages, forms, effects work
```

### Preview Testing (Before Production)
```bash
# 1. Push to feature branch
git push origin feature/my-feature

# 2. Create PR to dev
gh pr create --base dev

# 3. Wait for Netlify preview
# Check PR comments for preview URL

# 4. Test preview thoroughly
# - All pages load
# - Forms work
# - No console errors
# - Footer effects functional
```

---

## Red Flags to Watch For

### ❌ Indicators of Potential Issues

1. **Build warnings ignored**
   ```
   ⚠ Module not found: Can't resolve 'x'
   ⚠ Image optimization disabled
   ```

2. **Environment variable missing**
   ```
   Warning: NEXT_PUBLIC_X is undefined
   ```

3. **Large bundle size increase**
   ```
   out/ size jumped from 2MB to 10MB
   ```

4. **Failed validation warnings**
   ```
   ⚠ Content-Security-Policy header not found
   ⚠ 404 page missing
   ```

5. **Different behavior local vs CI**
   - Passes locally, fails in CI = environment issue
   - Passes in CI, fails on Netlify = deployment config issue

---

## Emergency Rollback Procedure

If production is broken:

### Quick Rollback
```bash
# 1. Revert last commit on main
git revert HEAD
git push origin main

# 2. Or force push previous working commit
git reset --hard <last-good-commit>
git push --force origin main
```

### Via Netlify Dashboard
1. Go to Netlify → Deploys
2. Find last successful deploy
3. Click "Publish deploy"
4. Confirm rollback

---

## Continuous Improvement

### Add These Tests Later

1. **Visual Regression Testing**
   ```bash
   npm install --save-dev @playwright/test
   # Screenshot comparison tests
   ```

2. **Performance Budgets**
   ```javascript
   // Fail if Lighthouse score < 90
   // Fail if First Contentful Paint > 1.5s
   ```

3. **Smoke Tests**
   ```bash
   # After deployment, automated checks:
   curl -f https://yourdomain.com || exit 1
   curl -f https://yourdomain.com/about || exit 1
   ```

4. **Monitoring Alerts**
   - Sentry error threshold exceeded
   - Page load time increased
   - Traffic drop detected

---

## Summary

### What Changed

| Before | After |
|--------|-------|
| ❌ No config validation | ✅ Pre-build validation script |
| ❌ Manual checks only | ✅ Automated CI/CD validation |
| ❌ Build passes, deploy fails | ✅ Fail fast on config errors |
| ❌ No environment parity check | ✅ Node version validation |
| ❌ Silent issues | ✅ Clear error messages |

### Expected Outcome

🎯 **Zero deployment failures** due to:
- Configuration errors
- Environment mismatches  
- Missing critical files
- Invalid redirects

The validation script will **catch issues before they reach production**, ensuring only deployment-ready code makes it through the pipeline.
