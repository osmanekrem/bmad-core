import { Command } from 'commander'
import inquirer from 'inquirer'
import chalk from 'chalk'
import ora from 'ora'
import { PackageManager } from '../utils/package-manager.js'
import { InstallOptions } from '../types/index.js'

export const installCommand = new Command('install')
  .description('Install BMad agents')
  .argument('[agents...]', 'Agent names to install')
  .option('-i, --interactive', 'Interactive mode for agent selection')
  .action(async (agents: string[], options: InstallOptions) => {
    console.log(chalk.blue.bold('\n📦 Installing BMad agents...\n'))

    try {
      let agentsToInstall = agents

      // Interactive mode
      if (options.interactive || agents.length === 0) {
        agentsToInstall = await runInteractiveInstall()
      }

      if (agentsToInstall.length === 0) {
        console.log(chalk.yellow('No agents selected for installation'))
        return
      }

      await performInstall(agentsToInstall)
    } catch (error: any) {
      console.error(chalk.red.bold('❌ Installation failed:'), error.message)
      process.exit(1)
    }
  })

async function runInteractiveInstall(): Promise<string[]> {
  const packageManager = new PackageManager()
  const availableAgents = await packageManager.getAvailableAgents()
  const installedAgents = await packageManager.getInstalledAgents()

  const choices = availableAgents.map(agent => ({
    name: `${agent.name} - ${agent.description}`,
    value: agent.name,
    checked: agent.installed,
    disabled: agent.installed ? 'Already installed' : false
  }))

  const answers = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'agents',
      message: 'Select agents to install:',
      choices,
      validate: (input) => {
        if (input.length === 0) {
          return 'Please select at least one agent'
        }
        return true
      }
    }
  ])

  return answers.agents
}

async function performInstall(agents: string[]): Promise<void> {
  const packageManager = new PackageManager()
  
  // Check which agents are already installed
  const installedAgents = await packageManager.getInstalledAgents()
  const newAgents = agents.filter(agent => !installedAgents.includes(agent))
  const alreadyInstalled = agents.filter(agent => installedAgents.includes(agent))

  if (alreadyInstalled.length > 0) {
    console.log(chalk.yellow('Already installed:'))
    alreadyInstalled.forEach(agent => {
      console.log(chalk.gray(`  - ${agent}`))
    })
    console.log()
  }

  if (newAgents.length === 0) {
    console.log(chalk.yellow('All selected agents are already installed'))
    return
  }

  console.log(chalk.blue('Installing new agents:'))
  newAgents.forEach(agent => {
    console.log(chalk.gray(`  - ${agent}`))
  })
  console.log()

  // Install agents
  const spinner = ora('Installing agents...').start()
  const result = await packageManager.installAgents(newAgents)
  spinner.stop()

  if (result.success) {
    console.log(chalk.green.bold('✅ Installation completed successfully!\n'))
    
    console.log(chalk.blue('Installed agents:'))
    result.installed.forEach(agent => {
      console.log(chalk.green(`  ✅ ${agent}`))
    })

    console.log(chalk.gray('\nUsage example:'))
    console.log(chalk.cyan(`import { ${capitalizeFirst(result.installed[0])} } from "@osmanekrem/bmad-${result.installed[0]}"`))
    console.log(chalk.cyan(`const agent = new ${capitalizeFirst(result.installed[0])}()`))
  } else {
    console.log(chalk.red.bold('❌ Installation completed with errors:\n'))
    
    if (result.installed.length > 0) {
      console.log(chalk.green('Successfully installed:'))
      result.installed.forEach(agent => {
        console.log(chalk.green(`  ✅ ${agent}`))
      })
      console.log()
    }

    if (result.failed.length > 0) {
      console.log(chalk.red('Failed to install:'))
      result.failed.forEach(agent => {
        console.log(chalk.red(`  ❌ ${agent}`))
      })
      console.log()
    }

    if (result.errors.length > 0) {
      console.log(chalk.red('Errors:'))
      result.errors.forEach(error => {
        console.log(chalk.red(`  - ${error}`))
      })
    }
  }
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
