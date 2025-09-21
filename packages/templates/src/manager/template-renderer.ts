import Handlebars from 'handlebars'
import { CompiledTemplate, TemplateContext, TemplateRenderer as ITemplateRenderer } from '../types/index.js'

export class TemplateRenderer implements ITemplateRenderer {
  private handlebars: typeof Handlebars

  constructor() {
    this.handlebars = Handlebars.create()
    this.registerHelpers()
  }

  render(template: string, context: TemplateContext): string {
    try {
      const compiled = this.handlebars.compile(template)
      return compiled(context)
    } catch (error: any) {
      throw new Error(`Template rendering failed: ${error.message}`)
    }
  }

  validate(template: CompiledTemplate, context: TemplateContext): boolean {
    try {
      // Validate required fields
      if (!template.metadata.id) {
        return false
      }

      // Validate sections
      return this.validateSections(template.sections, context)
    } catch (error) {
      return false
    }
  }

  private validateSections(sections: any[], context: TemplateContext): boolean {
    for (const section of sections) {
      // Check condition
      if (section.condition && !this.evaluateCondition(section.condition, context)) {
        continue
      }

      // Validate section data
      if (section.validator && context[section.id]) {
        if (!section.validator(context[section.id])) {
          return false
        }
      }

      // Validate subsections
      if (section.sections && !this.validateSections(section.sections, context)) {
        return false
      }
    }

    return true
  }

  private evaluateCondition(condition: string, context: TemplateContext): boolean {
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

  private registerHelpers(): void {
    // Date helper
    this.handlebars.registerHelper('date', (format: string) => {
      const now = new Date()
      switch (format) {
        case 'iso':
          return now.toISOString()
        case 'short':
          return now.toLocaleDateString()
        case 'long':
          return now.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        default:
          return now.toLocaleDateString()
      }
    })

    // Capitalize helper
    this.handlebars.registerHelper('capitalize', (str: string) => {
      return str.charAt(0).toUpperCase() + str.slice(1)
    })

    // Uppercase helper
    this.handlebars.registerHelper('uppercase', (str: string) => {
      return str.toUpperCase()
    })

    // Lowercase helper
    this.handlebars.registerHelper('lowercase', (str: string) => {
      return str.toLowerCase()
    })

    // Join helper
    this.handlebars.registerHelper('join', (array: any[], separator: string = ', ') => {
      return Array.isArray(array) ? array.join(separator) : ''
    })

    // Length helper
    this.handlebars.registerHelper('length', (array: any[]) => {
      return Array.isArray(array) ? array.length : 0
    })

    // If helper
    this.handlebars.registerHelper('if', function(this: any, conditional: any, options: any) {
      if (conditional) {
        return options.fn(this)
      } else {
        return options.inverse(this)
      }
    })

    // Unless helper
    this.handlebars.registerHelper('unless', function(this: any, conditional: any, options: any) {
      if (!conditional) {
        return options.fn(this)
      } else {
        return options.inverse(this)
      }
    })

    // Each helper
    this.handlebars.registerHelper('each', function(this: any, array: any[], options: any) {
      if (!Array.isArray(array)) {
        return ''
      }

      let result = ''
      for (let i = 0; i < array.length; i++) {
        result += options.fn({ ...array[i], index: i, first: i === 0, last: i === array.length - 1 })
      }
      return result
    })

    // Equals helper
    this.handlebars.registerHelper('equals', (a: any, b: any) => {
      return a === b
    })

    // Not equals helper
    this.handlebars.registerHelper('notEquals', (a: any, b: any) => {
      return a !== b
    })

    // Greater than helper
    this.handlebars.registerHelper('gt', (a: number, b: number) => {
      return a > b
    })

    // Less than helper
    this.handlebars.registerHelper('lt', (a: number, b: number) => {
      return a < b
    })
  }
}
