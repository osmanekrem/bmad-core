import { Command } from 'commander'
import chalk from 'chalk'
import { EnvManager } from '../utils/env-manager.js'
import { PackageManager } from '../utils/package-manager.js'
import { ConfigValidator } from '../utils/config-validator.js'
import { StatusOptions } from '../types/index.js'

export const statusCommand = new Command('status')
  .description('Show BMad status and configuration')
  .option('-v, --verbose', 'Show verbose information')
  .action(async (options: StatusOptions) => {
    console.log(chalk.blue.bold('\n📊 BMad Status\n'))

    try {
      await showStatus(options)
    } catch (error: any) {
      console.error(chalk.red.bold('❌ Status check failed:'), error.message)
      process.exit(1)
    }
  })

async function showStatus(options: StatusOptions): Promise<void> {
  const envManager = new EnvManager()
  const packageManager = new PackageManager()

  // Check if BMad is initialized
  const isInitialized = envManager.envExists()
  
  if (!isInitialized) {
    console.log(chalk.yellow('⚠️  BMad is not initialized in this project'))
    console.log(chalk.gray('\nTo initialize BMad, run:'))
    console.log(chalk.cyan('  bmad init'))
    return
  }

  console.log(chalk.green('✅ BMad is initialized'))

  // Show configuration
  const config = envManager.readEnvConfig()
  console.log(chalk.blue('\nConfiguration:'))
  console.log(chalk.gray('  Provider:'), chalk.cyan(config.BMAD_AI_PROVIDER || 'Not set'))
  console.log(chalk.gray('  API Key:'), chalk.cyan(config.BMAD_AI_API_KEY ? '***' + config.BMAD_AI_API_KEY.slice(-4) : 'Not set'))
  
  if (options.verbose) {
    console.log(chalk.gray('  Model:'), chalk.cyan(config.BMAD_AI_MODEL || 'Default'))
    console.log(chalk.gray('  Temperature:'), chalk.cyan(config.BMAD_AI_TEMPERATURE || '0.7'))
    console.log(chalk.gray('  Max Tokens:'), chalk.cyan(config.BMAD_AI_MAX_TOKENS || '2000'))
  }

  // Validate configuration
  if (config.BMAD_AI_PROVIDER && config.BMAD_AI_API_KEY) {
    console.log(chalk.gray('\nValidating configuration...'))
    
    try {
      const validation = await ConfigValidator.validateProvider(
        config.BMAD_AI_PROVIDER,
        config.BMAD_AI_API_KEY
      )

      if (validation.isValid) {
        console.log(chalk.green('✅ Configuration is valid'))
      } else {
        console.log(chalk.red('❌ Configuration is invalid:'), validation.error)
      }
    } catch (error: any) {
      console.log(chalk.red('❌ Validation failed:'), error.message)
    }
  } else {
    console.log(chalk.yellow('⚠️  Configuration is incomplete'))
  }

  // Show installed agents
  console.log(chalk.blue('\nInstalled Agents:'))
  const installedAgents = await packageManager.getInstalledAgents()
  
  if (installedAgents.length === 0) {
    console.log(chalk.yellow('  No agents installed'))
    console.log(chalk.gray('\nTo install agents, run:'))
    console.log(chalk.cyan('  bmad install'))
  } else {
    installedAgents.forEach(agent => {
      console.log(chalk.green(`  ✅ ${agent}`))
    })
  }

  // Show available agents if verbose
  if (options.verbose) {
    console.log(chalk.blue('\nAvailable Agents:'))
    const availableAgents = await packageManager.getAvailableAgents()
    
    availableAgents.forEach(agent => {
      const status = agent.installed ? chalk.green('✅ Installed') : chalk.gray('⭕ Available')
      console.log(chalk.gray(`  ${agent.name}:`), status)
      console.log(chalk.gray(`    ${agent.description}`))
    })
  }

  // Show package information
  if (options.verbose) {
    console.log(chalk.blue('\nPackage Information:'))
    console.log(chalk.gray('  Core Package:'), chalk.cyan('@osmanekrem/bmad-core'))
    console.log(chalk.gray('  CLI Version:'), chalk.cyan('1.0.0'))
    console.log(chalk.gray('  Node Version:'), chalk.cyan(process.version))
  }

  // Show usage examples
  if (installedAgents.length > 0) {
    console.log(chalk.blue('\nUsage Examples:'))
    console.log(chalk.gray('  Import an agent:'))
    console.log(chalk.cyan(`  import { ${capitalizeFirst(installedAgents[0])} } from "@osmanekrem/bmad-${installedAgents[0]}"`))
    console.log(chalk.gray('  Create and use:'))
    console.log(chalk.cyan(`  const agent = new ${capitalizeFirst(installedAgents[0])}()`))
    console.log(chalk.cyan(`  const result = await agent.execute("*help", {})`))
  }

  console.log(chalk.gray('\nFor more information, run: bmad --help'))
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
