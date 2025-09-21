import { Command } from 'commander'
import inquirer from 'inquirer'
import chalk from 'chalk'
import ora from 'ora'
import { EnvManager } from '../utils/env-manager.js'
import { ConfigValidator } from '../utils/config-validator.js'
import { ConfigOptions } from '../types/index.js'

export const configCommand = new Command('config')
  .description('Configure BMad settings')
  .option('-p, --provider <provider>', 'AI provider (openai, claude, gemini)')
  .option('-k, --key <key>', 'API key')
  .option('-s, --show', 'Show current configuration')
  .option('-i, --interactive', 'Interactive configuration mode')
  .action(async (options: ConfigOptions) => {
    console.log(chalk.blue.bold('\n⚙️  BMad Configuration\n'))

    try {
      if (options.show) {
        await showCurrentConfig()
        return
      }

      if (options.interactive) {
        await runInteractiveConfig()
        return
      }

      await runNonInteractiveConfig(options)
    } catch (error: any) {
      console.error(chalk.red.bold('❌ Configuration failed:'), error.message)
      process.exit(1)
    }
  })

async function showCurrentConfig(): Promise<void> {
  const envManager = new EnvManager()
  const config = envManager.readEnvConfig()

  console.log(chalk.blue('Current Configuration:\n'))

  if (Object.keys(config).length === 0) {
    console.log(chalk.yellow('No configuration found. Run "bmad init" to set up BMad.'))
    return
  }

  console.log(chalk.gray('Provider:'), chalk.cyan(config.BMAD_AI_PROVIDER || 'Not set'))
  console.log(chalk.gray('API Key:'), chalk.cyan(config.BMAD_AI_API_KEY ? '***' + config.BMAD_AI_API_KEY.slice(-4) : 'Not set'))
  console.log(chalk.gray('Model:'), chalk.cyan(config.BMAD_AI_MODEL || 'Default'))
  console.log(chalk.gray('Temperature:'), chalk.cyan(config.BMAD_AI_TEMPERATURE || '0.7'))
  console.log(chalk.gray('Max Tokens:'), chalk.cyan(config.BMAD_AI_MAX_TOKENS || '2000'))

  // Validate current configuration
  if (config.BMAD_AI_PROVIDER && config.BMAD_AI_API_KEY) {
    console.log(chalk.gray('\nValidating configuration...'))
    const spinner = ora('Validating API key...').start()
    
    try {
      const validation = await ConfigValidator.validateProvider(
        config.BMAD_AI_PROVIDER,
        config.BMAD_AI_API_KEY
      )
      spinner.stop()

      if (validation.isValid) {
        console.log(chalk.green('✅ Configuration is valid'))
      } else {
        console.log(chalk.red('❌ Configuration is invalid:'), validation.error)
      }
    } catch (error: any) {
      spinner.stop()
      console.log(chalk.red('❌ Validation failed:'), error.message)
    }
  }
}

async function runInteractiveConfig(): Promise<void> {
  const envManager = new EnvManager()
  const currentConfig = envManager.readEnvConfig()

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to configure?',
      choices: [
        { name: 'Change AI provider', value: 'provider' },
        { name: 'Update API key', value: 'key' },
        { name: 'View current configuration', value: 'show' }
      ]
    }
  ])

  switch (answers.action) {
    case 'provider':
      await configureProvider(envManager)
      break
    case 'key':
      await configureApiKey(envManager)
      break
    case 'show':
      await showCurrentConfig()
      break
  }
}

async function runNonInteractiveConfig(options: ConfigOptions): Promise<void> {
  const envManager = new EnvManager()

  if (options.provider) {
    await configureProvider(envManager, options.provider)
  }

  if (options.key) {
    await configureApiKey(envManager, options.key)
  }

  if (!options.provider && !options.key) {
    console.log(chalk.yellow('No configuration options provided. Use --help for available options.'))
  }
}

async function configureProvider(envManager: EnvManager, provider?: string): Promise<void> {
  let selectedProvider = provider

  if (!selectedProvider) {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'provider',
        message: 'Select AI provider:',
        choices: [
          { name: 'OpenAI (GPT-4, GPT-3.5)', value: 'openai' },
          { name: 'Claude (Anthropic)', value: 'claude' },
          { name: 'Gemini (Google)', value: 'gemini' }
        ]
      }
    ])
    selectedProvider = answers.provider
  }

  if (!selectedProvider) {
    throw new Error('Provider selection is required')
  }

  // Validate provider
  const validation = ConfigValidator.validateProviderName(selectedProvider)
  if (!validation.isValid) {
    throw new Error(validation.error)
  }

  // Update provider
  await envManager.updateProvider(selectedProvider)
  console.log(chalk.green(`✅ Provider updated to ${ConfigValidator.getProviderDisplayName(selectedProvider)}`))

  // Ask for API key if not provided
  const currentConfig = envManager.readEnvConfig()
  if (!currentConfig.BMAD_AI_API_KEY) {
    await configureApiKey(envManager)
  }
}

async function configureApiKey(envManager: EnvManager, apiKey?: string): Promise<void> {
  let key = apiKey

  if (!key) {
    const answers = await inquirer.prompt([
      {
        type: 'password',
        name: 'apiKey',
        message: 'Enter your API key:',
        validate: (input) => {
          const validation = ConfigValidator.validateApiKey(input)
          return validation.isValid || validation.error || 'Invalid API key'
        }
      }
    ])
    key = answers.apiKey
  }

  if (!key) {
    throw new Error('API key is required')
  }

  // Validate API key
  const keyValidation = ConfigValidator.validateApiKey(key)
  if (!keyValidation.isValid) {
    throw new Error(keyValidation.error)
  }

  // Get current provider
  const currentConfig = envManager.readEnvConfig()
  const provider = currentConfig.BMAD_AI_PROVIDER || 'openai'

  // Validate API key with provider
  const spinner = ora('Validating API key...').start()
  const validation = await ConfigValidator.validateProvider(provider, key)
  spinner.stop()

  if (!validation.isValid) {
    throw new Error(`API key validation failed: ${validation.error}`)
  }

  // Update API key
  await envManager.updateApiKey(key)
  console.log(chalk.green('✅ API key updated and validated successfully'))
}
