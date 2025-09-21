# @osmanekrem/bmad-ux

BMad UX Expert Agent - AI-driven user experience design and research specialist.

## Features

- 🔍 **User Research**: Conduct user research, interviews, surveys, and usability testing
- 👤 **User Personas**: Create detailed user personas and user journey maps
- 📐 **Wireframing**: Design low-fidelity and high-fidelity wireframes
- 🎨 **Prototyping**: Create interactive prototypes for user testing
- 🧪 **Usability Testing**: Plan and conduct usability testing sessions
- ♿ **Accessibility Audits**: Perform accessibility audits and compliance checks
- 🎯 **Design Systems**: Create and maintain design systems and component libraries
- 🗂️ **Information Architecture**: Design intuitive information architecture and navigation
- 🎭 **Interaction Design**: Design user interactions and micro-interactions
- 🎨 **Visual Design**: Create visual designs and design specifications

## Installation

```bash
npm install @osmanekrem/bmad-ux
```

## Quick Start

```typescript
import { UXAgent } from '@osmanekrem/bmad-ux'

// Initialize the UX agent
const ux = new UXAgent({
  defaultOutputFormat: 'markdown',
  targetAudience: 'general',
  platform: 'web',
  deviceType: 'desktop'
})

// Conduct user research
const result = await ux.executeCommand('conduct-user-research', {
  userInput: 'E-commerce mobile app',
  targetAudience: 'mobile users',
  platform: 'mobile'
})

console.log(result.output)
```

## Available Commands

### User Research
```typescript
const research = await ux.executeCommand('conduct-user-research', {
  userInput: 'E-commerce mobile app',
  targetAudience: 'mobile users',
  platform: 'mobile',
  options: {
    researchMethods: ['user-interviews', 'surveys', 'usability-testing'],
    objectives: 'Understand user needs and pain points'
  }
})
```

### User Personas
```typescript
const personas = await ux.executeCommand('create-user-personas', {
  userInput: 'E-commerce mobile app',
  targetAudience: 'mobile users',
  options: {
    personaCount: 3,
    researchData: 'Based on user research findings'
  }
})
```

### User Journey Mapping
```typescript
const journey = await ux.executeCommand('map-user-journey', {
  userInput: 'E-commerce mobile app',
  targetAudience: 'mobile users',
  options: {
    journeyScope: 'Complete shopping experience',
    persona: 'Primary user persona'
  }
})
```

### Wireframing
```typescript
const wireframes = await ux.executeCommand('create-wireframes', {
  userInput: 'E-commerce mobile app',
  targetAudience: 'mobile users',
  platform: 'mobile',
  options: {
    fidelity: 'Medium',
    pages: 'Key user flows and pages'
  }
})
```

### Prototyping
```typescript
const prototype = await ux.executeCommand('create-prototypes', {
  userInput: 'E-commerce mobile app',
  targetAudience: 'mobile users',
  platform: 'mobile',
  options: {
    fidelity: 'High',
    interactions: 'Key user flows and interactions'
  }
})
```

### Usability Testing
```typescript
const testing = await ux.executeCommand('conduct-usability-testing', {
  userInput: 'E-commerce mobile app',
  targetAudience: 'mobile users',
  platform: 'mobile',
  options: {
    testType: 'Moderated usability testing',
    participants: '5-8 users'
  }
})
```

### Accessibility Audit
```typescript
const audit = await ux.executeCommand('audit-accessibility', {
  userInput: 'E-commerce mobile app',
  targetAudience: 'mobile users',
  platform: 'mobile',
  options: {
    standards: ['WCAG 2.1 AA'],
    scope: 'Complete application'
  }
})
```

### Design System
```typescript
const designSystem = await ux.executeCommand('create-design-system', {
  userInput: 'E-commerce mobile app',
  targetAudience: 'mobile users',
  platform: 'mobile',
  options: {
    systemType: 'Comprehensive design system',
    components: 'All necessary UI components'
  }
})
```

### Information Architecture
```typescript
const ia = await ux.executeCommand('design-information-architecture', {
  userInput: 'E-commerce mobile app',
  targetAudience: 'mobile users',
  platform: 'mobile',
  options: {
    contentScope: 'Complete content structure',
    navigation: 'Primary and secondary navigation'
  }
})
```

### Interaction Design
```typescript
const interactions = await ux.executeCommand('design-interactions', {
  userInput: 'E-commerce mobile app',
  targetAudience: 'mobile users',
  platform: 'mobile',
  options: {
    interactionScope: 'All user interactions',
    microInteractions: 'Key micro-interactions'
  }
})
```

## Configuration

```typescript
const ux = new UXAgent({
  defaultOutputFormat: 'markdown',     // 'markdown' | 'json' | 'yaml' | 'text'
  targetAudience: 'general',           // Target user audience
  platform: 'web',                    // 'web' | 'mobile' | 'desktop' | 'tablet' | 'watch' | 'tv' | 'other'
  deviceType: 'desktop',               // 'phone' | 'tablet' | 'desktop' | 'watch' | 'tv' | 'other'
  designSystem: 'default',             // Design system to use
  accessibilityStandards: ['WCAG 2.1 AA'], // Accessibility standards
  researchMethods: ['user-interviews', 'surveys', 'usability-testing'], // Research methods
  testingTools: ['Figma', 'InVision', 'UserTesting'], // Testing tools
  prototypingTools: ['Figma', 'Sketch', 'Adobe XD'], // Prototyping tools
  autoSave: true,                      // Auto-save designs
  templates: {
    research: ['user-research-tmpl'],
    design: ['wireframe-tmpl', 'prototype-tmpl'],
    testing: ['usability-test-tmpl'],
    accessibility: ['accessibility-audit-tmpl']
  }
})
```

## Template Integration

The UX agent integrates with the BMad template system for structured output:

```typescript
import { UXTemplateManager } from '@osmanekrem/bmad-ux'

const templateManager = new UXTemplateManager()

// Render user research with template
const formattedOutput = await templateManager.renderUserResearchTemplate(
  'user-research-tmpl',
  context,
  researchData
)
```

## API Reference

### UXAgent

#### Constructor
```typescript
new UXAgent(config?: Partial<UXConfig>)
```

#### Methods
- `executeCommand(commandName: string, context: UXContext): Promise<UXResponse>`
- `getAvailableCommands(): string[]`
- `getCommandDescription(commandName: string): string | undefined`
- `updateConfig(newConfig: Partial<UXConfig>): void`
- `getConfig(): UXConfig`

### Types

#### UXContext
```typescript
interface UXContext {
  projectPath?: string
  userInput?: string
  options?: Record<string, any>
  templates?: string[]
  outputFormat?: 'markdown' | 'json' | 'yaml' | 'text'
  targetAudience?: string
  platform?: string
  deviceType?: string
}
```

#### UXResponse
```typescript
interface UXResponse {
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

## UX Design Process

### 1. Research Phase
- **User Interviews**: One-on-one interviews with target users
- **Surveys**: Quantitative research through online surveys
- **Usability Testing**: Observe users interacting with designs
- **Focus Groups**: Group discussions with target users
- **Field Studies**: Observe users in their natural environment
- **Analytics Analysis**: Analyze user behavior data
- **Competitive Analysis**: Study competitor designs and strategies

### 2. Ideate Phase
- **User Personas**: Create detailed profiles of target users
- **User Journey Maps**: Visual representation of user experiences
- **Information Architecture**: Design content structure and navigation
- **Wireframes**: Low-fidelity layout designs
- **Prototypes**: Interactive design mockups

### 3. Design Phase
- **Visual Design**: Create high-fidelity visual designs
- **Design Systems**: Component libraries and design guidelines
- **Interaction Design**: User interactions and micro-interactions
- **Responsive Design**: Ensure designs work across devices
- **Accessibility**: Make designs accessible to all users

### 4. Test Phase
- **Usability Testing**: Validate designs with users
- **Accessibility Audits**: Check accessibility compliance
- **A/B Testing**: Compare design variations
- **User Feedback**: Collect and analyze user feedback

### 5. Iterate Phase
- **Design Refinement**: Improve designs based on feedback
- **Performance Optimization**: Optimize for speed and usability
- **Continuous Improvement**: Ongoing design improvements

## Research Methods

### User Interviews
- **One-on-one interviews** with target users
- **Semi-structured questions** to gather insights
- **Follow-up questions** to dive deeper
- **Recording and transcription** for analysis

### Surveys
- **Online surveys** for quantitative data
- **Multiple choice questions** for easy analysis
- **Rating scales** for satisfaction measurement
- **Open-ended questions** for qualitative insights

### Usability Testing
- **Task-based testing** with realistic scenarios
- **Think-aloud protocol** to understand user thoughts
- **Performance metrics** like completion rate and time
- **Error analysis** to identify usability issues

### Focus Groups
- **Group discussions** with target users
- **Moderated sessions** to guide conversation
- **Diverse perspectives** from multiple users
- **Interactive activities** to engage participants

## Design Deliverables

### User Research
- **Research Reports**: Comprehensive findings and insights
- **Participant Profiles**: Detailed user characteristics
- **Research Questions**: Structured interview guides
- **Findings**: Key insights and recommendations

### User Personas
- **Persona Profiles**: Detailed user characteristics
- **Demographics**: Age, gender, location, occupation
- **Psychographics**: Goals, motivations, frustrations
- **Scenarios**: Specific use cases and user stories

### User Journey Maps
- **Journey Stages**: Key phases in user experience
- **Touchpoints**: All user interactions
- **Emotions**: User feelings throughout journey
- **Pain Points**: Problems and opportunities

### Wireframes
- **Layout Designs**: Page structure and layout
- **Component Specifications**: UI element details
- **Interaction Notes**: User interaction guidelines
- **Responsive Breakpoints**: Multi-device considerations

### Prototypes
- **Interactive Mockups**: Clickable design prototypes
- **User Flows**: Complete user journeys
- **Animation Specifications**: Transitions and micro-interactions
- **Testing Scenarios**: Usability test plans

### Usability Test Reports
- **Test Results**: Performance metrics and findings
- **Participant Feedback**: User quotes and insights
- **Recommendations**: Actionable improvement suggestions
- **Next Steps**: Follow-up actions and iterations

### Accessibility Audit Reports
- **Compliance Status**: WCAG compliance assessment
- **Issue Details**: Specific accessibility problems
- **Severity Levels**: Priority and impact ratings
- **Solutions**: Implementation recommendations

### Design System Documentation
- **Component Library**: Reusable UI components
- **Design Tokens**: Colors, typography, spacing
- **Usage Guidelines**: How to use components
- **Code Examples**: Implementation snippets

## Examples

### Basic User Research
```typescript
import { UXAgent } from '@osmanekrem/bmad-ux'

const ux = new UXAgent()

const result = await ux.executeCommand('conduct-user-research', {
  userInput: 'Mobile banking app',
  targetAudience: 'banking customers',
  platform: 'mobile'
})

if (result.success) {
  console.log(result.output)
} else {
  console.error('User research failed:', result.error)
}
```

### Advanced User Personas
```typescript
const personas = await ux.executeCommand('create-user-personas', {
  userInput: 'E-commerce platform',
  targetAudience: 'online shoppers',
  options: {
    personaCount: 4,
    researchData: 'Based on user research findings',
    includeScenarios: true,
    includeQuotes: true
  }
})

const personaData = personas.data as UserPersona[]
console.log(`Created ${personaData.length} personas`)
```

### Custom Configuration
```typescript
const ux = new UXAgent({
  defaultOutputFormat: 'json',
  targetAudience: 'mobile users',
  platform: 'mobile',
  deviceType: 'phone',
  designSystem: 'material-design',
  accessibilityStandards: ['WCAG 2.1 AAA'],
  researchMethods: ['user-interviews', 'usability-testing'],
  testingTools: ['Figma', 'UserTesting'],
  prototypingTools: ['Figma', 'Principle'],
  autoSave: false,
  templates: {
    research: ['custom-research-tmpl'],
    design: ['custom-wireframe-tmpl'],
    testing: ['custom-test-tmpl'],
    accessibility: ['custom-audit-tmpl']
  }
})

// Update configuration
ux.updateConfig({
  platform: 'web',
  deviceType: 'desktop'
})
```

## UX Best Practices

### User-Centered Design
- **Always prioritize user needs** over business requirements
- **Conduct user research** before making design decisions
- **Test designs with real users** to validate assumptions
- **Iterate based on user feedback** to improve designs

### Accessibility
- **Follow WCAG guidelines** for accessibility compliance
- **Test with assistive technologies** like screen readers
- **Ensure keyboard navigation** works for all interactions
- **Use sufficient color contrast** for text readability

### Usability
- **Keep interfaces simple** and easy to understand
- **Use consistent patterns** across all touchpoints
- **Provide clear feedback** for user actions
- **Design for error prevention** and recovery

### Responsive Design
- **Design for multiple devices** and screen sizes
- **Use flexible layouts** that adapt to different screens
- **Test on real devices** to ensure proper functionality
- **Consider touch interactions** for mobile devices

### Performance
- **Optimize images and assets** for fast loading
- **Minimize HTTP requests** to improve performance
- **Use progressive enhancement** for better user experience
- **Test performance** across different network conditions

## License

MIT
