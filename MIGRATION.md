# BMad Package Migration Guide

## 🚀 Package Name Changes

BMad packages have been restructured to use a monorepo naming convention with `@osmanekrem/bmad` as the main package.

## 📦 Package Name Mapping

### Old Names → New Names

| Old Package Name | New Package Name |
|------------------|------------------|
| `@osmanekrem/bmad-core` | `@osmanekrem/bmad/core` |
| `@osmanekrem/bmad-analyst` | `@osmanekrem/bmad/agents/analyst` |
| `@osmanekrem/bmad-architect` | `@osmanekrem/bmad/agents/architect` |
| `@osmanekrem/bmad-dev` | `@osmanekrem/bmad/agents/dev` |
| `@osmanekrem/bmad-pm` | `@osmanekrem/bmad/agents/pm` |
| `@osmanekrem/bmad-qa` | `@osmanekrem/bmad/agents/qa` |
| `@osmanekrem/bmad-sm` | `@osmanekrem/bmad/agents/sm` |
| `@osmanekrem/bmad-ux` | `@osmanekrem/bmad/agents/ux` |
| `@osmanekrem/bmad-master` | `@osmanekrem/bmad/agents/master` |
| `@osmanekrem/bmad-orchestrator` | `@osmanekrem/bmad/agents/orchestrator` |
| `@osmanekrem/bmad-templates` | `@osmanekrem/bmad/templates` |
| `@osmanekrem/bmad-cli` | `@osmanekrem/bmad/cli` |

## 🔄 Migration Steps

### 1. Update package.json

```json
{
  "dependencies": {
    "@osmanekrem/bmad/core": "^1.0.0",
    "@osmanekrem/bmad/agents/analyst": "^1.0.0",
    "@osmanekrem/bmad/agents/architect": "^1.0.0",
    "@osmanekrem/bmad/templates": "^1.0.0"
  }
}
```

### 2. Update Import Statements

#### Before:
```javascript
import { AnalystAgent } from '@osmanekrem/bmad-analyst'
import { ArchitectAgent } from '@osmanekrem/bmad-architect'
import { TemplateManager } from '@osmanekrem/bmad-templates'
import { BaseAgentImpl } from '@osmanekrem/bmad-core'
```

#### After:
```javascript
import { AnalystAgent } from '@osmanekrem/bmad/agents/analyst'
import { ArchitectAgent } from '@osmanekrem/bmad/agents/architect'
import { TemplateManager } from '@osmanekrem/bmad/templates'
import { BaseAgentImpl } from '@osmanekrem/bmad/core'
```

### 3. Update CLI Commands

#### Before:
```bash
npm install @osmanekrem/bmad-analyst
npm install @osmanekrem/bmad-architect
```

#### After:
```bash
npm install @osmanekrem/bmad/agents/analyst
npm install @osmanekrem/bmad/agents/architect
```

## 🛠️ Automated Migration

### Using find and replace:

```bash
# Replace all old package names in your project
find . -name "*.js" -o -name "*.ts" -o -name "*.json" | xargs sed -i 's/@osmanekrem\/bmad-core/@osmanekrem\/bmad\/core/g'
find . -name "*.js" -o -name "*.ts" -o -name "*.json" | xargs sed -i 's/@osmanekrem\/bmad-analyst/@osmanekrem\/bmad\/agents\/analyst/g'
find . -name "*.js" -o -name "*.ts" -o -name "*.json" | xargs sed -i 's/@osmanekrem\/bmad-architect/@osmanekrem\/bmad\/agents\/architect/g'
find . -name "*.js" -o -name "*.ts" -o -name "*.json" | xargs sed -i 's/@osmanekrem\/bmad-dev/@osmanekrem\/bmad\/agents\/dev/g'
find . -name "*.js" -o -name "*.ts" -o -name "*.json" | xargs sed -i 's/@osmanekrem\/bmad-pm/@osmanekrem\/bmad\/agents\/pm/g'
find . -name "*.js" -o -name "*.ts" -o -name "*.json" | xargs sed -i 's/@osmanekrem\/bmad-qa/@osmanekrem\/bmad\/agents\/qa/g'
find . -name "*.js" -o -name "*.ts" -o -name "*.json" | xargs sed -i 's/@osmanekrem\/bmad-sm/@osmanekrem\/bmad\/agents\/sm/g'
find . -name "*.js" -o -name "*.ts" -o -name "*.json" | xargs sed -i 's/@osmanekrem\/bmad-ux/@osmanekrem\/bmad\/agents\/ux/g'
find . -name "*.js" -o -name "*.ts" -o -name "*.json" | xargs sed -i 's/@osmanekrem\/bmad-master/@osmanekrem\/bmad\/agents\/master/g'
find . -name "*.js" -o -name "*.ts" -o -name "*.json" | xargs sed -i 's/@osmanekrem\/bmad-orchestrator/@osmanekrem\/bmad\/agents\/orchestrator/g'
find . -name "*.js" -o -name "*.ts" -o -name "*.json" | xargs sed -i 's/@osmanekrem\/bmad-templates/@osmanekrem\/bmad\/templates/g'
find . -name "*.js" -o -name "*.ts" -o -name "*.json" | xargs sed -i 's/@osmanekrem\/bmad-cli/@osmanekrem\/bmad\/cli/g'
```

## ✅ Benefits of New Structure

1. **Better Organization**: Clear separation between core, agents, and utilities
2. **Easier Discovery**: Logical package hierarchy
3. **Consistent Naming**: Follows npm monorepo best practices
4. **Future-Proof**: Easier to add new agent types and features

## 🚨 Breaking Changes

- All import statements need to be updated
- Package.json dependencies need to be updated
- CLI commands need to be updated
- Documentation references need to be updated

## 📞 Support

If you encounter any issues during migration, please:
1. Check this migration guide
2. Review the updated documentation
3. Open an issue on GitHub
4. Contact the development team

---

**Note**: This migration is backward compatible in terms of functionality, but requires code changes due to package name updates.
