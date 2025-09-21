import { TemplateManager } from 'bmad-templates'
import { MasterContext, ProjectStrategy, WorkflowOrchestration, StrategicPlanning } from '../types/index.js'

export class MasterTemplateManager {
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

  async renderProjectStrategyTemplate(templateId: string, context: MasterContext, data: ProjectStrategy): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildProjectStrategyContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  async renderWorkflowOrchestrationTemplate(templateId: string, context: MasterContext, data: WorkflowOrchestration): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildWorkflowOrchestrationContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  async renderStrategicPlanningTemplate(templateId: string, context: MasterContext, data: StrategicPlanning): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildStrategicPlanningContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  private buildProjectStrategyContext(context: MasterContext, data: ProjectStrategy): Record<string, any> {
    return {
      // Project strategy data
      id: data.id,
      title: data.title,
      description: data.description,
      projectType: data.projectType,
      complexity: data.complexity,
      timeline: data.timeline,
      budget: data.budget,
      teamSize: data.teamSize,
      objectives: data.objectives,
      successCriteria: data.successCriteria,
      risks: data.risks,
      opportunities: data.opportunities,
      phases: data.phases,
      deliverables: data.deliverables,
      stakeholders: data.stakeholders,
      resources: data.resources,
      dependencies: data.dependencies,
      metrics: data.metrics,
      
      // Metadata
      strategyType: data.metadata.strategyType,
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
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      strategy_date: new Date().toLocaleDateString(),
      master_agent: 'BMad Master'
    }
  }

  private buildWorkflowOrchestrationContext(context: MasterContext, data: WorkflowOrchestration): Record<string, any> {
    return {
      // Workflow orchestration data
      id: data.id,
      title: data.title,
      description: data.description,
      workflowType: data.workflowType,
      phases: data.phases,
      transitions: data.transitions,
      conditions: data.conditions,
      triggers: data.triggers,
      actions: data.actions,
      monitoring: data.monitoring,
      
      // Metadata
      metadataWorkflowType: data.metadata.workflowType,
      metadataTimestamp: data.metadata.timestamp,
      metadataVersion: data.metadata.version,
      metadataStatus: data.metadata.status,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      contextProjectType: context.projectType,
      contextTeamSize: context.teamSize,
      contextTimeline: context.timeline,
      contextBudget: context.budget,
      contextComplexity: context.complexity,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      orchestration_date: new Date().toLocaleDateString(),
      master_agent: 'BMad Master'
    }
  }

  private buildStrategicPlanningContext(context: MasterContext, data: StrategicPlanning): Record<string, any> {
    return {
      // Strategic planning data
      id: data.id,
      title: data.title,
      description: data.description,
      planningType: data.planningType,
      timeframe: data.timeframe,
      objectives: data.objectives,
      strategies: data.strategies,
      initiatives: data.initiatives,
      resources: data.resources,
      risks: data.risks,
      opportunities: data.opportunities,
      metrics: data.metrics,
      governance: data.governance,
      
      // Metadata
      metadataPlanningType: data.metadata.planningType,
      metadataTimestamp: data.metadata.timestamp,
      metadataVersion: data.metadata.version,
      metadataStatus: data.metadata.status,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      contextProjectType: context.projectType,
      contextTeamSize: context.teamSize,
      contextTimeline: context.timeline,
      contextBudget: context.budget,
      contextComplexity: context.complexity,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      planning_date: new Date().toLocaleDateString(),
      master_agent: 'BMad Master'
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
