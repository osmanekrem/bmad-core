# 🚀 BMad NPM Publishing Guide

## 📋 Ön Gereksinimler

### 1. **NPM Hesabı**
```bash
# NPM'e kaydol
npm adduser

# Veya mevcut hesabınızla giriş yapın
npm login
```

### 2. **NPM Token (Opsiyonel)**
```bash
# NPM token oluştur: https://www.npmjs.com/settings/tokens
export NPM_TOKEN=your_npm_token_here
```

### 3. **@osmanekrem Scope Kontrolü**
```bash
# Scope'un mevcut olup olmadığını kontrol et
npm access list packages @osmanekrem
```

## 🛠️ Kurulum

### 1. **NPM Setup**
```bash
# Otomatik setup
npm run setup:npm

# Manuel setup
npm login
npm whoami  # Giriş yaptığınızı doğrulayın
```

### 2. **Paketleri Build Et**
```bash
# Tüm paketleri build et
npm run build:all

# Veya tek tek
npm run build --workspaces
```

### 3. **Test Et**
```bash
# Tüm testleri çalıştır
npm run test:all

# Integration testleri
npm run test:integration
```

## 📦 Publishing Yöntemleri

### **Yöntem 1: Otomatik Publishing (Önerilen)**
```bash
# Tüm paketleri otomatik olarak yayınla
npm run publish:all
```

### **Yöntem 2: Manuel Publishing**
```bash
# Core paketleri önce yayınla
npm run publish:core
npm run publish:templates

# Agent paketlerini yayınla
npm run publish:analyst
npm run publish:architect
npm run publish:dev
npm run publish:pm
npm run publish:qa
npm run publish:sm
npm run publish:ux
npm run publish:master
npm run publish:orchestrator

# CLI'yi son yayınla
npm run publish:cli
```

### **Yöntem 3: Tek Paket Publishing**
```bash
# Belirli bir paketi yayınla
npm publish packages/core --access public
npm publish packages/analyst --access public
```

## 🔧 Publishing Script Detayları

### **Publishing Sırası**
1. **Core** - Temel altyapı
2. **Templates** - Template sistemi
3. **Analyst** - Analiz agent'ı
4. **Architect** - Mimari agent'ı
5. **Dev** - Geliştirici agent'ı
6. **PM** - Proje yöneticisi agent'ı
7. **QA** - Kalite güvence agent'ı
8. **SM** - Scrum master agent'ı
9. **UX** - UX uzmanı agent'ı
10. **Master** - Master agent
11. **Orchestrator** - Orchestrator agent
12. **CLI** - Komut satırı aracı

### **Script Özellikleri**
- ✅ Dependency sırasına göre otomatik publishing
- ✅ Mevcut versiyonları kontrol eder
- ✅ Build hatalarını yakalar
- ✅ Detaylı log çıktısı
- ✅ Publishing özeti

## 📝 Version Management

### **Version Bump**
```bash
# Patch version (1.0.0 -> 1.0.1)
npm version patch --workspaces

# Minor version (1.0.0 -> 1.1.0)
npm version minor --workspaces

# Major version (1.0.0 -> 2.0.0)
npm version major --workspaces
```

### **Tek Paket Version Bump**
```bash
# Belirli bir paketin versiyonunu artır
cd packages/core
npm version patch
cd ../..
```

## 🔍 Publishing Kontrolü

### **Yayınlanan Paketleri Kontrol Et**
```bash
# Tüm @osmanekrem paketlerini listele
npm search @osmanekrem

# Belirli bir paketi kontrol et
npm view @osmanekrem/bmad/core
npm view @osmanekrem/bmad/agents/analyst
```

### **Paket İçeriğini Kontrol Et**
```bash
# Paket içeriğini görüntüle
npm pack @osmanekrem/bmad/core
tar -tzf osmanekrem-bmad-core-1.0.0.tgz
```

## 🚨 Troubleshooting

### **Yaygın Hatalar**

#### 1. **Authentication Hatası**
```bash
# Çözüm
npm login
npm whoami  # Kontrol et
```

#### 2. **Scope Hatası**
```bash
# Çözüm
npm access public @osmanekrem/bmad/core
```

#### 3. **Version Hatası**
```bash
# Çözüm - Version'ı artır
npm version patch --workspaces
```

#### 4. **Build Hatası**
```bash
# Çözüm - Temiz build
npm run clean
npm run build:all
```

### **Log Kontrolü**
```bash
# Detaylı log için
npm run publish:all --verbose

# Veya
DEBUG=* npm run publish:all
```

## 📊 Publishing Sonrası

### **Paket Linkleri**
- **NPM Org**: https://www.npmjs.com/org/osmanekrem
- **GitHub**: https://github.com/osmanekrem/bmad-core

### **Installation Komutları**
```bash
# Core paket
npm install @osmanekrem/bmad/core

# Agent paketleri
npm install @osmanekrem/bmad/agents/analyst
npm install @osmanekrem/bmad/agents/architect

# Templates
npm install @osmanekrem/bmad/templates

# CLI
npm install @osmanekrem/bmad/cli
```

### **Kullanım Örnekleri**
```javascript
// Core kullanımı
import { BaseAgentImpl } from '@osmanekrem/bmad/core'

// Agent kullanımı
import { AnalystAgent } from '@osmanekrem/bmad/agents/analyst'

// Template kullanımı
import { TemplateManager } from '@osmanekrem/bmad/templates'
```

## 🔄 Güncelleme Süreci

### **1. Kod Değişiklikleri**
```bash
# Değişiklikleri yap
git add .
git commit -m "feat: new feature"
```

### **2. Version Artırma**
```bash
# Version'ı artır
npm version patch --workspaces
```

### **3. Publishing**
```bash
# Yayınla
npm run publish:all
```

### **4. Git Tag**
```bash
# Git tag oluştur
git push origin main --tags
```

## 📈 Monitoring

### **Download İstatistikleri**
```bash
# Paket indirme istatistikleri
npm view @osmanekrem/bmad/core downloads
```

### **NPM Analytics**
- NPM dashboard'da paket performansını takip edin
- Download trendlerini analiz edin
- Kullanıcı geri bildirimlerini değerlendirin

## 🎯 Best Practices

1. **Sempre test edin** publishing öncesi
2. **Version'ları tutarlı tutun** tüm paketlerde
3. **Changelog tutun** her değişiklik için
4. **Breaking changes** için major version artırın
5. **Documentation güncelleyin** her yeni özellik için

---

**Not**: Bu rehber BMad paketlerinin NPM'de yayınlanması için hazırlanmıştır. Herhangi bir sorun yaşarsanız, GitHub issues'da bildirin.
