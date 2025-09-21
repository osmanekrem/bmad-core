// SM Agent Types

export interface SMCommand {
  name: string
  description: string
  execute: (context: SMContext) => Promise<SMResponse>
}

export interface SMContext {
  projectPath?: string
  userInput?: string
  options?: Record<string, any>
  templates?: string[]
  outputFormat?: 'markdown' | 'json' | 'yaml' | 'text'
  teamSize?: number
  sprintDuration?: number
}

export interface SMResponse {
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

export interface SprintPlan {
  title: string
  description: string
  sprintNumber: number
  duration: number
  startDate: string
  endDate: string
  goal: string
  objectives: string[]
  userStories: UserStory[]
  tasks: SprintTask[]
  capacity: TeamCapacity
  ceremonies: Ceremony[]
  risks: SprintRisk[]
  dependencies: SprintDependency[]
  deliverables: SprintDeliverable[]
  metrics: SprintMetrics
  metadata: {
    planType: string
    timestamp: string
    complexity: 'low' | 'medium' | 'high'
    estimatedVelocity: number
  }
}

export interface UserStory {
  id: string
  title: string
  description: string
  acceptanceCriteria: string[]
  storyPoints: number
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'backlog' | 'ready' | 'in-progress' | 'review' | 'done'
  assignee: string
  epic: string
  tags: string[]
  dependencies: string[]
  risks: string[]
  testingNotes: string[]
  definitionOfDone: string[]
}

export interface SprintTask {
  id: string
  title: string
  description: string
  userStoryId: string
  type: 'development' | 'testing' | 'documentation' | 'review' | 'other'
  status: 'todo' | 'in-progress' | 'review' | 'done' | 'blocked'
  assignee: string
  estimatedHours: number
  actualHours: number
  priority: 'low' | 'medium' | 'high' | 'critical'
  dependencies: string[]
  blockers: string[]
  notes: string[]
}

export interface TeamCapacity {
  totalCapacity: number
  individualCapacity: TeamMemberCapacity[]
  timeOff: TimeOff[]
  holidays: Holiday[]
  buffer: number
  utilization: number
}

export interface TeamMemberCapacity {
  member: string
  role: string
  capacity: number
  availability: number
  skills: string[]
  currentLoad: number
}

export interface TimeOff {
  member: string
  startDate: string
  endDate: string
  type: 'vacation' | 'sick' | 'personal' | 'training' | 'other'
  reason: string
}

export interface Holiday {
  date: string
  name: string
  type: 'national' | 'company' | 'religious' | 'other'
  description: string
}

export interface Ceremony {
  name: string
  type: 'sprint-planning' | 'daily-standup' | 'sprint-review' | 'retrospective' | 'backlog-refinement' | 'other'
  description: string
  frequency: string
  duration: number
  participants: string[]
  agenda: string[]
  outcomes: string[]
  tools: string[]
  schedule: CeremonySchedule
}

export interface CeremonySchedule {
  day: string
  time: string
  frequency: 'daily' | 'weekly' | 'bi-weekly' | 'monthly' | 'as-needed'
  duration: number
  location: string
  format: 'in-person' | 'remote' | 'hybrid'
}

export interface SprintRisk {
  id: string
  title: string
  description: string
  probability: 'low' | 'medium' | 'high'
  impact: 'low' | 'medium' | 'high'
  category: 'technical' | 'resource' | 'schedule' | 'scope' | 'quality'
  owner: string
  status: 'open' | 'mitigated' | 'closed'
  mitigation: string[]
  contingency: string[]
  escalation: string[]
}

export interface SprintDependency {
  id: string
  from: string
  to: string
  type: 'finish-to-start' | 'start-to-start' | 'finish-to-finish' | 'start-to-finish'
  description: string
  owner: string
  status: 'pending' | 'in-progress' | 'completed' | 'blocked'
  dueDate: string
  blockers: string[]
}

export interface SprintDeliverable {
  id: string
  name: string
  description: string
  type: 'feature' | 'bug-fix' | 'enhancement' | 'documentation' | 'other'
  status: 'planned' | 'in-progress' | 'completed' | 'blocked'
  owner: string
  dueDate: string
  acceptanceCriteria: string[]
  dependencies: string[]
  testing: string[]
  deployment: string[]
}

export interface SprintMetrics {
  plannedVelocity: number
  actualVelocity: number
  burndown: BurndownData[]
  burnup: BurnupData[]
  cycleTime: number
  leadTime: number
  throughput: number
  workInProgress: number
  blockedItems: number
  completedItems: number
  scopeChanges: number
  quality: QualityMetrics
}

export interface BurndownData {
  date: string
  planned: number
  actual: number
  remaining: number
  ideal: number
}

export interface BurnupData {
  date: string
  completed: number
  scope: number
  target: number
}

export interface QualityMetrics {
  defectRate: number
  escapeRate: number
  reworkRate: number
  testCoverage: number
  codeQuality: number
  customerSatisfaction: number
}

export interface Retrospective {
  title: string
  sprintNumber: number
  date: string
  participants: string[]
  facilitator: string
  format: 'start-stop-continue' | 'mad-sad-glad' | '4Ls' | 'kalm' | 'custom'
  whatWentWell: string[]
  whatWentWrong: string[]
  whatToImprove: string[]
  actionItems: ActionItem[]
  insights: string[]
  metrics: RetrospectiveMetrics
  metadata: {
    retrospectiveType: string
    timestamp: string
    duration: number
    effectiveness: number
  }
}

export interface ActionItem {
  id: string
  title: string
  description: string
  owner: string
  dueDate: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'in-progress' | 'completed' | 'cancelled'
  category: 'process' | 'technical' | 'communication' | 'tooling' | 'other'
  impact: 'low' | 'medium' | 'high'
  effort: 'low' | 'medium' | 'high'
  dependencies: string[]
  blockers: string[]
  progress: string[]
}

export interface RetrospectiveMetrics {
  participation: number
  engagement: number
  actionItemCompletion: number
  improvementImplementation: number
  teamSatisfaction: number
  processEffectiveness: number
}

export interface DailyStandup {
  date: string
  participants: string[]
  facilitator: string
  format: 'traditional' | 'async' | 'walking' | 'custom'
  updates: StandupUpdate[]
  blockers: Blocker[]
  decisions: Decision[]
  actionItems: ActionItem[]
  metrics: StandupMetrics
  metadata: {
    standupType: string
    timestamp: string
    duration: number
    effectiveness: number
  }
}

export interface StandupUpdate {
  member: string
  yesterday: string[]
  today: string[]
  blockers: string[]
  help: string[]
  mood: 'excited' | 'good' | 'neutral' | 'concerned' | 'frustrated'
  energy: 'high' | 'medium' | 'low'
  notes: string[]
}

export interface Blocker {
  id: string
  title: string
  description: string
  reporter: string
  assignee: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'in-progress' | 'resolved' | 'escalated'
  category: 'technical' | 'resource' | 'dependency' | 'environment' | 'other'
  impact: string[]
  resolution: string[]
  escalation: string[]
}

export interface Decision {
  id: string
  title: string
  description: string
  decision: string
  rationale: string[]
  alternatives: string[]
  owner: string
  stakeholders: string[]
  date: string
  status: 'proposed' | 'accepted' | 'rejected' | 'deferred'
  impact: string[]
  risks: string[]
}

export interface StandupMetrics {
  attendance: number
  punctuality: number
  engagement: number
  blockerResolution: number
  actionItemCompletion: number
  teamCoordination: number
}

export interface BacklogRefinement {
  title: string
  date: string
  participants: string[]
  facilitator: string
  format: 'grooming' | 'estimation' | 'prioritization' | 'comprehensive'
  userStories: UserStory[]
  epics: Epic[]
  themes: Theme[]
  decisions: Decision[]
  actionItems: ActionItem[]
  metrics: RefinementMetrics
  metadata: {
    refinementType: string
    timestamp: string
    duration: number
    effectiveness: number
  }
}

export interface Epic {
  id: string
  title: string
  description: string
  businessValue: string
  acceptanceCriteria: string[]
  userStories: string[]
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'proposed' | 'approved' | 'in-progress' | 'completed' | 'cancelled'
  owner: string
  stakeholders: string[]
  estimatedEffort: number
  actualEffort: number
  startDate: string
  endDate: string
  dependencies: string[]
  risks: string[]
  themes: string[]
}

export interface Theme {
  id: string
  title: string
  description: string
  businessValue: string
  epics: string[]
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'proposed' | 'approved' | 'in-progress' | 'completed' | 'cancelled'
  owner: string
  stakeholders: string[]
  startDate: string
  endDate: string
  dependencies: string[]
  risks: string[]
}

export interface RefinementMetrics {
  storiesRefined: number
  storiesEstimated: number
  storiesPrioritized: number
  estimationAccuracy: number
  prioritizationConsensus: number
  backlogHealth: number
}

export interface TeamCoaching {
  title: string
  team: string
  coach: string
  date: string
  focus: string[]
  observations: string[]
  strengths: string[]
  improvements: string[]
  recommendations: string[]
  actionItems: ActionItem[]
  followUp: string[]
  metrics: CoachingMetrics
  metadata: {
    coachingType: string
    timestamp: string
    duration: number
    effectiveness: number
  }
}

export interface CoachingMetrics {
  teamEngagement: number
  processAdherence: number
  collaboration: number
  communication: number
  problemSolving: number
  continuousImprovement: number
}

export interface SMConfig {
  defaultOutputFormat: 'markdown' | 'json' | 'yaml' | 'text'
  sprintDuration: number
  teamSize: 'small' | 'medium' | 'large'
  agileFramework: 'scrum' | 'kanban' | 'scrumban' | 'saf' | 'less' | 'nexus'
  ceremonies: string[]
  tools: string[]
  autoSave: boolean
  templates: {
    planning: string[]
    ceremonies: string[]
    coaching: string[]
    retrospectives: string[]
  }
}
