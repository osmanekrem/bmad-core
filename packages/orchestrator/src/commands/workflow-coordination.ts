import { OrchestratorAgent } from '../orchestrator-agent.js'
import { OrchestratorContext, WorkflowCoordination } from '../types/index.js'

export class WorkflowCoordinationCommand {
  private agent: OrchestratorAgent

  constructor(agent: OrchestratorAgent) {
    this.agent = agent
  }

  async execute(context: OrchestratorContext): Promise<WorkflowCoordination> {
    const prompt = this.buildPrompt(context)
    const response = await this.agent.execute('coordinate-workflow', { userInput: context.userInput || '' })
    
    return this.parseResponse(response.content, context)
  }

  private buildPrompt(context: OrchestratorContext): string {
    const { userInput, options } = context
    
    return `Coordinate workflow for: ${userInput || 'the specified project'}

## Workflow Coordination Requirements:
- Project Type: ${context.projectType || 'software-development'}
- Team Size: ${context.teamSize || 'medium'}
- Complexity: ${context.complexity || 'medium'}
- Workflow Type: ${context.workflowType || 'hybrid'}
- Coordination Level: ${context.coordinationLevel || 'project'}
- Methodology: ${options?.methodology || 'agile'}

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

  private parseResponse(response: string, context: OrchestratorContext): WorkflowCoordination {
    const lines = response.split('\n')
    
    const title = this.extractValue(lines, 'Title') || 'Workflow Coordination'
    const description = this.extractValue(lines, 'Description') || response.substring(0, 200) + '...'
    const workflowType = context.workflowType || 'hybrid'
    const coordinationLevel = context.coordinationLevel || 'project'
    
    const phases = this.extractPhases(lines)
    const transitions = this.extractTransitions(lines)
    const conditions = this.extractConditions(lines)
    const triggers = this.extractTriggers(lines)
    const actions = this.extractActions(lines)
    const monitoring = this.extractMonitoring(lines)
    const dependencies = this.extractDependencies(lines)
    const resources = this.extractResources(lines)
    const stakeholders = this.extractStakeholders(lines)
    const qualityGates = this.extractQualityGates(lines)

    return {
      id: `WORKFLOW_${Date.now()}`,
      title,
      description,
      workflowType,
      coordinationLevel,
      phases,
      transitions,
      conditions,
      triggers,
      actions,
      monitoring,
      dependencies,
      resources,
      stakeholders,
      qualityGates,
      metadata: {
        coordinationType: 'Workflow Coordination',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        status: 'draft'
      }
    }
  }

  private extractPhases(lines: string[]): any[] {
    const phases: any[] = []
    let currentPhase: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Phase')) {
        if (currentPhase) {
          phases.push(currentPhase)
        }
        currentPhase = {
          id: `PHASE_${phases.length + 1}`,
          name: line.replace(/^###\s*/, '').replace(/\s*Phase.*$/, ''),
          description: '',
          order: phases.length + 1,
          type: 'process',
          activities: [],
          inputs: [],
          outputs: [],
          conditions: [],
          duration: '',
          resources: [],
          dependencies: [],
          qualityGates: [],
          status: 'planned'
        }
      } else if (currentPhase) {
        if (line.includes('Description:')) {
          currentPhase.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Type:')) {
          currentPhase.type = line.split('Type:')[1]?.trim() || 'process'
        } else if (line.includes('Duration:')) {
          currentPhase.duration = line.split('Duration:')[1]?.trim() || ''
        } else if (line.includes('Activities:')) {
          currentPhase.activities = this.extractListFromLine(line)
        } else if (line.includes('Inputs:')) {
          currentPhase.inputs = this.extractListFromLine(line)
        } else if (line.includes('Outputs:')) {
          currentPhase.outputs = this.extractListFromLine(line)
        } else if (line.includes('Conditions:')) {
          currentPhase.conditions = this.extractListFromLine(line)
        } else if (line.includes('Resources:')) {
          currentPhase.resources = this.extractListFromLine(line)
        } else if (line.includes('Dependencies:')) {
          currentPhase.dependencies = this.extractListFromLine(line)
        } else if (line.includes('Quality Gates:')) {
          currentPhase.qualityGates = this.extractListFromLine(line)
        } else if (line.includes('Status:')) {
          currentPhase.status = line.split('Status:')[1]?.trim() || 'planned'
        }
      }
    }
    
    if (currentPhase) {
      phases.push(currentPhase)
    }
    
    return phases
  }

  private extractTransitions(lines: string[]): any[] {
    const transitions: any[] = []
    let currentTransition: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Transition')) {
        if (currentTransition) {
          transitions.push(currentTransition)
        }
        currentTransition = {
          id: `TRANS_${transitions.length + 1}`,
          from: '',
          to: '',
          condition: '',
          probability: 1.0,
          duration: '',
          resources: [],
          blockers: [],
          status: 'planned'
        }
      } else if (currentTransition) {
        if (line.includes('From:')) {
          currentTransition.from = line.split('From:')[1]?.trim() || ''
        } else if (line.includes('To:')) {
          currentTransition.to = line.split('To:')[1]?.trim() || ''
        } else if (line.includes('Condition:')) {
          currentTransition.condition = line.split('Condition:')[1]?.trim() || ''
        } else if (line.includes('Probability:')) {
          currentTransition.probability = parseFloat(line.split('Probability:')[1]?.trim() || '1.0')
        } else if (line.includes('Duration:')) {
          currentTransition.duration = line.split('Duration:')[1]?.trim() || ''
        } else if (line.includes('Resources:')) {
          currentTransition.resources = this.extractListFromLine(line)
        } else if (line.includes('Blockers:')) {
          currentTransition.blockers = this.extractListFromLine(line)
        } else if (line.includes('Status:')) {
          currentTransition.status = line.split('Status:')[1]?.trim() || 'planned'
        }
      }
    }
    
    if (currentTransition) {
      transitions.push(currentTransition)
    }
    
    return transitions
  }

  private extractConditions(lines: string[]): any[] {
    const conditions: any[] = []
    let currentCondition: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Condition')) {
        if (currentCondition) {
          conditions.push(currentCondition)
        }
        currentCondition = {
          id: `COND_${conditions.length + 1}`,
          name: line.replace(/^###\s*/, '').replace(/\s*Condition.*$/, ''),
          description: '',
          expression: '',
          variables: [],
          operators: [],
          values: [],
          actions: [],
          status: 'active'
        }
      } else if (currentCondition) {
        if (line.includes('Description:')) {
          currentCondition.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Expression:')) {
          currentCondition.expression = line.split('Expression:')[1]?.trim() || ''
        } else if (line.includes('Variables:')) {
          currentCondition.variables = this.extractListFromLine(line)
        } else if (line.includes('Operators:')) {
          currentCondition.operators = this.extractListFromLine(line)
        } else if (line.includes('Values:')) {
          currentCondition.values = this.extractListFromLine(line)
        } else if (line.includes('Actions:')) {
          currentCondition.actions = this.extractListFromLine(line)
        } else if (line.includes('Status:')) {
          currentCondition.status = line.split('Status:')[1]?.trim() || 'active'
        }
      }
    }
    
    if (currentCondition) {
      conditions.push(currentCondition)
    }
    
    return conditions
  }

  private extractTriggers(lines: string[]): any[] {
    const triggers: any[] = []
    let currentTrigger: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Trigger')) {
        if (currentTrigger) {
          triggers.push(currentTrigger)
        }
        currentTrigger = {
          id: `TRIG_${triggers.length + 1}`,
          name: line.replace(/^###\s*/, '').replace(/\s*Trigger.*$/, ''),
          description: '',
          type: 'event',
          source: '',
          condition: '',
          action: '',
          parameters: {},
          status: 'active'
        }
      } else if (currentTrigger) {
        if (line.includes('Description:')) {
          currentTrigger.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Type:')) {
          currentTrigger.type = line.split('Type:')[1]?.trim() || 'event'
        } else if (line.includes('Source:')) {
          currentTrigger.source = line.split('Source:')[1]?.trim() || ''
        } else if (line.includes('Condition:')) {
          currentTrigger.condition = line.split('Condition:')[1]?.trim() || ''
        } else if (line.includes('Action:')) {
          currentTrigger.action = line.split('Action:')[1]?.trim() || ''
        } else if (line.includes('Parameters:')) {
          currentTrigger.parameters = this.extractParameters(line)
        } else if (line.includes('Status:')) {
          currentTrigger.status = line.split('Status:')[1]?.trim() || 'active'
        }
      }
    }
    
    if (currentTrigger) {
      triggers.push(currentTrigger)
    }
    
    return triggers
  }

  private extractActions(lines: string[]): any[] {
    const actions: any[] = []
    let currentAction: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Action')) {
        if (currentAction) {
          actions.push(currentAction)
        }
        currentAction = {
          id: `ACT_${actions.length + 1}`,
          name: line.replace(/^###\s*/, '').replace(/\s*Action.*$/, ''),
          description: '',
          type: 'notification',
          target: '',
          parameters: {},
          conditions: [],
          timing: '',
          status: 'active'
        }
      } else if (currentAction) {
        if (line.includes('Description:')) {
          currentAction.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Type:')) {
          currentAction.type = line.split('Type:')[1]?.trim() || 'notification'
        } else if (line.includes('Target:')) {
          currentAction.target = line.split('Target:')[1]?.trim() || ''
        } else if (line.includes('Parameters:')) {
          currentAction.parameters = this.extractParameters(line)
        } else if (line.includes('Conditions:')) {
          currentAction.conditions = this.extractListFromLine(line)
        } else if (line.includes('Timing:')) {
          currentAction.timing = line.split('Timing:')[1]?.trim() || ''
        } else if (line.includes('Status:')) {
          currentAction.status = line.split('Status:')[1]?.trim() || 'active'
        }
      }
    }
    
    if (currentAction) {
      actions.push(currentAction)
    }
    
    return actions
  }

  private extractMonitoring(lines: string[]): any {
    return {
      metrics: {
        executionTime: 0,
        successRate: 0,
        errorRate: 0,
        throughput: 0,
        utilization: 0,
        bottlenecks: [],
        efficiency: 0,
        quality: 0,
        cost: 0,
        schedule: 0
      },
      alerts: [],
      reports: [],
      dashboards: [],
      status: 'active'
    }
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
          name: line.replace(/^###\s*/, '').replace(/\s*Dependency.*$/, ''),
          description: '',
          type: 'finish-to-start',
          from: '',
          to: '',
          owner: '',
          status: 'pending',
          dueDate: '',
          blockers: [],
          mitigation: [],
          critical: false
        }
      } else if (currentDependency) {
        if (line.includes('Description:')) {
          currentDependency.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Type:')) {
          currentDependency.type = line.split('Type:')[1]?.trim() || 'finish-to-start'
        } else if (line.includes('From:')) {
          currentDependency.from = line.split('From:')[1]?.trim() || ''
        } else if (line.includes('To:')) {
          currentDependency.to = line.split('To:')[1]?.trim() || ''
        } else if (line.includes('Owner:')) {
          currentDependency.owner = line.split('Owner:')[1]?.trim() || ''
        } else if (line.includes('Status:')) {
          currentDependency.status = line.split('Status:')[1]?.trim() || 'pending'
        } else if (line.includes('Due Date:')) {
          currentDependency.dueDate = line.split('Due Date:')[1]?.trim() || ''
        } else if (line.includes('Blockers:')) {
          currentDependency.blockers = this.extractListFromLine(line)
        } else if (line.includes('Mitigation:')) {
          currentDependency.mitigation = this.extractListFromLine(line)
        } else if (line.includes('Critical:')) {
          currentDependency.critical = line.split('Critical:')[1]?.trim().toLowerCase() === 'true'
        }
      }
    }
    
    if (currentDependency) {
      dependencies.push(currentDependency)
    }
    
    return dependencies
  }

  private extractResources(lines: string[]): any[] {
    const resources: any[] = []
    let currentResource: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Resource')) {
        if (currentResource) {
          resources.push(currentResource)
        }
        currentResource = {
          id: `RES_${resources.length + 1}`,
          name: line.replace(/^###\s*/, '').replace(/\s*Resource.*$/, ''),
          type: 'human',
          category: '',
          description: '',
          quantity: 1,
          unit: '',
          cost: 0,
          availability: '',
          allocation: '',
          owner: '',
          status: 'available',
          constraints: [],
          dependencies: [],
          utilization: 0,
          efficiency: 0
        }
      } else if (currentResource) {
        if (line.includes('Type:')) {
          currentResource.type = line.split('Type:')[1]?.trim() || 'human'
        } else if (line.includes('Category:')) {
          currentResource.category = line.split('Category:')[1]?.trim() || ''
        } else if (line.includes('Description:')) {
          currentResource.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Quantity:')) {
          currentResource.quantity = parseInt(line.split('Quantity:')[1]?.trim() || '1')
        } else if (line.includes('Unit:')) {
          currentResource.unit = line.split('Unit:')[1]?.trim() || ''
        } else if (line.includes('Cost:')) {
          currentResource.cost = parseFloat(line.split('Cost:')[1]?.trim() || '0')
        } else if (line.includes('Availability:')) {
          currentResource.availability = line.split('Availability:')[1]?.trim() || ''
        } else if (line.includes('Allocation:')) {
          currentResource.allocation = line.split('Allocation:')[1]?.trim() || ''
        } else if (line.includes('Owner:')) {
          currentResource.owner = line.split('Owner:')[1]?.trim() || ''
        } else if (line.includes('Status:')) {
          currentResource.status = line.split('Status:')[1]?.trim() || 'available'
        } else if (line.includes('Constraints:')) {
          currentResource.constraints = this.extractListFromLine(line)
        } else if (line.includes('Dependencies:')) {
          currentResource.dependencies = this.extractListFromLine(line)
        } else if (line.includes('Utilization:')) {
          currentResource.utilization = parseFloat(line.split('Utilization:')[1]?.trim() || '0')
        } else if (line.includes('Efficiency:')) {
          currentResource.efficiency = parseFloat(line.split('Efficiency:')[1]?.trim() || '0')
        }
      }
    }
    
    if (currentResource) {
      resources.push(currentResource)
    }
    
    return resources
  }

  private extractStakeholders(lines: string[]): any[] {
    const stakeholders: any[] = []
    let currentStakeholder: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Stakeholder')) {
        if (currentStakeholder) {
          stakeholders.push(currentStakeholder)
        }
        currentStakeholder = {
          id: `STAKE_${stakeholders.length + 1}`,
          name: line.replace(/^###\s*/, '').replace(/\s*Stakeholder.*$/, ''),
          role: '',
          type: 'internal',
          influence: 'medium',
          interest: 'medium',
          engagement: 'medium',
          communication: {
            frequency: 'weekly',
            format: 'meeting',
            content: [],
            channels: [],
            escalation: [],
            status: 'active'
          },
          expectations: [],
          concerns: [],
          requirements: [],
          status: 'active'
        }
      } else if (currentStakeholder) {
        if (line.includes('Role:')) {
          currentStakeholder.role = line.split('Role:')[1]?.trim() || ''
        } else if (line.includes('Type:')) {
          currentStakeholder.type = line.split('Type:')[1]?.trim() || 'internal'
        } else if (line.includes('Influence:')) {
          currentStakeholder.influence = line.split('Influence:')[1]?.trim() || 'medium'
        } else if (line.includes('Interest:')) {
          currentStakeholder.interest = line.split('Interest:')[1]?.trim() || 'medium'
        } else if (line.includes('Engagement:')) {
          currentStakeholder.engagement = line.split('Engagement:')[1]?.trim() || 'medium'
        } else if (line.includes('Expectations:')) {
          currentStakeholder.expectations = this.extractListFromLine(line)
        } else if (line.includes('Concerns:')) {
          currentStakeholder.concerns = this.extractListFromLine(line)
        } else if (line.includes('Requirements:')) {
          currentStakeholder.requirements = this.extractListFromLine(line)
        } else if (line.includes('Status:')) {
          currentStakeholder.status = line.split('Status:')[1]?.trim() || 'active'
        }
      }
    }
    
    if (currentStakeholder) {
      stakeholders.push(currentStakeholder)
    }
    
    return stakeholders
  }

  private extractQualityGates(lines: string[]): any[] {
    const qualityGates: any[] = []
    let currentQualityGate: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Quality Gate')) {
        if (currentQualityGate) {
          qualityGates.push(currentQualityGate)
        }
        currentQualityGate = {
          id: `QG_${qualityGates.length + 1}`,
          name: line.replace(/^###\s*/, '').replace(/\s*Quality Gate.*$/, ''),
          description: '',
          phase: '',
          criteria: [],
          owner: '',
          reviewers: [],
          dueDate: '',
          status: 'planned',
          blockers: [],
          mitigation: [],
          critical: false
        }
      } else if (currentQualityGate) {
        if (line.includes('Description:')) {
          currentQualityGate.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Phase:')) {
          currentQualityGate.phase = line.split('Phase:')[1]?.trim() || ''
        } else if (line.includes('Criteria:')) {
          currentQualityGate.criteria = this.extractListFromLine(line)
        } else if (line.includes('Owner:')) {
          currentQualityGate.owner = line.split('Owner:')[1]?.trim() || ''
        } else if (line.includes('Reviewers:')) {
          currentQualityGate.reviewers = this.extractListFromLine(line)
        } else if (line.includes('Due Date:')) {
          currentQualityGate.dueDate = line.split('Due Date:')[1]?.trim() || ''
        } else if (line.includes('Status:')) {
          currentQualityGate.status = line.split('Status:')[1]?.trim() || 'planned'
        } else if (line.includes('Blockers:')) {
          currentQualityGate.blockers = this.extractListFromLine(line)
        } else if (line.includes('Mitigation:')) {
          currentQualityGate.mitigation = this.extractListFromLine(line)
        } else if (line.includes('Critical:')) {
          currentQualityGate.critical = line.split('Critical:')[1]?.trim().toLowerCase() === 'true'
        }
      }
    }
    
    if (currentQualityGate) {
      qualityGates.push(currentQualityGate)
    }
    
    return qualityGates
  }

  private extractValue(lines: string[], key: string): string | null {
    const line = lines.find(l => l.includes(key))
    if (!line) return null
    
    const match = line.match(new RegExp(`${key}[:\-]\\s*(.+)`, 'i'))
    return match ? match[1].trim() : null
  }

  private extractListFromLine(line: string): string[] {
    const content = line.split(':')[1]?.trim() || ''
    return content.split(',').map(item => item.trim()).filter(item => item.length > 0)
  }

  private extractParameters(line: string): Record<string, any> {
    const content = line.split('Parameters:')[1]?.trim() || ''
    const params: Record<string, any> = {}
    
    if (content) {
      const pairs = content.split(',')
      for (const pair of pairs) {
        const [key, value] = pair.split(':').map(s => s.trim())
        if (key && value) {
          params[key] = value
        }
      }
    }
    
    return params
  }
}
