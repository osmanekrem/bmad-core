# BMad AI Development Agents

A comprehensive suite of AI-powered development agents with tree-shaking support for modern JavaScript/TypeScript projects.

## Installation

```bash
npm install @osmanekrem/bmad
```

## Tree-Shaking Support

This package is designed with tree-shaking in mind. You can import only the specific agents you need:

### Individual Agent Imports

```javascript
// Core functionality
import { CoreAgent, AIProvider } from "@osmanekrem/bmad/core"

// Specialized agents
import { AnalystAgent } from "@osmanekrem/bmad/analyst"
import { ArchitectAgent } from "@osmanekrem/bmad/architect"
import { DevAgent } from "@osmanekrem/bmad/dev"
import { PMAgent } from "@osmanekrem/bmad/pm"
import { QAAgent } from "@osmanekrem/bmad/qa"
import { SMAgent } from "@osmanekrem/bmad/sm"
import { UXAgent } from "@osmanekrem/bmad/ux"
import { MasterAgent } from "@osmanekrem/bmad/master"
import { OrchestratorAgent } from "@osmanekrem/bmad/orchestrator"

// Template system
import { TemplateManager } from "@osmanekrem/bmad/templates"

// CLI tools
import { CLI } from "@osmanekrem/bmad/cli"
```

### Full Import (if needed)

```javascript
import * as BMad from "@osmanekrem/bmad"
```

## Available Agents

### Core Agent
- **Purpose**: Base AI provider abstraction and core functionality
- **Import**: `@osmanekrem/bmad/core`
- **Features**: Multi-provider support (OpenAI, Claude, Gemini)

### Analyst Agent
- **Purpose**: AI-driven analysis and research
- **Import**: `@osmanekrem/bmad/analyst`
- **Features**: Data analysis, research assistance, insights generation

### Architect Agent
- **Purpose**: System architecture and design
- **Import**: `@osmanekrem/bmad/architect`
- **Features**: System design, architecture patterns, technical planning

### Dev Agent
- **Purpose**: Development and coding assistance
- **Import**: `@osmanekrem/bmad/dev`
- **Features**: Code generation, debugging, development workflows

### PM Agent
- **Purpose**: Project management and planning
- **Import**: `@osmanekrem/bmad/pm`
- **Features**: Project planning, task management, resource allocation

### QA Agent
- **Purpose**: Quality assurance and testing
- **Import**: `@osmanekrem/bmad/qa`
- **Features**: Test planning, quality checks, testing strategies

### SM Agent (Scrum Master)
- **Purpose**: Agile coaching and Scrum management
- **Import**: `@osmanekrem/bmad/sm`
- **Features**: Sprint planning, agile ceremonies, team coaching

### UX Agent
- **Purpose**: User experience design and research
- **Import**: `@osmanekrem/bmad/ux`
- **Features**: UX research, design patterns, usability analysis

### Master Agent
- **Purpose**: Project orchestration and strategic planning
- **Import**: `@osmanekrem/bmad/master`
- **Features**: High-level project coordination, strategic decisions

### Orchestrator Agent
- **Purpose**: Workflow management and coordination
- **Import**: `@osmanekrem/bmad/orchestrator`
- **Features**: Process orchestration, workflow automation

## Template System

The template system provides a flexible way to manage and use predefined templates:

```javascript
import { TemplateManager } from "@osmanekrem/bmad/templates"

const templateManager = new TemplateManager()
const template = await templateManager.getTemplate('analyst/research-template')
```

## CLI Tools

Command-line interface for managing agents and workflows:

```javascript
import { CLI } from "@osmanekrem/bmad/cli"

// CLI is automatically available as 'bmad' command when installed
```

## Configuration

Set up your AI providers:

```javascript
import { AIProvider } from "@osmanekrem/bmad/core"

// Configure OpenAI
AIProvider.configure('openai', {
  apiKey: process.env.OPENAI_API_KEY
})

// Configure Claude
AIProvider.configure('claude', {
  apiKey: process.env.ANTHROPIC_API_KEY
})

// Configure Gemini
AIProvider.configure('gemini', {
  apiKey: process.env.GOOGLE_API_KEY
})
```

## Usage Example

```javascript
import { AnalystAgent, ArchitectAgent } from "@osmanekrem/bmad"

// Initialize agents
const analyst = new AnalystAgent()
const architect = new ArchitectAgent()

// Use agents
const analysis = await analyst.analyzeData(data)
const architecture = await architect.designSystem(requirements)
```

## Tree-Shaking Benefits

- **Smaller bundle sizes**: Only import what you use
- **Better performance**: Reduced JavaScript payload
- **Cleaner code**: Explicit imports make dependencies clear
- **Modern tooling**: Works with Webpack, Rollup, Vite, and other bundlers

## Development

This package uses a monorepo structure with individual packages that are built into a unified distribution. The tree-shaking is achieved through:

1. **ESM modules**: All code is published as ES modules
2. **Proper exports**: Each submodule has its own export path
3. **Side-effect free**: Code is written to be tree-shakeable
4. **TypeScript support**: Full type definitions included

## License

MIT

## Author

Osman Ekrem Korkmaz

## Repository

https://github.com/osmanekrem/bmad-core