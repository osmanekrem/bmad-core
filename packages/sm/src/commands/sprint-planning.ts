import { SMAgent } from '../sm-agent.js'
import { SMContext, SprintPlan } from '../types/index.js'

export class SprintPlanningCommand {
  private agent: SMAgent

  constructor(agent: SMAgent) {
    this.agent = agent
  }

  async execute(context: SMContext): Promise<SprintPlan> {
    const prompt = this.buildPrompt(context)
    const response = await this.agent.execute('plan-sprint', { userInput: context.userInput || '' })
    
    return this.parseResponse(response.content, context)
  }

  private buildPrompt(context: SMContext): string {
    const { userInput, options } = context
    
    return `Plan a sprint for: ${userInput || 'the specified project'}

## Sprint Planning Requirements:
- Sprint Duration: ${context.options?.sprintDuration || '2'} weeks
- Team Size: ${context.teamSize || options?.teamSize || 'medium'}
- Agile Framework: ${options?.agileFramework || 'scrum'}
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

  private parseResponse(response: string, context: SMContext): SprintPlan {
    const lines = response.split('\n')
    
    const title = this.extractValue(lines, 'Title') || 'Sprint Plan'
    const description = this.extractValue(lines, 'Description') || response.substring(0, 200) + '...'
    const sprintNumber = parseInt(this.extractValue(lines, 'Sprint Number') || '1')
    const duration = parseInt(this.extractValue(lines, 'Duration') || '2')
    const goal = this.extractValue(lines, 'Goal') || 'Sprint goal to be defined'
    const objectives = this.extractList(lines, 'Objectives')
    
    const userStories = this.extractUserStories(lines)
    const tasks = this.extractTasks(lines)
    const capacity = this.extractCapacity(lines)
    const ceremonies = this.extractCeremonies(lines)
    const risks = this.extractRisks(lines)
    const dependencies = this.extractDependencies(lines)
    const deliverables = this.extractDeliverables(lines)
    const metrics = this.extractMetrics(lines)

    const startDate = new Date().toISOString().split('T')[0]
    const endDate = new Date(Date.now() + duration * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

    return {
      title,
      description,
      sprintNumber,
      duration,
      startDate,
      endDate,
      goal,
      objectives,
      userStories,
      tasks,
      capacity,
      ceremonies,
      risks,
      dependencies,
      deliverables,
      metrics,
      metadata: {
        planType: 'Sprint Plan',
        timestamp: new Date().toISOString(),
        complexity: 'medium',
        estimatedVelocity: metrics.plannedVelocity
      }
    }
  }

  private extractUserStories(lines: string[]): any[] {
    const stories: any[] = []
    let currentStory: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Story')) {
        if (currentStory) {
          stories.push(currentStory)
        }
        currentStory = {
          id: `US_${stories.length + 1}`,
          title: line.replace(/^###\s*/, '').replace(/\s*Story.*$/, ''),
          description: '',
          acceptanceCriteria: [],
          storyPoints: 0,
          priority: 'medium',
          status: 'backlog',
          assignee: '',
          epic: '',
          tags: [],
          dependencies: [],
          risks: [],
          testingNotes: [],
          definitionOfDone: []
        }
      } else if (currentStory) {
        if (line.includes('Description:')) {
          currentStory.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Points:')) {
          currentStory.storyPoints = parseInt(line.split('Points:')[1]?.trim() || '0')
        } else if (line.includes('Priority:')) {
          currentStory.priority = line.split('Priority:')[1]?.trim() || 'medium'
        } else if (line.includes('Status:')) {
          currentStory.status = line.split('Status:')[1]?.trim() || 'backlog'
        } else if (line.includes('Assignee:')) {
          currentStory.assignee = line.split('Assignee:')[1]?.trim() || ''
        } else if (line.includes('Epic:')) {
          currentStory.epic = line.split('Epic:')[1]?.trim() || ''
        } else if (line.includes('Tags:')) {
          currentStory.tags = this.extractListFromLine(line)
        } else if (line.includes('Dependencies:')) {
          currentStory.dependencies = this.extractListFromLine(line)
        } else if (line.includes('Risks:')) {
          currentStory.risks = this.extractListFromLine(line)
        } else if (line.includes('Testing Notes:')) {
          currentStory.testingNotes = this.extractListFromLine(line)
        } else if (line.includes('Definition of Done:')) {
          currentStory.definitionOfDone = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentStory) {
      stories.push(currentStory)
    }
    
    return stories
  }

  private extractTasks(lines: string[]): any[] {
    const tasks: any[] = []
    let currentTask: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Task')) {
        if (currentTask) {
          tasks.push(currentTask)
        }
        currentTask = {
          id: `TASK_${tasks.length + 1}`,
          title: line.replace(/^###\s*/, '').replace(/\s*Task.*$/, ''),
          description: '',
          userStoryId: '',
          type: 'development',
          status: 'todo',
          assignee: '',
          estimatedHours: 0,
          actualHours: 0,
          priority: 'medium',
          dependencies: [],
          blockers: [],
          notes: []
        }
      } else if (currentTask) {
        if (line.includes('Description:')) {
          currentTask.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('User Story ID:')) {
          currentTask.userStoryId = line.split('User Story ID:')[1]?.trim() || ''
        } else if (line.includes('Type:')) {
          currentTask.type = line.split('Type:')[1]?.trim() || 'development'
        } else if (line.includes('Status:')) {
          currentTask.status = line.split('Status:')[1]?.trim() || 'todo'
        } else if (line.includes('Assignee:')) {
          currentTask.assignee = line.split('Assignee:')[1]?.trim() || ''
        } else if (line.includes('Estimated Hours:')) {
          currentTask.estimatedHours = parseFloat(line.split('Estimated Hours:')[1]?.trim() || '0')
        } else if (line.includes('Actual Hours:')) {
          currentTask.actualHours = parseFloat(line.split('Actual Hours:')[1]?.trim() || '0')
        } else if (line.includes('Priority:')) {
          currentTask.priority = line.split('Priority:')[1]?.trim() || 'medium'
        } else if (line.includes('Dependencies:')) {
          currentTask.dependencies = this.extractListFromLine(line)
        } else if (line.includes('Blockers:')) {
          currentTask.blockers = this.extractListFromLine(line)
        } else if (line.includes('Notes:')) {
          currentTask.notes = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentTask) {
      tasks.push(currentTask)
    }
    
    return tasks
  }

  private extractCapacity(lines: string[]): any {
    return {
      totalCapacity: parseFloat(this.extractValue(lines, 'Total Capacity') || '0'),
      individualCapacity: this.extractIndividualCapacity(lines),
      timeOff: this.extractTimeOff(lines),
      holidays: this.extractHolidays(lines),
      buffer: parseFloat(this.extractValue(lines, 'Buffer') || '0'),
      utilization: parseFloat(this.extractValue(lines, 'Utilization') || '0')
    }
  }

  private extractIndividualCapacity(lines: string[]): any[] {
    const capacities: any[] = []
    let currentCapacity: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Member')) {
        if (currentCapacity) {
          capacities.push(currentCapacity)
        }
        currentCapacity = {
          member: line.replace(/^###\s*/, '').replace(/\s*Member.*$/, ''),
          role: '',
          capacity: 0,
          availability: 0,
          skills: [],
          currentLoad: 0
        }
      } else if (currentCapacity) {
        if (line.includes('Role:')) {
          currentCapacity.role = line.split('Role:')[1]?.trim() || ''
        } else if (line.includes('Capacity:')) {
          currentCapacity.capacity = parseFloat(line.split('Capacity:')[1]?.trim() || '0')
        } else if (line.includes('Availability:')) {
          currentCapacity.availability = parseFloat(line.split('Availability:')[1]?.trim() || '0')
        } else if (line.includes('Skills:')) {
          currentCapacity.skills = this.extractListFromLine(line)
        } else if (line.includes('Current Load:')) {
          currentCapacity.currentLoad = parseFloat(line.split('Current Load:')[1]?.trim() || '0')
        }
      }
    }
    
    if (currentCapacity) {
      capacities.push(currentCapacity)
    }
    
    return capacities
  }

  private extractTimeOff(lines: string[]): any[] {
    const timeOff: any[] = []
    let currentTimeOff: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Time Off')) {
        if (currentTimeOff) {
          timeOff.push(currentTimeOff)
        }
        currentTimeOff = {
          member: line.replace(/^###\s*/, '').replace(/\s*Time Off.*$/, ''),
          startDate: '',
          endDate: '',
          type: 'vacation',
          reason: ''
        }
      } else if (currentTimeOff) {
        if (line.includes('Start Date:')) {
          currentTimeOff.startDate = line.split('Start Date:')[1]?.trim() || ''
        } else if (line.includes('End Date:')) {
          currentTimeOff.endDate = line.split('End Date:')[1]?.trim() || ''
        } else if (line.includes('Type:')) {
          currentTimeOff.type = line.split('Type:')[1]?.trim() || 'vacation'
        } else if (line.includes('Reason:')) {
          currentTimeOff.reason = line.split('Reason:')[1]?.trim() || ''
        }
      }
    }
    
    if (currentTimeOff) {
      timeOff.push(currentTimeOff)
    }
    
    return timeOff
  }

  private extractHolidays(lines: string[]): any[] {
    const holidays: any[] = []
    let currentHoliday: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Holiday')) {
        if (currentHoliday) {
          holidays.push(currentHoliday)
        }
        currentHoliday = {
          date: line.replace(/^###\s*/, '').replace(/\s*Holiday.*$/, ''),
          name: '',
          type: 'national',
          description: ''
        }
      } else if (currentHoliday) {
        if (line.includes('Name:')) {
          currentHoliday.name = line.split('Name:')[1]?.trim() || ''
        } else if (line.includes('Type:')) {
          currentHoliday.type = line.split('Type:')[1]?.trim() || 'national'
        } else if (line.includes('Description:')) {
          currentHoliday.description = line.split('Description:')[1]?.trim() || ''
        }
      }
    }
    
    if (currentHoliday) {
      holidays.push(currentHoliday)
    }
    
    return holidays
  }

  private extractCeremonies(lines: string[]): any[] {
    const ceremonies: any[] = []
    let currentCeremony: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Ceremony')) {
        if (currentCeremony) {
          ceremonies.push(currentCeremony)
        }
        currentCeremony = {
          name: line.replace(/^###\s*/, '').replace(/\s*Ceremony.*$/, ''),
          type: 'sprint-planning',
          description: '',
          frequency: '',
          duration: 0,
          participants: [],
          agenda: [],
          outcomes: [],
          tools: [],
          schedule: {
            day: '',
            time: '',
            frequency: 'weekly',
            duration: 0,
            location: '',
            format: 'in-person'
          }
        }
      } else if (currentCeremony) {
        if (line.includes('Type:')) {
          currentCeremony.type = line.split('Type:')[1]?.trim() || 'sprint-planning'
        } else if (line.includes('Description:')) {
          currentCeremony.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Frequency:')) {
          currentCeremony.frequency = line.split('Frequency:')[1]?.trim() || ''
        } else if (line.includes('Duration:')) {
          currentCeremony.duration = parseInt(line.split('Duration:')[1]?.trim() || '0')
        } else if (line.includes('Participants:')) {
          currentCeremony.participants = this.extractListFromLine(line)
        } else if (line.includes('Agenda:')) {
          currentCeremony.agenda = this.extractListFromLine(line)
        } else if (line.includes('Outcomes:')) {
          currentCeremony.outcomes = this.extractListFromLine(line)
        } else if (line.includes('Tools:')) {
          currentCeremony.tools = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentCeremony) {
      ceremonies.push(currentCeremony)
    }
    
    return ceremonies
  }

  private extractRisks(lines: string[]): any[] {
    const risks: any[] = []
    let currentRisk: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Risk')) {
        if (currentRisk) {
          risks.push(currentRisk)
        }
        currentRisk = {
          id: `RISK_${risks.length + 1}`,
          title: line.replace(/^###\s*/, '').replace(/\s*Risk.*$/, ''),
          description: '',
          probability: 'medium',
          impact: 'medium',
          category: 'technical',
          owner: '',
          status: 'open',
          mitigation: [],
          contingency: [],
          escalation: []
        }
      } else if (currentRisk) {
        if (line.includes('Description:')) {
          currentRisk.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Probability:')) {
          currentRisk.probability = line.split('Probability:')[1]?.trim() || 'medium'
        } else if (line.includes('Impact:')) {
          currentRisk.impact = line.split('Impact:')[1]?.trim() || 'medium'
        } else if (line.includes('Category:')) {
          currentRisk.category = line.split('Category:')[1]?.trim() || 'technical'
        } else if (line.includes('Owner:')) {
          currentRisk.owner = line.split('Owner:')[1]?.trim() || ''
        } else if (line.includes('Status:')) {
          currentRisk.status = line.split('Status:')[1]?.trim() || 'open'
        } else if (line.includes('Mitigation:')) {
          currentRisk.mitigation = this.extractListFromLine(line)
        } else if (line.includes('Contingency:')) {
          currentRisk.contingency = this.extractListFromLine(line)
        } else if (line.includes('Escalation:')) {
          currentRisk.escalation = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentRisk) {
      risks.push(currentRisk)
    }
    
    return risks
  }

  private extractDependencies(lines: string[]): any[] {
    const dependencies: any[] = []
    let currentDependency: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Dependency')) {
        if (currentDependency) {
          dependencies.push(currentDependency)
        }
        currentDependency = {
          id: `DEP_${dependencies.length + 1}`,
          from: line.replace(/^###\s*/, '').replace(/\s*Dependency.*$/, ''),
          to: '',
          type: 'finish-to-start',
          description: '',
          owner: '',
          status: 'pending',
          dueDate: '',
          blockers: []
        }
      } else if (currentDependency) {
        if (line.includes('To:')) {
          currentDependency.to = line.split('To:')[1]?.trim() || ''
        } else if (line.includes('Type:')) {
          currentDependency.type = line.split('Type:')[1]?.trim() || 'finish-to-start'
        } else if (line.includes('Description:')) {
          currentDependency.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Owner:')) {
          currentDependency.owner = line.split('Owner:')[1]?.trim() || ''
        } else if (line.includes('Status:')) {
          currentDependency.status = line.split('Status:')[1]?.trim() || 'pending'
        } else if (line.includes('Due Date:')) {
          currentDependency.dueDate = line.split('Due Date:')[1]?.trim() || ''
        } else if (line.includes('Blockers:')) {
          currentDependency.blockers = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentDependency) {
      dependencies.push(currentDependency)
    }
    
    return dependencies
  }

  private extractDeliverables(lines: string[]): any[] {
    const deliverables: any[] = []
    let currentDeliverable: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Deliverable')) {
        if (currentDeliverable) {
          deliverables.push(currentDeliverable)
        }
        currentDeliverable = {
          id: `DEL_${deliverables.length + 1}`,
          name: line.replace(/^###\s*/, '').replace(/\s*Deliverable.*$/, ''),
          description: '',
          type: 'feature',
          status: 'planned',
          owner: '',
          dueDate: '',
          acceptanceCriteria: [],
          dependencies: [],
          testing: [],
          deployment: []
        }
      } else if (currentDeliverable) {
        if (line.includes('Description:')) {
          currentDeliverable.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Type:')) {
          currentDeliverable.type = line.split('Type:')[1]?.trim() || 'feature'
        } else if (line.includes('Status:')) {
          currentDeliverable.status = line.split('Status:')[1]?.trim() || 'planned'
        } else if (line.includes('Owner:')) {
          currentDeliverable.owner = line.split('Owner:')[1]?.trim() || ''
        } else if (line.includes('Due Date:')) {
          currentDeliverable.dueDate = line.split('Due Date:')[1]?.trim() || ''
        } else if (line.includes('Acceptance Criteria:')) {
          currentDeliverable.acceptanceCriteria = this.extractListFromLine(line)
        } else if (line.includes('Dependencies:')) {
          currentDeliverable.dependencies = this.extractListFromLine(line)
        } else if (line.includes('Testing:')) {
          currentDeliverable.testing = this.extractListFromLine(line)
        } else if (line.includes('Deployment:')) {
          currentDeliverable.deployment = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentDeliverable) {
      deliverables.push(currentDeliverable)
    }
    
    return deliverables
  }

  private extractMetrics(lines: string[]): any {
    return {
      plannedVelocity: parseFloat(this.extractValue(lines, 'Planned Velocity') || '0'),
      actualVelocity: parseFloat(this.extractValue(lines, 'Actual Velocity') || '0'),
      burndown: [],
      burnup: [],
      cycleTime: parseFloat(this.extractValue(lines, 'Cycle Time') || '0'),
      leadTime: parseFloat(this.extractValue(lines, 'Lead Time') || '0'),
      throughput: parseFloat(this.extractValue(lines, 'Throughput') || '0'),
      workInProgress: parseInt(this.extractValue(lines, 'Work in Progress') || '0'),
      blockedItems: parseInt(this.extractValue(lines, 'Blocked Items') || '0'),
      completedItems: parseInt(this.extractValue(lines, 'Completed Items') || '0'),
      scopeChanges: parseInt(this.extractValue(lines, 'Scope Changes') || '0'),
      quality: {
        defectRate: parseFloat(this.extractValue(lines, 'Defect Rate') || '0'),
        escapeRate: parseFloat(this.extractValue(lines, 'Escape Rate') || '0'),
        reworkRate: parseFloat(this.extractValue(lines, 'Rework Rate') || '0'),
        testCoverage: parseFloat(this.extractValue(lines, 'Test Coverage') || '0'),
        codeQuality: parseFloat(this.extractValue(lines, 'Code Quality') || '0'),
        customerSatisfaction: parseFloat(this.extractValue(lines, 'Customer Satisfaction') || '0')
      }
    }
  }

  private extractValue(lines: string[], key: string): string | null {
    const line = lines.find(l => l.includes(key))
    if (!line) return null
    
    const match = line.match(new RegExp(`${key}[:\-]\\s*(.+)`, 'i'))
    return match ? match[1].trim() : null
  }

  private extractList(lines: string[], section: string): string[] {
    const startIndex = lines.findIndex(l => l.includes(section))
    if (startIndex === -1) return []
    
    const items: string[] = []
    for (let i = startIndex + 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line.startsWith('-') || line.startsWith('•') || line.startsWith('*')) {
        items.push(line.replace(/^[-•*]\s*/, ''))
      } else if (line === '' || line.startsWith('#')) {
        break
      }
    }
    
    return items
  }

  private extractListFromLine(line: string): string[] {
    const content = line.split(':')[1]?.trim() || ''
    return content.split(',').map(item => item.trim()).filter(item => item.length > 0)
  }
}
