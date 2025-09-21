import { BaseAgentImpl, AgentContext, AgentResponse } from 'bmad-core'
import { 
  OrchestratorCommand, 
  OrchestratorContext, 
  OrchestratorResponse, 
  WorkflowCoordination,
  ProjectCoordination,
  OrchestratorConfig as OrchestratorConfigType
} from './types/index.js'

export class OrchestratorAgent extends BaseAgentImpl {
  private orchestratorConfig: OrchestratorConfigType
  private commands: Map<string, OrchestratorCommand> = new Map()

  constructor(config?: Partial<OrchestratorConfigType>) {
    super({
      systemPrompt: `You are the BMad Orchestrator, an AI-driven project coordination and workflow management specialist. Your role is to:

1. **Workflow Coordination**: Design and coordinate complex project workflows
2. **Project Coordination**: Coordinate multiple projects and programs
3. **Resource Coordination**: Coordinate resource allocation across projects
4. **Stakeholder Coordination**: Coordinate stakeholder engagement and communication
5. **Quality Coordination**: Coordinate quality assurance and compliance
6. **Risk Coordination**: Coordinate risk management across projects
7. **Communication Coordination**: Coordinate communication and reporting
8. **Governance Coordination**: Coordinate governance and compliance
9. **Change Coordination**: Coordinate change management processes
10. **Performance Coordination**: Coordinate performance monitoring and reporting

## Core Principles:
- **Coordination Excellence**: Ensure seamless coordination across all project elements
- **Workflow Optimization**: Design and optimize efficient workflows
- **Stakeholder Alignment**: Align all stakeholders towards common goals
- **Resource Efficiency**: Optimize resource utilization across projects
- **Quality Focus**: Maintain high quality standards throughout
- **Risk Awareness**: Proactively coordinate risk management
- **Communication Clarity**: Ensure clear and effective communication
- **Continuous Improvement**: Continuously improve coordination processes

## Orchestrator Capabilities:
1. **Workflow Coordination**: Design and coordinate complex project workflows
2. **Project Coordination**: Coordinate multiple projects and programs
3. **Resource Coordination**: Coordinate resource allocation across projects
4. **Stakeholder Coordination**: Coordinate stakeholder engagement and communication
5. **Quality Coordination**: Coordinate quality assurance and compliance
6. **Risk Coordination**: Coordinate risk management across projects
7. **Communication Coordination**: Coordinate communication and reporting
8. **Governance Coordination**: Coordinate governance and compliance
9. **Change Coordination**: Coordinate change management processes
10. **Performance Coordination**: Coordinate performance monitoring and reporting

## Workflow Coordination Framework:
1. **Workflow Design**: Design efficient and effective workflows
2. **Dependency Management**: Manage workflow dependencies and critical path
3. **Resource Allocation**: Allocate resources optimally across workflows
4. **Quality Gates**: Establish quality gates and checkpoints
5. **Monitoring**: Monitor workflow performance and progress
6. **Optimization**: Continuously optimize workflow efficiency
7. **Communication**: Facilitate workflow communication
8. **Learning**: Capture and share workflow lessons learned

## Project Coordination Framework:
1. **Project Alignment**: Align projects with strategic objectives
2. **Dependency Management**: Manage inter-project dependencies
3. **Resource Sharing**: Optimize resource sharing across projects
4. **Stakeholder Management**: Coordinate stakeholder engagement
5. **Quality Standards**: Maintain consistent quality standards
6. **Risk Management**: Coordinate risk management across projects
7. **Communication**: Facilitate inter-project communication
8. **Performance**: Monitor and report project performance

## Output Format:
- Use structured markdown with clear headings
- Include workflow diagrams and process maps
- Provide dependency analysis and critical path
- Include resource allocation and utilization plans
- Document quality gates and checkpoints
- Include communication and coordination plans
- Provide monitoring and reporting mechanisms
- Include optimization and improvement recommendations

Always focus on coordination excellence, workflow optimization, and stakeholder alignment.`
    })

    this.orchestratorConfig = {
      defaultOutputFormat: 'markdown',
      projectType: 'software-development',
      teamSize: 'medium',
      complexity: 'medium',
      timeline: '6 months',
      budget: 'To be determined',
      workflowType: 'hybrid',
      coordinationLevel: 'project',
      methodology: 'agile',
      tools: ['jira', 'confluence', 'slack', 'zoom', 'monday'],
      autoSave: true,
      templates: {
        coordination: ['project-coordination-tmpl'],
        workflow: ['workflow-coordination-tmpl'],
        communication: ['communication-coordination-tmpl'],
        governance: ['governance-coordination-tmpl']
      },
      ...config
    }

    this.initializeCommands()
  }

  // Implement abstract method from BaseAgentImpl
  async execute(command: string, context: AgentContext): Promise<AgentResponse> {
    // This method is required by BaseAgentImpl but not used in OrchestratorAgent
    // We use executeCommand instead
    throw new Error('Use executeCommand method instead of execute')
  }

  private initializeCommands(): void {
    // Workflow Coordination Command
    this.commands.set('coordinate-workflow', {
      name: 'coordinate-workflow',
      description: 'Design and coordinate complex project workflows',
      execute: async (context) => this.executeWorkflowCoordination(context)
    })

    // Project Coordination Command
    this.commands.set('coordinate-projects', {
      name: 'coordinate-projects',
      description: 'Coordinate multiple projects and programs',
      execute: async (context) => this.executeProjectCoordination(context)
    })

    // Resource Coordination Command
    this.commands.set('coordinate-resources', {
      name: 'coordinate-resources',
      description: 'Coordinate resource allocation across projects',
      execute: async (context) => this.executeResourceCoordination(context)
    })

    // Stakeholder Coordination Command
    this.commands.set('coordinate-stakeholders', {
      name: 'coordinate-stakeholders',
      description: 'Coordinate stakeholder engagement and communication',
      execute: async (context) => this.executeStakeholderCoordination(context)
    })

    // Quality Coordination Command
    this.commands.set('coordinate-quality', {
      name: 'coordinate-quality',
      description: 'Coordinate quality assurance and compliance',
      execute: async (context) => this.executeQualityCoordination(context)
    })

    // Risk Coordination Command
    this.commands.set('coordinate-risks', {
      name: 'coordinate-risks',
      description: 'Coordinate risk management across projects',
      execute: async (context) => this.executeRiskCoordination(context)
    })

    // Communication Coordination Command
    this.commands.set('coordinate-communication', {
      name: 'coordinate-communication',
      description: 'Coordinate communication and reporting',
      execute: async (context) => this.executeCommunicationCoordination(context)
    })

    // Governance Coordination Command
    this.commands.set('coordinate-governance', {
      name: 'coordinate-governance',
      description: 'Coordinate governance and compliance',
      execute: async (context) => this.executeGovernanceCoordination(context)
    })

    // Change Coordination Command
    this.commands.set('coordinate-change', {
      name: 'coordinate-change',
      description: 'Coordinate change management processes',
      execute: async (context) => this.executeChangeCoordination(context)
    })

    // Performance Coordination Command
    this.commands.set('coordinate-performance', {
      name: 'coordinate-performance',
      description: 'Coordinate performance monitoring and reporting',
      execute: async (context) => this.executePerformanceCoordination(context)
    })
  }

  async executeCommand(commandName: string, context: OrchestratorContext): Promise<OrchestratorResponse> {
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

  private async executeWorkflowCoordination(context: OrchestratorContext): Promise<OrchestratorResponse> {
    const prompt = this.buildWorkflowCoordinationPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'coordinate-workflow',
        timestamp: new Date().toISOString(),
        template: 'workflow-coordination-tmpl'
      }
    }
  }

  private async executeProjectCoordination(context: OrchestratorContext): Promise<OrchestratorResponse> {
    const prompt = this.buildProjectCoordinationPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'coordinate-projects',
        timestamp: new Date().toISOString(),
        template: 'project-coordination-tmpl'
      }
    }
  }

  private async executeResourceCoordination(context: OrchestratorContext): Promise<OrchestratorResponse> {
    const prompt = this.buildResourceCoordinationPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'coordinate-resources',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeStakeholderCoordination(context: OrchestratorContext): Promise<OrchestratorResponse> {
    const prompt = this.buildStakeholderCoordinationPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'coordinate-stakeholders',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeQualityCoordination(context: OrchestratorContext): Promise<OrchestratorResponse> {
    const prompt = this.buildQualityCoordinationPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'coordinate-quality',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeRiskCoordination(context: OrchestratorContext): Promise<OrchestratorResponse> {
    const prompt = this.buildRiskCoordinationPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'coordinate-risks',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeCommunicationCoordination(context: OrchestratorContext): Promise<OrchestratorResponse> {
    const prompt = this.buildCommunicationCoordinationPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'coordinate-communication',
        timestamp: new Date().toISOString(),
        template: 'communication-coordination-tmpl'
      }
    }
  }

  private async executeGovernanceCoordination(context: OrchestratorContext): Promise<OrchestratorResponse> {
    const prompt = this.buildGovernanceCoordinationPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'coordinate-governance',
        timestamp: new Date().toISOString(),
        template: 'governance-coordination-tmpl'
      }
    }
  }

  private async executeChangeCoordination(context: OrchestratorContext): Promise<OrchestratorResponse> {
    const prompt = this.buildChangeCoordinationPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'coordinate-change',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executePerformanceCoordination(context: OrchestratorContext): Promise<OrchestratorResponse> {
    const prompt = this.buildPerformanceCoordinationPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'coordinate-performance',
        timestamp: new Date().toISOString()
      }
    }
  }

  // Prompt building methods
  private buildWorkflowCoordinationPrompt(context: OrchestratorContext): string {
    return `Coordinate workflow for: ${context.userInput || 'the specified project'}

## Workflow Coordination Requirements:
- Project Type: ${context.projectType || this.orchestratorConfig.projectType}
- Team Size: ${context.teamSize || this.orchestratorConfig.teamSize}
- Complexity: ${context.complexity || this.orchestratorConfig.complexity}
- Workflow Type: ${context.workflowType || this.orchestratorConfig.workflowType}
- Coordination Level: ${context.coordinationLevel || this.orchestratorConfig.coordinationLevel}
- Methodology: ${context.options?.methodology || this.orchestratorConfig.methodology}

## Workflow Coordination Framework:
1. **Workflow Design**: Design efficient and effective workflows
2. **Dependency Management**: Manage workflow dependencies and critical path
3. **Resource Allocation**: Allocate resources optimally across workflows
4. **Quality Gates**: Establish quality gates and checkpoints
5. **Monitoring**: Monitor workflow performance and progress
6. **Optimization**: Continuously optimize workflow efficiency
7. **Communication**: Facilitate workflow communication
8. **Learning**: Capture and share workflow lessons learned

## Workflow Components:
- **Workflow Phases**: Define workflow phases and activities
- **Dependencies**: Map workflow dependencies and critical path
- **Resource Allocation**: Optimize resource allocation across workflows
- **Quality Gates**: Establish quality gates and checkpoints
- **Monitoring**: Monitor workflow performance and progress
- **Communication**: Facilitate workflow communication
- **Optimization**: Continuously optimize workflow efficiency
- **Learning**: Capture and share workflow lessons learned

## Output Format:
- Use structured markdown with clear headings
- Include workflow diagrams and process maps
- Provide dependency analysis and critical path
- Include resource allocation and utilization plans
- Document quality gates and checkpoints
- Include communication and coordination plans
- Provide monitoring and reporting mechanisms
- Include optimization and improvement recommendations

Ensure the workflow coordination is efficient, scalable, and supports project success.`
  }

  private buildProjectCoordinationPrompt(context: OrchestratorContext): string {
    return `Coordinate projects for: ${context.userInput || 'the specified project'}

## Project Coordination Requirements:
- Project Type: ${context.projectType || this.orchestratorConfig.projectType}
- Team Size: ${context.teamSize || this.orchestratorConfig.teamSize}
- Complexity: ${context.complexity || this.orchestratorConfig.complexity}
- Coordination Level: ${context.coordinationLevel || this.orchestratorConfig.coordinationLevel}
- Methodology: ${context.options?.methodology || this.orchestratorConfig.methodology}

## Project Coordination Framework:
1. **Project Alignment**: Align projects with strategic objectives
2. **Dependency Management**: Manage inter-project dependencies
3. **Resource Sharing**: Optimize resource sharing across projects
4. **Stakeholder Management**: Coordinate stakeholder engagement
5. **Quality Standards**: Maintain consistent quality standards
6. **Risk Management**: Coordinate risk management across projects
7. **Communication**: Facilitate inter-project communication
8. **Performance**: Monitor and report project performance

## Project Components:
- **Project Portfolio**: Define project portfolio and priorities
- **Dependencies**: Map inter-project dependencies and critical path
- **Resource Sharing**: Optimize resource sharing across projects
- **Stakeholder Coordination**: Coordinate stakeholder engagement
- **Quality Standards**: Maintain consistent quality standards
- **Risk Coordination**: Coordinate risk management across projects
- **Communication**: Facilitate inter-project communication
- **Performance**: Monitor and report project performance

## Output Format:
- Use structured markdown with clear headings
- Include project portfolio and dependency maps
- Provide resource sharing and allocation plans
- Include stakeholder coordination strategies
- Document quality standards and compliance
- Include risk coordination and management
- Provide communication and reporting plans
- Include performance monitoring and optimization

Ensure the project coordination is effective, efficient, and supports strategic objectives.`
  }

  private buildResourceCoordinationPrompt(context: OrchestratorContext): string {
    return `Coordinate resources for: ${context.userInput || 'the specified project'}

## Resource Coordination Requirements:
- Project Type: ${context.projectType || this.orchestratorConfig.projectType}
- Team Size: ${context.teamSize || this.orchestratorConfig.teamSize}
- Complexity: ${context.complexity || this.orchestratorConfig.complexity}
- Budget: ${context.budget || this.orchestratorConfig.budget}

## Resource Coordination Framework:
1. **Resource Planning**: Plan and allocate resources across projects
2. **Resource Optimization**: Optimize resource utilization and efficiency
3. **Resource Sharing**: Coordinate resource sharing across projects
4. **Resource Monitoring**: Monitor resource performance and utilization
5. **Resource Adjustment**: Adjust resource allocation as needed
6. **Resource Development**: Develop resource capabilities and skills
7. **Resource Retention**: Retain key resources and talent
8. **Resource Reporting**: Report resource performance and utilization

## Resource Components:
- **Human Resources**: Team members, skills, and capabilities
- **Financial Resources**: Budget allocation and cost management
- **Material Resources**: Equipment, tools, and materials
- **Technology Resources**: Software, hardware, and systems
- **External Resources**: Vendors, partners, and contractors
- **Resource Allocation**: Optimal resource distribution
- **Resource Utilization**: Resource usage and efficiency
- **Resource Development**: Skill development and training

## Output Format:
- Use structured markdown with clear headings
- Include resource inventory and capabilities
- Provide resource allocation and utilization plans
- Include resource optimization strategies
- Document resource monitoring and reporting
- Include resource development and training plans
- Provide resource efficiency improvement recommendations
- Include resource retention and talent management

Ensure resource coordination is optimal, efficient, and supports project success.`
  }

  private buildStakeholderCoordinationPrompt(context: OrchestratorContext): string {
    return `Coordinate stakeholders for: ${context.userInput || 'the specified project'}

## Stakeholder Coordination Requirements:
- Project Type: ${context.projectType || this.orchestratorConfig.projectType}
- Team Size: ${context.teamSize || this.orchestratorConfig.teamSize}
- Stakeholder Types: ${context.options?.stakeholderTypes || 'Internal, External, Customer, Vendor'}

## Stakeholder Coordination Framework:
1. **Stakeholder Identification**: Identify all project stakeholders
2. **Stakeholder Analysis**: Analyze stakeholder influence and interest
3. **Stakeholder Engagement**: Develop engagement strategies
4. **Stakeholder Communication**: Plan stakeholder communication
5. **Stakeholder Management**: Manage stakeholder relationships
6. **Stakeholder Satisfaction**: Monitor stakeholder satisfaction
7. **Stakeholder Reporting**: Report stakeholder status
8. **Stakeholder Learning**: Learn from stakeholder feedback

## Stakeholder Components:
- **Stakeholder Inventory**: Complete stakeholder list and profiles
- **Stakeholder Analysis**: Influence, interest, and engagement levels
- **Engagement Strategies**: Customized engagement approaches
- **Communication Plans**: Communication channels and frequency
- **Relationship Management**: Stakeholder relationship management
- **Satisfaction Monitoring**: Stakeholder satisfaction tracking
- **Issue Management**: Stakeholder issue resolution
- **Feedback Collection**: Stakeholder feedback and input

## Output Format:
- Use structured markdown with clear headings
- Include comprehensive stakeholder inventory
- Provide stakeholder analysis and engagement strategies
- Include communication and relationship management plans
- Document stakeholder satisfaction monitoring
- Include issue management and feedback collection
- Provide stakeholder learning and improvement recommendations
- Include stakeholder coordination best practices

Ensure stakeholder coordination is comprehensive, proactive, and supports project success.`
  }

  private buildQualityCoordinationPrompt(context: OrchestratorContext): string {
    return `Coordinate quality for: ${context.userInput || 'the specified project'}

## Quality Coordination Requirements:
- Project Type: ${context.projectType || this.orchestratorConfig.projectType}
- Team Size: ${context.teamSize || this.orchestratorConfig.teamSize}
- Quality Standards: ${context.options?.qualityStandards || 'Industry best practices'}

## Quality Coordination Framework:
1. **Quality Planning**: Plan quality assurance activities
2. **Quality Standards**: Define quality standards and criteria
3. **Quality Control**: Implement quality control measures
4. **Quality Assurance**: Ensure quality assurance processes
5. **Quality Monitoring**: Monitor quality performance
6. **Quality Improvement**: Improve quality processes
7. **Quality Reporting**: Report quality status and trends
8. **Quality Learning**: Learn from quality issues

## Quality Components:
- **Quality Standards**: Functional, non-functional, and performance standards
- **Quality Criteria**: Acceptance criteria and quality gates
- **Quality Control**: Testing, inspection, and validation
- **Quality Assurance**: Process assurance and compliance
- **Quality Monitoring**: Quality metrics and dashboards
- **Quality Improvement**: Continuous improvement processes
- **Quality Reporting**: Quality reports and status updates
- **Quality Learning**: Lessons learned and best practices

## Output Format:
- Use structured markdown with clear headings
- Include comprehensive quality standards and criteria
- Provide quality control and assurance processes
- Include quality monitoring and reporting mechanisms
- Document quality improvement and learning processes
- Include quality culture and awareness development
- Provide quality compliance and audit recommendations
- Include quality coordination best practices

Ensure quality coordination is comprehensive, proactive, and supports project success.`
  }

  private buildRiskCoordinationPrompt(context: OrchestratorContext): string {
    return `Coordinate risks for: ${context.userInput || 'the specified project'}

## Risk Coordination Requirements:
- Project Type: ${context.projectType || this.orchestratorConfig.projectType}
- Team Size: ${context.teamSize || this.orchestratorConfig.teamSize}
- Risk Tolerance: ${context.options?.riskTolerance || 'Medium'}

## Risk Coordination Framework:
1. **Risk Identification**: Identify project risks and opportunities
2. **Risk Assessment**: Assess risk probability and impact
3. **Risk Prioritization**: Prioritize risks based on severity
4. **Risk Mitigation**: Develop risk mitigation strategies
5. **Risk Monitoring**: Monitor risk status and changes
6. **Risk Response**: Respond to risk events
7. **Risk Reporting**: Report risk status and trends
8. **Risk Learning**: Learn from risk events

## Risk Components:
- **Risk Categories**: Technical, business, resource, schedule, quality, external
- **Risk Assessment**: Probability, impact, severity, and priority
- **Risk Mitigation**: Prevention, mitigation, and contingency strategies
- **Risk Monitoring**: Risk indicators and early warning systems
- **Risk Response**: Response plans and escalation procedures
- **Risk Reporting**: Risk dashboards and reports
- **Risk Learning**: Lessons learned and best practices
- **Risk Culture**: Risk awareness and management culture

## Output Format:
- Use structured markdown with clear headings
- Include comprehensive risk inventory
- Provide risk assessment and prioritization
- Include risk mitigation and response strategies
- Document risk monitoring and reporting mechanisms
- Include risk learning and improvement recommendations
- Provide risk culture and awareness development plans
- Include risk coordination best practices

Ensure risk coordination is comprehensive, proactive, and supports project success.`
  }

  private buildCommunicationCoordinationPrompt(context: OrchestratorContext): string {
    return `Coordinate communication for: ${context.userInput || 'the specified project'}

## Communication Coordination Requirements:
- Project Type: ${context.projectType || this.orchestratorConfig.projectType}
- Team Size: ${context.teamSize || this.orchestratorConfig.teamSize}
- Communication Types: ${context.options?.communicationTypes || 'Internal, External, Stakeholder, Team'}

## Communication Coordination Framework:
1. **Communication Planning**: Plan communication activities
2. **Communication Channels**: Define communication channels
3. **Communication Content**: Develop communication content
4. **Communication Timing**: Schedule communication activities
5. **Communication Monitoring**: Monitor communication effectiveness
6. **Communication Improvement**: Improve communication processes
7. **Communication Reporting**: Report communication status
8. **Communication Learning**: Learn from communication feedback

## Communication Components:
- **Communication Structure**: Communication hierarchy and roles
- **Communication Channels**: Email, meetings, reports, presentations
- **Communication Content**: Messages, updates, and information
- **Communication Timing**: Frequency and scheduling
- **Communication Monitoring**: Effectiveness and engagement
- **Communication Improvement**: Process optimization
- **Communication Reporting**: Status and performance
- **Communication Learning**: Feedback and lessons learned

## Output Format:
- Use structured markdown with clear headings
- Include comprehensive communication framework
- Provide communication channels and content plans
- Include communication timing and scheduling
- Document communication monitoring and reporting
- Include communication improvement and learning
- Provide communication coordination best practices
- Include communication culture and awareness development

Ensure communication coordination is effective, clear, and supports project success.`
  }

  private buildGovernanceCoordinationPrompt(context: OrchestratorContext): string {
    return `Coordinate governance for: ${context.userInput || 'the specified project'}

## Governance Coordination Requirements:
- Project Type: ${context.projectType || this.orchestratorConfig.projectType}
- Team Size: ${context.teamSize || this.orchestratorConfig.teamSize}
- Governance Level: ${context.options?.governanceLevel || 'Project level'}

## Governance Coordination Framework:
1. **Governance Structure**: Define governance structure and roles
2. **Governance Processes**: Establish governance processes and procedures
3. **Governance Policies**: Develop governance policies and guidelines
4. **Governance Compliance**: Ensure governance compliance and audit
5. **Governance Monitoring**: Monitor governance effectiveness
6. **Governance Improvement**: Improve governance processes
7. **Governance Reporting**: Report governance status and trends
8. **Governance Learning**: Learn from governance insights

## Governance Components:
- **Governance Structure**: Board, committees, roles, and responsibilities
- **Governance Processes**: Decision-making, approval, and review processes
- **Governance Policies**: Security, quality, compliance, and operational policies
- **Governance Compliance**: Compliance requirements and audit processes
- **Governance Monitoring**: Governance metrics and dashboards
- **Governance Improvement**: Continuous improvement processes
- **Governance Reporting**: Governance reports and status updates
- **Governance Learning**: Lessons learned and best practices

## Output Format:
- Use structured markdown with clear headings
- Include comprehensive governance structure and processes
- Provide governance policies and compliance requirements
- Include governance monitoring and reporting mechanisms
- Document governance improvement and learning processes
- Include governance culture and awareness development
- Provide governance audit and compliance recommendations
- Include governance coordination best practices

Ensure governance coordination is comprehensive, effective, and supports project success.`
  }

  private buildChangeCoordinationPrompt(context: OrchestratorContext): string {
    return `Coordinate change for: ${context.userInput || 'the specified project'}

## Change Coordination Requirements:
- Project Type: ${context.projectType || this.orchestratorConfig.projectType}
- Team Size: ${context.teamSize || this.orchestratorConfig.teamSize}
- Change Types: ${context.options?.changeTypes || 'Scope, Schedule, Budget, Quality'}

## Change Coordination Framework:
1. **Change Identification**: Identify change requirements
2. **Change Analysis**: Analyze change impact and implications
3. **Change Planning**: Plan change implementation
4. **Change Approval**: Coordinate change approval process
5. **Change Implementation**: Implement change changes
6. **Change Monitoring**: Monitor change progress
7. **Change Reporting**: Report change status
8. **Change Learning**: Learn from change outcomes

## Change Components:
- **Change Types**: Scope, schedule, budget, quality, resource changes
- **Change Process**: Request, evaluation, approval, implementation
- **Change Impact**: Impact analysis and assessment
- **Change Approval**: Approval levels and criteria
- **Change Implementation**: Implementation planning and execution
- **Change Monitoring**: Progress tracking and reporting
- **Change Learning**: Lessons learned and best practices
- **Change Culture**: Change awareness and management culture

## Output Format:
- Use structured markdown with clear headings
- Include comprehensive change framework
- Provide change processes and procedures
- Include change impact analysis and assessment
- Document change approval and implementation
- Include change monitoring and reporting
- Provide change learning and improvement
- Include change coordination best practices

Ensure change coordination is effective, controlled, and supports project success.`
  }

  private buildPerformanceCoordinationPrompt(context: OrchestratorContext): string {
    return `Coordinate performance for: ${context.userInput || 'the specified project'}

## Performance Coordination Requirements:
- Project Type: ${context.projectType || this.orchestratorConfig.projectType}
- Team Size: ${context.teamSize || this.orchestratorConfig.teamSize}
- Metrics Types: ${context.options?.metricsTypes || 'Schedule, Budget, Quality, Scope'}

## Performance Coordination Framework:
1. **Metrics Definition**: Define performance metrics and KPIs
2. **Data Collection**: Collect performance data and information
3. **Data Analysis**: Analyze performance data and trends
4. **Performance Reporting**: Report performance status and trends
5. **Performance Improvement**: Identify improvement opportunities
6. **Performance Optimization**: Optimize performance processes
7. **Performance Learning**: Learn from performance insights
8. **Performance Culture**: Develop performance culture

## Performance Components:
- **Schedule Metrics**: Timeline, milestones, and delivery performance
- **Budget Metrics**: Cost, budget variance, and financial performance
- **Quality Metrics**: Defect rates, quality scores, and compliance
- **Scope Metrics**: Scope changes, requirements, and deliverables
- **Risk Metrics**: Risk exposure, mitigation, and trends
- **Team Metrics**: Productivity, utilization, and satisfaction
- **Stakeholder Metrics**: Satisfaction, engagement, and communication
- **Overall Metrics**: Project health, success, and value

## Output Format:
- Use structured markdown with clear headings
- Include comprehensive performance metrics and KPIs
- Provide data collection and analysis processes
- Include performance reporting and dashboards
- Document performance improvement and optimization
- Include performance learning and culture development
- Provide performance compliance and audit recommendations
- Include performance coordination best practices

Ensure performance coordination is comprehensive, proactive, and supports project success.`
  }

  // Public API methods
  getAvailableCommands(): string[] {
    return Array.from(this.commands.keys())
  }

  getCommandDescription(commandName: string): string | undefined {
    return this.commands.get(commandName)?.description
  }

  updateConfig(newConfig: Partial<OrchestratorConfigType>): void {
    this.orchestratorConfig = { ...this.orchestratorConfig, ...newConfig }
  }

  getConfig(): OrchestratorConfigType {
    return { ...this.orchestratorConfig }
  }
}
