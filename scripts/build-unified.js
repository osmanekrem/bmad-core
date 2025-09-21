#!/usr/bin/env node

/**
 * BMad Unified Build Script
 * Creates a unified dist structure for tree-shaking support
 */

import { execSync } from 'child_process'
import { copyFileSync, mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'

console.log('🔨 Building unified package structure...')

const packages = [
  'core',
  'analyst', 
  'architect',
  'dev',
  'pm',
  'qa',
  'sm',
  'ux',
  'master',
  'orchestrator',
  'templates',
  'cli'
]

// Create dist directory
const distDir = 'dist'
if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true })
}

// Create main index.js that exports all modules
const mainIndexContent = `// BMad AI Development Agents - Main Entry Point
export * from './core/index.js'
export * from './analyst/index.js'
export * from './architect/index.js'
export * from './dev/index.js'
export * from './pm/index.js'
export * from './qa/index.js'
export * from './sm/index.js'
export * from './ux/index.js'
export * from './master/index.js'
export * from './orchestrator/index.js'
export * from './templates/index.js'
export * from './cli/index.js'
`

writeFileSync(join(distDir, 'index.js'), mainIndexContent)

// Create main index.d.ts
const mainIndexTypesContent = `// BMad AI Development Agents - Type Definitions
export * from './core/index.d.ts'
export * from './analyst/index.d.ts'
export * from './architect/index.d.ts'
export * from './dev/index.d.ts'
export * from './pm/index.d.ts'
export * from './qa/index.d.ts'
export * from './sm/index.d.ts'
export * from './ux/index.d.ts'
export * from './master/index.d.ts'
export * from './orchestrator/index.d.ts'
export * from './templates/index.d.ts'
export * from './cli/index.d.ts'
`

writeFileSync(join(distDir, 'index.d.ts'), mainIndexTypesContent)

// Copy each package's dist to the unified structure
for (const packageName of packages) {
  const packageDistPath = join('packages', packageName, 'dist')
  const targetPath = join(distDir, packageName)
  
  if (existsSync(packageDistPath)) {
    console.log(`📦 Copying ${packageName}...`)
    
    // Create target directory
    if (!existsSync(targetPath)) {
      mkdirSync(targetPath, { recursive: true })
    }
    
    // Copy all files from package dist to unified dist
    try {
      execSync(`cp -r ${packageDistPath}/* ${targetPath}/`, { stdio: 'inherit' })
      console.log(`✅ ${packageName} copied successfully`)
    } catch (error) {
      console.log(`⚠️  Warning: Could not copy ${packageName}: ${error.message}`)
    }
  } else {
    console.log(`⚠️  Warning: ${packageName} dist not found, skipping...`)
  }
}

// Copy template files for templates package
const templatesSourcePath = join('packages', 'templates', 'templates')
const templatesTargetPath = join(distDir, 'templates', 'templates')

if (existsSync(templatesSourcePath)) {
  console.log('📄 Copying template files...')
  if (!existsSync(templatesTargetPath)) {
    mkdirSync(templatesTargetPath, { recursive: true })
  }
  try {
    execSync(`cp -r ${templatesSourcePath}/* ${templatesTargetPath}/`, { stdio: 'inherit' })
    console.log('✅ Template files copied successfully')
  } catch (error) {
    console.log(`⚠️  Warning: Could not copy template files: ${error.message}`)
  }
}

console.log('🎉 Unified build completed!')
console.log('📁 Structure created in ./dist/')
console.log('🌳 Tree-shaking enabled with proper exports')
