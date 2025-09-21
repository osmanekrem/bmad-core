// UX Expert Agent Types

export interface UXCommand {
  name: string
  description: string
  execute: (context: UXContext) => Promise<UXResponse>
}

export interface UXContext {
  projectPath?: string
  userInput?: string
  options?: Record<string, any>
  templates?: string[]
  outputFormat?: 'markdown' | 'json' | 'yaml' | 'text'
  targetAudience?: string
  platform?: string
  deviceType?: string
}

export interface UXResponse {
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

export interface UserResearch {
  title: string
  description: string
  researchType: 'user-interviews' | 'surveys' | 'usability-testing' | 'focus-groups' | 'field-studies' | 'analytics-analysis' | 'competitive-analysis'
  objectives: string[]
  methodology: string[]
  participants: ResearchParticipant[]
  questions: ResearchQuestion[]
  findings: ResearchFinding[]
  insights: string[]
  recommendations: string[]
  nextSteps: string[]
  metadata: {
    researchType: string
    timestamp: string
    duration: number
    effectiveness: number
  }
}

export interface ResearchParticipant {
  id: string
  demographics: Demographics
  characteristics: string[]
  recruitmentCriteria: string[]
  contactInfo: string
  consentStatus: 'pending' | 'given' | 'withdrawn'
  participationStatus: 'recruited' | 'scheduled' | 'completed' | 'no-show' | 'cancelled'
  notes: string[]
}

export interface Demographics {
  age: string
  gender: string
  location: string
  occupation: string
  education: string
  income: string
  technologyExperience: string
  productExperience: string
}

export interface ResearchQuestion {
  id: string
  question: string
  type: 'open-ended' | 'multiple-choice' | 'rating-scale' | 'ranking' | 'yes-no'
  category: 'usability' | 'satisfaction' | 'preference' | 'behavior' | 'attitude'
  options?: string[]
  scale?: {
    min: number
    max: number
    labels: string[]
  }
  followUp?: string[]
}

export interface ResearchFinding {
  id: string
  category: 'usability' | 'satisfaction' | 'preference' | 'behavior' | 'attitude' | 'pain-point' | 'opportunity'
  finding: string
  evidence: string[]
  severity: 'low' | 'medium' | 'high' | 'critical'
  frequency: number
  impact: 'low' | 'medium' | 'high'
  participants: string[]
  quotes: string[]
  tags: string[]
}

export interface UserPersona {
  id: string
  name: string
  title: string
  demographics: Demographics
  goals: string[]
  motivations: string[]
  frustrations: string[]
  behaviors: string[]
  needs: string[]
  painPoints: string[]
  preferences: string[]
  technologyUsage: string[]
  quotes: string[]
  scenarios: PersonaScenario[]
  metadata: {
    personaType: string
    timestamp: string
    confidence: number
    validation: string[]
  }
}

export interface PersonaScenario {
  id: string
  title: string
  description: string
  context: string
  goals: string[]
  steps: string[]
  emotions: string[]
  outcomes: string[]
  painPoints: string[]
  opportunities: string[]
}

export interface UserJourney {
  id: string
  title: string
  description: string
  persona: string
  stages: JourneyStage[]
  touchpoints: Touchpoint[]
  emotions: EmotionMapping[]
  painPoints: JourneyPainPoint[]
  opportunities: JourneyOpportunity[]
  metrics: JourneyMetrics
  metadata: {
    journeyType: string
    timestamp: string
    duration: number
    validation: string[]
  }
}

export interface JourneyStage {
  id: string
  name: string
  description: string
  duration: string
  actions: string[]
  thoughts: string[]
  emotions: string[]
  touchpoints: string[]
  painPoints: string[]
  opportunities: string[]
}

export interface Touchpoint {
  id: string
  name: string
  type: 'digital' | 'physical' | 'human' | 'system'
  channel: string
  description: string
  actions: string[]
  emotions: string[]
  painPoints: string[]
  opportunities: string[]
  owner: string
  status: 'current' | 'proposed' | 'deprecated'
}

export interface EmotionMapping {
  stage: string
  emotion: string
  intensity: number
  description: string
  triggers: string[]
  impact: string
}

export interface JourneyPainPoint {
  id: string
  stage: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  frequency: number
  impact: string
  rootCause: string
  solutions: string[]
  owner: string
  priority: 'low' | 'medium' | 'high' | 'critical'
}

export interface JourneyOpportunity {
  id: string
  stage: string
  description: string
  potential: 'low' | 'medium' | 'high'
  effort: 'low' | 'medium' | 'high'
  impact: string
  solutions: string[]
  owner: string
  priority: 'low' | 'medium' | 'high' | 'critical'
}

export interface JourneyMetrics {
  satisfaction: number
  completionRate: number
  dropOffRate: number
  timeToComplete: number
  errorRate: number
  conversionRate: number
  retentionRate: number
  npsScore: number
}

export interface Wireframe {
  id: string
  title: string
  description: string
  page: string
  version: string
  fidelity: 'low' | 'medium' | 'high'
  annotations: WireframeAnnotation[]
  components: WireframeComponent[]
  interactions: WireframeInteraction[]
  responsiveBreakpoints: ResponsiveBreakpoint[]
  metadata: {
    wireframeType: string
    timestamp: string
    designer: string
    status: 'draft' | 'review' | 'approved' | 'deprecated'
  }
}

export interface WireframeAnnotation {
  id: string
  element: string
  annotation: string
  type: 'note' | 'requirement' | 'constraint' | 'question' | 'assumption'
  priority: 'low' | 'medium' | 'high'
  status: 'open' | 'resolved' | 'deprecated'
}

export interface WireframeComponent {
  id: string
  name: string
  type: 'header' | 'navigation' | 'content' | 'sidebar' | 'footer' | 'modal' | 'form' | 'button' | 'input' | 'other'
  description: string
  properties: Record<string, any>
  interactions: string[]
  states: string[]
  responsive: boolean
  accessibility: string[]
}

export interface WireframeInteraction {
  id: string
  trigger: string
  action: string
  target: string
  description: string
  type: 'click' | 'hover' | 'focus' | 'scroll' | 'swipe' | 'pinch' | 'other'
  feedback: string
  animation: string
  accessibility: string[]
}

export interface ResponsiveBreakpoint {
  name: string
  minWidth: number
  maxWidth: number
  description: string
  layout: string
  components: string[]
  interactions: string[]
}

export interface Prototype {
  id: string
  title: string
  description: string
  fidelity: 'low' | 'medium' | 'high'
  platform: 'web' | 'mobile' | 'desktop' | 'tablet' | 'watch' | 'tv' | 'other'
  framework: string
  screens: PrototypeScreen[]
  interactions: PrototypeInteraction[]
  userFlows: UserFlow[]
  testing: PrototypeTesting
  metadata: {
    prototypeType: string
    timestamp: string
    designer: string
    status: 'draft' | 'testing' | 'approved' | 'deprecated'
  }
}

export interface PrototypeScreen {
  id: string
  name: string
  description: string
  wireframe: string
  content: string
  interactions: string[]
  states: string[]
  responsive: boolean
  accessibility: string[]
}

export interface PrototypeInteraction {
  id: string
  trigger: string
  action: string
  target: string
  description: string
  type: 'click' | 'hover' | 'focus' | 'scroll' | 'swipe' | 'pinch' | 'other'
  feedback: string
  animation: string
  accessibility: string[]
}

export interface UserFlow {
  id: string
  name: string
  description: string
  startScreen: string
  endScreen: string
  steps: FlowStep[]
  decisionPoints: DecisionPoint[]
  errorHandling: ErrorHandling[]
  successCriteria: string[]
  metrics: FlowMetrics
}

export interface FlowStep {
  id: string
  screen: string
  action: string
  description: string
  validation: string[]
  nextSteps: string[]
  errorSteps: string[]
}

export interface DecisionPoint {
  id: string
  condition: string
  truePath: string
  falsePath: string
  description: string
  validation: string[]
}

export interface ErrorHandling {
  id: string
  error: string
  message: string
  recovery: string[]
  prevention: string[]
  severity: 'low' | 'medium' | 'high' | 'critical'
}

export interface FlowMetrics {
  completionRate: number
  dropOffRate: number
  timeToComplete: number
  errorRate: number
  satisfaction: number
}

export interface PrototypeTesting {
  id: string
  testType: 'usability' | 'a-b' | 'preference' | 'accessibility' | 'performance'
  participants: string[]
  tasks: TestTask[]
  metrics: TestMetrics
  findings: TestFinding[]
  recommendations: string[]
  status: 'planned' | 'in-progress' | 'completed' | 'cancelled'
}

export interface TestTask {
  id: string
  description: string
  successCriteria: string[]
  timeLimit: number
  priority: 'low' | 'medium' | 'high'
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface TestMetrics {
  completionRate: number
  successRate: number
  timeToComplete: number
  errorRate: number
  satisfaction: number
  easeOfUse: number
  learnability: number
  efficiency: number
  memorability: number
  errorRecovery: number
}

export interface TestFinding {
  id: string
  category: 'usability' | 'satisfaction' | 'preference' | 'behavior' | 'attitude' | 'pain-point' | 'opportunity'
  finding: string
  evidence: string[]
  severity: 'low' | 'medium' | 'high' | 'critical'
  frequency: number
  impact: 'low' | 'medium' | 'high'
  participants: string[]
  quotes: string[]
  tags: string[]
}

export interface UsabilityTest {
  id: string
  title: string
  description: string
  objectives: string[]
  methodology: string[]
  participants: ResearchParticipant[]
  tasks: TestTask[]
  metrics: TestMetrics
  findings: TestFinding[]
  insights: string[]
  recommendations: string[]
  nextSteps: string[]
  metadata: {
    testType: string
    timestamp: string
    duration: number
    effectiveness: number
  }
}

export interface AccessibilityAudit {
  id: string
  title: string
  description: string
  scope: string[]
  standards: string[]
  guidelines: string[]
  findings: AccessibilityFinding[]
  recommendations: string[]
  priority: 'low' | 'medium' | 'high' | 'critical'
  effort: 'low' | 'medium' | 'high'
  impact: 'low' | 'medium' | 'high'
  metadata: {
    auditType: string
    timestamp: string
    auditor: string
    status: 'draft' | 'review' | 'approved' | 'deprecated'
  }
}

export interface AccessibilityFinding {
  id: string
  page: string
  element: string
  issue: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  guideline: string
  impact: string
  solution: string
  effort: 'low' | 'medium' | 'high'
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'in-progress' | 'resolved' | 'deprecated'
}

export interface DesignSystem {
  id: string
  title: string
  description: string
  version: string
  components: DesignComponent[]
  tokens: DesignToken[]
  patterns: DesignPattern[]
  guidelines: DesignGuideline[]
  accessibility: AccessibilityGuideline[]
  metadata: {
    systemType: string
    timestamp: string
    designer: string
    status: 'draft' | 'review' | 'approved' | 'deprecated'
  }
}

export interface DesignComponent {
  id: string
  name: string
  category: 'atoms' | 'molecules' | 'organisms' | 'templates' | 'pages'
  description: string
  variants: ComponentVariant[]
  properties: Record<string, any>
  states: string[]
  interactions: string[]
  accessibility: string[]
  usage: string[]
  examples: string[]
}

export interface ComponentVariant {
  id: string
  name: string
  description: string
  properties: Record<string, any>
  states: string[]
  interactions: string[]
  usage: string[]
  examples: string[]
}

export interface DesignToken {
  id: string
  name: string
  category: 'color' | 'typography' | 'spacing' | 'border' | 'shadow' | 'animation' | 'other'
  value: string
  description: string
  usage: string[]
  variants: Record<string, string>
  responsive: boolean
  theme: string[]
}

export interface DesignPattern {
  id: string
  name: string
  category: 'navigation' | 'forms' | 'data-display' | 'feedback' | 'layout' | 'other'
  description: string
  problem: string
  solution: string
  examples: string[]
  guidelines: string[]
  accessibility: string[]
  responsive: boolean
}

export interface DesignGuideline {
  id: string
  title: string
  category: 'visual' | 'interaction' | 'content' | 'layout' | 'navigation' | 'other'
  description: string
  principles: string[]
  examples: string[]
  antiPatterns: string[]
  accessibility: string[]
  responsive: boolean
}

export interface AccessibilityGuideline {
  id: string
  title: string
  category: 'perceivable' | 'operable' | 'understandable' | 'robust'
  description: string
  principles: string[]
  examples: string[]
  testing: string[]
  tools: string[]
  standards: string[]
}

export interface UXConfig {
  defaultOutputFormat: 'markdown' | 'json' | 'yaml' | 'text'
  targetAudience: string
  platform: 'web' | 'mobile' | 'desktop' | 'tablet' | 'watch' | 'tv' | 'other'
  deviceType: 'phone' | 'tablet' | 'desktop' | 'watch' | 'tv' | 'other'
  designSystem: string
  accessibilityStandards: string[]
  researchMethods: string[]
  testingTools: string[]
  prototypingTools: string[]
  autoSave: boolean
  templates: {
    research: string[]
    design: string[]
    testing: string[]
    accessibility: string[]
  }
}
