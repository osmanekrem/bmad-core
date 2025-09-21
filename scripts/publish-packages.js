#!/usr/bin/env node

/**
 * BMad Package Publishing Script
 * Publishes all BMad packages to NPM in the correct order
 */

import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

console.log('🚀 BMad Package Publisher')
console.log('========================')

// Package publishing order (dependencies first)
const publishOrder = [
  'core',
  'templates',
  'analyst',
  'architect', 
  'dev',
  'pm',
  'qa',
  'sm',
  'ux',
  'master',
  'orchestrator',
  'cli'
]

// Check if user is logged in
try {
  const whoami = execSync('npm whoami', { encoding: 'utf8' }).trim()
  console.log(`✅ Logged in as: ${whoami}`)
} catch (error) {
  console.log('❌ Not logged in to NPM')
  console.log('Please run: npm login')
  process.exit(1)
}

// Check if NPM_TOKEN is set
if (!process.env.NPM_TOKEN) {
  console.log('⚠️  NPM_TOKEN not set. Using npm login instead.')
}

// Build all packages first
console.log('\n📦 Building all packages...')
try {
  execSync('npm run build', { stdio: 'inherit' })
  console.log('✅ Build completed successfully')
} catch (error) {
  console.log('❌ Build failed')
  process.exit(1)
}

// Publish packages in order
console.log('\n📤 Publishing packages...')
const publishedPackages = []

for (const packageName of publishOrder) {
  const packagePath = `packages/${packageName}`
  const packageJsonPath = join(packagePath, 'package.json')
  
  try {
    // Read package.json to get version
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
    const fullPackageName = packageJson.name
    const version = packageJson.version
    
    console.log(`\n📦 Publishing ${fullPackageName}@${version}...`)
    
    // Check if package already exists
    try {
      execSync(`npm view ${fullPackageName}@${version}`, { stdio: 'pipe' })
      console.log(`⚠️  ${fullPackageName}@${version} already exists, skipping...`)
      continue
    } catch (error) {
      // Package doesn't exist, proceed with publishing
    }
    
    // Publish the package
    execSync(`npm publish ${packagePath} --access public`, { 
      stdio: 'inherit',
      cwd: process.cwd()
    })
    
    publishedPackages.push(`${fullPackageName}@${version}`)
    console.log(`✅ ${fullPackageName}@${version} published successfully`)
    
  } catch (error) {
    console.log(`❌ Failed to publish ${packageName}: ${error.message}`)
    console.log('Continuing with next package...')
  }
}

// Summary
console.log('\n🎉 Publishing Summary')
console.log('====================')
console.log(`✅ Successfully published ${publishedPackages.length} packages:`)
publishedPackages.forEach(pkg => console.log(`   - ${pkg}`))

if (publishedPackages.length > 0) {
  console.log('\n🔗 View your packages at:')
  console.log('   https://www.npmjs.com/org/osmanekrem')
  
  console.log('\n📝 Installation commands:')
  console.log('   npm install @osmanekrem/bmad/core')
  console.log('   npm install @osmanekrem/bmad/agents/analyst')
  console.log('   npm install @osmanekrem/bmad/templates')
  console.log('   npm install @osmanekrem/bmad/cli')
}

console.log('\n✨ Publishing complete!')
