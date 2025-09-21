# @osmanekrem/bmad-architect

BMad Architect Agent - AI-driven system architecture and design specialist.

## Features

- 🏗️ **System Design**: Create comprehensive system architectures and designs
- 🔍 **Architecture Analysis**: Analyze existing system architectures
- 🛠️ **Technology Selection**: Recommend appropriate technologies and tools
- 🎨 **Pattern Analysis**: Identify and apply design patterns effectively
- 📈 **Scalability Planning**: Design for scale and performance
- 🔒 **Security Architecture**: Design secure and compliant systems
- 🔄 **Migration Planning**: Plan system migrations and modernizations
- 🏢 **Microservices Design**: Design microservices architectures
- 🔌 **API Design**: Design API architecture and specifications

## Installation

```bash
npm install @osmanekrem/bmad-architect
```

## Quick Start

```typescript
import { ArchitectAgent } from '@osmanekrem/bmad-architect'

// Initialize the architect agent
const architect = new ArchitectAgent({
  defaultOutputFormat: 'markdown',
  designComplexity: 'moderate',
  includeDiagrams: true
})

// Execute system design
const result = await architect.executeCommand('system-design', {
  userInput: 'E-commerce platform architecture',
  outputFormat: 'markdown'
})

console.log(result.output)
```

## Available Commands

### System Design
```typescript
const design = await architect.executeCommand('system-design', {
  userInput: 'Microservices e-commerce platform',
  options: {
    systemType: 'E-commerce Platform',
    scale: 'Large (100K+ users)',
    complexity: 'complex',
    includeDiagrams: true
  }
})
```

### Architecture Analysis
```typescript
const analysis = await architect.executeCommand('architecture-analysis', {
  userInput: 'Legacy monolithic application',
  options: {
    currentArchitecture: 'Monolithic',
    analysisDepth: 'deep',
    focusAreas: ['scalability', 'maintainability']
  }
})
```

### Technology Selection
```typescript
const techSelection = await architect.executeCommand('technology-selection', {
  userInput: 'Modern web application stack',
  options: {
    projectType: 'Web Application',
    scale: 'Medium',
    teamSize: '5-10 developers',
    budget: 'Medium'
  }
})
```

### Design Pattern Analysis
```typescript
const patterns = await architect.executeCommand('pattern-analysis', {
  userInput: 'Event-driven microservices architecture',
  options: {
    systemType: 'Microservices',
    complexity: 'complex',
    focusAreas: ['event-driven', 'distributed-systems']
  }
})
```

### Scalability Planning
```typescript
const scalability = await architect.executeCommand('scalability-planning', {
  userInput: 'High-traffic web application',
  options: {
    currentLoad: '10K users',
    targetLoad: '1M users',
    growthRate: '10x in 2 years',
    performanceGoals: 'Sub-100ms response times'
  }
})
```

### Security Architecture
```typescript
const security = await architect.executeCommand('security-architecture', {
  userInput: 'Financial services application',
  options: {
    compliance: 'PCI DSS, SOX',
    dataSensitivity: 'High',
    threatLevel: 'High',
    userTypes: 'Internal and external users'
  }
})
```

### Migration Planning
```typescript
const migration = await architect.executeCommand('migration-planning', {
  userInput: 'Legacy system modernization',
  options: {
    currentSystem: 'Monolithic legacy system',
    targetSystem: 'Microservices architecture',
    migrationType: 'Gradual migration',
    timeline: '12 months'
  }
})
```

### Microservices Design
```typescript
const microservices = await architect.executeCommand('microservices-design', {
  userInput: 'E-commerce platform microservices',
  options: {
    systemType: 'E-commerce Platform',
    serviceCount: '10-15 services',
    teamStructure: 'Multiple teams',
    dataStrategy: 'Database per service'
  }
})
```

### API Design
```typescript
const apiDesign = await architect.executeCommand('api-design', {
  userInput: 'RESTful API for e-commerce platform',
  options: {
    apiType: 'REST API',
    targetUsers: 'Internal and external developers',
    dataFormat: 'JSON',
    authentication: 'OAuth 2.0'
  }
})
```

## Configuration

```typescript
const architect = new ArchitectAgent({
  defaultOutputFormat: 'markdown',     // 'markdown' | 'json' | 'yaml' | 'text'
  designComplexity: 'moderate',        // 'simple' | 'moderate' | 'complex'
  includeDiagrams: true,               // Include Mermaid diagrams
  autoSave: true,                      // Auto-save architecture designs
  templates: {
    architecture: ['architecture-tmpl'],
    analysis: ['architecture-tmpl'],
    design: ['architecture-tmpl'],
    migration: ['architecture-tmpl']
  }
})
```

## Template Integration

The architect agent integrates with the BMad template system for structured output:

```typescript
import { ArchitectTemplateManager } from '@osmanekrem/bmad-architect'

const templateManager = new ArchitectTemplateManager()

// Render architecture with template
const formattedOutput = await templateManager.renderArchitectureTemplate(
  'architecture-tmpl',
  context,
  architectureData
)
```

## API Reference

### ArchitectAgent

#### Constructor
```typescript
new ArchitectAgent(config?: Partial<ArchitectConfig>)
```

#### Methods
- `executeCommand(commandName: string, context: ArchitectContext): Promise<ArchitectResponse>`
- `getAvailableCommands(): string[]`
- `getCommandDescription(commandName: string): string | undefined`
- `updateConfig(newConfig: Partial<ArchitectConfig>): void`
- `getConfig(): ArchitectConfig`

### Types

#### ArchitectContext
```typescript
interface ArchitectContext {
  projectPath?: string
  userInput?: string
  options?: Record<string, any>
  templates?: string[]
  outputFormat?: 'markdown' | 'json' | 'yaml' | 'text'
}
```

#### ArchitectResponse
```typescript
interface ArchitectResponse {
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

## Examples

### Basic System Design
```typescript
import { ArchitectAgent } from '@osmanekrem/bmad-architect'

const architect = new ArchitectAgent()

const result = await architect.executeCommand('system-design', {
  userInput: 'Social media platform architecture',
  outputFormat: 'markdown'
})

if (result.success) {
  console.log(result.output)
} else {
  console.error('Design failed:', result.error)
}
```

### Advanced Architecture Analysis
```typescript
const analysis = await architect.executeCommand('architecture-analysis', {
  userInput: 'Legacy banking system',
  options: {
    currentArchitecture: 'Monolithic COBOL system',
    analysisDepth: 'deep',
    focusAreas: ['security', 'compliance', 'scalability'],
    compliance: 'PCI DSS, SOX'
  },
  outputFormat: 'json'
})

const analysisData = analysis.data as SystemAnalysis
console.log(`Found ${analysisData.issues.length} issues`)
```

### Custom Configuration
```typescript
const architect = new ArchitectAgent({
  defaultOutputFormat: 'json',
  designComplexity: 'complex',
  includeDiagrams: true,
  autoSave: false,
  templates: {
    architecture: ['custom-architecture-tmpl'],
    analysis: ['architecture-tmpl'],
    design: ['architecture-tmpl'],
    migration: ['architecture-tmpl']
  }
})

// Update configuration
architect.updateConfig({
  designComplexity: 'simple',
  includeDiagrams: false
})
```

## Design Patterns Supported

### Creational Patterns
- Factory, Builder, Singleton, Prototype

### Structural Patterns
- Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy

### Behavioral Patterns
- Observer, Strategy, Command, State, Template Method, Visitor

### Architectural Patterns
- MVC, MVP, MVVM, Microservices, Event-Driven, CQRS, SAGA

## Architecture Types Supported

- **Microservices**: Distributed service architecture
- **Monolith**: Single-deployment architecture
- **Serverless**: Function-based architecture
- **Hybrid**: Mixed architecture approaches
- **Distributed**: Multi-node distributed systems

## License

MIT
