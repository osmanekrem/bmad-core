# BMad API Documentation

## Overview

BMad provides a comprehensive API for AI-powered development agents. This documentation covers all available methods, parameters, and usage patterns.

## Core API

### BaseAgentImpl

The base class for all BMad agents.

```typescript
class BaseAgentImpl {
  constructor(options: AgentOptions)
  getAvailableCommands(): string[]
  getConfig(): AgentConfig
  updateConfig(config: Partial<AgentConfig>): void
  executeCommand(command: string, context: CommandContext): Promise<CommandResult>
  execute(command: string, context: CommandContext): Promise<CommandResult>
}
```

#### Methods

##### `constructor(options: AgentOptions)`

Initializes a new agent instance.

**Parameters:**
- `options.systemPrompt` (string): The system prompt for the agent
- `options.config` (AgentConfig): Agent-specific configuration

**Example:**
```javascript
const agent = new AnalystAgent({
  systemPrompt: 'You are an expert market analyst',
  config: {
    analysisDepth: 'deep',
    includeSources: true
  }
})
```

##### `getAvailableCommands(): string[]`

Returns an array of available commands for the agent.

**Returns:** Array of command names

**Example:**
```javascript
const commands = agent.getAvailableCommands()
// ['market-research', 'competitor-analysis', 'technical-analysis', ...]
```

##### `getConfig(): AgentConfig`

Returns the current agent configuration.

**Returns:** AgentConfig object

**Example:**
```javascript
const config = agent.getConfig()
// {
//   defaultOutputFormat: 'markdown',
//   analysisDepth: 'deep',
//   includeSources: true,
//   autoSave: true,
//   templates: { ... }
// }
```

##### `updateConfig(config: Partial<AgentConfig>): void`

Updates the agent configuration.

**Parameters:**
- `config` (Partial<AgentConfig>): Configuration updates

**Example:**
```javascript
agent.updateConfig({
  analysisDepth: 'shallow',
  includeSources: false
})
```

##### `executeCommand(command: string, context: CommandContext): Promise<CommandResult>`

Executes a specific command with the provided context.

**Parameters:**
- `command` (string): Command name to execute
- `context` (CommandContext): Command context and parameters

**Returns:** Promise<CommandResult>

**Example:**
```javascript
const result = await agent.executeCommand('market-research', {
  userInput: 'Analyze the mobile app market',
  projectType: 'mobile',
  targetAudience: 'consumers'
})
```

## Agent-Specific APIs

### AnalystAgent

Specialized agent for market research and analysis.

#### Commands

##### `market-research`

Conducts comprehensive market research.

**Context Parameters:**
- `userInput` (string): Research query
- `projectType` (string): Type of project
- `targetAudience` (string): Target audience
- `analysisDepth` (string): Depth of analysis ('shallow', 'moderate', 'deep')

**Returns:**
```typescript
{
  success: boolean
  content: string
  insights: {
    marketSize: string
    trends: string[]
    opportunities: string[]
    threats: string[]
  }
  metadata: {
    command: string
    timestamp: string
    analysisDepth: string
  }
}
```

**Example:**
```javascript
const result = await analyst.executeCommand('market-research', {
  userInput: 'Analyze the e-commerce market',
  projectType: 'web',
  targetAudience: 'online shoppers',
  analysisDepth: 'deep'
})
```

##### `competitor-analysis`

Analyzes competitors in the market.

**Context Parameters:**
- `userInput` (string): Analysis query
- `projectType` (string): Type of project
- `competitors` (string[]): List of competitors to analyze

**Returns:**
```typescript
{
  success: boolean
  content: string
  analysis: {
    competitors: CompetitorAnalysis[]
    strengths: string[]
    weaknesses: string[]
    opportunities: string[]
    threats: string[]
  }
  metadata: {
    command: string
    timestamp: string
    competitorCount: number
  }
}
```

### ArchitectAgent

Specialized agent for system design and architecture.

#### Commands

##### `system-design`

Designs system architecture.

**Context Parameters:**
- `userInput` (string): Design requirements
- `projectType` (string): Type of project
- `complexity` (string): System complexity ('low', 'medium', 'high')
- `requirements` (string[]): Functional requirements

**Returns:**
```typescript
{
  success: boolean
  content: string
  design: {
    architecture: string
    components: Component[]
    patterns: string[]
    technologies: string[]
    scalability: string
  }
  metadata: {
    command: string
    timestamp: string
    complexity: string
  }
}
```

##### `technology-selection`

Selects appropriate technologies.

**Context Parameters:**
- `userInput` (string): Technology requirements
- `projectType` (string): Type of project
- `architecture` (string): System architecture
- `constraints` (string[]): Technical constraints

**Returns:**
```typescript
{
  success: boolean
  content: string
  selection: {
    frontend: Technology[]
    backend: Technology[]
    database: Technology[]
    infrastructure: Technology[]
    rationale: string
  }
  metadata: {
    command: string
    timestamp: string
    projectType: string
  }
}
```

### DevAgent

Specialized agent for code generation and development.

#### Commands

##### `generate-code`

Generates code based on requirements.

**Context Parameters:**
- `userInput` (string): Code requirements
- `projectType` (string): Type of project
- `codeStyle` (string): Coding style ('standard', 'prettier', 'eslint')
- `framework` (string): Framework to use
- `language` (string): Programming language

**Returns:**
```typescript
{
  success: boolean
  content: string
  code: {
    files: CodeFile[]
    structure: string
    dependencies: string[]
    instructions: string
  }
  metadata: {
    command: string
    timestamp: string
    language: string
    framework: string
  }
}
```

##### `review-code`

Reviews existing code for quality and best practices.

**Context Parameters:**
- `userInput` (string): Code to review
- `codeStyle` (string): Coding style to follow
- `focusAreas` (string[]): Areas to focus on

**Returns:**
```typescript
{
  success: boolean
  content: string
  review: {
    score: number
    issues: CodeIssue[]
    suggestions: string[]
    bestPractices: string[]
  }
  metadata: {
    command: string
    timestamp: string
    codeLength: number
  }
}
```

## Template API

### TemplateManager

Manages template loading and rendering.

```typescript
class TemplateManager {
  async getAvailableTemplates(): Promise<string[]>
  async loadTemplate(templateId: string): Promise<Template>
  async renderTemplate(templateId: string, context: any): Promise<string>
}
```

#### Methods

##### `getAvailableTemplates(): Promise<string[]>`

Returns a list of available templates.

**Returns:** Array of template IDs

**Example:**
```javascript
const templates = await templateManager.getAvailableTemplates()
// ['story-tmpl', 'project-brief-tmpl', 'prd-tmpl', ...]
```

##### `loadTemplate(templateId: string): Promise<Template>`

Loads a specific template.

**Parameters:**
- `templateId` (string): Template identifier

**Returns:** Template object

**Example:**
```javascript
const template = await templateManager.loadTemplate('story-tmpl')
// {
//   metadata: { id: 'story-tmpl', name: 'Story Document', ... },
//   content: '...',
//   render: function(context) { ... }
// }
```

##### `renderTemplate(templateId: string, context: any): Promise<string>`

Renders a template with the provided context.

**Parameters:**
- `templateId` (string): Template identifier
- `context` (any): Context data for rendering

**Returns:** Rendered template string

**Example:**
```javascript
const rendered = await templateManager.renderTemplate('story-tmpl', {
  storyTitle: 'User Authentication',
  description: 'Implement user login functionality',
  acceptanceCriteria: ['User can login with email', 'User can reset password']
})
```

## CLI API

### Command Line Interface

BMad provides a comprehensive CLI for agent management.

#### Commands

##### `bmad init`

Initializes BMad in the current project.

**Options:**
- `--force`: Force initialization even if already initialized
- `--template`: Use a specific template

**Example:**
```bash
bmad init --template=web-app
```

##### `bmad config`

Manages BMad configuration.

**Subcommands:**
- `set <key> <value>`: Set a configuration value
- `get <key>`: Get a configuration value
- `list`: List all configuration values
- `reset`: Reset to default configuration

**Example:**
```bash
bmad config set provider openai
bmad config set api-key your-api-key
bmad config list
```

##### `bmad status`

Shows BMad status and configuration.

**Example:**
```bash
bmad status
```

##### `bmad install <agents>`

Installs specific agents.

**Example:**
```bash
bmad install analyst architect dev
```

##### `bmad <agent> <command> [options]`

Executes agent commands directly from CLI.

**Example:**
```bash
bmad analyst market-research "Analyze e-commerce market"
bmad architect system-design "Design microservices architecture"
```

## Error Handling

### Error Types

#### AuthenticationError

Thrown when API authentication fails.

```typescript
class AuthenticationError extends Error {
  constructor(message: string, provider: string)
  provider: string
}
```

#### ValidationError

Thrown when input validation fails.

```typescript
class ValidationError extends Error {
  constructor(message: string, field: string)
  field: string
}
```

#### RateLimitError

Thrown when API rate limits are exceeded.

```typescript
class RateLimitError extends Error {
  constructor(message: string, retryAfter: number)
  retryAfter: number
}
```

### Error Handling Example

```javascript
try {
  const result = await agent.executeCommand('market-research', context)
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Authentication failed:', error.message)
    // Handle authentication error
  } else if (error instanceof ValidationError) {
    console.error('Validation failed:', error.message, 'Field:', error.field)
    // Handle validation error
  } else if (error instanceof RateLimitError) {
    console.error('Rate limit exceeded. Retry after:', error.retryAfter, 'seconds')
    // Handle rate limit error
  } else {
    console.error('Unexpected error:', error.message)
    // Handle other errors
  }
}
```

## Configuration

### AgentConfig

Base configuration for all agents.

```typescript
interface AgentConfig {
  defaultOutputFormat: 'markdown' | 'json' | 'html'
  autoSave: boolean
  templates: {
    [category: string]: string[]
  }
  [key: string]: any
}
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `BMAD_AI_API_KEY` | AI provider API key | Required |
| `BMAD_AI_PROVIDER` | AI provider ('openai', 'claude', 'gemini') | 'openai' |
| `BMAD_AI_MODEL` | AI model to use | Provider default |
| `BMAD_AI_TEMPERATURE` | AI temperature (0-1) | 0.7 |
| `BMAD_AI_MAX_TOKENS` | Maximum tokens per request | 2000 |

## Best Practices

### 1. Error Handling

Always wrap agent calls in try-catch blocks:

```javascript
try {
  const result = await agent.executeCommand('command', context)
  if (result.success) {
    // Handle success
  } else {
    // Handle command failure
  }
} catch (error) {
  // Handle errors
}
```

### 2. Configuration Management

Use environment variables for sensitive data:

```javascript
// Good
const agent = new AnalystAgent({
  config: {
    apiKey: process.env.BMAD_AI_API_KEY
  }
})

// Bad
const agent = new AnalystAgent({
  config: {
    apiKey: 'hardcoded-key'
  }
})
```

### 3. Context Optimization

Provide relevant context for better results:

```javascript
// Good
const context = {
  userInput: 'Analyze the mobile app market',
  projectType: 'mobile',
  targetAudience: 'consumers',
  analysisDepth: 'deep'
}

// Bad
const context = {
  userInput: 'Analyze market'
}
```

### 4. Performance Optimization

Use concurrent operations when possible:

```javascript
// Good
const [marketResearch, competitorAnalysis] = await Promise.all([
  analyst.executeCommand('market-research', context),
  analyst.executeCommand('competitor-analysis', context)
])

// Bad
const marketResearch = await analyst.executeCommand('market-research', context)
const competitorAnalysis = await analyst.executeCommand('competitor-analysis', context)
```

## Examples

See the [examples directory](../examples/) for comprehensive usage examples:

- [Basic Usage](../examples/basic-usage.js)
- [Advanced Workflow](../examples/advanced-workflow.js)

## Support

For API support and questions:

- **GitHub Issues**: [Report bugs and request features](https://github.com/osmanekrem/bmad-core/issues)
- **Documentation**: [GitHub Wiki](https://github.com/osmanekrem/bmad-core/wiki)
- **Discussions**: [Community discussions](https://github.com/osmanekrem/bmad-core/discussions)
