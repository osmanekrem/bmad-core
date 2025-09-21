// Architect Agent Types

export interface ArchitectCommand {
  name: string
  description: string
  execute: (context: ArchitectContext) => Promise<ArchitectResponse>
}

export interface ArchitectContext {
  projectPath?: string
  userInput?: string
  options?: Record<string, any>
  templates?: string[]
  outputFormat?: 'markdown' | 'json' | 'yaml' | 'text'
}

export interface ArchitectResponse {
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

export interface ArchitectureDesign {
  title: string
  description: string
  type: 'microservices' | 'monolith' | 'serverless' | 'hybrid' | 'distributed'
  components: ArchitectureComponent[]
  patterns: DesignPattern[]
  technologies: Technology[]
  infrastructure: InfrastructureRequirement[]
  security: SecurityConsideration[]
  scalability: ScalabilityPlan
  performance: PerformanceRequirement[]
  recommendations: string[]
  nextSteps: string[]
  metadata: {
    designType: string
    timestamp: string
    complexity: 'low' | 'medium' | 'high'
    estimatedEffort: string
  }
}

export interface ArchitectureComponent {
  id: string
  name: string
  type: 'service' | 'database' | 'api' | 'ui' | 'middleware' | 'queue' | 'cache' | 'storage'
  description: string
  responsibilities: string[]
  dependencies: string[]
  interfaces: ComponentInterface[]
  technologies: string[]
  scalability: ScalabilityInfo
  security: SecurityInfo
}

export interface ComponentInterface {
  name: string
  type: 'REST' | 'GraphQL' | 'gRPC' | 'WebSocket' | 'Message Queue' | 'Database'
  description: string
  endpoints?: string[]
  schema?: string
  authentication?: string
}

export interface DesignPattern {
  name: string
  category: 'creational' | 'structural' | 'behavioral' | 'architectural'
  description: string
  useCase: string
  benefits: string[]
  tradeoffs: string[]
  implementation: string
  examples: string[]
}

export interface Technology {
  name: string
  category: 'frontend' | 'backend' | 'database' | 'infrastructure' | 'monitoring' | 'security'
  description: string
  pros: string[]
  cons: string[]
  alternatives: string[]
  learningCurve: 'low' | 'medium' | 'high'
  community: 'small' | 'medium' | 'large'
  maturity: 'experimental' | 'stable' | 'mature'
}

export interface InfrastructureRequirement {
  type: 'compute' | 'storage' | 'network' | 'database' | 'monitoring' | 'security'
  name: string
  description: string
  specifications: Record<string, any>
  scaling: ScalingRequirement
  cost: CostEstimate
  alternatives: string[]
}

export interface ScalingRequirement {
  horizontal: boolean
  vertical: boolean
  autoScaling: boolean
  minInstances: number
  maxInstances: number
  triggers: string[]
}

export interface CostEstimate {
  monthly: number
  currency: string
  breakdown: Record<string, number>
  notes: string[]
}

export interface SecurityConsideration {
  category: 'authentication' | 'authorization' | 'encryption' | 'network' | 'data' | 'compliance'
  title: string
  description: string
  implementation: string
  tools: string[]
  compliance: string[]
  risks: string[]
  mitigation: string[]
}

export interface SecurityInfo {
  level: 'low' | 'medium' | 'high' | 'critical'
  requirements: string[]
  threats: string[]
  controls: string[]
}

export interface ScalabilityPlan {
  current: ScalabilityInfo
  target: ScalabilityInfo
  strategy: string[]
  bottlenecks: string[]
  solutions: string[]
  timeline: string
}

export interface ScalabilityInfo {
  users: string
  requests: string
  data: string
  storage: string
  performance: string
}

export interface PerformanceRequirement {
  metric: string
  target: string
  measurement: string
  tools: string[]
  optimization: string[]
}

export interface SystemAnalysis {
  title: string
  summary: string
  currentState: SystemState
  issues: SystemIssue[]
  opportunities: SystemOpportunity[]
  recommendations: SystemRecommendation[]
  migration: MigrationPlan
  metadata: {
    analysisType: string
    timestamp: string
    complexity: 'low' | 'medium' | 'high'
  }
}

export interface SystemState {
  architecture: string
  technologies: string[]
  performance: Record<string, any>
  scalability: Record<string, any>
  security: Record<string, any>
  maintainability: Record<string, any>
}

export interface SystemIssue {
  category: 'performance' | 'scalability' | 'security' | 'maintainability' | 'reliability'
  title: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  impact: string
  rootCause: string
  solution: string
  effort: 'low' | 'medium' | 'high'
  priority: 'low' | 'medium' | 'high'
}

export interface SystemOpportunity {
  title: string
  description: string
  benefit: string
  effort: 'low' | 'medium' | 'high'
  impact: 'low' | 'medium' | 'high'
  timeline: string
  requirements: string[]
}

export interface SystemRecommendation {
  title: string
  description: string
  category: 'architecture' | 'technology' | 'process' | 'infrastructure'
  priority: 'low' | 'medium' | 'high' | 'critical'
  effort: 'low' | 'medium' | 'high'
  impact: 'low' | 'medium' | 'high'
  timeline: string
  dependencies: string[]
  risks: string[]
  benefits: string[]
}

export interface MigrationPlan {
  strategy: 'big-bang' | 'strangler-fig' | 'parallel-run' | 'gradual'
  phases: MigrationPhase[]
  timeline: string
  risks: string[]
  rollback: string[]
  success: string[]
}

export interface MigrationPhase {
  name: string
  description: string
  duration: string
  deliverables: string[]
  dependencies: string[]
  risks: string[]
  testing: string[]
}

export interface ArchitectConfig {
  defaultOutputFormat: 'markdown' | 'json' | 'yaml' | 'text'
  designComplexity: 'simple' | 'moderate' | 'complex'
  includeDiagrams: boolean
  autoSave: boolean
  templates: {
    architecture: string[]
    analysis: string[]
    design: string[]
    migration: string[]
  }
}
