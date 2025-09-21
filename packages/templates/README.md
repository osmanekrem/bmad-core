# @osmanekrem/bmad-templates

Template system for BMad Method - AI-driven development agents.

## Features

- 🔄 **YAML to JavaScript Compilation**: Convert YAML templates to optimized JavaScript
- 🎨 **Template Rendering**: Handlebars-powered template rendering
- 💾 **Template Caching**: In-memory template caching with TTL
- 📦 **Batch Compilation**: Compile multiple templates at once
- 🔍 **Template Validation**: Validate template structure and data
- ⚡ **Hot Reload**: Watch mode for development

## Installation

```bash
npm install @osmanekrem/bmad-templates
```

## Quick Start

```typescript
import { TemplateManager, TemplateCompiler } from '@osmanekrem/bmad-templates'

// Compile a template from YAML
const yamlContent = `
template:
  id: my-template
  name: My Template
  version: 1.0.0
sections:
  - id: title
    title: Title
    type: text
`

const compiled = TemplateCompiler.compileFromYaml(yamlContent)

// Use template manager
const manager = new TemplateManager()
await manager.renderTemplate('my-template', { title: 'Hello World' })
```

## Template Structure

### YAML Template Format

```yaml
template:
  id: template-id
  name: Template Name
  version: 1.0.0
  output:
    format: markdown
    filename: output.md
    title: "{{project_name}} Document"

workflow:
  mode: interactive
  elicitation: advanced-elicitation

sections:
  - id: section-id
    title: Section Title
    type: text | bullet-list | numbered-list | table | choice | template-text
    instruction: Section instruction
    elicit: true | false
    condition: "hasField"
    repeatable: true | false
    template: "Hello {{name}}"
    choices: ["option1", "option2"]
    columns: ["col1", "col2"]
    prefix: "FR"
    owner: agent-name
    editors: ["agent1", "agent2"]
    sections:
      - id: subsection
        title: Subsection
        type: text
```

### Section Types

- **text**: Plain text content
- **bullet-list**: Bullet point list
- **numbered-list**: Numbered list with optional prefix
- **table**: Table with specified columns
- **choice**: Single choice selection
- **template-text**: Handlebars template text

## API Reference

### TemplateCompiler

```typescript
// Compile from YAML string
const compiled = TemplateCompiler.compileFromYaml(yamlContent)

// Compile from file
const compiled = TemplateCompiler.compileFromFile('template.yaml')

// Compile from config object
const compiled = TemplateCompiler.compile(config)
```

### TemplateManager

```typescript
const manager = new TemplateManager()

// Register template
manager.registerTemplate('template-id', '/path/to/template.yaml')

// Load template
const template = await manager.loadTemplate('template-id')

// Render template
const output = await manager.renderTemplate('template-id', context)

// Get available templates
const templates = await manager.getAvailableTemplates()
```

### BatchCompiler

```typescript
// Compile directory
const result = await BatchCompiler.compileDirectory({
  inputDir: './templates/yaml',
  outputDir: './templates/compiled',
  verbose: true
})

// Watch directory for changes
await BatchCompiler.watchDirectory({
  inputDir: './templates/yaml',
  outputDir: './templates/compiled'
})
```

### TemplateCache

```typescript
const cache = new TemplateCache(100, 300000) // max 100 items, 5min TTL

// Basic operations
cache.set('key', template)
const template = cache.get('key')
const exists = cache.has('key')
cache.delete('key')
cache.clear()

// Cache management
const stats = cache.getStats()
cache.setMaxSize(200)
cache.setTTL(600000) // 10 minutes
const cleaned = cache.cleanExpired()
```

## Template Context

Templates receive a context object with data for rendering:

```typescript
const context = {
  project_name: 'My Project',
  sections: {
    title: 'Project Title',
    description: 'Project Description'
  },
  requirements: [
    'Requirement 1',
    'Requirement 2'
  ]
}
```

## Handlebars Helpers

The template renderer includes useful Handlebars helpers:

- `{{date 'iso'}}` - Current date in ISO format
- `{{capitalize 'hello'}}` - Capitalize first letter
- `{{uppercase 'hello'}}` - Convert to uppercase
- `{{lowercase 'HELLO'}}` - Convert to lowercase
- `{{join array ', '}}` - Join array with separator
- `{{length array}}` - Get array length
- `{{#if condition}}...{{/if}}` - Conditional rendering
- `{{#unless condition}}...{{/unless}}` - Negative conditional
- `{{#each array}}...{{/each}}` - Loop through array
- `{{equals a b}}` - Check equality
- `{{gt a b}}` - Greater than comparison
- `{{lt a b}}` - Less than comparison

## CLI Usage

```bash
# Compile templates
npm run compile-templates

# Watch for changes
npm run dev
```

## License

MIT
