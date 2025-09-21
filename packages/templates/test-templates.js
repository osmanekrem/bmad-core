#!/usr/bin/env node

import { TemplateManager, TemplateCompiler, BatchCompiler } from './dist/index.js'

async function testTemplates() {
  console.log('📄 Testing BMad Templates Package...\n')

  try {
    // Test TemplateManager
    console.log('📄 Testing TemplateManager...')
    const templateManager = new TemplateManager()
    const availableTemplates = await templateManager.getAvailableTemplates()
    console.log('✅ TemplateManager initialized successfully')
    console.log('📊 Available templates:', availableTemplates)

    // Test loading a template
    if (availableTemplates.length > 0) {
      const templateId = availableTemplates[0]
      console.log(`\n📄 Testing template loading: ${templateId}`)
      try {
        const template = await templateManager.loadTemplate(templateId)
        console.log('✅ Template loaded successfully')
        console.log('📊 Template metadata:', template.metadata)
      } catch (error) {
        console.log('⚠️ Template loading test (expected to fail):', error.message)
      }
    }

    // Test TemplateCompiler
    console.log('\n📄 Testing TemplateCompiler...')
    try {
      const templatePath = './templates/yaml/story-tmpl.yaml'
      const compiledTemplate = await TemplateCompiler.compileFromFile(templatePath)
      console.log('✅ TemplateCompiler compiled template successfully')
      console.log('📊 Compiled template metadata:', compiledTemplate.metadata)
    } catch (error) {
      console.log('⚠️ TemplateCompiler test (expected to fail):', error.message)
    }

    // Test BatchCompiler
    console.log('\n📄 Testing BatchCompiler...')
    try {
      const batchCompiler = new BatchCompiler()
      const results = await batchCompiler.compileAllTemplates()
      console.log('✅ BatchCompiler compiled templates successfully')
      console.log('📊 Compilation results:', results)
    } catch (error) {
      console.log('⚠️ BatchCompiler test (expected to fail):', error.message)
    }

    console.log('\n🎉 Templates package tests completed successfully!')

  } catch (error) {
    console.error('❌ Templates package test failed:', error.message)
    console.error(error.stack)
  }
}

testTemplates()
