import { BaseAgentImpl, AgentContext, AgentResponse } from '@osmanekrem/bmad-core'
import { 
  SMCommand, 
  SMContext, 
  SMResponse, 
  SprintPlan,
  Retrospective,
  DailyStandup,
  BacklogRefinement,
  TeamCoaching,
  SMConfig as SMConfigType
} from './types/index.js'

export class SMAgent extends BaseAgentImpl {
  private smConfig: SMConfigType
  private commands: Map<string, SMCommand> = new Map()

  constructor(config?: Partial<SMConfigType>) {
    super({
      systemPrompt: `You are the BMad SM (Scrum Master), an AI-driven agile coaching and team facilitation specialist. Your role is to:

1. **Sprint Planning**: Facilitate sprint planning and backlog refinement
2. **Ceremony Facilitation**: Lead daily standups, retrospectives, and reviews
3. **Team Coaching**: Coach teams on agile practices and continuous improvement
4. **Impediment Removal**: Identify and remove team blockers and impediments
5. **Process Improvement**: Continuously improve team processes and practices
6. **Stakeholder Management**: Manage stakeholder communication and expectations
7. **Metrics & Reporting**: Track and report team performance metrics
8. **Conflict Resolution**: Resolve team conflicts and improve collaboration
9. **Agile Training**: Provide agile training and knowledge sharing
10. **Team Building**: Foster team collaboration and psychological safety

## Core Principles:
- **Servant Leadership**: Serve the team and remove impediments
- **Continuous Improvement**: Always seek to improve processes and practices
- **Transparency**: Maintain transparency in all team activities
- **Inspection & Adaptation**: Regularly inspect and adapt team practices
- **Empowerment**: Empower teams to self-organize and make decisions
- **Value Delivery**: Focus on delivering value to customers

## Agile Framework:
1. **Sprint Planning**: Plan sprints and define sprint goals
2. **Daily Standups**: Facilitate daily team synchronization
3. **Sprint Review**: Review completed work with stakeholders
4. **Retrospectives**: Reflect on team performance and improve
5. **Backlog Refinement**: Keep product backlog healthy and ready
6. **Coaching**: Coach teams on agile practices and mindset

## Ceremonies:
- **Sprint Planning**: Plan upcoming sprint work
- **Daily Standup**: Daily team synchronization
- **Sprint Review**: Demonstrate completed work
- **Retrospective**: Reflect and improve team practices
- **Backlog Refinement**: Groom and prioritize backlog items

## Output Format:
- Use structured markdown with clear headings
- Include actionable recommendations and next steps
- Provide team coaching insights and observations
- Include metrics and performance indicators
- Document process improvements and action items
- Include stakeholder communication templates

Always focus on team empowerment, continuous improvement, and value delivery.`
    })

    this.smConfig = {
      defaultOutputFormat: 'markdown',
      sprintDuration: 2,
      teamSize: 'medium',
      agileFramework: 'scrum',
      ceremonies: ['sprint-planning', 'daily-standup', 'sprint-review', 'retrospective', 'backlog-refinement'],
      tools: ['jira', 'confluence', 'slack', 'zoom'],
      autoSave: true,
      templates: {
        planning: ['sprint-plan-tmpl'],
        ceremonies: ['ceremony-tmpl'],
        coaching: ['coaching-tmpl'],
        retrospectives: ['retrospective-tmpl']
      },
      ...config
    }

    this.initializeCommands()
  }

  // Implement abstract method from BaseAgentImpl
  async execute(command: string, context: AgentContext): Promise<AgentResponse> {
    // This method is required by BaseAgentImpl but not used in SMAgent
    // We use executeCommand instead
    throw new Error('Use executeCommand method instead of execute')
  }

  private initializeCommands(): void {
    // Sprint Planning Command
    this.commands.set('plan-sprint', {
      name: 'plan-sprint',
      description: 'Plan upcoming sprint with user stories and tasks',
      execute: async (context) => this.executeSprintPlanning(context)
    })

    // Daily Standup Command
    this.commands.set('facilitate-standup', {
      name: 'facilitate-standup',
      description: 'Facilitate daily standup meeting',
      execute: async (context) => this.executeDailyStandup(context)
    })

    // Sprint Review Command
    this.commands.set('conduct-sprint-review', {
      name: 'conduct-sprint-review',
      description: 'Conduct sprint review and demo',
      execute: async (context) => this.executeSprintReview(context)
    })

    // Retrospective Command
    this.commands.set('facilitate-retrospective', {
      name: 'facilitate-retrospective',
      description: 'Facilitate sprint retrospective',
      execute: async (context) => this.executeRetrospective(context)
    })

    // Backlog Refinement Command
    this.commands.set('refine-backlog', {
      name: 'refine-backlog',
      description: 'Refine product backlog and user stories',
      execute: async (context) => this.executeBacklogRefinement(context)
    })

    // Team Coaching Command
    this.commands.set('coach-team', {
      name: 'coach-team',
      description: 'Coach team on agile practices and continuous improvement',
      execute: async (context) => this.executeTeamCoaching(context)
    })

    // Impediment Removal Command
    this.commands.set('remove-impediments', {
      name: 'remove-impediments',
      description: 'Identify and remove team impediments and blockers',
      execute: async (context) => this.executeImpedimentRemoval(context)
    })

    // Process Improvement Command
    this.commands.set('improve-processes', {
      name: 'improve-processes',
      description: 'Improve team processes and practices',
      execute: async (context) => this.executeProcessImprovement(context)
    })

    // Metrics & Reporting Command
    this.commands.set('track-metrics', {
      name: 'track-metrics',
      description: 'Track and report team performance metrics',
      execute: async (context) => this.executeMetricsTracking(context)
    })

    // Conflict Resolution Command
    this.commands.set('resolve-conflicts', {
      name: 'resolve-conflicts',
      description: 'Resolve team conflicts and improve collaboration',
      execute: async (context) => this.executeConflictResolution(context)
    })
  }

  async executeCommand(commandName: string, context: SMContext): Promise<SMResponse> {
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

  private async executeSprintPlanning(context: SMContext): Promise<SMResponse> {
    const prompt = this.buildSprintPlanningPrompt(context)
    const response = await this.callAI(prompt)
    
    const sprintPlan: SprintPlan = this.parseSprintPlanResponse(response)
    
    return {
      success: true,
      data: sprintPlan,
      output: this.formatSprintPlanOutput(sprintPlan),
      metadata: {
        command: 'plan-sprint',
        timestamp: new Date().toISOString(),
        template: 'sprint-plan-tmpl'
      }
    }
  }

  private async executeDailyStandup(context: SMContext): Promise<SMResponse> {
    const prompt = this.buildDailyStandupPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'facilitate-standup',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeSprintReview(context: SMContext): Promise<SMResponse> {
    const prompt = this.buildSprintReviewPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'conduct-sprint-review',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeRetrospective(context: SMContext): Promise<SMResponse> {
    const prompt = this.buildRetrospectivePrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'facilitate-retrospective',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeBacklogRefinement(context: SMContext): Promise<SMResponse> {
    const prompt = this.buildBacklogRefinementPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'refine-backlog',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeTeamCoaching(context: SMContext): Promise<SMResponse> {
    const prompt = this.buildTeamCoachingPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'coach-team',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeImpedimentRemoval(context: SMContext): Promise<SMResponse> {
    const prompt = this.buildImpedimentRemovalPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'remove-impediments',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeProcessImprovement(context: SMContext): Promise<SMResponse> {
    const prompt = this.buildProcessImprovementPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'improve-processes',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeMetricsTracking(context: SMContext): Promise<SMResponse> {
    const prompt = this.buildMetricsTrackingPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'track-metrics',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeConflictResolution(context: SMContext): Promise<SMResponse> {
    const prompt = this.buildConflictResolutionPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'resolve-conflicts',
        timestamp: new Date().toISOString()
      }
    }
  }

  // Prompt building methods
  private buildSprintPlanningPrompt(context: SMContext): string {
    return `Plan a sprint for: ${context.userInput || 'the specified project'}

## Sprint Planning Requirements:
- Sprint Duration: ${this.smConfig.sprintDuration} weeks
- Team Size: ${this.smConfig.teamSize}
- Agile Framework: ${this.smConfig.agileFramework}
- Team Capacity: ${context.options?.teamCapacity || 'To be determined'}

## Sprint Planning Framework:
1. **Sprint Goal**: Define clear sprint goal and objectives
2. **User Stories**: Select and prioritize user stories for the sprint
3. **Task Breakdown**: Break down user stories into actionable tasks
4. **Capacity Planning**: Plan team capacity and availability
5. **Ceremonies**: Schedule sprint ceremonies and meetings
6. **Risks & Dependencies**: Identify and plan for risks and dependencies
7. **Deliverables**: Define sprint deliverables and acceptance criteria
8. **Metrics**: Plan sprint metrics and success criteria

## Output Format:
- Use structured markdown with clear headings
- Include detailed user stories with acceptance criteria
- Provide task breakdown and assignments
- Include capacity planning and availability
- Document risks and mitigation strategies
- Include sprint ceremonies and schedule

Ensure the sprint plan is realistic, achievable, and aligned with team capacity.`
  }

  private buildDailyStandupPrompt(context: SMContext): string {
    return `Facilitate a daily standup for: ${context.userInput || 'the development team'}

## Daily Standup Requirements:
- Team Size: ${this.smConfig.teamSize}
- Format: ${context.options?.format || 'Traditional (yesterday, today, blockers)'}
- Duration: ${context.options?.duration || '15 minutes'}
- Participants: ${context.options?.participants || 'Development team'}

## Daily Standup Framework:
1. **Meeting Structure**: Define standup format and agenda
2. **Team Updates**: Collect yesterday, today, and blockers from each member
3. **Impediment Identification**: Identify and address blockers
4. **Decision Making**: Make quick decisions and assign action items
5. **Follow-up**: Plan follow-up actions and meetings
6. **Metrics**: Track standup effectiveness and participation

## Output Format:
- Use structured markdown with clear headings
- Include standup agenda and format
- Provide team update templates
- Include impediment tracking and resolution
- Document decisions and action items
- Include follow-up and next steps

Ensure the standup is focused, time-boxed, and productive.`
  }

  private buildSprintReviewPrompt(context: SMContext): string {
    return `Conduct a sprint review for: ${context.userInput || 'the completed sprint'}

## Sprint Review Requirements:
- Sprint Duration: ${this.smConfig.sprintDuration} weeks
- Team Size: ${this.smConfig.teamSize}
- Stakeholders: ${context.options?.stakeholders || 'Product Owner, stakeholders, team'}
- Format: ${context.options?.format || 'Demo and discussion'}

## Sprint Review Framework:
1. **Sprint Summary**: Review sprint goal and achievements
2. **Demo Preparation**: Prepare demonstrations of completed work
3. **Stakeholder Feedback**: Collect feedback from stakeholders
4. **Metrics Review**: Review sprint metrics and performance
5. **Lessons Learned**: Identify lessons learned and improvements
6. **Next Sprint Planning**: Prepare for next sprint planning

## Output Format:
- Use structured markdown with clear headings
- Include sprint summary and achievements
- Provide demo preparation guidelines
- Include stakeholder feedback collection
- Document metrics and performance review
- Include lessons learned and next steps

Ensure the sprint review is engaging and provides value to stakeholders.`
  }

  private buildRetrospectivePrompt(context: SMContext): string {
    return `Facilitate a retrospective for: ${context.userInput || 'the completed sprint'}

## Retrospective Requirements:
- Sprint Duration: ${this.smConfig.sprintDuration} weeks
- Team Size: ${this.smConfig.teamSize}
- Format: ${context.options?.format || 'Start-Stop-Continue'}
- Duration: ${context.options?.duration || '60 minutes'}

## Retrospective Framework:
1. **Retrospective Format**: Choose appropriate retrospective format
2. **Data Gathering**: Collect team feedback and insights
3. **Insights Generation**: Generate insights and patterns
4. **Action Planning**: Create actionable improvement items
5. **Follow-up**: Plan follow-up and accountability
6. **Metrics**: Track retrospective effectiveness

## Output Format:
- Use structured markdown with clear headings
- Include retrospective format and agenda
- Provide data gathering techniques
- Include insights generation and analysis
- Document action items and ownership
- Include follow-up and accountability

Ensure the retrospective is safe, productive, and leads to real improvements.`
  }

  private buildBacklogRefinementPrompt(context: SMContext): string {
    return `Refine the product backlog for: ${context.userInput || 'the product'}

## Backlog Refinement Requirements:
- Team Size: ${this.smConfig.teamSize}
- Format: ${context.options?.format || 'Comprehensive grooming'}
- Duration: ${context.options?.duration || '2 hours'}
- Participants: ${context.options?.participants || 'Product Owner, team, stakeholders'}

## Backlog Refinement Framework:
1. **Backlog Health**: Assess current backlog health and readiness
2. **User Story Refinement**: Refine user stories and acceptance criteria
3. **Estimation**: Estimate user stories using story points or t-shirt sizes
4. **Prioritization**: Prioritize user stories based on value and effort
5. **Dependencies**: Identify and manage story dependencies
6. **Sprint Readiness**: Ensure stories are ready for sprint planning

## Output Format:
- Use structured markdown with clear headings
- Include backlog health assessment
- Provide user story refinement guidelines
- Include estimation techniques and practices
- Document prioritization criteria and methods
- Include dependency management and sprint readiness

Ensure the backlog is healthy, prioritized, and ready for sprint planning.`
  }

  private buildTeamCoachingPrompt(context: SMContext): string {
    return `Coach the team on: ${context.userInput || 'agile practices and continuous improvement'}

## Team Coaching Requirements:
- Team Size: ${this.smConfig.teamSize}
- Focus Areas: ${context.options?.focusAreas || 'Agile practices, collaboration, continuous improvement'}
- Duration: ${context.options?.duration || 'Ongoing'}
- Participants: ${context.options?.participants || 'Development team'}

## Team Coaching Framework:
1. **Assessment**: Assess current team practices and maturity
2. **Coaching Plan**: Create coaching plan and objectives
3. **Skill Development**: Develop team skills and capabilities
4. **Process Improvement**: Improve team processes and practices
5. **Culture Building**: Build collaborative and learning culture
6. **Metrics**: Track coaching effectiveness and team improvement

## Output Format:
- Use structured markdown with clear headings
- Include team assessment and current state
- Provide coaching plan and objectives
- Include skill development activities
- Document process improvements
- Include culture building and metrics

Ensure coaching is targeted, effective, and leads to team improvement.`
  }

  private buildImpedimentRemovalPrompt(context: SMContext): string {
    return `Remove impediments for: ${context.userInput || 'the development team'}

## Impediment Removal Requirements:
- Team Size: ${this.smConfig.teamSize}
- Impediment Types: ${context.options?.impedimentTypes || 'All types'}
- Priority: ${context.options?.priority || 'High priority'}
- Escalation: ${context.options?.escalation || 'As needed'}

## Impediment Removal Framework:
1. **Impediment Identification**: Identify current impediments and blockers
2. **Impact Assessment**: Assess impact and urgency of impediments
3. **Resolution Planning**: Plan resolution strategies and actions
4. **Escalation**: Escalate impediments that cannot be resolved at team level
5. **Follow-up**: Follow up on resolution progress and effectiveness
6. **Prevention**: Implement measures to prevent future impediments

## Output Format:
- Use structured markdown with clear headings
- Include impediment identification and assessment
- Provide resolution strategies and actions
- Include escalation procedures and contacts
- Document follow-up and progress tracking
- Include prevention measures and best practices

Ensure impediments are resolved quickly and effectively.`
  }

  private buildProcessImprovementPrompt(context: SMContext): string {
    return `Improve processes for: ${context.userInput || 'the development team'}

## Process Improvement Requirements:
- Team Size: ${this.smConfig.teamSize}
- Focus Areas: ${context.options?.focusAreas || 'Sprint planning, ceremonies, collaboration'}
- Approach: ${context.options?.approach || 'Continuous improvement'}
- Duration: ${context.options?.duration || 'Ongoing'}

## Process Improvement Framework:
1. **Current State Assessment**: Assess current processes and practices
2. **Improvement Opportunities**: Identify improvement opportunities
3. **Improvement Planning**: Plan process improvements and changes
4. **Implementation**: Implement process improvements
5. **Monitoring**: Monitor improvement effectiveness
6. **Continuous Improvement**: Establish continuous improvement culture

## Output Format:
- Use structured markdown with clear headings
- Include current state assessment
- Provide improvement opportunities and priorities
- Include implementation plan and timeline
- Document monitoring and measurement
- Include continuous improvement practices

Ensure process improvements are practical and lead to real benefits.`
  }

  private buildMetricsTrackingPrompt(context: SMContext): string {
    return `Track metrics for: ${context.userInput || 'the development team'}

## Metrics Tracking Requirements:
- Team Size: ${this.smConfig.teamSize}
- Metrics Types: ${context.options?.metricsTypes || 'All metrics'}
- Frequency: ${context.options?.frequency || 'Weekly'}
- Reporting: ${context.options?.reporting || 'Team and stakeholders'}

## Metrics Tracking Framework:
1. **Metrics Selection**: Select relevant team and process metrics
2. **Data Collection**: Collect metrics data and information
3. **Analysis**: Analyze metrics and identify trends
4. **Reporting**: Create metrics reports and dashboards
5. **Action Planning**: Plan actions based on metrics insights
6. **Continuous Improvement**: Use metrics for continuous improvement

## Output Format:
- Use structured markdown with clear headings
- Include metrics selection and rationale
- Provide data collection methods
- Include analysis and insights
- Document reporting and dashboards
- Include action planning and improvement

Ensure metrics are meaningful and drive team improvement.`
  }

  private buildConflictResolutionPrompt(context: SMContext): string {
    return `Resolve conflicts for: ${context.userInput || 'the development team'}

## Conflict Resolution Requirements:
- Team Size: ${this.smConfig.teamSize}
- Conflict Types: ${context.options?.conflictTypes || 'All types'}
- Approach: ${context.options?.approach || 'Collaborative resolution'}
- Escalation: ${context.options?.escalation || 'As needed'}

## Conflict Resolution Framework:
1. **Conflict Identification**: Identify conflicts and their root causes
2. **Impact Assessment**: Assess impact on team and project
3. **Resolution Planning**: Plan conflict resolution strategies
4. **Facilitation**: Facilitate conflict resolution discussions
5. **Follow-up**: Follow up on resolution and team dynamics
6. **Prevention**: Implement measures to prevent future conflicts

## Output Format:
- Use structured markdown with clear headings
- Include conflict identification and assessment
- Provide resolution strategies and techniques
- Include facilitation guidelines and approaches
- Document follow-up and monitoring
- Include prevention measures and best practices

Ensure conflicts are resolved constructively and team dynamics improve.`
  }

  // Response parsing methods
  private parseSprintPlanResponse(response: string): SprintPlan {
    return {
      title: 'Sprint Plan',
      description: response.substring(0, 200) + '...',
      sprintNumber: 1,
      duration: this.smConfig.sprintDuration,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + this.smConfig.sprintDuration * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      goal: 'Sprint goal to be defined',
      objectives: [],
      userStories: [],
      tasks: [],
      capacity: {
        totalCapacity: 0,
        individualCapacity: [],
        timeOff: [],
        holidays: [],
        buffer: 0,
        utilization: 0
      },
      ceremonies: [],
      risks: [],
      dependencies: [],
      deliverables: [],
      metrics: {
        plannedVelocity: 0,
        actualVelocity: 0,
        burndown: [],
        burnup: [],
        cycleTime: 0,
        leadTime: 0,
        throughput: 0,
        workInProgress: 0,
        blockedItems: 0,
        completedItems: 0,
        scopeChanges: 0,
        quality: {
          defectRate: 0,
          escapeRate: 0,
          reworkRate: 0,
          testCoverage: 0,
          codeQuality: 0,
          customerSatisfaction: 0
        }
      },
      metadata: {
        planType: 'Sprint Plan',
        timestamp: new Date().toISOString(),
        complexity: 'medium',
        estimatedVelocity: 0
      }
    }
  }

  // Output formatting methods
  private formatSprintPlanOutput(plan: SprintPlan): string {
    return `# ${plan.title}

## Sprint Overview
- **Sprint Number**: ${plan.sprintNumber}
- **Duration**: ${plan.duration} weeks
- **Start Date**: ${plan.startDate}
- **End Date**: ${plan.endDate}
- **Goal**: ${plan.goal}

## Objectives
${plan.objectives.map(obj => `- ${obj}`).join('\n')}

## User Stories
${plan.userStories.map(story => `### ${story.title}
- **Points**: ${story.storyPoints}
- **Priority**: ${story.priority}
- **Status**: ${story.status}
- **Assignee**: ${story.assignee}
`).join('\n')}

## Tasks
${plan.tasks.map(task => `### ${task.title}
- **Type**: ${task.type}
- **Status**: ${task.status}
- **Assignee**: ${task.assignee}
- **Estimated Hours**: ${task.estimatedHours}
`).join('\n')}

## Capacity
- **Total Capacity**: ${plan.capacity.totalCapacity} hours
- **Utilization**: ${plan.capacity.utilization}%
- **Buffer**: ${plan.capacity.buffer}%

## Ceremonies
${plan.ceremonies.map(ceremony => `### ${ceremony.name}
- **Type**: ${ceremony.type}
- **Frequency**: ${ceremony.frequency}
- **Duration**: ${ceremony.duration} minutes
`).join('\n')}

## Risks
${plan.risks.map(risk => `### ${risk.title}
- **Probability**: ${risk.probability}
- **Impact**: ${risk.impact}
- **Category**: ${risk.category}
- **Owner**: ${risk.owner}
`).join('\n')}

## Deliverables
${plan.deliverables.map(deliverable => `### ${deliverable.name}
- **Type**: ${deliverable.type}
- **Status**: ${deliverable.status}
- **Owner**: ${deliverable.owner}
- **Due Date**: ${deliverable.dueDate}
`).join('\n')}

## Metrics
### Velocity
- **Planned**: ${plan.metrics.plannedVelocity}
- **Actual**: ${plan.metrics.actualVelocity}

### Quality
- **Defect Rate**: ${plan.metrics.quality.defectRate}%
- **Test Coverage**: ${plan.metrics.quality.testCoverage}%
- **Customer Satisfaction**: ${plan.metrics.quality.customerSatisfaction}%
`
  }

  // Public API methods
  getAvailableCommands(): string[] {
    return Array.from(this.commands.keys())
  }

  getCommandDescription(commandName: string): string | undefined {
    return this.commands.get(commandName)?.description
  }

  updateConfig(newConfig: Partial<SMConfigType>): void {
    this.smConfig = { ...this.smConfig, ...newConfig }
  }

  getConfig(): SMConfigType {
    return { ...this.smConfig }
  }
}
