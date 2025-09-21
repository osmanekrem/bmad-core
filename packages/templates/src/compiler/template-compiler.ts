import { TemplateConfig, CompiledTemplate, CompiledSection, TemplateSection } from '../types/index.js'
import { YamlParser } from './yaml-parser.js'

export class TemplateCompiler {
  static compile(config: TemplateConfig): CompiledTemplate {
    const compiledSections = this.compileSections(config.sections)
    
    return {
      metadata: config.template,
      workflow: config.workflow,
      sections: compiledSections,
      agent_config: config.agent_config
    }
  }

  static compileFromYaml(yamlContent: string): CompiledTemplate {
    const config = YamlParser.parseTemplate(yamlContent)
    return this.compile(config)
  }

  static async compileFromFile(filePath: string): Promise<CompiledTemplate> {
    const config = await YamlParser.parseTemplateFile(filePath)
    return this.compile(config)
  }

  private static compileSections(sections: TemplateSection[]): CompiledSection[] {
    return sections.map(section => this.compileSection(section))
  }

  private static compileSection(section: TemplateSection): CompiledSection {
    const compiled: CompiledSection = {
      id: section.id,
      title: section.title,
      type: section.type,
      instruction: section.instruction,
      elicit: section.elicit,
      condition: section.condition,
      repeatable: section.repeatable,
      template: section.template,
      choices: section.choices,
      columns: section.columns,
      prefix: section.prefix,
      owner: section.owner,
      editors: section.editors,
      sections: section.sections ? this.compileSections(section.sections) : undefined
    }

    // Add renderer based on section type
    compiled.renderer = this.createRenderer(section)
    
    // Add validator
    compiled.validator = this.createValidator(section)

    return compiled
  }

  private static createRenderer(section: TemplateSection): (context: any) => string {
    switch (section.type) {
      case 'template-text':
        return (context: any) => this.renderTemplateText(section.template || '', context)
      case 'bullet-list':
        return (context: any) => this.renderBulletList(context[section.id] || [])
      case 'numbered-list':
        return (context: any) => this.renderNumberedList(context[section.id] || [], section.prefix)
      case 'table':
        return (context: any) => this.renderTable(context[section.id] || [], section.columns || [])
      case 'choice':
        return (context: any) => this.renderChoice(context[section.id], section.choices || [])
      default:
        return (context: any) => context[section.id] || ''
    }
  }

  private static createValidator(section: TemplateSection): (value: any) => boolean {
    return (value: any) => {
      // Basic validation based on section type
      switch (section.type) {
        case 'bullet-list':
        case 'numbered-list':
          return Array.isArray(value)
        case 'table':
          return Array.isArray(value) && value.every(row => typeof row === 'object')
        case 'choice':
          return section.choices?.some(choice => 
            typeof choice === 'string' ? choice === value : choice.value === value
          ) || false
        default:
          return value !== undefined && value !== null
      }
    }
  }

  private static renderTemplateText(template: string, context: any): string {
    // Simple template rendering with {{variable}} syntax
    return template.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
      const value = this.getNestedValue(context, key.trim())
      return value !== undefined ? String(value) : match
    })
  }

  private static renderBulletList(items: any[]): string {
    return items.map(item => `- ${item}`).join('\n')
  }

  private static renderNumberedList(items: any[], prefix?: string): string {
    return items.map((item, index) => {
      const number = prefix ? `${prefix}${index + 1}` : `${index + 1}`
      return `${number}: ${item}`
    }).join('\n')
  }

  private static renderTable(rows: any[], columns: string[]): string {
    if (rows.length === 0) return ''

    // Create header
    const header = `| ${columns.join(' | ')} |`
    const separator = `| ${columns.map(() => '---').join(' | ')} |`
    
    // Create rows
    const dataRows = rows.map(row => {
      const values = columns.map(col => row[col] || '')
      return `| ${values.join(' | ')} |`
    })

    return [header, separator, ...dataRows].join('\n')
  }

  private static renderChoice(value: any, choices: (string | { name: string; value: string })[]): string {
    const choice = choices.find(c => 
      typeof c === 'string' ? c === value : c.value === value
    )
    return choice ? (typeof choice === 'string' ? choice : choice.name) : String(value)
  }

  private static getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined
    }, obj)
  }
}
