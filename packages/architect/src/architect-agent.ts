import { BaseAgentImpl, AgentContext, AgentResponse } from '@osmanekrem/bmad-core'
import { 
  ArchitectCommand, 
  ArchitectContext, 
  ArchitectResponse, 
  ArchitectureDesign,
  SystemAnalysis,
  ArchitectConfig as ArchitectConfigType
} from './types/index.js'

export class ArchitectAgent extends BaseAgentImpl {
  private architectConfig: ArchitectConfigType
  private commands: Map<string, ArchitectCommand> = new Map()

  constructor(config?: Partial<ArchitectConfigType>) {
    super({
      systemPrompt: `You are the BMad Architect, an AI-driven system architecture and design specialist. Your role is to:

1. **System Design**: Create comprehensive system architectures and designs
2. **Technology Selection**: Recommend appropriate technologies and tools
3. **Pattern Analysis**: Identify and apply design patterns effectively
4. **Scalability Planning**: Design for scale and performance
5. **Security Architecture**: Design secure and compliant systems
6. **Migration Planning**: Plan system migrations and modernizations

## Core Principles:
- **Scalability First**: Design systems that can grow with demand
- **Security by Design**: Integrate security from the ground up
- **Maintainability**: Create systems that are easy to maintain and evolve
- **Performance**: Optimize for speed and efficiency
- **Simplicity**: Prefer simple solutions over complex ones
- **Documentation**: Provide clear, comprehensive documentation

## Architecture Framework:
1. **Requirements Analysis**: Understand business and technical requirements
2. **System Decomposition**: Break down complex systems into manageable components
3. **Technology Selection**: Choose appropriate technologies and tools
4. **Pattern Application**: Apply proven design patterns
5. **Scalability Design**: Plan for growth and performance
6. **Security Integration**: Design security into the architecture
7. **Documentation**: Create comprehensive architecture documentation

## Design Patterns:
- **Creational**: Factory, Builder, Singleton, Prototype
- **Structural**: Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy
- **Behavioral**: Observer, Strategy, Command, State, Template Method, Visitor
- **Architectural**: MVC, MVP, MVVM, Microservices, Event-Driven, CQRS, SAGA

## Output Format:
- Use structured markdown with clear headings
- Include architecture diagrams (Mermaid format)
- Provide detailed component specifications
- Include technology recommendations with rationale
- Document security and scalability considerations
- Provide implementation roadmap and next steps

Always consider trade-offs, provide multiple options when appropriate, and ensure designs are practical and implementable.`
    })

    this.architectConfig = {
      defaultOutputFormat: 'markdown',
      designComplexity: 'moderate',
      includeDiagrams: true,
      autoSave: true,
      templates: {
        architecture: ['architecture-tmpl', 'fullstack-architecture-tmpl'],
        analysis: ['architecture-tmpl'],
        design: ['architecture-tmpl'],
        migration: ['architecture-tmpl']
      },
      ...config
    }

    this.initializeCommands()
  }

  // Implement abstract method from BaseAgentImpl
  async execute(command: string, context: AgentContext): Promise<AgentResponse> {
    // This method is required by BaseAgentImpl but not used in ArchitectAgent
    // We use executeCommand instead
    throw new Error('Use executeCommand method instead of execute')
  }

  private initializeCommands(): void {
    // System Design Command
    this.commands.set('system-design', {
      name: 'system-design',
      description: 'Design comprehensive system architecture',
      execute: async (context) => this.executeSystemDesign(context)
    })

    // Architecture Analysis Command
    this.commands.set('architecture-analysis', {
      name: 'architecture-analysis',
      description: 'Analyze existing system architecture',
      execute: async (context) => this.executeArchitectureAnalysis(context)
    })

    // Technology Selection Command
    this.commands.set('technology-selection', {
      name: 'technology-selection',
      description: 'Recommend technologies and tools',
      execute: async (context) => this.executeTechnologySelection(context)
    })

    // Design Pattern Analysis Command
    this.commands.set('pattern-analysis', {
      name: 'pattern-analysis',
      description: 'Analyze and recommend design patterns',
      execute: async (context) => this.executePatternAnalysis(context)
    })

    // Scalability Planning Command
    this.commands.set('scalability-planning', {
      name: 'scalability-planning',
      description: 'Plan system scalability and performance',
      execute: async (context) => this.executeScalabilityPlanning(context)
    })

    // Security Architecture Command
    this.commands.set('security-architecture', {
      name: 'security-architecture',
      description: 'Design security architecture and controls',
      execute: async (context) => this.executeSecurityArchitecture(context)
    })

    // Migration Planning Command
    this.commands.set('migration-planning', {
      name: 'migration-planning',
      description: 'Plan system migration and modernization',
      execute: async (context) => this.executeMigrationPlanning(context)
    })

    // Microservices Design Command
    this.commands.set('microservices-design', {
      name: 'microservices-design',
      description: 'Design microservices architecture',
      execute: async (context) => this.executeMicroservicesDesign(context)
    })

    // API Design Command
    this.commands.set('api-design', {
      name: 'api-design',
      description: 'Design API architecture and specifications',
      execute: async (context) => this.executeAPIDesign(context)
    })
  }

  async executeCommand(commandName: string, context: ArchitectContext): Promise<ArchitectResponse> {
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

  private async executeSystemDesign(context: ArchitectContext): Promise<ArchitectResponse> {
    const prompt = this.buildSystemDesignPrompt(context)
    const response = await this.callAI(prompt)
    
    const designResult: ArchitectureDesign = this.parseArchitectureDesignResponse(response)
    
    return {
      success: true,
      data: designResult,
      output: this.formatArchitectureDesignOutput(designResult),
      metadata: {
        command: 'system-design',
        timestamp: new Date().toISOString(),
        template: 'architecture-tmpl'
      }
    }
  }

  private async executeArchitectureAnalysis(context: ArchitectContext): Promise<ArchitectResponse> {
    const prompt = this.buildArchitectureAnalysisPrompt(context)
    const response = await this.callAI(prompt)
    
    const analysisResult: SystemAnalysis = this.parseSystemAnalysisResponse(response)
    
    return {
      success: true,
      data: analysisResult,
      output: this.formatSystemAnalysisOutput(analysisResult),
      metadata: {
        command: 'architecture-analysis',
        timestamp: new Date().toISOString(),
        template: 'architecture-tmpl'
      }
    }
  }

  private async executeTechnologySelection(context: ArchitectContext): Promise<ArchitectResponse> {
    const prompt = this.buildTechnologySelectionPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'technology-selection',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executePatternAnalysis(context: ArchitectContext): Promise<ArchitectResponse> {
    const prompt = this.buildPatternAnalysisPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'pattern-analysis',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeScalabilityPlanning(context: ArchitectContext): Promise<ArchitectResponse> {
    const prompt = this.buildScalabilityPlanningPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'scalability-planning',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeSecurityArchitecture(context: ArchitectContext): Promise<ArchitectResponse> {
    const prompt = this.buildSecurityArchitecturePrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'security-architecture',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeMigrationPlanning(context: ArchitectContext): Promise<ArchitectResponse> {
    const prompt = this.buildMigrationPlanningPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'migration-planning',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeMicroservicesDesign(context: ArchitectContext): Promise<ArchitectResponse> {
    const prompt = this.buildMicroservicesDesignPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'microservices-design',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeAPIDesign(context: ArchitectContext): Promise<ArchitectResponse> {
    const prompt = this.buildAPIDesignPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'api-design',
        timestamp: new Date().toISOString()
      }
    }
  }

  // Prompt building methods
  private buildSystemDesignPrompt(context: ArchitectContext): string {
    return `Design a comprehensive system architecture for: ${context.userInput || 'the specified system'}

## Design Requirements:
- System Type: ${context.options?.systemType || 'Web Application'}
- Scale: ${context.options?.scale || 'Medium (1K-10K users)'}
- Complexity: ${this.architectConfig.designComplexity}
- Include Diagrams: ${this.architectConfig.includeDiagrams}

## Architecture Components:
1. **System Overview**: High-level architecture and key components
2. **Component Design**: Detailed component specifications
3. **Technology Stack**: Recommended technologies and tools
4. **Design Patterns**: Applied patterns and their rationale
5. **Infrastructure**: Infrastructure requirements and specifications
6. **Security**: Security architecture and controls
7. **Scalability**: Scalability plan and performance considerations
8. **Implementation**: Implementation roadmap and next steps

## Output Format:
- Use structured markdown with clear headings
- Include Mermaid diagrams for architecture visualization
- Provide detailed component specifications
- Include technology recommendations with rationale
- Document security and scalability considerations
- Provide implementation timeline and milestones

Ensure the design is practical, scalable, secure, and maintainable.`
  }

  private buildArchitectureAnalysisPrompt(context: ArchitectContext): string {
    return `Analyze the existing system architecture for: ${context.userInput || 'the specified system'}

## Analysis Scope:
- Current Architecture: ${context.options?.currentArchitecture || 'To be analyzed'}
- Analysis Depth: ${this.architectConfig.designComplexity}
- Focus Areas: ${context.options?.focusAreas?.join(', ') || 'General architecture analysis'}

## Analysis Framework:
1. **Current State Assessment**: Evaluate existing architecture
2. **Issue Identification**: Identify problems and bottlenecks
3. **Opportunity Analysis**: Find improvement opportunities
4. **Recommendations**: Provide specific recommendations
5. **Migration Planning**: Plan for architecture improvements
6. **Risk Assessment**: Identify risks and mitigation strategies

## Output Format:
- Use structured markdown with clear headings
- Include current state analysis
- Identify specific issues with severity levels
- Provide actionable recommendations
- Include migration plan with timeline
- Document risks and mitigation strategies

Provide detailed, actionable analysis that helps improve the system architecture.`
  }

  private buildTechnologySelectionPrompt(context: ArchitectContext): string {
    return `Recommend appropriate technologies and tools for: ${context.userInput || 'the specified project'}

## Selection Criteria:
- Project Type: ${context.options?.projectType || 'Web Application'}
- Scale: ${context.options?.scale || 'Medium'}
- Team Size: ${context.options?.teamSize || '5-10 developers'}
- Budget: ${context.options?.budget || 'Medium'}
- Timeline: ${context.options?.timeline || '6-12 months'}

## Technology Categories:
1. **Frontend**: UI frameworks, libraries, and tools
2. **Backend**: Server technologies, frameworks, and languages
3. **Database**: Data storage and management solutions
4. **Infrastructure**: Cloud platforms, containers, and orchestration
5. **Monitoring**: Observability and monitoring tools
6. **Security**: Security tools and frameworks
7. **DevOps**: CI/CD, deployment, and automation tools

## Output Format:
- Provide technology recommendations with rationale
- Include pros and cons for each recommendation
- Suggest alternatives and trade-offs
- Include learning curve and team considerations
- Provide implementation guidance
- Include cost and licensing considerations

Ensure recommendations are practical and suitable for the project requirements.`
  }

  private buildPatternAnalysisPrompt(context: ArchitectContext): string {
    return `Analyze and recommend design patterns for: ${context.userInput || 'the specified system'}

## Pattern Categories:
- **Creational Patterns**: Factory, Builder, Singleton, Prototype
- **Structural Patterns**: Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy
- **Behavioral Patterns**: Observer, Strategy, Command, State, Template Method, Visitor
- **Architectural Patterns**: MVC, MVP, MVVM, Microservices, Event-Driven, CQRS, SAGA

## Analysis Requirements:
- System Type: ${context.options?.systemType || 'Web Application'}
- Complexity: ${this.architectConfig.designComplexity}
- Focus Areas: ${context.options?.focusAreas?.join(', ') || 'General pattern analysis'}

## Output Format:
- Identify applicable patterns for the system
- Explain pattern benefits and trade-offs
- Provide implementation examples
- Include code snippets where appropriate
- Document pattern interactions
- Provide migration guidance for existing code

Ensure patterns are appropriate for the system complexity and requirements.`
  }

  private buildScalabilityPlanningPrompt(context: ArchitectContext): string {
    return `Plan system scalability and performance for: ${context.userInput || 'the specified system'}

## Scalability Requirements:
- Current Load: ${context.options?.currentLoad || '1K users'}
- Target Load: ${context.options?.targetLoad || '100K users'}
- Growth Rate: ${context.options?.growthRate || '10x in 2 years'}
- Performance Goals: ${context.options?.performanceGoals || 'Sub-second response times'}

## Planning Areas:
1. **Horizontal Scaling**: Load balancing and distributed systems
2. **Vertical Scaling**: Resource optimization and capacity planning
3. **Database Scaling**: Data partitioning and replication strategies
4. **Caching Strategy**: Multi-level caching implementation
5. **CDN and Edge**: Content delivery and edge computing
6. **Auto-scaling**: Dynamic resource allocation
7. **Performance Monitoring**: Metrics and alerting

## Output Format:
- Provide comprehensive scalability plan
- Include performance benchmarks and targets
- Document scaling strategies and techniques
- Include monitoring and alerting setup
- Provide implementation timeline
- Include cost considerations and optimization

Ensure the plan is realistic and achievable within the given constraints.`
  }

  private buildSecurityArchitecturePrompt(context: ArchitectContext): string {
    return `Design security architecture and controls for: ${context.userInput || 'the specified system'}

## Security Requirements:
- Compliance: ${context.options?.compliance || 'General security best practices'}
- Data Sensitivity: ${context.options?.dataSensitivity || 'Medium'}
- Threat Level: ${context.options?.threatLevel || 'Medium'}
- User Types: ${context.options?.userTypes || 'Internal and external users'}

## Security Areas:
1. **Authentication**: User identity verification
2. **Authorization**: Access control and permissions
3. **Data Protection**: Encryption and data security
4. **Network Security**: Network-level protections
5. **Application Security**: Code and application-level security
6. **Infrastructure Security**: Server and infrastructure security
7. **Monitoring**: Security monitoring and incident response

## Output Format:
- Provide comprehensive security architecture
- Include specific security controls and implementations
- Document compliance requirements
- Include threat modeling and risk assessment
- Provide security testing and validation plan
- Include incident response procedures

Ensure security is integrated throughout the system architecture.`
  }

  private buildMigrationPlanningPrompt(context: ArchitectContext): string {
    return `Plan system migration and modernization for: ${context.userInput || 'the specified system'}

## Migration Context:
- Current System: ${context.options?.currentSystem || 'Legacy system'}
- Target System: ${context.options?.targetSystem || 'Modern architecture'}
- Migration Type: ${context.options?.migrationType || 'Gradual migration'}
- Timeline: ${context.options?.timeline || '6-12 months'}

## Migration Strategy:
1. **Assessment**: Current system analysis and inventory
2. **Strategy Selection**: Migration approach and methodology
3. **Phase Planning**: Detailed migration phases and milestones
4. **Risk Management**: Risk identification and mitigation
5. **Testing Strategy**: Validation and testing approach
6. **Rollback Plan**: Contingency and rollback procedures
7. **Success Metrics**: Migration success criteria

## Output Format:
- Provide detailed migration plan
- Include phase-by-phase breakdown
- Document risks and mitigation strategies
- Include testing and validation procedures
- Provide timeline and resource requirements
- Include success metrics and monitoring

Ensure the migration plan is practical and minimizes business disruption.`
  }

  private buildMicroservicesDesignPrompt(context: ArchitectContext): string {
    return `Design microservices architecture for: ${context.userInput || 'the specified system'}

## Microservices Requirements:
- System Type: ${context.options?.systemType || 'Web Application'}
- Service Count: ${context.options?.serviceCount || '5-15 services'}
- Team Structure: ${context.options?.teamStructure || 'Multiple teams'}
- Data Strategy: ${context.options?.dataStrategy || 'Database per service'}

## Design Areas:
1. **Service Decomposition**: Service boundaries and responsibilities
2. **Communication**: Inter-service communication patterns
3. **Data Management**: Data consistency and transaction handling
4. **Service Discovery**: Service registration and discovery
5. **API Gateway**: External API management
6. **Monitoring**: Distributed system observability
7. **Deployment**: Containerization and orchestration

## Output Format:
- Provide detailed microservices architecture
- Include service specifications and interfaces
- Document communication patterns and protocols
- Include data management strategies
- Provide deployment and operational guidance
- Include monitoring and troubleshooting procedures

Ensure the design follows microservices best practices and principles.`
  }

  private buildAPIDesignPrompt(context: ArchitectContext): string {
    return `Design API architecture and specifications for: ${context.userInput || 'the specified system'}

## API Requirements:
- API Type: ${context.options?.apiType || 'REST API'}
- Target Users: ${context.options?.targetUsers || 'Internal and external developers'}
- Data Format: ${context.options?.dataFormat || 'JSON'}
- Authentication: ${context.options?.authentication || 'OAuth 2.0'}

## Design Areas:
1. **API Architecture**: Overall API structure and organization
2. **Endpoint Design**: Resource modeling and endpoint specifications
3. **Authentication**: Security and access control
4. **Rate Limiting**: Throttling and usage management
5. **Documentation**: API documentation and developer experience
6. **Versioning**: API versioning strategy
7. **Monitoring**: API monitoring and analytics

## Output Format:
- Provide comprehensive API design
- Include detailed endpoint specifications
- Document authentication and authorization
- Include API documentation structure
- Provide implementation guidance
- Include testing and validation procedures

Ensure the API design follows RESTful principles and best practices.`
  }

  // Response parsing methods
  private parseArchitectureDesignResponse(response: string): ArchitectureDesign {
    // Parse AI response into structured ArchitectureDesign object
    return {
      title: 'System Architecture Design',
      description: response.substring(0, 200) + '...',
      type: 'microservices',
      components: [],
      patterns: [],
      technologies: [],
      infrastructure: [],
      security: [],
      scalability: {
        current: { users: '1K', requests: '1K/min', data: '1GB', storage: '10GB', performance: '100ms' },
        target: { users: '100K', requests: '100K/min', data: '1TB', storage: '100GB', performance: '50ms' },
        strategy: [],
        bottlenecks: [],
        solutions: [],
        timeline: '6 months'
      },
      performance: [],
      recommendations: [],
      nextSteps: [],
      metadata: {
        designType: 'System Architecture',
        timestamp: new Date().toISOString(),
        complexity: 'medium',
        estimatedEffort: '3-6 months'
      }
    }
  }

  private parseSystemAnalysisResponse(response: string): SystemAnalysis {
    // Parse AI response into structured SystemAnalysis object
    return {
      title: 'System Architecture Analysis',
      summary: response.substring(0, 200) + '...',
      currentState: {
        architecture: 'Monolithic',
        technologies: [],
        performance: {},
        scalability: {},
        security: {},
        maintainability: {}
      },
      issues: [],
      opportunities: [],
      recommendations: [],
      migration: {
        strategy: 'gradual',
        phases: [],
        timeline: '6-12 months',
        risks: [],
        rollback: [],
        success: []
      },
      metadata: {
        analysisType: 'Architecture Analysis',
        timestamp: new Date().toISOString(),
        complexity: 'medium'
      }
    }
  }

  // Output formatting methods
  private formatArchitectureDesignOutput(design: ArchitectureDesign): string {
    return `# ${design.title}

## Overview
${design.description}

## Architecture Type
${design.type}

## Components
${design.components.map(comp => `### ${comp.name}
- **Type**: ${comp.type}
- **Description**: ${comp.description}
- **Responsibilities**: ${comp.responsibilities.join(', ')}
- **Technologies**: ${comp.technologies.join(', ')}
`).join('\n')}

## Design Patterns
${design.patterns.map(pattern => `### ${pattern.name}
- **Category**: ${pattern.category}
- **Description**: ${pattern.description}
- **Benefits**: ${pattern.benefits.join(', ')}
`).join('\n')}

## Technologies
${design.technologies.map(tech => `### ${tech.name}
- **Category**: ${tech.category}
- **Description**: ${tech.description}
- **Pros**: ${tech.pros.join(', ')}
- **Cons**: ${tech.cons.join(', ')}
`).join('\n')}

## Scalability Plan
- **Current**: ${design.scalability.current.users} users, ${design.scalability.current.requests} requests/min
- **Target**: ${design.scalability.target.users} users, ${design.scalability.target.requests} requests/min
- **Timeline**: ${design.scalability.timeline}

## Recommendations
${design.recommendations.map(rec => `- ${rec}`).join('\n')}

## Next Steps
${design.nextSteps.map(step => `- ${step}`).join('\n')}
`
  }

  private formatSystemAnalysisOutput(analysis: SystemAnalysis): string {
    return `# ${analysis.title}

## Summary
${analysis.summary}

## Current State
- **Architecture**: ${analysis.currentState.architecture}
- **Technologies**: ${analysis.currentState.technologies.join(', ')}

## Issues
${analysis.issues.map(issue => `### ${issue.title}
- **Category**: ${issue.category}
- **Severity**: ${issue.severity}
- **Impact**: ${issue.impact}
- **Solution**: ${issue.solution}
`).join('\n')}

## Opportunities
${analysis.opportunities.map(opp => `### ${opp.title}
- **Benefit**: ${opp.benefit}
- **Effort**: ${opp.effort}
- **Impact**: ${opp.impact}
- **Timeline**: ${opp.timeline}
`).join('\n')}

## Recommendations
${analysis.recommendations.map(rec => `### ${rec.title}
- **Category**: ${rec.category}
- **Priority**: ${rec.priority}
- **Effort**: ${rec.effort}
- **Timeline**: ${rec.timeline}
`).join('\n')}

## Migration Plan
- **Strategy**: ${analysis.migration.strategy}
- **Timeline**: ${analysis.migration.timeline}
`
  }

  // Public API methods
  getAvailableCommands(): string[] {
    return Array.from(this.commands.keys())
  }

  getCommandDescription(commandName: string): string | undefined {
    return this.commands.get(commandName)?.description
  }

  updateConfig(newConfig: Partial<ArchitectConfigType>): void {
    this.architectConfig = { ...this.architectConfig, ...newConfig }
  }

  getConfig(): ArchitectConfigType {
    return { ...this.architectConfig }
  }
}
