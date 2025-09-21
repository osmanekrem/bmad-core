import { BaseAgentImpl, AgentContext, AgentResponse } from '@osmanekrem/bmad-core'
import { 
  DevCommand, 
  DevContext, 
  DevResponse, 
  CodeGeneration,
  CodeReview,
  DebuggingSession,
  RefactoringPlan,
  TestingPlan,
  DevConfig as DevConfigType
} from './types/index.js'

export class DevAgent extends BaseAgentImpl {
  private devConfig: DevConfigType
  private commands: Map<string, DevCommand> = new Map()

  constructor(config?: Partial<DevConfigType>) {
    super({
      systemPrompt: `You are the BMad Dev, an AI-driven development and coding specialist. Your role is to:

1. **Code Generation**: Generate high-quality, production-ready code
2. **Code Review**: Review code for quality, security, and best practices
3. **Debugging**: Help identify and fix bugs and issues
4. **Refactoring**: Improve code structure and maintainability
5. **Testing**: Create comprehensive test suites and strategies
6. **Documentation**: Generate clear and comprehensive documentation
7. **Code Optimization**: Optimize code for performance and efficiency

## Core Principles:
- **Quality First**: Generate clean, readable, and maintainable code
- **Security**: Always consider security implications in code
- **Performance**: Write efficient and optimized code
- **Best Practices**: Follow language and framework best practices
- **Testing**: Include comprehensive testing strategies
- **Documentation**: Provide clear and helpful documentation

## Development Framework:
1. **Requirements Analysis**: Understand what needs to be built
2. **Architecture Planning**: Plan the code structure and organization
3. **Implementation**: Write clean, efficient code
4. **Testing**: Create comprehensive test coverage
5. **Review**: Review code for quality and security
6. **Documentation**: Document code and usage
7. **Optimization**: Optimize for performance and maintainability

## Code Quality Standards:
- **Clean Code**: Readable, self-documenting code
- **SOLID Principles**: Single responsibility, open/closed, Liskov substitution, interface segregation, dependency inversion
- **DRY**: Don't Repeat Yourself
- **YAGNI**: You Aren't Gonna Need It
- **KISS**: Keep It Simple, Stupid

## Security Considerations:
- Input validation and sanitization
- Authentication and authorization
- Data encryption and protection
- Secure coding practices
- Vulnerability prevention

## Output Format:
- Use structured markdown with clear headings
- Include code examples with syntax highlighting
- Provide detailed explanations and comments
- Include testing strategies and examples
- Document security considerations
- Provide implementation guidance

Always write production-ready code that follows best practices and is secure, efficient, and maintainable.`
    })

    this.devConfig = {
      defaultOutputFormat: 'markdown',
      codeStyle: 'standard',
      testingFramework: 'jest',
      documentationFormat: 'markdown',
      autoSave: true,
      templates: {
        generation: ['code-generation-tmpl'],
        review: ['code-review-tmpl'],
        debugging: ['debugging-tmpl'],
        testing: ['testing-tmpl']
      },
      ...config
    }

    this.initializeCommands()
  }

  // Implement abstract method from BaseAgentImpl
  async execute(command: string, context: AgentContext): Promise<AgentResponse> {
    // This method is required by BaseAgentImpl but not used in DevAgent
    // We use executeCommand instead
    throw new Error('Use executeCommand method instead of execute')
  }

  private initializeCommands(): void {
    // Code Generation Command
    this.commands.set('generate-code', {
      name: 'generate-code',
      description: 'Generate code based on requirements',
      execute: async (context) => this.executeCodeGeneration(context)
    })

    // Code Review Command
    this.commands.set('review-code', {
      name: 'review-code',
      description: 'Review code for quality and best practices',
      execute: async (context) => this.executeCodeReview(context)
    })

    // Debugging Command
    this.commands.set('debug-code', {
      name: 'debug-code',
      description: 'Help debug code issues and problems',
      execute: async (context) => this.executeDebugging(context)
    })

    // Refactoring Command
    this.commands.set('refactor-code', {
      name: 'refactor-code',
      description: 'Refactor code to improve structure and maintainability',
      execute: async (context) => this.executeRefactoring(context)
    })

    // Testing Command
    this.commands.set('create-tests', {
      name: 'create-tests',
      description: 'Create comprehensive test suites',
      execute: async (context) => this.executeTesting(context)
    })

    // Documentation Command
    this.commands.set('generate-docs', {
      name: 'generate-docs',
      description: 'Generate code documentation',
      execute: async (context) => this.executeDocumentation(context)
    })

    // Code Optimization Command
    this.commands.set('optimize-code', {
      name: 'optimize-code',
      description: 'Optimize code for performance and efficiency',
      execute: async (context) => this.executeOptimization(context)
    })

    // API Development Command
    this.commands.set('create-api', {
      name: 'create-api',
      description: 'Create RESTful API endpoints',
      execute: async (context) => this.executeAPIDevelopment(context)
    })

    // Database Command
    this.commands.set('create-database', {
      name: 'create-database',
      description: 'Create database schemas and migrations',
      execute: async (context) => this.executeDatabaseDevelopment(context)
    })

    // Frontend Command
    this.commands.set('create-frontend', {
      name: 'create-frontend',
      description: 'Create frontend components and pages',
      execute: async (context) => this.executeFrontendDevelopment(context)
    })
  }

  async executeCommand(commandName: string, context: DevContext): Promise<DevResponse> {
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

  private async executeCodeGeneration(context: DevContext): Promise<DevResponse> {
    const prompt = this.buildCodeGenerationPrompt(context)
    const response = await this.callAI(prompt)
    
    const generationResult: CodeGeneration = this.parseCodeGenerationResponse(response)
    
    return {
      success: true,
      data: generationResult,
      output: this.formatCodeGenerationOutput(generationResult),
      metadata: {
        command: 'generate-code',
        timestamp: new Date().toISOString(),
        template: 'code-generation-tmpl'
      }
    }
  }

  private async executeCodeReview(context: DevContext): Promise<DevResponse> {
    const prompt = this.buildCodeReviewPrompt(context)
    const response = await this.callAI(prompt)
    
    const reviewResult: CodeReview = this.parseCodeReviewResponse(response)
    
    return {
      success: true,
      data: reviewResult,
      output: this.formatCodeReviewOutput(reviewResult),
      metadata: {
        command: 'review-code',
        timestamp: new Date().toISOString(),
        template: 'code-review-tmpl'
      }
    }
  }

  private async executeDebugging(context: DevContext): Promise<DevResponse> {
    const prompt = this.buildDebuggingPrompt(context)
    const response = await this.callAI(prompt)
    
    const debuggingResult: DebuggingSession = this.parseDebuggingResponse(response)
    
    return {
      success: true,
      data: debuggingResult,
      output: this.formatDebuggingOutput(debuggingResult),
      metadata: {
        command: 'debug-code',
        timestamp: new Date().toISOString(),
        template: 'debugging-tmpl'
      }
    }
  }

  private async executeRefactoring(context: DevContext): Promise<DevResponse> {
    const prompt = this.buildRefactoringPrompt(context)
    const response = await this.callAI(prompt)
    
    const refactoringResult: RefactoringPlan = this.parseRefactoringResponse(response)
    
    return {
      success: true,
      data: refactoringResult,
      output: this.formatRefactoringOutput(refactoringResult),
      metadata: {
        command: 'refactor-code',
        timestamp: new Date().toISOString(),
        template: 'refactoring-tmpl'
      }
    }
  }

  private async executeTesting(context: DevContext): Promise<DevResponse> {
    const prompt = this.buildTestingPrompt(context)
    const response = await this.callAI(prompt)
    
    const testingResult: TestingPlan = this.parseTestingResponse(response)
    
    return {
      success: true,
      data: testingResult,
      output: this.formatTestingOutput(testingResult),
      metadata: {
        command: 'create-tests',
        timestamp: new Date().toISOString(),
        template: 'testing-tmpl'
      }
    }
  }

  private async executeDocumentation(context: DevContext): Promise<DevResponse> {
    const prompt = this.buildDocumentationPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'generate-docs',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeOptimization(context: DevContext): Promise<DevResponse> {
    const prompt = this.buildOptimizationPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'optimize-code',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeAPIDevelopment(context: DevContext): Promise<DevResponse> {
    const prompt = this.buildAPIDevelopmentPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'create-api',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeDatabaseDevelopment(context: DevContext): Promise<DevResponse> {
    const prompt = this.buildDatabaseDevelopmentPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'create-database',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeFrontendDevelopment(context: DevContext): Promise<DevResponse> {
    const prompt = this.buildFrontendDevelopmentPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'create-frontend',
        timestamp: new Date().toISOString()
      }
    }
  }

  // Prompt building methods
  private buildCodeGenerationPrompt(context: DevContext): string {
    return `Generate high-quality code for: ${context.userInput || 'the specified requirements'}

## Requirements:
- Language: ${context.codeLanguage || 'JavaScript'}
- Framework: ${context.framework || 'None specified'}
- Style: ${this.devConfig.codeStyle}
- Testing: ${this.devConfig.testingFramework}
- Documentation: ${this.devConfig.documentationFormat}

## Code Generation Guidelines:
1. **Clean Code**: Write readable, self-documenting code
2. **Best Practices**: Follow language and framework best practices
3. **Security**: Include security considerations
4. **Performance**: Write efficient and optimized code
5. **Testing**: Include comprehensive test coverage
6. **Documentation**: Provide clear documentation and comments
7. **Error Handling**: Include proper error handling
8. **Validation**: Include input validation and sanitization

## Output Format:
- Provide complete, production-ready code
- Include detailed comments and documentation
- Include test cases and examples
- Include setup and installation instructions
- Include security considerations
- Include performance optimizations

Ensure the code is production-ready and follows all best practices.`
  }

  private buildCodeReviewPrompt(context: DevContext): string {
    return `Review the provided code for quality, security, and best practices:

## Code to Review:
${context.userInput || 'No code provided'}

## Review Criteria:
- **Code Quality**: Readability, maintainability, and structure
- **Security**: Vulnerabilities, security best practices
- **Performance**: Efficiency and optimization opportunities
- **Best Practices**: Language and framework conventions
- **Testing**: Test coverage and quality
- **Documentation**: Code documentation and comments

## Review Framework:
1. **Static Analysis**: Code structure and patterns
2. **Security Review**: Security vulnerabilities and issues
3. **Performance Analysis**: Performance bottlenecks and optimizations
4. **Best Practices**: Adherence to coding standards
5. **Maintainability**: Code organization and readability
6. **Testing**: Test coverage and quality

## Output Format:
- Provide detailed review findings
- Include specific code examples
- Suggest improvements and fixes
- Rate overall code quality
- Provide actionable recommendations

Ensure the review is comprehensive and actionable.`
  }

  private buildDebuggingPrompt(context: DevContext): string {
    return `Help debug the following issue:

## Issue Description:
${context.userInput || 'No issue description provided'}

## Debugging Process:
1. **Issue Analysis**: Understand the problem and symptoms
2. **Root Cause**: Identify the underlying cause
3. **Solution Development**: Develop a fix
4. **Testing**: Verify the solution works
5. **Prevention**: Suggest ways to prevent similar issues

## Debugging Guidelines:
- Ask clarifying questions if needed
- Provide step-by-step debugging process
- Include code examples and explanations
- Suggest testing and verification steps
- Provide prevention strategies

## Output Format:
- Clear problem identification
- Step-by-step debugging process
- Code fixes and explanations
- Testing and verification steps
- Prevention recommendations

Ensure the debugging process is thorough and educational.`
  }

  private buildRefactoringPrompt(context: DevContext): string {
    return `Refactor the following code to improve structure and maintainability:

## Code to Refactor:
${context.userInput || 'No code provided'}

## Refactoring Goals:
- **Improve Readability**: Make code more readable and understandable
- **Reduce Complexity**: Simplify complex code structures
- **Improve Maintainability**: Make code easier to maintain and modify
- **Apply Patterns**: Apply appropriate design patterns
- **Optimize Performance**: Improve code performance where possible
- **Enhance Security**: Improve security aspects

## Refactoring Process:
1. **Analysis**: Analyze current code structure
2. **Planning**: Plan refactoring steps
3. **Implementation**: Apply refactoring changes
4. **Testing**: Ensure functionality is preserved
5. **Documentation**: Update documentation

## Output Format:
- Provide refactored code with explanations
- Include step-by-step refactoring process
- Explain benefits and improvements
- Include testing strategies
- Document changes and rationale

Ensure the refactoring improves code quality while maintaining functionality.`
  }

  private buildTestingPrompt(context: DevContext): string {
    return `Create comprehensive test suite for: ${context.userInput || 'the specified code'}

## Testing Requirements:
- Framework: ${this.devConfig.testingFramework}
- Coverage: Comprehensive test coverage
- Types: Unit, integration, and end-to-end tests
- Quality: High-quality, maintainable tests

## Test Strategy:
1. **Unit Tests**: Test individual functions and components
2. **Integration Tests**: Test component interactions
3. **End-to-End Tests**: Test complete user workflows
4. **Performance Tests**: Test performance characteristics
5. **Security Tests**: Test security aspects

## Test Guidelines:
- Write clear, descriptive test names
- Include setup and teardown
- Test edge cases and error conditions
- Include positive and negative test cases
- Provide test data and fixtures
- Include test documentation

## Output Format:
- Complete test suite with examples
- Test setup and configuration
- Test execution instructions
- Coverage analysis
- Test maintenance guidelines

Ensure the test suite is comprehensive and maintainable.`
  }

  private buildDocumentationPrompt(context: DevContext): string {
    return `Generate comprehensive documentation for: ${context.userInput || 'the specified code'}

## Documentation Requirements:
- Format: ${this.devConfig.documentationFormat}
- Audience: Developers and users
- Scope: Complete API and usage documentation

## Documentation Structure:
1. **Overview**: High-level description and purpose
2. **Installation**: Setup and installation instructions
3. **Usage**: How to use the code/API
4. **API Reference**: Detailed API documentation
5. **Examples**: Code examples and use cases
6. **Configuration**: Configuration options
7. **Troubleshooting**: Common issues and solutions

## Documentation Guidelines:
- Write clear, concise documentation
- Include code examples
- Provide step-by-step instructions
- Include troubleshooting information
- Keep documentation up-to-date
- Use consistent formatting

## Output Format:
- Complete documentation with examples
- Clear structure and organization
- Code examples and snippets
- Installation and setup instructions
- API reference and usage guides

Ensure the documentation is comprehensive and user-friendly.`
  }

  private buildOptimizationPrompt(context: DevContext): string {
    return `Optimize the following code for performance and efficiency:

## Code to Optimize:
${context.userInput || 'No code provided'}

## Optimization Areas:
- **Performance**: Improve execution speed and efficiency
- **Memory**: Reduce memory usage and leaks
- **Scalability**: Improve scalability characteristics
- **Resource Usage**: Optimize resource consumption
- **Algorithm**: Improve algorithmic efficiency

## Optimization Process:
1. **Analysis**: Analyze current performance characteristics
2. **Identification**: Identify optimization opportunities
3. **Implementation**: Apply optimization techniques
4. **Testing**: Verify performance improvements
5. **Documentation**: Document optimization changes

## Output Format:
- Provide optimized code with explanations
- Include performance metrics and improvements
- Explain optimization techniques used
- Include testing and verification steps
- Document trade-offs and considerations

Ensure optimizations improve performance while maintaining code quality.`
  }

  private buildAPIDevelopmentPrompt(context: DevContext): string {
    return `Create RESTful API endpoints for: ${context.userInput || 'the specified requirements'}

## API Requirements:
- Language: ${context.codeLanguage || 'JavaScript'}
- Framework: ${context.framework || 'Express.js'}
- Style: RESTful API design
- Documentation: OpenAPI/Swagger

## API Development Guidelines:
1. **RESTful Design**: Follow REST principles
2. **HTTP Methods**: Use appropriate HTTP methods
3. **Status Codes**: Use correct HTTP status codes
4. **Error Handling**: Implement proper error handling
5. **Validation**: Include request/response validation
6. **Authentication**: Implement security measures
7. **Documentation**: Provide API documentation

## Output Format:
- Complete API implementation
- API documentation and examples
- Error handling and validation
- Security considerations
- Testing strategies

Ensure the API follows best practices and is production-ready.`
  }

  private buildDatabaseDevelopmentPrompt(context: DevContext): string {
    return `Create database schema and migrations for: ${context.userInput || 'the specified requirements'}

## Database Requirements:
- Type: ${context.options?.databaseType || 'PostgreSQL'}
- Language: ${context.codeLanguage || 'SQL'}
- Framework: ${context.framework || 'None specified'}

## Database Development Guidelines:
1. **Schema Design**: Design efficient database schema
2. **Migrations**: Create database migrations
3. **Indexes**: Add appropriate indexes
4. **Constraints**: Implement data constraints
5. **Relationships**: Define proper relationships
6. **Performance**: Optimize for performance
7. **Security**: Implement security measures

## Output Format:
- Complete database schema
- Migration scripts
- Index and constraint definitions
- Performance optimizations
- Security considerations

Ensure the database design is efficient and secure.`
  }

  private buildFrontendDevelopmentPrompt(context: DevContext): string {
    return `Create frontend components and pages for: ${context.userInput || 'the specified requirements'}

## Frontend Requirements:
- Language: ${context.codeLanguage || 'JavaScript'}
- Framework: ${context.framework || 'React'}
- Style: Modern, responsive design

## Frontend Development Guidelines:
1. **Component Design**: Create reusable components
2. **State Management**: Implement proper state management
3. **Styling**: Use modern CSS/styling approaches
4. **Responsiveness**: Ensure mobile-friendly design
5. **Accessibility**: Implement accessibility features
6. **Performance**: Optimize for performance
7. **Testing**: Include component testing

## Output Format:
- Complete component implementation
- Styling and responsive design
- State management setup
- Testing strategies
- Documentation and examples

Ensure the frontend is modern, responsive, and accessible.`
  }

  // Response parsing methods
  private parseCodeGenerationResponse(response: string): CodeGeneration {
    return {
      title: 'Code Generation',
      description: response.substring(0, 200) + '...',
      language: 'JavaScript',
      code: response,
      files: [],
      dependencies: [],
      instructions: [],
      testing: {
        framework: this.devConfig.testingFramework,
        testFiles: [],
        coverage: '80%',
        instructions: [],
        commands: []
      },
      documentation: {
        format: this.devConfig.documentationFormat,
        files: [],
        instructions: [],
        examples: []
      },
      metadata: {
        generationType: 'Code Generation',
        timestamp: new Date().toISOString(),
        complexity: 'medium',
        estimatedTime: '2-4 hours'
      }
    }
  }

  private parseCodeReviewResponse(response: string): CodeReview {
    return {
      title: 'Code Review',
      summary: response.substring(0, 200) + '...',
      issues: [],
      suggestions: [],
      improvements: [],
      security: [],
      performance: [],
      bestPractices: [],
      overallScore: 8.5,
      metadata: {
        reviewType: 'Code Review',
        timestamp: new Date().toISOString(),
        language: 'JavaScript',
        linesOfCode: 0
      }
    }
  }

  private parseDebuggingResponse(response: string): DebuggingSession {
    return {
      title: 'Debugging Session',
      description: response.substring(0, 200) + '...',
      issue: {
        title: 'Debug Issue',
        description: 'Issue description',
        symptoms: [],
        errorMessages: [],
        environment: 'Development',
        reproduction: [],
        severity: 'medium'
      },
      steps: [],
      solution: {
        title: 'Solution',
        description: 'Solution description',
        rootCause: 'Root cause',
        fix: 'Fix description',
        code: 'Fixed code',
        explanation: 'Explanation',
        testing: [],
        verification: []
      },
      prevention: [],
      metadata: {
        sessionType: 'Debugging',
        timestamp: new Date().toISOString(),
        language: 'JavaScript',
        complexity: 'medium'
      }
    }
  }

  private parseRefactoringResponse(response: string): RefactoringPlan {
    return {
      title: 'Refactoring Plan',
      description: response.substring(0, 200) + '...',
      currentCode: 'Current code',
      refactoredCode: 'Refactored code',
      steps: [],
      benefits: [],
      risks: [],
      testing: [],
      metadata: {
        refactoringType: 'Refactoring',
        timestamp: new Date().toISOString(),
        language: 'JavaScript',
        complexity: 'medium'
      }
    }
  }

  private parseTestingResponse(response: string): TestingPlan {
    return {
      title: 'Testing Plan',
      description: response.substring(0, 200) + '...',
      testTypes: [],
      testCases: [],
      framework: this.devConfig.testingFramework,
      setup: [],
      execution: [],
      coverage: {
        overall: 80,
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      },
      metadata: {
        planType: 'Testing',
        timestamp: new Date().toISOString(),
        language: 'JavaScript',
        complexity: 'medium'
      }
    }
  }

  // Output formatting methods
  private formatCodeGenerationOutput(generation: CodeGeneration): string {
    return `# ${generation.title}

## Description
${generation.description}

## Language
${generation.language}

## Code
\`\`\`${generation.language}
${generation.code}
\`\`\`

## Dependencies
${generation.dependencies.map(dep => `- ${dep.name}@${dep.version}`).join('\n')}

## Testing
- **Framework**: ${generation.testing.framework}
- **Coverage**: ${generation.testing.coverage}

## Instructions
${generation.instructions.map(inst => `- ${inst}`).join('\n')}
`
  }

  private formatCodeReviewOutput(review: CodeReview): string {
    return `# ${review.title}

## Summary
${review.summary}

## Overall Score
${review.overallScore}/10

## Issues
${review.issues.map(issue => `### ${issue.title}
- **Type**: ${issue.type}
- **Severity**: ${issue.severity}
- **Description**: ${issue.description}
- **Suggestion**: ${issue.suggestion}
`).join('\n')}

## Suggestions
${review.suggestions.map(suggestion => `### ${suggestion.title}
- **Category**: ${suggestion.category}
- **Priority**: ${suggestion.priority}
- **Description**: ${suggestion.description}
`).join('\n')}
`
  }

  private formatDebuggingOutput(debugging: DebuggingSession): string {
    return `# ${debugging.title}

## Description
${debugging.description}

## Issue
### ${debugging.issue.title}
- **Description**: ${debugging.issue.description}
- **Severity**: ${debugging.issue.severity}
- **Environment**: ${debugging.issue.environment}

## Solution
### ${debugging.solution.title}
- **Root Cause**: ${debugging.solution.rootCause}
- **Fix**: ${debugging.solution.fix}
- **Explanation**: ${debugging.solution.explanation}

## Prevention
${debugging.prevention.map(prev => `- ${prev}`).join('\n')}
`
  }

  private formatRefactoringOutput(refactoring: RefactoringPlan): string {
    return `# ${refactoring.title}

## Description
${refactoring.description}

## Benefits
${refactoring.benefits.map(benefit => `- ${benefit}`).join('\n')}

## Risks
${refactoring.risks.map(risk => `- ${risk}`).join('\n')}

## Testing
${refactoring.testing.map(test => `- ${test}`).join('\n')}
`
  }

  private formatTestingOutput(testing: TestingPlan): string {
    return `# ${testing.title}

## Description
${testing.description}

## Framework
${testing.framework}

## Coverage Target
- **Overall**: ${testing.coverage.overall}%
- **Lines**: ${testing.coverage.lines}%
- **Functions**: ${testing.coverage.functions}%
- **Branches**: ${testing.coverage.branches}%
- **Statements**: ${testing.coverage.statements}%

## Setup
${testing.setup.map(step => `- ${step}`).join('\n')}

## Execution
${testing.execution.map(step => `- ${step}`).join('\n')}
`
  }

  // Public API methods
  getAvailableCommands(): string[] {
    return Array.from(this.commands.keys())
  }

  getCommandDescription(commandName: string): string | undefined {
    return this.commands.get(commandName)?.description
  }

  updateConfig(newConfig: Partial<DevConfigType>): void {
    this.devConfig = { ...this.devConfig, ...newConfig }
  }

  getConfig(): DevConfigType {
    return { ...this.devConfig }
  }
}
