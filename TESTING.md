# Testing Guide

## Overview

This project has comprehensive testing coverage with both unit tests (Vitest) and end-to-end tests (Playwright). Tests are automatically run in the CI/CD pipeline on every push and pull request.

## Testing Stack

- **Unit Tests**: Vitest + React Testing Library
- **E2E Tests**: Playwright
- **Coverage**: Vitest Coverage (v8 provider)
- **Target Coverage**: Component-level thresholds (70%+ for tested components)
- **Console Error Detection**: Automatic React key warning detection
- **Quality Gates**: ESLint, TypeScript, Lighthouse, Bundle Analysis

## Quick Start

```bash
# Run unit tests in watch mode
pnpm test

# Run unit tests once
pnpm test:run

# Run tests with coverage report
pnpm test:coverage

# Run E2E tests
pnpm test:e2e

# Run E2E tests with UI
pnpm test:e2e:ui

# Run E2E tests in debug mode
pnpm test:e2e:debug

# Run all tests
pnpm test:all
```

## Unit Tests

### Configuration

Unit tests are configured in `vitest.config.ts`:
- Environment: jsdom (browser simulation)
- Setup file: `vitest.setup.ts`
- Coverage thresholds: 80% for all metrics
- Excludes: config files, type definitions, build artifacts

### Test Structure

```typescript
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Test implementation
  });
});
```

### Mocked Dependencies

The following are mocked globally in `vitest.setup.ts`:
- `next/navigation` (useRouter, usePathname, useSearchParams)
- `framer-motion` (all motion components)
- `IntersectionObserver` API
- `window.matchMedia` API
- `window.scrollTo` function

### Coverage Targets

| Metric | Global Threshold | Component Threshold |
|--------|-----------------|---------------------|
| Lines | 0% (tracking only) | 70% |
| Functions | 0% (tracking only) | 70% |
| Branches | 0% (tracking only) | 70% |
| Statements | 0% (tracking only) | 70% |

**Note:** Global thresholds are set to 0 to prevent CI failures while building up coverage. Per-component thresholds ensure quality for tested code.

### Test Files

- `src/components/layout/__tests__/Header.test.tsx` - Header navigation tests
- `src/components/__tests__/ContactForm.test.tsx` - Form validation and security
- `src/components/ui/__tests__/AnimatedMetrics.test.tsx` - Count-up animation logic
- `src/components/ui/__tests__/ErrorBoundary.test.tsx` - Error handling and Sentry integration

## Console Error Detection

### Automatic React Key Warning Detection

The test setup automatically detects and **fails tests** that produce React key warnings:

```typescript
// In vitest.setup.ts
beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation((...args) => {
    const message = args[0]?.toString() || '';

    // Fail test on React key warnings
    if (message.includes('same key') || message.includes('unique key')) {
      throw new Error(`React key warning detected: ${message}`);
    }
  });
});
```

### Detecting Console Errors in Tests

**Method 1: Automatic Detection (Recommended)**

The test setup automatically catches React key warnings. No additional code needed:

```typescript
// This will automatically fail if there are key warnings
it('should render list items', () => {
  render(<MyListComponent items={[1, 2, 3]} />);
  expect(screen.getByRole('list')).toBeInTheDocument();
});
```

**Method 2: Manual Console Spy (Advanced)**

For custom console error detection:

```typescript
import { vi } from 'vitest';

it('should not produce console errors', () => {
  const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  render(<MyComponent />);

  // Check for specific error patterns
  const hasErrors = consoleErrorSpy.mock.calls.some(call => {
    const message = call[0]?.toString() || '';
    return message.includes('your-error-pattern');
  });

  expect(hasErrors).toBe(false);
  expect(consoleErrorSpy).not.toHaveBeenCalled();

  consoleErrorSpy.mockRestore();
});
```

**Method 3: Testing Specific Error Messages**

```typescript
it('should log specific error when validation fails', () => {
  const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  render(<FormComponent />);
  fireEvent.submit(screen.getByRole('form'));

  expect(consoleErrorSpy).toHaveBeenCalledWith(
    expect.stringContaining('Validation failed')
  );

  consoleErrorSpy.mockRestore();
});
```

### Common Console Errors to Test

**1. React Key Warnings**

```typescript
// ❌ BAD - Will fail test automatically
{items.map((item, i) => <div key={i}>{item}</div>)}

// ✅ GOOD - No warnings
{items.map(item => <div key={item.id}>{item}</div>)}
```

**2. Invalid DOM Properties**

```typescript
// ❌ BAD - React doesn't recognize whileInView
<div whileInView={{ opacity: 1 }}>content</div>

// ✅ GOOD - Use motion component
<motion.div whileInView={{ opacity: 1 }}>content</motion.div>
```

**3. Missing Dependencies in useEffect**

```typescript
// ❌ BAD - Missing dependency warning
useEffect(() => {
  doSomething(value);
}, []); // Missing 'value' in deps

// ✅ GOOD - All dependencies included
useEffect(() => {
  doSomething(value);
}, [value]);
```

## React Key Error Testing

### Understanding React Keys

React uses keys to identify which items have changed, been added, or removed. Incorrect key usage causes:

- Duplicate key warnings
- Component state bugs
- Performance issues
- Rendering inconsistencies

### Testing for Key Errors

**Automated Detection (Built-in)**

All tests automatically check for key warnings. A test will fail if:

```
Warning: Encountered two children with the same key
```

**Manual Testing Approach**

1. **Browser Console Check**

```bash
pnpm dev
# Open http://localhost:3000
# Open DevTools Console (F12)
# Look for React warnings
```

2. **React DevTools**

Install [React DevTools](https://react.dev/learn/react-developer-tools) and:
- Enable "Highlight updates when components render"
- Check for duplicate key warnings (yellow/red highlights)
- Inspect component tree for key values

3. **Test with Different Data**

```typescript
it('should handle dynamic list updates without key warnings', () => {
  const { rerender } = render(<List items={[1, 2, 3]} />);

  // No warnings on initial render
  expect(screen.getAllByRole('listitem')).toHaveLength(3);

  // No warnings when items change
  rerender(<List items={[4, 5, 6]} />);
  expect(screen.getAllByRole('listitem')).toHaveLength(3);
});
```

### Key Best Practices

| Pattern | Status | Use Case |
|---------|--------|----------|
| `key={item.id}` | ✅ Best | Stable unique ID from data |
| `key={\`${item.type}-${item.id}\`}` | ✅ Good | Composite unique key |
| `key={nanoid()}` | ✅ Good | Generate stable ID once |
| `key={index}` | ⚠️ Caution | Static lists that never reorder |
| `key={Math.random()}` | ❌ Bad | Changes every render |
| `key={undefined}` | ❌ Bad | Causes duplicate key warnings |

### Fixing Common Key Issues

**Issue 1: Undefined Keys**

```typescript
// ❌ PROBLEM
{[...Array(count)].map((_, i) => <div key={`item-${i}`} />)}
// If count is undefined, creates undefined keys

// ✅ SOLUTION
{Array.from({ length: count || 0 }, (_, i) => (
  <div key={`item-${i}`}>{i}</div>
))}
```

**Issue 2: Duplicate Keys**

```typescript
// ❌ PROBLEM
{items.map((item, i) => <div key={item.type}>{item.name}</div>)}
// If multiple items have the same type

// ✅ SOLUTION
{items.map((item, i) => (
  <div key={`${item.type}-${item.id || i}`}>{item.name}</div>
))}
```

**Issue 3: Keys in Fragments**

```typescript
// ❌ PROBLEM
{items.map((item, i) => (
  <> {/* Fragments need keys in lists */}
    <div>{item.title}</div>
    <div>{item.content}</div>
  </>
))}

// ✅ SOLUTION
{items.map((item, i) => (
  <Fragment key={item.id}>
    <div>{item.title}</div>
    <div>{item.content}</div>
  </Fragment>
))}
```

### Testing Key Stability

```typescript
describe('List Component - Key Stability', () => {
  it('should maintain keys across re-renders', () => {
    const items = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];

    const { rerender, container } = render(<List items={items} />);

    // Get initial keys from DOM
    const initialKeys = Array.from(container.querySelectorAll('[data-testid]'))
      .map(el => el.getAttribute('data-testid'));

    // Re-render with same items
    rerender(<List items={items} />);

    // Keys should be identical
    const updatedKeys = Array.from(container.querySelectorAll('[data-testid]'))
      .map(el => el.getAttribute('data-testid'));

    expect(updatedKeys).toEqual(initialKeys);
  });

  it('should handle item reordering without warnings', () => {
    const items = [
      { id: '1', name: 'First' },
      { id: '2', name: 'Second' },
    ];

    const { rerender } = render(<List items={items} />);

    // Reverse order
    const reversed = [...items].reverse();
    rerender(<List items={reversed} />);

    // Check items are in new order
    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0]).toHaveTextContent('Second');
    expect(listItems[1]).toHaveTextContent('First');
  });
});
```

## Holistic Testing Stack

### Testing Pyramid

```
        /\
       /  \        E2E Tests (10%)
      /----\       - Critical user flows
     /      \      - Cross-browser compatibility
    /--------\
   /          \    Integration Tests (20%)
  /------------\   - Component interactions
 /              \  - API mocking
/----------------\ Unit Tests (70%)
                   - Component rendering
                   - Business logic
                   - Error handling
```

### Quality Gates

1. **Pre-commit** (lint-staged + husky)
   - Format code with Biome
   - No commits with formatting issues

2. **Local Development**
   - `pnpm test` - Unit tests in watch mode
   - `pnpm lint` - TypeScript + ESLint
   - Browser console monitoring

3. **CI/CD Pipeline**
   - Lint & TypeScript check
   - Unit tests with coverage
   - E2E tests across browsers
   - Lighthouse performance
   - Bundle size analysis

4. **Pre-deployment**
   - All tests passing
   - Coverage meets thresholds
   - Lighthouse score > 90
   - Bundle size within limits

### Test Coverage Strategy

**High Priority (70%+ coverage)**
- UI Components (`src/components/`)
- Form validation logic
- Error boundaries
- Critical user flows

**Medium Priority (50%+ coverage)**
- Utility functions (`src/lib/`)
- Custom hooks (`src/hooks/`)
- API integrations

**Low Priority (tracked but not enforced)**
- Configuration files
- Type definitions
- Layout components
- Static content

### Coverage Targets

| Metric | Threshold |
|--------|-----------|
| Lines | 80% |
| Functions | 80% |
| Branches | 80% |
| Statements | 80% |

### Test Files

- `src/components/layout/__tests__/Header.test.tsx` - Header navigation tests
- `src/components/__tests__/ContactForm.test.tsx` - Form validation and security
- `src/components/ui/__tests__/AnimatedMetrics.test.tsx` - Count-up animation logic
- `src/components/ui/__tests__/ErrorBoundary.test.tsx` - Error handling and Sentry integration

## E2E Tests

### Configuration

E2E tests are configured in `playwright.config.ts`:
- Test directory: `e2e/`
- Base URL: `http://localhost:3000`
- Browsers: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- Retries: 2 in CI, 0 locally
- Artifacts: Screenshots and videos on failure

### Test Files

- `e2e/homepage.spec.ts` - Critical user journeys:
  - Page load and section rendering
  - Navigation functionality
  - Smooth scrolling
  - CTA buttons
  - Animated metrics
  - Contact form validation and submission
  - Mobile menu interactions
  - Accessibility (skip links, ARIA labels, keyboard navigation)
  - Performance (load time, animation responsiveness)

### Running E2E Tests Locally

```bash
# Install browsers (first time only)
pnpm exec playwright install

# Run all tests
pnpm test:e2e

# Run in UI mode (recommended for development)
pnpm test:e2e:ui

# Run in debug mode
pnpm test:e2e:debug

# Run specific browser
pnpm exec playwright test --project=chromium

# Run specific test file
pnpm exec playwright test e2e/homepage.spec.ts
```

## CI/CD Integration

### Pipeline Jobs

The testing pipeline consists of 7 jobs:

1. **Lint & Type Check** - ESLint and TypeScript validation
2. **Unit Tests** - Vitest tests with coverage reporting
3. **Build** - Next.js production build
4. **Lighthouse** - Performance testing (PR to dev only)
5. **Bundle Analysis** - Build size tracking
6. **E2E Tests** - Playwright tests across browsers
7. **Deploy** - Netlify deployment (main branch only)

### Job Dependencies

```
lint → test → build → [lighthouse, bundle-analysis, e2e] → deploy
```

### Artifacts

The pipeline uploads the following artifacts:
- **coverage-report** (30 days) - Unit test coverage HTML reports
- **playwright-report** (30 days) - E2E test results and traces
- **build-output** (7 days) - Production build files

### Coverage Reports

Coverage reports are generated and uploaded on every CI run:
- **Format**: HTML + JSON + Text
- **Location**: `coverage/` directory
- **Access**: Download from GitHub Actions artifacts
- **Retention**: 30 days

### Viewing Test Results

1. Go to GitHub Actions tab
2. Click on the workflow run
3. View test results in job logs
4. Download artifacts for detailed reports

## Writing New Tests

### Unit Test Template

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { YourComponent } from '../YourComponent';

describe('YourComponent', () => {
  it('should render correctly', () => {
    render(<YourComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('should handle user interactions', async () => {
    render(<YourComponent />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(/* assertion */).toBe(true);
  });
});
```

### E2E Test Template

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should perform user action', async ({ page }) => {
    await page.click('button');
    await expect(page.locator('selector')).toBeVisible();
  });
});
```

## Best Practices

### Unit Tests

1. **Test behavior, not implementation** - Focus on what users see/experience
2. **Use semantic queries** - Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Mock external dependencies** - API calls, third-party libraries
4. **Test edge cases** - Empty states, errors, loading states
5. **Keep tests focused** - One assertion per test when possible

### E2E Tests

1. **Test critical paths** - Focus on user journeys that generate value
2. **Use stable selectors** - Prefer text content, ARIA labels, roles
3. **Wait for network idle** - Ensure page is fully loaded
4. **Test mobile responsiveness** - Include mobile viewport tests
5. **Verify accessibility** - Test keyboard navigation, ARIA attributes

## Debugging

### Unit Tests

```bash
# Run tests in UI mode
pnpm test:ui

# Run specific test file
pnpm test src/components/__tests__/Header.test.tsx

# Run tests matching pattern
pnpm test --grep "navigation"
```

### E2E Tests

```bash
# Run with UI (best for debugging)
pnpm test:e2e:ui

# Run in debug mode (step through tests)
pnpm test:e2e:debug

# Run headed mode (see browser)
pnpm exec playwright test --headed

# Generate test code (codegen)
pnpm exec playwright codegen http://localhost:3000
```

## Performance Considerations

### Unit Tests

- Use `vi.useFakeTimers()` for animation testing
- Mock heavy computations
- Avoid unnecessary re-renders
- Clean up after each test with `afterEach(cleanup)`

### E2E Tests

- Run tests in parallel when possible
- Use `page.waitForLoadState('networkidle')` sparingly
- Reuse authentication state across tests
- Set appropriate timeouts for slow operations

## Continuous Improvement

### Coverage Goals

Current coverage: **~75%** (target: 80%)

Priority areas for additional tests:
- [ ] Utility functions (`src/lib/utils.ts`)
- [ ] Security utilities (`src/lib/formSecurity.ts`)
- [ ] Custom hooks (`src/hooks/`)
- [ ] Remaining UI components

### E2E Test Expansion

Planned test scenarios:
- [ ] Form security (rate limiting, honeypot, CSRF)
- [ ] Error boundary edge cases
- [ ] Animation performance under load
- [ ] Multi-step user flows
- [ ] Cross-browser compatibility edge cases

## Troubleshooting

### Common Issues

**Tests fail with "Cannot find module"**
```bash
# Reinstall dependencies
pnpm install --frozen-lockfile
```

**E2E tests timeout**
```bash
# Increase timeout in playwright.config.ts
timeout: 60 * 1000, // 60 seconds
```

**Coverage not generating**
```bash
# Install coverage provider
pnpm add -D @vitest/coverage-v8
```

**Playwright browsers not found**
```bash
# Install browsers
pnpm exec playwright install --with-deps
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
