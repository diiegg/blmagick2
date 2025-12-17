# Debugging React Key Errors

## The Error You Encountered

```
Encountered two children with the same key, `penta-undefined`. 
Keys should be unique so that components maintain their identity across updates.
```

## Why It Happened

**Root Cause:** In `MysticalPattern.tsx`, the array iteration used `[...Array(count)]` which can create undefined indices when the count changes or during strict mode re-renders.

**Location:** Line 98
```tsx
// ❌ BAD - Can create undefined keys
{[...Array(pentagramCount)].map((_, i) => (
  <motion.div key={`penta-${i}`}>
))}
```

## The Fix

```tsx
// ✅ GOOD - Always creates valid keys
{Array.from({ length: pentagramCount }, (_, i) => (
  <motion.div key={`pentagram-${i}`}>
))}
```

**Changes Made:**
1. Used `Array.from()` instead of spread operator
2. Changed key prefix from `penta` to `pentagram` (more descriptive)
3. Applied same fix to all array iterations in the component

## How to Identify Key Errors in Testing

### Method 1: Browser Console (Easiest)

1. **Run dev server:** `pnpm dev`
2. **Open browser console** (F12 or Cmd+Option+I)
3. **Look for warnings:**
   ```
   Warning: Encountered two children with the same key
   ```
4. **React DevTools** (Chrome/Firefox extension):
   - Install React DevTools
   - Enable "Highlight updates"
   - Look for red/yellow flashing (duplicate renders)

### Method 2: Unit Tests with Console Spy

```tsx
it("should not have duplicate keys", () => {
  const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  
  render(<MysticalPattern />);
  
  // Check for React key warnings
  const hasKeyWarning = consoleErrorSpy.mock.calls.some(call => {
    const message = call[0]?.toString() || '';
    return message.includes('same key') && message.includes('undefined');
  });
  
  expect(hasKeyWarning).toBe(false);
  consoleErrorSpy.mockRestore();
});
```

### Method 3: ESLint (Prevention)

Enable React hooks eslint rules in `eslint.config.mjs`:

```js
{
  'react/jsx-key': 'error',
  'react/no-array-index-key': 'warn'
}
```

### Method 4: TypeScript Strict Mode

The issue often happens in **React Strict Mode** (dev only), which:
- Renders components twice
- Helps catch side effects
- Reveals key uniqueness issues

**To test without Strict Mode temporarily:**

```tsx
// src/app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {/* Remove <React.StrictMode> wrapper if present */}
        {children}
      </body>
    </html>
  );
}
```

## Common Patterns to Avoid

### ❌ Bad: Array Index as Key (with undefined risk)

```tsx
{[...Array(count)].map((_, i) => <div key={i} />)}
{items.map((_, index) => <div key={index} />)}  // When items change order
```

### ❌ Bad: Non-Unique IDs

```tsx
{items.map(item => <div key={item.type} />)}  // If type repeats
```

### ❌ Bad: Math.random() Keys

```tsx
{items.map(item => <div key={Math.random()} />)}  // Changes every render
```

### ✅ Good: Stable, Unique Keys

```tsx
// Best: Use unique ID from data
{items.map(item => <div key={item.id} />)}

// Good: Combine properties for uniqueness
{items.map((item, i) => <div key={`${item.type}-${item.id}-${i}`} />)}

// Good: Array.from with descriptive prefix
{Array.from({ length: count }, (_, i) => (
  <div key={`item-${i}`} />
))}
```

## Testing Checklist

- [ ] No console warnings in browser dev tools
- [ ] No duplicate keys in React DevTools
- [ ] Components maintain state during re-renders
- [ ] No "undefined" in key strings
- [ ] Keys remain stable across renders
- [ ] Unit tests spy on console.error for warnings

## Related Files

- **Fixed:** `src/components/animations/MysticalPattern.tsx`
- **Documentation:** `TESTING.md`
- **CI/CD:** `.github/workflows/ci.yml` (lint job catches some issues)

## References

- [React Docs: Lists and Keys](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)
- [React Warning: Unique Key Prop](https://react.dev/warnings/special-props)
- [ESLint React Rules](https://github.com/jsx-eslint/eslint-plugin-react/tree/master/docs/rules)
