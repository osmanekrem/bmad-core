import { QAAgent } from '../qa-agent.js'
import { QAContext, TestPlan } from '../types/index.js'

export class TestPlanningCommand {
  private agent: QAAgent

  constructor(agent: QAAgent) {
    this.agent = agent
  }

  async execute(context: QAContext): Promise<TestPlan> {
    const prompt = this.buildPrompt(context)
    const response = await this.agent.execute('create-test-plan', { userInput: context.userInput || '' })
    
    return this.parseResponse(response.content, context)
  }

  private buildPrompt(context: QAContext): string {
    const { userInput, options } = context
    
    return `Create a comprehensive test plan for: ${userInput || 'the specified project'}

## Test Planning Requirements:
- Project Type: ${context.options?.projectType || options?.projectType || 'Software Development'}
- Test Level: ${options?.testLevel || 'all'}
- Test Framework: ${options?.testFramework || 'jest'}
- Automation Level: ${options?.automationLevel || 'partial'}

## Test Planning Framework:
1. **Test Objectives**: Define testing goals and objectives
2. **Test Scope**: Define what to test and what not to test
3. **Test Strategy**: Define testing approach and methodology
4. **Test Levels**: Plan different levels of testing
5. **Test Types**: Plan different types of testing
6. **Test Environment**: Define test environment requirements
7. **Test Schedule**: Plan test execution timeline
8. **Test Resources**: Plan test team and resources
9. **Test Risks**: Identify and plan for test risks
10. **Test Deliverables**: Define test outputs and reports

## Output Format:
- Use structured markdown with clear headings
- Include detailed test strategy and approach
- Provide comprehensive test case design guidelines
- Include test environment and resource requirements
- Document test schedule and milestones
- Include risk assessment and mitigation plans

Ensure the test plan is comprehensive, practical, and aligned with quality objectives.`
  }

  private parseResponse(response: string, context: QAContext): TestPlan {
    const lines = response.split('\n')
    
    const title = this.extractValue(lines, 'Title') || 'Test Plan'
    const description = this.extractValue(lines, 'Description') || response.substring(0, 200) + '...'
    const objectives = this.extractList(lines, 'Objectives')
    
    const scope = this.extractScope(lines)
    const strategy = this.extractStrategy(lines)
    const testCases = this.extractTestCases(lines)
    const testData = this.extractTestData(lines)
    const environment = this.extractEnvironment(lines)
    const schedule = this.extractSchedule(lines)
    const resources = this.extractResources(lines)
    const risks = this.extractRisks(lines)
    const deliverables = this.extractDeliverables(lines)
    const metrics = this.extractMetrics(lines)

    return {
      title,
      description,
      objectives,
      scope,
      strategy,
      testCases,
      testData,
      environment,
      schedule,
      resources,
      risks,
      deliverables,
      metrics,
      metadata: {
        planType: 'Test Plan',
        timestamp: new Date().toISOString(),
        complexity: 'medium',
        estimatedDuration: context.options?.estimatedDuration || '4-6 weeks'
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

  private extractStrategy(lines: string[]): any {
    return {
      approach: this.extractValue(lines, 'Approach') || 'black-box',
      levels: this.extractTestLevels(lines),
      types: this.extractTestTypes(lines),
      techniques: this.extractTestTechniques(lines),
      tools: this.extractTestTools(lines),
      automation: {
        approach: this.extractValue(lines, 'Automation Approach') || 'partial',
        tools: this.extractList(lines, 'Automation Tools'),
        framework: this.extractValue(lines, 'Automation Framework') || 'jest',
        coverage: parseFloat(this.extractValue(lines, 'Automation Coverage') || '80'),
        maintenance: this.extractList(lines, 'Automation Maintenance'),
        benefits: this.extractList(lines, 'Automation Benefits'),
        challenges: this.extractList(lines, 'Automation Challenges')
      }
    }
  }

  private extractTestLevels(lines: string[]): any[] {
    const levels: any[] = []
    let currentLevel: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Level')) {
        if (currentLevel) {
          levels.push(currentLevel)
        }
        currentLevel = {
          name: line.replace(/^###\s*/, '').replace(/\s*Level.*$/, ''),
          description: '',
          objectives: [],
          scope: [],
          deliverables: [],
          entry: [],
          exit: []
        }
      } else if (currentLevel) {
        if (line.includes('Description:')) {
          currentLevel.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Objectives:')) {
          currentLevel.objectives = this.extractListFromLine(line)
        } else if (line.includes('Scope:')) {
          currentLevel.scope = this.extractListFromLine(line)
        } else if (line.includes('Deliverables:')) {
          currentLevel.deliverables = this.extractListFromLine(line)
        } else if (line.includes('Entry:')) {
          currentLevel.entry = this.extractListFromLine(line)
        } else if (line.includes('Exit:')) {
          currentLevel.exit = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentLevel) {
      levels.push(currentLevel)
    }
    
    return levels
  }

  private extractTestTypes(lines: string[]): any[] {
    const types: any[] = []
    let currentType: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Type')) {
        if (currentType) {
          types.push(currentType)
        }
        currentType = {
          name: line.replace(/^###\s*/, '').replace(/\s*Type.*$/, ''),
          description: '',
          objectives: [],
          scope: [],
          techniques: [],
          tools: [],
          deliverables: []
        }
      } else if (currentType) {
        if (line.includes('Description:')) {
          currentType.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Objectives:')) {
          currentType.objectives = this.extractListFromLine(line)
        } else if (line.includes('Scope:')) {
          currentType.scope = this.extractListFromLine(line)
        } else if (line.includes('Techniques:')) {
          currentType.techniques = this.extractListFromLine(line)
        } else if (line.includes('Tools:')) {
          currentType.tools = this.extractListFromLine(line)
        } else if (line.includes('Deliverables:')) {
          currentType.deliverables = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentType) {
      types.push(currentType)
    }
    
    return types
  }

  private extractTestTechniques(lines: string[]): any[] {
    const techniques: any[] = []
    let currentTechnique: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Technique')) {
        if (currentTechnique) {
          techniques.push(currentTechnique)
        }
        currentTechnique = {
          name: line.replace(/^###\s*/, '').replace(/\s*Technique.*$/, ''),
          description: '',
          purpose: '',
          steps: [],
          tools: [],
          examples: []
        }
      } else if (currentTechnique) {
        if (line.includes('Description:')) {
          currentTechnique.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Purpose:')) {
          currentTechnique.purpose = line.split('Purpose:')[1]?.trim() || ''
        } else if (line.includes('Steps:')) {
          currentTechnique.steps = this.extractListFromLine(line)
        } else if (line.includes('Tools:')) {
          currentTechnique.tools = this.extractListFromLine(line)
        } else if (line.includes('Examples:')) {
          currentTechnique.examples = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentTechnique) {
      techniques.push(currentTechnique)
    }
    
    return techniques
  }

  private extractTestTools(lines: string[]): any[] {
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
          type: 'functional',
          description: '',
          features: [],
          pros: [],
          cons: [],
          cost: '',
          license: ''
        }
      } else if (currentTool) {
        if (line.includes('Type:')) {
          currentTool.type = line.split('Type:')[1]?.trim() || 'functional'
        } else if (line.includes('Description:')) {
          currentTool.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Features:')) {
          currentTool.features = this.extractListFromLine(line)
        } else if (line.includes('Pros:')) {
          currentTool.pros = this.extractListFromLine(line)
        } else if (line.includes('Cons:')) {
          currentTool.cons = this.extractListFromLine(line)
        } else if (line.includes('Cost:')) {
          currentTool.cost = line.split('Cost:')[1]?.trim() || ''
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

  private extractTestCases(lines: string[]): any[] {
    const testCases: any[] = []
    let currentTestCase: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Test Case')) {
        if (currentTestCase) {
          testCases.push(currentTestCase)
        }
        currentTestCase = {
          id: `TC_${testCases.length + 1}`,
          title: line.replace(/^###\s*/, '').replace(/\s*Test Case.*$/, ''),
          description: '',
          type: 'functional',
          priority: 'medium',
          status: 'draft',
          preconditions: [],
          steps: [],
          expected: [],
          actual: [],
          result: 'pending',
          notes: [],
          attachments: []
        }
      } else if (currentTestCase) {
        if (line.includes('Description:')) {
          currentTestCase.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Type:')) {
          currentTestCase.type = line.split('Type:')[1]?.trim() || 'functional'
        } else if (line.includes('Priority:')) {
          currentTestCase.priority = line.split('Priority:')[1]?.trim() || 'medium'
        } else if (line.includes('Status:')) {
          currentTestCase.status = line.split('Status:')[1]?.trim() || 'draft'
        } else if (line.includes('Preconditions:')) {
          currentTestCase.preconditions = this.extractListFromLine(line)
        } else if (line.includes('Steps:')) {
          currentTestCase.steps = this.extractTestSteps(lines, i)
        } else if (line.includes('Expected:')) {
          currentTestCase.expected = this.extractListFromLine(line)
        } else if (line.includes('Actual:')) {
          currentTestCase.actual = this.extractListFromLine(line)
        } else if (line.includes('Result:')) {
          currentTestCase.result = line.split('Result:')[1]?.trim() || 'pending'
        } else if (line.includes('Notes:')) {
          currentTestCase.notes = this.extractListFromLine(line)
        } else if (line.includes('Attachments:')) {
          currentTestCase.attachments = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentTestCase) {
      testCases.push(currentTestCase)
    }
    
    return testCases
  }

  private extractTestSteps(lines: string[], startIndex: number): any[] {
    const steps: any[] = []
    let stepNumber = 1
    
    for (let i = startIndex + 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line.startsWith('-') || line.startsWith('•') || line.startsWith('*')) {
        steps.push({
          step: stepNumber++,
          action: line.replace(/^[-•*]\s*/, ''),
          expected: '',
          actual: '',
          result: 'pending',
          notes: ''
        })
      } else if (line === '' || line.startsWith('#')) {
        break
      }
    }
    
    return steps
  }

  private extractTestData(lines: string[]): any[] {
    const testData: any[] = []
    let currentData: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Test Data')) {
        if (currentData) {
          testData.push(currentData)
        }
        currentData = {
          id: `TD_${testData.length + 1}`,
          name: line.replace(/^###\s*/, '').replace(/\s*Test Data.*$/, ''),
          description: '',
          type: 'input',
          format: '',
          source: '',
          content: null,
          validation: [],
          dependencies: []
        }
      } else if (currentData) {
        if (line.includes('Description:')) {
          currentData.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Type:')) {
          currentData.type = line.split('Type:')[1]?.trim() || 'input'
        } else if (line.includes('Format:')) {
          currentData.format = line.split('Format:')[1]?.trim() || ''
        } else if (line.includes('Source:')) {
          currentData.source = line.split('Source:')[1]?.trim() || ''
        } else if (line.includes('Validation:')) {
          currentData.validation = this.extractListFromLine(line)
        } else if (line.includes('Dependencies:')) {
          currentData.dependencies = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentData) {
      testData.push(currentData)
    }
    
    return testData
  }

  private extractEnvironment(lines: string[]): any {
    return {
      name: this.extractValue(lines, 'Environment Name') || 'Test Environment',
      type: this.extractValue(lines, 'Environment Type') || 'testing',
      description: this.extractValue(lines, 'Environment Description') || '',
      hardware: this.extractHardwareSpecs(lines),
      software: this.extractSoftwareSpecs(lines),
      network: {
        topology: this.extractValue(lines, 'Network Topology') || '',
        bandwidth: this.extractValue(lines, 'Network Bandwidth') || '',
        latency: this.extractValue(lines, 'Network Latency') || '',
        security: this.extractList(lines, 'Network Security'),
        protocols: this.extractList(lines, 'Network Protocols')
      },
      data: {
        sources: this.extractList(lines, 'Data Sources'),
        formats: this.extractList(lines, 'Data Formats'),
        volume: this.extractValue(lines, 'Data Volume') || '',
        privacy: this.extractList(lines, 'Data Privacy'),
        backup: this.extractList(lines, 'Data Backup')
      },
      access: {
        users: this.extractList(lines, 'Access Users'),
        roles: this.extractList(lines, 'Access Roles'),
        permissions: this.extractList(lines, 'Access Permissions'),
        authentication: this.extractList(lines, 'Authentication'),
        authorization: this.extractList(lines, 'Authorization')
      },
      configuration: this.extractConfigurationSpecs(lines)
    }
  }

  private extractHardwareSpecs(lines: string[]): any[] {
    const specs: any[] = []
    let currentSpec: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Hardware')) {
        if (currentSpec) {
          specs.push(currentSpec)
        }
        currentSpec = {
          component: line.replace(/^###\s*/, '').replace(/\s*Hardware.*$/, ''),
          specification: '',
          quantity: 1,
          purpose: ''
        }
      } else if (currentSpec) {
        if (line.includes('Specification:')) {
          currentSpec.specification = line.split('Specification:')[1]?.trim() || ''
        } else if (line.includes('Quantity:')) {
          currentSpec.quantity = parseInt(line.split('Quantity:')[1]?.trim() || '1')
        } else if (line.includes('Purpose:')) {
          currentSpec.purpose = line.split('Purpose:')[1]?.trim() || ''
        }
      }
    }
    
    if (currentSpec) {
      specs.push(currentSpec)
    }
    
    return specs
  }

  private extractSoftwareSpecs(lines: string[]): any[] {
    const specs: any[] = []
    let currentSpec: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Software')) {
        if (currentSpec) {
          specs.push(currentSpec)
        }
        currentSpec = {
          name: line.replace(/^###\s*/, '').replace(/\s*Software.*$/, ''),
          version: '',
          type: 'application',
          purpose: '',
          configuration: []
        }
      } else if (currentSpec) {
        if (line.includes('Version:')) {
          currentSpec.version = line.split('Version:')[1]?.trim() || ''
        } else if (line.includes('Type:')) {
          currentSpec.type = line.split('Type:')[1]?.trim() || 'application'
        } else if (line.includes('Purpose:')) {
          currentSpec.purpose = line.split('Purpose:')[1]?.trim() || ''
        } else if (line.includes('Configuration:')) {
          currentSpec.configuration = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentSpec) {
      specs.push(currentSpec)
    }
    
    return specs
  }

  private extractConfigurationSpecs(lines: string[]): any[] {
    const specs: any[] = []
    let currentSpec: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Configuration')) {
        if (currentSpec) {
          specs.push(currentSpec)
        }
        currentSpec = {
          component: line.replace(/^###\s*/, '').replace(/\s*Configuration.*$/, ''),
          setting: '',
          value: '',
          purpose: ''
        }
      } else if (currentSpec) {
        if (line.includes('Setting:')) {
          currentSpec.setting = line.split('Setting:')[1]?.trim() || ''
        } else if (line.includes('Value:')) {
          currentSpec.value = line.split('Value:')[1]?.trim() || ''
        } else if (line.includes('Purpose:')) {
          currentSpec.purpose = line.split('Purpose:')[1]?.trim() || ''
        }
      }
    }
    
    if (currentSpec) {
      specs.push(currentSpec)
    }
    
    return specs
  }

  private extractSchedule(lines: string[]): any {
    return {
      phases: this.extractTestPhases(lines),
      milestones: this.extractTestMilestones(lines),
      dependencies: this.extractTestDependencies(lines),
      resources: this.extractResourceAllocations(lines),
      timeline: this.extractValue(lines, 'Timeline') || '',
      buffer: this.extractValue(lines, 'Buffer') || ''
    }
  }

  private extractTestPhases(lines: string[]): any[] {
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
          objectives: [],
          deliverables: [],
          dependencies: [],
          resources: []
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
        } else if (line.includes('Objectives:')) {
          currentPhase.objectives = this.extractListFromLine(line)
        } else if (line.includes('Deliverables:')) {
          currentPhase.deliverables = this.extractListFromLine(line)
        } else if (line.includes('Dependencies:')) {
          currentPhase.dependencies = this.extractListFromLine(line)
        } else if (line.includes('Resources:')) {
          currentPhase.resources = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentPhase) {
      phases.push(currentPhase)
    }
    
    return phases
  }

  private extractTestMilestones(lines: string[]): any[] {
    const milestones: any[] = []
    let currentMilestone: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Milestone')) {
        if (currentMilestone) {
          milestones.push(currentMilestone)
        }
        currentMilestone = {
          name: line.replace(/^###\s*/, '').replace(/\s*Milestone.*$/, ''),
          description: '',
          date: '',
          criteria: [],
          deliverables: [],
          dependencies: [],
          owner: ''
        }
      } else if (currentMilestone) {
        if (line.includes('Description:')) {
          currentMilestone.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Date:')) {
          currentMilestone.date = line.split('Date:')[1]?.trim() || ''
        } else if (line.includes('Criteria:')) {
          currentMilestone.criteria = this.extractListFromLine(line)
        } else if (line.includes('Deliverables:')) {
          currentMilestone.deliverables = this.extractListFromLine(line)
        } else if (line.includes('Dependencies:')) {
          currentMilestone.dependencies = this.extractListFromLine(line)
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

  private extractTestDependencies(lines: string[]): any[] {
    const dependencies: any[] = []
    let currentDependency: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Dependency')) {
        if (currentDependency) {
          dependencies.push(currentDependency)
        }
        currentDependency = {
          from: line.replace(/^###\s*/, '').replace(/\s*Dependency.*$/, ''),
          to: '',
          type: 'finish-to-start',
          lag: 0
        }
      } else if (currentDependency) {
        if (line.includes('To:')) {
          currentDependency.to = line.split('To:')[1]?.trim() || ''
        } else if (line.includes('Type:')) {
          currentDependency.type = line.split('Type:')[1]?.trim() || 'finish-to-start'
        } else if (line.includes('Lag:')) {
          currentDependency.lag = parseInt(line.split('Lag:')[1]?.trim() || '0')
        }
      }
    }
    
    if (currentDependency) {
      dependencies.push(currentDependency)
    }
    
    return dependencies
  }

  private extractResourceAllocations(lines: string[]): any[] {
    const allocations: any[] = []
    let currentAllocation: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Resource')) {
        if (currentAllocation) {
          allocations.push(currentAllocation)
        }
        currentAllocation = {
          resource: line.replace(/^###\s*/, '').replace(/\s*Resource.*$/, ''),
          role: '',
          allocation: 0,
          startDate: '',
          endDate: '',
          skills: []
        }
      } else if (currentAllocation) {
        if (line.includes('Role:')) {
          currentAllocation.role = line.split('Role:')[1]?.trim() || ''
        } else if (line.includes('Allocation:')) {
          currentAllocation.allocation = parseFloat(line.split('Allocation:')[1]?.trim() || '0')
        } else if (line.includes('Start Date:')) {
          currentAllocation.startDate = line.split('Start Date:')[1]?.trim() || ''
        } else if (line.includes('End Date:')) {
          currentAllocation.endDate = line.split('End Date:')[1]?.trim() || ''
        } else if (line.includes('Skills:')) {
          currentAllocation.skills = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentAllocation) {
      allocations.push(currentAllocation)
    }
    
    return allocations
  }

  private extractResources(lines: string[]): any {
    return {
      team: this.extractTestTeamMembers(lines),
      tools: this.extractTestTools(lines),
      environment: this.extractEnvironment(lines),
      budget: parseFloat(this.extractValue(lines, 'Budget') || '0'),
      external: this.extractExternalResources(lines)
    }
  }

  private extractTestTeamMembers(lines: string[]): any[] {
    const members: any[] = []
    let currentMember: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Team Member')) {
        if (currentMember) {
          members.push(currentMember)
        }
        currentMember = {
          name: line.replace(/^###\s*/, '').replace(/\s*Team Member.*$/, ''),
          role: '',
          skills: [],
          experience: '',
          availability: '',
          responsibilities: [],
          cost: 0
        }
      } else if (currentMember) {
        if (line.includes('Role:')) {
          currentMember.role = line.split('Role:')[1]?.trim() || ''
        } else if (line.includes('Skills:')) {
          currentMember.skills = this.extractListFromLine(line)
        } else if (line.includes('Experience:')) {
          currentMember.experience = line.split('Experience:')[1]?.trim() || ''
        } else if (line.includes('Availability:')) {
          currentMember.availability = line.split('Availability:')[1]?.trim() || ''
        } else if (line.includes('Responsibilities:')) {
          currentMember.responsibilities = this.extractListFromLine(line)
        } else if (line.includes('Cost:')) {
          currentMember.cost = parseFloat(line.split('Cost:')[1]?.trim() || '0')
        }
      }
    }
    
    if (currentMember) {
      members.push(currentMember)
    }
    
    return members
  }

  private extractExternalResources(lines: string[]): any[] {
    const resources: any[] = []
    let currentResource: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('External')) {
        if (currentResource) {
          resources.push(currentResource)
        }
        currentResource = {
          name: line.replace(/^###\s*/, '').replace(/\s*External.*$/, ''),
          type: '',
          description: '',
          cost: 0,
          duration: '',
          deliverables: []
        }
      } else if (currentResource) {
        if (line.includes('Type:')) {
          currentResource.type = line.split('Type:')[1]?.trim() || ''
        } else if (line.includes('Description:')) {
          currentResource.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Cost:')) {
          currentResource.cost = parseFloat(line.split('Cost:')[1]?.trim() || '0')
        } else if (line.includes('Duration:')) {
          currentResource.duration = line.split('Duration:')[1]?.trim() || ''
        } else if (line.includes('Deliverables:')) {
          currentResource.deliverables = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentResource) {
      resources.push(currentResource)
    }
    
    return resources
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
          contingency: []
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
        }
      }
    }
    
    if (currentRisk) {
      risks.push(currentRisk)
    }
    
    return risks
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
          format: '',
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
        } else if (line.includes('Format:')) {
          currentDeliverable.format = line.split('Format:')[1]?.trim() || ''
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

  private extractMetrics(lines: string[]): any {
    return {
      coverage: {
        requirements: parseFloat(this.extractValue(lines, 'Requirements Coverage') || '0'),
        code: parseFloat(this.extractValue(lines, 'Code Coverage') || '0'),
        functions: parseFloat(this.extractValue(lines, 'Functions Coverage') || '0'),
        branches: parseFloat(this.extractValue(lines, 'Branches Coverage') || '0'),
        statements: parseFloat(this.extractValue(lines, 'Statements Coverage') || '0'),
        paths: parseFloat(this.extractValue(lines, 'Paths Coverage') || '0')
      },
      execution: {
        planned: parseInt(this.extractValue(lines, 'Planned Tests') || '0'),
        executed: parseInt(this.extractValue(lines, 'Executed Tests') || '0'),
        passed: parseInt(this.extractValue(lines, 'Passed Tests') || '0'),
        failed: parseInt(this.extractValue(lines, 'Failed Tests') || '0'),
        blocked: parseInt(this.extractValue(lines, 'Blocked Tests') || '0'),
        skipped: parseInt(this.extractValue(lines, 'Skipped Tests') || '0'),
        progress: parseFloat(this.extractValue(lines, 'Test Progress') || '0')
      },
      defect: {
        total: parseInt(this.extractValue(lines, 'Total Defects') || '0'),
        open: parseInt(this.extractValue(lines, 'Open Defects') || '0'),
        closed: parseInt(this.extractValue(lines, 'Closed Defects') || '0'),
        critical: parseInt(this.extractValue(lines, 'Critical Defects') || '0'),
        high: parseInt(this.extractValue(lines, 'High Defects') || '0'),
        medium: parseInt(this.extractValue(lines, 'Medium Defects') || '0'),
        low: parseInt(this.extractValue(lines, 'Low Defects') || '0'),
        density: parseFloat(this.extractValue(lines, 'Defect Density') || '0')
      },
      performance: {
        responseTime: parseFloat(this.extractValue(lines, 'Response Time') || '0'),
        throughput: parseFloat(this.extractValue(lines, 'Throughput') || '0'),
        resourceUtilization: parseFloat(this.extractValue(lines, 'Resource Utilization') || '0'),
        scalability: parseFloat(this.extractValue(lines, 'Scalability') || '0'),
        stability: parseFloat(this.extractValue(lines, 'Stability') || '0')
      },
      quality: {
        defectRate: parseFloat(this.extractValue(lines, 'Defect Rate') || '0'),
        escapeRate: parseFloat(this.extractValue(lines, 'Escape Rate') || '0'),
        reworkRate: parseFloat(this.extractValue(lines, 'Rework Rate') || '0'),
        customerSatisfaction: parseFloat(this.extractValue(lines, 'Customer Satisfaction') || '0'),
        processMaturity: parseFloat(this.extractValue(lines, 'Process Maturity') || '0')
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
