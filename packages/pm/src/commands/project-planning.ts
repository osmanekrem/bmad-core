import { PMAgent } from '../pm-agent.js'
import { PMContext, ProjectPlan } from '../types/index.js'

export class ProjectPlanningCommand {
  private agent: PMAgent

  constructor(agent: PMAgent) {
    this.agent = agent
  }

  async execute(context: PMContext): Promise<ProjectPlan> {
    const prompt = this.buildPrompt(context)
    const response = await this.agent.execute('create-project-plan', { userInput: context.userInput || '' })
    
    return this.parseResponse(response.content, context)
  }

  private buildPrompt(context: PMContext): string {
    const { userInput, options } = context
    
    return `Create a comprehensive project plan for: ${userInput || 'the specified project'}

## Project Requirements:
- Project Type: ${context.projectType || options?.projectType || 'Software Development'}
- Team Size: ${context.teamSize || options?.teamSize || 'Medium (5-10 people)'}
- Timeline: ${context.timeline || options?.timeline || '6 months'}
- Methodology: ${options?.methodology || 'agile'}

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

  private parseResponse(response: string, context: PMContext): ProjectPlan {
    const lines = response.split('\n')
    
    const title = this.extractValue(lines, 'Title') || 'Project Plan'
    const description = this.extractValue(lines, 'Description') || response.substring(0, 200) + '...'
    const objectives = this.extractList(lines, 'Objectives')
    
    const scope = this.extractScope(lines)
    const timeline = this.extractTimeline(lines)
    const resources = this.extractResources(lines)
    const risks = this.extractRisks(lines)
    const deliverables = this.extractDeliverables(lines)
    const milestones = this.extractMilestones(lines)
    const budget = this.extractBudget(lines)
    const quality = this.extractQuality(lines)
    const communication = this.extractCommunication(lines)

    return {
      title,
      description,
      objectives,
      scope,
      timeline,
      resources,
      risks,
      deliverables,
      milestones,
      budget,
      quality,
      communication,
      metadata: {
        planType: 'Project Plan',
        timestamp: new Date().toISOString(),
        complexity: 'medium',
        estimatedDuration: context.timeline || '6 months'
      }
    }
  }

  private extractScope(lines: string[]): any {
    return {
      included: this.extractList(lines, 'Included'),
      excluded: this.extractList(lines, 'Excluded'),
      assumptions: this.extractList(lines, 'Assumptions'),
      constraints: this.extractList(lines, 'Constraints'),
      dependencies: this.extractList(lines, 'Dependencies'),
      success: this.extractList(lines, 'Success Criteria')
    }
  }

  private extractTimeline(lines: string[]): any {
    return {
      startDate: this.extractValue(lines, 'Start Date') || new Date().toISOString().split('T')[0],
      endDate: this.extractValue(lines, 'End Date') || new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      phases: this.extractPhases(lines),
      criticalPath: this.extractList(lines, 'Critical Path'),
      buffer: this.extractValue(lines, 'Buffer') || '10%',
      holidays: this.extractList(lines, 'Holidays')
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
          name: line.replace(/^###\s*/, '').replace(/\s*Phase.*$/, ''),
          description: '',
          startDate: '',
          endDate: '',
          duration: '',
          deliverables: [],
          dependencies: [],
          resources: [],
          risks: []
        }
      } else if (currentPhase) {
        if (line.includes('Description:')) {
          currentPhase.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Start Date:')) {
          currentPhase.startDate = line.split('Start Date:')[1]?.trim() || ''
        } else if (line.includes('End Date:')) {
          currentPhase.endDate = line.split('End Date:')[1]?.trim() || ''
        } else if (line.includes('Duration:')) {
          currentPhase.duration = line.split('Duration:')[1]?.trim() || ''
        } else if (line.includes('Deliverables:')) {
          currentPhase.deliverables = this.extractListFromLine(line)
        } else if (line.includes('Dependencies:')) {
          currentPhase.dependencies = this.extractListFromLine(line)
        } else if (line.includes('Resources:')) {
          currentPhase.resources = this.extractListFromLine(line)
        } else if (line.includes('Risks:')) {
          currentPhase.risks = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentPhase) {
      phases.push(currentPhase)
    }
    
    return phases
  }

  private extractResources(lines: string[]): any {
    return {
      team: this.extractTeamMembers(lines),
      budget: parseFloat(this.extractValue(lines, 'Budget') || '0'),
      equipment: this.extractEquipment(lines),
      tools: this.extractTools(lines),
      facilities: this.extractFacilities(lines),
      external: this.extractExternalResources(lines)
    }
  }

  private extractTeamMembers(lines: string[]): any[] {
    const members: any[] = []
    let currentMember: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Member')) {
        if (currentMember) {
          members.push(currentMember)
        }
        currentMember = {
          role: line.replace(/^###\s*/, '').replace(/\s*Member.*$/, ''),
          name: '',
          skills: [],
          availability: '',
          cost: 0,
          responsibilities: []
        }
      } else if (currentMember) {
        if (line.includes('Name:')) {
          currentMember.name = line.split('Name:')[1]?.trim() || ''
        } else if (line.includes('Skills:')) {
          currentMember.skills = this.extractListFromLine(line)
        } else if (line.includes('Availability:')) {
          currentMember.availability = line.split('Availability:')[1]?.trim() || ''
        } else if (line.includes('Cost:')) {
          currentMember.cost = parseFloat(line.split('Cost:')[1]?.trim() || '0')
        } else if (line.includes('Responsibilities:')) {
          currentMember.responsibilities = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentMember) {
      members.push(currentMember)
    }
    
    return members
  }

  private extractEquipment(lines: string[]): any[] {
    const equipment: any[] = []
    let currentEquipment: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Equipment')) {
        if (currentEquipment) {
          equipment.push(currentEquipment)
        }
        currentEquipment = {
          name: line.replace(/^###\s*/, '').replace(/\s*Equipment.*$/, ''),
          type: '',
          cost: 0,
          duration: '',
          purpose: ''
        }
      } else if (currentEquipment) {
        if (line.includes('Type:')) {
          currentEquipment.type = line.split('Type:')[1]?.trim() || ''
        } else if (line.includes('Cost:')) {
          currentEquipment.cost = parseFloat(line.split('Cost:')[1]?.trim() || '0')
        } else if (line.includes('Duration:')) {
          currentEquipment.duration = line.split('Duration:')[1]?.trim() || ''
        } else if (line.includes('Purpose:')) {
          currentEquipment.purpose = line.split('Purpose:')[1]?.trim() || ''
        }
      }
    }
    
    if (currentEquipment) {
      equipment.push(currentEquipment)
    }
    
    return equipment
  }

  private extractTools(lines: string[]): any[] {
    const tools: any[] = []
    let currentTool: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Tool')) {
        if (currentTool) {
          tools.push(currentTool)
        }
        currentTool = {
          name: line.replace(/^###\s*/, '').replace(/\s*Tool.*$/, ''),
          type: '',
          cost: 0,
          purpose: '',
          license: ''
        }
      } else if (currentTool) {
        if (line.includes('Type:')) {
          currentTool.type = line.split('Type:')[1]?.trim() || ''
        } else if (line.includes('Cost:')) {
          currentTool.cost = parseFloat(line.split('Cost:')[1]?.trim() || '0')
        } else if (line.includes('Purpose:')) {
          currentTool.purpose = line.split('Purpose:')[1]?.trim() || ''
        } else if (line.includes('License:')) {
          currentTool.license = line.split('License:')[1]?.trim() || ''
        }
      }
    }
    
    if (currentTool) {
      tools.push(currentTool)
    }
    
    return tools
  }

  private extractFacilities(lines: string[]): any[] {
    const facilities: any[] = []
    let currentFacility: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Facility')) {
        if (currentFacility) {
          facilities.push(currentFacility)
        }
        currentFacility = {
          name: line.replace(/^###\s*/, '').replace(/\s*Facility.*$/, ''),
          type: '',
          cost: 0,
          duration: '',
          location: ''
        }
      } else if (currentFacility) {
        if (line.includes('Type:')) {
          currentFacility.type = line.split('Type:')[1]?.trim() || ''
        } else if (line.includes('Cost:')) {
          currentFacility.cost = parseFloat(line.split('Cost:')[1]?.trim() || '0')
        } else if (line.includes('Duration:')) {
          currentFacility.duration = line.split('Duration:')[1]?.trim() || ''
        } else if (line.includes('Location:')) {
          currentFacility.location = line.split('Location:')[1]?.trim() || ''
        }
      }
    }
    
    if (currentFacility) {
      facilities.push(currentFacility)
    }
    
    return facilities
  }

  private extractExternalResources(lines: string[]): any[] {
    const external: any[] = []
    let currentExternal: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('External')) {
        if (currentExternal) {
          external.push(currentExternal)
        }
        currentExternal = {
          name: line.replace(/^###\s*/, '').replace(/\s*External.*$/, ''),
          type: '',
          cost: 0,
          duration: '',
          deliverables: []
        }
      } else if (currentExternal) {
        if (line.includes('Type:')) {
          currentExternal.type = line.split('Type:')[1]?.trim() || ''
        } else if (line.includes('Cost:')) {
          currentExternal.cost = parseFloat(line.split('Cost:')[1]?.trim() || '0')
        } else if (line.includes('Duration:')) {
          currentExternal.duration = line.split('Duration:')[1]?.trim() || ''
        } else if (line.includes('Deliverables:')) {
          currentExternal.deliverables = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentExternal) {
      external.push(currentExternal)
    }
    
    return external
  }

  private extractRisks(lines: string[]): any {
    return {
      risks: this.extractRiskList(lines),
      mitigation: this.extractMitigationStrategies(lines),
      contingency: this.extractContingencyPlans(lines),
      monitoring: this.extractRiskMonitoring(lines)
    }
  }

  private extractRiskList(lines: string[]): any[] {
    const risks: any[] = []
    let currentRisk: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Risk')) {
        if (currentRisk) {
          risks.push(currentRisk)
        }
        currentRisk = {
          id: `risk_${risks.length + 1}`,
          title: line.replace(/^###\s*/, '').replace(/\s*Risk.*$/, ''),
          description: '',
          probability: 'medium',
          impact: 'medium',
          category: 'technical',
          owner: '',
          status: 'open'
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
        }
      }
    }
    
    if (currentRisk) {
      risks.push(currentRisk)
    }
    
    return risks
  }

  private extractMitigationStrategies(lines: string[]): any[] {
    const strategies: any[] = []
    let currentStrategy: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Mitigation')) {
        if (currentStrategy) {
          strategies.push(currentStrategy)
        }
        currentStrategy = {
          riskId: '',
          strategy: line.replace(/^###\s*/, '').replace(/\s*Mitigation.*$/, ''),
          actions: [],
          owner: '',
          timeline: '',
          cost: 0
        }
      } else if (currentStrategy) {
        if (line.includes('Risk ID:')) {
          currentStrategy.riskId = line.split('Risk ID:')[1]?.trim() || ''
        } else if (line.includes('Actions:')) {
          currentStrategy.actions = this.extractListFromLine(line)
        } else if (line.includes('Owner:')) {
          currentStrategy.owner = line.split('Owner:')[1]?.trim() || ''
        } else if (line.includes('Timeline:')) {
          currentStrategy.timeline = line.split('Timeline:')[1]?.trim() || ''
        } else if (line.includes('Cost:')) {
          currentStrategy.cost = parseFloat(line.split('Cost:')[1]?.trim() || '0')
        }
      }
    }
    
    if (currentStrategy) {
      strategies.push(currentStrategy)
    }
    
    return strategies
  }

  private extractContingencyPlans(lines: string[]): any[] {
    const plans: any[] = []
    let currentPlan: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Contingency')) {
        if (currentPlan) {
          plans.push(currentPlan)
        }
        currentPlan = {
          riskId: '',
          plan: line.replace(/^###\s*/, '').replace(/\s*Contingency.*$/, ''),
          trigger: '',
          actions: [],
          owner: '',
          cost: 0
        }
      } else if (currentPlan) {
        if (line.includes('Risk ID:')) {
          currentPlan.riskId = line.split('Risk ID:')[1]?.trim() || ''
        } else if (line.includes('Trigger:')) {
          currentPlan.trigger = line.split('Trigger:')[1]?.trim() || ''
        } else if (line.includes('Actions:')) {
          currentPlan.actions = this.extractListFromLine(line)
        } else if (line.includes('Owner:')) {
          currentPlan.owner = line.split('Owner:')[1]?.trim() || ''
        } else if (line.includes('Cost:')) {
          currentPlan.cost = parseFloat(line.split('Cost:')[1]?.trim() || '0')
        }
      }
    }
    
    if (currentPlan) {
      plans.push(currentPlan)
    }
    
    return plans
  }

  private extractRiskMonitoring(lines: string[]): any[] {
    const monitoring: any[] = []
    let currentMonitoring: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Monitoring')) {
        if (currentMonitoring) {
          monitoring.push(currentMonitoring)
        }
        currentMonitoring = {
          riskId: '',
          metric: line.replace(/^###\s*/, '').replace(/\s*Monitoring.*$/, ''),
          frequency: '',
          owner: '',
          threshold: ''
        }
      } else if (currentMonitoring) {
        if (line.includes('Risk ID:')) {
          currentMonitoring.riskId = line.split('Risk ID:')[1]?.trim() || ''
        } else if (line.includes('Frequency:')) {
          currentMonitoring.frequency = line.split('Frequency:')[1]?.trim() || ''
        } else if (line.includes('Owner:')) {
          currentMonitoring.owner = line.split('Owner:')[1]?.trim() || ''
        } else if (line.includes('Threshold:')) {
          currentMonitoring.threshold = line.split('Threshold:')[1]?.trim() || ''
        }
      }
    }
    
    if (currentMonitoring) {
      monitoring.push(currentMonitoring)
    }
    
    return monitoring
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
          id: `deliverable_${deliverables.length + 1}`,
          name: line.replace(/^###\s*/, '').replace(/\s*Deliverable.*$/, ''),
          description: '',
          type: 'document',
          owner: '',
          dueDate: '',
          dependencies: [],
          acceptance: [],
          quality: {
            functional: [],
            nonFunctional: [],
            performance: [],
            security: [],
            usability: []
          }
        }
      } else if (currentDeliverable) {
        if (line.includes('Description:')) {
          currentDeliverable.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Type:')) {
          currentDeliverable.type = line.split('Type:')[1]?.trim() || 'document'
        } else if (line.includes('Owner:')) {
          currentDeliverable.owner = line.split('Owner:')[1]?.trim() || ''
        } else if (line.includes('Due Date:')) {
          currentDeliverable.dueDate = line.split('Due Date:')[1]?.trim() || ''
        } else if (line.includes('Dependencies:')) {
          currentDeliverable.dependencies = this.extractListFromLine(line)
        } else if (line.includes('Acceptance:')) {
          currentDeliverable.acceptance = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentDeliverable) {
      deliverables.push(currentDeliverable)
    }
    
    return deliverables
  }

  private extractMilestones(lines: string[]): any[] {
    const milestones: any[] = []
    let currentMilestone: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Milestone')) {
        if (currentMilestone) {
          milestones.push(currentMilestone)
        }
        currentMilestone = {
          id: `milestone_${milestones.length + 1}`,
          name: line.replace(/^###\s*/, '').replace(/\s*Milestone.*$/, ''),
          description: '',
          date: '',
          deliverables: [],
          dependencies: [],
          success: [],
          owner: ''
        }
      } else if (currentMilestone) {
        if (line.includes('Description:')) {
          currentMilestone.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Date:')) {
          currentMilestone.date = line.split('Date:')[1]?.trim() || ''
        } else if (line.includes('Deliverables:')) {
          currentMilestone.deliverables = this.extractListFromLine(line)
        } else if (line.includes('Dependencies:')) {
          currentMilestone.dependencies = this.extractListFromLine(line)
        } else if (line.includes('Success:')) {
          currentMilestone.success = this.extractListFromLine(line)
        } else if (line.includes('Owner:')) {
          currentMilestone.owner = line.split('Owner:')[1]?.trim() || ''
        }
      }
    }
    
    if (currentMilestone) {
      milestones.push(currentMilestone)
    }
    
    return milestones
  }

  private extractBudget(lines: string[]): any {
    return {
      total: parseFloat(this.extractValue(lines, 'Total Budget') || '0'),
      phases: this.extractBudgetPhases(lines),
      categories: this.extractBudgetCategories(lines),
      contingency: parseFloat(this.extractValue(lines, 'Contingency') || '0'),
      currency: this.extractValue(lines, 'Currency') || 'USD'
    }
  }

  private extractBudgetPhases(lines: string[]): any[] {
    const phases: any[] = []
    let currentPhase: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Phase')) {
        if (currentPhase) {
          phases.push(currentPhase)
        }
        currentPhase = {
          name: line.replace(/^###\s*/, '').replace(/\s*Phase.*$/, ''),
          amount: 0,
          percentage: 0,
          description: ''
        }
      } else if (currentPhase) {
        if (line.includes('Amount:')) {
          currentPhase.amount = parseFloat(line.split('Amount:')[1]?.trim() || '0')
        } else if (line.includes('Percentage:')) {
          currentPhase.percentage = parseFloat(line.split('Percentage:')[1]?.trim() || '0')
        } else if (line.includes('Description:')) {
          currentPhase.description = line.split('Description:')[1]?.trim() || ''
        }
      }
    }
    
    if (currentPhase) {
      phases.push(currentPhase)
    }
    
    return phases
  }

  private extractBudgetCategories(lines: string[]): any[] {
    const categories: any[] = []
    let currentCategory: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Category')) {
        if (currentCategory) {
          categories.push(currentCategory)
        }
        currentCategory = {
          name: line.replace(/^###\s*/, '').replace(/\s*Category.*$/, ''),
          amount: 0,
          percentage: 0,
          description: ''
        }
      } else if (currentCategory) {
        if (line.includes('Amount:')) {
          currentCategory.amount = parseFloat(line.split('Amount:')[1]?.trim() || '0')
        } else if (line.includes('Percentage:')) {
          currentCategory.percentage = parseFloat(line.split('Percentage:')[1]?.trim() || '0')
        } else if (line.includes('Description:')) {
          currentCategory.description = line.split('Description:')[1]?.trim() || ''
        }
      }
    }
    
    if (currentCategory) {
      categories.push(currentCategory)
    }
    
    return categories
  }

  private extractQuality(lines: string[]): any {
    return {
      standards: this.extractList(lines, 'Standards'),
      processes: this.extractList(lines, 'Processes'),
      tools: this.extractList(lines, 'Tools'),
      reviews: this.extractReviews(lines),
      testing: {
        types: this.extractList(lines, 'Test Types'),
        coverage: parseFloat(this.extractValue(lines, 'Coverage') || '80'),
        tools: this.extractList(lines, 'Test Tools'),
        schedule: this.extractList(lines, 'Test Schedule'),
        criteria: this.extractList(lines, 'Test Criteria')
      },
      metrics: this.extractQualityMetrics(lines)
    }
  }

  private extractReviews(lines: string[]): any[] {
    const reviews: any[] = []
    let currentReview: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Review')) {
        if (currentReview) {
          reviews.push(currentReview)
        }
        currentReview = {
          type: line.replace(/^###\s*/, '').replace(/\s*Review.*$/, ''),
          frequency: '',
          participants: [],
          deliverables: [],
          criteria: []
        }
      } else if (currentReview) {
        if (line.includes('Frequency:')) {
          currentReview.frequency = line.split('Frequency:')[1]?.trim() || ''
        } else if (line.includes('Participants:')) {
          currentReview.participants = this.extractListFromLine(line)
        } else if (line.includes('Deliverables:')) {
          currentReview.deliverables = this.extractListFromLine(line)
        } else if (line.includes('Criteria:')) {
          currentReview.criteria = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentReview) {
      reviews.push(currentReview)
    }
    
    return reviews
  }

  private extractQualityMetrics(lines: string[]): any[] {
    const metrics: any[] = []
    let currentMetric: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Metric')) {
        if (currentMetric) {
          metrics.push(currentMetric)
        }
        currentMetric = {
          name: line.replace(/^###\s*/, '').replace(/\s*Metric.*$/, ''),
          target: 0,
          current: 0,
          unit: '',
          frequency: ''
        }
      } else if (currentMetric) {
        if (line.includes('Target:')) {
          currentMetric.target = parseFloat(line.split('Target:')[1]?.trim() || '0')
        } else if (line.includes('Current:')) {
          currentMetric.current = parseFloat(line.split('Current:')[1]?.trim() || '0')
        } else if (line.includes('Unit:')) {
          currentMetric.unit = line.split('Unit:')[1]?.trim() || ''
        } else if (line.includes('Frequency:')) {
          currentMetric.frequency = line.split('Frequency:')[1]?.trim() || ''
        }
      }
    }
    
    if (currentMetric) {
      metrics.push(currentMetric)
    }
    
    return metrics
  }

  private extractCommunication(lines: string[]): any {
    return {
      stakeholders: this.extractStakeholders(lines),
      channels: this.extractCommunicationChannels(lines),
      meetings: this.extractMeetings(lines),
      reports: this.extractReports(lines),
      escalation: this.extractEscalationPlans(lines)
    }
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
          name: line.replace(/^###\s*/, '').replace(/\s*Stakeholder.*$/, ''),
          role: '',
          interest: 'medium',
          influence: 'medium',
          communication: [],
          expectations: []
        }
      } else if (currentStakeholder) {
        if (line.includes('Role:')) {
          currentStakeholder.role = line.split('Role:')[1]?.trim() || ''
        } else if (line.includes('Interest:')) {
          currentStakeholder.interest = line.split('Interest:')[1]?.trim() || 'medium'
        } else if (line.includes('Influence:')) {
          currentStakeholder.influence = line.split('Influence:')[1]?.trim() || 'medium'
        } else if (line.includes('Communication:')) {
          currentStakeholder.communication = this.extractListFromLine(line)
        } else if (line.includes('Expectations:')) {
          currentStakeholder.expectations = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentStakeholder) {
      stakeholders.push(currentStakeholder)
    }
    
    return stakeholders
  }

  private extractCommunicationChannels(lines: string[]): any[] {
    const channels: any[] = []
    let currentChannel: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Channel')) {
        if (currentChannel) {
          channels.push(currentChannel)
        }
        currentChannel = {
          type: line.replace(/^###\s*/, '').replace(/\s*Channel.*$/, ''),
          purpose: '',
          frequency: '',
          participants: [],
          format: ''
        }
      } else if (currentChannel) {
        if (line.includes('Purpose:')) {
          currentChannel.purpose = line.split('Purpose:')[1]?.trim() || ''
        } else if (line.includes('Frequency:')) {
          currentChannel.frequency = line.split('Frequency:')[1]?.trim() || ''
        } else if (line.includes('Participants:')) {
          currentChannel.participants = this.extractListFromLine(line)
        } else if (line.includes('Format:')) {
          currentChannel.format = line.split('Format:')[1]?.trim() || ''
        }
      }
    }
    
    if (currentChannel) {
      channels.push(currentChannel)
    }
    
    return channels
  }

  private extractMeetings(lines: string[]): any[] {
    const meetings: any[] = []
    let currentMeeting: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Meeting')) {
        if (currentMeeting) {
          meetings.push(currentMeeting)
        }
        currentMeeting = {
          name: line.replace(/^###\s*/, '').replace(/\s*Meeting.*$/, ''),
          purpose: '',
          frequency: '',
          participants: [],
          duration: '',
          agenda: []
        }
      } else if (currentMeeting) {
        if (line.includes('Purpose:')) {
          currentMeeting.purpose = line.split('Purpose:')[1]?.trim() || ''
        } else if (line.includes('Frequency:')) {
          currentMeeting.frequency = line.split('Frequency:')[1]?.trim() || ''
        } else if (line.includes('Participants:')) {
          currentMeeting.participants = this.extractListFromLine(line)
        } else if (line.includes('Duration:')) {
          currentMeeting.duration = line.split('Duration:')[1]?.trim() || ''
        } else if (line.includes('Agenda:')) {
          currentMeeting.agenda = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentMeeting) {
      meetings.push(currentMeeting)
    }
    
    return meetings
  }

  private extractReports(lines: string[]): any[] {
    const reports: any[] = []
    let currentReport: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Report')) {
        if (currentReport) {
          reports.push(currentReport)
        }
        currentReport = {
          name: line.replace(/^###\s*/, '').replace(/\s*Report.*$/, ''),
          purpose: '',
          frequency: '',
          audience: [],
          format: '',
          content: []
        }
      } else if (currentReport) {
        if (line.includes('Purpose:')) {
          currentReport.purpose = line.split('Purpose:')[1]?.trim() || ''
        } else if (line.includes('Frequency:')) {
          currentReport.frequency = line.split('Frequency:')[1]?.trim() || ''
        } else if (line.includes('Audience:')) {
          currentReport.audience = this.extractListFromLine(line)
        } else if (line.includes('Format:')) {
          currentReport.format = line.split('Format:')[1]?.trim() || ''
        } else if (line.includes('Content:')) {
          currentReport.content = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentReport) {
      reports.push(currentReport)
    }
    
    return reports
  }

  private extractEscalationPlans(lines: string[]): any[] {
    const plans: any[] = []
    let currentPlan: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Escalation')) {
        if (currentPlan) {
          plans.push(currentPlan)
        }
        currentPlan = {
          level: line.replace(/^###\s*/, '').replace(/\s*Escalation.*$/, ''),
          trigger: '',
          actions: [],
          contacts: [],
          timeline: ''
        }
      } else if (currentPlan) {
        if (line.includes('Trigger:')) {
          currentPlan.trigger = line.split('Trigger:')[1]?.trim() || ''
        } else if (line.includes('Actions:')) {
          currentPlan.actions = this.extractListFromLine(line)
        } else if (line.includes('Contacts:')) {
          currentPlan.contacts = this.extractListFromLine(line)
        } else if (line.includes('Timeline:')) {
          currentPlan.timeline = line.split('Timeline:')[1]?.trim() || ''
        }
      }
    }
    
    if (currentPlan) {
      plans.push(currentPlan)
    }
    
    return plans
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
