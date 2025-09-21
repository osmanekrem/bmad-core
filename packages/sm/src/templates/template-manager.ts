import { TemplateManager } from '@osmanekrem/bmad-templates'
import { SMContext, SprintPlan, Retrospective, DailyStandup, BacklogRefinement, TeamCoaching } from '../types/index.js'

export class SMTemplateManager {
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

  async renderSprintPlanTemplate(templateId: string, context: SMContext, data: SprintPlan): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildSprintPlanContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  async renderRetrospectiveTemplate(templateId: string, context: SMContext, data: Retrospective): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildRetrospectiveContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  async renderDailyStandupTemplate(templateId: string, context: SMContext, data: DailyStandup): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildDailyStandupContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  async renderBacklogRefinementTemplate(templateId: string, context: SMContext, data: BacklogRefinement): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildBacklogRefinementContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  async renderTeamCoachingTemplate(templateId: string, context: SMContext, data: TeamCoaching): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildTeamCoachingContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  private buildSprintPlanContext(context: SMContext, data: SprintPlan): Record<string, any> {
    return {
      // Sprint plan data
      title: data.title,
      description: data.description,
      sprintNumber: data.sprintNumber,
      duration: data.duration,
      startDate: data.startDate,
      endDate: data.endDate,
      goal: data.goal,
      objectives: data.objectives,
      userStories: data.userStories,
      tasks: data.tasks,
      capacity: data.capacity,
      ceremonies: data.ceremonies,
      risks: data.risks,
      dependencies: data.dependencies,
      deliverables: data.deliverables,
      metrics: data.metrics,
      
      // Metadata
      planType: data.metadata.planType,
      timestamp: data.metadata.timestamp,
      complexity: data.metadata.complexity,
      estimatedVelocity: data.metadata.estimatedVelocity,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      teamSize: context.teamSize,
      sprintDuration: context.sprintDuration,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      planning_date: new Date().toLocaleDateString(),
      sm_name: 'BMad SM'
    }
  }

  private buildRetrospectiveContext(context: SMContext, data: Retrospective): Record<string, any> {
    return {
      // Retrospective data
      title: data.title,
      sprintNumber: data.sprintNumber,
      date: data.date,
      participants: data.participants,
      facilitator: data.facilitator,
      format: data.format,
      whatWentWell: data.whatWentWell,
      whatWentWrong: data.whatWentWrong,
      whatToImprove: data.whatToImprove,
      actionItems: data.actionItems,
      insights: data.insights,
      metrics: data.metrics,
      
      // Metadata
      retrospectiveType: data.metadata.retrospectiveType,
      timestamp: data.metadata.timestamp,
      duration: data.metadata.duration,
      effectiveness: data.metadata.effectiveness,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      teamSize: context.teamSize,
      sprintDuration: context.sprintDuration,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      retrospective_date: new Date().toLocaleDateString(),
      sm_name: 'BMad SM'
    }
  }

  private buildDailyStandupContext(context: SMContext, data: DailyStandup): Record<string, any> {
    return {
      // Daily standup data
      date: data.date,
      participants: data.participants,
      facilitator: data.facilitator,
      format: data.format,
      updates: data.updates,
      blockers: data.blockers,
      decisions: data.decisions,
      actionItems: data.actionItems,
      metrics: data.metrics,
      
      // Metadata
      standupType: data.metadata.standupType,
      timestamp: data.metadata.timestamp,
      duration: data.metadata.duration,
      effectiveness: data.metadata.effectiveness,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      teamSize: context.teamSize,
      sprintDuration: context.sprintDuration,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      standup_date: new Date().toLocaleDateString(),
      sm_name: 'BMad SM'
    }
  }

  private buildBacklogRefinementContext(context: SMContext, data: BacklogRefinement): Record<string, any> {
    return {
      // Backlog refinement data
      title: data.title,
      date: data.date,
      participants: data.participants,
      facilitator: data.facilitator,
      format: data.format,
      userStories: data.userStories,
      epics: data.epics,
      themes: data.themes,
      decisions: data.decisions,
      actionItems: data.actionItems,
      metrics: data.metrics,
      
      // Metadata
      refinementType: data.metadata.refinementType,
      timestamp: data.metadata.timestamp,
      duration: data.metadata.duration,
      effectiveness: data.metadata.effectiveness,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      teamSize: context.teamSize,
      sprintDuration: context.sprintDuration,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      refinement_date: new Date().toLocaleDateString(),
      sm_name: 'BMad SM'
    }
  }

  private buildTeamCoachingContext(context: SMContext, data: TeamCoaching): Record<string, any> {
    return {
      // Team coaching data
      title: data.title,
      team: data.team,
      coach: data.coach,
      date: data.date,
      focus: data.focus,
      observations: data.observations,
      strengths: data.strengths,
      improvements: data.improvements,
      recommendations: data.recommendations,
      actionItems: data.actionItems,
      followUp: data.followUp,
      metrics: data.metrics,
      
      // Metadata
      coachingType: data.metadata.coachingType,
      timestamp: data.metadata.timestamp,
      duration: data.metadata.duration,
      effectiveness: data.metadata.effectiveness,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      teamSize: context.teamSize,
      sprintDuration: context.sprintDuration,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      coaching_date: new Date().toLocaleDateString(),
      sm_name: 'BMad SM'
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
