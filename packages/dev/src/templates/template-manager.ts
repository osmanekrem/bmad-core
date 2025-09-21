import { TemplateManager } from '@osmanekrem/bmad-templates'
import { DevContext, CodeGeneration, CodeReview, DebuggingSession, RefactoringPlan, TestingPlan } from '../types/index.js'

export class DevTemplateManager {
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

  async renderCodeGenerationTemplate(templateId: string, context: DevContext, data: CodeGeneration): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildCodeGenerationContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  async renderCodeReviewTemplate(templateId: string, context: DevContext, data: CodeReview): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildCodeReviewContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  async renderDebuggingTemplate(templateId: string, context: DevContext, data: DebuggingSession): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildDebuggingContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  async renderRefactoringTemplate(templateId: string, context: DevContext, data: RefactoringPlan): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildRefactoringContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  async renderTestingTemplate(templateId: string, context: DevContext, data: TestingPlan): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildTestingContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  private buildCodeGenerationContext(context: DevContext, data: CodeGeneration): Record<string, any> {
    return {
      // Code generation data
      title: data.title,
      description: data.description,
      language: data.language,
      framework: data.framework,
      code: data.code,
      files: data.files,
      dependencies: data.dependencies,
      instructions: data.instructions,
      testing: data.testing,
      documentation: data.documentation,
      
      // Metadata
      generationType: data.metadata.generationType,
      timestamp: data.metadata.timestamp,
      complexity: data.metadata.complexity,
      estimatedTime: data.metadata.estimatedTime,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      codeLanguage: context.codeLanguage,
      contextFramework: context.framework,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      generation_date: new Date().toLocaleDateString(),
      dev_name: 'BMad Dev'
    }
  }

  private buildCodeReviewContext(context: DevContext, data: CodeReview): Record<string, any> {
    return {
      // Code review data
      title: data.title,
      summary: data.summary,
      issues: data.issues,
      suggestions: data.suggestions,
      improvements: data.improvements,
      security: data.security,
      performance: data.performance,
      bestPractices: data.bestPractices,
      overallScore: data.overallScore,
      
      // Metadata
      reviewType: data.metadata.reviewType,
      timestamp: data.metadata.timestamp,
      language: data.metadata.language,
      linesOfCode: data.metadata.linesOfCode,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      codeLanguage: context.codeLanguage,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      review_date: new Date().toLocaleDateString(),
      dev_name: 'BMad Dev'
    }
  }

  private buildDebuggingContext(context: DevContext, data: DebuggingSession): Record<string, any> {
    return {
      // Debugging data
      title: data.title,
      description: data.description,
      issue: data.issue,
      steps: data.steps,
      solution: data.solution,
      prevention: data.prevention,
      
      // Metadata
      sessionType: data.metadata.sessionType,
      timestamp: data.metadata.timestamp,
      language: data.metadata.language,
      complexity: data.metadata.complexity,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      codeLanguage: context.codeLanguage,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      debugging_date: new Date().toLocaleDateString(),
      dev_name: 'BMad Dev'
    }
  }

  private buildRefactoringContext(context: DevContext, data: RefactoringPlan): Record<string, any> {
    return {
      // Refactoring data
      title: data.title,
      description: data.description,
      currentCode: data.currentCode,
      refactoredCode: data.refactoredCode,
      steps: data.steps,
      benefits: data.benefits,
      risks: data.risks,
      testing: data.testing,
      
      // Metadata
      refactoringType: data.metadata.refactoringType,
      timestamp: data.metadata.timestamp,
      language: data.metadata.language,
      complexity: data.metadata.complexity,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      codeLanguage: context.codeLanguage,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      refactoring_date: new Date().toLocaleDateString(),
      dev_name: 'BMad Dev'
    }
  }

  private buildTestingContext(context: DevContext, data: TestingPlan): Record<string, any> {
    return {
      // Testing data
      title: data.title,
      description: data.description,
      testTypes: data.testTypes,
      testCases: data.testCases,
      framework: data.framework,
      setup: data.setup,
      execution: data.execution,
      coverage: data.coverage,
      
      // Metadata
      planType: data.metadata.planType,
      timestamp: data.metadata.timestamp,
      language: data.metadata.language,
      complexity: data.metadata.complexity,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      codeLanguage: context.codeLanguage,
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      testing_date: new Date().toLocaleDateString(),
      dev_name: 'BMad Dev'
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
