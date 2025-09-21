import { BaseAgentImpl, AgentContext, AgentResponse } from '@osmanekrem/bmad-core'
import { 
  PMCommand, 
  PMContext, 
  PMResponse, 
  ProjectPlan,
  TaskBreakdown,
  PMConfig as PMConfigType
} from './types/index.js'

export class PMAgent extends BaseAgentImpl {
  private pmConfig: PMConfigType
  private commands: Map<string, PMCommand> = new Map()

  constructor(config?: Partial<PMConfigType>) {
    super({
      systemPrompt: `You are the BMad PM, an AI-driven project management and planning specialist. Your role is to:

1. **Project Planning**: Create comprehensive project plans and roadmaps
2. **Task Breakdown**: Break down complex projects into manageable tasks
3. **Resource Planning**: Plan and allocate resources effectively
4. **Risk Management**: Identify and manage project risks
5. **Timeline Management**: Create realistic project timelines
6. **Stakeholder Management**: Manage stakeholder communication and expectations
7. **Quality Assurance**: Ensure project quality standards
8. **Progress Tracking**: Monitor and track project progress

## Core Principles:
- **Strategic Thinking**: Align projects with business objectives
- **Risk Management**: Proactively identify and mitigate risks
- **Resource Optimization**: Efficiently allocate and manage resources
- **Communication**: Maintain clear and effective communication
- **Quality Focus**: Ensure high-quality deliverables
- **Agile Mindset**: Adapt to changing requirements and priorities

## Project Management Framework:
1. **Initiation**: Define project scope and objectives
2. **Planning**: Create detailed project plans and schedules
3. **Execution**: Manage project execution and delivery
4. **Monitoring**: Track progress and manage changes
5. **Closing**: Complete project and capture lessons learned

## Methodologies Supported:
- **Agile**: Iterative development with regular feedback
- **Waterfall**: Sequential project phases
- **Hybrid**: Combination of agile and waterfall approaches
- **Scrum**: Agile framework with sprints
- **Kanban**: Visual workflow management

## Output Format:
- Use structured markdown with clear headings
- Include project timelines and Gantt charts
- Provide detailed task breakdowns
- Include risk assessments and mitigation plans
- Document resource requirements and allocations
- Provide stakeholder communication plans

Always create practical, actionable project plans that can be executed successfully.`
    })

    this.pmConfig = {
      defaultOutputFormat: 'markdown',
      projectMethodology: 'agile',
      teamSize: 'medium',
      autoSave: true,
      templates: {
        planning: ['project-plan-tmpl'],
        tracking: ['progress-tracking-tmpl'],
        reporting: ['status-report-tmpl'],
        risk: ['risk-assessment-tmpl']
      },
      ...config
    }

    this.initializeCommands()
  }

  // Implement abstract method from BaseAgentImpl
  async execute(command: string, context: AgentContext): Promise<AgentResponse> {
    // This method is required by BaseAgentImpl but not used in PMAgent
    // We use executeCommand instead
    throw new Error('Use executeCommand method instead of execute')
  }

  private initializeCommands(): void {
    // Project Planning Command
    this.commands.set('create-project-plan', {
      name: 'create-project-plan',
      description: 'Create comprehensive project plan',
      execute: async (context) => this.executeProjectPlanning(context)
    })

    // Task Breakdown Command
    this.commands.set('breakdown-tasks', {
      name: 'breakdown-tasks',
      description: 'Break down project into manageable tasks',
      execute: async (context) => this.executeTaskBreakdown(context)
    })

    // Resource Planning Command
    this.commands.set('plan-resources', {
      name: 'plan-resources',
      description: 'Plan and allocate project resources',
      execute: async (context) => this.executeResourcePlanning(context)
    })

    // Risk Management Command
    this.commands.set('manage-risks', {
      name: 'manage-risks',
      description: 'Identify and manage project risks',
      execute: async (context) => this.executeRiskManagement(context)
    })

    // Timeline Management Command
    this.commands.set('create-timeline', {
      name: 'create-timeline',
      description: 'Create project timeline and schedule',
      execute: async (context) => this.executeTimelineManagement(context)
    })

    // Stakeholder Management Command
    this.commands.set('manage-stakeholders', {
      name: 'manage-stakeholders',
      description: 'Manage stakeholder communication and expectations',
      execute: async (context) => this.executeStakeholderManagement(context)
    })

    // Quality Planning Command
    this.commands.set('plan-quality', {
      name: 'plan-quality',
      description: 'Plan project quality assurance',
      execute: async (context) => this.executeQualityPlanning(context)
    })

    // Progress Tracking Command
    this.commands.set('track-progress', {
      name: 'track-progress',
      description: 'Track and monitor project progress',
      execute: async (context) => this.executeProgressTracking(context)
    })

    // Budget Planning Command
    this.commands.set('plan-budget', {
      name: 'plan-budget',
      description: 'Create project budget and cost estimates',
      execute: async (context) => this.executeBudgetPlanning(context)
    })

    // Communication Planning Command
    this.commands.set('plan-communication', {
      name: 'plan-communication',
      description: 'Plan project communication strategy',
      execute: async (context) => this.executeCommunicationPlanning(context)
    })
  }

  async executeCommand(commandName: string, context: PMContext): Promise<PMResponse> {
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

  private async executeProjectPlanning(context: PMContext): Promise<PMResponse> {
    const prompt = this.buildProjectPlanningPrompt(context)
    const response = await this.callAI(prompt)
    
    const projectPlan: ProjectPlan = this.parseProjectPlanResponse(response)
    
    return {
      success: true,
      data: projectPlan,
      output: this.formatProjectPlanOutput(projectPlan),
      metadata: {
        command: 'create-project-plan',
        timestamp: new Date().toISOString(),
        template: 'project-plan-tmpl'
      }
    }
  }

  private async executeTaskBreakdown(context: PMContext): Promise<PMResponse> {
    const prompt = this.buildTaskBreakdownPrompt(context)
    const response = await this.callAI(prompt)
    
    const taskBreakdown: TaskBreakdown = this.parseTaskBreakdownResponse(response)
    
    return {
      success: true,
      data: taskBreakdown,
      output: this.formatTaskBreakdownOutput(taskBreakdown),
      metadata: {
        command: 'breakdown-tasks',
        timestamp: new Date().toISOString(),
        template: 'task-breakdown-tmpl'
      }
    }
  }

  private async executeResourcePlanning(context: PMContext): Promise<PMResponse> {
    const prompt = this.buildResourcePlanningPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'plan-resources',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeRiskManagement(context: PMContext): Promise<PMResponse> {
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

  private async executeTimelineManagement(context: PMContext): Promise<PMResponse> {
    const prompt = this.buildTimelineManagementPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'create-timeline',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeStakeholderManagement(context: PMContext): Promise<PMResponse> {
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

  private async executeQualityPlanning(context: PMContext): Promise<PMResponse> {
    const prompt = this.buildQualityPlanningPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'plan-quality',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeProgressTracking(context: PMContext): Promise<PMResponse> {
    const prompt = this.buildProgressTrackingPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'track-progress',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeBudgetPlanning(context: PMContext): Promise<PMResponse> {
    const prompt = this.buildBudgetPlanningPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'plan-budget',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeCommunicationPlanning(context: PMContext): Promise<PMResponse> {
    const prompt = this.buildCommunicationPlanningPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'plan-communication',
        timestamp: new Date().toISOString()
      }
    }
  }

  // Prompt building methods
  private buildProjectPlanningPrompt(context: PMContext): string {
    return `Create a comprehensive project plan for: ${context.userInput || 'the specified project'}

## Project Requirements:
- Project Type: ${context.projectType || 'Software Development'}
- Team Size: ${context.teamSize || 'Medium (5-10 people)'}
- Timeline: ${context.timeline || '6 months'}
- Methodology: ${this.pmConfig.projectMethodology}

## Project Planning Framework:
1. **Project Overview**: Objectives, scope, and success criteria
2. **Project Scope**: Included/excluded items, assumptions, constraints
3. **Project Timeline**: Phases, milestones, and critical path
4. **Resource Planning**: Team, budget, equipment, and tools
5. **Risk Assessment**: Risk identification, analysis, and mitigation
6. **Deliverables**: Project outputs and acceptance criteria
7. **Quality Plan**: Quality standards, processes, and metrics
8. **Communication Plan**: Stakeholder management and communication

## Output Format:
- Use structured markdown with clear headings
- Include project timeline and Gantt charts
- Provide detailed resource requirements
- Include risk assessment and mitigation plans
- Document quality standards and processes
- Provide stakeholder communication strategy

Ensure the project plan is comprehensive, realistic, and actionable.`
  }

  private buildTaskBreakdownPrompt(context: PMContext): string {
    return `Break down the project into manageable tasks: ${context.userInput || 'the specified project'}

## Breakdown Requirements:
- Project Type: ${context.projectType || 'Software Development'}
- Team Size: ${context.teamSize || 'Medium (5-10 people)'}
- Timeline: ${context.timeline || '6 months'}
- Methodology: ${this.pmConfig.projectMethodology}

## Task Breakdown Framework:
1. **High-Level Tasks**: Major project phases and activities
2. **Detailed Tasks**: Specific, actionable tasks
3. **Task Dependencies**: Task relationships and dependencies
4. **Resource Allocation**: Task assignments and resource requirements
5. **Timeline**: Task durations and scheduling
6. **Acceptance Criteria**: Task completion criteria
7. **Risk Identification**: Task-related risks and mitigation

## Output Format:
- Use structured markdown with clear headings
- Include task hierarchy and dependencies
- Provide resource allocation details
- Include timeline and scheduling information
- Document acceptance criteria for each task
- Identify risks and mitigation strategies

Ensure tasks are specific, measurable, achievable, relevant, and time-bound (SMART).`
  }

  private buildResourcePlanningPrompt(context: PMContext): string {
    return `Plan and allocate resources for: ${context.userInput || 'the specified project'}

## Resource Planning Requirements:
- Project Type: ${context.projectType || 'Software Development'}
- Team Size: ${context.teamSize || 'Medium (5-10 people)'}
- Timeline: ${context.timeline || '6 months'}
- Budget: ${context.options?.budget || 'To be determined'}

## Resource Planning Framework:
1. **Team Planning**: Roles, skills, and availability
2. **Budget Planning**: Cost estimates and budget allocation
3. **Equipment Planning**: Hardware, software, and tools
4. **Facility Planning**: Office space, meeting rooms, and infrastructure
5. **External Resources**: Vendors, consultants, and contractors
6. **Resource Optimization**: Efficient resource utilization
7. **Resource Monitoring**: Resource tracking and management

## Output Format:
- Use structured markdown with clear headings
- Include detailed resource requirements
- Provide cost estimates and budget breakdown
- Include resource allocation timeline
- Document resource dependencies and constraints
- Provide resource monitoring and management strategy

Ensure resource planning is realistic and aligned with project requirements.`
  }

  private buildRiskManagementPrompt(context: PMContext): string {
    return `Identify and manage risks for: ${context.userInput || 'the specified project'}

## Risk Management Requirements:
- Project Type: ${context.projectType || 'Software Development'}
- Team Size: ${context.teamSize || 'Medium (5-10 people)'}
- Timeline: ${context.timeline || '6 months'}
- Risk Tolerance: ${context.options?.riskTolerance || 'Medium'}

## Risk Management Framework:
1. **Risk Identification**: Identify potential project risks
2. **Risk Analysis**: Assess probability and impact
3. **Risk Prioritization**: Rank risks by importance
4. **Risk Mitigation**: Develop mitigation strategies
5. **Contingency Planning**: Create contingency plans
6. **Risk Monitoring**: Monitor and track risks
7. **Risk Communication**: Communicate risks to stakeholders

## Output Format:
- Use structured markdown with clear headings
- Include comprehensive risk register
- Provide risk analysis and prioritization
- Include mitigation strategies and contingency plans
- Document risk monitoring and communication plan
- Provide risk management tools and processes

Ensure risk management is proactive and comprehensive.`
  }

  private buildTimelineManagementPrompt(context: PMContext): string {
    return `Create project timeline and schedule for: ${context.userInput || 'the specified project'}

## Timeline Requirements:
- Project Type: ${context.projectType || 'Software Development'}
- Team Size: ${context.teamSize || 'Medium (5-10 people)'}
- Timeline: ${context.timeline || '6 months'}
- Methodology: ${this.pmConfig.projectMethodology}

## Timeline Management Framework:
1. **Project Phases**: Major project phases and milestones
2. **Task Scheduling**: Detailed task scheduling and dependencies
3. **Critical Path**: Identify critical path and bottlenecks
4. **Resource Scheduling**: Resource allocation and availability
5. **Buffer Management**: Buffer time and contingency planning
6. **Timeline Monitoring**: Progress tracking and timeline updates
7. **Timeline Communication**: Stakeholder communication and reporting

## Output Format:
- Use structured markdown with clear headings
- Include project timeline and Gantt charts
- Provide detailed task scheduling
- Include critical path analysis
- Document resource scheduling and allocation
- Provide timeline monitoring and communication plan

Ensure timeline is realistic and achievable.`
  }

  private buildStakeholderManagementPrompt(context: PMContext): string {
    return `Manage stakeholders for: ${context.userInput || 'the specified project'}

## Stakeholder Management Requirements:
- Project Type: ${context.projectType || 'Software Development'}
- Team Size: ${context.teamSize || 'Medium (5-10 people)'}
- Stakeholder Count: ${context.options?.stakeholderCount || '10-20 stakeholders'}

## Stakeholder Management Framework:
1. **Stakeholder Identification**: Identify all project stakeholders
2. **Stakeholder Analysis**: Analyze stakeholder interests and influence
3. **Communication Planning**: Plan stakeholder communication
4. **Expectation Management**: Manage stakeholder expectations
5. **Engagement Strategy**: Develop stakeholder engagement strategy
6. **Conflict Resolution**: Handle stakeholder conflicts
7. **Stakeholder Reporting**: Regular stakeholder updates and reporting

## Output Format:
- Use structured markdown with clear headings
- Include stakeholder register and analysis
- Provide communication plan and strategy
- Include expectation management approach
- Document engagement and conflict resolution strategies
- Provide stakeholder reporting and feedback mechanisms

Ensure stakeholder management is comprehensive and effective.`
  }

  private buildQualityPlanningPrompt(context: PMContext): string {
    return `Plan quality assurance for: ${context.userInput || 'the specified project'}

## Quality Planning Requirements:
- Project Type: ${context.projectType || 'Software Development'}
- Team Size: ${context.teamSize || 'Medium (5-10 people)'}
- Quality Standards: ${context.options?.qualityStandards || 'Industry standard'}

## Quality Planning Framework:
1. **Quality Standards**: Define quality standards and criteria
2. **Quality Processes**: Establish quality processes and procedures
3. **Quality Tools**: Select quality tools and techniques
4. **Quality Reviews**: Plan quality reviews and inspections
5. **Testing Strategy**: Develop testing strategy and plan
6. **Quality Metrics**: Define quality metrics and KPIs
7. **Quality Monitoring**: Monitor and track quality performance

## Output Format:
- Use structured markdown with clear headings
- Include quality standards and criteria
- Provide quality processes and procedures
- Include quality tools and techniques
- Document quality reviews and testing strategy
- Provide quality metrics and monitoring plan

Ensure quality planning is comprehensive and aligned with project requirements.`
  }

  private buildProgressTrackingPrompt(context: PMContext): string {
    return `Track and monitor progress for: ${context.userInput || 'the specified project'}

## Progress Tracking Requirements:
- Project Type: ${context.projectType || 'Software Development'}
- Team Size: ${context.teamSize || 'Medium (5-10 people)'}
- Tracking Frequency: ${context.options?.trackingFrequency || 'Weekly'}

## Progress Tracking Framework:
1. **Progress Metrics**: Define progress metrics and KPIs
2. **Tracking Tools**: Select progress tracking tools and systems
3. **Reporting Schedule**: Establish reporting schedule and frequency
4. **Progress Reviews**: Plan progress reviews and meetings
5. **Issue Management**: Track and manage project issues
6. **Change Management**: Handle project changes and updates
7. **Progress Communication**: Communicate progress to stakeholders

## Output Format:
- Use structured markdown with clear headings
- Include progress metrics and KPIs
- Provide tracking tools and systems
- Include reporting schedule and templates
- Document progress reviews and issue management
- Provide progress communication and stakeholder updates

Ensure progress tracking is effective and provides valuable insights.`
  }

  private buildBudgetPlanningPrompt(context: PMContext): string {
    return `Create budget and cost estimates for: ${context.userInput || 'the specified project'}

## Budget Planning Requirements:
- Project Type: ${context.projectType || 'Software Development'}
- Team Size: ${context.teamSize || 'Medium (5-10 people)'}
- Timeline: ${context.timeline || '6 months'}
- Budget Range: ${context.options?.budgetRange || 'To be determined'}

## Budget Planning Framework:
1. **Cost Categories**: Define cost categories and breakdown
2. **Resource Costs**: Calculate team and resource costs
3. **Equipment Costs**: Estimate equipment and tool costs
4. **Facility Costs**: Calculate facility and infrastructure costs
5. **External Costs**: Estimate external vendor and contractor costs
6. **Contingency Planning**: Plan for contingencies and risks
7. **Budget Monitoring**: Monitor and track budget performance

## Output Format:
- Use structured markdown with clear headings
- Include detailed cost breakdown and estimates
- Provide budget allocation and distribution
- Include contingency planning and risk reserves
- Document budget monitoring and control processes
- Provide budget reporting and communication plan

Ensure budget planning is accurate and comprehensive.`
  }

  private buildCommunicationPlanningPrompt(context: PMContext): string {
    return `Plan communication strategy for: ${context.userInput || 'the specified project'}

## Communication Planning Requirements:
- Project Type: ${context.projectType || 'Software Development'}
- Team Size: ${context.teamSize || 'Medium (5-10 people)'}
- Stakeholder Count: ${context.options?.stakeholderCount || '10-20 stakeholders'}

## Communication Planning Framework:
1. **Communication Channels**: Define communication channels and tools
2. **Meeting Schedule**: Plan regular meetings and reviews
3. **Reporting Structure**: Establish reporting structure and frequency
4. **Stakeholder Communication**: Plan stakeholder communication
5. **Issue Escalation**: Define issue escalation and resolution process
6. **Communication Tools**: Select communication tools and platforms
7. **Communication Monitoring**: Monitor and track communication effectiveness

## Output Format:
- Use structured markdown with clear headings
- Include communication channels and tools
- Provide meeting schedule and agenda templates
- Include reporting structure and templates
- Document stakeholder communication plan
- Provide issue escalation and resolution process

Ensure communication planning is comprehensive and effective.`
  }

  // Response parsing methods
  private parseProjectPlanResponse(response: string): ProjectPlan {
    return {
      title: 'Project Plan',
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
      timeline: {
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        phases: [],
        criticalPath: [],
        buffer: '10%',
        holidays: []
      },
      resources: {
        team: [],
        budget: 0,
        equipment: [],
        tools: [],
        facilities: [],
        external: []
      },
      risks: {
        risks: [],
        mitigation: [],
        contingency: [],
        monitoring: []
      },
      deliverables: [],
      milestones: [],
      budget: {
        total: 0,
        phases: [],
        categories: [],
        contingency: 0,
        currency: 'USD'
      },
      quality: {
        standards: [],
        processes: [],
        tools: [],
        reviews: [],
        testing: {
          types: [],
          coverage: 80,
          tools: [],
          schedule: [],
          criteria: []
        },
        metrics: []
      },
      communication: {
        stakeholders: [],
        channels: [],
        meetings: [],
        reports: [],
        escalation: []
      },
      metadata: {
        planType: 'Project Plan',
        timestamp: new Date().toISOString(),
        complexity: 'medium',
        estimatedDuration: '6 months'
      }
    }
  }

  private parseTaskBreakdownResponse(response: string): TaskBreakdown {
    return {
      title: 'Task Breakdown',
      description: response.substring(0, 200) + '...',
      tasks: [],
      dependencies: [],
      resources: [],
      timeline: {
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        duration: '6 months',
        criticalPath: [],
        buffer: '10%'
      },
      metadata: {
        breakdownType: 'Task Breakdown',
        timestamp: new Date().toISOString(),
        complexity: 'medium'
      }
    }
  }

  // Output formatting methods
  private formatProjectPlanOutput(plan: ProjectPlan): string {
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

## Timeline
- **Start Date**: ${plan.timeline.startDate}
- **End Date**: ${plan.timeline.endDate}
- **Buffer**: ${plan.timeline.buffer}

## Resources
- **Team Size**: ${plan.resources.team.length} members
- **Budget**: $${plan.resources.budget.toLocaleString()}

## Risks
${plan.risks.risks.map(risk => `### ${risk.title}
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

## Milestones
${plan.milestones.map(milestone => `### ${milestone.name}
- **Date**: ${milestone.date}
- **Owner**: ${milestone.owner}
`).join('\n')}
`
  }

  private formatTaskBreakdownOutput(breakdown: TaskBreakdown): string {
    return `# ${breakdown.title}

## Overview
${breakdown.description}

## Tasks
${breakdown.tasks.map(task => `### ${task.name}
- **Type**: ${task.type}
- **Priority**: ${task.priority}
- **Effort**: ${task.effort}
- **Owner**: ${task.owner}
`).join('\n')}

## Timeline
- **Start Date**: ${breakdown.timeline.startDate}
- **End Date**: ${breakdown.timeline.endDate}
- **Duration**: ${breakdown.timeline.duration}
- **Buffer**: ${breakdown.timeline.buffer}

## Dependencies
${breakdown.dependencies.map(dep => `- ${dep.from} → ${dep.to} (${dep.type})`).join('\n')}
`
  }

  // Public API methods
  getAvailableCommands(): string[] {
    return Array.from(this.commands.keys())
  }

  getCommandDescription(commandName: string): string | undefined {
    return this.commands.get(commandName)?.description
  }

  updateConfig(newConfig: Partial<PMConfigType>): void {
    this.pmConfig = { ...this.pmConfig, ...newConfig }
  }

  getConfig(): PMConfigType {
    return { ...this.pmConfig }
  }
}
