# Codecov Integration - Quick Reference

## ✅ Completed Setup

**Commit ID:** `56522183deb043d501f5d6483aae3730732652bb`

### Files Added/Modified

1. **`.github/workflows/ci.yml`**
   - Added `codecov/codecov-action@v4` step
   - Uploads `coverage/cobertura-coverage.xml` to Codecov
   - Runs after test coverage generation
   - Uses `CODECOV_TOKEN` secret (already configured)

2. **`codecov.yml`** (NEW)
   - Project-level configuration
   - Precision: 2 decimal places
   - Status checks: project & patch coverage
   - Ignore patterns: configs, tests, scripts, public files
   - PR comment layout: header, diff, files, footer

3. **`README.md`**
   - Added "Code Coverage Reports" section
   - Codecov badge: `[![codecov](https://codecov.io/gh/diiegg/blmagick2/branch/main/graph/badge.svg)](https://codecov.io/gh/diiegg/blmagick2)`
   - Coverage language documentation
   - Local testing instructions

---

## 📊 Coverage Language & Metrics

### Primary Metric: **Line Rate Coverage**

The badge displays **Line Rate** - the percentage of executable code lines covered by tests.

### Coverage Metrics Explained

| Metric | Definition | What It Measures |
|--------|------------|------------------|
| **Line Rate** | % of code lines executed | Primary coverage metric - shows how much of your codebase is tested |
| **Branch Rate** | % of conditional branches tested | Coverage of if/else, switch, ternary operators |
| **Function Coverage** | % of functions executed | How many functions are called during tests |
| **Statement Coverage** | % of statements executed | Individual statements run (similar to line coverage) |

### Report Format: Cobertura XML

```xml
<coverage line-rate="0.0477" branch-rate="0.6966" ...>
  <!-- line-rate = 4.77% = Lines covered / Total lines -->
  <!-- This is what displays in the badge -->
</coverage>
```

**Current Coverage:** ~4.77% line rate (264 lines covered out of 5,528 total)

---

## 🔧 GitHub Actions Workflow

### Test Job Sequence

```yaml
1. Run unit tests (pnpm test:run)
2. Generate coverage (pnpm test:coverage)
   ↓ Produces: cobertura-coverage.xml, HTML, JSON
3. Upload to Codecov (codecov-action@v4)
   ↓ Sends XML to Codecov dashboard
4. Upload to GitHub Artifacts (30-day retention)
5. Code Coverage Summary (irongut action)
   ↓ Generates markdown with badge
6. Add PR Comment (sticky-pull-request-comment)
```

### Required Secret

**`CODECOV_TOKEN`** - Already added to repository secrets ✅

---

## 📈 Accessing Coverage Reports

### 1. Codecov Dashboard
- **URL:** https://codecov.io/gh/diiegg/blmagick2
- **Features:** 
  - Visual coverage graphs
  - File-by-file breakdown
  - Historical trends
  - Pull request analysis
  - Sunburst charts

### 2. Pull Request Comments
- **Code Coverage Summary:** Inline PR comment with metrics table
- **Codecov Bot:** Automated PR comments with coverage changes
- **Format:** Markdown table showing line/branch rates

### 3. GitHub Actions Summary
- **Badge:** Shows line rate percentage
- **Artifacts:** Download `coverage-report.zip` → open `index.html`

### 4. Local Development
```bash
# Generate coverage
pnpm test:coverage

# View HTML report
open coverage/index.html

# View Cobertura XML
cat coverage/cobertura-coverage.xml | head -20
```

---

## 🎯 Badge Configuration

### Code Coverage Summary Badge

The `irongut/CodeCoverageSummary@v1.3.0` action generates a badge showing **line rate** coverage:

```yaml
badge: true              # ✅ Enable badge generation
hide_branch_rate: false  # Show branch rate in output
output: both             # Generate both console + markdown
thresholds: '0 70'       # Min: 0%, Target: 70%
```

**Badge Output Location:** `code-coverage-results.md`

**What displays:** Line rate percentage (e.g., "Coverage: 4.77%")

---

## 🔄 Next Steps

### When CI Pipeline Runs

1. **Test job completes** → Coverage XML uploaded to Codecov
2. **Codecov processes data** → Dashboard updated
3. **PR comment appears** → Shows coverage summary
4. **Badge updates** → Reflects latest line rate

### Verify Integration

1. Check GitHub Actions: https://github.com/diiegg/blmagick2/actions
2. Wait for test job to complete
3. Visit Codecov dashboard (may take 1-2 minutes)
4. View PR comment for coverage summary
5. Check badge in README (updates automatically)

### Expected Results

- ✅ Codecov badge in README shows ~4.77%
- ✅ Code Coverage Summary posts markdown comment on PRs
- ✅ Codecov dashboard shows file-by-file coverage
- ✅ Both metrics track the same **line rate** value

---

## 📝 Coverage Language Summary

**"What is line rate coverage?"**

> Line rate coverage is the percentage of executable code lines that were executed during testing. It measures how much of your source code is actually tested by your test suite.

**Example:**
```typescript
// File has 100 executable lines
// Tests execute 47 lines
// Line rate = 47/100 = 47% coverage
```

**Why line rate?**
- Most intuitive metric for developers
- Easy to understand (lines tested vs total lines)
- Standard across most coverage tools
- Aligns with code review practices

---

## 🛠️ Configuration Files

### `codecov.yml`
- Controls Codecov behavior
- Status checks (pass/fail)
- Comment layout
- Ignore patterns

### `.github/workflows/ci.yml`
- Runs tests and generates coverage
- Uploads to both Codecov and GitHub
- Creates PR comments
- Manages artifacts

### `vitest.config.ts`
- Generates coverage reports
- Output formats: cobertura, html, json, text
- Coverage thresholds (per-file)
- Excludes: configs, tests, scripts

---

## 🎉 Integration Complete!

All changes committed and pushed to `feature/phase5-testing-quality`.

**Commit:** `5652218`

Your next CI run will:
1. Upload coverage to Codecov
2. Display line rate badge
3. Post detailed PR comments
4. Track coverage trends

The badge language is **Line Rate Coverage** - the industry-standard metric for code coverage reporting.
