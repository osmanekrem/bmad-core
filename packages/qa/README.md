# @osmanekrem/bmad-qa

BMad QA Agent - AI-driven quality assurance and testing specialist.

## Features

- 📋 **Test Planning**: Create comprehensive test plans and strategies
- 🧪 **Test Case Design**: Design effective test cases and scenarios
- ▶️ **Test Execution**: Execute tests and analyze results
- 🐛 **Bug Tracking**: Identify, report, and track bugs
- 🚪 **Quality Gates**: Implement quality gates and criteria
- 🤖 **Test Automation**: Design and implement test automation
- ⚡ **Performance Testing**: Plan and execute performance tests
- 🔒 **Security Testing**: Conduct security testing and vulnerability assessment
- 📊 **Test Reporting**: Generate comprehensive test reports
- 📈 **Quality Metrics**: Track and analyze quality metrics

## Installation

```bash
npm install @osmanekrem/bmad-qa
```

## Quick Start

```typescript
import { QAAgent } from '@osmanekrem/bmad-qa'

// Initialize the QA agent
const qa = new QAAgent({
  defaultOutputFormat: 'markdown',
  testFramework: 'jest',
  testLevel: 'all',
  automationLevel: 'partial'
})

// Create test plan
const result = await qa.executeCommand('create-test-plan', {
  userInput: 'E-commerce platform testing',
  testType: 'Functional Testing',
  framework: 'jest'
})

console.log(result.output)
```

## Available Commands

### Test Planning
```typescript
const plan = await qa.executeCommand('create-test-plan', {
  userInput: 'E-commerce platform testing',
  testType: 'Functional Testing',
  framework: 'jest',
  options: {
    projectType: 'Web Application',
    testLevel: 'all',
    automationLevel: 'partial'
  }
})
```

### Test Case Design
```typescript
const testCases = await qa.executeCommand('design-test-cases', {
  userInput: 'User authentication functionality',
  testType: 'Functional Testing',
  framework: 'jest',
  options: {
    coverage: 'Comprehensive',
    includeEdgeCases: true,
    includeNegativeTests: true
  }
})
```

### Test Execution
```typescript
const execution = await qa.executeCommand('execute-tests', {
  userInput: 'User authentication test suite',
  testType: 'Functional Testing',
  framework: 'jest',
  options: {
    testSuite: 'All test cases',
    testEnvironment: 'Test environment',
    executionMode: 'Sequential'
  }
})
```

### Bug Tracking
```typescript
const bugs = await qa.executeCommand('track-bugs', {
  userInput: 'E-commerce platform defects',
  testType: 'Bug Tracking',
  options: {
    project: 'E-commerce Platform',
    bugStatus: 'All statuses',
    severity: 'All severities'
  }
})
```

### Quality Gates
```typescript
const gates = await qa.executeCommand('implement-quality-gates', {
  userInput: 'Release readiness assessment',
  testType: 'Quality Gates',
  options: {
    projectPhase: 'Pre-release',
    qualityLevel: 'High quality',
    criteria: 'Standard criteria'
  }
})
```

### Test Automation
```typescript
const automation = await qa.executeCommand('design-automation', {
  userInput: 'E-commerce platform test automation',
  testType: 'Test Automation',
  framework: 'selenium',
  options: {
    testTypes: 'Functional and regression',
    coverage: '80%',
    includeCI: true
  }
})
```

### Performance Testing
```typescript
const performance = await qa.executeCommand('performance-testing', {
  userInput: 'E-commerce platform performance testing',
  testType: 'Performance Testing',
  options: {
    applicationType: 'Web application',
    loadLevel: 'Expected load',
    performanceGoals: 'Standard performance'
  }
})
```

### Security Testing
```typescript
const security = await qa.executeCommand('security-testing', {
  userInput: 'E-commerce platform security testing',
  testType: 'Security Testing',
  options: {
    applicationType: 'Web application',
    securityLevel: 'High security',
    compliance: 'PCI DSS'
  }
})
```

### Test Reporting
```typescript
const report = await qa.executeCommand('generate-test-report', {
  userInput: 'E-commerce platform test execution report',
  testType: 'Test Reporting',
  options: {
    reportType: 'Comprehensive test report',
    testResults: 'All test results',
    metrics: 'All metrics'
  }
})
```

### Quality Metrics
```typescript
const metrics = await qa.executeCommand('analyze-quality-metrics', {
  userInput: 'E-commerce platform quality analysis',
  testType: 'Quality Metrics',
  options: {
    projectPhase: 'All phases',
    metricsType: 'All metrics',
    analysisLevel: 'Detailed analysis'
  }
})
```

## Configuration

```typescript
const qa = new QAAgent({
  defaultOutputFormat: 'markdown',     // 'markdown' | 'json' | 'yaml' | 'text'
  testFramework: 'jest',              // 'jest' | 'mocha' | 'pytest' | 'junit' | 'selenium' | 'cypress'
  testLevel: 'all',                   // 'unit' | 'integration' | 'system' | 'acceptance' | 'all'
  automationLevel: 'partial',         // 'none' | 'partial' | 'full'
  autoSave: true,                     // Auto-save test plans
  templates: {
    planning: ['test-plan-tmpl'],
    execution: ['test-execution-tmpl'],
    reporting: ['test-report-tmpl'],
    gates: ['qa-gate-tmpl']
  }
})
```

## Template Integration

The QA agent integrates with the BMad template system for structured output:

```typescript
import { QATemplateManager } from '@osmanekrem/bmad-qa'

const templateManager = new QATemplateManager()

// Render test plan with template
const formattedOutput = await templateManager.renderTestPlanTemplate(
  'test-plan-tmpl',
  context,
  testPlanData
)
```

## API Reference

### QAAgent

#### Constructor
```typescript
new QAAgent(config?: Partial<QAConfig>)
```

#### Methods
- `executeCommand(commandName: string, context: QAContext): Promise<QAResponse>`
- `getAvailableCommands(): string[]`
- `getCommandDescription(commandName: string): string | undefined`
- `updateConfig(newConfig: Partial<QAConfig>): void`
- `getConfig(): QAConfig`

### Types

#### QAContext
```typescript
interface QAContext {
  projectPath?: string
  userInput?: string
  options?: Record<string, any>
  templates?: string[]
  outputFormat?: 'markdown' | 'json' | 'yaml' | 'text'
  testType?: string
  framework?: string
}
```

#### QAResponse
```typescript
interface QAResponse {
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
```

## Testing Framework

### Test Planning
1. **Test Objectives**: Define testing goals and objectives
2. **Test Scope**: Define what to test and what not to test
3. **Test Strategy**: Define testing approach and methodology
4. **Test Levels**: Plan different levels of testing
5. **Test Types**: Plan different types of testing
6. **Test Environment**: Define test environment requirements
7. **Test Schedule**: Plan test execution timeline
8. **Test Resources**: Plan test team and resources
9. **Test Risks**: Identify and plan for test risks
10. **Test Deliverables**: Define test outputs and reports

### Testing Levels
- **Unit Testing**: Test individual components
- **Integration Testing**: Test component interactions
- **System Testing**: Test complete system functionality
- **Acceptance Testing**: Test user acceptance criteria
- **Performance Testing**: Test system performance
- **Security Testing**: Test security vulnerabilities

### Testing Types
- **Functional Testing**: Test functional requirements
- **Non-Functional Testing**: Test performance, security, usability
- **Regression Testing**: Test for unintended changes
- **Smoke Testing**: Basic functionality verification
- **Sanity Testing**: Focused testing on specific areas

## Examples

### Basic Test Planning
```typescript
import { QAAgent } from '@osmanekrem/bmad-qa'

const qa = new QAAgent()

const result = await qa.executeCommand('create-test-plan', {
  userInput: 'Mobile app testing',
  testType: 'Functional Testing',
  framework: 'jest'
})

if (result.success) {
  console.log(result.output)
} else {
  console.error('Test planning failed:', result.error)
}
```

### Advanced Test Case Design
```typescript
const testCases = await qa.executeCommand('design-test-cases', {
  userInput: 'User registration functionality',
  testType: 'Functional Testing',
  framework: 'jest',
  options: {
    coverage: 'Comprehensive',
    includeEdgeCases: true,
    includeNegativeTests: true,
    includeBoundaryTests: true
  }
})

const testCaseData = testCases.data as TestCase[]
console.log(`Total test cases: ${testCaseData.length}`)
```

### Custom Configuration
```typescript
const qa = new QAAgent({
  defaultOutputFormat: 'json',
  testFramework: 'selenium',
  testLevel: 'system',
  automationLevel: 'full',
  autoSave: false,
  templates: {
    planning: ['custom-test-plan-tmpl'],
    execution: ['test-execution-tmpl'],
    reporting: ['test-report-tmpl'],
    gates: ['qa-gate-tmpl']
  }
})

// Update configuration
qa.updateConfig({
  testFramework: 'cypress',
  automationLevel: 'partial'
})
```

## Quality Assurance Best Practices

### Test Planning
- Define clear test objectives and scope
- Create comprehensive test strategies
- Plan for different testing levels and types
- Identify and mitigate test risks
- Allocate appropriate resources

### Test Execution
- Execute tests systematically
- Document test results thoroughly
- Track and manage defects effectively
- Monitor test progress and metrics
- Maintain test cases and data

### Quality Gates
- Define clear quality criteria
- Implement effective quality gates
- Monitor quality gate status
- Report quality gate results
- Improve quality processes

### Test Automation
- Select appropriate automation tools
- Design maintainable automation frameworks
- Automate repetitive test cases
- Maintain and update test scripts
- Monitor automation effectiveness

## License

MIT
