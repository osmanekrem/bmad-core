# @osmanekrem/bmad-master

BMad Master Agent - AI-driven project orchestration and strategic planning specialist.

## Features

- 🎯 **Strategic Planning**: Develop comprehensive project strategies and roadmaps
- 🎭 **Project Orchestration**: Coordinate and orchestrate complex project workflows
- 📊 **Resource Management**: Optimize resource allocation and utilization
- ⚠️ **Risk Management**: Identify, assess, and manage project risks and opportunities
- 🤝 **Stakeholder Management**: Manage stakeholder expectations and communication
- ✅ **Quality Assurance**: Ensure project quality and compliance standards
- 📈 **Performance Monitoring**: Track and report project performance metrics
- 🏛️ **Governance**: Establish and maintain project governance frameworks
- 🎯 **Decision Making**: Facilitate strategic decision-making processes
- 🔄 **Continuous Improvement**: Drive continuous improvement and optimization

## Installation

```bash
npm install @osmanekrem/bmad-master
```

## Quick Start

```typescript
import { MasterAgent } from '@osmanekrem/bmad-master'

// Initialize the Master agent
const master = new MasterAgent({
  defaultOutputFormat: 'markdown',
  projectType: 'software-development',
  teamSize: 'medium',
  complexity: 'medium'
})

// Develop project strategy
const result = await master.executeCommand('develop-strategy', {
  userInput: 'E-commerce platform development',
  projectType: 'software-development',
  teamSize: 8
})

console.log(result.output)
```

## Available Commands

### Strategic Planning
```typescript
const strategy = await master.executeCommand('develop-strategy', {
  userInput: 'E-commerce platform development',
  projectType: 'software-development',
  teamSize: 8,
  complexity: 'high',
  timeline: '12 months',
  budget: '$500,000'
})
```

### Project Orchestration
```typescript
const orchestration = await master.executeCommand('orchestrate-project', {
  userInput: 'E-commerce platform development',
  projectType: 'software-development',
  teamSize: 8,
  options: {
    methodology: 'agile',
    workflowType: 'hybrid'
  }
})
```

### Resource Management
```typescript
const resources = await master.executeCommand('manage-resources', {
  userInput: 'E-commerce platform development',
  projectType: 'software-development',
  teamSize: 8,
  budget: '$500,000'
})
```

### Risk Management
```typescript
const risks = await master.executeCommand('manage-risks', {
  userInput: 'E-commerce platform development',
  projectType: 'software-development',
  teamSize: 8,
  options: {
    riskTolerance: 'Medium'
  }
})
```

### Stakeholder Management
```typescript
const stakeholders = await master.executeCommand('manage-stakeholders', {
  userInput: 'E-commerce platform development',
  projectType: 'software-development',
  teamSize: 8,
  options: {
    stakeholderTypes: 'Internal, External, Customer, Vendor'
  }
})
```

### Quality Assurance
```typescript
const quality = await master.executeCommand('ensure-quality', {
  userInput: 'E-commerce platform development',
  projectType: 'software-development',
  teamSize: 8,
  options: {
    qualityStandards: 'Industry best practices'
  }
})
```

### Performance Monitoring
```typescript
const performance = await master.executeCommand('monitor-performance', {
  userInput: 'E-commerce platform development',
  projectType: 'software-development',
  teamSize: 8,
  options: {
    metricsTypes: 'Schedule, Budget, Quality, Scope'
  }
})
```

### Governance
```typescript
const governance = await master.executeCommand('establish-governance', {
  userInput: 'E-commerce platform development',
  projectType: 'software-development',
  teamSize: 8,
  options: {
    governanceLevel: 'Project level'
  }
})
```

### Decision Making
```typescript
const decisions = await master.executeCommand('facilitate-decisions', {
  userInput: 'E-commerce platform development',
  projectType: 'software-development',
  teamSize: 8,
  options: {
    decisionTypes: 'Strategic, Tactical, Operational'
  }
})
```

### Continuous Improvement
```typescript
const improvement = await master.executeCommand('drive-improvement', {
  userInput: 'E-commerce platform development',
  projectType: 'software-development',
  teamSize: 8,
  options: {
    improvementAreas: 'Process, Quality, Performance, Efficiency'
  }
})
```

## Configuration

```typescript
const master = new MasterAgent({
  defaultOutputFormat: 'markdown',     // 'markdown' | 'json' | 'yaml' | 'text'
  projectType: 'software-development', // Project type
  teamSize: 'medium',                  // 'small' | 'medium' | 'large'
  complexity: 'medium',                // 'low' | 'medium' | 'high'
  timeline: '6 months',                // Project timeline
  budget: 'To be determined',          // Project budget
  methodology: 'agile',               // 'agile' | 'waterfall' | 'hybrid' | 'scrum' | 'kanban' | 'saf' | 'less' | 'nexus'
  governance: ['project-board', 'steering-committee', 'working-groups'],
  tools: ['jira', 'confluence', 'slack', 'zoom', 'monday'],
  autoSave: true,                     // Auto-save strategies
  templates: {
    strategy: ['project-strategy-tmpl'],
    planning: ['strategic-planning-tmpl'],
    orchestration: ['workflow-orchestration-tmpl'],
    governance: ['governance-framework-tmpl']
  }
})
```

## Template Integration

The Master agent integrates with the BMad template system for structured output:

```typescript
import { MasterTemplateManager } from '@osmanekrem/bmad-master'

const templateManager = new MasterTemplateManager()

// Render project strategy with template
const formattedOutput = await templateManager.renderProjectStrategyTemplate(
  'project-strategy-tmpl',
  context,
  strategyData
)
```

## API Reference

### MasterAgent

#### Constructor
```typescript
new MasterAgent(config?: Partial<MasterConfig>)
```

#### Methods
- `executeCommand(commandName: string, context: MasterContext): Promise<MasterResponse>`
- `getAvailableCommands(): string[]`
- `getCommandDescription(commandName: string): string | undefined`
- `updateConfig(newConfig: Partial<MasterConfig>): void`
- `getConfig(): MasterConfig`

### Types

#### MasterContext
```typescript
interface MasterContext {
  projectPath?: string
  userInput?: string
  options?: Record<string, any>
  templates?: string[]
  outputFormat?: 'markdown' | 'json' | 'yaml' | 'text'
  projectType?: string
  teamSize?: number
  timeline?: string
  budget?: string
  complexity?: 'low' | 'medium' | 'high'
}
```

#### MasterResponse
```typescript
interface MasterResponse {
  success: boolean
  data?: any
  output?: string
  error?: string
  metadata?: {
    command: string
    timestamp: string
    duration?: number
    template?: string
  }
}
```

## Strategic Planning Framework

### 1. Vision & Mission
- Define project vision and mission
- Align with business objectives
- Establish success criteria

### 2. Objectives & Goals
- Set clear objectives and goals
- Define measurable success criteria
- Establish key performance indicators

### 3. Strategy Development
- Develop comprehensive strategies
- Create implementation approaches
- Define resource requirements

### 4. Resource Planning
- Plan and allocate resources
- Optimize resource utilization
- Manage resource constraints

### 5. Risk Assessment
- Identify project risks and opportunities
- Assess risk probability and impact
- Develop mitigation strategies

### 6. Implementation Planning
- Create detailed implementation plans
- Define project phases and milestones
- Establish quality gates

### 7. Monitoring & Control
- Establish monitoring mechanisms
- Define control processes
- Create reporting frameworks

### 8. Review & Adaptation
- Regular strategy review
- Adapt to changing conditions
- Continuous improvement

## Project Orchestration

### Workflow Design
- Design efficient project workflows
- Map project dependencies
- Optimize process flows

### Resource Coordination
- Coordinate resource allocation
- Manage resource conflicts
- Optimize resource utilization

### Timeline Management
- Manage project timelines
- Track milestone progress
- Handle schedule changes

### Quality Gates
- Establish quality checkpoints
- Define acceptance criteria
- Ensure quality standards

### Communication
- Facilitate project communication
- Manage stakeholder engagement
- Resolve conflicts

## Master Capabilities

### Strategic Planning
- **Vision & Mission**: Define project vision and mission
- **Objectives & Goals**: Set clear objectives and success criteria
- **Strategy Development**: Develop comprehensive strategies
- **Resource Planning**: Plan and allocate resources
- **Risk Assessment**: Identify and assess risks and opportunities
- **Implementation Planning**: Create detailed implementation plans
- **Monitoring & Control**: Establish monitoring and control mechanisms
- **Review & Adaptation**: Regular review and adaptation

### Project Orchestration
- **Workflow Design**: Design efficient project workflows
- **Dependency Management**: Manage project dependencies
- **Resource Coordination**: Coordinate resource allocation
- **Timeline Management**: Manage project timelines and milestones
- **Quality Gates**: Establish quality gates and checkpoints
- **Communication**: Facilitate project communication
- **Issue Resolution**: Resolve project issues and conflicts
- **Performance Tracking**: Track and report project performance

### Resource Management
- **Resource Planning**: Plan and allocate resources
- **Resource Optimization**: Optimize resource utilization
- **Resource Monitoring**: Monitor resource performance
- **Resource Adjustment**: Adjust resource allocation as needed
- **Resource Development**: Develop resource capabilities
- **Resource Retention**: Retain key resources
- **Resource Efficiency**: Improve resource efficiency
- **Resource Reporting**: Report resource performance

### Risk Management
- **Risk Identification**: Identify project risks and opportunities
- **Risk Assessment**: Assess risk probability and impact
- **Risk Prioritization**: Prioritize risks based on severity
- **Risk Mitigation**: Develop risk mitigation strategies
- **Risk Monitoring**: Monitor risk status and changes
- **Risk Response**: Respond to risk events
- **Risk Reporting**: Report risk status and trends
- **Risk Learning**: Learn from risk events

### Stakeholder Management
- **Stakeholder Identification**: Identify all project stakeholders
- **Stakeholder Analysis**: Analyze stakeholder influence and interest
- **Stakeholder Engagement**: Develop engagement strategies
- **Stakeholder Communication**: Plan stakeholder communication
- **Stakeholder Management**: Manage stakeholder relationships
- **Stakeholder Satisfaction**: Monitor stakeholder satisfaction
- **Stakeholder Reporting**: Report stakeholder status
- **Stakeholder Learning**: Learn from stakeholder feedback

### Quality Assurance
- **Quality Planning**: Plan quality assurance activities
- **Quality Standards**: Define quality standards and criteria
- **Quality Control**: Implement quality control measures
- **Quality Assurance**: Ensure quality assurance processes
- **Quality Monitoring**: Monitor quality performance
- **Quality Improvement**: Improve quality processes
- **Quality Reporting**: Report quality status and trends
- **Quality Learning**: Learn from quality issues

### Performance Monitoring
- **Metrics Definition**: Define performance metrics and KPIs
- **Data Collection**: Collect performance data and information
- **Data Analysis**: Analyze performance data and trends
- **Performance Reporting**: Report performance status and trends
- **Performance Improvement**: Identify improvement opportunities
- **Performance Optimization**: Optimize performance processes
- **Performance Learning**: Learn from performance insights
- **Performance Culture**: Develop performance culture

### Governance
- **Governance Structure**: Define governance structure and roles
- **Governance Processes**: Establish governance processes and procedures
- **Governance Policies**: Develop governance policies and guidelines
- **Governance Compliance**: Ensure governance compliance and audit
- **Governance Monitoring**: Monitor governance effectiveness
- **Governance Improvement**: Improve governance processes
- **Governance Reporting**: Report governance status and trends
- **Governance Learning**: Learn from governance insights

### Decision Making
- **Decision Identification**: Identify decisions that need to be made
- **Decision Analysis**: Analyze decision options and implications
- **Decision Criteria**: Define decision criteria and evaluation methods
- **Decision Process**: Establish decision-making processes
- **Decision Facilitation**: Facilitate decision-making sessions
- **Decision Documentation**: Document decisions and rationale
- **Decision Implementation**: Implement and monitor decisions
- **Decision Learning**: Learn from decision outcomes

### Continuous Improvement
- **Improvement Identification**: Identify improvement opportunities
- **Improvement Analysis**: Analyze improvement potential and impact
- **Improvement Planning**: Plan improvement initiatives
- **Improvement Implementation**: Implement improvement changes
- **Improvement Monitoring**: Monitor improvement progress
- **Improvement Measurement**: Measure improvement results
- **Improvement Learning**: Learn from improvement outcomes
- **Improvement Culture**: Develop improvement culture

## Examples

### Basic Strategic Planning
```typescript
import { MasterAgent } from '@osmanekrem/bmad-master'

const master = new MasterAgent()

const result = await master.executeCommand('develop-strategy', {
  userInput: 'Mobile banking app',
  projectType: 'software-development',
  teamSize: 12,
  complexity: 'high'
})

if (result.success) {
  console.log(result.output)
} else {
  console.error('Strategic planning failed:', result.error)
}
```

### Advanced Project Orchestration
```typescript
const orchestration = await master.executeCommand('orchestrate-project', {
  userInput: 'E-commerce platform development',
  projectType: 'software-development',
  teamSize: 15,
  complexity: 'high',
  options: {
    methodology: 'agile',
    workflowType: 'hybrid',
    includeDependencies: true,
    includeQualityGates: true
  }
})

const orchestrationData = orchestration.data as WorkflowOrchestration
console.log(`Orchestrated ${orchestrationData.phases.length} phases`)
```

### Custom Configuration
```typescript
const master = new MasterAgent({
  defaultOutputFormat: 'json',
  projectType: 'mobile-development',
  teamSize: 'large',
  complexity: 'high',
  timeline: '18 months',
  budget: '$2,000,000',
  methodology: 'scrum',
  governance: ['executive-board', 'project-steering-committee'],
  tools: ['jira', 'confluence', 'slack', 'zoom', 'monday', 'figma'],
  autoSave: false,
  templates: {
    strategy: ['custom-strategy-tmpl'],
    planning: ['custom-planning-tmpl'],
    orchestration: ['custom-orchestration-tmpl'],
    governance: ['custom-governance-tmpl']
  }
})

// Update configuration
master.updateConfig({
  methodology: 'kanban',
  complexity: 'medium'
})
```

## Master Best Practices

### Strategic Planning
- **Align with Business Objectives**: Ensure project strategy aligns with business goals
- **Define Clear Success Criteria**: Establish measurable success criteria
- **Consider Long-term Implications**: Think beyond immediate project needs
- **Involve Key Stakeholders**: Engage stakeholders in strategy development
- **Regular Review and Adaptation**: Continuously review and adapt strategy

### Project Orchestration
- **Design Efficient Workflows**: Create streamlined and efficient processes
- **Manage Dependencies**: Proactively manage project dependencies
- **Optimize Resource Utilization**: Ensure optimal resource allocation
- **Establish Quality Gates**: Implement quality checkpoints throughout
- **Facilitate Communication**: Maintain clear and open communication

### Resource Management
- **Plan Resource Requirements**: Accurately estimate resource needs
- **Optimize Resource Allocation**: Distribute resources efficiently
- **Monitor Resource Performance**: Track resource utilization and effectiveness
- **Develop Resource Capabilities**: Invest in resource development
- **Retain Key Resources**: Implement retention strategies

### Risk Management
- **Proactive Risk Identification**: Identify risks early and often
- **Comprehensive Risk Assessment**: Assess both probability and impact
- **Effective Risk Mitigation**: Develop robust mitigation strategies
- **Continuous Risk Monitoring**: Monitor risk status and changes
- **Learn from Risk Events**: Capture lessons learned from risk events

### Stakeholder Management
- **Identify All Stakeholders**: Ensure comprehensive stakeholder identification
- **Analyze Stakeholder Influence**: Understand stakeholder power and interest
- **Develop Engagement Strategies**: Create tailored engagement approaches
- **Maintain Regular Communication**: Keep stakeholders informed and engaged
- **Monitor Stakeholder Satisfaction**: Track and improve stakeholder satisfaction

### Quality Assurance
- **Define Quality Standards**: Establish clear quality criteria
- **Implement Quality Controls**: Put quality control measures in place
- **Monitor Quality Performance**: Track quality metrics and trends
- **Continuous Quality Improvement**: Continuously improve quality processes
- **Learn from Quality Issues**: Capture and apply quality lessons learned

### Performance Monitoring
- **Define Relevant Metrics**: Select meaningful performance indicators
- **Collect Quality Data**: Ensure data accuracy and completeness
- **Analyze Performance Trends**: Identify patterns and insights
- **Report Performance Status**: Communicate performance effectively
- **Drive Performance Improvement**: Use insights to improve performance

### Governance
- **Establish Clear Structure**: Define governance roles and responsibilities
- **Develop Effective Processes**: Create efficient governance processes
- **Ensure Compliance**: Maintain adherence to policies and standards
- **Monitor Governance Effectiveness**: Track governance performance
- **Continuously Improve**: Enhance governance processes over time

### Decision Making
- **Identify Decision Requirements**: Understand what decisions need to be made
- **Analyze Decision Options**: Evaluate alternatives and implications
- **Define Decision Criteria**: Establish clear evaluation criteria
- **Facilitate Decision Processes**: Guide effective decision-making
- **Document Decisions**: Record decisions and rationale
- **Monitor Decision Outcomes**: Track decision effectiveness

### Continuous Improvement
- **Identify Improvement Opportunities**: Find areas for enhancement
- **Analyze Improvement Potential**: Assess impact and feasibility
- **Plan Improvement Initiatives**: Develop improvement strategies
- **Implement Improvements**: Execute improvement changes
- **Monitor Improvement Progress**: Track improvement results
- **Learn from Improvements**: Capture and share improvement insights

## License

MIT
