# @osmanekrem/bmad-core

Core package for BMad Method - AI provider abstraction and base agent functionality.

## Features

- 🤖 **Multi-Provider AI Support**: OpenAI, Claude, Gemini
- ⚙️ **Configuration Management**: Environment-based config
- 🏗️ **Base Agent Class**: Extensible agent architecture
- 🔧 **Provider Factory**: Easy provider switching
- 📦 **Tree-shaking Support**: Minimal bundle size

## Installation

```bash
npm install @osmanekrem/bmad-core
```

## Quick Start

```typescript
import { ConfigManager, AgentFactory } from '@osmanekrem/bmad-core'

// Load configuration from environment
const config = ConfigManager.loadConfig()

// Create an agent
const agent = AgentFactory.createAgent('placeholder', {
  systemPrompt: 'You are a helpful assistant',
  customInstructions: ['Always be concise']
})

// Execute commands
const response = await agent.execute('help', {})
```

## Environment Variables

```bash
BMAD_AI_PROVIDER=openai  # or claude, gemini
BMAD_AI_API_KEY=your-api-key-here
BMAD_AI_MODEL=gpt-4      # optional
BMAD_AI_TEMPERATURE=0.7  # optional
BMAD_AI_MAX_TOKENS=2000  # optional
```

## Supported Providers

- **OpenAI**: GPT-4, GPT-3.5-turbo
- **Claude**: Claude-3-sonnet, Claude-3-haiku
- **Gemini**: Gemini-pro, Gemini-pro-vision

## License

MIT
