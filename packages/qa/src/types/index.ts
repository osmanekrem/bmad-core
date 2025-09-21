// QA Agent Types

export interface QACommand {
  name: string
  description: string
  execute: (context: QAContext) => Promise<QAResponse>
}

export interface QAContext {
  projectPath?: string
  userInput?: string
  options?: Record<string, any>
  templates?: string[]
  outputFormat?: 'markdown' | 'json' | 'yaml' | 'text'
  testType?: string
  framework?: string
}

export interface QAResponse {
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

export interface TestPlan {
  title: string
  description: string
  objectives: string[]
  scope: TestScope
  strategy: TestStrategy
  testCases: TestCase[]
  testData: TestData[]
  environment: TestEnvironment
  schedule: TestSchedule
  resources: TestResources
  risks: TestRisk[]
  deliverables: TestDeliverable[]
  metrics: TestMetrics
  metadata: {
    planType: string
    timestamp: string
    complexity: 'low' | 'medium' | 'high'
    estimatedDuration: string
  }
}

export interface TestScope {
  included: string[]
  excluded: string[]
  assumptions: string[]
  constraints: string[]
  dependencies: string[]
  success: string[]
}

export interface TestStrategy {
  approach: 'black-box' | 'white-box' | 'grey-box' | 'hybrid'
  levels: TestLevel[]
  types: TestType[]
  techniques: TestTechnique[]
  tools: TestTool[]
  automation: AutomationStrategy
}

export interface TestLevel {
  name: string
  description: string
  objectives: string[]
  scope: string[]
  deliverables: string[]
  entry: string[]
  exit: string[]
}

export interface TestType {
  name: string
  description: string
  objectives: string[]
  scope: string[]
  techniques: string[]
  tools: string[]
  deliverables: string[]
}

export interface TestTechnique {
  name: string
  description: string
  purpose: string
  steps: string[]
  tools: string[]
  examples: string[]
}

export interface TestTool {
  name: string
  type: 'functional' | 'performance' | 'security' | 'automation' | 'management'
  description: string
  features: string[]
  pros: string[]
  cons: string[]
  cost: string
  license: string
}

export interface AutomationStrategy {
  approach: 'full' | 'partial' | 'none'
  tools: string[]
  framework: string
  coverage: number
  maintenance: string[]
  benefits: string[]
  challenges: string[]
}

export interface TestCase {
  id: string
  title: string
  description: string
  type: 'functional' | 'integration' | 'system' | 'acceptance' | 'performance' | 'security' | 'usability'
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'draft' | 'ready' | 'executed' | 'passed' | 'failed' | 'blocked'
  preconditions: string[]
  steps: TestStep[]
  expected: string[]
  actual?: string[]
  result?: 'pass' | 'fail' | 'blocked' | 'skipped'
  notes?: string[]
  attachments?: string[]
}

export interface TestStep {
  step: number
  action: string
  expected: string
  actual?: string
  result?: 'pass' | 'fail' | 'blocked' | 'skipped'
  notes?: string
}

export interface TestData {
  id: string
  name: string
  description: string
  type: 'input' | 'output' | 'reference' | 'boundary' | 'invalid'
  format: string
  source: string
  content: any
  validation: string[]
  dependencies: string[]
}

export interface TestEnvironment {
  name: string
  type: 'development' | 'testing' | 'staging' | 'production'
  description: string
  hardware: HardwareSpec[]
  software: SoftwareSpec[]
  network: NetworkSpec
  data: DataSpec
  access: AccessSpec
  configuration: ConfigurationSpec[]
}

export interface HardwareSpec {
  component: string
  specification: string
  quantity: number
  purpose: string
}

export interface SoftwareSpec {
  name: string
  version: string
  type: 'os' | 'browser' | 'database' | 'middleware' | 'application'
  purpose: string
  configuration: string[]
}

export interface NetworkSpec {
  topology: string
  bandwidth: string
  latency: string
  security: string[]
  protocols: string[]
}

export interface DataSpec {
  sources: string[]
  formats: string[]
  volume: string
  privacy: string[]
  backup: string[]
}

export interface AccessSpec {
  users: string[]
  roles: string[]
  permissions: string[]
  authentication: string[]
  authorization: string[]
}

export interface ConfigurationSpec {
  component: string
  setting: string
  value: string
  purpose: string
}

export interface TestSchedule {
  phases: TestPhase[]
  milestones: TestMilestone[]
  dependencies: TestDependency[]
  resources: ResourceAllocation[]
  timeline: string
  buffer: string
}

export interface TestPhase {
  name: string
  description: string
  startDate: string
  endDate: string
  duration: string
  objectives: string[]
  deliverables: string[]
  dependencies: string[]
  resources: string[]
}

export interface TestMilestone {
  name: string
  description: string
  date: string
  criteria: string[]
  deliverables: string[]
  dependencies: string[]
  owner: string
}

export interface TestDependency {
  from: string
  to: string
  type: 'finish-to-start' | 'start-to-start' | 'finish-to-finish' | 'start-to-finish'
  lag: number
}

export interface ResourceAllocation {
  resource: string
  role: string
  allocation: number
  startDate: string
  endDate: string
  skills: string[]
}

export interface TestResources {
  team: TestTeamMember[]
  tools: TestTool[]
  environment: TestEnvironment
  budget: number
  external: ExternalResource[]
}

export interface TestTeamMember {
  name: string
  role: string
  skills: string[]
  experience: string
  availability: string
  responsibilities: string[]
  cost: number
}

export interface ExternalResource {
  name: string
  type: string
  description: string
  cost: number
  duration: string
  deliverables: string[]
}

export interface TestRisk {
  id: string
  title: string
  description: string
  probability: 'low' | 'medium' | 'high'
  impact: 'low' | 'medium' | 'high'
  category: 'technical' | 'resource' | 'schedule' | 'quality' | 'environment'
  owner: string
  status: 'open' | 'mitigated' | 'closed'
  mitigation: string[]
  contingency: string[]
}

export interface TestDeliverable {
  id: string
  name: string
  description: string
  type: 'document' | 'script' | 'data' | 'report' | 'tool'
  format: string
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

export interface TestMetrics {
  coverage: CoverageMetrics
  execution: ExecutionMetrics
  defect: DefectMetrics
  performance: PerformanceMetrics
  quality: QualityMetrics
}

export interface CoverageMetrics {
  requirements: number
  code: number
  functions: number
  branches: number
  statements: number
  paths: number
}

export interface ExecutionMetrics {
  planned: number
  executed: number
  passed: number
  failed: number
  blocked: number
  skipped: number
  progress: number
}

export interface DefectMetrics {
  total: number
  open: number
  closed: number
  critical: number
  high: number
  medium: number
  low: number
  density: number
}

export interface PerformanceMetrics {
  responseTime: number
  throughput: number
  resourceUtilization: number
  scalability: number
  stability: number
}

export interface QualityMetrics {
  defectRate: number
  escapeRate: number
  reworkRate: number
  customerSatisfaction: number
  processMaturity: number
}

export interface BugReport {
  id: string
  title: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'new' | 'assigned' | 'open' | 'fixed' | 'closed' | 'rejected'
  category: 'functional' | 'performance' | 'security' | 'usability' | 'compatibility'
  environment: string
  steps: string[]
  expected: string
  actual: string
  attachments: string[]
  reporter: string
  assignee: string
  created: string
  updated: string
  resolved?: string
}

export interface TestReport {
  title: string
  summary: string
  scope: string
  approach: string
  results: TestResults
  metrics: TestMetrics
  issues: BugReport[]
  recommendations: string[]
  conclusions: string[]
  metadata: {
    reportType: string
    timestamp: string
    duration: string
    coverage: number
  }
}

export interface TestResults {
  total: number
  passed: number
  failed: number
  blocked: number
  skipped: number
  coverage: number
  defects: number
  critical: number
  high: number
  medium: number
  low: number
}

export interface QAGate {
  id: string
  name: string
  description: string
  criteria: QACriteria[]
  status: 'pass' | 'fail' | 'concerns' | 'waived'
  decision: string
  reviewer: string
  date: string
  comments: string[]
  nextSteps: string[]
}

export interface QACriteria {
  id: string
  name: string
  description: string
  type: 'functional' | 'performance' | 'security' | 'usability' | 'compatibility'
  weight: number
  status: 'pass' | 'fail' | 'concerns' | 'waived'
  evidence: string[]
  notes: string[]
}

export interface QAConfig {
  defaultOutputFormat: 'markdown' | 'json' | 'yaml' | 'text'
  testFramework: 'jest' | 'mocha' | 'pytest' | 'junit' | 'selenium' | 'cypress'
  testLevel: 'unit' | 'integration' | 'system' | 'acceptance' | 'all'
  automationLevel: 'none' | 'partial' | 'full'
  autoSave: boolean
  templates: {
    planning: string[]
    execution: string[]
    reporting: string[]
    gates: string[]
  }
}
