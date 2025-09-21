import { TemplateManager } from 'bmad-templates'
import { QAContext, TestPlan, BugReport, TestReport, QAGate } from '../types/index.js'

export class QATemplateManager {
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

  async renderTestPlanTemplate(templateId: string, context: QAContext, data: TestPlan): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildTestPlanContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  async renderBugReportTemplate(templateId: string, context: QAContext, data: BugReport): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildBugReportContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  async renderTestReportTemplate(templateId: string, context: QAContext, data: TestReport): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildTestReportContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  async renderQAGateTemplate(templateId: string, context: QAContext, data: QAGate): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildQAGateContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  private buildTestPlanContext(context: QAContext, data: TestPlan): Record<string, any> {
    return {
      // Test plan data
      title: data.title,
      description: data.description,
      objectives: data.objectives,
      scope: data.scope,
      strategy: data.strategy,
      testCases: data.testCases,
      testData: data.testData,
      environment: data.environment,
      schedule: data.schedule,
      resources: data.resources,
      risks: data.risks,
      deliverables: data.deliverables,
      metrics: data.metrics,
      
      // Metadata
      planType: data.metadata.planType,
      timestamp: data.metadata.timestamp,
      complexity: data.metadata.complexity,
      estimatedDuration: data.metadata.estimatedDuration,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      testType: context.testType,
      framework: context.framework,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      planning_date: new Date().toLocaleDateString(),
      qa_name: 'BMad QA'
    }
  }

  private buildBugReportContext(context: QAContext, data: BugReport): Record<string, any> {
    return {
      // Bug report data
      id: data.id,
      title: data.title,
      description: data.description,
      severity: data.severity,
      priority: data.priority,
      status: data.status,
      category: data.category,
      environment: data.environment,
      steps: data.steps,
      expected: data.expected,
      actual: data.actual,
      attachments: data.attachments,
      reporter: data.reporter,
      assignee: data.assignee,
      created: data.created,
      updated: data.updated,
      resolved: data.resolved,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      testType: context.testType,
      framework: context.framework,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      report_date: new Date().toLocaleDateString(),
      qa_name: 'BMad QA'
    }
  }

  private buildTestReportContext(context: QAContext, data: TestReport): Record<string, any> {
    return {
      // Test report data
      title: data.title,
      summary: data.summary,
      scope: data.scope,
      approach: data.approach,
      results: data.results,
      metrics: data.metrics,
      issues: data.issues,
      recommendations: data.recommendations,
      conclusions: data.conclusions,
      
      // Metadata
      reportType: data.metadata.reportType,
      timestamp: data.metadata.timestamp,
      duration: data.metadata.duration,
      coverage: data.metadata.coverage,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      testType: context.testType,
      framework: context.framework,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      report_date: new Date().toLocaleDateString(),
      qa_name: 'BMad QA'
    }
  }

  private buildQAGateContext(context: QAContext, data: QAGate): Record<string, any> {
    return {
      // QA gate data
      id: data.id,
      name: data.name,
      description: data.description,
      criteria: data.criteria,
      status: data.status,
      decision: data.decision,
      reviewer: data.reviewer,
      date: data.date,
      comments: data.comments,
      nextSteps: data.nextSteps,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      testType: context.testType,
      framework: context.framework,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      gate_date: new Date().toLocaleDateString(),
      qa_name: 'BMad QA'
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
