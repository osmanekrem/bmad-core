import { TemplateManager } from 'bmad-templates'
import { PMContext, ProjectPlan, TaskBreakdown } from '../types/index.js'

export class PMTemplateManager {
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

  async renderProjectPlanTemplate(templateId: string, context: PMContext, data: ProjectPlan): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildProjectPlanContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  async renderTaskBreakdownTemplate(templateId: string, context: PMContext, data: TaskBreakdown): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildTaskBreakdownContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  private buildProjectPlanContext(context: PMContext, data: ProjectPlan): Record<string, any> {
    return {
      // Project plan data
      title: data.title,
      description: data.description,
      objectives: data.objectives,
      scope: data.scope,
      timeline: data.timeline,
      resources: data.resources,
      risks: data.risks,
      deliverables: data.deliverables,
      milestones: data.milestones,
      budget: data.budget,
      quality: data.quality,
      communication: data.communication,
      
      // Metadata
      planType: data.metadata.planType,
      timestamp: data.metadata.timestamp,
      complexity: data.metadata.complexity,
      estimatedDuration: data.metadata.estimatedDuration,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      projectType: context.projectType,
      teamSize: context.teamSize,
      contextTimeline: context.timeline,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      planning_date: new Date().toLocaleDateString(),
      pm_name: 'BMad PM'
    }
  }

  private buildTaskBreakdownContext(context: PMContext, data: TaskBreakdown): Record<string, any> {
    return {
      // Task breakdown data
      title: data.title,
      description: data.description,
      tasks: data.tasks,
      dependencies: data.dependencies,
      resources: data.resources,
      timeline: data.timeline,
      
      // Metadata
      breakdownType: data.metadata.breakdownType,
      timestamp: data.metadata.timestamp,
      complexity: data.metadata.complexity,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      projectType: context.projectType,
      teamSize: context.teamSize,
      contextTimeline: context.timeline,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      breakdown_date: new Date().toLocaleDateString(),
      pm_name: 'BMad PM'
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
