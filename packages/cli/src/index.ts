#!/usr/bin/env node

import { Command } from 'commander'
import chalk from 'chalk'
import { initCommand } from './commands/init.js'
import { installCommand } from './commands/install.js'
import { configCommand } from './commands/config.js'
import { statusCommand } from './commands/status.js'

const program = new Command()

program
  .name('bmad')
  .description('BMad CLI - AI-driven development agents')
  .version('1.0.0')

// Add commands
program.addCommand(initCommand)
program.addCommand(installCommand)
program.addCommand(configCommand)
program.addCommand(statusCommand)

// Global error handling
program.configureHelp({
  sortSubcommands: true,
  subcommandTerm: (cmd) => cmd.name()
})

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error(chalk.red.bold('❌ Unexpected error:'), error.message)
  process.exit(1)
})

process.on('unhandledRejection', (reason) => {
  console.error(chalk.red.bold('❌ Unhandled rejection:'), reason)
  process.exit(1)
})

// Parse arguments
program.parse()

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp()
}
