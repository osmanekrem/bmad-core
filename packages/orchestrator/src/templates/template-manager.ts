import { TemplateManager } from 'bmad-templates'
import { OrchestratorContext, WorkflowCoordination, ProjectCoordination } from '../types/index.js'

export class OrchestratorTemplateManager {
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

  async renderWorkflowCoordinationTemplate(templateId: string, context: OrchestratorContext, data: WorkflowCoordination): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildWorkflowCoordinationContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  async renderProjectCoordinationTemplate(templateId: string, context: OrchestratorContext, data: ProjectCoordination): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildProjectCoordinationContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  private buildWorkflowCoordinationContext(context: OrchestratorContext, data: WorkflowCoordination): Record<string, any> {
    return {
      // Workflow coordination data
      id: data.id,
      title: data.title,
      description: data.description,
      workflowType: data.workflowType,
      coordinationLevel: data.coordinationLevel,
      phases: data.phases,
      transitions: data.transitions,
      conditions: data.conditions,
      triggers: data.triggers,
      actions: data.actions,
      monitoring: data.monitoring,
      dependencies: data.dependencies,
      resources: data.resources,
      stakeholders: data.stakeholders,
      qualityGates: data.qualityGates,
      
      // Metadata
      coordinationType: data.metadata.coordinationType,
      timestamp: data.metadata.timestamp,
      version: data.metadata.version,
      status: data.metadata.status,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      contextProjectType: context.projectType,
      contextTeamSize: context.teamSize,
      contextTimeline: context.timeline,
      contextBudget: context.budget,
      contextComplexity: context.complexity,
      contextWorkflowType: context.workflowType,
      contextCoordinationLevel: context.coordinationLevel,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      coordination_date: new Date().toLocaleDateString(),
      orchestrator_agent: 'BMad Orchestrator'
    }
  }

  private buildProjectCoordinationContext(context: OrchestratorContext, data: ProjectCoordination): Record<string, any> {
    return {
      // Project coordination data
      id: data.id,
      title: data.title,
      description: data.description,
      coordinationLevel: data.coordinationLevel,
      projects: data.projects,
      dependencies: data.dependencies,
      resources: data.resources,
      stakeholders: data.stakeholders,
      communication: data.communication,
      governance: data.governance,
      monitoring: data.monitoring,
      quality: data.quality,
      risk: data.risk,
      change: data.change,
      
      // Metadata
      coordinationType: data.metadata.coordinationType,
      timestamp: data.metadata.timestamp,
      version: data.metadata.version,
      status: data.metadata.status,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      contextProjectType: context.projectType,
      contextTeamSize: context.teamSize,
      contextTimeline: context.timeline,
      contextBudget: context.budget,
      contextComplexity: context.complexity,
      contextWorkflowType: context.workflowType,
      contextCoordinationLevel: context.coordinationLevel,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      coordination_date: new Date().toLocaleDateString(),
      orchestrator_agent: 'BMad Orchestrator'
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
