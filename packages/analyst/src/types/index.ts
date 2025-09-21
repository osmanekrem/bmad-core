// Analyst Agent Types

export interface AnalystCommand {
  name: string
  description: string
  execute: (context: AnalystContext) => Promise<AnalystResponse>
}

export interface AnalystContext {
  projectPath?: string
  userInput?: string
  options?: Record<string, any>
  templates?: string[]
  outputFormat?: 'markdown' | 'json' | 'yaml' | 'text'
}

export interface AnalystResponse {
  success: boolean
  data?: any
  output?: string
  error?: string
  metadata?: {
    command: string
    timestamp: string
    duration?: number
    template?: string
  }
}

export interface AnalysisResult {
  title: string
  summary: string
  findings: AnalysisFinding[]
  recommendations: string[]
  nextSteps: string[]
  metadata: {
    analysisType: string
    timestamp: string
    confidence: number
  }
}

export interface AnalysisFinding {
  category: string
  title: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  evidence: string[]
  impact: string
}

export interface ResearchContext {
  topic: string
  scope: string
  depth: 'surface' | 'moderate' | 'deep'
  sources?: string[]
  focusAreas?: string[]
}

export interface ResearchResult {
  topic: string
  summary: string
  keyFindings: ResearchFinding[]
  sources: ResearchSource[]
  insights: string[]
  recommendations: string[]
  metadata: {
    researchDepth: string
    timestamp: string
    sourceCount: number
  }
}

export interface ResearchFinding {
  title: string
  description: string
  source: string
  relevance: number
  category: string
}

export interface ResearchSource {
  title: string
  url?: string
  type: 'article' | 'documentation' | 'research' | 'case-study' | 'other'
  credibility: 'low' | 'medium' | 'high'
  summary: string
}

export interface CompetitorAnalysis {
  competitors: Competitor[]
  marketPosition: string
  strengths: string[]
  weaknesses: string[]
  opportunities: string[]
  threats: string[]
  recommendations: string[]
  metadata: {
    analysisDate: string
    competitorCount: number
    marketSegment: string
  }
}

export interface Competitor {
  name: string
  description: string
  strengths: string[]
  weaknesses: string[]
  marketShare?: string
  pricing?: string
  keyFeatures: string[]
  website?: string
}

export interface MarketResearch {
  marketSize: string
  growthRate: string
  trends: MarketTrend[]
  opportunities: MarketOpportunity[]
  challenges: MarketChallenge[]
  recommendations: string[]
  metadata: {
    researchDate: string
    marketSegment: string
    dataSource: string
  }
}

export interface MarketTrend {
  name: string
  description: string
  impact: 'low' | 'medium' | 'high'
  timeframe: string
  evidence: string[]
}

export interface MarketOpportunity {
  title: string
  description: string
  potential: 'low' | 'medium' | 'high'
  effort: 'low' | 'medium' | 'high'
  timeframe: string
  requirements: string[]
}

export interface MarketChallenge {
  title: string
  description: string
  severity: 'low' | 'medium' | 'high'
  mitigation: string[]
  impact: string
}

export interface AnalystConfig {
  defaultOutputFormat: 'markdown' | 'json' | 'yaml' | 'text'
  analysisDepth: 'surface' | 'moderate' | 'deep'
  includeSources: boolean
  autoSave: boolean
  templates: {
    analysis: string[]
    research: string[]
    competitor: string[]
    market: string[]
  }
}
