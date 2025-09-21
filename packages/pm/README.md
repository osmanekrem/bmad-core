# @osmanekrem/bmad-pm

BMad PM Agent - AI-driven project management and planning specialist.

## Features

- 📋 **Project Planning**: Create comprehensive project plans and roadmaps
- 🔨 **Task Breakdown**: Break down complex projects into manageable tasks
- 👥 **Resource Planning**: Plan and allocate resources effectively
- ⚠️ **Risk Management**: Identify and manage project risks
- 📅 **Timeline Management**: Create realistic project timelines
- 🤝 **Stakeholder Management**: Manage stakeholder communication and expectations
- ✅ **Quality Assurance**: Ensure project quality standards
- 📊 **Progress Tracking**: Monitor and track project progress
- 💰 **Budget Planning**: Create project budget and cost estimates
- 📢 **Communication Planning**: Plan project communication strategy

## Installation

```bash
npm install @osmanekrem/bmad-pm
```

## Quick Start

```typescript
import { PMAgent } from '@osmanekrem/bmad-pm'

// Initialize the PM agent
const pm = new PMAgent({
  defaultOutputFormat: 'markdown',
  projectMethodology: 'agile',
  teamSize: 'medium'
})

// Create project plan
const result = await pm.executeCommand('create-project-plan', {
  userInput: 'E-commerce platform development',
  projectType: 'Software Development',
  teamSize: 8,
  timeline: '6 months'
})

console.log(result.output)
```

## Available Commands

### Project Planning
```typescript
const plan = await pm.executeCommand('create-project-plan', {
  userInput: 'E-commerce platform development',
  projectType: 'Software Development',
  teamSize: 8,
  timeline: '6 months',
  options: {
    methodology: 'agile',
    budget: 500000,
    qualityStandards: 'ISO 9001'
  }
})
```

### Task Breakdown
```typescript
const breakdown = await pm.executeCommand('breakdown-tasks', {
  userInput: 'User authentication system implementation',
  projectType: 'Software Development',
  teamSize: 5,
  timeline: '2 months'
})
```

### Resource Planning
```typescript
const resources = await pm.executeCommand('plan-resources', {
  userInput: 'Full-stack development team',
  projectType: 'Software Development',
  teamSize: 10,
  options: {
    budget: 800000,
    includeExternal: true,
    includeEquipment: true
  }
})
```

### Risk Management
```typescript
const risks = await pm.executeCommand('manage-risks', {
  userInput: 'High-risk software project',
  projectType: 'Software Development',
  teamSize: 12,
  options: {
    riskTolerance: 'low',
    includeMitigation: true,
    includeContingency: true
  }
})
```

### Timeline Management
```typescript
const timeline = await pm.executeCommand('create-timeline', {
  userInput: 'Mobile app development project',
  projectType: 'Mobile Development',
  teamSize: 6,
  timeline: '4 months',
  options: {
    includeBuffer: true,
    includeHolidays: true,
    criticalPath: true
  }
})
```

### Stakeholder Management
```typescript
const stakeholders = await pm.executeCommand('manage-stakeholders', {
  userInput: 'Enterprise software implementation',
  projectType: 'Software Development',
  teamSize: 15,
  options: {
    stakeholderCount: 25,
    includeCommunication: true,
    includeExpectations: true
  }
})
```

### Quality Planning
```typescript
const quality = await pm.executeCommand('plan-quality', {
  userInput: 'Financial services application',
  projectType: 'Software Development',
  teamSize: 8,
  options: {
    qualityStandards: 'PCI DSS, SOX',
    includeTesting: true,
    includeReviews: true
  }
})
```

### Progress Tracking
```typescript
const progress = await pm.executeCommand('track-progress', {
  userInput: 'Ongoing software development project',
  projectType: 'Software Development',
  teamSize: 10,
  options: {
    trackingFrequency: 'weekly',
    includeMetrics: true,
    includeReporting: true
  }
})
```

### Budget Planning
```typescript
const budget = await pm.executeCommand('plan-budget', {
  userInput: 'Cloud migration project',
  projectType: 'Infrastructure',
  teamSize: 12,
  timeline: '8 months',
  options: {
    budgetRange: '1M-2M',
    includeContingency: true,
    includePhases: true
  }
})
```

### Communication Planning
```typescript
const communication = await pm.executeCommand('plan-communication', {
  userInput: 'Multi-team software project',
  projectType: 'Software Development',
  teamSize: 20,
  options: {
    stakeholderCount: 30,
    includeMeetings: true,
    includeReports: true
  }
})
```

## Configuration

```typescript
const pm = new PMAgent({
  defaultOutputFormat: 'markdown',     // 'markdown' | 'json' | 'yaml' | 'text'
  projectMethodology: 'agile',        // 'agile' | 'waterfall' | 'hybrid' | 'scrum' | 'kanban'
  teamSize: 'medium',                 // 'small' | 'medium' | 'large'
  autoSave: true,                     // Auto-save project plans
  templates: {
    planning: ['project-plan-tmpl'],
    tracking: ['progress-tracking-tmpl'],
    reporting: ['status-report-tmpl'],
    risk: ['risk-assessment-tmpl']
  }
})
```

## Template Integration

The PM agent integrates with the BMad template system for structured output:

```typescript
import { PMTemplateManager } from '@osmanekrem/bmad-pm'

const templateManager = new PMTemplateManager()

// Render project plan with template
const formattedOutput = await templateManager.renderProjectPlanTemplate(
  'project-plan-tmpl',
  context,
  projectPlanData
)
```

## API Reference

### PMAgent

#### Constructor
```typescript
new PMAgent(config?: Partial<PMConfig>)
```

#### Methods
- `executeCommand(commandName: string, context: PMContext): Promise<PMResponse>`
- `getAvailableCommands(): string[]`
- `getCommandDescription(commandName: string): string | undefined`
- `updateConfig(newConfig: Partial<PMConfig>): void`
- `getConfig(): PMConfig`

### Types

#### PMContext
```typescript
interface PMContext {
  projectPath?: string
  userInput?: string
  options?: Record<string, any>
  templates?: string[]
  outputFormat?: 'markdown' | 'json' | 'yaml' | 'text'
  projectType?: string
  teamSize?: number
  timeline?: string
}
```

#### PMResponse
```typescript
interface PMResponse {
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

## Project Management Methodologies

### Agile
- Iterative development with regular feedback
- Sprint-based planning and execution
- Continuous improvement and adaptation
- Cross-functional teams and collaboration

### Waterfall
- Sequential project phases
- Detailed upfront planning
- Clear phase gates and deliverables
- Formal documentation and approval

### Hybrid
- Combination of agile and waterfall approaches
- Flexible planning with structured phases
- Adaptable to project requirements
- Balanced approach to project management

### Scrum
- Agile framework with sprints
- Defined roles and responsibilities
- Regular ceremonies and reviews
- Continuous improvement and adaptation

### Kanban
- Visual workflow management
- Continuous delivery and improvement
- Work-in-progress limits
- Flow-based project management

## Examples

### Basic Project Planning
```typescript
import { PMAgent } from '@osmanekrem/bmad-pm'

const pm = new PMAgent()

const result = await pm.executeCommand('create-project-plan', {
  userInput: 'Mobile app development project',
  projectType: 'Mobile Development',
  teamSize: 6,
  timeline: '4 months'
})

if (result.success) {
  console.log(result.output)
} else {
  console.error('Project planning failed:', result.error)
}
```

### Advanced Task Breakdown
```typescript
const breakdown = await pm.executeCommand('breakdown-tasks', {
  userInput: 'E-commerce platform development',
  projectType: 'Software Development',
  teamSize: 10,
  timeline: '6 months',
  options: {
    includeDependencies: true,
    includeResources: true,
    includeRisks: true,
    includeAcceptance: true
  }
})

const breakdownData = breakdown.data as TaskBreakdown
console.log(`Total tasks: ${breakdownData.tasks.length}`)
console.log(`Dependencies: ${breakdownData.dependencies.length}`)
```

### Custom Configuration
```typescript
const pm = new PMAgent({
  defaultOutputFormat: 'json',
  projectMethodology: 'scrum',
  teamSize: 'large',
  autoSave: false,
  templates: {
    planning: ['custom-project-tmpl'],
    tracking: ['progress-tracking-tmpl'],
    reporting: ['status-report-tmpl'],
    risk: ['risk-assessment-tmpl']
  }
})

// Update configuration
pm.updateConfig({
  projectMethodology: 'hybrid',
  teamSize: 'medium'
})
```

## Project Management Best Practices

### Planning
- Define clear project objectives and scope
- Create realistic timelines and budgets
- Identify and manage risks proactively
- Plan for quality and testing

### Execution
- Monitor progress regularly
- Communicate effectively with stakeholders
- Manage changes and scope creep
- Maintain quality standards

### Monitoring
- Track key performance indicators
- Conduct regular reviews and retrospectives
- Identify and resolve issues quickly
- Adapt to changing requirements

### Closing
- Complete all deliverables
- Conduct lessons learned sessions
- Document project outcomes
- Celebrate team achievements

## License

MIT
