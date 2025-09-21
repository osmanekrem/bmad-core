# @osmanekrem/bmad-cli

Command line tool for BMad Method - AI-driven development agents.

## Installation

```bash
npm install -g @osmanekrem/bmad-cli
```

## Quick Start

```bash
# Initialize BMad in your project
bmad init

# Install specific agents
bmad install analyst architect dev

# Check status
bmad status

# Configure settings
bmad config
```

## Commands

### `bmad init`

Initialize BMad in your project with interactive setup.

```bash
bmad init
bmad init --provider openai --key sk-your-key
bmad init --interactive
```

**Options:**
- `-p, --provider <provider>` - AI provider (openai, claude, gemini)
- `-k, --key <key>` - API key
- `-a, --agents <agents>` - Comma-separated list of agents
- `-i, --interactive` - Interactive mode

### `bmad install`

Install BMad agents.

```bash
bmad install analyst architect
bmad install --interactive
```

**Options:**
- `-i, --interactive` - Interactive agent selection

### `bmad config`

Configure BMad settings.

```bash
bmad config --show
bmad config --provider claude
bmad config --interactive
```

**Options:**
- `-p, --provider <provider>` - AI provider
- `-k, --key <key>` - API key
- `-s, --show` - Show current configuration
- `-i, --interactive` - Interactive configuration

### `bmad status`

Show BMad status and configuration.

```bash
bmad status
bmad status --verbose
```

**Options:**
- `-v, --verbose` - Show verbose information

## Environment Variables

The CLI automatically manages these environment variables in your `.env` file:

```bash
BMAD_AI_PROVIDER=openai
BMAD_AI_API_KEY=your-api-key
BMAD_AI_MODEL=gpt-4
BMAD_AI_TEMPERATURE=0.7
BMAD_AI_MAX_TOKENS=2000
```

## Supported Providers

- **OpenAI**: GPT-4, GPT-3.5-turbo
- **Claude**: Claude-3-sonnet, Claude-3-haiku
- **Gemini**: Gemini-pro, Gemini-pro-vision

## Available Agents

- `analyst` - Business Analyst for market research and project briefing
- `architect` - System Architect for technical design and architecture
- `dev` - Developer for code implementation and development
- `pm` - Product Manager for requirements and planning
- `po` - Product Owner for product strategy and validation
- `qa` - Quality Assurance for testing and quality gates
- `sm` - Scrum Master for agile process management
- `ux-expert` - UX Expert for user experience design

## Usage Examples

### Interactive Setup
```bash
bmad init --interactive
```

### Non-interactive Setup
```bash
bmad init --provider openai --key sk-your-key --agents analyst,architect,dev
```

### Install Additional Agents
```bash
bmad install pm qa ux-expert
```

### Check Configuration
```bash
bmad config --show
```

### Change Provider
```bash
bmad config --provider claude --key sk-ant-your-key
```

## License

MIT
