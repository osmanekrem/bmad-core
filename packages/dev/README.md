# @osmanekrem/bmad-dev

BMad Dev Agent - AI-driven development and coding assistance specialist.

## Features

- 💻 **Code Generation**: Generate high-quality, production-ready code
- 🔍 **Code Review**: Review code for quality, security, and best practices
- 🐛 **Debugging**: Help identify and fix bugs and issues
- 🔄 **Refactoring**: Improve code structure and maintainability
- 🧪 **Testing**: Create comprehensive test suites and strategies
- 📚 **Documentation**: Generate clear and comprehensive documentation
- ⚡ **Code Optimization**: Optimize code for performance and efficiency
- 🔌 **API Development**: Create RESTful API endpoints
- 🗄️ **Database Development**: Create database schemas and migrations
- 🎨 **Frontend Development**: Create frontend components and pages

## Installation

```bash
npm install @osmanekrem/bmad-dev
```

## Quick Start

```typescript
import { DevAgent } from '@osmanekrem/bmad-dev'

// Initialize the dev agent
const dev = new DevAgent({
  defaultOutputFormat: 'markdown',
  codeStyle: 'standard',
  testingFramework: 'jest',
  documentationFormat: 'markdown'
})

// Generate code
const result = await dev.executeCommand('generate-code', {
  userInput: 'Create a user authentication system',
  codeLanguage: 'TypeScript',
  framework: 'Express.js'
})

console.log(result.output)
```

## Available Commands

### Code Generation
```typescript
const code = await dev.executeCommand('generate-code', {
  userInput: 'Create a user authentication system',
  codeLanguage: 'TypeScript',
  framework: 'Express.js',
  options: {
    codeStyle: 'standard',
    testingFramework: 'jest',
    documentationFormat: 'markdown'
  }
})
```

### Code Review
```typescript
const review = await dev.executeCommand('review-code', {
  userInput: 'const user = { name: "John", age: 30 }',
  codeLanguage: 'JavaScript',
  options: {
    focusAreas: ['security', 'performance', 'best-practices']
  }
})
```

### Debugging
```typescript
const debugging = await dev.executeCommand('debug-code', {
  userInput: 'Getting "Cannot read property of undefined" error in my React component',
  codeLanguage: 'JavaScript',
  framework: 'React'
})
```

### Refactoring
```typescript
const refactoring = await dev.executeCommand('refactor-code', {
  userInput: 'Refactor this legacy code to use modern patterns',
  codeLanguage: 'JavaScript',
  options: {
    refactoringType: 'modernize',
    maintainTests: true
  }
})
```

### Testing
```typescript
const testing = await dev.executeCommand('create-tests', {
  userInput: 'Create tests for user authentication functions',
  codeLanguage: 'JavaScript',
  framework: 'Jest',
  options: {
    testTypes: ['unit', 'integration'],
    coverage: 90
  }
})
```

### Documentation
```typescript
const docs = await dev.executeCommand('generate-docs', {
  userInput: 'Generate API documentation for user management endpoints',
  codeLanguage: 'JavaScript',
  framework: 'Express.js',
  options: {
    format: 'markdown',
    includeExamples: true
  }
})
```

### Code Optimization
```typescript
const optimization = await dev.executeCommand('optimize-code', {
  userInput: 'Optimize this database query for better performance',
  codeLanguage: 'SQL',
  options: {
    focusAreas: ['performance', 'memory-usage']
  }
})
```

### API Development
```typescript
const api = await dev.executeCommand('create-api', {
  userInput: 'Create RESTful API for e-commerce product management',
  codeLanguage: 'TypeScript',
  framework: 'Express.js',
  options: {
    includeAuth: true,
    includeValidation: true,
    includeDocs: true
  }
})
```

### Database Development
```typescript
const database = await dev.executeCommand('create-database', {
  userInput: 'Create database schema for e-commerce platform',
  codeLanguage: 'SQL',
  options: {
    databaseType: 'PostgreSQL',
    includeMigrations: true,
    includeIndexes: true
  }
})
```

### Frontend Development
```typescript
const frontend = await dev.executeCommand('create-frontend', {
  userInput: 'Create React components for user dashboard',
  codeLanguage: 'TypeScript',
  framework: 'React',
  options: {
    includeStateManagement: true,
    includeStyling: true,
    includeTesting: true
  }
})
```

## Configuration

```typescript
const dev = new DevAgent({
  defaultOutputFormat: 'markdown',     // 'markdown' | 'json' | 'yaml' | 'text'
  codeStyle: 'standard',               // 'standard' | 'prettier' | 'eslint' | 'custom'
  testingFramework: 'jest',            // 'jest' | 'mocha' | 'vitest' | 'pytest' | 'junit'
  documentationFormat: 'markdown',     // 'markdown' | 'jsdoc' | 'tsdoc' | 'sphinx'
  autoSave: true,                      // Auto-save generated code
  templates: {
    generation: ['code-generation-tmpl'],
    review: ['code-review-tmpl'],
    debugging: ['debugging-tmpl'],
    testing: ['testing-tmpl']
  }
})
```

## Template Integration

The dev agent integrates with the BMad template system for structured output:

```typescript
import { DevTemplateManager } from '@osmanekrem/bmad-dev'

const templateManager = new DevTemplateManager()

// Render code generation with template
const formattedOutput = await templateManager.renderCodeGenerationTemplate(
  'code-generation-tmpl',
  context,
  codeGenerationData
)
```

## API Reference

### DevAgent

#### Constructor
```typescript
new DevAgent(config?: Partial<DevConfig>)
```

#### Methods
- `executeCommand(commandName: string, context: DevContext): Promise<DevResponse>`
- `getAvailableCommands(): string[]`
- `getCommandDescription(commandName: string): string | undefined`
- `updateConfig(newConfig: Partial<DevConfig>): void`
- `getConfig(): DevConfig`

### Types

#### DevContext
```typescript
interface DevContext {
  projectPath?: string
  userInput?: string
  options?: Record<string, any>
  templates?: string[]
  outputFormat?: 'markdown' | 'json' | 'yaml' | 'text'
  codeLanguage?: string
  framework?: string
}
```

#### DevResponse
```typescript
interface DevResponse {
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

## Code Quality Standards

### Clean Code Principles
- **Readable**: Code should be self-documenting
- **Simple**: Prefer simple solutions over complex ones
- **DRY**: Don't Repeat Yourself
- **SOLID**: Follow SOLID principles
- **Testable**: Write testable code

### Security Considerations
- Input validation and sanitization
- Authentication and authorization
- Data encryption and protection
- Secure coding practices
- Vulnerability prevention

### Performance Guidelines
- Efficient algorithms and data structures
- Memory management
- Resource optimization
- Caching strategies
- Performance monitoring

## Examples

### Basic Code Generation
```typescript
import { DevAgent } from '@osmanekrem/bmad-dev'

const dev = new DevAgent()

const result = await dev.executeCommand('generate-code', {
  userInput: 'Create a simple HTTP server with Express.js',
  codeLanguage: 'JavaScript',
  framework: 'Express.js'
})

if (result.success) {
  console.log(result.output)
} else {
  console.error('Code generation failed:', result.error)
}
```

### Advanced Code Review
```typescript
const review = await dev.executeCommand('review-code', {
  userInput: `
    function processUserData(userData) {
      const processed = userData.map(user => {
        return {
          id: user.id,
          name: user.name,
          email: user.email.toLowerCase()
        }
      })
      return processed
    }
  `,
  codeLanguage: 'JavaScript',
  options: {
    focusAreas: ['security', 'performance', 'best-practices'],
    includeSuggestions: true,
    includeImprovements: true
  }
})

const reviewData = review.data as CodeReview
console.log(`Overall Score: ${reviewData.overallScore}/10`)
console.log(`Issues Found: ${reviewData.issues.length}`)
```

### Custom Configuration
```typescript
const dev = new DevAgent({
  defaultOutputFormat: 'json',
  codeStyle: 'prettier',
  testingFramework: 'vitest',
  documentationFormat: 'jsdoc',
  autoSave: false,
  templates: {
    generation: ['custom-code-tmpl'],
    review: ['code-review-tmpl'],
    debugging: ['debugging-tmpl'],
    testing: ['testing-tmpl']
  }
})

// Update configuration
dev.updateConfig({
  codeStyle: 'eslint',
  testingFramework: 'jest'
})
```

## Supported Languages and Frameworks

### Languages
- **JavaScript**: ES6+, Node.js
- **TypeScript**: Type-safe JavaScript
- **Python**: Django, Flask, FastAPI
- **Java**: Spring Boot, Maven
- **C#**: .NET Core, ASP.NET
- **Go**: Gin, Echo
- **Rust**: Actix, Rocket
- **PHP**: Laravel, Symfony
- **Ruby**: Rails, Sinatra
- **SQL**: PostgreSQL, MySQL, SQLite

### Frontend Frameworks
- **React**: Hooks, Context, Redux
- **Vue.js**: Composition API, Vuex
- **Angular**: Components, Services, RxJS
- **Svelte**: Components, Stores
- **Next.js**: SSR, SSG, API Routes
- **Nuxt.js**: Vue.js framework
- **Gatsby**: Static site generation

### Backend Frameworks
- **Express.js**: Node.js web framework
- **Fastify**: Fast Node.js framework
- **Koa.js**: Next generation web framework
- **Django**: Python web framework
- **Flask**: Lightweight Python framework
- **Spring Boot**: Java framework
- **ASP.NET Core**: .NET framework
- **Gin**: Go web framework
- **Rails**: Ruby web framework

## License

MIT
