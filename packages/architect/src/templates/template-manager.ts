import { TemplateManager } from 'bmad-templates'
import { ArchitectContext, ArchitectureDesign, SystemAnalysis } from '../types/index.js'

export class ArchitectTemplateManager {
  private templateManager: TemplateManager
  private availableTemplates: string[] = []

  constructor() {
    this.templateManager = new TemplateManager()
    this.initializeTemplates()
  }

  private async initializeTemplates(): Promise<void> {
    try {
      this.availableTemplates = await this.templateManager.getAvailableTemplates()
    } catch (error) {
      console.warn('Failed to load templates:', error)
      this.availableTemplates = []
    }
  }

  async renderArchitectureTemplate(templateId: string, context: ArchitectContext, data: ArchitectureDesign): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildArchitectureContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  async renderAnalysisTemplate(templateId: string, context: ArchitectContext, data: SystemAnalysis): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildAnalysisContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  private buildArchitectureContext(context: ArchitectContext, data: ArchitectureDesign): Record<string, any> {
    return {
      // Architecture data
      title: data.title,
      description: data.description,
      type: data.type,
      components: data.components,
      patterns: data.patterns,
      technologies: data.technologies,
      infrastructure: data.infrastructure,
      security: data.security,
      scalability: data.scalability,
      performance: data.performance,
      recommendations: data.recommendations,
      nextSteps: data.nextSteps,
      
      // Metadata
      designType: data.metadata.designType,
      timestamp: data.metadata.timestamp,
      complexity: data.metadata.complexity,
      estimatedEffort: data.metadata.estimatedEffort,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      architecture_date: new Date().toLocaleDateString(),
      architect_name: 'BMad Architect'
    }
  }

  private buildAnalysisContext(context: ArchitectContext, data: SystemAnalysis): Record<string, any> {
    return {
      // Analysis data
      title: data.title,
      summary: data.summary,
      currentState: data.currentState,
      issues: data.issues,
      opportunities: data.opportunities,
      recommendations: data.recommendations,
      migration: data.migration,
      
      // Metadata
      analysisType: data.metadata.analysisType,
      timestamp: data.metadata.timestamp,
      complexity: data.metadata.complexity,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      analysis_date: new Date().toLocaleDateString(),
      architect_name: 'BMad Architect'
    }
  }

  getAvailableTemplates(): string[] {
    return this.availableTemplates
  }

  async registerTemplate(templateId: string, filePath: string): Promise<void> {
    this.templateManager.registerTemplate(templateId, filePath)
    this.availableTemplates = await this.templateManager.getAvailableTemplates()
  }

  async unregisterTemplate(templateId: string): Promise<void> {
    this.templateManager.unregisterTemplate(templateId)
    this.availableTemplates = await this.templateManager.getAvailableTemplates()
  }
}
