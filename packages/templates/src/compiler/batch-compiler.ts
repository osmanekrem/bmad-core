import fs from 'fs'
import path from 'path'
import { glob } from 'glob'
import { TemplateCompiler } from './template-compiler.js'
import { CompilerOptions, CompilationResult } from '../types/index.js'

export class BatchCompiler {
  static async compileDirectory(options: CompilerOptions): Promise<CompilationResult> {
    const result: CompilationResult = {
      success: true,
      compiled: 0,
      failed: 0,
      errors: [],
      output: []
    }

    try {
      // Ensure output directory exists
      if (!fs.existsSync(options.outputDir)) {
        fs.mkdirSync(options.outputDir, { recursive: true })
      }

      // Find all YAML template files (exclude qa-gate for now)
      const pattern = path.join(options.inputDir, '**/*.yaml')
      const allFiles = await glob(pattern)
      const files = allFiles.filter(file => !file.includes('qa-gate-tmpl.yaml'))

      if (files.length === 0) {
        result.errors.push('No YAML template files found')
        result.success = false
        return result
      }

      console.log(`Found ${files.length} template files`)

      // Compile each file
      for (const filePath of files) {
        try {
          const relativePath = path.relative(options.inputDir, filePath)
          const outputPath = this.getOutputPath(filePath, options.inputDir, options.outputDir)
          
          console.log(`Compiling ${relativePath}...`)
          
          const compiled = await TemplateCompiler.compileFromFile(filePath)
          const output = this.generateJavaScriptOutput(compiled)
          
          // Write compiled template
          fs.writeFileSync(outputPath, output)
          result.output.push(outputPath)
          result.compiled++

          if (options.verbose) {
            console.log(`✅ Compiled: ${relativePath} -> ${path.relative(options.outputDir, outputPath)}`)
          }
        } catch (error: any) {
          result.failed++
          result.errors.push(`${filePath}: ${error.message}`)
          console.error(`❌ Failed to compile ${filePath}:`, error.message)
        }
      }

      result.success = result.failed === 0

      console.log(`\nCompilation complete:`)
      console.log(`  ✅ Compiled: ${result.compiled}`)
      console.log(`  ❌ Failed: ${result.failed}`)
      console.log(`  📁 Output: ${options.outputDir}`)

    } catch (error: any) {
      result.success = false
      result.errors.push(`Batch compilation failed: ${error.message}`)
    }

    return result
  }

  static async watchDirectory(options: CompilerOptions): Promise<void> {
    console.log(`Watching ${options.inputDir} for changes...`)

    const chokidar = await import('chokidar')
    const watcher = chokidar.watch(path.join(options.inputDir, '**/*.yaml'))

    watcher.on('change', async (filePath: string) => {
      console.log(`\n📝 File changed: ${filePath}`)
      await this.compileSingleFile(filePath, options)
    })

    watcher.on('add', async (filePath: string) => {
      console.log(`\n➕ New file: ${filePath}`)
      await this.compileSingleFile(filePath, options)
    })

    watcher.on('unlink', (filePath: string) => {
      console.log(`\n🗑️  File removed: ${filePath}`)
      const outputPath = this.getOutputPath(filePath, options.inputDir, options.outputDir)
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath)
        console.log(`Removed: ${outputPath}`)
      }
    })

    // Initial compilation
    await this.compileDirectory(options)

    console.log('Press Ctrl+C to stop watching...')
  }

  private static async compileSingleFile(filePath: string, options: CompilerOptions): Promise<void> {
    try {
      const outputPath = this.getOutputPath(filePath, options.inputDir, options.outputDir)
      const compiled = await TemplateCompiler.compileFromFile(filePath)
      const output = this.generateJavaScriptOutput(compiled)
      
      // Ensure output directory exists
      const outputDir = path.dirname(outputPath)
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }

      fs.writeFileSync(outputPath, output)
      console.log(`✅ Compiled: ${path.relative(options.inputDir, filePath)}`)
    } catch (error: any) {
      console.error(`❌ Failed to compile ${filePath}:`, error.message)
    }
  }

  private static getOutputPath(filePath: string, inputDir: string, outputDir: string): string {
    const relativePath = path.relative(inputDir, filePath)
    const baseName = path.basename(relativePath, '.yaml')
    const dirName = path.dirname(relativePath)
    
    return path.join(outputDir, dirName, `${baseName}.js`)
  }

  private static generateJavaScriptOutput(compiled: any): string {
    return `// Auto-generated template file
// Do not edit manually - this file is generated from YAML template

export const template = ${JSON.stringify(compiled, null, 2)};

export default template;
`
  }
}
