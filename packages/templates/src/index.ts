// Template System Exports
export * from './types/index.js'
export * from './compiler/index.js'
export * from './manager/index.js'
export * from './cache/index.js'

// Main classes for easy access
export { TemplateManager } from './manager/template-manager.js'
export { TemplateRenderer } from './manager/template-renderer.js'
export { TemplateCompiler } from './compiler/template-compiler.js'
export { BatchCompiler } from './compiler/batch-compiler.js'
export { TemplateCache } from './cache/template-cache.js'
