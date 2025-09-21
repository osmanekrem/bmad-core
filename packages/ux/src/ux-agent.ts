import { BaseAgentImpl, AgentContext, AgentResponse } from '@osmanekrem/bmad-core'
import { 
  UXCommand, 
  UXContext, 
  UXResponse, 
  UserResearch,
  UserPersona,
  UserJourney,
  Wireframe,
  Prototype,
  UsabilityTest,
  AccessibilityAudit,
  DesignSystem,
  UXConfig as UXConfigType
} from './types/index.js'

export class UXAgent extends BaseAgentImpl {
  private uxConfig: UXConfigType
  private commands: Map<string, UXCommand> = new Map()

  constructor(config?: Partial<UXConfigType>) {
    super({
      systemPrompt: `You are the BMad UX Expert, an AI-driven user experience design and research specialist. Your role is to:

1. **User Research**: Conduct user research, interviews, surveys, and usability testing
2. **User Personas**: Create detailed user personas and user journey maps
3. **Wireframing**: Design low-fidelity and high-fidelity wireframes
4. **Prototyping**: Create interactive prototypes for user testing
5. **Usability Testing**: Plan and conduct usability testing sessions
6. **Accessibility Audits**: Perform accessibility audits and compliance checks
7. **Design Systems**: Create and maintain design systems and component libraries
8. **Information Architecture**: Design intuitive information architecture and navigation
9. **Interaction Design**: Design user interactions and micro-interactions
10. **Visual Design**: Create visual designs and design specifications

## Core Principles:
- **User-Centered Design**: Always prioritize user needs and goals
- **Accessibility**: Ensure designs are accessible to all users
- **Usability**: Create intuitive and easy-to-use interfaces
- **Consistency**: Maintain design consistency across all touchpoints
- **Iteration**: Continuously iterate and improve based on user feedback
- **Evidence-Based**: Base design decisions on user research and data

## UX Design Process:
1. **Research**: Understand users, their needs, and behaviors
2. **Ideate**: Generate design concepts and solutions
3. **Design**: Create wireframes, prototypes, and visual designs
4. **Test**: Validate designs with users through testing
5. **Iterate**: Refine designs based on feedback and data
6. **Implement**: Work with developers to implement designs

## Research Methods:
- **User Interviews**: One-on-one interviews with target users
- **Surveys**: Quantitative research through online surveys
- **Usability Testing**: Observe users interacting with designs
- **Focus Groups**: Group discussions with target users
- **Field Studies**: Observe users in their natural environment
- **Analytics Analysis**: Analyze user behavior data
- **Competitive Analysis**: Study competitor designs and strategies

## Design Deliverables:
- **User Personas**: Detailed profiles of target users
- **User Journey Maps**: Visual representation of user experiences
- **Wireframes**: Low-fidelity layout designs
- **Prototypes**: Interactive design mockups
- **Usability Test Reports**: Findings from user testing
- **Accessibility Audit Reports**: Accessibility compliance reports
- **Design System Documentation**: Component library and guidelines
- **Design Specifications**: Detailed design implementation guides

## Output Format:
- Use structured markdown with clear headings
- Include visual descriptions and design specifications
- Provide actionable recommendations and next steps
- Include user research insights and findings
- Document design decisions and rationale
- Include accessibility considerations and guidelines

Always focus on creating user-centered, accessible, and usable designs that solve real user problems.`
    })

    this.uxConfig = {
      defaultOutputFormat: 'markdown',
      targetAudience: 'general',
      platform: 'web',
      deviceType: 'desktop',
      designSystem: 'default',
      accessibilityStandards: ['WCAG 2.1 AA'],
      researchMethods: ['user-interviews', 'surveys', 'usability-testing'],
      testingTools: ['Figma', 'InVision', 'UserTesting'],
      prototypingTools: ['Figma', 'Sketch', 'Adobe XD'],
      autoSave: true,
      templates: {
        research: ['user-research-tmpl'],
        design: ['wireframe-tmpl', 'prototype-tmpl'],
        testing: ['usability-test-tmpl'],
        accessibility: ['accessibility-audit-tmpl']
      },
      ...config
    }

    this.initializeCommands()
  }

  // Implement abstract method from BaseAgentImpl
  async execute(command: string, context: AgentContext): Promise<AgentResponse> {
    // This method is required by BaseAgentImpl but not used in UXAgent
    // We use executeCommand instead
    throw new Error('Use executeCommand method instead of execute')
  }

  private initializeCommands(): void {
    // User Research Command
    this.commands.set('conduct-user-research', {
      name: 'conduct-user-research',
      description: 'Conduct user research through interviews, surveys, and usability testing',
      execute: async (context) => this.executeUserResearch(context)
    })

    // User Persona Command
    this.commands.set('create-user-personas', {
      name: 'create-user-personas',
      description: 'Create detailed user personas based on research data',
      execute: async (context) => this.executeUserPersonas(context)
    })

    // User Journey Command
    this.commands.set('map-user-journey', {
      name: 'map-user-journey',
      description: 'Create user journey maps to visualize user experiences',
      execute: async (context) => this.executeUserJourney(context)
    })

    // Wireframe Command
    this.commands.set('create-wireframes', {
      name: 'create-wireframes',
      description: 'Design wireframes for user interfaces',
      execute: async (context) => this.executeWireframes(context)
    })

    // Prototype Command
    this.commands.set('create-prototypes', {
      name: 'create-prototypes',
      description: 'Create interactive prototypes for user testing',
      execute: async (context) => this.executePrototypes(context)
    })

    // Usability Testing Command
    this.commands.set('conduct-usability-testing', {
      name: 'conduct-usability-testing',
      description: 'Plan and conduct usability testing sessions',
      execute: async (context) => this.executeUsabilityTesting(context)
    })

    // Accessibility Audit Command
    this.commands.set('audit-accessibility', {
      name: 'audit-accessibility',
      description: 'Perform accessibility audits and compliance checks',
      execute: async (context) => this.executeAccessibilityAudit(context)
    })

    // Design System Command
    this.commands.set('create-design-system', {
      name: 'create-design-system',
      description: 'Create and maintain design systems and component libraries',
      execute: async (context) => this.executeDesignSystem(context)
    })

    // Information Architecture Command
    this.commands.set('design-information-architecture', {
      name: 'design-information-architecture',
      description: 'Design intuitive information architecture and navigation',
      execute: async (context) => this.executeInformationArchitecture(context)
    })

    // Interaction Design Command
    this.commands.set('design-interactions', {
      name: 'design-interactions',
      description: 'Design user interactions and micro-interactions',
      execute: async (context) => this.executeInteractionDesign(context)
    })
  }

  async executeCommand(commandName: string, context: UXContext): Promise<UXResponse> {
    const command = this.commands.get(commandName)
    if (!command) {
      return {
        success: false,
        error: `Command '${commandName}' not found`,
        metadata: {
          command: commandName,
          timestamp: new Date().toISOString()
        }
      }
    }

    try {
      const startTime = Date.now()
      const result = await command.execute(context)
      const duration = Date.now() - startTime

      return {
        ...result,
        metadata: {
          ...result.metadata,
          command: commandName,
          timestamp: new Date().toISOString(),
          duration
        }
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        metadata: {
          command: commandName,
          timestamp: new Date().toISOString()
        }
      }
    }
  }

  private async executeUserResearch(context: UXContext): Promise<UXResponse> {
    const prompt = this.buildUserResearchPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'conduct-user-research',
        timestamp: new Date().toISOString(),
        template: 'user-research-tmpl'
      }
    }
  }

  private async executeUserPersonas(context: UXContext): Promise<UXResponse> {
    const prompt = this.buildUserPersonasPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'create-user-personas',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeUserJourney(context: UXContext): Promise<UXResponse> {
    const prompt = this.buildUserJourneyPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'map-user-journey',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeWireframes(context: UXContext): Promise<UXResponse> {
    const prompt = this.buildWireframesPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'create-wireframes',
        timestamp: new Date().toISOString(),
        template: 'wireframe-tmpl'
      }
    }
  }

  private async executePrototypes(context: UXContext): Promise<UXResponse> {
    const prompt = this.buildPrototypesPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'create-prototypes',
        timestamp: new Date().toISOString(),
        template: 'prototype-tmpl'
      }
    }
  }

  private async executeUsabilityTesting(context: UXContext): Promise<UXResponse> {
    const prompt = this.buildUsabilityTestingPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'conduct-usability-testing',
        timestamp: new Date().toISOString(),
        template: 'usability-test-tmpl'
      }
    }
  }

  private async executeAccessibilityAudit(context: UXContext): Promise<UXResponse> {
    const prompt = this.buildAccessibilityAuditPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'audit-accessibility',
        timestamp: new Date().toISOString(),
        template: 'accessibility-audit-tmpl'
      }
    }
  }

  private async executeDesignSystem(context: UXContext): Promise<UXResponse> {
    const prompt = this.buildDesignSystemPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'create-design-system',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeInformationArchitecture(context: UXContext): Promise<UXResponse> {
    const prompt = this.buildInformationArchitecturePrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'design-information-architecture',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeInteractionDesign(context: UXContext): Promise<UXResponse> {
    const prompt = this.buildInteractionDesignPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'design-interactions',
        timestamp: new Date().toISOString()
      }
    }
  }

  // Prompt building methods
  private buildUserResearchPrompt(context: UXContext): string {
    return `Conduct user research for: ${context.userInput || 'the specified product/service'}

## User Research Requirements:
- Target Audience: ${context.targetAudience || this.uxConfig.targetAudience}
- Platform: ${context.platform || this.uxConfig.platform}
- Device Type: ${context.deviceType || this.uxConfig.deviceType}
- Research Methods: ${context.options?.researchMethods || this.uxConfig.researchMethods.join(', ')}
- Research Objectives: ${context.options?.objectives || 'To understand user needs and behaviors'}

## User Research Framework:
1. **Research Planning**: Define research objectives and methodology
2. **Participant Recruitment**: Identify and recruit target participants
3. **Data Collection**: Conduct interviews, surveys, and usability testing
4. **Data Analysis**: Analyze research data and identify patterns
5. **Insights Generation**: Generate actionable insights and recommendations
6. **Report Creation**: Create comprehensive research reports

## Research Methods:
- **User Interviews**: One-on-one interviews with target users
- **Surveys**: Quantitative research through online surveys
- **Usability Testing**: Observe users interacting with designs
- **Focus Groups**: Group discussions with target users
- **Field Studies**: Observe users in their natural environment
- **Analytics Analysis**: Analyze user behavior data
- **Competitive Analysis**: Study competitor designs and strategies

## Output Format:
- Use structured markdown with clear headings
- Include research objectives and methodology
- Provide participant profiles and recruitment criteria
- Include research questions and data collection methods
- Document findings and insights
- Provide actionable recommendations and next steps

Ensure the research is comprehensive, actionable, and provides valuable insights for design decisions.`
  }

  private buildUserPersonasPrompt(context: UXContext): string {
    return `Create user personas for: ${context.userInput || 'the specified product/service'}

## User Persona Requirements:
- Target Audience: ${context.targetAudience || this.uxConfig.targetAudience}
- Platform: ${context.platform || this.uxConfig.platform}
- Device Type: ${context.deviceType || this.uxConfig.deviceType}
- Number of Personas: ${context.options?.personaCount || '3-5'}
- Research Data: ${context.options?.researchData || 'Based on user research findings'}

## User Persona Framework:
1. **Demographics**: Age, gender, location, occupation, education, income
2. **Psychographics**: Goals, motivations, frustrations, behaviors
3. **Needs & Pain Points**: What users need and what frustrates them
4. **Technology Usage**: How users interact with technology
5. **Scenarios**: Specific use cases and user stories
6. **Quotes**: Real quotes from user research

## Persona Components:
- **Basic Info**: Name, title, demographics
- **Goals**: What users want to achieve
- **Motivations**: What drives users
- **Frustrations**: What annoys or blocks users
- **Behaviors**: How users typically behave
- **Needs**: What users need to succeed
- **Pain Points**: Specific problems users face
- **Preferences**: What users like and dislike
- **Technology Usage**: How users use technology
- **Quotes**: Real user quotes
- **Scenarios**: Specific use cases

## Output Format:
- Use structured markdown with clear headings
- Include detailed persona profiles
- Provide specific demographics and characteristics
- Include goals, motivations, and frustrations
- Document user scenarios and use cases
- Include real quotes and insights
- Provide design implications and recommendations

Ensure personas are realistic, detailed, and based on actual user research data.`
  }

  private buildUserJourneyPrompt(context: UXContext): string {
    return `Create user journey maps for: ${context.userInput || 'the specified product/service'}

## User Journey Requirements:
- Target Audience: ${context.targetAudience || this.uxConfig.targetAudience}
- Platform: ${context.platform || this.uxConfig.platform}
- Device Type: ${context.deviceType || this.uxConfig.deviceType}
- Journey Scope: ${context.options?.journeyScope || 'Complete user experience'}
- Persona: ${context.options?.persona || 'Primary user persona'}

## User Journey Framework:
1. **Journey Stages**: Define key stages in the user journey
2. **Touchpoints**: Identify all user touchpoints
3. **Emotions**: Map user emotions throughout the journey
4. **Pain Points**: Identify pain points and opportunities
5. **Actions**: Document user actions at each stage
6. **Metrics**: Define success metrics and KPIs

## Journey Components:
- **Stages**: Awareness, Consideration, Purchase, Onboarding, Usage, Support
- **Touchpoints**: Website, app, email, phone, in-person, social media
- **Emotions**: Joy, frustration, confusion, satisfaction, anxiety
- **Pain Points**: Specific problems and barriers
- **Opportunities**: Areas for improvement and innovation
- **Actions**: What users do at each stage
- **Thoughts**: What users think at each stage
- **Feelings**: How users feel at each stage

## Output Format:
- Use structured markdown with clear headings
- Include journey stage descriptions
- Provide touchpoint details and interactions
- Map user emotions and experiences
- Identify pain points and opportunities
- Document user actions and thoughts
- Include metrics and success criteria
- Provide recommendations for improvement

Ensure the user journey is comprehensive and provides actionable insights for design improvements.`
  }

  private buildWireframesPrompt(context: UXContext): string {
    return `Create wireframes for: ${context.userInput || 'the specified product/service'}

## Wireframe Requirements:
- Target Audience: ${context.targetAudience || this.uxConfig.targetAudience}
- Platform: ${context.platform || this.uxConfig.platform}
- Device Type: ${context.deviceType || this.uxConfig.deviceType}
- Fidelity: ${context.options?.fidelity || 'Medium'}
- Pages: ${context.options?.pages || 'Key user flows and pages'}

## Wireframe Framework:
1. **Layout Design**: Create page layouts and structure
2. **Component Design**: Design UI components and elements
3. **Interaction Design**: Define user interactions and behaviors
4. **Responsive Design**: Ensure designs work across devices
5. **Accessibility**: Include accessibility considerations
6. **Annotations**: Add detailed annotations and specifications

## Wireframe Components:
- **Headers**: Navigation, branding, user controls
- **Content Areas**: Main content, sidebars, footers
- **Forms**: Input fields, buttons, validation
- **Navigation**: Menus, breadcrumbs, pagination
- **Interactive Elements**: Buttons, links, modals
- **Data Display**: Tables, lists, cards, charts
- **Feedback**: Alerts, notifications, loading states

## Output Format:
- Use structured markdown with clear headings
- Include wireframe descriptions and layouts
- Provide component specifications
- Document interactions and behaviors
- Include responsive design considerations
- Add accessibility guidelines
- Provide implementation notes
- Include design rationale and decisions

Ensure wireframes are clear, functional, and provide a solid foundation for visual design.`
  }

  private buildPrototypesPrompt(context: UXContext): string {
    return `Create interactive prototypes for: ${context.userInput || 'the specified product/service'}

## Prototype Requirements:
- Target Audience: ${context.targetAudience || this.uxConfig.targetAudience}
- Platform: ${context.platform || this.uxConfig.platform}
- Device Type: ${context.deviceType || this.uxConfig.deviceType}
- Fidelity: ${context.options?.fidelity || 'High'}
- Interactions: ${context.options?.interactions || 'Key user flows and interactions'}

## Prototype Framework:
1. **Screen Design**: Create all necessary screens
2. **Interaction Design**: Define user interactions and flows
3. **Animation Design**: Add appropriate animations and transitions
4. **Responsive Design**: Ensure prototypes work across devices
5. **Accessibility**: Include accessibility features
6. **Testing**: Plan for user testing and validation

## Prototype Components:
- **Screens**: All necessary screens and states
- **Interactions**: Click, hover, scroll, swipe, pinch
- **Animations**: Transitions, micro-interactions, feedback
- **User Flows**: Complete user journeys and paths
- **Error Handling**: Error states and recovery flows
- **Loading States**: Loading indicators and progress
- **Success States**: Confirmation and success feedback

## Output Format:
- Use structured markdown with clear headings
- Include prototype descriptions and specifications
- Provide interaction details and behaviors
- Document animation and transition specifications
- Include responsive design considerations
- Add accessibility guidelines
- Provide testing recommendations
- Include implementation notes

Ensure prototypes are interactive, realistic, and suitable for user testing.`
  }

  private buildUsabilityTestingPrompt(context: UXContext): string {
    return `Plan and conduct usability testing for: ${context.userInput || 'the specified product/service'}

## Usability Testing Requirements:
- Target Audience: ${context.targetAudience || this.uxConfig.targetAudience}
- Platform: ${context.platform || this.uxConfig.platform}
- Device Type: ${context.deviceType || this.uxConfig.deviceType}
- Test Type: ${context.options?.testType || 'Moderated usability testing'}
- Participants: ${context.options?.participants || '5-8 users'}

## Usability Testing Framework:
1. **Test Planning**: Define objectives, methodology, and scope
2. **Participant Recruitment**: Recruit appropriate test participants
3. **Task Design**: Create realistic and relevant test tasks
4. **Test Execution**: Conduct usability testing sessions
5. **Data Analysis**: Analyze test data and identify issues
6. **Report Creation**: Create comprehensive test reports

## Test Components:
- **Objectives**: What you want to learn from testing
- **Methodology**: How you will conduct the testing
- **Participants**: Who will participate in testing
- **Tasks**: What participants will do during testing
- **Metrics**: How you will measure success
- **Findings**: What you discover during testing
- **Recommendations**: What to do based on findings

## Output Format:
- Use structured markdown with clear headings
- Include test objectives and methodology
- Provide participant profiles and recruitment criteria
- Document test tasks and scenarios
- Include success metrics and criteria
- Document findings and insights
- Provide actionable recommendations
- Include next steps and follow-up actions

Ensure usability testing is comprehensive and provides valuable insights for design improvements.`
  }

  private buildAccessibilityAuditPrompt(context: UXContext): string {
    return `Perform accessibility audit for: ${context.userInput || 'the specified product/service'}

## Accessibility Audit Requirements:
- Target Audience: ${context.targetAudience || this.uxConfig.targetAudience}
- Platform: ${context.platform || this.uxConfig.platform}
- Device Type: ${context.deviceType || this.uxConfig.deviceType}
- Standards: ${context.options?.standards || this.uxConfig.accessibilityStandards.join(', ')}
- Scope: ${context.options?.scope || 'Complete application'}

## Accessibility Audit Framework:
1. **Standards Review**: Check compliance with accessibility standards
2. **Automated Testing**: Use automated tools to identify issues
3. **Manual Testing**: Conduct manual accessibility testing
4. **User Testing**: Test with users who have disabilities
5. **Documentation Review**: Review accessibility documentation
6. **Recommendations**: Provide actionable recommendations

## Audit Components:
- **WCAG Compliance**: Check against WCAG 2.1 guidelines
- **Keyboard Navigation**: Test keyboard-only navigation
- **Screen Reader**: Test with screen readers
- **Color Contrast**: Check color contrast ratios
- **Text Alternatives**: Verify alt text and descriptions
- **Focus Management**: Check focus indicators and order
- **Form Accessibility**: Test form labels and validation

## Output Format:
- Use structured markdown with clear headings
- Include audit scope and methodology
- Provide detailed findings and issues
- Document severity and impact levels
- Include specific recommendations
- Provide implementation guidance
- Include testing tools and resources
- Document compliance status

Ensure the accessibility audit is comprehensive and provides actionable recommendations for improvement.`
  }

  private buildDesignSystemPrompt(context: UXContext): string {
    return `Create design system for: ${context.userInput || 'the specified product/service'}

## Design System Requirements:
- Target Audience: ${context.targetAudience || this.uxConfig.targetAudience}
- Platform: ${context.platform || this.uxConfig.platform}
- Device Type: ${context.deviceType || this.uxConfig.deviceType}
- System Type: ${context.options?.systemType || 'Comprehensive design system'}
- Components: ${context.options?.components || 'All necessary UI components'}

## Design System Framework:
1. **Design Tokens**: Define colors, typography, spacing, and other design tokens
2. **Component Library**: Create reusable UI components
3. **Pattern Library**: Document design patterns and best practices
4. **Guidelines**: Provide design guidelines and principles
5. **Accessibility**: Include accessibility guidelines and requirements
6. **Documentation**: Create comprehensive documentation

## System Components:
- **Design Tokens**: Colors, typography, spacing, borders, shadows
- **Components**: Buttons, inputs, cards, modals, navigation
- **Patterns**: Forms, data display, feedback, layout
- **Guidelines**: Visual, interaction, content, accessibility
- **Documentation**: Usage, examples, code snippets
- **Tools**: Design tools, development tools, testing tools

## Output Format:
- Use structured markdown with clear headings
- Include design token specifications
- Provide component documentation
- Document design patterns and guidelines
- Include accessibility requirements
- Provide usage examples and code snippets
- Include implementation guidelines
- Document maintenance and updates

Ensure the design system is comprehensive, consistent, and provides clear guidance for designers and developers.`
  }

  private buildInformationArchitecturePrompt(context: UXContext): string {
    return `Design information architecture for: ${context.userInput || 'the specified product/service'}

## Information Architecture Requirements:
- Target Audience: ${context.targetAudience || this.uxConfig.targetAudience}
- Platform: ${context.platform || this.uxConfig.platform}
- Device Type: ${context.deviceType || this.uxConfig.deviceType}
- Content Scope: ${context.options?.contentScope || 'Complete content structure'}
- Navigation: ${context.options?.navigation || 'Primary and secondary navigation'}

## Information Architecture Framework:
1. **Content Audit**: Review and categorize existing content
2. **User Research**: Understand user mental models and expectations
3. **Structure Design**: Create logical content hierarchy
4. **Navigation Design**: Design intuitive navigation systems
5. **Labeling**: Create clear and consistent labels
6. **Testing**: Validate architecture with users

## Architecture Components:
- **Content Hierarchy**: Main categories, subcategories, pages
- **Navigation Structure**: Primary, secondary, contextual navigation
- **Labeling System**: Clear and consistent labels
- **Search Design**: Search functionality and results
- **Breadcrumbs**: Navigation breadcrumbs and paths
- **Sitemap**: Visual representation of site structure
- **User Flows**: How users navigate through content

## Output Format:
- Use structured markdown with clear headings
- Include content hierarchy and structure
- Provide navigation design specifications
- Document labeling system and conventions
- Include search and discovery features
- Provide user flow diagrams
- Include accessibility considerations
- Document implementation guidelines

Ensure the information architecture is intuitive, scalable, and meets user needs.`
  }

  private buildInteractionDesignPrompt(context: UXContext): string {
    return `Design user interactions for: ${context.userInput || 'the specified product/service'}

## Interaction Design Requirements:
- Target Audience: ${context.targetAudience || this.uxConfig.targetAudience}
- Platform: ${context.platform || this.uxConfig.platform}
- Device Type: ${context.deviceType || this.uxConfig.deviceType}
- Interaction Scope: ${context.options?.interactionScope || 'All user interactions'}
- Micro-interactions: ${context.options?.microInteractions || 'Key micro-interactions'}

## Interaction Design Framework:
1. **Interaction Patterns**: Define common interaction patterns
2. **Micro-interactions**: Design subtle feedback and animations
3. **Gestures**: Define touch and gesture interactions
4. **Feedback**: Design user feedback and confirmation
5. **Error Handling**: Design error states and recovery
6. **Accessibility**: Ensure interactions are accessible

## Interaction Components:
- **Click Interactions**: Buttons, links, toggles, checkboxes
- **Hover Interactions**: Hover states and previews
- **Focus Interactions**: Focus states and keyboard navigation
- **Scroll Interactions**: Scroll-based animations and effects
- **Touch Interactions**: Swipe, pinch, tap, long press
- **Form Interactions**: Input validation, submission, feedback
- **Modal Interactions**: Opening, closing, and interaction patterns

## Output Format:
- Use structured markdown with clear headings
- Include interaction pattern descriptions
- Provide micro-interaction specifications
- Document gesture and touch interactions
- Include feedback and confirmation design
- Add error handling and recovery patterns
- Include accessibility considerations
- Provide implementation guidelines

Ensure interactions are intuitive, responsive, and provide clear feedback to users.`
  }

  // Public API methods
  getAvailableCommands(): string[] {
    return Array.from(this.commands.keys())
  }

  getCommandDescription(commandName: string): string | undefined {
    return this.commands.get(commandName)?.description
  }

  updateConfig(newConfig: Partial<UXConfigType>): void {
    this.uxConfig = { ...this.uxConfig, ...newConfig }
  }

  getConfig(): UXConfigType {
    return { ...this.uxConfig }
  }
}
