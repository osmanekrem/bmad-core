// BMad Orchestrator Agent Types

export interface OrchestratorCommand {
  name: string
  description: string
  execute: (context: OrchestratorContext) => Promise<OrchestratorResponse>
}

export interface OrchestratorContext {
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
  workflowType?: 'sequential' | 'parallel' | 'conditional' | 'iterative' | 'hybrid'
  coordinationLevel?: 'project' | 'program' | 'portfolio' | 'enterprise'
}

export interface OrchestratorResponse {
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

export interface WorkflowCoordination {
  id: string
  title: string
  description: string
  workflowType: 'sequential' | 'parallel' | 'conditional' | 'iterative' | 'hybrid'
  coordinationLevel: 'project' | 'program' | 'portfolio' | 'enterprise'
  phases: WorkflowPhase[]
  transitions: WorkflowTransition[]
  conditions: WorkflowCondition[]
  triggers: WorkflowTrigger[]
  actions: WorkflowAction[]
  monitoring: WorkflowMonitoring
  dependencies: WorkflowDependency[]
  resources: WorkflowResource[]
  stakeholders: WorkflowStakeholder[]
  qualityGates: QualityGate[]
  metadata: {
    coordinationType: string
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
  qualityGates: string[]
  status: 'planned' | 'active' | 'completed' | 'on-hold' | 'cancelled'
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
  dependencies: string[]
  blockers: string[]
  status: 'planned' | 'in-progress' | 'completed' | 'blocked' | 'cancelled'
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
  status: 'planned' | 'active' | 'completed' | 'blocked' | 'cancelled'
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
  status: 'active' | 'inactive' | 'deprecated'
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
  status: 'active' | 'inactive' | 'deprecated'
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
  status: 'active' | 'inactive' | 'deprecated'
}

export interface WorkflowMonitoring {
  metrics: WorkflowMetrics
  alerts: WorkflowAlert[]
  reports: WorkflowReport[]
  dashboards: WorkflowDashboard[]
  status: 'active' | 'inactive' | 'maintenance'
}

export interface WorkflowMetrics {
  executionTime: number
  successRate: number
  errorRate: number
  throughput: number
  utilization: number
  bottlenecks: string[]
  efficiency: number
  quality: number
  cost: number
  schedule: number
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
  status: 'active' | 'inactive' | 'deprecated'
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
  status: 'active' | 'inactive' | 'maintenance'
}

export interface DashboardWidget {
  id: string
  name: string
  type: 'chart' | 'table' | 'metric' | 'gauge' | 'map' | 'text'
  dataSource: string
  configuration: Record<string, any>
  position: { x: number; y: number; width: number; height: number }
  status: 'active' | 'inactive' | 'error'
}

export interface WorkflowDependency {
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
  critical: boolean
}

export interface WorkflowResource {
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
  utilization: number
  efficiency: number
}

export interface WorkflowStakeholder {
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
  status: 'active' | 'inactive' | 'escalated'
}

export interface CommunicationPlan {
  frequency: 'daily' | 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly' | 'as-needed'
  format: 'email' | 'meeting' | 'report' | 'presentation' | 'dashboard' | 'other'
  content: string[]
  channels: string[]
  escalation: string[]
  status: 'active' | 'inactive' | 'deprecated'
}

export interface QualityGate {
  id: string
  name: string
  description: string
  phase: string
  criteria: QualityCriteria[]
  owner: string
  reviewers: string[]
  dueDate: string
  status: 'planned' | 'in-progress' | 'completed' | 'failed' | 'cancelled'
  blockers: string[]
  mitigation: string[]
  critical: boolean
}

export interface QualityCriteria {
  id: string
  name: string
  description: string
  type: 'functional' | 'non-functional' | 'performance' | 'security' | 'usability' | 'accessibility'
  requirement: string
  acceptance: string
  measurement: string
  threshold: string
  status: 'met' | 'not-met' | 'partial' | 'not-applicable'
}

export interface ProjectCoordination {
  id: string
  title: string
  description: string
  coordinationLevel: 'project' | 'program' | 'portfolio' | 'enterprise'
  projects: ProjectReference[]
  dependencies: ProjectDependency[]
  resources: ResourceAllocation[]
  stakeholders: StakeholderCoordination[]
  communication: CommunicationFramework
  governance: GovernanceFramework
  monitoring: MonitoringFramework
  quality: QualityFramework
  risk: RiskFramework
  change: ChangeFramework
  metadata: {
    coordinationType: string
    timestamp: string
    version: string
    status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled'
  }
}

export interface ProjectReference {
  id: string
  name: string
  description: string
  type: 'project' | 'program' | 'initiative' | 'campaign'
  status: 'planned' | 'active' | 'completed' | 'cancelled' | 'on-hold'
  priority: 'low' | 'medium' | 'high' | 'critical'
  owner: string
  team: string[]
  timeline: string
  budget: number
  dependencies: string[]
  risks: string[]
  opportunities: string[]
  deliverables: string[]
  successCriteria: string[]
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
  critical: boolean
  impact: 'low' | 'medium' | 'high' | 'critical'
}

export interface ResourceAllocation {
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
  utilization: number
  efficiency: number
  projects: string[]
}

export interface StakeholderCoordination {
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
  projects: string[]
  status: 'active' | 'inactive' | 'escalated'
}

export interface CommunicationFramework {
  structure: CommunicationStructure
  processes: CommunicationProcess[]
  channels: CommunicationChannel[]
  templates: CommunicationTemplate[]
  protocols: CommunicationProtocol[]
  escalation: EscalationProcedure[]
  monitoring: CommunicationMonitoring
}

export interface CommunicationStructure {
  levels: string[]
  roles: string[]
  responsibilities: string[]
  reporting: string[]
  escalation: string[]
  governance: string[]
}

export interface CommunicationProcess {
  id: string
  name: string
  description: string
  type: 'information' | 'decision' | 'approval' | 'escalation' | 'coordination'
  owner: string
  participants: string[]
  frequency: string
  criteria: string[]
  outcomes: string[]
  status: 'active' | 'inactive' | 'deprecated'
}

export interface CommunicationChannel {
  id: string
  name: string
  type: 'email' | 'meeting' | 'report' | 'presentation' | 'dashboard' | 'other'
  description: string
  purpose: string
  audience: string[]
  frequency: string
  format: string
  tools: string[]
  status: 'active' | 'inactive' | 'deprecated'
}

export interface CommunicationTemplate {
  id: string
  name: string
  type: 'email' | 'report' | 'presentation' | 'dashboard' | 'other'
  description: string
  content: string
  variables: string[]
  audience: string[]
  frequency: string
  status: 'active' | 'inactive' | 'deprecated'
}

export interface CommunicationProtocol {
  id: string
  name: string
  description: string
  type: 'standard' | 'emergency' | 'escalation' | 'coordination'
  steps: string[]
  roles: string[]
  timing: string
  criteria: string[]
  status: 'active' | 'inactive' | 'deprecated'
}

export interface EscalationProcedure {
  id: string
  name: string
  description: string
  trigger: string
  levels: string[]
  roles: string[]
  timing: string
  actions: string[]
  status: 'active' | 'inactive' | 'deprecated'
}

export interface CommunicationMonitoring {
  metrics: CommunicationMetrics
  reports: CommunicationReport[]
  dashboards: CommunicationDashboard[]
  alerts: CommunicationAlert[]
}

export interface CommunicationMetrics {
  frequency: number
  reach: number
  engagement: number
  effectiveness: number
  satisfaction: number
  responseTime: number
  resolutionTime: number
  escalationRate: number
}

export interface CommunicationReport {
  id: string
  name: string
  type: 'summary' | 'detailed' | 'exception' | 'trend'
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly'
  recipients: string[]
  format: 'pdf' | 'excel' | 'csv' | 'json' | 'html'
  content: string[]
  status: 'active' | 'inactive' | 'deprecated'
}

export interface CommunicationDashboard {
  id: string
  name: string
  type: 'executive' | 'operational' | 'technical' | 'custom'
  widgets: DashboardWidget[]
  layout: string
  refreshRate: string
  access: string[]
  status: 'active' | 'inactive' | 'maintenance'
}

export interface CommunicationAlert {
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

export interface GovernanceFramework {
  structure: GovernanceStructure
  processes: GovernanceProcess[]
  policies: Policy[]
  compliance: Compliance[]
  audit: Audit[]
  monitoring: GovernanceMonitoring
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
  status: 'active' | 'inactive' | 'deprecated'
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

export interface GovernanceMonitoring {
  metrics: GovernanceMetrics
  reports: GovernanceReport[]
  dashboards: GovernanceDashboard[]
  alerts: GovernanceAlert[]
}

export interface GovernanceMetrics {
  compliance: number
  effectiveness: number
  efficiency: number
  satisfaction: number
  risk: number
  cost: number
  time: number
  quality: number
}

export interface GovernanceReport {
  id: string
  name: string
  type: 'summary' | 'detailed' | 'exception' | 'trend'
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly'
  recipients: string[]
  format: 'pdf' | 'excel' | 'csv' | 'json' | 'html'
  content: string[]
  status: 'active' | 'inactive' | 'deprecated'
}

export interface GovernanceDashboard {
  id: string
  name: string
  type: 'executive' | 'operational' | 'technical' | 'custom'
  widgets: DashboardWidget[]
  layout: string
  refreshRate: string
  access: string[]
  status: 'active' | 'inactive' | 'maintenance'
}

export interface GovernanceAlert {
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

export interface MonitoringFramework {
  metrics: MonitoringMetrics
  reports: MonitoringReport[]
  dashboards: MonitoringDashboard[]
  alerts: MonitoringAlert[]
  tools: MonitoringTool[]
}

export interface MonitoringMetrics {
  performance: number
  quality: number
  schedule: number
  budget: number
  risk: number
  stakeholder: number
  resource: number
  overall: number
}

export interface MonitoringReport {
  id: string
  name: string
  type: 'summary' | 'detailed' | 'exception' | 'trend'
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly'
  recipients: string[]
  format: 'pdf' | 'excel' | 'csv' | 'json' | 'html'
  content: string[]
  status: 'active' | 'inactive' | 'deprecated'
}

export interface MonitoringDashboard {
  id: string
  name: string
  type: 'executive' | 'operational' | 'technical' | 'custom'
  widgets: DashboardWidget[]
  layout: string
  refreshRate: string
  access: string[]
  status: 'active' | 'inactive' | 'maintenance'
}

export interface MonitoringAlert {
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

export interface MonitoringTool {
  id: string
  name: string
  type: 'dashboard' | 'reporting' | 'alerting' | 'analytics' | 'other'
  description: string
  purpose: string
  capabilities: string[]
  integration: string[]
  status: 'active' | 'inactive' | 'deprecated'
}

export interface QualityFramework {
  standards: QualityStandard[]
  processes: QualityProcess[]
  tools: QualityTool[]
  metrics: QualityMetrics
  monitoring: QualityMonitoring
}

export interface QualityStandard {
  id: string
  name: string
  description: string
  category: 'functional' | 'non-functional' | 'performance' | 'security' | 'usability' | 'accessibility'
  version: string
  status: 'active' | 'inactive' | 'deprecated'
  requirements: string[]
  procedures: string[]
  exceptions: string[]
}

export interface QualityProcess {
  id: string
  name: string
  description: string
  type: 'review' | 'testing' | 'validation' | 'verification' | 'audit'
  owner: string
  participants: string[]
  frequency: string
  criteria: string[]
  outcomes: string[]
  status: 'active' | 'inactive' | 'deprecated'
}

export interface QualityTool {
  id: string
  name: string
  type: 'testing' | 'review' | 'analysis' | 'monitoring' | 'other'
  description: string
  purpose: string
  capabilities: string[]
  integration: string[]
  status: 'active' | 'inactive' | 'deprecated'
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

export interface QualityMonitoring {
  metrics: QualityMetrics
  reports: QualityReport[]
  dashboards: QualityDashboard[]
  alerts: QualityAlert[]
}

export interface QualityReport {
  id: string
  name: string
  type: 'summary' | 'detailed' | 'exception' | 'trend'
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly'
  recipients: string[]
  format: 'pdf' | 'excel' | 'csv' | 'json' | 'html'
  content: string[]
  status: 'active' | 'inactive' | 'deprecated'
}

export interface QualityDashboard {
  id: string
  name: string
  type: 'executive' | 'operational' | 'technical' | 'custom'
  widgets: DashboardWidget[]
  layout: string
  refreshRate: string
  access: string[]
  status: 'active' | 'inactive' | 'maintenance'
}

export interface QualityAlert {
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

export interface RiskFramework {
  identification: RiskIdentification
  assessment: RiskAssessment
  mitigation: RiskMitigation
  monitoring: RiskMonitoring
  reporting: RiskReporting
}

export interface RiskIdentification {
  sources: string[]
  categories: string[]
  triggers: string[]
  indicators: string[]
  processes: string[]
}

export interface RiskAssessment {
  criteria: string[]
  methods: string[]
  scales: string[]
  matrices: string[]
  tools: string[]
}

export interface RiskMitigation {
  strategies: string[]
  actions: string[]
  owners: string[]
  timelines: string[]
  resources: string[]
}

export interface RiskMonitoring {
  metrics: string[]
  dashboards: string[]
  alerts: string[]
  reports: string[]
  tools: string[]
}

export interface RiskReporting {
  frequency: string
  formats: string[]
  recipients: string[]
  content: string[]
  escalation: string[]
}

export interface ChangeFramework {
  types: ChangeType[]
  processes: ChangeProcess[]
  approval: ChangeApproval
  implementation: ChangeImplementation
  monitoring: ChangeMonitoring
}

export interface ChangeType {
  id: string
  name: string
  description: string
  category: 'scope' | 'schedule' | 'budget' | 'quality' | 'resource' | 'other'
  impact: 'low' | 'medium' | 'high' | 'critical'
  approval: string[]
  timeline: string
  status: 'active' | 'inactive' | 'deprecated'
}

export interface ChangeProcess {
  id: string
  name: string
  description: string
  type: 'request' | 'evaluation' | 'approval' | 'implementation' | 'closure'
  owner: string
  participants: string[]
  steps: string[]
  criteria: string[]
  outcomes: string[]
  status: 'active' | 'inactive' | 'deprecated'
}

export interface ChangeApproval {
  levels: string[]
  roles: string[]
  criteria: string[]
  timelines: string[]
  escalation: string[]
}

export interface ChangeImplementation {
  planning: string[]
  execution: string[]
  monitoring: string[]
  closure: string[]
  lessons: string[]
}

export interface ChangeMonitoring {
  metrics: string[]
  dashboards: string[]
  alerts: string[]
  reports: string[]
  tools: string[]
}

export interface OrchestratorConfig {
  defaultOutputFormat: 'markdown' | 'json' | 'yaml' | 'text'
  projectType: string
  teamSize: 'small' | 'medium' | 'large'
  complexity: 'low' | 'medium' | 'high'
  timeline: string
  budget: string
  workflowType: 'sequential' | 'parallel' | 'conditional' | 'iterative' | 'hybrid'
  coordinationLevel: 'project' | 'program' | 'portfolio' | 'enterprise'
  methodology: 'agile' | 'waterfall' | 'hybrid' | 'scrum' | 'kanban' | 'saf' | 'less' | 'nexus'
  tools: string[]
  autoSave: boolean
  templates: {
    coordination: string[]
    workflow: string[]
    communication: string[]
    governance: string[]
  }
}
