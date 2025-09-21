import { CompiledTemplate, TemplateCache as ITemplateCache } from '../types/index.js'

export class TemplateCache implements ITemplateCache {
  private cache: Map<string, CompiledTemplate> = new Map()
  private maxSize: number
  private ttl: number
  private timestamps: Map<string, number> = new Map()

  constructor(maxSize: number = 100, ttl: number = 300000) { // 5 minutes default TTL
    this.maxSize = maxSize
    this.ttl = ttl
  }

  get(key: string): CompiledTemplate | undefined {
    const template = this.cache.get(key)
    
    if (!template) {
      return undefined
    }

    // Check TTL
    const timestamp = this.timestamps.get(key)
    if (timestamp && Date.now() - timestamp > this.ttl) {
      this.delete(key)
      return undefined
    }

    return template
  }

  set(key: string, template: CompiledTemplate): void {
    // Check if we need to evict
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      this.evictOldest()
    }

    this.cache.set(key, template)
    this.timestamps.set(key, Date.now())
  }

  has(key: string): boolean {
    const template = this.get(key)
    return template !== undefined
  }

  delete(key: string): boolean {
    const deleted = this.cache.delete(key)
    this.timestamps.delete(key)
    return deleted
  }

  clear(): void {
    this.cache.clear()
    this.timestamps.clear()
  }

  size(): number {
    return this.cache.size
  }

  private evictOldest(): void {
    let oldestKey = ''
    let oldestTime = Date.now()

    for (const [key, timestamp] of this.timestamps) {
      if (timestamp < oldestTime) {
        oldestTime = timestamp
        oldestKey = key
      }
    }

    if (oldestKey) {
      this.delete(oldestKey)
    }
  }

  // Additional utility methods
  getStats(): { size: number; maxSize: number; ttl: number; hitRate?: number } {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      ttl: this.ttl
    }
  }

  setMaxSize(maxSize: number): void {
    this.maxSize = maxSize
    
    // Evict if necessary
    while (this.cache.size > this.maxSize) {
      this.evictOldest()
    }
  }

  setTTL(ttl: number): void {
    this.ttl = ttl
  }

  // Clean expired entries
  cleanExpired(): number {
    const now = Date.now()
    let cleaned = 0

    for (const [key, timestamp] of this.timestamps) {
      if (now - timestamp > this.ttl) {
        this.delete(key)
        cleaned++
      }
    }

    return cleaned
  }
}
