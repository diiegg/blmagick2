#!/usr/bin/env node
/**
 * Pre-deployment validation script
 * Catches configuration errors before they reach production
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const errors = [];
const warnings = [];

console.log('🔍 Starting deployment validation...\n');

// ==================== 1. Node Version Check ====================
console.log('📦 Checking Node.js version...');
const currentNodeVersion = process.version;
const requiredNodeVersion = '20';
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

if (packageJson.engines?.node) {
  console.log(`   Required: ${packageJson.engines.node}`);
  console.log(`   Current: ${currentNodeVersion}`);
  
  const majorVersion = parseInt(currentNodeVersion.slice(1).split('.')[0]);
  if (majorVersion < parseInt(requiredNodeVersion)) {
    errors.push(`Node.js version ${currentNodeVersion} is below required version ${requiredNodeVersion}+`);
  }
} else {
  warnings.push('No Node.js version specified in package.json engines field');
}

// ==================== 2. Netlify Configuration Validation ====================
console.log('\n🌐 Validating netlify.toml...');
if (fs.existsSync('netlify.toml')) {
  const netlifyConfig = fs.readFileSync('netlify.toml', 'utf8');
  
  // Check Node version in Netlify config
  const nodeVersionMatch = netlifyConfig.match(/NODE_VERSION\s*=\s*"(\d+)"/);
  if (nodeVersionMatch) {
    const netlifyNodeVersion = parseInt(nodeVersionMatch[1]);
    console.log(`   Netlify Node version: ${netlifyNodeVersion}`);
    
    if (netlifyNodeVersion < parseInt(requiredNodeVersion)) {
      errors.push(`Netlify NODE_VERSION is ${netlifyNodeVersion}, should be ${requiredNodeVersion}+ for Next.js ${packageJson.dependencies.next}`);
    }
  } else {
    errors.push('NODE_VERSION not found in netlify.toml [build.environment]');
  }
  
  // Check for invalid redirect to /index.html
  if (netlifyConfig.includes('to = "/index.html"')) {
    errors.push('Invalid redirect to /index.html found. Next.js static exports do not use /index.html');
  }
  
  // Check build command uses pnpm
  if (!netlifyConfig.includes('pnpm')) {
    warnings.push('Build command should use pnpm, not npm, to match local development');
  }
  
  // Check publish directory
  if (!netlifyConfig.includes('publish = "out"')) {
    errors.push('Publish directory should be "out" for Next.js static export');
  }
  
  // Validate CSP header exists
  if (!netlifyConfig.includes('Content-Security-Policy')) {
    warnings.push('Content-Security-Policy header not found in netlify.toml');
  }
  
} else {
  errors.push('netlify.toml not found');
}

// ==================== 3. Next.js Configuration Validation ====================
console.log('\n⚡ Validating next.config.ts...');
if (fs.existsSync('next.config.ts')) {
  const nextConfig = fs.readFileSync('next.config.ts', 'utf8');
  
  // Check static export is enabled
  if (!nextConfig.includes('output: "export"')) {
    errors.push('next.config.ts must have output: "export" for static deployment');
  }
  
  // Check images are unoptimized (required for static export)
  if (!nextConfig.includes('unoptimized: true')) {
    warnings.push('images.unoptimized should be true for static export');
  }
  
  // Check trailing slash
  if (nextConfig.includes('trailingSlash: false')) {
    warnings.push('trailingSlash: false may cause routing issues with static exports');
  }
  
} else {
  errors.push('next.config.ts not found');
}

// ==================== 4. Build Output Validation ====================
console.log('\n🏗️  Validating build output...');
if (fs.existsSync('out')) {
  const outFiles = fs.readdirSync('out');
  console.log(`   Found ${outFiles.length} files in out/ directory`);
  
  // Check for critical files
  const hasIndexPage = outFiles.some(f => f === 'index.html' || f.startsWith('index'));
  if (!hasIndexPage) {
    errors.push('No index.html or index page found in out/ directory');
  }
  
  // Check for _next directory (static assets)
  if (!outFiles.includes('_next')) {
    warnings.push('_next directory not found - static assets may be missing');
  }
  
  // Check 404 page exists
  if (!outFiles.includes('404.html') && !outFiles.some(f => f.includes('404'))) {
    warnings.push('No 404 page found - users may see errors for missing pages');
  }
  
  // Estimate build size
  const buildSize = execSync('du -sh out').toString().trim().split('\t')[0];
  console.log(`   Build size: ${buildSize}`);
  
} else {
  console.log('   ⏭️  Skipping (out/ will be created during build)');
}

// ==================== 5. Package Manager Consistency ====================
console.log('\n📦 Checking package manager consistency...');
const hasPackageLock = fs.existsSync('package-lock.json');
const hasPnpmLock = fs.existsSync('pnpm-lock.yaml');
const hasYarnLock = fs.existsSync('yarn.lock');

if (hasPackageLock && hasPnpmLock) {
  errors.push('Both package-lock.json and pnpm-lock.yaml exist - use only one package manager');
} else if (hasPnpmLock) {
  console.log('   ✓ Using pnpm (correct)');
} else if (hasPackageLock) {
  warnings.push('Using npm instead of pnpm - netlify.toml expects pnpm');
}

// ==================== 6. Environment Variables Check ====================
console.log('\n🔐 Checking environment variables...');
const envExample = fs.existsSync('.env.example') ? fs.readFileSync('.env.example', 'utf8') : '';
const envLocal = fs.existsSync('.env.local') ? fs.readFileSync('.env.local', 'utf8') : '';

const requiredEnvVars = [
  'NEXT_PUBLIC_SENTRY_DSN',
  'SENTRY_AUTH_TOKEN'
];

requiredEnvVars.forEach(varName => {
  if (!envExample.includes(varName) && !envLocal.includes(varName)) {
    warnings.push(`Environment variable ${varName} not found in .env files`);
  }
});

// ==================== 7. Critical Dependencies Check ====================
console.log('\n📚 Validating dependencies...');
const deps = packageJson.dependencies || {};
const devDeps = packageJson.devDependencies || {};

// Check Next.js version compatibility
const nextVersion = deps.next;
if (nextVersion) {
  console.log(`   Next.js version: ${nextVersion}`);
  const versionNum = parseFloat(nextVersion.replace(/[^\d.]/g, ''));
  if (versionNum >= 15) {
    console.log('   ✓ Using Next.js 15+ (requires Node 20+)');
  }
}

// ==================== Results Summary ====================
console.log('\n' + '='.repeat(50));
console.log('📊 VALIDATION RESULTS');
console.log('='.repeat(50));

if (errors.length === 0 && warnings.length === 0) {
  console.log('\n✅ All checks passed! Deployment is ready.');
  process.exit(0);
}

if (warnings.length > 0) {
  console.log('\n⚠️  WARNINGS:');
  warnings.forEach((warning, i) => {
    console.log(`   ${i + 1}. ${warning}`);
  });
}

if (errors.length > 0) {
  console.log('\n❌ ERRORS (must be fixed):');
  errors.forEach((error, i) => {
    console.log(`   ${i + 1}. ${error}`);
  });
  console.log('\n💡 Fix these errors before deploying to production.');
  process.exit(1);
}

console.log('\n⚠️  Warnings found but validation passed.');
console.log('💡 Consider fixing warnings before production deployment.');
process.exit(0);
