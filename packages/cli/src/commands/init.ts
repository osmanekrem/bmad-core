import { Command } from 'commander'
import inquirer from 'inquirer'
import chalk from 'chalk'
import ora from 'ora'
import { EnvManager } from '../utils/env-manager.js'
import { PackageManager } from '../utils/package-manager.js'
import { ConfigValidator } from '../utils/config-validator.js'
import { InitOptions } from '../types/index.js'

export const initCommand = new Command('init')
  .description('Initialize BMad in your project')
  .option('-p, --provider <provider>', 'AI provider (openai, claude, gemini)', 'openai')
  .option('-k, --key <key>', 'API key')
  .option('-a, --agents <agents>', 'Comma-separated list of agents to install', 'analyst,architect,dev')
  .option('-i, --interactive', 'Interactive mode for guided setup')
  .action(async (options: InitOptions) => {
    console.log(chalk.blue.bold('\n🚀 Initializing BMad...\n'))

    try {
      // Interactive mode
      if (options.interactive) {
        await runInteractiveInit()
        return
      }

      // Non-interactive mode
      await runNonInteractiveInit(options)
    } catch (error: any) {
      console.error(chalk.red.bold('❌ Initialization failed:'), error.message)
      process.exit(1)
    }
  })

async function runInteractiveInit(): Promise<void> {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'provider',
      message: 'Select AI provider:',
      choices: [
        { name: 'OpenAI (GPT-4, GPT-3.5)', value: 'openai' },
        { name: 'Claude (Anthropic)', value: 'claude' },
        { name: 'Gemini (Google)', value: 'gemini' }
      ],
      default: 'openai'
    },
    {
      type: 'password',
      name: 'apiKey',
      message: 'Enter your API key:',
      validate: (input) => {
        const validation = ConfigValidator.validateApiKey(input)
        return validation.isValid || validation.error || 'Invalid API key'
      }
    },
    {
      type: 'checkbox',
      name: 'agents',
      message: 'Select agents to install:',
      choices: [
        { name: 'Analyst (Business analysis, market research)', value: 'analyst', checked: true },
        { name: 'Architect (System design, architecture)', value: 'architect', checked: true },
        { name: 'Developer (Code implementation)', value: 'dev', checked: true },
        { name: 'Product Manager (Requirements, planning)', value: 'pm' },
        { name: 'Product Owner (Product strategy)', value: 'po' },
        { name: 'QA (Testing, quality assurance)', value: 'qa' },
        { name: 'Scrum Master (Agile process)', value: 'sm' },
        { name: 'UX Expert (User experience)', value: 'ux-expert' }
      ]
    }
  ])

  await performInit(answers.provider, answers.apiKey, answers.agents)
}

async function runNonInteractiveInit(options: InitOptions): Promise<void> {
  let provider = options.provider || 'openai'
  let apiKey = options.key
  let agents = options.agents ? options.agents.split(',').map(a => a.trim()) : ['analyst', 'architect', 'dev']

  // Get API key if not provided
  if (!apiKey) {
    const answers = await inquirer.prompt([
      {
        type: 'password',
        name: 'apiKey',
        message: `Enter your ${ConfigValidator.getProviderDisplayName(provider)} API key:`,
        validate: (input) => {
          const validation = ConfigValidator.validateApiKey(input)
          return validation.isValid || validation.error || 'Invalid API key'
        }
      }
    ])
    apiKey = answers.apiKey
  }

  if (!apiKey) {
    throw new Error('API key is required')
  }

  await performInit(provider, apiKey, agents)
}

async function performInit(provider: string, apiKey: string, agents: string[]): Promise<void> {
  // Validate provider
  const providerValidation = ConfigValidator.validateProviderName(provider)
  if (!providerValidation.isValid) {
    throw new Error(providerValidation.error)
  }

  // Validate API key
  const keyValidation = ConfigValidator.validateApiKey(apiKey)
  if (!keyValidation.isValid) {
    throw new Error(keyValidation.error)
  }

  // Validate API key with provider
  const spinner = ora('Validating API key...').start()
  const validation = await ConfigValidator.validateProvider(provider, apiKey)
  spinner.stop()

  if (!validation.isValid) {
    throw new Error(`API key validation failed: ${validation.error}`)
  }

  console.log(chalk.green('✅ API key validated successfully'))

  // Setup environment
  const envSpinner = ora('Setting up environment...').start()
  const envManager = new EnvManager()
  await envManager.setupEnv(provider, apiKey)
  envSpinner.stop()

  console.log(chalk.green('✅ Environment configured'))

  // Install packages
  const packageSpinner = ora('Installing packages...').start()
  const packageManager = new PackageManager()
  const result = await packageManager.installAgents(agents)
  packageSpinner.stop()

  if (result.success) {
    console.log(chalk.green('✅ Packages installed successfully'))
  } else {
    console.log(chalk.yellow('⚠️  Some packages failed to install:'))
    result.errors.forEach(error => console.log(chalk.red(`   - ${error}`)))
  }

  // Show success message
  console.log(chalk.green.bold('\n🎉 BMad initialized successfully!\n'))
  
  console.log(chalk.blue('Next steps:'))
  console.log(chalk.gray('1. Start using agents in your code:'))
  console.log(chalk.cyan('   import { Analyst } from "@osmanekrem/bmad-analyst"'))
  console.log(chalk.cyan('   const analyst = new Analyst()'))
  console.log(chalk.cyan('   const result = await analyst.execute("*brainstorm", { topic: "ideas" })'))
  
  console.log(chalk.gray('\n2. Available commands:'))
  console.log(chalk.cyan('   bmad status     - Show current status'))
  console.log(chalk.cyan('   bmad config     - Manage configuration'))
  console.log(chalk.cyan('   bmad install    - Install more agents'))
  
  console.log(chalk.gray('\n3. Installed agents:'))
  agents.forEach(agent => {
    console.log(chalk.cyan(`   - ${agent}`))
  })
}
