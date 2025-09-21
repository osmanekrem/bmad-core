#!/usr/bin/env node

/**
 * NPM Setup Script for BMad Packages
 * This script helps set up NPM authentication and publishing environment
 */

import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

console.log('🚀 BMad NPM Setup Script')
console.log('========================')

// Check if user is logged in to NPM
try {
  const whoami = execSync('npm whoami', { encoding: 'utf8' }).trim()
  console.log(`✅ Logged in as: ${whoami}`)
} catch (error) {
  console.log('❌ Not logged in to NPM')
  console.log('Please run: npm login')
  process.exit(1)
}

// Check if @osmanekrem scope is available
try {
  execSync('npm access list packages @osmanekrem', { encoding: 'utf8' })
  console.log('✅ @osmanekrem scope is accessible')
} catch (error) {
  console.log('⚠️  @osmanekrem scope might not be available')
  console.log('You may need to create the scope or check permissions')
}

// Create .npmrc file
const npmrcContent = `@osmanekrem:registry=https://registry.npmjs.org/
//registry.npmjs.org/:_authToken=\${NPM_TOKEN}
`

writeFileSync('.npmrc', npmrcContent)
console.log('✅ Created .npmrc file')

// Create publish script
const publishScript = `#!/bin/bash

# BMad Package Publishing Script
echo "🚀 Publishing BMad packages to NPM..."

# Set NPM token if not already set
if [ -z "$NPM_TOKEN" ]; then
    echo "Please set NPM_TOKEN environment variable"
    echo "You can get it from: https://www.npmjs.com/settings/tokens"
    exit 1
fi

# Build all packages
echo "📦 Building packages..."
npm run build

# Publish packages in order (dependencies first)
echo "📤 Publishing packages..."

# Core packages first
npm publish packages/core --access public
npm publish packages/templates --access public

# Agent packages
npm publish packages/analyst --access public
npm publish packages/architect --access public
npm publish packages/dev --access public
npm publish packages/pm --access public
npm publish packages/qa --access public
npm publish packages/sm --access public
npm publish packages/ux --access public
npm publish packages/master --access public
npm publish packages/orchestrator --access public

# CLI package last
npm publish packages/cli --access public

echo "✅ All packages published successfully!"
echo "🔗 View packages at: https://www.npmjs.com/org/osmanekrem"
`

writeFileSync('scripts/publish.sh', publishScript)
execSync('chmod +x scripts/publish.sh')
console.log('✅ Created publish script')

console.log('\n🎉 Setup complete!')
console.log('\nNext steps:')
console.log('1. Set NPM_TOKEN environment variable')
console.log('2. Run: ./scripts/publish.sh')
console.log('3. Or publish individually: npm publish packages/core --access public')
