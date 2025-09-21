// Template System Types

export interface TemplateMetadata {
  id: string
  name: string
  version: string
  output: {
    format: 'markdown' | 'json' | 'yaml' | 'text'
    filename: string
    title: string
  }
}

export interface TemplateWorkflow {
  mode: 'interactive' | 'batch' | 'yolo'
  elicitation?: string
}

export interface TemplateSection {
  id: string
  title: string
  type: 'text' | 'bullet-list' | 'numbered-list' | 'table' | 'choice' | 'template-text'
  instruction?: string
  elicit?: boolean
  condition?: string
  repeatable?: boolean
  template?: string
  choices?: string[] | { name: string; value: string }[]
  columns?: string[]
  prefix?: string
  owner?: string
  editors?: string[]
  sections?: TemplateSection[]
}

export interface TemplateConfig {
  template: TemplateMetadata
  workflow: TemplateWorkflow
  sections: TemplateSection[]
  agent_config?: {
    editable_sections?: string[]
  }
}

export interface CompiledTemplate {
  metadata: TemplateMetadata
  workflow: TemplateWorkflow
  sections: CompiledSection[]
  agent_config?: {
    editable_sections?: string[]
  }
}

export interface CompiledSection {
  id: string
  title: string
  type: string
  instruction?: string
  elicit?: boolean
  condition?: string
  repeatable?: boolean
  template?: string
  choices?: string[] | { name: string; value: string }[]
  columns?: string[]
  prefix?: string
  owner?: string
  editors?: string[]
  sections?: CompiledSection[]
  renderer?: (context: any) => string
  validator?: (value: any) => boolean
}

export interface TemplateContext {
  [key: string]: any
}

export interface TemplateRenderer {
  render(template: string, context: TemplateContext): string
  validate(template: CompiledTemplate, context: TemplateContext): boolean
}

export interface TemplateCache {
  get(key: string): CompiledTemplate | undefined
  set(key: string, template: CompiledTemplate): void
  has(key: string): boolean
  clear(): void
  size(): number
}

export interface TemplateManager {
  loadTemplate(templateId: string): Promise<CompiledTemplate>
  getAvailableTemplates(): Promise<string[]>
  compileTemplate(yamlContent: string): CompiledTemplate
  renderTemplate(templateId: string, context: TemplateContext): Promise<string>
}

export interface CompilerOptions {
  inputDir: string
  outputDir: string
  watch?: boolean
  verbose?: boolean
}

export interface CompilationResult {
  success: boolean
  compiled: number
  failed: number
  errors: string[]
  output: string[]
}
