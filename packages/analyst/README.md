# @osmanekrem/bmad-analyst

BMad Analyst Agent - AI-driven analysis and research specialist.

## Features

- 🔍 **Market Research**: Comprehensive market analysis and trend identification
- 🏢 **Competitor Analysis**: Detailed competitor evaluation and positioning
- 🔧 **Technical Analysis**: Technology and architecture assessment
- 📊 **Data Analysis**: Data processing and insight extraction
- 📈 **Trend Analysis**: Market and technology trend identification
- 📋 **Report Generation**: Professional analysis report creation

## Installation

```bash
npm install @osmanekrem/bmad-analyst
```

## Quick Start

```typescript
import { AnalystAgent } from '@osmanekrem/bmad-analyst'

// Initialize the analyst agent
const analyst = new AnalystAgent({
  defaultOutputFormat: 'markdown',
  analysisDepth: 'moderate',
  includeSources: true
})

// Execute market research
const result = await analyst.executeCommand('market-research', {
  userInput: 'AI-powered project management tools',
  outputFormat: 'markdown'
})

console.log(result.output)
```

## Available Commands

### Market Research
```typescript
const research = await analyst.executeCommand('market-research', {
  userInput: 'E-commerce platforms',
  options: {
    depth: 'deep',
    focusAreas: ['technology', 'user experience'],
    timeframe: '2024-2026',
    geographicScope: 'North America'
  }
})
```

### Competitor Analysis
```typescript
const analysis = await analyst.executeCommand('competitor-analysis', {
  userInput: 'Project management software',
  options: {
    primaryCompetitors: ['Asana', 'Trello', 'Monday.com'],
    marketSegment: 'SMB',
    geographicFocus: 'Global'
  }
})
```

### Technical Analysis
```typescript
const techAnalysis = await analyst.executeCommand('technical-analysis', {
  userInput: 'React vs Vue.js for frontend development',
  options: {
    depth: 'moderate',
    focusAreas: ['performance', 'scalability', 'developer experience']
  }
})
```

### Trend Analysis
```typescript
const trends = await analyst.executeCommand('trend-analysis', {
  userInput: 'Artificial Intelligence in software development',
  options: {
    depth: 'deep',
    timeframe: '2024-2027'
  }
})
```

### Data Analysis
```typescript
const dataAnalysis = await analyst.executeCommand('data-analysis', {
  userInput: 'User engagement metrics dataset',
  options: {
    analysisType: 'descriptive',
    includeVisualizations: true
  }
})
```

### Report Generation
```typescript
const report = await analyst.executeCommand('generate-report', {
  userInput: 'Comprehensive market analysis for fintech startups',
  outputFormat: 'markdown'
})
```

## Configuration

```typescript
const analyst = new AnalystAgent({
  defaultOutputFormat: 'markdown', // 'markdown' | 'json' | 'yaml' | 'text'
  analysisDepth: 'moderate',       // 'surface' | 'moderate' | 'deep'
  includeSources: true,            // Include source references
  autoSave: true,                  // Auto-save analysis results
  templates: {
    analysis: ['market-research-tmpl'],
    research: ['market-research-tmpl'],
    competitor: ['competitor-analysis-tmpl'],
    market: ['market-research-tmpl']
  }
})
```

## Template Integration

The analyst agent integrates with the BMad template system for structured output:

```typescript
import { AnalystTemplateManager } from '@osmanekrem/bmad-analyst'

const templateManager = new AnalystTemplateManager()

// Render analysis with template
const formattedOutput = await templateManager.renderAnalysisTemplate(
  'market-research-tmpl',
  context,
  analysisData
)
```

## API Reference

### AnalystAgent

#### Constructor
```typescript
new AnalystAgent(config?: Partial<AnalystConfig>)
```

#### Methods
- `executeCommand(commandName: string, context: AnalystContext): Promise<AnalystResponse>`
- `getAvailableCommands(): string[]`
- `getCommandDescription(commandName: string): string | undefined`
- `updateConfig(newConfig: Partial<AnalystConfig>): void`
- `getConfig(): AnalystConfig`

### Types

#### AnalystContext
```typescript
interface AnalystContext {
  projectPath?: string
  userInput?: string
  options?: Record<string, any>
  templates?: string[]
  outputFormat?: 'markdown' | 'json' | 'yaml' | 'text'
}
```

#### AnalystResponse
```typescript
interface AnalystResponse {
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

### Basic Market Research
```typescript
import { AnalystAgent } from '@osmanekrem/bmad-analyst'

const analyst = new AnalystAgent()

const result = await analyst.executeCommand('market-research', {
  userInput: 'SaaS productivity tools market',
  outputFormat: 'markdown'
})

if (result.success) {
  console.log(result.output)
} else {
  console.error('Analysis failed:', result.error)
}
```

### Advanced Competitor Analysis
```typescript
const analysis = await analyst.executeCommand('competitor-analysis', {
  userInput: 'Cloud storage solutions',
  options: {
    primaryCompetitors: ['Dropbox', 'Google Drive', 'OneDrive'],
    marketSegment: 'Enterprise',
    geographicFocus: 'Global',
    analysisDepth: 'deep'
  },
  outputFormat: 'json'
})

const competitorData = analysis.data as CompetitorAnalysis
console.log(`Analyzed ${competitorData.metadata.competitorCount} competitors`)
```

### Custom Configuration
```typescript
const analyst = new AnalystAgent({
  defaultOutputFormat: 'json',
  analysisDepth: 'deep',
  includeSources: true,
  autoSave: false,
  templates: {
    analysis: ['custom-analysis-tmpl'],
    research: ['market-research-tmpl'],
    competitor: ['competitor-analysis-tmpl'],
    market: ['market-research-tmpl']
  }
})

// Update configuration
analyst.updateConfig({
  analysisDepth: 'surface',
  includeSources: false
})
```

## License

MIT
