# BlackMagickOps Web

[![codecov](https://codecov.io/gh/diiegg/blmagick2/branch/main/graph/badge.svg)](https://codecov.io/gh/diiegg/blmagick2)
[![Code Coverage](https://img.shields.io/codecov/c/github/diiegg/blmagick2/main?label=coverage&logo=codecov)](https://codecov.io/gh/diiegg/blmagick2)
[![CI/CD Pipeline](https://github.com/diiegg/blmagick2/actions/workflows/ci.yml/badge.svg)](https://github.com/diiegg/blmagick2/actions/workflows/ci.yml)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Code Coverage Reports

This project uses multiple coverage reporting tools to ensure code quality:

### 📊 Coverage Providers

1. **Codecov** - Main coverage dashboard
   - Badge: Shows line rate coverage percentage (updates automatically)
   - View detailed reports at: <https://codecov.io/gh/diiegg/blmagick2>

2. **Code Coverage Summary** - In-line PR comments & workflow badge
   - Automatically posts coverage metrics on pull requests
   - Generates badge in GitHub Actions workflow summary
   - Shows line rate, branch rate, and file-by-file breakdown
   - Generated using [irongut/CodeCoverageSummary](https://github.com/marketplace/actions/code-coverage-summary)

### 📈 Coverage Reports Generated

The test suite generates multiple coverage formats:
- **Cobertura XML**: `coverage/cobertura-coverage.xml` (used by Codecov and Code Coverage Summary)
- **HTML Report**: `coverage/index.html` (visual coverage browser)
- **JSON Report**: `coverage/coverage-final.json` (programmatic access)
- **Text Summary**: Console output during test runs

### 🧪 Running Coverage Locally

```bash
# Run tests with coverage report
pnpm test:coverage

# View HTML coverage report in browser
open coverage/index.html
```

### 📝 Coverage Language

**Primary Metric: Line Rate Coverage**
- **Line Rate**: Percentage of executable code lines covered by tests
- **Branch Rate**: Percentage of conditional branches tested
- **Function Coverage**: Percentage of functions executed in tests
- **Statement Coverage**: Percentage of statements executed

The badge displays **Line Rate** as the primary coverage metric, representing the percentage of code lines executed during testing.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
