#!/bin/bash

# BMad Quick Publish Script
# Hızlı publishing için basit script

echo "🚀 BMad Quick Publish"
echo "===================="

# Check if logged in
if ! npm whoami > /dev/null 2>&1; then
    echo "❌ Not logged in to NPM"
    echo "Please run: npm login"
    exit 1
fi

echo "✅ Logged in to NPM"

# Build packages
echo "📦 Building packages..."
npm run build:all

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed"

# Publish packages
echo "📤 Publishing packages..."

# Core first
npm publish packages/core --access public
npm publish packages/templates --access public

# Agents
npm publish packages/analyst --access public
npm publish packages/architect --access public
npm publish packages/dev --access public
npm publish packages/pm --access public
npm publish packages/qa --access public
npm publish packages/sm --access public
npm publish packages/ux --access public
npm publish packages/master --access public
npm publish packages/orchestrator --access public

# CLI last
npm publish packages/cli --access public

echo "✅ All packages published!"
echo "🔗 View at: https://www.npmjs.com/org/osmanekrem"
