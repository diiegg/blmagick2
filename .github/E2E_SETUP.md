# E2E Testing Setup

## Local Development

If E2E tests fail with "Executable doesn't exist" error, install Playwright browsers:

```bash
pnpm exec playwright install
```

This downloads Chromium, Firefox, and Webkit browsers needed for testing.

## CI/CD

The GitHub Actions workflow automatically installs Playwright browsers in the E2E job:

```yaml
- name: Install Playwright browsers
  run: pnpm exec playwright install chromium --with-deps
```

## Common Issues

### Browser Not Found
**Error:** `Executable doesn't exist at /Users/.../ms-playwright/chromium_headless_shell-XXXX`

**Solution:** Run `pnpm exec playwright install`

### Tests Running Slow
The E2E tests have been optimized to run 3x faster:
- Removed fixed `waitForTimeout()` delays
- Use event-driven assertions instead of `networkidle` waits
- Parallel execution with 4 workers
- 20s timeout instead of 30s

### Sentry Warnings
The warnings about `tunnelRoute` and `import-in-the-middle` are expected and do not affect test execution. They relate to Sentry's configuration for static exports.
