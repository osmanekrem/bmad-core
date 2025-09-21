import { MasterAgent } from '../master-agent.js'
import { MasterContext, ProjectStrategy } from '../types/index.js'

export class StrategicPlanningCommand {
  private agent: MasterAgent

  constructor(agent: MasterAgent) {
    this.agent = agent
  }

  async execute(context: MasterContext): Promise<ProjectStrategy> {
    const prompt = this.buildPrompt(context)
    const response = await this.agent.execute('develop-strategy', { userInput: context.userInput || '' })
    
    return this.parseResponse(response.content, context)
  }

  private buildPrompt(context: MasterContext): string {
    const { userInput, options } = context
    
    return `Develop a comprehensive project strategy for: ${userInput || 'the specified project'}

## Strategic Planning Requirements:
- Project Type: ${context.projectType || 'software-development'}
- Team Size: ${context.teamSize || 'medium'}
- Complexity: ${context.complexity || 'medium'}
- Timeline: ${context.timeline || '6 months'}
- Budget: ${context.budget || 'To be determined'}
- Methodology: ${options?.methodology || 'agile'}

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

  private parseResponse(response: string, context: MasterContext): ProjectStrategy {
    const lines = response.split('\n')
    
    const title = this.extractValue(lines, 'Title') || 'Project Strategy'
    const description = this.extractValue(lines, 'Description') || response.substring(0, 200) + '...'
    const projectType = context.projectType || 'software-development'
    const complexity = context.complexity || 'medium'
    const timeline = context.timeline || '6 months'
    const budget = context.budget || 'To be determined'
    const teamSize = context.teamSize || 5
    
    const objectives = this.extractList(lines, 'Objectives')
    const successCriteria = this.extractList(lines, 'Success Criteria')
    const risks = this.extractRisks(lines)
    const opportunities = this.extractOpportunities(lines)
    const phases = this.extractPhases(lines)
    const deliverables = this.extractDeliverables(lines)
    const stakeholders = this.extractStakeholders(lines)
    const resources = this.extractResources(lines)
    const dependencies = this.extractDependencies(lines)
    const metrics = this.extractMetrics(lines)

    return {
      id: `STRATEGY_${Date.now()}`,
      title,
      description,
      projectType,
      complexity,
      timeline,
      budget,
      teamSize,
      objectives,
      successCriteria,
      risks,
      opportunities,
      phases,
      deliverables,
      stakeholders,
      resources,
      dependencies,
      metrics,
      metadata: {
        strategyType: 'Project Strategy',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        status: 'draft'
      }
    }
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
          category: 'technical',
          probability: 'medium',
          impact: 'medium',
          severity: 'medium',
          owner: '',
          status: 'identified',
          mitigation: [],
          contingency: [],
          escalation: [],
          monitoring: []
        }
      } else if (currentRisk) {
        if (line.includes('Description:')) {
          currentRisk.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Category:')) {
          currentRisk.category = line.split('Category:')[1]?.trim() || 'technical'
        } else if (line.includes('Probability:')) {
          currentRisk.probability = line.split('Probability:')[1]?.trim() || 'medium'
        } else if (line.includes('Impact:')) {
          currentRisk.impact = line.split('Impact:')[1]?.trim() || 'medium'
        } else if (line.includes('Severity:')) {
          currentRisk.severity = line.split('Severity:')[1]?.trim() || 'medium'
        } else if (line.includes('Owner:')) {
          currentRisk.owner = line.split('Owner:')[1]?.trim() || ''
        } else if (line.includes('Status:')) {
          currentRisk.status = line.split('Status:')[1]?.trim() || 'identified'
        } else if (line.includes('Mitigation:')) {
          currentRisk.mitigation = this.extractListFromLine(line)
        } else if (line.includes('Contingency:')) {
          currentRisk.contingency = this.extractListFromLine(line)
        } else if (line.includes('Escalation:')) {
          currentRisk.escalation = this.extractListFromLine(line)
        } else if (line.includes('Monitoring:')) {
          currentRisk.monitoring = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentRisk) {
      risks.push(currentRisk)
    }
    
    return risks
  }

  private extractOpportunities(lines: string[]): any[] {
    const opportunities: any[] = []
    let currentOpportunity: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Opportunity')) {
        if (currentOpportunity) {
          opportunities.push(currentOpportunity)
        }
        currentOpportunity = {
          id: `OPP_${opportunities.length + 1}`,
          title: line.replace(/^###\s*/, '').replace(/\s*Opportunity.*$/, ''),
          description: '',
          category: 'business',
          potential: 'medium',
          effort: 'medium',
          impact: 'medium',
          owner: '',
          status: 'identified',
          benefits: [],
          requirements: [],
          timeline: '',
          resources: []
        }
      } else if (currentOpportunity) {
        if (line.includes('Description:')) {
          currentOpportunity.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Category:')) {
          currentOpportunity.category = line.split('Category:')[1]?.trim() || 'business'
        } else if (line.includes('Potential:')) {
          currentOpportunity.potential = line.split('Potential:')[1]?.trim() || 'medium'
        } else if (line.includes('Effort:')) {
          currentOpportunity.effort = line.split('Effort:')[1]?.trim() || 'medium'
        } else if (line.includes('Impact:')) {
          currentOpportunity.impact = line.split('Impact:')[1]?.trim() || 'medium'
        } else if (line.includes('Owner:')) {
          currentOpportunity.owner = line.split('Owner:')[1]?.trim() || ''
        } else if (line.includes('Status:')) {
          currentOpportunity.status = line.split('Status:')[1]?.trim() || 'identified'
        } else if (line.includes('Benefits:')) {
          currentOpportunity.benefits = this.extractListFromLine(line)
        } else if (line.includes('Requirements:')) {
          currentOpportunity.requirements = this.extractListFromLine(line)
        } else if (line.includes('Timeline:')) {
          currentOpportunity.timeline = line.split('Timeline:')[1]?.trim() || ''
        } else if (line.includes('Resources:')) {
          currentOpportunity.resources = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentOpportunity) {
      opportunities.push(currentOpportunity)
    }
    
    return opportunities
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
          duration: '',
          startDate: '',
          endDate: '',
          objectives: [],
          deliverables: [],
          activities: [],
          resources: [],
          dependencies: [],
          risks: [],
          milestones: [],
          status: 'planned'
        }
      } else if (currentPhase) {
        if (line.includes('Description:')) {
          currentPhase.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Duration:')) {
          currentPhase.duration = line.split('Duration:')[1]?.trim() || ''
        } else if (line.includes('Start Date:')) {
          currentPhase.startDate = line.split('Start Date:')[1]?.trim() || ''
        } else if (line.includes('End Date:')) {
          currentPhase.endDate = line.split('End Date:')[1]?.trim() || ''
        } else if (line.includes('Objectives:')) {
          currentPhase.objectives = this.extractListFromLine(line)
        } else if (line.includes('Deliverables:')) {
          currentPhase.deliverables = this.extractListFromLine(line)
        } else if (line.includes('Activities:')) {
          currentPhase.activities = this.extractListFromLine(line)
        } else if (line.includes('Resources:')) {
          currentPhase.resources = this.extractListFromLine(line)
        } else if (line.includes('Dependencies:')) {
          currentPhase.dependencies = this.extractListFromLine(line)
        } else if (line.includes('Risks:')) {
          currentPhase.risks = this.extractListFromLine(line)
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
          type: 'document',
          phase: '',
          owner: '',
          dueDate: '',
          status: 'planned',
          acceptanceCriteria: [],
          dependencies: [],
          reviewers: [],
          quality: {
            functional: [],
            nonFunctional: [],
            performance: [],
            security: [],
            usability: [],
            accessibility: [],
            compatibility: [],
            maintainability: []
          }
        }
      } else if (currentDeliverable) {
        if (line.includes('Description:')) {
          currentDeliverable.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Type:')) {
          currentDeliverable.type = line.split('Type:')[1]?.trim() || 'document'
        } else if (line.includes('Phase:')) {
          currentDeliverable.phase = line.split('Phase:')[1]?.trim() || ''
        } else if (line.includes('Owner:')) {
          currentDeliverable.owner = line.split('Owner:')[1]?.trim() || ''
        } else if (line.includes('Due Date:')) {
          currentDeliverable.dueDate = line.split('Due Date:')[1]?.trim() || ''
        } else if (line.includes('Status:')) {
          currentDeliverable.status = line.split('Status:')[1]?.trim() || 'planned'
        } else if (line.includes('Acceptance Criteria:')) {
          currentDeliverable.acceptanceCriteria = this.extractListFromLine(line)
        } else if (line.includes('Dependencies:')) {
          currentDeliverable.dependencies = this.extractListFromLine(line)
        } else if (line.includes('Reviewers:')) {
          currentDeliverable.reviewers = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentDeliverable) {
      deliverables.push(currentDeliverable)
    }
    
    return deliverables
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
            escalation: []
          },
          expectations: [],
          concerns: [],
          requirements: []
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
        }
      }
    }
    
    if (currentStakeholder) {
      stakeholders.push(currentStakeholder)
    }
    
    return stakeholders
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
          dependencies: []
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
        }
      }
    }
    
    if (currentResource) {
      resources.push(currentResource)
    }
    
    return resources
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
          mitigation: []
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
        }
      }
    }
    
    if (currentDependency) {
      dependencies.push(currentDependency)
    }
    
    return dependencies
  }

  private extractMetrics(lines: string[]): any {
    return {
      schedule: {
        plannedDuration: 0,
        actualDuration: 0,
        variance: 0,
        completionRate: 0,
        onTimeDelivery: 0,
        criticalPath: [],
        milestones: []
      },
      budget: {
        plannedBudget: 0,
        actualBudget: 0,
        variance: 0,
        burnRate: 0,
        costVariance: 0,
        scheduleVariance: 0,
        categories: []
      },
      quality: {
        defectRate: 0,
        defectDensity: 0,
        testCoverage: 0,
        codeQuality: 0,
        performance: 0,
        security: 0,
        usability: 0,
        accessibility: 0,
        customerSatisfaction: 0
      },
      scope: {
        plannedScope: 0,
        actualScope: 0,
        scopeCreep: 0,
        changeRequests: 0,
        approvedChanges: 0,
        rejectedChanges: 0,
        scopeStability: 0
      },
      risk: {
        totalRisks: 0,
        activeRisks: 0,
        mitigatedRisks: 0,
        realizedRisks: 0,
        riskExposure: 0,
        riskTrend: 'stable',
        criticalRisks: 0
      },
      team: {
        teamSize: 0,
        utilization: 0,
        productivity: 0,
        satisfaction: 0,
        turnover: 0,
        skills: [],
        performance: []
      },
      stakeholder: {
        totalStakeholders: 0,
        engagedStakeholders: 0,
        satisfaction: 0,
        communication: 0,
        support: 0,
        concerns: 0,
        escalations: 0
      },
      overall: {
        health: 'good',
        score: 0,
        trend: 'stable',
        keyIssues: [],
        achievements: [],
        recommendations: []
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
