import yaml from 'js-yaml'
import { TemplateConfig, TemplateSection } from '../types/index.js'

export class YamlParser {
  static parseTemplate(yamlContent: string): TemplateConfig {
    try {
      const parsed = yaml.load(yamlContent) as any
      return this.validateAndNormalize(parsed)
    } catch (error: any) {
      throw new Error(`Failed to parse YAML template: ${error.message}`)
    }
  }

  static async parseTemplateFile(filePath: string): Promise<TemplateConfig> {
    const fs = await import('fs')
    const content = fs.readFileSync(filePath, 'utf8')
    return this.parseTemplate(content)
  }

  private static validateAndNormalize(config: any): TemplateConfig {
    // Handle different template formats
    if (!config.template && config.schema) {
      // This is a QA gate template with different format
      return this.normalizeQAGateTemplate(config)
    }

    // Validate required fields for standard templates
    if (!config.template) {
      throw new Error('Template metadata is required')
    }

    if (!config.template.id) {
      throw new Error('Template ID is required')
    }

    if (!config.template.name) {
      throw new Error('Template name is required')
    }

    if (!config.sections || !Array.isArray(config.sections)) {
      throw new Error('Template sections are required')
    }

    // Normalize template metadata
    const template = {
      id: config.template.id,
      name: config.template.name,
      version: config.template.version || '1.0.0',
      output: {
        format: config.template.output?.format || 'markdown',
        filename: config.template.output?.filename || 'output.md',
        title: config.template.output?.title || config.template.name
      }
    }

    // Normalize workflow
    const workflow = {
      mode: config.workflow?.mode || 'interactive',
      elicitation: config.workflow?.elicitation
    }

    // Normalize sections
    const sections = this.normalizeSections(config.sections)

    return {
      template,
      workflow,
      sections,
      agent_config: config.agent_config
    }
  }

  private static normalizeQAGateTemplate(config: any): TemplateConfig {
    // Extract template metadata from QA gate format
    const template = {
      id: 'qa-gate-template-v1',
      name: 'Quality Gate Decision',
      version: '1.0',
      output: {
        format: 'yaml' as const,
        filename: config.template?.filename || 'qa-gate.yml',
        title: 'Quality Gate Decision'
      }
    }

    // Create sections from the QA gate fields
    const sections: TemplateSection[] = [
      {
        id: 'schema',
        title: 'Schema Version',
        type: 'text',
        instruction: 'Schema version number'
      },
      {
        id: 'story',
        title: 'Story Reference',
        type: 'text',
        instruction: 'Story reference in format epic.story'
      },
      {
        id: 'story_title',
        title: 'Story Title',
        type: 'text',
        instruction: 'Title of the story'
      },
      {
        id: 'gate',
        title: 'Gate Status',
        type: 'choice',
        instruction: 'Quality gate decision',
        choices: ['PASS', 'CONCERNS', 'FAIL', 'WAIVED']
      },
      {
        id: 'status_reason',
        title: 'Status Reason',
        type: 'text',
        instruction: '1-2 sentence summary of why this gate decision'
      },
      {
        id: 'reviewer',
        title: 'Reviewer',
        type: 'text',
        instruction: 'Name of the reviewer'
      },
      {
        id: 'updated',
        title: 'Updated',
        type: 'text',
        instruction: 'ISO timestamp of the update'
      }
    ]

    return {
      template,
      workflow: {
        mode: 'interactive' as const
      },
      sections
    }
  }

  private static normalizeSections(sections: any[]): TemplateSection[] {
    return sections.map((section, index) => {
      if (!section.id) {
        section.id = `section_${index}`
      }

      if (!section.title) {
        section.title = section.id
      }

      if (!section.type) {
        section.type = 'text'
      }

      // Normalize choices
      if (section.choices && Array.isArray(section.choices)) {
        section.choices = section.choices.map((choice: any) => {
          if (typeof choice === 'string') {
            return { name: choice, value: choice }
          }
          return choice
        })
      }

      // Recursively normalize subsections
      if (section.sections && Array.isArray(section.sections)) {
        section.sections = this.normalizeSections(section.sections)
      }

      return section as TemplateSection
    })
  }

  static validateTemplate(config: TemplateConfig): string[] {
    const errors: string[] = []

    // Validate template metadata
    if (!config.template.id) {
      errors.push('Template ID is required')
    }

    if (!config.template.name) {
      errors.push('Template name is required')
    }

    // Validate sections
    this.validateSections(config.sections, errors, '')

    return errors
  }

  private static validateSections(sections: TemplateSection[], errors: string[], path: string): void {
    sections.forEach((section, index) => {
      const sectionPath = path ? `${path}.sections[${index}]` : `sections[${index}]`

      if (!section.id) {
        errors.push(`${sectionPath}: Section ID is required`)
      }

      if (!section.title) {
        errors.push(`${sectionPath}: Section title is required`)
      }

      if (!section.type) {
        errors.push(`${sectionPath}: Section type is required`)
      }

      // Validate elicit sections have instruction
      if (section.elicit && !section.instruction) {
        errors.push(`${sectionPath}: Elicit sections must have instruction`)
      }

      // Validate choice sections have choices
      if (section.type === 'choice' && (!section.choices || section.choices.length === 0)) {
        errors.push(`${sectionPath}: Choice sections must have choices`)
      }

      // Validate table sections have columns
      if (section.type === 'table' && (!section.columns || section.columns.length === 0)) {
        errors.push(`${sectionPath}: Table sections must have columns`)
      }

      // Recursively validate subsections
      if (section.sections) {
        this.validateSections(section.sections, errors, sectionPath)
      }
    })
  }
}
