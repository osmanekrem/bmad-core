import { CompiledTemplate, TemplateContext, TemplateManager as ITemplateManager } from '../types/index.js'
import { TemplateCompiler } from '../compiler/template-compiler.js'
import { TemplateCache } from '../cache/template-cache.js'

export class TemplateManager implements ITemplateManager {
  private cache: TemplateCache
  private templateRegistry: Map<string, string> = new Map()

  constructor(cache?: TemplateCache) {
    this.cache = cache || new TemplateCache()
  }

  async loadTemplate(templateId: string): Promise<CompiledTemplate> {
    // Check cache first
    if (this.cache.has(templateId)) {
      return this.cache.get(templateId)!
    }

    // Load from registry or file system
    const templatePath = this.templateRegistry.get(templateId)
    if (!templatePath) {
      throw new Error(`Template '${templateId}' not found in registry`)
    }

    try {
      const compiled = await TemplateCompiler.compileFromFile(templatePath)
      this.cache.set(templateId, compiled)
      return compiled
    } catch (error: any) {
      throw new Error(`Failed to load template '${templateId}': ${error.message}`)
    }
  }

  async getAvailableTemplates(): Promise<string[]> {
    return Array.from(this.templateRegistry.keys())
  }

  compileTemplate(yamlContent: string): CompiledTemplate {
    return TemplateCompiler.compileFromYaml(yamlContent)
  }

  async renderTemplate(templateId: string, context: TemplateContext): Promise<string> {
    const template = await this.loadTemplate(templateId)
    return this.renderCompiledTemplate(template, context)
  }

  renderCompiledTemplate(template: CompiledTemplate, context: TemplateContext): string {
    const sections = this.renderSections(template.sections, context)
    
    // Generate document structure
    let output = `# ${template.metadata.output.title}\n\n`
    
    sections.forEach(section => {
      if (section.content) {
        output += `## ${section.title}\n\n${section.content}\n\n`
      }
    })

    return output.trim()
  }

  private renderSections(sections: any[], context: TemplateContext): Array<{ title: string; content: string }> {
    return sections.map(section => {
      let content = ''

      // Check condition
      if (section.condition && !this.evaluateCondition(section.condition, context)) {
        return { title: section.title, content: '' }
      }

      // Render section content
      if (section.renderer) {
        content = section.renderer(context)
      } else if (context[section.id]) {
        content = String(context[section.id])
      }

      // Render subsections
      if (section.sections) {
        const subSections = this.renderSections(section.sections, context)
        subSections.forEach(subSection => {
          if (subSection.content) {
            content += `\n### ${subSection.title}\n\n${subSection.content}\n`
          }
        })
      }

      return { title: section.title, content }
    })
  }

  private evaluateCondition(condition: string, context: TemplateContext): boolean {
    // Simple condition evaluation
    // Supports basic expressions like "hasField" or "field === 'value'"
    try {
      // Replace context variables in condition
      let evaluatedCondition = condition
      Object.keys(context).forEach(key => {
        const value = context[key]
        const replacement = typeof value === 'string' ? `"${value}"` : JSON.stringify(value)
        evaluatedCondition = evaluatedCondition.replace(new RegExp(`\\b${key}\\b`, 'g'), replacement)
      })

      // Evaluate the condition
      return eval(evaluatedCondition)
    } catch (error) {
      console.warn(`Failed to evaluate condition: ${condition}`, error)
      return false
    }
  }

  registerTemplate(templateId: string, filePath: string): void {
    this.templateRegistry.set(templateId, filePath)
  }

  unregisterTemplate(templateId: string): void {
    this.templateRegistry.delete(templateId)
    this.cache.delete(templateId)
  }

  clearCache(): void {
    this.cache.clear()
  }

  getCacheSize(): number {
    return this.cache.size()
  }
}
