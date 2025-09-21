import { TemplateManager } from 'bmad-templates'
import { UXContext, UserResearch, UserPersona, UserJourney, Wireframe, Prototype, UsabilityTest, AccessibilityAudit, DesignSystem } from '../types/index.js'

export class UXTemplateManager {
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

  async renderUserResearchTemplate(templateId: string, context: UXContext, data: UserResearch): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildUserResearchContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  async renderUserPersonaTemplate(templateId: string, context: UXContext, data: UserPersona): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildUserPersonaContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  async renderUserJourneyTemplate(templateId: string, context: UXContext, data: UserJourney): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildUserJourneyContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  async renderWireframeTemplate(templateId: string, context: UXContext, data: Wireframe): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildWireframeContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  async renderPrototypeTemplate(templateId: string, context: UXContext, data: Prototype): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildPrototypeContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  async renderUsabilityTestTemplate(templateId: string, context: UXContext, data: UsabilityTest): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildUsabilityTestContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  async renderAccessibilityAuditTemplate(templateId: string, context: UXContext, data: AccessibilityAudit): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildAccessibilityAuditContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  async renderDesignSystemTemplate(templateId: string, context: UXContext, data: DesignSystem): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildDesignSystemContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  private buildUserResearchContext(context: UXContext, data: UserResearch): Record<string, any> {
    return {
      // User research data
      title: data.title,
      description: data.description,
      researchType: data.researchType,
      objectives: data.objectives,
      methodology: data.methodology,
      participants: data.participants,
      questions: data.questions,
      findings: data.findings,
      insights: data.insights,
      recommendations: data.recommendations,
      nextSteps: data.nextSteps,
      
      // Metadata
      metadataResearchType: data.metadata.researchType,
      timestamp: data.metadata.timestamp,
      duration: data.metadata.duration,
      effectiveness: data.metadata.effectiveness,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      targetAudience: context.targetAudience,
      platform: context.platform,
      deviceType: context.deviceType,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      research_date: new Date().toLocaleDateString(),
      ux_expert: 'BMad UX Expert'
    }
  }

  private buildUserPersonaContext(context: UXContext, data: UserPersona): Record<string, any> {
    return {
      // User persona data
      id: data.id,
      name: data.name,
      title: data.title,
      demographics: data.demographics,
      goals: data.goals,
      motivations: data.motivations,
      frustrations: data.frustrations,
      behaviors: data.behaviors,
      needs: data.needs,
      painPoints: data.painPoints,
      preferences: data.preferences,
      technologyUsage: data.technologyUsage,
      quotes: data.quotes,
      scenarios: data.scenarios,
      
      // Metadata
      personaType: data.metadata.personaType,
      timestamp: data.metadata.timestamp,
      confidence: data.metadata.confidence,
      validation: data.metadata.validation,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      targetAudience: context.targetAudience,
      platform: context.platform,
      deviceType: context.deviceType,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      persona_date: new Date().toLocaleDateString(),
      ux_expert: 'BMad UX Expert'
    }
  }

  private buildUserJourneyContext(context: UXContext, data: UserJourney): Record<string, any> {
    return {
      // User journey data
      id: data.id,
      title: data.title,
      description: data.description,
      persona: data.persona,
      stages: data.stages,
      touchpoints: data.touchpoints,
      emotions: data.emotions,
      painPoints: data.painPoints,
      opportunities: data.opportunities,
      metrics: data.metrics,
      
      // Metadata
      journeyType: data.metadata.journeyType,
      timestamp: data.metadata.timestamp,
      duration: data.metadata.duration,
      validation: data.metadata.validation,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      targetAudience: context.targetAudience,
      platform: context.platform,
      deviceType: context.deviceType,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      journey_date: new Date().toLocaleDateString(),
      ux_expert: 'BMad UX Expert'
    }
  }

  private buildWireframeContext(context: UXContext, data: Wireframe): Record<string, any> {
    return {
      // Wireframe data
      id: data.id,
      title: data.title,
      description: data.description,
      page: data.page,
      version: data.version,
      fidelity: data.fidelity,
      annotations: data.annotations,
      components: data.components,
      interactions: data.interactions,
      responsiveBreakpoints: data.responsiveBreakpoints,
      
      // Metadata
      wireframeType: data.metadata.wireframeType,
      timestamp: data.metadata.timestamp,
      designer: data.metadata.designer,
      status: data.metadata.status,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      targetAudience: context.targetAudience,
      platform: context.platform,
      deviceType: context.deviceType,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      wireframe_date: new Date().toLocaleDateString(),
      ux_expert: 'BMad UX Expert'
    }
  }

  private buildPrototypeContext(context: UXContext, data: Prototype): Record<string, any> {
    return {
      // Prototype data
      id: data.id,
      title: data.title,
      description: data.description,
      fidelity: data.fidelity,
      platform: data.platform,
      framework: data.framework,
      screens: data.screens,
      interactions: data.interactions,
      userFlows: data.userFlows,
      testing: data.testing,
      
      // Metadata
      prototypeType: data.metadata.prototypeType,
      timestamp: data.metadata.timestamp,
      designer: data.metadata.designer,
      status: data.metadata.status,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      targetAudience: context.targetAudience,
      contextPlatform: context.platform,
      deviceType: context.deviceType,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      prototype_date: new Date().toLocaleDateString(),
      ux_expert: 'BMad UX Expert'
    }
  }

  private buildUsabilityTestContext(context: UXContext, data: UsabilityTest): Record<string, any> {
    return {
      // Usability test data
      id: data.id,
      title: data.title,
      description: data.description,
      objectives: data.objectives,
      methodology: data.methodology,
      participants: data.participants,
      tasks: data.tasks,
      metrics: data.metrics,
      findings: data.findings,
      insights: data.insights,
      recommendations: data.recommendations,
      nextSteps: data.nextSteps,
      
      // Metadata
      testType: data.metadata.testType,
      timestamp: data.metadata.timestamp,
      duration: data.metadata.duration,
      effectiveness: data.metadata.effectiveness,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      targetAudience: context.targetAudience,
      platform: context.platform,
      deviceType: context.deviceType,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      test_date: new Date().toLocaleDateString(),
      ux_expert: 'BMad UX Expert'
    }
  }

  private buildAccessibilityAuditContext(context: UXContext, data: AccessibilityAudit): Record<string, any> {
    return {
      // Accessibility audit data
      id: data.id,
      title: data.title,
      description: data.description,
      scope: data.scope,
      standards: data.standards,
      guidelines: data.guidelines,
      findings: data.findings,
      recommendations: data.recommendations,
      priority: data.priority,
      effort: data.effort,
      impact: data.impact,
      
      // Metadata
      auditType: data.metadata.auditType,
      timestamp: data.metadata.timestamp,
      auditor: data.metadata.auditor,
      status: data.metadata.status,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      targetAudience: context.targetAudience,
      platform: context.platform,
      deviceType: context.deviceType,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      audit_date: new Date().toLocaleDateString(),
      ux_expert: 'BMad UX Expert'
    }
  }

  private buildDesignSystemContext(context: UXContext, data: DesignSystem): Record<string, any> {
    return {
      // Design system data
      id: data.id,
      title: data.title,
      description: data.description,
      version: data.version,
      components: data.components,
      tokens: data.tokens,
      patterns: data.patterns,
      guidelines: data.guidelines,
      accessibility: data.accessibility,
      
      // Metadata
      systemType: data.metadata.systemType,
      timestamp: data.metadata.timestamp,
      designer: data.metadata.designer,
      status: data.metadata.status,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      targetAudience: context.targetAudience,
      platform: context.platform,
      deviceType: context.deviceType,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      system_date: new Date().toLocaleDateString(),
      ux_expert: 'BMad UX Expert'
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
