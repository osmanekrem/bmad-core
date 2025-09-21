# @osmanekrem/bmad-orchestrator

BMad Orchestrator Agent - AI-driven project coordination and workflow management specialist.

## Features

- 🎭 **Workflow Coordination**: Design and coordinate complex project workflows
- 🎯 **Project Coordination**: Coordinate multiple projects and programs
- 📊 **Resource Coordination**: Coordinate resource allocation across projects
- 🤝 **Stakeholder Coordination**: Coordinate stakeholder engagement and communication
- ✅ **Quality Coordination**: Coordinate quality assurance and compliance
- ⚠️ **Risk Coordination**: Coordinate risk management across projects
- 📢 **Communication Coordination**: Coordinate communication and reporting
- 🏛️ **Governance Coordination**: Coordinate governance and compliance
- 🔄 **Change Coordination**: Coordinate change management processes
- 📈 **Performance Coordination**: Coordinate performance monitoring and reporting

## Installation

```bash
npm install @osmanekrem/bmad-orchestrator
```

## Quick Start

```typescript
import { OrchestratorAgent } from '@osmanekrem/bmad-orchestrator'

// Initialize the Orchestrator agent
const orchestrator = new OrchestratorAgent({
  defaultOutputFormat: 'markdown',
  projectType: 'software-development',
  teamSize: 'medium',
  complexity: 'medium',
  workflowType: 'hybrid',
  coordinationLevel: 'project'
})

// Coordinate workflow
const result = await orchestrator.executeCommand('coordinate-workflow', {
  userInput: 'E-commerce platform development',
  projectType: 'software-development',
  teamSize: 8,
  workflowType: 'hybrid'
})

console.log(result.output)
```

## Available Commands

### Workflow Coordination
```typescript
const workflow = await orchestrator.executeCommand('coordinate-workflow', {
  userInput: 'E-commerce platform development',
  projectType: 'software-development',
  teamSize: 8,
  workflowType: 'hybrid',
  coordinationLevel: 'project'
})
```

### Project Coordination
```typescript
const projects = await orchestrator.executeCommand('coordinate-projects', {
  userInput: 'E-commerce platform development',
  projectType: 'software-development',
  teamSize: 8,
  coordinationLevel: 'program'
})
```

### Resource Coordination
```typescript
const resources = await orchestrator.executeCommand('coordinate-resources', {
  userInput: 'E-commerce platform development',
  projectType: 'software-development',
  teamSize: 8,
  budget: '$500,000'
})
```

### Stakeholder Coordination
```typescript
const stakeholders = await orchestrator.executeCommand('coordinate-stakeholders', {
  userInput: 'E-commerce platform development',
  projectType: 'software-development',
  teamSize: 8,
  options: {
    stakeholderTypes: 'Internal, External, Customer, Vendor'
  }
})
```

### Quality Coordination
```typescript
const quality = await orchestrator.executeCommand('coordinate-quality', {
  userInput: 'E-commerce platform development',
  projectType: 'software-development',
  teamSize: 8,
  options: {
    qualityStandards: 'Industry best practices'
  }
})
```

### Risk Coordination
```typescript
const risks = await orchestrator.executeCommand('coordinate-risks', {
  userInput: 'E-commerce platform development',
  projectType: 'software-development',
  teamSize: 8,
  options: {
    riskTolerance: 'Medium'
  }
})
```

### Communication Coordination
```typescript
const communication = await orchestrator.executeCommand('coordinate-communication', {
  userInput: 'E-commerce platform development',
  projectType: 'software-development',
  teamSize: 8,
  options: {
    communicationTypes: 'Internal, External, Stakeholder, Team'
  }
})
```

### Governance Coordination
```typescript
const governance = await orchestrator.executeCommand('coordinate-governance', {
  userInput: 'E-commerce platform development',
  projectType: 'software-development',
  teamSize: 8,
  options: {
    governanceLevel: 'Project level'
  }
})
```

### Change Coordination
```typescript
const change = await orchestrator.executeCommand('coordinate-change', {
  userInput: 'E-commerce platform development',
  projectType: 'software-development',
  teamSize: 8,
  options: {
    changeTypes: 'Scope, Schedule, Budget, Quality'
  }
})
```

### Performance Coordination
```typescript
const performance = await orchestrator.executeCommand('coordinate-performance', {
  userInput: 'E-commerce platform development',
  projectType: 'software-development',
  teamSize: 8,
  options: {
    metricsTypes: 'Schedule, Budget, Quality, Scope'
  }
})
```

## Configuration

```typescript
const orchestrator = new OrchestratorAgent({
  defaultOutputFormat: 'markdown',     // 'markdown' | 'json' | 'yaml' | 'text'
  projectType: 'software-development', // Project type
  teamSize: 'medium',                  // 'small' | 'medium' | 'large'
  complexity: 'medium',                // 'low' | 'medium' | 'high'
  timeline: '6 months',                // Project timeline
  budget: 'To be determined',          // Project budget
  workflowType: 'hybrid',             // 'sequential' | 'parallel' | 'conditional' | 'iterative' | 'hybrid'
  coordinationLevel: 'project',       // 'project' | 'program' | 'portfolio' | 'enterprise'
  methodology: 'agile',               // 'agile' | 'waterfall' | 'hybrid' | 'scrum' | 'kanban' | 'saf' | 'less' | 'nexus'
  tools: ['jira', 'confluence', 'slack', 'zoom', 'monday'],
  autoSave: true,                     // Auto-save coordination plans
  templates: {
    coordination: ['project-coordination-tmpl'],
    workflow: ['workflow-coordination-tmpl'],
    communication: ['communication-coordination-tmpl'],
    governance: ['governance-coordination-tmpl']
  }
})
```

## Template Integration

The Orchestrator agent integrates with the BMad template system for structured output:

```typescript
import { OrchestratorTemplateManager } from '@osmanekrem/bmad-orchestrator'

const templateManager = new OrchestratorTemplateManager()

// Render workflow coordination with template
const formattedOutput = await templateManager.renderWorkflowCoordinationTemplate(
  'workflow-coordination-tmpl',
  context,
  workflowData
)
```

## API Reference

### OrchestratorAgent

#### Constructor
```typescript
new OrchestratorAgent(config?: Partial<OrchestratorConfig>)
```

#### Methods
- `executeCommand(commandName: string, context: OrchestratorContext): Promise<OrchestratorResponse>`
- `getAvailableCommands(): string[]`
- `getCommandDescription(commandName: string): string | undefined`
- `updateConfig(newConfig: Partial<OrchestratorConfig>): void`
- `getConfig(): OrchestratorConfig`

### Types

#### OrchestratorContext
```typescript
interface OrchestratorContext {
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
  workflowType?: 'sequential' | 'parallel' | 'conditional' | 'iterative' | 'hybrid'
  coordinationLevel?: 'project' | 'program' | 'portfolio' | 'enterprise'
}
```

#### OrchestratorResponse
```typescript
interface OrchestratorResponse {
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

## Workflow Coordination Framework

### 1. Workflow Design
- Design efficient and effective workflows
- Map workflow phases and activities
- Define workflow dependencies and critical path
- Establish quality gates and checkpoints

### 2. Dependency Management
- Manage workflow dependencies and critical path
- Identify and resolve dependency conflicts
- Optimize workflow sequencing
- Monitor dependency status

### 3. Resource Allocation
- Allocate resources optimally across workflows
- Balance resource utilization
- Manage resource conflicts
- Optimize resource efficiency

### 4. Quality Gates
- Establish quality gates and checkpoints
- Define quality criteria and acceptance standards
- Monitor quality compliance
- Ensure quality standards

### 5. Monitoring
- Monitor workflow performance and progress
- Track workflow metrics and KPIs
- Identify bottlenecks and inefficiencies
- Report workflow status

### 6. Optimization
- Continuously optimize workflow efficiency
- Implement workflow improvements
- Learn from workflow outcomes
- Share best practices

### 7. Communication
- Facilitate workflow communication
- Coordinate workflow activities
- Manage workflow information flow
- Ensure clear communication

### 8. Learning
- Capture and share workflow lessons learned
- Document workflow best practices
- Improve workflow processes
- Build workflow knowledge

## Project Coordination Framework

### 1. Project Alignment
- Align projects with strategic objectives
- Ensure project portfolio coherence
- Balance project priorities
- Optimize project portfolio

### 2. Dependency Management
- Manage inter-project dependencies
- Coordinate project sequencing
- Resolve dependency conflicts
- Optimize project timing

### 3. Resource Sharing
- Optimize resource sharing across projects
- Balance resource allocation
- Manage resource conflicts
- Optimize resource utilization

### 4. Stakeholder Management
- Coordinate stakeholder engagement
- Manage stakeholder expectations
- Facilitate stakeholder communication
- Ensure stakeholder alignment

### 5. Quality Standards
- Maintain consistent quality standards
- Coordinate quality assurance
- Ensure quality compliance
- Share quality best practices

### 6. Risk Management
- Coordinate risk management across projects
- Share risk information
- Manage portfolio risks
- Optimize risk mitigation

### 7. Communication
- Facilitate inter-project communication
- Coordinate project reporting
- Share project information
- Ensure communication clarity

### 8. Performance
- Monitor and report project performance
- Track portfolio metrics
- Identify performance issues
- Optimize portfolio performance

## Orchestrator Capabilities

### Workflow Coordination
- **Workflow Design**: Design efficient and effective workflows
- **Dependency Management**: Manage workflow dependencies and critical path
- **Resource Allocation**: Allocate resources optimally across workflows
- **Quality Gates**: Establish quality gates and checkpoints
- **Monitoring**: Monitor workflow performance and progress
- **Optimization**: Continuously optimize workflow efficiency
- **Communication**: Facilitate workflow communication
- **Learning**: Capture and share workflow lessons learned

### Project Coordination
- **Project Alignment**: Align projects with strategic objectives
- **Dependency Management**: Manage inter-project dependencies
- **Resource Sharing**: Optimize resource sharing across projects
- **Stakeholder Management**: Coordinate stakeholder engagement
- **Quality Standards**: Maintain consistent quality standards
- **Risk Management**: Coordinate risk management across projects
- **Communication**: Facilitate inter-project communication
- **Performance**: Monitor and report project performance

### Resource Coordination
- **Resource Planning**: Plan and allocate resources across projects
- **Resource Optimization**: Optimize resource utilization and efficiency
- **Resource Sharing**: Coordinate resource sharing across projects
- **Resource Monitoring**: Monitor resource performance and utilization
- **Resource Adjustment**: Adjust resource allocation as needed
- **Resource Development**: Develop resource capabilities and skills
- **Resource Retention**: Retain key resources and talent
- **Resource Reporting**: Report resource performance and utilization

### Stakeholder Coordination
- **Stakeholder Identification**: Identify all project stakeholders
- **Stakeholder Analysis**: Analyze stakeholder influence and interest
- **Stakeholder Engagement**: Develop engagement strategies
- **Stakeholder Communication**: Plan stakeholder communication
- **Stakeholder Management**: Manage stakeholder relationships
- **Stakeholder Satisfaction**: Monitor stakeholder satisfaction
- **Stakeholder Reporting**: Report stakeholder status
- **Stakeholder Learning**: Learn from stakeholder feedback

### Quality Coordination
- **Quality Planning**: Plan quality assurance activities
- **Quality Standards**: Define quality standards and criteria
- **Quality Control**: Implement quality control measures
- **Quality Assurance**: Ensure quality assurance processes
- **Quality Monitoring**: Monitor quality performance
- **Quality Improvement**: Improve quality processes
- **Quality Reporting**: Report quality status and trends
- **Quality Learning**: Learn from quality issues

### Risk Coordination
- **Risk Identification**: Identify project risks and opportunities
- **Risk Assessment**: Assess risk probability and impact
- **Risk Prioritization**: Prioritize risks based on severity
- **Risk Mitigation**: Develop risk mitigation strategies
- **Risk Monitoring**: Monitor risk status and changes
- **Risk Response**: Respond to risk events
- **Risk Reporting**: Report risk status and trends
- **Risk Learning**: Learn from risk events

### Communication Coordination
- **Communication Planning**: Plan communication activities
- **Communication Channels**: Define communication channels
- **Communication Content**: Develop communication content
- **Communication Timing**: Schedule communication activities
- **Communication Monitoring**: Monitor communication effectiveness
- **Communication Improvement**: Improve communication processes
- **Communication Reporting**: Report communication status
- **Communication Learning**: Learn from communication feedback

### Governance Coordination
- **Governance Structure**: Define governance structure and roles
- **Governance Processes**: Establish governance processes and procedures
- **Governance Policies**: Develop governance policies and guidelines
- **Governance Compliance**: Ensure governance compliance and audit
- **Governance Monitoring**: Monitor governance effectiveness
- **Governance Improvement**: Improve governance processes
- **Governance Reporting**: Report governance status and trends
- **Governance Learning**: Learn from governance insights

### Change Coordination
- **Change Identification**: Identify change requirements
- **Change Analysis**: Analyze change impact and implications
- **Change Planning**: Plan change implementation
- **Change Approval**: Coordinate change approval process
- **Change Implementation**: Implement change changes
- **Change Monitoring**: Monitor change progress
- **Change Reporting**: Report change status
- **Change Learning**: Learn from change outcomes

### Performance Coordination
- **Metrics Definition**: Define performance metrics and KPIs
- **Data Collection**: Collect performance data and information
- **Data Analysis**: Analyze performance data and trends
- **Performance Reporting**: Report performance status and trends
- **Performance Improvement**: Identify improvement opportunities
- **Performance Optimization**: Optimize performance processes
- **Performance Learning**: Learn from performance insights
- **Performance Culture**: Develop performance culture

## Examples

### Basic Workflow Coordination
```typescript
import { OrchestratorAgent } from '@osmanekrem/bmad-orchestrator'

const orchestrator = new OrchestratorAgent()

const result = await orchestrator.executeCommand('coordinate-workflow', {
  userInput: 'E-commerce platform development',
  projectType: 'software-development',
  teamSize: 8,
  workflowType: 'hybrid'
})

if (result.success) {
  console.log(result.output)
} else {
  console.error('Workflow coordination failed:', result.error)
}
```

### Advanced Project Coordination
```typescript
const projects = await orchestrator.executeCommand('coordinate-projects', {
  userInput: 'E-commerce platform development',
  projectType: 'software-development',
  teamSize: 15,
  coordinationLevel: 'program',
  options: {
    methodology: 'scrum',
    includeDependencies: true,
    includeQualityGates: true
  }
})

const coordinationData = projects.data as ProjectCoordination
console.log(`Coordinated ${coordinationData.projects.length} projects`)
```

### Custom Configuration
```typescript
const orchestrator = new OrchestratorAgent({
  defaultOutputFormat: 'json',
  projectType: 'mobile-development',
  teamSize: 'large',
  complexity: 'high',
  timeline: '18 months',
  budget: '$2,000,000',
  workflowType: 'parallel',
  coordinationLevel: 'portfolio',
  methodology: 'scrum',
  tools: ['jira', 'confluence', 'slack', 'zoom', 'monday', 'figma'],
  autoSave: false,
  templates: {
    coordination: ['custom-coordination-tmpl'],
    workflow: ['custom-workflow-tmpl'],
    communication: ['custom-communication-tmpl'],
    governance: ['custom-governance-tmpl']
  }
})

// Update configuration
orchestrator.updateConfig({
  methodology: 'kanban',
  coordinationLevel: 'enterprise'
})
```

## Orchestrator Best Practices

### Workflow Coordination
- **Design Efficient Workflows**: Create streamlined and efficient processes
- **Manage Dependencies**: Proactively manage workflow dependencies
- **Optimize Resource Utilization**: Ensure optimal resource allocation
- **Establish Quality Gates**: Implement quality checkpoints throughout
- **Monitor Performance**: Continuously monitor workflow performance
- **Facilitate Communication**: Maintain clear and open communication
- **Capture Lessons Learned**: Document and share workflow insights
- **Continuously Improve**: Regularly optimize workflow processes

### Project Coordination
- **Align with Strategy**: Ensure projects align with strategic objectives
- **Manage Dependencies**: Proactively manage inter-project dependencies
- **Optimize Resource Sharing**: Efficiently share resources across projects
- **Coordinate Stakeholders**: Align all stakeholders towards common goals
- **Maintain Quality Standards**: Ensure consistent quality across projects
- **Coordinate Risk Management**: Proactively manage portfolio risks
- **Facilitate Communication**: Maintain clear inter-project communication
- **Monitor Performance**: Track and optimize portfolio performance

### Resource Coordination
- **Plan Resource Requirements**: Accurately estimate resource needs
- **Optimize Resource Allocation**: Distribute resources efficiently
- **Monitor Resource Performance**: Track resource utilization and effectiveness
- **Develop Resource Capabilities**: Invest in resource development
- **Retain Key Resources**: Implement retention strategies
- **Share Resources Efficiently**: Optimize resource sharing across projects
- **Balance Resource Utilization**: Ensure balanced resource allocation
- **Report Resource Performance**: Provide clear resource reporting

### Stakeholder Coordination
- **Identify All Stakeholders**: Ensure comprehensive stakeholder identification
- **Analyze Stakeholder Influence**: Understand stakeholder power and interest
- **Develop Engagement Strategies**: Create tailored engagement approaches
- **Maintain Regular Communication**: Keep stakeholders informed and engaged
- **Monitor Stakeholder Satisfaction**: Track and improve stakeholder satisfaction
- **Coordinate Stakeholder Activities**: Align stakeholder efforts
- **Manage Stakeholder Conflicts**: Resolve stakeholder issues proactively
- **Learn from Stakeholder Feedback**: Capture and apply stakeholder insights

### Quality Coordination
- **Define Quality Standards**: Establish clear quality criteria
- **Implement Quality Controls**: Put quality control measures in place
- **Monitor Quality Performance**: Track quality metrics and trends
- **Coordinate Quality Activities**: Align quality efforts across projects
- **Share Quality Best Practices**: Distribute quality knowledge
- **Continuous Quality Improvement**: Continuously improve quality processes
- **Learn from Quality Issues**: Capture and apply quality lessons learned
- **Build Quality Culture**: Develop quality awareness and commitment

### Risk Coordination
- **Identify Risks Proactively**: Find risks early and often
- **Assess Risk Comprehensively**: Evaluate both probability and impact
- **Coordinate Risk Mitigation**: Align risk mitigation efforts
- **Monitor Risk Status**: Track risk status and changes
- **Share Risk Information**: Distribute risk knowledge
- **Respond to Risk Events**: Implement effective risk responses
- **Learn from Risk Events**: Capture lessons learned from risks
- **Build Risk Culture**: Develop risk awareness and management

### Communication Coordination
- **Plan Communication Strategically**: Develop comprehensive communication plans
- **Use Appropriate Channels**: Select the right communication channels
- **Develop Clear Content**: Create clear and effective messages
- **Schedule Communication Effectively**: Time communication appropriately
- **Monitor Communication Effectiveness**: Track communication success
- **Improve Communication Processes**: Continuously enhance communication
- **Coordinate Communication Activities**: Align communication efforts
- **Learn from Communication Feedback**: Capture and apply communication insights

### Governance Coordination
- **Establish Clear Structure**: Define governance roles and responsibilities
- **Develop Effective Processes**: Create efficient governance processes
- **Ensure Compliance**: Maintain adherence to policies and standards
- **Monitor Governance Effectiveness**: Track governance performance
- **Coordinate Governance Activities**: Align governance efforts
- **Share Governance Knowledge**: Distribute governance best practices
- **Continuously Improve**: Enhance governance processes over time
- **Build Governance Culture**: Develop governance awareness and commitment

### Change Coordination
- **Identify Changes Early**: Find change requirements proactively
- **Analyze Change Impact**: Assess change implications thoroughly
- **Plan Change Implementation**: Develop comprehensive change plans
- **Coordinate Change Approval**: Streamline change approval processes
- **Implement Changes Effectively**: Execute changes successfully
- **Monitor Change Progress**: Track change implementation
- **Learn from Changes**: Capture lessons learned from changes
- **Build Change Culture**: Develop change awareness and adaptability

### Performance Coordination
- **Define Relevant Metrics**: Select meaningful performance indicators
- **Collect Quality Data**: Ensure data accuracy and completeness
- **Analyze Performance Trends**: Identify patterns and insights
- **Coordinate Performance Activities**: Align performance efforts
- **Report Performance Effectively**: Communicate performance clearly
- **Drive Performance Improvement**: Use insights to improve performance
- **Share Performance Knowledge**: Distribute performance best practices
- **Build Performance Culture**: Develop performance awareness and commitment

## License

MIT
