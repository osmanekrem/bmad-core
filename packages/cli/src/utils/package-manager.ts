import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'
import { InstallationResult, AgentInfo } from '../types/index.js'

const execAsync = promisify(exec)

export class PackageManager {
  private projectRoot: string
  private packageJsonPath: string

  constructor(projectRoot: string = process.cwd()) {
    this.projectRoot = projectRoot
    this.packageJsonPath = path.join(projectRoot, 'package.json')
  }

  async installAgents(agents: string[]): Promise<InstallationResult> {
    const result: InstallationResult = {
      success: true,
      installed: [],
      failed: [],
      errors: []
    }

    // Ensure package.json exists
    if (!fs.existsSync(this.packageJsonPath)) {
      await this.initPackageJson()
    }

    // Install core package first
    try {
      await this.installPackage('@osmanekrem/bmad-core')
    } catch (error: any) {
      result.errors.push(`Failed to install core package: ${error.message}`)
    }

    // Install agent packages
    for (const agent of agents) {
      try {
        const packageName = `@osmanekrem/bmad-${agent}`
        await this.installPackage(packageName)
        result.installed.push(agent)
      } catch (error: any) {
        result.failed.push(agent)
        result.errors.push(`Failed to install ${agent}: ${error.message}`)
      }
    }

    // Update package.json
    await this.updatePackageJson(agents)

    result.success = result.failed.length === 0
    return result
  }

  async installPackage(packageName: string): Promise<void> {
    try {
      await execAsync(`npm install ${packageName}`, { 
        cwd: this.projectRoot
      })
    } catch (error: any) {
      throw new Error(`Failed to install ${packageName}: ${error.message}`)
    }
  }

  async isPackageInstalled(packageName: string): Promise<boolean> {
    try {
      const packageJson = this.readPackageJson()
      return packageJson.dependencies?.[packageName] !== undefined ||
             packageJson.devDependencies?.[packageName] !== undefined
    } catch {
      return false
    }
  }

  async getInstalledAgents(): Promise<string[]> {
    const packageJson = this.readPackageJson()
    const agents: string[] = []

    if (packageJson.dependencies) {
      Object.keys(packageJson.dependencies).forEach(dep => {
        if (dep.startsWith('@osmanekrem/bmad-') && dep !== '@osmanekrem/bmad-core') {
          agents.push(dep.replace('@osmanekrem/bmad-', ''))
        }
      })
    }

    return agents
  }

  async getAvailableAgents(): Promise<AgentInfo[]> {
    // This would typically fetch from npm registry
    // For now, return hardcoded list
    const availableAgents = [
      { name: 'analyst', description: 'Business Analyst for market research and project briefing' },
      { name: 'architect', description: 'System Architect for technical design and architecture' },
      { name: 'dev', description: 'Developer for code implementation and development' },
      { name: 'pm', description: 'Product Manager for requirements and planning' },
      { name: 'po', description: 'Product Owner for product strategy and validation' },
      { name: 'qa', description: 'Quality Assurance for testing and quality gates' },
      { name: 'sm', description: 'Scrum Master for agile process management' },
      { name: 'ux-expert', description: 'UX Expert for user experience design' }
    ]

    const installedAgents = await this.getInstalledAgents()

    return availableAgents.map(agent => ({
      name: agent.name,
      package: `@osmanekrem/bmad-${agent.name}`,
      description: agent.description,
      available: true,
      installed: installedAgents.includes(agent.name)
    }))
  }

  private async initPackageJson(): Promise<void> {
    const packageJson = {
      name: 'bmad-project',
      version: '1.0.0',
      type: 'module',
      dependencies: {},
      scripts: {}
    }

    fs.writeFileSync(this.packageJsonPath, JSON.stringify(packageJson, null, 2))
  }

  private readPackageJson(): any {
    if (!fs.existsSync(this.packageJsonPath)) {
      return { dependencies: {}, devDependencies: {} }
    }

    const content = fs.readFileSync(this.packageJsonPath, 'utf8')
    return JSON.parse(content)
  }

  private async updatePackageJson(agents: string[]): Promise<void> {
    const packageJson = this.readPackageJson()

    // Ensure dependencies object exists
    if (!packageJson.dependencies) {
      packageJson.dependencies = {}
    }

    // Add core package
    packageJson.dependencies['@osmanekrem/bmad-core'] = '^1.0.0'

    // Add agent packages
    agents.forEach(agent => {
      packageJson.dependencies[`@osmanekrem/bmad-${agent}`] = '^1.0.0'
    })

    // Add helpful scripts
    if (!packageJson.scripts) {
      packageJson.scripts = {}
    }

    packageJson.scripts['bmad:status'] = 'bmad-cli status'
    packageJson.scripts['bmad:config'] = 'bmad-cli config'

    fs.writeFileSync(this.packageJsonPath, JSON.stringify(packageJson, null, 2))
  }
}
