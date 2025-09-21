# @osmanekrem/bmad-sm

BMad SM Agent - AI-driven Scrum Master and agile coaching specialist.

## Features

- 🏃‍♂️ **Sprint Planning**: Facilitate sprint planning and backlog refinement
- 📅 **Ceremony Facilitation**: Lead daily standups, retrospectives, and reviews
- 🎯 **Team Coaching**: Coach teams on agile practices and continuous improvement
- 🚧 **Impediment Removal**: Identify and remove team blockers and impediments
- 🔄 **Process Improvement**: Continuously improve team processes and practices
- 🤝 **Stakeholder Management**: Manage stakeholder communication and expectations
- 📊 **Metrics & Reporting**: Track and report team performance metrics
- ⚖️ **Conflict Resolution**: Resolve team conflicts and improve collaboration
- 📚 **Agile Training**: Provide agile training and knowledge sharing
- 👥 **Team Building**: Foster team collaboration and psychological safety

## Installation

```bash
npm install @osmanekrem/bmad-sm
```

## Quick Start

```typescript
import { SMAgent } from '@osmanekrem/bmad-sm'

// Initialize the SM agent
const sm = new SMAgent({
  defaultOutputFormat: 'markdown',
  sprintDuration: 2,
  teamSize: 'medium',
  agileFramework: 'scrum'
})

// Plan a sprint
const result = await sm.executeCommand('plan-sprint', {
  userInput: 'E-commerce platform development',
  teamSize: 8,
  sprintDuration: 2
})

console.log(result.output)
```

## Available Commands

### Sprint Planning
```typescript
const sprintPlan = await sm.executeCommand('plan-sprint', {
  userInput: 'E-commerce platform development',
  teamSize: 8,
  sprintDuration: 2,
  options: {
    teamCapacity: 320,
    sprintGoal: 'Implement user authentication and product catalog'
  }
})
```

### Daily Standup
```typescript
const standup = await sm.executeCommand('facilitate-standup', {
  userInput: 'Development team daily standup',
  teamSize: 8,
  options: {
    format: 'Traditional',
    duration: 15,
    participants: ['Dev Team', 'Product Owner']
  }
})
```

### Sprint Review
```typescript
const review = await sm.executeCommand('conduct-sprint-review', {
  userInput: 'Sprint 5 review and demo',
  teamSize: 8,
  options: {
    stakeholders: ['Product Owner', 'Stakeholders', 'Team'],
    format: 'Demo and discussion'
  }
})
```

### Retrospective
```typescript
const retrospective = await sm.executeCommand('facilitate-retrospective', {
  userInput: 'Sprint 5 retrospective',
  teamSize: 8,
  options: {
    format: 'Start-Stop-Continue',
    duration: 60
  }
})
```

### Backlog Refinement
```typescript
const refinement = await sm.executeCommand('refine-backlog', {
  userInput: 'Product backlog refinement',
  teamSize: 8,
  options: {
    format: 'Comprehensive grooming',
    duration: 120,
    participants: ['Product Owner', 'Team', 'Stakeholders']
  }
})
```

### Team Coaching
```typescript
const coaching = await sm.executeCommand('coach-team', {
  userInput: 'Agile practices and continuous improvement',
  teamSize: 8,
  options: {
    focusAreas: ['Sprint planning', 'Daily standups', 'Retrospectives'],
    duration: 'Ongoing',
    participants: ['Development Team']
  }
})
```

### Impediment Removal
```typescript
const impediments = await sm.executeCommand('remove-impediments', {
  userInput: 'Development team blockers',
  teamSize: 8,
  options: {
    impedimentTypes: 'All types',
    priority: 'High priority',
    escalation: 'As needed'
  }
})
```

### Process Improvement
```typescript
const improvement = await sm.executeCommand('improve-processes', {
  userInput: 'Sprint planning and ceremonies',
  teamSize: 8,
  options: {
    focusAreas: ['Sprint planning', 'ceremonies', 'collaboration'],
    approach: 'Continuous improvement',
    duration: 'Ongoing'
  }
})
```

### Metrics Tracking
```typescript
const metrics = await sm.executeCommand('track-metrics', {
  userInput: 'Team performance metrics',
  teamSize: 8,
  options: {
    metricsTypes: 'All metrics',
    frequency: 'Weekly',
    reporting: 'Team and stakeholders'
  }
})
```

### Conflict Resolution
```typescript
const conflicts = await sm.executeCommand('resolve-conflicts', {
  userInput: 'Team collaboration issues',
  teamSize: 8,
  options: {
    conflictTypes: 'All types',
    approach: 'Collaborative resolution',
    escalation: 'As needed'
  }
})
```

## Configuration

```typescript
const sm = new SMAgent({
  defaultOutputFormat: 'markdown',     // 'markdown' | 'json' | 'yaml' | 'text'
  sprintDuration: 2,                   // Sprint duration in weeks
  teamSize: 'medium',                  // 'small' | 'medium' | 'large'
  agileFramework: 'scrum',            // 'scrum' | 'kanban' | 'scrumban' | 'saf' | 'less' | 'nexus'
  ceremonies: ['sprint-planning', 'daily-standup', 'sprint-review', 'retrospective', 'backlog-refinement'],
  tools: ['jira', 'confluence', 'slack', 'zoom'],
  autoSave: true,                     // Auto-save sprint plans
  templates: {
    planning: ['sprint-plan-tmpl'],
    ceremonies: ['ceremony-tmpl'],
    coaching: ['coaching-tmpl'],
    retrospectives: ['retrospective-tmpl']
  }
})
```

## Template Integration

The SM agent integrates with the BMad template system for structured output:

```typescript
import { SMTemplateManager } from '@osmanekrem/bmad-sm'

const templateManager = new SMTemplateManager()

// Render sprint plan with template
const formattedOutput = await templateManager.renderSprintPlanTemplate(
  'sprint-plan-tmpl',
  context,
  sprintPlanData
)
```

## API Reference

### SMAgent

#### Constructor
```typescript
new SMAgent(config?: Partial<SMConfig>)
```

#### Methods
- `executeCommand(commandName: string, context: SMContext): Promise<SMResponse>`
- `getAvailableCommands(): string[]`
- `getCommandDescription(commandName: string): string | undefined`
- `updateConfig(newConfig: Partial<SMConfig>): void`
- `getConfig(): SMConfig`

### Types

#### SMContext
```typescript
interface SMContext {
  projectPath?: string
  userInput?: string
  options?: Record<string, any>
  templates?: string[]
  outputFormat?: 'markdown' | 'json' | 'yaml' | 'text'
  teamSize?: number
  sprintDuration?: number
}
```

#### SMResponse
```typescript
interface SMResponse {
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

## Agile Framework

### Scrum Master Role
1. **Sprint Planning**: Plan sprints and define sprint goals
2. **Daily Standups**: Facilitate daily team synchronization
3. **Sprint Review**: Review completed work with stakeholders
4. **Retrospectives**: Reflect on team performance and improve
5. **Backlog Refinement**: Keep product backlog healthy and ready
6. **Coaching**: Coach teams on agile practices and mindset

### Ceremonies
- **Sprint Planning**: Plan upcoming sprint work
- **Daily Standup**: Daily team synchronization
- **Sprint Review**: Demonstrate completed work
- **Retrospective**: Reflect and improve team practices
- **Backlog Refinement**: Groom and prioritize backlog items

### Core Principles
- **Servant Leadership**: Serve the team and remove impediments
- **Continuous Improvement**: Always seek to improve processes and practices
- **Transparency**: Maintain transparency in all team activities
- **Inspection & Adaptation**: Regularly inspect and adapt team practices
- **Empowerment**: Empower teams to self-organize and make decisions
- **Value Delivery**: Focus on delivering value to customers

## Examples

### Basic Sprint Planning
```typescript
import { SMAgent } from '@osmanekrem/bmad-sm'

const sm = new SMAgent()

const result = await sm.executeCommand('plan-sprint', {
  userInput: 'Mobile app development',
  teamSize: 6,
  sprintDuration: 2
})

if (result.success) {
  console.log(result.output)
} else {
  console.error('Sprint planning failed:', result.error)
}
```

### Advanced Team Coaching
```typescript
const coaching = await sm.executeCommand('coach-team', {
  userInput: 'Improve sprint planning and daily standups',
  teamSize: 8,
  options: {
    focusAreas: ['Sprint planning', 'Daily standups', 'Retrospectives'],
    duration: 'Ongoing',
    participants: ['Development Team'],
    includeMetrics: true,
    includeActionItems: true
  }
})

const coachingData = coaching.data as TeamCoaching
console.log(`Coaching focus: ${coachingData.focus.join(', ')}`)
console.log(`Action items: ${coachingData.actionItems.length}`)
```

### Custom Configuration
```typescript
const sm = new SMAgent({
  defaultOutputFormat: 'json',
  sprintDuration: 3,
  teamSize: 'large',
  agileFramework: 'kanban',
  ceremonies: ['daily-standup', 'retrospective'],
  tools: ['jira', 'slack'],
  autoSave: false,
  templates: {
    planning: ['custom-sprint-plan-tmpl'],
    ceremonies: ['ceremony-tmpl'],
    coaching: ['coaching-tmpl'],
    retrospectives: ['retrospective-tmpl']
  }
})

// Update configuration
sm.updateConfig({
  sprintDuration: 2,
  agileFramework: 'scrum'
})
```

## Scrum Master Best Practices

### Sprint Planning
- Define clear sprint goals and objectives
- Select appropriate user stories for the sprint
- Break down user stories into actionable tasks
- Plan team capacity and availability
- Identify and plan for risks and dependencies

### Daily Standups
- Keep standups focused and time-boxed
- Encourage team participation and engagement
- Identify and address blockers quickly
- Make quick decisions and assign action items
- Track standup effectiveness and participation

### Retrospectives
- Create a safe environment for team feedback
- Use appropriate retrospective formats
- Focus on actionable improvements
- Follow up on action items and progress
- Measure retrospective effectiveness

### Team Coaching
- Assess current team practices and maturity
- Create targeted coaching plans
- Develop team skills and capabilities
- Improve team processes and practices
- Build collaborative and learning culture

### Impediment Removal
- Identify impediments quickly and accurately
- Assess impact and urgency
- Plan resolution strategies
- Escalate when necessary
- Follow up on resolution progress

## License

MIT
