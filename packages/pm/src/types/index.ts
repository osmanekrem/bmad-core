// PM Agent Types

export interface PMCommand {
  name: string
  description: string
  execute: (context: PMContext) => Promise<PMResponse>
}

export interface PMContext {
  projectPath?: string
  userInput?: string
  options?: Record<string, any>
  templates?: string[]
  outputFormat?: 'markdown' | 'json' | 'yaml' | 'text'
  projectType?: string
  teamSize?: number
  timeline?: string
}

export interface PMResponse {
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

export interface ProjectPlan {
  title: string
  description: string
  objectives: string[]
  scope: ProjectScope
  timeline: ProjectTimeline
  resources: ResourcePlan
  risks: RiskAssessment
  deliverables: Deliverable[]
  milestones: Milestone[]
  budget: BudgetPlan
  quality: QualityPlan
  communication: CommunicationPlan
  metadata: {
    planType: string
    timestamp: string
    complexity: 'low' | 'medium' | 'high'
    estimatedDuration: string
  }
}

export interface ProjectScope {
  included: string[]
  excluded: string[]
  assumptions: string[]
  constraints: string[]
  dependencies: string[]
  success: string[]
}

export interface ProjectTimeline {
  startDate: string
  endDate: string
  phases: ProjectPhase[]
  criticalPath: string[]
  buffer: string
  holidays: string[]
}

export interface ProjectPhase {
  name: string
  description: string
  startDate: string
  endDate: string
  duration: string
  deliverables: string[]
  dependencies: string[]
  resources: string[]
  risks: string[]
}

export interface ResourcePlan {
  team: TeamMember[]
  budget: number
  equipment: Equipment[]
  tools: Tool[]
  facilities: Facility[]
  external: ExternalResource[]
}

export interface TeamMember {
  role: string
  name: string
  skills: string[]
  availability: string
  cost: number
  responsibilities: string[]
}

export interface Equipment {
  name: string
  type: string
  cost: number
  duration: string
  purpose: string
}

export interface Tool {
  name: string
  type: string
  cost: number
  purpose: string
  license: string
}

export interface Facility {
  name: string
  type: string
  cost: number
  duration: string
  location: string
}

export interface ExternalResource {
  name: string
  type: string
  cost: number
  duration: string
  deliverables: string[]
}

export interface RiskAssessment {
  risks: Risk[]
  mitigation: MitigationStrategy[]
  contingency: ContingencyPlan[]
  monitoring: RiskMonitoring[]
}

export interface Risk {
  id: string
  title: string
  description: string
  probability: 'low' | 'medium' | 'high'
  impact: 'low' | 'medium' | 'high'
  category: 'technical' | 'business' | 'resource' | 'schedule' | 'quality'
  owner: string
  status: 'open' | 'mitigated' | 'closed'
}

export interface MitigationStrategy {
  riskId: string
  strategy: string
  actions: string[]
  owner: string
  timeline: string
  cost: number
}

export interface ContingencyPlan {
  riskId: string
  plan: string
  trigger: string
  actions: string[]
  owner: string
  cost: number
}

export interface RiskMonitoring {
  riskId: string
  metric: string
  frequency: string
  owner: string
  threshold: string
}

export interface Deliverable {
  id: string
  name: string
  description: string
  type: 'document' | 'software' | 'hardware' | 'service' | 'other'
  owner: string
  dueDate: string
  dependencies: string[]
  acceptance: string[]
  quality: QualityCriteria
}

export interface QualityCriteria {
  functional: string[]
  nonFunctional: string[]
  performance: string[]
  security: string[]
  usability: string[]
}

export interface Milestone {
  id: string
  name: string
  description: string
  date: string
  deliverables: string[]
  dependencies: string[]
  success: string[]
  owner: string
}

export interface BudgetPlan {
  total: number
  phases: BudgetPhase[]
  categories: BudgetCategory[]
  contingency: number
  currency: string
}

export interface BudgetPhase {
  name: string
  amount: number
  percentage: number
  description: string
}

export interface BudgetCategory {
  name: string
  amount: number
  percentage: number
  description: string
}

export interface QualityPlan {
  standards: string[]
  processes: string[]
  tools: string[]
  reviews: Review[]
  testing: TestingPlan
  metrics: QualityMetric[]
}

export interface Review {
  type: string
  frequency: string
  participants: string[]
  deliverables: string[]
  criteria: string[]
}

export interface TestingPlan {
  types: string[]
  coverage: number
  tools: string[]
  schedule: string[]
  criteria: string[]
}

export interface QualityMetric {
  name: string
  target: number
  current: number
  unit: string
  frequency: string
}

export interface CommunicationPlan {
  stakeholders: Stakeholder[]
  channels: CommunicationChannel[]
  meetings: Meeting[]
  reports: Report[]
  escalation: EscalationPlan[]
}

export interface Stakeholder {
  name: string
  role: string
  interest: 'high' | 'medium' | 'low'
  influence: 'high' | 'medium' | 'low'
  communication: string[]
  expectations: string[]
}

export interface CommunicationChannel {
  type: string
  purpose: string
  frequency: string
  participants: string[]
  format: string
}

export interface Meeting {
  name: string
  purpose: string
  frequency: string
  participants: string[]
  duration: string
  agenda: string[]
}

export interface Report {
  name: string
  purpose: string
  frequency: string
  audience: string[]
  format: string
  content: string[]
}

export interface EscalationPlan {
  level: string
  trigger: string
  actions: string[]
  contacts: string[]
  timeline: string
}

export interface TaskBreakdown {
  title: string
  description: string
  tasks: Task[]
  dependencies: TaskDependency[]
  resources: TaskResource[]
  timeline: TaskTimeline
  metadata: {
    breakdownType: string
    timestamp: string
    complexity: 'low' | 'medium' | 'high'
  }
}

export interface Task {
  id: string
  name: string
  description: string
  type: 'development' | 'testing' | 'documentation' | 'review' | 'other'
  priority: 'low' | 'medium' | 'high' | 'critical'
  effort: 'low' | 'medium' | 'high'
  owner: string
  dependencies: string[]
  deliverables: string[]
  acceptance: string[]
  risks: string[]
}

export interface TaskDependency {
  from: string
  to: string
  type: 'finish-to-start' | 'start-to-start' | 'finish-to-finish' | 'start-to-finish'
  lag: number
}

export interface TaskResource {
  taskId: string
  resource: string
  allocation: number
  startDate: string
  endDate: string
}

export interface TaskTimeline {
  startDate: string
  endDate: string
  duration: string
  criticalPath: string[]
  buffer: string
}

export interface PMConfig {
  defaultOutputFormat: 'markdown' | 'json' | 'yaml' | 'text'
  projectMethodology: 'agile' | 'waterfall' | 'hybrid' | 'scrum' | 'kanban'
  teamSize: 'small' | 'medium' | 'large'
  autoSave: boolean
  templates: {
    planning: string[]
    tracking: string[]
    reporting: string[]
    risk: string[]
  }
}
