import { BaseAgentImpl, AgentContext, AgentResponse } from '@osmanekrem/bmad-core'
import { 
  QACommand, 
  QAContext, 
  QAResponse, 
  TestPlan,
  BugReport,
  TestReport,
  QAGate,
  QAConfig as QAConfigType
} from './types/index.js'

export class QAAgent extends BaseAgentImpl {
  private qaConfig: QAConfigType
  private commands: Map<string, QACommand> = new Map()

  constructor(config?: Partial<QAConfigType>) {
    super({
      systemPrompt: `You are the BMad QA, an AI-driven quality assurance and testing specialist. Your role is to:

1. **Test Planning**: Create comprehensive test plans and strategies
2. **Test Case Design**: Design effective test cases and scenarios
3. **Test Execution**: Execute tests and analyze results
4. **Bug Tracking**: Identify, report, and track bugs
5. **Quality Gates**: Implement quality gates and criteria
6. **Test Automation**: Design and implement test automation
7. **Performance Testing**: Plan and execute performance tests
8. **Security Testing**: Conduct security testing and vulnerability assessment
9. **Test Reporting**: Generate comprehensive test reports
10. **Quality Metrics**: Track and analyze quality metrics

## Core Principles:
- **Quality First**: Ensure high-quality deliverables
- **Risk-Based Testing**: Focus on high-risk areas
- **Comprehensive Coverage**: Achieve thorough test coverage
- **Automation**: Leverage automation for efficiency
- **Continuous Improvement**: Learn and improve processes
- **Collaboration**: Work closely with development teams

## Testing Framework:
1. **Test Planning**: Define testing scope, strategy, and approach
2. **Test Design**: Create test cases and test data
3. **Test Execution**: Execute tests and record results
4. **Defect Management**: Track and manage defects
5. **Test Reporting**: Generate test reports and metrics
6. **Quality Assessment**: Evaluate quality and provide recommendations

## Testing Levels:
- **Unit Testing**: Test individual components
- **Integration Testing**: Test component interactions
- **System Testing**: Test complete system functionality
- **Acceptance Testing**: Test user acceptance criteria
- **Performance Testing**: Test system performance
- **Security Testing**: Test security vulnerabilities

## Testing Types:
- **Functional Testing**: Test functional requirements
- **Non-Functional Testing**: Test performance, security, usability
- **Regression Testing**: Test for unintended changes
- **Smoke Testing**: Basic functionality verification
- **Sanity Testing**: Focused testing on specific areas

## Output Format:
- Use structured markdown with clear headings
- Include detailed test cases with steps and expected results
- Provide comprehensive test reports with metrics
- Include bug reports with severity and priority
- Document quality gates and criteria
- Provide actionable recommendations

Always ensure testing is thorough, systematic, and aligned with quality objectives.`
    })

    this.qaConfig = {
      defaultOutputFormat: 'markdown',
      testFramework: 'jest',
      testLevel: 'all',
      automationLevel: 'partial',
      autoSave: true,
      templates: {
        planning: ['test-plan-tmpl'],
        execution: ['test-execution-tmpl'],
        reporting: ['test-report-tmpl'],
        gates: ['qa-gate-tmpl']
      },
      ...config
    }

    this.initializeCommands()
  }

  // Implement abstract method from BaseAgentImpl
  async execute(command: string, context: AgentContext): Promise<AgentResponse> {
    // This method is required by BaseAgentImpl but not used in QAAgent
    // We use executeCommand instead
    throw new Error('Use executeCommand method instead of execute')
  }

  private initializeCommands(): void {
    // Test Planning Command
    this.commands.set('create-test-plan', {
      name: 'create-test-plan',
      description: 'Create comprehensive test plan',
      execute: async (context) => this.executeTestPlanning(context)
    })

    // Test Case Design Command
    this.commands.set('design-test-cases', {
      name: 'design-test-cases',
      description: 'Design test cases and scenarios',
      execute: async (context) => this.executeTestCaseDesign(context)
    })

    // Test Execution Command
    this.commands.set('execute-tests', {
      name: 'execute-tests',
      description: 'Execute tests and analyze results',
      execute: async (context) => this.executeTestExecution(context)
    })

    // Bug Tracking Command
    this.commands.set('track-bugs', {
      name: 'track-bugs',
      description: 'Identify, report, and track bugs',
      execute: async (context) => this.executeBugTracking(context)
    })

    // Quality Gates Command
    this.commands.set('implement-quality-gates', {
      name: 'implement-quality-gates',
      description: 'Implement quality gates and criteria',
      execute: async (context) => this.executeQualityGates(context)
    })

    // Test Automation Command
    this.commands.set('design-automation', {
      name: 'design-automation',
      description: 'Design and implement test automation',
      execute: async (context) => this.executeTestAutomation(context)
    })

    // Performance Testing Command
    this.commands.set('performance-testing', {
      name: 'performance-testing',
      description: 'Plan and execute performance tests',
      execute: async (context) => this.executePerformanceTesting(context)
    })

    // Security Testing Command
    this.commands.set('security-testing', {
      name: 'security-testing',
      description: 'Conduct security testing and vulnerability assessment',
      execute: async (context) => this.executeSecurityTesting(context)
    })

    // Test Reporting Command
    this.commands.set('generate-test-report', {
      name: 'generate-test-report',
      description: 'Generate comprehensive test reports',
      execute: async (context) => this.executeTestReporting(context)
    })

    // Quality Metrics Command
    this.commands.set('analyze-quality-metrics', {
      name: 'analyze-quality-metrics',
      description: 'Track and analyze quality metrics',
      execute: async (context) => this.executeQualityMetrics(context)
    })
  }

  async executeCommand(commandName: string, context: QAContext): Promise<QAResponse> {
    const command = this.commands.get(commandName)
    if (!command) {
      return {
        success: false,
        error: `Command '${commandName}' not found`,
        metadata: {
          command: commandName,
          timestamp: new Date().toISOString()
        }
      }
    }

    try {
      const startTime = Date.now()
      const result = await command.execute(context)
      const duration = Date.now() - startTime

      return {
        ...result,
        metadata: {
          ...result.metadata,
          command: commandName,
          timestamp: new Date().toISOString(),
          duration
        }
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        metadata: {
          command: commandName,
          timestamp: new Date().toISOString()
        }
      }
    }
  }

  private async executeTestPlanning(context: QAContext): Promise<QAResponse> {
    const prompt = this.buildTestPlanningPrompt(context)
    const response = await this.callAI(prompt)
    
    const testPlan: TestPlan = this.parseTestPlanResponse(response)
    
    return {
      success: true,
      data: testPlan,
      output: this.formatTestPlanOutput(testPlan),
      metadata: {
        command: 'create-test-plan',
        timestamp: new Date().toISOString(),
        template: 'test-plan-tmpl'
      }
    }
  }

  private async executeTestCaseDesign(context: QAContext): Promise<QAResponse> {
    const prompt = this.buildTestCaseDesignPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'design-test-cases',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeTestExecution(context: QAContext): Promise<QAResponse> {
    const prompt = this.buildTestExecutionPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'execute-tests',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeBugTracking(context: QAContext): Promise<QAResponse> {
    const prompt = this.buildBugTrackingPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'track-bugs',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeQualityGates(context: QAContext): Promise<QAResponse> {
    const prompt = this.buildQualityGatesPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'implement-quality-gates',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeTestAutomation(context: QAContext): Promise<QAResponse> {
    const prompt = this.buildTestAutomationPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'design-automation',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executePerformanceTesting(context: QAContext): Promise<QAResponse> {
    const prompt = this.buildPerformanceTestingPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'performance-testing',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeSecurityTesting(context: QAContext): Promise<QAResponse> {
    const prompt = this.buildSecurityTestingPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'security-testing',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeTestReporting(context: QAContext): Promise<QAResponse> {
    const prompt = this.buildTestReportingPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'generate-test-report',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeQualityMetrics(context: QAContext): Promise<QAResponse> {
    const prompt = this.buildQualityMetricsPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'analyze-quality-metrics',
        timestamp: new Date().toISOString()
      }
    }
  }

  // Prompt building methods
  private buildTestPlanningPrompt(context: QAContext): string {
    return `Create a comprehensive test plan for: ${context.userInput || 'the specified project'}

## Test Planning Requirements:
- Project Type: ${context.options?.projectType || 'Software Development'}
- Test Level: ${this.qaConfig.testLevel}
- Test Framework: ${this.qaConfig.testFramework}
- Automation Level: ${this.qaConfig.automationLevel}

## Test Planning Framework:
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

## Output Format:
- Use structured markdown with clear headings
- Include detailed test strategy and approach
- Provide comprehensive test case design guidelines
- Include test environment and resource requirements
- Document test schedule and milestones
- Include risk assessment and mitigation plans

Ensure the test plan is comprehensive, practical, and aligned with quality objectives.`
  }

  private buildTestCaseDesignPrompt(context: QAContext): string {
    return `Design test cases for: ${context.userInput || 'the specified functionality'}

## Test Case Design Requirements:
- Test Type: ${context.testType || 'Functional Testing'}
- Test Framework: ${this.qaConfig.testFramework}
- Test Level: ${this.qaConfig.testLevel}
- Coverage: ${context.options?.coverage || 'Comprehensive'}

## Test Case Design Framework:
1. **Test Case Structure**: Define test case format and structure
2. **Test Scenarios**: Identify test scenarios and use cases
3. **Test Data**: Design test data and test inputs
4. **Test Steps**: Define detailed test execution steps
5. **Expected Results**: Define expected outcomes and results
6. **Test Coverage**: Ensure comprehensive test coverage
7. **Test Prioritization**: Prioritize test cases by importance
8. **Test Automation**: Identify test cases for automation

## Output Format:
- Use structured markdown with clear headings
- Include detailed test cases with steps and expected results
- Provide test data and test scenarios
- Include test coverage analysis
- Document test prioritization and automation recommendations
- Include test case templates and guidelines

Ensure test cases are clear, comprehensive, and executable.`
  }

  private buildTestExecutionPrompt(context: QAContext): string {
    return `Execute tests for: ${context.userInput || 'the specified test suite'}

## Test Execution Requirements:
- Test Suite: ${context.options?.testSuite || 'All test cases'}
- Test Environment: ${context.options?.testEnvironment || 'Test environment'}
- Test Framework: ${this.qaConfig.testFramework}
- Execution Mode: ${context.options?.executionMode || 'Sequential'}

## Test Execution Framework:
1. **Test Preparation**: Prepare test environment and data
2. **Test Execution**: Execute tests and record results
3. **Result Analysis**: Analyze test results and failures
4. **Defect Reporting**: Report and track defects
5. **Test Reporting**: Generate test execution reports
6. **Test Maintenance**: Update and maintain test cases
7. **Test Metrics**: Track and analyze test metrics

## Output Format:
- Use structured markdown with clear headings
- Include test execution results and status
- Provide defect reports and analysis
- Include test metrics and coverage
- Document test execution recommendations
- Include test maintenance guidelines

Ensure test execution is thorough and results are well-documented.`
  }

  private buildBugTrackingPrompt(context: QAContext): string {
    return `Track and manage bugs for: ${context.userInput || 'the specified project'}

## Bug Tracking Requirements:
- Project: ${context.options?.project || 'Current project'}
- Bug Status: ${context.options?.bugStatus || 'All statuses'}
- Severity: ${context.options?.severity || 'All severities'}
- Priority: ${context.options?.priority || 'All priorities'}

## Bug Tracking Framework:
1. **Bug Identification**: Identify and document bugs
2. **Bug Classification**: Classify bugs by severity and priority
3. **Bug Reporting**: Create detailed bug reports
4. **Bug Assignment**: Assign bugs to appropriate team members
5. **Bug Tracking**: Track bug status and progress
6. **Bug Resolution**: Resolve bugs and verify fixes
7. **Bug Analysis**: Analyze bug trends and patterns
8. **Bug Metrics**: Track bug metrics and KPIs

## Output Format:
- Use structured markdown with clear headings
- Include detailed bug reports with severity and priority
- Provide bug tracking and status information
- Include bug analysis and trends
- Document bug resolution process
- Include bug metrics and recommendations

Ensure bug tracking is systematic and comprehensive.`
  }

  private buildQualityGatesPrompt(context: QAContext): string {
    return `Implement quality gates for: ${context.userInput || 'the specified project'}

## Quality Gates Requirements:
- Project Phase: ${context.options?.projectPhase || 'All phases'}
- Quality Level: ${context.options?.qualityLevel || 'High quality'}
- Criteria: ${context.options?.criteria || 'Standard criteria'}

## Quality Gates Framework:
1. **Gate Definition**: Define quality gate criteria
2. **Gate Implementation**: Implement quality gate checks
3. **Gate Monitoring**: Monitor quality gate status
4. **Gate Reporting**: Report quality gate results
5. **Gate Improvement**: Improve quality gate processes
6. **Gate Metrics**: Track quality gate metrics

## Output Format:
- Use structured markdown with clear headings
- Include quality gate criteria and requirements
- Provide quality gate implementation guidelines
- Include quality gate monitoring and reporting
- Document quality gate improvement recommendations
- Include quality gate metrics and KPIs

Ensure quality gates are effective and aligned with quality objectives.`
  }

  private buildTestAutomationPrompt(context: QAContext): string {
    return `Design test automation for: ${context.userInput || 'the specified project'}

## Test Automation Requirements:
- Test Framework: ${this.qaConfig.testFramework}
- Automation Level: ${this.qaConfig.automationLevel}
- Test Types: ${context.options?.testTypes || 'Functional and regression'}
- Coverage: ${context.options?.coverage || '80%'}

## Test Automation Framework:
1. **Automation Strategy**: Define automation approach and strategy
2. **Tool Selection**: Select appropriate automation tools
3. **Framework Design**: Design automation framework
4. **Test Scripting**: Create automated test scripts
5. **Test Execution**: Execute automated tests
6. **Test Maintenance**: Maintain and update test scripts
7. **Test Reporting**: Generate automation reports

## Output Format:
- Use structured markdown with clear headings
- Include automation strategy and approach
- Provide tool selection and framework design
- Include test scripting guidelines and examples
- Document test execution and maintenance processes
- Include automation metrics and recommendations

Ensure test automation is efficient and maintainable.`
  }

  private buildPerformanceTestingPrompt(context: QAContext): string {
    return `Plan performance testing for: ${context.userInput || 'the specified application'}

## Performance Testing Requirements:
- Application Type: ${context.options?.applicationType || 'Web application'}
- Load Level: ${context.options?.loadLevel || 'Expected load'}
- Performance Goals: ${context.options?.performanceGoals || 'Standard performance'}

## Performance Testing Framework:
1. **Performance Objectives**: Define performance goals and objectives
2. **Test Scenarios**: Design performance test scenarios
3. **Test Data**: Prepare performance test data
4. **Test Execution**: Execute performance tests
5. **Result Analysis**: Analyze performance test results
6. **Performance Optimization**: Recommend performance improvements
7. **Performance Monitoring**: Monitor performance metrics

## Output Format:
- Use structured markdown with clear headings
- Include performance objectives and goals
- Provide performance test scenarios and data
- Include performance test execution guidelines
- Document performance analysis and recommendations
- Include performance monitoring and metrics

Ensure performance testing is comprehensive and actionable.`
  }

  private buildSecurityTestingPrompt(context: QAContext): string {
    return `Conduct security testing for: ${context.userInput || 'the specified application'}

## Security Testing Requirements:
- Application Type: ${context.options?.applicationType || 'Web application'}
- Security Level: ${context.options?.securityLevel || 'High security'}
- Compliance: ${context.options?.compliance || 'Standard compliance'}

## Security Testing Framework:
1. **Security Objectives**: Define security testing goals
2. **Threat Analysis**: Analyze potential security threats
3. **Vulnerability Assessment**: Assess security vulnerabilities
4. **Penetration Testing**: Conduct penetration testing
5. **Security Validation**: Validate security controls
6. **Security Reporting**: Generate security test reports
7. **Security Recommendations**: Provide security recommendations

## Output Format:
- Use structured markdown with clear headings
- Include security objectives and threat analysis
- Provide vulnerability assessment and penetration testing
- Include security validation and controls
- Document security recommendations and best practices
- Include security metrics and compliance

Ensure security testing is thorough and comprehensive.`
  }

  private buildTestReportingPrompt(context: QAContext): string {
    return `Generate test report for: ${context.userInput || 'the specified test execution'}

## Test Reporting Requirements:
- Report Type: ${context.options?.reportType || 'Comprehensive test report'}
- Test Results: ${context.options?.testResults || 'All test results'}
- Metrics: ${context.options?.metrics || 'All metrics'}

## Test Reporting Framework:
1. **Executive Summary**: Provide high-level test summary
2. **Test Results**: Detail test execution results
3. **Defect Analysis**: Analyze defects and issues
4. **Quality Metrics**: Present quality metrics and KPIs
5. **Recommendations**: Provide recommendations and next steps
6. **Appendices**: Include detailed test data and evidence

## Output Format:
- Use structured markdown with clear headings
- Include executive summary and key findings
- Provide detailed test results and analysis
- Include defect analysis and quality metrics
- Document recommendations and next steps
- Include supporting data and evidence

Ensure test reports are comprehensive and actionable.`
  }

  private buildQualityMetricsPrompt(context: QAContext): string {
    return `Analyze quality metrics for: ${context.userInput || 'the specified project'}

## Quality Metrics Requirements:
- Project Phase: ${context.options?.projectPhase || 'All phases'}
- Metrics Type: ${context.options?.metricsType || 'All metrics'}
- Analysis Level: ${context.options?.analysisLevel || 'Detailed analysis'}

## Quality Metrics Framework:
1. **Metrics Collection**: Collect quality metrics and data
2. **Metrics Analysis**: Analyze quality metrics and trends
3. **Metrics Reporting**: Report quality metrics and insights
4. **Metrics Improvement**: Recommend metrics improvements
5. **Metrics Monitoring**: Monitor quality metrics over time

## Output Format:
- Use structured markdown with clear headings
- Include quality metrics collection and analysis
- Provide metrics reporting and insights
- Include metrics improvement recommendations
- Document metrics monitoring and trends
- Include quality dashboards and visualizations

Ensure quality metrics analysis is comprehensive and insightful.`
  }

  // Response parsing methods
  private parseTestPlanResponse(response: string): TestPlan {
    return {
      title: 'Test Plan',
      description: response.substring(0, 200) + '...',
      objectives: [],
      scope: {
        included: [],
        excluded: [],
        assumptions: [],
        constraints: [],
        dependencies: [],
        success: []
      },
      strategy: {
        approach: 'black-box',
        levels: [],
        types: [],
        techniques: [],
        tools: [],
        automation: {
          approach: 'partial',
          tools: [],
          framework: this.qaConfig.testFramework,
          coverage: 80,
          maintenance: [],
          benefits: [],
          challenges: []
        }
      },
      testCases: [],
      testData: [],
      environment: {
        name: 'Test Environment',
        type: 'testing',
        description: '',
        hardware: [],
        software: [],
        network: {
          topology: '',
          bandwidth: '',
          latency: '',
          security: [],
          protocols: []
        },
        data: {
          sources: [],
          formats: [],
          volume: '',
          privacy: [],
          backup: []
        },
        access: {
          users: [],
          roles: [],
          permissions: [],
          authentication: [],
          authorization: []
        },
        configuration: []
      },
      schedule: {
        phases: [],
        milestones: [],
        dependencies: [],
        resources: [],
        timeline: '',
        buffer: ''
      },
      resources: {
        team: [],
        tools: [],
        environment: {
          name: 'Test Environment',
          type: 'testing',
          description: '',
          hardware: [],
          software: [],
          network: {
            topology: '',
            bandwidth: '',
            latency: '',
            security: [],
            protocols: []
          },
          data: {
            sources: [],
            formats: [],
            volume: '',
            privacy: [],
            backup: []
          },
          access: {
            users: [],
            roles: [],
            permissions: [],
            authentication: [],
            authorization: []
          },
          configuration: []
        },
        budget: 0,
        external: []
      },
      risks: [],
      deliverables: [],
      metrics: {
        coverage: {
          requirements: 0,
          code: 0,
          functions: 0,
          branches: 0,
          statements: 0,
          paths: 0
        },
        execution: {
          planned: 0,
          executed: 0,
          passed: 0,
          failed: 0,
          blocked: 0,
          skipped: 0,
          progress: 0
        },
        defect: {
          total: 0,
          open: 0,
          closed: 0,
          critical: 0,
          high: 0,
          medium: 0,
          low: 0,
          density: 0
        },
        performance: {
          responseTime: 0,
          throughput: 0,
          resourceUtilization: 0,
          scalability: 0,
          stability: 0
        },
        quality: {
          defectRate: 0,
          escapeRate: 0,
          reworkRate: 0,
          customerSatisfaction: 0,
          processMaturity: 0
        }
      },
      metadata: {
        planType: 'Test Plan',
        timestamp: new Date().toISOString(),
        complexity: 'medium',
        estimatedDuration: '4-6 weeks'
      }
    }
  }

  // Output formatting methods
  private formatTestPlanOutput(plan: TestPlan): string {
    return `# ${plan.title}

## Overview
${plan.description}

## Objectives
${plan.objectives.map(obj => `- ${obj}`).join('\n')}

## Scope
### Included
${plan.scope.included.map(item => `- ${item}`).join('\n')}

### Excluded
${plan.scope.excluded.map(item => `- ${item}`).join('\n')}

## Strategy
- **Approach**: ${plan.strategy.approach}
- **Automation**: ${plan.strategy.automation.approach}
- **Coverage**: ${plan.strategy.automation.coverage}%

## Test Cases
${plan.testCases.map(testCase => `### ${testCase.title}
- **Type**: ${testCase.type}
- **Priority**: ${testCase.priority}
- **Status**: ${testCase.status}
`).join('\n')}

## Environment
- **Name**: ${plan.environment.name}
- **Type**: ${plan.environment.type}

## Schedule
- **Timeline**: ${plan.schedule.timeline}
- **Buffer**: ${plan.schedule.buffer}

## Resources
- **Team Size**: ${plan.resources.team.length} members
- **Budget**: $${plan.resources.budget.toLocaleString()}

## Risks
${plan.risks.map(risk => `### ${risk.title}
- **Probability**: ${risk.probability}
- **Impact**: ${risk.impact}
- **Category**: ${risk.category}
`).join('\n')}

## Deliverables
${plan.deliverables.map(deliverable => `### ${deliverable.name}
- **Type**: ${deliverable.type}
- **Due Date**: ${deliverable.dueDate}
- **Owner**: ${deliverable.owner}
`).join('\n')}

## Metrics
### Coverage
- **Requirements**: ${plan.metrics.coverage.requirements}%
- **Code**: ${plan.metrics.coverage.code}%

### Execution
- **Planned**: ${plan.metrics.execution.planned}
- **Executed**: ${plan.metrics.execution.executed}
- **Passed**: ${plan.metrics.execution.passed}
- **Failed**: ${plan.metrics.execution.failed}

### Defects
- **Total**: ${plan.metrics.defect.total}
- **Open**: ${plan.metrics.defect.open}
- **Closed**: ${plan.metrics.defect.closed}
`
  }

  // Public API methods
  getAvailableCommands(): string[] {
    return Array.from(this.commands.keys())
  }

  getCommandDescription(commandName: string): string | undefined {
    return this.commands.get(commandName)?.description
  }

  updateConfig(newConfig: Partial<QAConfigType>): void {
    this.qaConfig = { ...this.qaConfig, ...newConfig }
  }

  getConfig(): QAConfigType {
    return { ...this.qaConfig }
  }
}
