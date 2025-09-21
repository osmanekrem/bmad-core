import { TemplateManager } from '@osmanekrem/bmad-templates'
import { AnalystContext, AnalysisResult, MarketResearch, CompetitorAnalysis } from '../types/index.js'

export class AnalystTemplateManager {
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

  async renderAnalysisTemplate(templateId: string, context: AnalystContext, data: AnalysisResult): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildTemplateContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  async renderMarketResearchTemplate(templateId: string, context: AnalystContext, data: MarketResearch): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildMarketResearchContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  async renderCompetitorAnalysisTemplate(templateId: string, context: AnalystContext, data: CompetitorAnalysis): Promise<string> {
    const template = await this.templateManager.loadTemplate(templateId)
    const templateContext = this.buildCompetitorAnalysisContext(context, data)
    
    return this.templateManager.renderCompiledTemplate(template, templateContext)
  }

  private buildTemplateContext(context: AnalystContext, data: AnalysisResult): Record<string, any> {
    return {
      // Analysis data
      title: data.title,
      summary: data.summary,
      findings: data.findings,
      recommendations: data.recommendations,
      nextSteps: data.nextSteps,
      
      // Metadata
      analysisType: data.metadata.analysisType,
      timestamp: data.metadata.timestamp,
      confidence: data.metadata.confidence,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      analysis_date: new Date().toLocaleDateString(),
      analyst_name: 'BMad Analyst'
    }
  }

  private buildMarketResearchContext(context: AnalystContext, data: MarketResearch): Record<string, any> {
    return {
      // Market research data
      marketSize: data.marketSize,
      growthRate: data.growthRate,
      trends: data.trends,
      opportunities: data.opportunities,
      challenges: data.challenges,
      recommendations: data.recommendations,
      
      // Metadata
      researchDate: data.metadata.researchDate,
      marketSegment: data.metadata.marketSegment,
      dataSource: data.metadata.dataSource,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      research_date: new Date().toLocaleDateString(),
      analyst_name: 'BMad Analyst'
    }
  }

  private buildCompetitorAnalysisContext(context: AnalystContext, data: CompetitorAnalysis): Record<string, any> {
    return {
      // Competitor analysis data
      competitors: data.competitors,
      marketPosition: data.marketPosition,
      strengths: data.strengths,
      weaknesses: data.weaknesses,
      opportunities: data.opportunities,
      threats: data.threats,
      recommendations: data.recommendations,
      
      // Metadata
      analysisDate: data.metadata.analysisDate,
      competitorCount: data.metadata.competitorCount,
      marketSegment: data.metadata.marketSegment,
      
      // Context
      projectPath: context.projectPath,
      userInput: context.userInput,
      outputFormat: context.outputFormat || 'markdown',
      
      // Template variables
      project_name: context.options?.projectName || 'Project',
      analysis_date: new Date().toLocaleDateString(),
      analyst_name: 'BMad Analyst'
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
