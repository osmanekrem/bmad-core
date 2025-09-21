#!/usr/bin/env node

import { BatchCompiler } from './batch-compiler.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
  const inputDir = path.join(__dirname, '../../templates/yaml')
  const outputDir = path.join(__dirname, '../../templates/compiled')

  const options = {
    inputDir,
    outputDir,
    verbose: true
  }

  console.log('🔨 Compiling BMad templates...\n')

  try {
    const result = await BatchCompiler.compileDirectory(options)
    
    if (result.success) {
      console.log('\n🎉 Template compilation completed successfully!')
      process.exit(0)
    } else {
      console.log('\n❌ Template compilation completed with errors:')
      result.errors.forEach(error => console.log(`  - ${error}`))
      process.exit(1)
    }
  } catch (error) {
    console.error('\n💥 Template compilation failed:', error.message)
    process.exit(1)
  }
}

main()
