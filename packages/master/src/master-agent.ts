import { BaseAgentImpl, AgentContext, AgentResponse } from 'bmad-core'
import { 
  MasterCommand, 
  MasterContext, 
  MasterResponse, 
  ProjectStrategy,
  WorkflowOrchestration,
  StrategicPlanning,
  MasterConfig as MasterConfigType
} from './types/index.js'

export class MasterAgent extends BaseAgentImpl {
  private masterConfig: MasterConfigType
  private commands: Map<string, MasterCommand> = new Map()

  constructor(config?: Partial<MasterConfigType>) {
    super({
      systemPrompt: `You are the BMad Master, an AI-driven project orchestration and strategic planning specialist. Your role is to:

1. **Strategic Planning**: Develop comprehensive project strategies and roadmaps
2. **Project Orchestration**: Coordinate and orchestrate complex project workflows
3. **Resource Management**: Optimize resource allocation and utilization
4. **Risk Management**: Identify, assess, and manage project risks and opportunities
5. **Stakeholder Management**: Manage stakeholder expectations and communication
6. **Quality Assurance**: Ensure project quality and compliance standards
7. **Performance Monitoring**: Track and report project performance metrics
8. **Governance**: Establish and maintain project governance frameworks
9. **Decision Making**: Facilitate strategic decision-making processes
10. **Continuous Improvement**: Drive continuous improvement and optimization

## Core Principles:
- **Strategic Thinking**: Always consider long-term implications and strategic alignment
- **Systems Thinking**: Understand and optimize complex system interactions
- **Stakeholder Value**: Maximize value for all stakeholders
- **Risk-Aware**: Proactively identify and manage risks and opportunities
- **Data-Driven**: Base decisions on data and evidence
- **Continuous Learning**: Continuously improve processes and outcomes

## Master Capabilities:
1. **Strategic Planning**: Develop comprehensive project strategies and roadmaps
2. **Project Orchestration**: Coordinate complex project workflows and dependencies
3. **Resource Optimization**: Optimize resource allocation and utilization
4. **Risk & Opportunity Management**: Identify and manage risks and opportunities
5. **Stakeholder Coordination**: Manage stakeholder expectations and communication
6. **Quality Governance**: Ensure quality and compliance standards
7. **Performance Management**: Track and optimize project performance
8. **Decision Facilitation**: Facilitate strategic decision-making processes
9. **Change Management**: Manage project changes and transitions
10. **Knowledge Management**: Capture and share project knowledge and lessons learned

## Strategic Planning Framework:
1. **Vision & Mission**: Define project vision and mission
2. **Objectives & Goals**: Set clear objectives and success criteria
3. **Strategy Development**: Develop comprehensive strategies
4. **Resource Planning**: Plan and allocate resources
5. **Risk Assessment**: Identify and assess risks and opportunities
6. **Implementation Planning**: Create detailed implementation plans
7. **Monitoring & Control**: Establish monitoring and control mechanisms
8. **Review & Adaptation**: Regular review and adaptation

## Project Orchestration:
1. **Workflow Design**: Design efficient project workflows
2. **Dependency Management**: Manage project dependencies
3. **Resource Coordination**: Coordinate resource allocation
4. **Timeline Management**: Manage project timelines and milestones
5. **Quality Gates**: Establish quality gates and checkpoints
6. **Communication**: Facilitate project communication
7. **Issue Resolution**: Resolve project issues and conflicts
8. **Performance Tracking**: Track and report project performance

## Output Format:
- Use structured markdown with clear headings
- Include executive summaries for complex plans
- Provide specific, actionable recommendations
- Include metrics and performance indicators
- Document risks and mitigation strategies
- Include stakeholder communication plans
- Provide implementation roadmaps and timelines

Always focus on strategic alignment, stakeholder value, and sustainable project success.`
    })

    this.masterConfig = {
      defaultOutputFormat: 'markdown',
      projectType: 'software-development',
      teamSize: 'medium',
      complexity: 'medium',
      timeline: '6 months',
      budget: 'To be determined',
      methodology: 'agile',
      governance: ['project-board', 'steering-committee', 'working-groups'],
      tools: ['jira', 'confluence', 'slack', 'zoom', 'monday'],
      autoSave: true,
      templates: {
        strategy: ['project-strategy-tmpl'],
        planning: ['strategic-planning-tmpl'],
        orchestration: ['workflow-orchestration-tmpl'],
        governance: ['governance-framework-tmpl']
      },
      ...config
    }

    this.initializeCommands()
  }

  // Implement abstract method from BaseAgentImpl
  async execute(command: string, context: AgentContext): Promise<AgentResponse> {
    // This method is required by BaseAgentImpl but not used in MasterAgent
    // We use executeCommand instead
    throw new Error('Use executeCommand method instead of execute')
  }

  private initializeCommands(): void {
    // Strategic Planning Command
    this.commands.set('develop-strategy', {
      name: 'develop-strategy',
      description: 'Develop comprehensive project strategies and roadmaps',
      execute: async (context) => this.executeStrategicPlanning(context)
    })

    // Project Orchestration Command
    this.commands.set('orchestrate-project', {
      name: 'orchestrate-project',
      description: 'Coordinate and orchestrate complex project workflows',
      execute: async (context) => this.executeProjectOrchestration(context)
    })

    // Resource Management Command
    this.commands.set('manage-resources', {
      name: 'manage-resources',
      description: 'Optimize resource allocation and utilization',
      execute: async (context) => this.executeResourceManagement(context)
    })

    // Risk Management Command
    this.commands.set('manage-risks', {
      name: 'manage-risks',
      description: 'Identify, assess, and manage project risks and opportunities',
      execute: async (context) => this.executeRiskManagement(context)
    })

    // Stakeholder Management Command
    this.commands.set('manage-stakeholders', {
      name: 'manage-stakeholders',
      description: 'Manage stakeholder expectations and communication',
      execute: async (context) => this.executeStakeholderManagement(context)
    })

    // Quality Assurance Command
    this.commands.set('ensure-quality', {
      name: 'ensure-quality',
      description: 'Ensure project quality and compliance standards',
      execute: async (context) => this.executeQualityAssurance(context)
    })

    // Performance Monitoring Command
    this.commands.set('monitor-performance', {
      name: 'monitor-performance',
      description: 'Track and report project performance metrics',
      execute: async (context) => this.executePerformanceMonitoring(context)
    })

    // Governance Command
    this.commands.set('establish-governance', {
      name: 'establish-governance',
      description: 'Establish and maintain project governance frameworks',
      execute: async (context) => this.executeGovernance(context)
    })

    // Decision Making Command
    this.commands.set('facilitate-decisions', {
      name: 'facilitate-decisions',
      description: 'Facilitate strategic decision-making processes',
      execute: async (context) => this.executeDecisionMaking(context)
    })

    // Continuous Improvement Command
    this.commands.set('drive-improvement', {
      name: 'drive-improvement',
      description: 'Drive continuous improvement and optimization',
      execute: async (context) => this.executeContinuousImprovement(context)
    })
  }

  async executeCommand(commandName: string, context: MasterContext): Promise<MasterResponse> {
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

  private async executeStrategicPlanning(context: MasterContext): Promise<MasterResponse> {
    const prompt = this.buildStrategicPlanningPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'develop-strategy',
        timestamp: new Date().toISOString(),
        template: 'project-strategy-tmpl'
      }
    }
  }

  private async executeProjectOrchestration(context: MasterContext): Promise<MasterResponse> {
    const prompt = this.buildProjectOrchestrationPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'orchestrate-project',
        timestamp: new Date().toISOString(),
        template: 'workflow-orchestration-tmpl'
      }
    }
  }

  private async executeResourceManagement(context: MasterContext): Promise<MasterResponse> {
    const prompt = this.buildResourceManagementPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'manage-resources',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeRiskManagement(context: MasterContext): Promise<MasterResponse> {
    const prompt = this.buildRiskManagementPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'manage-risks',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeStakeholderManagement(context: MasterContext): Promise<MasterResponse> {
    const prompt = this.buildStakeholderManagementPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'manage-stakeholders',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeQualityAssurance(context: MasterContext): Promise<MasterResponse> {
    const prompt = this.buildQualityAssurancePrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'ensure-quality',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executePerformanceMonitoring(context: MasterContext): Promise<MasterResponse> {
    const prompt = this.buildPerformanceMonitoringPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'monitor-performance',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeGovernance(context: MasterContext): Promise<MasterResponse> {
    const prompt = this.buildGovernancePrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'establish-governance',
        timestamp: new Date().toISOString(),
        template: 'governance-framework-tmpl'
      }
    }
  }

  private async executeDecisionMaking(context: MasterContext): Promise<MasterResponse> {
    const prompt = this.buildDecisionMakingPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'facilitate-decisions',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeContinuousImprovement(context: MasterContext): Promise<MasterResponse> {
    const prompt = this.buildContinuousImprovementPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'drive-improvement',
        timestamp: new Date().toISOString()
      }
    }
  }

  // Prompt building methods
  private buildStrategicPlanningPrompt(context: MasterContext): string {
    return `Develop a comprehensive project strategy for: ${context.userInput || 'the specified project'}

## Strategic Planning Requirements:
- Project Type: ${context.projectType || this.masterConfig.projectType}
- Team Size: ${context.teamSize || this.masterConfig.teamSize}
- Complexity: ${context.complexity || this.masterConfig.complexity}
- Timeline: ${context.timeline || this.masterConfig.timeline}
- Budget: ${context.budget || this.masterConfig.budget}
- Methodology: ${context.options?.methodology || this.masterConfig.methodology}

## Strategic Planning Framework:
1. **Vision & Mission**: Define project vision and mission
2. **Objectives & Goals**: Set clear objectives and success criteria
3. **Strategy Development**: Develop comprehensive strategies
4. **Resource Planning**: Plan and allocate resources
5. **Risk Assessment**: Identify and assess risks and opportunities
6. **Implementation Planning**: Create detailed implementation plans
7. **Monitoring & Control**: Establish monitoring and control mechanisms
8. **Review & Adaptation**: Regular review and adaptation

## Strategy Components:
- **Project Vision**: Clear vision for project success
- **Strategic Objectives**: High-level objectives and goals
- **Success Criteria**: Measurable success criteria
- **Resource Strategy**: Resource allocation and utilization strategy
- **Risk Strategy**: Risk management and mitigation strategy
- **Stakeholder Strategy**: Stakeholder engagement and communication strategy
- **Quality Strategy**: Quality assurance and compliance strategy
- **Implementation Strategy**: Detailed implementation approach

## Output Format:
- Use structured markdown with clear headings
- Include executive summary and key recommendations
- Provide detailed strategy components
- Include implementation roadmap and timeline
- Document success criteria and metrics
- Include risk assessment and mitigation strategies
- Provide stakeholder communication plans

Ensure the strategy is comprehensive, actionable, and aligned with business objectives.`
  }

  private buildProjectOrchestrationPrompt(context: MasterContext): string {
    return `Orchestrate a complex project workflow for: ${context.userInput || 'the specified project'}

## Project Orchestration Requirements:
- Project Type: ${context.projectType || this.masterConfig.projectType}
- Team Size: ${context.teamSize || this.masterConfig.teamSize}
- Complexity: ${context.complexity || this.masterConfig.complexity}
- Timeline: ${context.timeline || this.masterConfig.timeline}
- Methodology: ${context.options?.methodology || this.masterConfig.methodology}

## Project Orchestration Framework:
1. **Workflow Design**: Design efficient project workflows
2. **Dependency Management**: Manage project dependencies
3. **Resource Coordination**: Coordinate resource allocation
4. **Timeline Management**: Manage project timelines and milestones
5. **Quality Gates**: Establish quality gates and checkpoints
6. **Communication**: Facilitate project communication
7. **Issue Resolution**: Resolve project issues and conflicts
8. **Performance Tracking**: Track and report project performance

## Orchestration Components:
- **Workflow Phases**: Define project phases and activities
- **Dependencies**: Map project dependencies and critical path
- **Resource Allocation**: Optimize resource allocation and utilization
- **Timeline Management**: Manage project timelines and milestones
- **Quality Gates**: Establish quality gates and checkpoints
- **Communication Plan**: Facilitate project communication
- **Issue Management**: Resolve project issues and conflicts
- **Performance Metrics**: Track and report project performance

## Output Format:
- Use structured markdown with clear headings
- Include workflow diagrams and process maps
- Provide dependency analysis and critical path
- Include resource allocation and utilization plans
- Document quality gates and checkpoints
- Include communication and issue management plans
- Provide performance tracking and reporting mechanisms

Ensure the orchestration is efficient, scalable, and supports project success.`
  }

  private buildResourceManagementPrompt(context: MasterContext): string {
    return `Optimize resource management for: ${context.userInput || 'the specified project'}

## Resource Management Requirements:
- Project Type: ${context.projectType || this.masterConfig.projectType}
- Team Size: ${context.teamSize || this.masterConfig.teamSize}
- Complexity: ${context.complexity || this.masterConfig.complexity}
- Timeline: ${context.timeline || this.masterConfig.timeline}
- Budget: ${context.budget || this.masterConfig.budget}

## Resource Management Framework:
1. **Resource Planning**: Plan and allocate resources
2. **Resource Optimization**: Optimize resource utilization
3. **Resource Monitoring**: Monitor resource performance
4. **Resource Adjustment**: Adjust resource allocation as needed
5. **Resource Development**: Develop resource capabilities
6. **Resource Retention**: Retain key resources
7. **Resource Efficiency**: Improve resource efficiency
8. **Resource Reporting**: Report resource performance

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

Ensure resource management is optimal, efficient, and supports project success.`
  }

  private buildRiskManagementPrompt(context: MasterContext): string {
    return `Manage risks and opportunities for: ${context.userInput || 'the specified project'}

## Risk Management Requirements:
- Project Type: ${context.projectType || this.masterConfig.projectType}
- Team Size: ${context.teamSize || this.masterConfig.teamSize}
- Complexity: ${context.complexity || this.masterConfig.complexity}
- Risk Tolerance: ${context.options?.riskTolerance || 'Medium'}

## Risk Management Framework:
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

Ensure risk management is comprehensive, proactive, and supports project success.`
  }

  private buildStakeholderManagementPrompt(context: MasterContext): string {
    return `Manage stakeholders for: ${context.userInput || 'the specified project'}

## Stakeholder Management Requirements:
- Project Type: ${context.projectType || this.masterConfig.projectType}
- Team Size: ${context.teamSize || this.masterConfig.teamSize}
- Stakeholder Types: ${context.options?.stakeholderTypes || 'Internal, External, Customer, Vendor'}

## Stakeholder Management Framework:
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

Ensure stakeholder management is comprehensive, proactive, and supports project success.`
  }

  private buildQualityAssurancePrompt(context: MasterContext): string {
    return `Ensure quality and compliance for: ${context.userInput || 'the specified project'}

## Quality Assurance Requirements:
- Project Type: ${context.projectType || this.masterConfig.projectType}
- Team Size: ${context.teamSize || this.masterConfig.teamSize}
- Quality Standards: ${context.options?.qualityStandards || 'Industry best practices'}

## Quality Assurance Framework:
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

Ensure quality assurance is comprehensive, proactive, and supports project success.`
  }

  private buildPerformanceMonitoringPrompt(context: MasterContext): string {
    return `Monitor and report performance for: ${context.userInput || 'the specified project'}

## Performance Monitoring Requirements:
- Project Type: ${context.projectType || this.masterConfig.projectType}
- Team Size: ${context.teamSize || this.masterConfig.teamSize}
- Metrics Types: ${context.options?.metricsTypes || 'Schedule, Budget, Quality, Scope'}

## Performance Monitoring Framework:
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

Ensure performance monitoring is comprehensive, proactive, and supports project success.`
  }

  private buildGovernancePrompt(context: MasterContext): string {
    return `Establish governance framework for: ${context.userInput || 'the specified project'}

## Governance Requirements:
- Project Type: ${context.projectType || this.masterConfig.projectType}
- Team Size: ${context.teamSize || this.masterConfig.teamSize}
- Governance Level: ${context.options?.governanceLevel || 'Project level'}

## Governance Framework:
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

Ensure governance is comprehensive, effective, and supports project success.`
  }

  private buildDecisionMakingPrompt(context: MasterContext): string {
    return `Facilitate decision-making for: ${context.userInput || 'the specified project'}

## Decision Making Requirements:
- Project Type: ${context.projectType || this.masterConfig.projectType}
- Team Size: ${context.teamSize || this.masterConfig.teamSize}
- Decision Types: ${context.options?.decisionTypes || 'Strategic, Tactical, Operational'}

## Decision Making Framework:
1. **Decision Identification**: Identify decisions that need to be made
2. **Decision Analysis**: Analyze decision options and implications
3. **Decision Criteria**: Define decision criteria and evaluation methods
4. **Decision Process**: Establish decision-making processes
5. **Decision Facilitation**: Facilitate decision-making sessions
6. **Decision Documentation**: Document decisions and rationale
7. **Decision Implementation**: Implement and monitor decisions
8. **Decision Learning**: Learn from decision outcomes

## Decision Components:
- **Decision Types**: Strategic, tactical, operational, and emergency decisions
- **Decision Criteria**: Evaluation criteria and decision frameworks
- **Decision Process**: Decision-making processes and procedures
- **Decision Facilitation**: Facilitation techniques and tools
- **Decision Documentation**: Decision records and rationale
- **Decision Implementation**: Implementation plans and monitoring
- **Decision Learning**: Lessons learned and best practices
- **Decision Culture**: Decision-making culture and capabilities

## Output Format:
- Use structured markdown with clear headings
- Include comprehensive decision-making framework
- Provide decision criteria and evaluation methods
- Include decision processes and facilitation techniques
- Document decision implementation and monitoring
- Include decision learning and culture development
- Provide decision audit and improvement recommendations

Ensure decision-making is effective, transparent, and supports project success.`
  }

  private buildContinuousImprovementPrompt(context: MasterContext): string {
    return `Drive continuous improvement for: ${context.userInput || 'the specified project'}

## Continuous Improvement Requirements:
- Project Type: ${context.projectType || this.masterConfig.projectType}
- Team Size: ${context.teamSize || this.masterConfig.teamSize}
- Improvement Areas: ${context.options?.improvementAreas || 'Process, Quality, Performance, Efficiency'}

## Continuous Improvement Framework:
1. **Improvement Identification**: Identify improvement opportunities
2. **Improvement Analysis**: Analyze improvement potential and impact
3. **Improvement Planning**: Plan improvement initiatives
4. **Improvement Implementation**: Implement improvement changes
5. **Improvement Monitoring**: Monitor improvement progress
6. **Improvement Measurement**: Measure improvement results
7. **Improvement Learning**: Learn from improvement outcomes
8. **Improvement Culture**: Develop improvement culture

## Improvement Components:
- **Process Improvement**: Process optimization and efficiency
- **Quality Improvement**: Quality enhancement and compliance
- **Performance Improvement**: Performance optimization and productivity
- **Efficiency Improvement**: Resource efficiency and utilization
- **Innovation**: Innovation and creativity enhancement
- **Learning**: Learning and development improvement
- **Culture**: Improvement culture and mindset
- **Sustainability**: Sustainable improvement practices

## Output Format:
- Use structured markdown with clear headings
- Include comprehensive improvement framework
- Provide improvement identification and analysis
- Include improvement planning and implementation
- Document improvement monitoring and measurement
- Include improvement learning and culture development
- Provide improvement audit and sustainability recommendations

Ensure continuous improvement is systematic, effective, and supports project success.`
  }

  // Public API methods
  getAvailableCommands(): string[] {
    return Array.from(this.commands.keys())
  }

  getCommandDescription(commandName: string): string | undefined {
    return this.commands.get(commandName)?.description
  }

  updateConfig(newConfig: Partial<MasterConfigType>): void {
    this.masterConfig = { ...this.masterConfig, ...newConfig }
  }

  getConfig(): MasterConfigType {
    return { ...this.masterConfig }
  }
}
