#!/usr/bin/env node

/**
 * BMad Unified Package Publishing Script
 * Publishes the unified BMad package to NPM with tree-shaking support
 */

import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

console.log('🚀 BMad Unified Package Publisher')
console.log('==================================')

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

// Build the unified package
console.log('\n📦 Building unified package...')
try {
  execSync('npm run build', { stdio: 'inherit' })
  console.log('✅ Build completed successfully')
} catch (error) {
  console.log('❌ Build failed')
  process.exit(1)
}

// Read package.json to get version
const packageJsonPath = 'package.json'
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
const packageName = packageJson.name
const version = packageJson.version

console.log(`\n📦 Publishing ${packageName}@${version}...`)

// Check if package already exists
try {
  execSync(`npm view ${packageName}@${version}`, { stdio: 'pipe' })
  console.log(`⚠️  ${packageName}@${version} already exists, skipping...`)
  process.exit(0)
} catch (error) {
  // Package doesn't exist, proceed with publishing
}

// Publish the unified package
try {
  execSync('npm publish', { 
    stdio: 'inherit',
    cwd: process.cwd()
  })
  
  console.log(`✅ ${packageName}@${version} published successfully`)
} catch (error) {
  console.log(`❌ Failed to publish ${packageName}: ${error.message}`)
  process.exit(1)
}

// Summary
console.log('\n🎉 Publishing Summary')
console.log('====================')
console.log(`✅ Successfully published ${packageName}@${version}`)

console.log('\n🔗 View your package at:')
console.log(`   https://www.npmjs.com/package/${packageName}`)

console.log('\n📝 Installation and usage:')
console.log('   npm install @osmanekrem/bmad')
console.log('')
console.log('   // Tree-shaking imports:')
console.log('   import { CoreAgent } from "@osmanekrem/bmad/core"')
console.log('   import { AnalystAgent } from "@osmanekrem/bmad/analyst"')
console.log('   import { ArchitectAgent } from "@osmanekrem/bmad/architect"')
console.log('   import { DevAgent } from "@osmanekrem/bmad/dev"')
console.log('   import { PMAgent } from "@osmanekrem/bmad/pm"')
console.log('   import { QAAgent } from "@osmanekrem/bmad/qa"')
console.log('   import { SMAgent } from "@osmanekrem/bmad/sm"')
console.log('   import { UXAgent } from "@osmanekrem/bmad/ux"')
console.log('   import { MasterAgent } from "@osmanekrem/bmad/master"')
console.log('   import { OrchestratorAgent } from "@osmanekrem/bmad/orchestrator"')
console.log('   import { TemplateManager } from "@osmanekrem/bmad/templates"')
console.log('   import { CLI } from "@osmanekrem/bmad/cli"')
console.log('')
console.log('   // Or import everything:')
console.log('   import * as BMad from "@osmanekrem/bmad"')

console.log('\n✨ Publishing complete!')
