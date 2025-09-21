// Dev Agent Types

export interface DevCommand {
  name: string
  description: string
  execute: (context: DevContext) => Promise<DevResponse>
}

export interface DevContext {
  projectPath?: string
  userInput?: string
  options?: Record<string, any>
  templates?: string[]
  outputFormat?: 'markdown' | 'json' | 'yaml' | 'text'
  codeLanguage?: string
  framework?: string
}

export interface DevResponse {
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

export interface CodeGeneration {
  title: string
  description: string
  language: string
  framework?: string
  code: string
  files: CodeFile[]
  dependencies: Dependency[]
  instructions: string[]
  testing: TestingInfo
  documentation: DocumentationInfo
  metadata: {
    generationType: string
    timestamp: string
    complexity: 'low' | 'medium' | 'high'
    estimatedTime: string
  }
}

export interface CodeFile {
  path: string
  content: string
  type: 'source' | 'test' | 'config' | 'documentation' | 'other'
  language: string
  description: string
  dependencies: string[]
}

export interface Dependency {
  name: string
  version: string
  type: 'production' | 'development' | 'peer'
  description: string
  installation: string
}

export interface TestingInfo {
  framework: string
  testFiles: string[]
  coverage: string
  instructions: string[]
  commands: string[]
}

export interface DocumentationInfo {
  format: 'markdown' | 'jsdoc' | 'tsdoc' | 'other'
  files: string[]
  instructions: string[]
  examples: string[]
}

export interface CodeReview {
  title: string
  summary: string
  issues: CodeIssue[]
  suggestions: CodeSuggestion[]
  improvements: CodeImprovement[]
  security: SecurityIssue[]
  performance: PerformanceIssue[]
  bestPractices: BestPractice[]
  overallScore: number
  metadata: {
    reviewType: string
    timestamp: string
    language: string
    linesOfCode: number
  }
}

export interface CodeIssue {
  type: 'bug' | 'warning' | 'info' | 'error'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  file: string
  line: number
  column?: number
  code: string
  suggestion: string
  impact: string
}

export interface CodeSuggestion {
  title: string
  description: string
  category: 'refactoring' | 'optimization' | 'readability' | 'maintainability'
  priority: 'low' | 'medium' | 'high'
  effort: 'low' | 'medium' | 'high'
  impact: 'low' | 'medium' | 'high'
  code: string
  improvedCode: string
  explanation: string
}

export interface CodeImprovement {
  title: string
  description: string
  category: 'performance' | 'security' | 'maintainability' | 'readability'
  priority: 'low' | 'medium' | 'high'
  effort: 'low' | 'medium' | 'high'
  impact: 'low' | 'medium' | 'high'
  currentCode: string
  improvedCode: string
  explanation: string
  benefits: string[]
}

export interface SecurityIssue {
  type: 'vulnerability' | 'weakness' | 'misconfiguration'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  file: string
  line: number
  cwe?: string
  owasp?: string
  impact: string
  remediation: string
  references: string[]
}

export interface PerformanceIssue {
  type: 'bottleneck' | 'inefficiency' | 'memory-leak' | 'cpu-intensive'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  file: string
  line: number
  impact: string
  remediation: string
  metrics: Record<string, any>
}

export interface BestPractice {
  category: 'coding' | 'security' | 'performance' | 'maintainability'
  title: string
  description: string
  example: string
  antiPattern: string
  benefits: string[]
  references: string[]
}

export interface DebuggingSession {
  title: string
  description: string
  issue: DebugIssue
  steps: DebugStep[]
  solution: DebugSolution
  prevention: string[]
  metadata: {
    sessionType: string
    timestamp: string
    language: string
    complexity: 'low' | 'medium' | 'high'
  }
}

export interface DebugIssue {
  title: string
  description: string
  symptoms: string[]
  errorMessages: string[]
  stackTrace?: string
  environment: string
  reproduction: string[]
  severity: 'low' | 'medium' | 'high' | 'critical'
}

export interface DebugStep {
  step: number
  title: string
  description: string
  action: string
  expected: string
  actual?: string
  result: 'success' | 'failure' | 'partial'
  notes?: string
}

export interface DebugSolution {
  title: string
  description: string
  rootCause: string
  fix: string
  code: string
  explanation: string
  testing: string[]
  verification: string[]
}

export interface RefactoringPlan {
  title: string
  description: string
  currentCode: string
  refactoredCode: string
  steps: RefactoringStep[]
  benefits: string[]
  risks: string[]
  testing: string[]
  metadata: {
    refactoringType: string
    timestamp: string
    language: string
    complexity: 'low' | 'medium' | 'high'
  }
}

export interface RefactoringStep {
  step: number
  title: string
  description: string
  action: string
  code: string
  explanation: string
  testing: string[]
  rollback: string
}

export interface TestingPlan {
  title: string
  description: string
  testTypes: TestType[]
  testCases: TestCase[]
  framework: string
  setup: string[]
  execution: string[]
  coverage: CoverageTarget
  metadata: {
    planType: string
    timestamp: string
    language: string
    complexity: 'low' | 'medium' | 'high'
  }
}

export interface TestType {
  name: string
  description: string
  priority: 'low' | 'medium' | 'high'
  coverage: number
  examples: string[]
}

export interface TestCase {
  id: string
  title: string
  description: string
  type: 'unit' | 'integration' | 'e2e' | 'performance' | 'security'
  priority: 'low' | 'medium' | 'high'
  steps: string[]
  expected: string
  actual?: string
  status: 'pending' | 'pass' | 'fail' | 'skip'
}

export interface CoverageTarget {
  overall: number
  lines: number
  functions: number
  branches: number
  statements: number
}

export interface DevConfig {
  defaultOutputFormat: 'markdown' | 'json' | 'yaml' | 'text'
  codeStyle: 'standard' | 'prettier' | 'eslint' | 'custom'
  testingFramework: 'jest' | 'mocha' | 'vitest' | 'pytest' | 'junit'
  documentationFormat: 'markdown' | 'jsdoc' | 'tsdoc' | 'other'
  autoSave: boolean
  templates: {
    generation: string[]
    review: string[]
    debugging: string[]
    testing: string[]
  }
}
