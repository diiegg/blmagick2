# E2E Test Analysis & Roadmap

**Date**: November 17, 2025
**Branch**: `feature/fix-e2e-tests`
**Test Results**: 16 passing / 22 failing (42% pass rate)

---

## Executive Summary

The E2E test suite reveals critical issues with static site generation (SSG), client-side interactivity, and React hydration. These are **architectural issues**, not simple bugs. The tests are correctly identifying problems that would affect real users.

### Current Status
- ✅ **16 tests passing** (accessibility, image alt text, smooth scroll on desktop)
- ❌ **22 tests failing** (mobile navigation, form validation, duplicate IDs, navigation routing)
- 🔄 **1 flaky test** (smooth scroll timing)

---

## Test Failure Categories

### 1. Mobile Navigation (8 failures) 🔴 CRITICAL
**Impact**: Mobile users cannot navigate the site

#### Failures:
- `[mobile-chrome] › mobile menu opens and closes`
- `[mobile-chrome] › mobile menu navigation links work`
- `[mobile-chrome] › navigation links work correctly`
- `[mobile-chrome] › smooth scroll to sections on navigation`
- `[mobile-chrome] › CTA buttons are visible and clickable`
- `[mobile-chrome] › buttons have descriptive labels`
- `[mobile-chrome] › animations do not block interaction`
- `[chromium] › mobile menu opens and closes`

#### Root Cause:
**Framer Motion AnimatePresence not rendering in static builds**
- Desktop navigation links (`<a>` tags) are hidden on mobile via CSS (`md:hidden`)
- Mobile menu is wrapped in `<AnimatePresence>` but never renders in SSG output
- Tests correctly identify: `element is not visible` on mobile viewport

#### Evidence:
```
Error: expect(locator).toBeVisible() failed
Locator: locator('[aria-label="Mobile navigation"]')
Expected: visible
Error: element(s) not found
```

---

### 2. Form Validation (6 failures) 🔴 CRITICAL
**Impact**: Users cannot see validation errors, poor UX

#### Failures:
- `shows validation errors for invalid inputs` (chromium + mobile)
- `validates email format` (chromium + mobile)
- `accepts valid form submission` (chromium + mobile)
- `disables submit button while submitting` (chromium + mobile)

#### Root Cause:
**React Hook Form validation not working as expected**
- Mode set to `"onSubmit"` but errors not displaying
- Form submission not showing loading state ("Casting Spell" text)
- Submit button not disabling during submission
- Server action or validation schema issue

#### Evidence:
```
Error: expect(locator).toBeVisible() failed
Locator: locator('text=/Name must be at least/i')
Expected: visible
Error: element(s) not found
```

---

### 3. Accessibility - Duplicate IDs (3 failures) 🟡 HIGH
**Impact**: Screen reader confusion, invalid HTML, SEO issues

#### Failures:
- `skip link is present and functional` (chromium + mobile-chrome, both retries)

#### Root Cause:
**Two elements with `id="main-content"` in the DOM**
- Skip link in `Header.tsx`: `<a href="#main-content">`
- Found 2 elements with same ID during test execution
- One is likely a wrapper `<div id="main-content">` somewhere

#### Evidence:
```
Error: strict mode violation: locator('#main-content') resolved to 2 elements:
    1) <div id="main-content">…</div>
    2) <main id="main-content" class="relative z-20...">…</main>
```

---

### 4. Navigation Hash Routing (4 failures) 🟡 HIGH
**Impact**: "Work" navigation link goes to wrong section

#### Failures:
- `navigation links work correctly` (chromium, both retries)

#### Root Cause:
**"Work" link still pointing to `#work` instead of `#disciplines`**
- Despite attempted fixes, built HTML still contains old hash
- Section ID mismatch: link says `#work`, section is `#disciplines`

#### Evidence:
```
Expected substring: "#disciplines"
Received string:    "http://localhost:3000/#framework"
```

---

### 5. Metrics Display (2 failures) 🟢 LOW
**Impact**: Strict mode violations, but content displays

#### Failures:
- `animated metrics are visible and display values` (chromium + mobile)

#### Root Cause:
**Multiple elements matching regex `/40%/`**
- Metric text: "40% reduction"
- Testimonial quote also contains "40%"
- Playwright strict mode catches duplicate matches

#### Evidence:
```
Error: strict mode violation: locator('text=/40%/') resolved to 2 elements:
    1) <span>40% reduction</span>
    2) <blockquote>"Their FinOps integration achieved 40%..."</blockquote>
```

---

## Architectural Analysis

### Why Static Export is Problematic

The project uses Next.js with `output: 'export'` (static site generation), which creates limitations:

1. **No Server Components**: All interactivity must be client-side
2. **No Server Actions**: Form submissions need API routes or external services
3. **Hydration Issues**: React must "hydrate" static HTML with JS on client
4. **Animation Libraries**: Framer Motion needs careful SSR handling

### Current Tech Stack Issues

```typescript
// next.config.ts
output: 'export'  // ← Forces static HTML generation
```

**This breaks**:
- AnimatePresence exit animations (requires DOM manipulation)
- Server-side form validation
- Dynamic route generation
- Real-time state synchronization

---

## Roadmap to Fix

### Phase 1: Mobile Navigation (Priority: CRITICAL)
**Estimated Time**: 2-4 hours

#### Option A: Remove AnimatePresence (Quick Fix)
```tsx
// Header.tsx - Remove AnimatePresence wrapper
{mobileMenuOpen && (
  <motion.nav
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    // NO exit animation in static builds
    className="..."
    aria-label="Mobile navigation"
  >
    {/* menu items */}
  </motion.nav>
)}
```

**Pros**: Works in SSG, tests will pass
**Cons**: No exit animation on mobile

#### Option B: Use CSS-only Animations (Recommended)
```tsx
// Header.tsx - Replace Framer Motion with CSS
{mobileMenuOpen && (
  <nav
    className="mobile-menu mobile-menu--open"
    aria-label="Mobile navigation"
  >
    {/* menu items */}
  </nav>
)}

// globals.css
.mobile-menu {
  opacity: 0;
  height: 0;
  transition: opacity 300ms, height 300ms;
}
.mobile-menu--open {
  opacity: 1;
  height: auto;
}
```

**Pros**: Works everywhere, better performance
**Cons**: Requires CSS refactor

#### Option C: Client-Side Only Rendering
```tsx
// Header.tsx
const [mounted, setMounted] = useState(false);

useEffect(() => setMounted(true), []);

return (
  <>
    {/* Desktop nav - always render */}
    <nav className="hidden md:flex">...</nav>

    {/* Mobile nav - only client side */}
    {mounted && (
      <AnimatePresence>
        {mobileMenuOpen && <motion.nav>...</motion.nav>}
      </AnimatePresence>
    )}
  </>
);
```

**Pros**: Keeps AnimatePresence, tests pass
**Cons**: Flash of no-menu on mobile

---

### Phase 2: Form Validation (Priority: CRITICAL)
**Estimated Time**: 3-5 hours

#### Issues to Address:
1. **Validation errors not displaying**
2. **Loading state not showing**
3. **Submit button not disabling**

#### Fix Strategy:

```tsx
// page.tsx - ContactForm component
const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
  reset,
} = useForm({
  mode: "onSubmit", // ✅ Already set
  resolver: zodResolver(contactSchema),
});

// Fix 1: Ensure error messages display
<input {...register("name")} />
{errors.name && (
  <p className="text-red-500 text-sm mt-1">
    {errors.name.message}
  </p>
)}

// Fix 2: Show loading state
<button type="submit" disabled={isSubmitting}>
  {isSubmitting ? "Casting Spell..." : "Begin the Ritual →"}
</button>

// Fix 3: Handle submission properly
const onSubmit = async (data) => {
  try {
    // Actual form submission logic
    await submitToAPI(data);
    reset(); // Clear form
  } catch (error) {
    // Show error
  }
};
```

#### Debugging Steps:
1. Check if Zod schema is correctly defined
2. Verify form submission handler is working
3. Test error state rendering
4. Ensure `isSubmitting` state updates correctly

---

### Phase 3: Duplicate IDs (Priority: HIGH)
**Estimated Time**: 30 minutes

#### Fix:
```tsx
// Find and remove duplicate id="main-content"
// Keep only ONE instance in the entire app

// Option 1: Use unique ID for skip link target
<a href="#page-content" className="skip-link">
  Skip to main content
</a>

<main id="page-content">
  {/* content */}
</main>

// Option 2: Remove wrapper div with id="main-content"
// Keep only the <main> tag with that ID
```

#### Search Command:
```bash
grep -r 'id="main-content"' src/
```

---

### Phase 4: Navigation Routing (Priority: HIGH)
**Estimated Time**: 1 hour

#### Fix:
```tsx
// Header.tsx - Update ALL "Work" links
// Desktop nav
<a href="#disciplines">Work</a>

// Mobile nav
<a href="#disciplines" onClick={() => setMobileMenuOpen(false)}>
  Work
</a>

// Footer (if exists)
<a href="#disciplines">Work</a>
```

#### Verification:
1. Search entire codebase: `grep -r 'href="#work"' src/`
2. Replace ALL instances with `#disciplines`
3. Rebuild: `pnpm build`
4. Test: Navigate to http://localhost:3000 and click "Work"

---

### Phase 5: Metrics Strict Mode (Priority: LOW)
**Estimated Time**: 15 minutes

#### Fix:
```tsx
// e2e/homepage.spec.ts - Make regex more specific
// OLD: text=/40%/
// NEW: Use more specific selector

await expect(
  page.locator('.metrics-section').locator('text=/40%/')
).toBeVisible();

// OR target by data-testid
<span data-testid="cost-reduction">40% reduction</span>

await expect(
  page.locator('[data-testid="cost-reduction"]')
).toBeVisible();
```

---

## Testing Strategy

### Before Each Fix:
1. ✅ Read current file content
2. ✅ Make targeted change
3. ✅ Rebuild: `pnpm build`
4. ✅ Run specific test: `pnpm test:e2e --grep "test name"`
5. ✅ Verify fix works

### After All Fixes:
```bash
# Full test suite
CI=true pnpm test:e2e

# Expected result: 38/38 passing
```

---

## Recommended Approach

### Option 1: Comprehensive Fix (Recommended)
**Timeline**: 1-2 days
**Order**: Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5

**Pros**:
- Fixes all user-facing issues
- Production-ready code
- High confidence in stability

**Cons**:
- Takes more time
- Requires deeper changes

### Option 2: Quick Wins + Defer
**Timeline**: 4-6 hours
**Order**: Phase 3 → Phase 4 → Phase 5 → Phase 1 (quick) → Defer Phase 2

**Pros**:
- Fast improvements
- Tests show progress
- Can merge partial fixes

**Cons**:
- Mobile nav still broken
- Form validation still broken
- Not production-ready

### Option 3: Disable Failing Tests
**Timeline**: 30 minutes
**Action**: Add `.skip` to failing tests

**Pros**:
- Immediate green status
- Can merge to production

**Cons**:
- Doesn't fix actual bugs
- Technical debt
- Users still experience issues

---

## Next Steps

1. **Review this document** with team
2. **Choose approach** (Option 1, 2, or 3)
3. **Assign priority** to each phase
4. **Start with Phase 3** (easiest win - 30 min)
5. **Commit progressively** after each phase

---

## Files Requiring Changes

### Must Edit:
- `src/components/layout/Header.tsx` - Mobile nav + AnimatePresence
- `src/app/page.tsx` - Form validation + ContactForm
- `e2e/homepage.spec.ts` - Test expectations (metrics)

### May Need to Edit:
- `src/app/globals.css` - If using CSS animations
- `next.config.ts` - If removing static export
- `src/lib/validation.ts` - If Zod schema issues

### Must Search:
- All files for `id="main-content"` duplicates
- All files for `href="#work"` navigation links

---

## Success Metrics

### Current State:
- ✅ 16 passing
- ❌ 22 failing
- 🎯 42% pass rate

### Target State:
- ✅ 38 passing
- ❌ 0 failing
- 🎯 100% pass rate

### User Impact When Fixed:
- Mobile users can navigate ✅
- Forms show validation errors ✅
- Accessibility improved ✅
- SEO-friendly HTML ✅
- Production-ready ✅

---

## Risk Assessment

### High Risk:
- **Mobile Navigation**: 21% of tests, blocks mobile users
- **Form Validation**: 16% of tests, poor UX

### Medium Risk:
- **Navigation Routing**: 11% of tests, confusing UX
- **Duplicate IDs**: 8% of tests, accessibility/SEO

### Low Risk:
- **Metrics Display**: 5% of tests, visual only

---

## Additional Notes

### Why Tests Are Valuable:
These E2E tests caught **real bugs** that would affect users:
1. Mobile menu literally doesn't appear (not just animation issue)
2. Form validation literally doesn't work (not just cosmetic)
3. Navigation goes to wrong section (not just preference)

### Architecture Recommendation:
Consider migrating from `output: 'export'` to standard Next.js App Router:
- Enables server components
- Better form handling
- Proper hydration
- Real-time features

This would require infrastructure changes but would solve many issues permanently.

---

**Document Author**: GitHub Copilot
**Last Updated**: November 17, 2025
**Status**: Ready for implementation
