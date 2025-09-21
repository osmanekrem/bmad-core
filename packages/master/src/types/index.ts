// BMad Master Agent Types

export interface MasterCommand {
  name: string
  description: string
  execute: (context: MasterContext) => Promise<MasterResponse>
}

export interface MasterContext {
  projectPath?: string
  userInput?: string
  options?: Record<string, any>
  templates?: string[]
  outputFormat?: 'markdown' | 'json' | 'yaml' | 'text'
  projectType?: string
  teamSize?: number
  timeline?: string
  budget?: string
  complexity?: 'low' | 'medium' | 'high'
}

export interface MasterResponse {
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

export interface ProjectStrategy {
  id: string
  title: string
  description: string
  projectType: string
  complexity: 'low' | 'medium' | 'high'
  timeline: string
  budget: string
  teamSize: number
  objectives: string[]
  successCriteria: string[]
  risks: ProjectRisk[]
  opportunities: ProjectOpportunity[]
  phases: ProjectPhase[]
  deliverables: ProjectDeliverable[]
  stakeholders: Stakeholder[]
  resources: Resource[]
  dependencies: ProjectDependency[]
  metrics: ProjectMetrics
  metadata: {
    strategyType: string
    timestamp: string
    version: string
    status: 'draft' | 'approved' | 'active' | 'completed' | 'cancelled'
  }
}

export interface ProjectRisk {
  id: string
  title: string
  description: string
  category: 'technical' | 'business' | 'resource' | 'schedule' | 'quality' | 'external'
  probability: 'low' | 'medium' | 'high'
  impact: 'low' | 'medium' | 'high' | 'critical'
  severity: 'low' | 'medium' | 'high' | 'critical'
  owner: string
  status: 'identified' | 'assessed' | 'mitigated' | 'monitored' | 'closed'
  mitigation: string[]
  contingency: string[]
  escalation: string[]
  monitoring: string[]
}

export interface ProjectOpportunity {
  id: string
  title: string
  description: string
  category: 'technical' | 'business' | 'process' | 'market' | 'partnership'
  potential: 'low' | 'medium' | 'high'
  effort: 'low' | 'medium' | 'high'
  impact: 'low' | 'medium' | 'high'
  owner: string
  status: 'identified' | 'evaluated' | 'planned' | 'implemented' | 'realized'
  benefits: string[]
  requirements: string[]
  timeline: string
  resources: string[]
}

export interface ProjectPhase {
  id: string
  name: string
  description: string
  order: number
  duration: string
  startDate: string
  endDate: string
  objectives: string[]
  deliverables: string[]
  activities: string[]
  resources: string[]
  dependencies: string[]
  risks: string[]
  milestones: Milestone[]
  status: 'planned' | 'active' | 'completed' | 'on-hold' | 'cancelled'
}

export interface Milestone {
  id: string
  name: string
  description: string
  dueDate: string
  deliverables: string[]
  successCriteria: string[]
  owner: string
  status: 'planned' | 'in-progress' | 'completed' | 'overdue' | 'cancelled'
  dependencies: string[]
  blockers: string[]
}

export interface ProjectDeliverable {
  id: string
  name: string
  description: string
  type: 'document' | 'software' | 'hardware' | 'service' | 'training' | 'other'
  phase: string
  owner: string
  dueDate: string
  status: 'planned' | 'in-progress' | 'review' | 'approved' | 'delivered' | 'accepted'
  acceptanceCriteria: string[]
  dependencies: string[]
  reviewers: string[]
  quality: QualityCriteria
}

export interface QualityCriteria {
  functional: string[]
  nonFunctional: string[]
  performance: string[]
  security: string[]
  usability: string[]
  accessibility: string[]
  compatibility: string[]
  maintainability: string[]
}

export interface Stakeholder {
  id: string
  name: string
  role: string
  type: 'internal' | 'external' | 'customer' | 'vendor' | 'regulator'
  influence: 'low' | 'medium' | 'high' | 'critical'
  interest: 'low' | 'medium' | 'high'
  engagement: 'low' | 'medium' | 'high'
  communication: CommunicationPlan
  expectations: string[]
  concerns: string[]
  requirements: string[]
}

export interface CommunicationPlan {
  frequency: 'daily' | 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly' | 'as-needed'
  format: 'email' | 'meeting' | 'report' | 'presentation' | 'dashboard' | 'other'
  content: string[]
  channels: string[]
  escalation: string[]
}

export interface Resource {
  id: string
  name: string
  type: 'human' | 'financial' | 'material' | 'equipment' | 'software' | 'other'
  category: string
  description: string
  quantity: number
  unit: string
  cost: number
  availability: string
  allocation: string
  owner: string
  status: 'available' | 'allocated' | 'utilized' | 'unavailable' | 'depleted'
  constraints: string[]
  dependencies: string[]
}

export interface ProjectDependency {
  id: string
  name: string
  description: string
  type: 'finish-to-start' | 'start-to-start' | 'finish-to-finish' | 'start-to-finish'
  from: string
  to: string
  owner: string
  status: 'pending' | 'in-progress' | 'completed' | 'blocked' | 'cancelled'
  dueDate: string
  blockers: string[]
  mitigation: string[]
}

export interface ProjectMetrics {
  schedule: ScheduleMetrics
  budget: BudgetMetrics
  quality: QualityMetrics
  scope: ScopeMetrics
  risk: RiskMetrics
  team: TeamMetrics
  stakeholder: StakeholderMetrics
  overall: OverallMetrics
}

export interface ScheduleMetrics {
  plannedDuration: number
  actualDuration: number
  variance: number
  completionRate: number
  onTimeDelivery: number
  criticalPath: string[]
  milestones: MilestoneMetrics[]
}

export interface MilestoneMetrics {
  name: string
  plannedDate: string
  actualDate: string
  variance: number
  status: 'on-time' | 'early' | 'late' | 'at-risk'
}

export interface BudgetMetrics {
  plannedBudget: number
  actualBudget: number
  variance: number
  burnRate: number
  costVariance: number
  scheduleVariance: number
  categories: BudgetCategoryMetrics[]
}

export interface BudgetCategoryMetrics {
  category: string
  planned: number
  actual: number
  variance: number
  percentage: number
}

export interface QualityMetrics {
  defectRate: number
  defectDensity: number
  testCoverage: number
  codeQuality: number
  performance: number
  security: number
  usability: number
  accessibility: number
  customerSatisfaction: number
}

export interface ScopeMetrics {
  plannedScope: number
  actualScope: number
  scopeCreep: number
  changeRequests: number
  approvedChanges: number
  rejectedChanges: number
  scopeStability: number
}

export interface RiskMetrics {
  totalRisks: number
  activeRisks: number
  mitigatedRisks: number
  realizedRisks: number
  riskExposure: number
  riskTrend: 'increasing' | 'stable' | 'decreasing'
  criticalRisks: number
}

export interface TeamMetrics {
  teamSize: number
  utilization: number
  productivity: number
  satisfaction: number
  turnover: number
  skills: SkillMetrics[]
  performance: PerformanceMetrics[]
}

export interface SkillMetrics {
  skill: string
  required: number
  available: number
  gap: number
  priority: 'low' | 'medium' | 'high' | 'critical'
}

export interface PerformanceMetrics {
  member: string
  role: string
  productivity: number
  quality: number
  collaboration: number
  innovation: number
  overall: number
}

export interface StakeholderMetrics {
  totalStakeholders: number
  engagedStakeholders: number
  satisfaction: number
  communication: number
  support: number
  concerns: number
  escalations: number
}

export interface OverallMetrics {
  health: 'excellent' | 'good' | 'fair' | 'poor' | 'critical'
  score: number
  trend: 'improving' | 'stable' | 'declining'
  keyIssues: string[]
  achievements: string[]
  recommendations: string[]
}

export interface WorkflowOrchestration {
  id: string
  title: string
  description: string
  workflowType: 'sequential' | 'parallel' | 'conditional' | 'iterative' | 'hybrid'
  phases: WorkflowPhase[]
  transitions: WorkflowTransition[]
  conditions: WorkflowCondition[]
  triggers: WorkflowTrigger[]
  actions: WorkflowAction[]
  monitoring: WorkflowMonitoring
  metadata: {
    workflowType: string
    timestamp: string
    version: string
    status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled'
  }
}

export interface WorkflowPhase {
  id: string
  name: string
  description: string
  order: number
  type: 'start' | 'process' | 'decision' | 'parallel' | 'merge' | 'end'
  activities: WorkflowActivity[]
  inputs: string[]
  outputs: string[]
  conditions: string[]
  duration: string
  resources: string[]
  dependencies: string[]
}

export interface WorkflowActivity {
  id: string
  name: string
  description: string
  type: 'manual' | 'automatic' | 'semi-automatic'
  owner: string
  duration: string
  inputs: string[]
  outputs: string[]
  tools: string[]
  skills: string[]
  quality: string[]
}

export interface WorkflowTransition {
  id: string
  from: string
  to: string
  condition: string
  probability: number
  duration: string
  resources: string[]
  blockers: string[]
}

export interface WorkflowCondition {
  id: string
  name: string
  description: string
  expression: string
  variables: string[]
  operators: string[]
  values: string[]
  actions: string[]
}

export interface WorkflowTrigger {
  id: string
  name: string
  description: string
  type: 'event' | 'schedule' | 'condition' | 'manual'
  source: string
  condition: string
  action: string
  parameters: Record<string, any>
}

export interface WorkflowAction {
  id: string
  name: string
  description: string
  type: 'notification' | 'assignment' | 'escalation' | 'approval' | 'execution'
  target: string
  parameters: Record<string, any>
  conditions: string[]
  timing: string
}

export interface WorkflowMonitoring {
  metrics: WorkflowMetrics
  alerts: WorkflowAlert[]
  reports: WorkflowReport[]
  dashboards: WorkflowDashboard[]
}

export interface WorkflowMetrics {
  executionTime: number
  successRate: number
  errorRate: number
  throughput: number
  utilization: number
  bottlenecks: string[]
  efficiency: number
}

export interface WorkflowAlert {
  id: string
  name: string
  description: string
  condition: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  action: string
  recipients: string[]
  frequency: string
  status: 'active' | 'inactive' | 'snoozed'
}

export interface WorkflowReport {
  id: string
  name: string
  description: string
  type: 'summary' | 'detailed' | 'exception' | 'trend'
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly'
  recipients: string[]
  format: 'pdf' | 'excel' | 'csv' | 'json' | 'html'
  content: string[]
}

export interface WorkflowDashboard {
  id: string
  name: string
  description: string
  type: 'executive' | 'operational' | 'technical' | 'custom'
  widgets: DashboardWidget[]
  layout: string
  refreshRate: string
  access: string[]
}

export interface DashboardWidget {
  id: string
  name: string
  type: 'chart' | 'table' | 'metric' | 'gauge' | 'map' | 'text'
  dataSource: string
  configuration: Record<string, any>
  position: { x: number; y: number; width: number; height: number }
}

export interface StrategicPlanning {
  id: string
  title: string
  description: string
  planningType: 'annual' | 'quarterly' | 'project' | 'initiative' | 'emergency'
  timeframe: string
  objectives: StrategicObjective[]
  strategies: Strategy[]
  initiatives: Initiative[]
  resources: Resource[]
  risks: ProjectRisk[]
  opportunities: ProjectOpportunity[]
  metrics: StrategicMetrics
  governance: Governance
  metadata: {
    planningType: string
    timestamp: string
    version: string
    status: 'draft' | 'review' | 'approved' | 'active' | 'completed'
  }
}

export interface StrategicObjective {
  id: string
  title: string
  description: string
  category: 'financial' | 'operational' | 'customer' | 'learning' | 'growth'
  priority: 'low' | 'medium' | 'high' | 'critical'
  timeframe: string
  owner: string
  successCriteria: string[]
  metrics: string[]
  dependencies: string[]
  risks: string[]
  status: 'planned' | 'active' | 'completed' | 'cancelled' | 'on-hold'
}

export interface Strategy {
  id: string
  title: string
  description: string
  objective: string
  approach: string
  tactics: string[]
  resources: string[]
  timeline: string
  owner: string
  successCriteria: string[]
  metrics: string[]
  risks: string[]
  status: 'planned' | 'active' | 'completed' | 'cancelled' | 'on-hold'
}

export interface Initiative {
  id: string
  title: string
  description: string
  strategy: string
  type: 'project' | 'program' | 'campaign' | 'process' | 'technology'
  priority: 'low' | 'medium' | 'high' | 'critical'
  owner: string
  team: string[]
  timeline: string
  budget: number
  successCriteria: string[]
  metrics: string[]
  risks: string[]
  status: 'planned' | 'active' | 'completed' | 'cancelled' | 'on-hold'
}

export interface StrategicMetrics {
  financial: FinancialMetrics
  operational: OperationalMetrics
  customer: CustomerMetrics
  learning: LearningMetrics
  growth: GrowthMetrics
  overall: OverallMetrics
}

export interface FinancialMetrics {
  revenue: number
  profit: number
  cost: number
  roi: number
  budgetVariance: number
  cashFlow: number
  profitability: number
}

export interface OperationalMetrics {
  efficiency: number
  productivity: number
  quality: number
  delivery: number
  utilization: number
  throughput: number
  cycleTime: number
}

export interface CustomerMetrics {
  satisfaction: number
  retention: number
  acquisition: number
  loyalty: number
  advocacy: number
  complaints: number
  support: number
}

export interface LearningMetrics {
  skills: number
  knowledge: number
  innovation: number
  training: number
  development: number
  capability: number
  readiness: number
}

export interface GrowthMetrics {
  market: number
  revenue: number
  customer: number
  product: number
  team: number
  capability: number
  innovation: number
}

export interface Governance {
  structure: GovernanceStructure
  processes: GovernanceProcess[]
  policies: Policy[]
  compliance: Compliance[]
  audit: Audit[]
}

export interface GovernanceStructure {
  board: string[]
  committees: string[]
  roles: string[]
  responsibilities: string[]
  reporting: string[]
  escalation: string[]
}

export interface GovernanceProcess {
  id: string
  name: string
  description: string
  type: 'decision' | 'approval' | 'review' | 'escalation' | 'communication'
  owner: string
  participants: string[]
  frequency: string
  criteria: string[]
  outcomes: string[]
}

export interface Policy {
  id: string
  title: string
  description: string
  category: 'security' | 'quality' | 'compliance' | 'operational' | 'financial'
  owner: string
  version: string
  status: 'draft' | 'active' | 'deprecated' | 'superseded'
  requirements: string[]
  procedures: string[]
  exceptions: string[]
}

export interface Compliance {
  id: string
  title: string
  description: string
  standard: string
  requirement: string
  owner: string
  status: 'compliant' | 'non-compliant' | 'partial' | 'not-applicable'
  evidence: string[]
  actions: string[]
  dueDate: string
}

export interface Audit {
  id: string
  title: string
  description: string
  type: 'internal' | 'external' | 'compliance' | 'quality' | 'security'
  scope: string
  auditor: string
  date: string
  findings: string[]
  recommendations: string[]
  status: 'planned' | 'in-progress' | 'completed' | 'follow-up'
}

export interface MasterConfig {
  defaultOutputFormat: 'markdown' | 'json' | 'yaml' | 'text'
  projectType: string
  teamSize: 'small' | 'medium' | 'large'
  complexity: 'low' | 'medium' | 'high'
  timeline: string
  budget: string
  methodology: 'agile' | 'waterfall' | 'hybrid' | 'scrum' | 'kanban' | 'saf' | 'less' | 'nexus'
  governance: string[]
  tools: string[]
  autoSave: boolean
  templates: {
    strategy: string[]
    planning: string[]
    orchestration: string[]
    governance: string[]
  }
}
