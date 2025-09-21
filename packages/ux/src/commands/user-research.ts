import { UXAgent } from '../ux-agent.js'
import { UXContext, UserResearch } from '../types/index.js'

export class UserResearchCommand {
  private agent: UXAgent

  constructor(agent: UXAgent) {
    this.agent = agent
  }

  async execute(context: UXContext): Promise<UserResearch> {
    const prompt = this.buildPrompt(context)
    const response = await this.agent.execute('conduct-user-research', { userInput: context.userInput || '' })
    
    return this.parseResponse(response.content, context)
  }

  private buildPrompt(context: UXContext): string {
    const { userInput, options } = context
    
    return `Conduct user research for: ${userInput || 'the specified product/service'}

## User Research Requirements:
- Target Audience: ${context.targetAudience || 'general'}
- Platform: ${context.platform || 'web'}
- Device Type: ${context.deviceType || 'desktop'}
- Research Methods: ${options?.researchMethods || 'user-interviews, surveys, usability-testing'}
- Research Objectives: ${options?.objectives || 'To understand user needs and behaviors'}

## User Research Framework:
1. **Research Planning**: Define research objectives and methodology
2. **Participant Recruitment**: Identify and recruit target participants
3. **Data Collection**: Conduct interviews, surveys, and usability testing
4. **Data Analysis**: Analyze research data and identify patterns
5. **Insights Generation**: Generate actionable insights and recommendations
6. **Report Creation**: Create comprehensive research reports

## Research Methods:
- **User Interviews**: One-on-one interviews with target users
- **Surveys**: Quantitative research through online surveys
- **Usability Testing**: Observe users interacting with designs
- **Focus Groups**: Group discussions with target users
- **Field Studies**: Observe users in their natural environment
- **Analytics Analysis**: Analyze user behavior data
- **Competitive Analysis**: Study competitor designs and strategies

## Output Format:
- Use structured markdown with clear headings
- Include research objectives and methodology
- Provide participant profiles and recruitment criteria
- Include research questions and data collection methods
- Document findings and insights
- Provide actionable recommendations and next steps

Ensure the research is comprehensive, actionable, and provides valuable insights for design decisions.`
  }

  private parseResponse(response: string, context: UXContext): UserResearch {
    const lines = response.split('\n')
    
    const title = this.extractValue(lines, 'Title') || 'User Research Study'
    const description = this.extractValue(lines, 'Description') || response.substring(0, 200) + '...'
    const researchType = this.extractValue(lines, 'Research Type') as any || 'user-interviews'
    const objectives = this.extractList(lines, 'Objectives')
    const methodology = this.extractList(lines, 'Methodology')
    
    const participants = this.extractParticipants(lines)
    const questions = this.extractQuestions(lines)
    const findings = this.extractFindings(lines)
    const insights = this.extractList(lines, 'Insights')
    const recommendations = this.extractList(lines, 'Recommendations')
    const nextSteps = this.extractList(lines, 'Next Steps')

    return {
      title,
      description,
      researchType,
      objectives,
      methodology,
      participants,
      questions,
      findings,
      insights,
      recommendations,
      nextSteps,
      metadata: {
        researchType: 'User Research Study',
        timestamp: new Date().toISOString(),
        duration: 0,
        effectiveness: 0
      }
    }
  }

  private extractParticipants(lines: string[]): any[] {
    const participants: any[] = []
    let currentParticipant: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Participant')) {
        if (currentParticipant) {
          participants.push(currentParticipant)
        }
        currentParticipant = {
          id: `P_${participants.length + 1}`,
          demographics: {
            age: '',
            gender: '',
            location: '',
            occupation: '',
            education: '',
            income: '',
            technologyExperience: '',
            productExperience: ''
          },
          characteristics: [],
          recruitmentCriteria: [],
          contactInfo: '',
          consentStatus: 'pending',
          participationStatus: 'recruited',
          notes: []
        }
      } else if (currentParticipant) {
        if (line.includes('Age:')) {
          currentParticipant.demographics.age = line.split('Age:')[1]?.trim() || ''
        } else if (line.includes('Gender:')) {
          currentParticipant.demographics.gender = line.split('Gender:')[1]?.trim() || ''
        } else if (line.includes('Location:')) {
          currentParticipant.demographics.location = line.split('Location:')[1]?.trim() || ''
        } else if (line.includes('Occupation:')) {
          currentParticipant.demographics.occupation = line.split('Occupation:')[1]?.trim() || ''
        } else if (line.includes('Education:')) {
          currentParticipant.demographics.education = line.split('Education:')[1]?.trim() || ''
        } else if (line.includes('Income:')) {
          currentParticipant.demographics.income = line.split('Income:')[1]?.trim() || ''
        } else if (line.includes('Technology Experience:')) {
          currentParticipant.demographics.technologyExperience = line.split('Technology Experience:')[1]?.trim() || ''
        } else if (line.includes('Product Experience:')) {
          currentParticipant.demographics.productExperience = line.split('Product Experience:')[1]?.trim() || ''
        } else if (line.includes('Characteristics:')) {
          currentParticipant.characteristics = this.extractListFromLine(line)
        } else if (line.includes('Recruitment Criteria:')) {
          currentParticipant.recruitmentCriteria = this.extractListFromLine(line)
        } else if (line.includes('Contact Info:')) {
          currentParticipant.contactInfo = line.split('Contact Info:')[1]?.trim() || ''
        } else if (line.includes('Consent Status:')) {
          currentParticipant.consentStatus = line.split('Consent Status:')[1]?.trim() || 'pending'
        } else if (line.includes('Participation Status:')) {
          currentParticipant.participationStatus = line.split('Participation Status:')[1]?.trim() || 'recruited'
        } else if (line.includes('Notes:')) {
          currentParticipant.notes = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentParticipant) {
      participants.push(currentParticipant)
    }
    
    return participants
  }

  private extractQuestions(lines: string[]): any[] {
    const questions: any[] = []
    let currentQuestion: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Question')) {
        if (currentQuestion) {
          questions.push(currentQuestion)
        }
        currentQuestion = {
          id: `Q_${questions.length + 1}`,
          question: line.replace(/^###\s*/, '').replace(/\s*Question.*$/, ''),
          type: 'open-ended',
          category: 'usability',
          options: [],
          scale: undefined,
          followUp: []
        }
      } else if (currentQuestion) {
        if (line.includes('Type:')) {
          currentQuestion.type = line.split('Type:')[1]?.trim() || 'open-ended'
        } else if (line.includes('Category:')) {
          currentQuestion.category = line.split('Category:')[1]?.trim() || 'usability'
        } else if (line.includes('Options:')) {
          currentQuestion.options = this.extractListFromLine(line)
        } else if (line.includes('Scale:')) {
          const scaleData = line.split('Scale:')[1]?.trim() || ''
          if (scaleData) {
            const parts = scaleData.split(',')
            currentQuestion.scale = {
              min: parseInt(parts[0]?.trim() || '1'),
              max: parseInt(parts[1]?.trim() || '5'),
              labels: parts.slice(2).map(label => label.trim())
            }
          }
        } else if (line.includes('Follow-up:')) {
          currentQuestion.followUp = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentQuestion) {
      questions.push(currentQuestion)
    }
    
    return questions
  }

  private extractFindings(lines: string[]): any[] {
    const findings: any[] = []
    let currentFinding: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Finding')) {
        if (currentFinding) {
          findings.push(currentFinding)
        }
        currentFinding = {
          id: `F_${findings.length + 1}`,
          category: 'usability',
          finding: line.replace(/^###\s*/, '').replace(/\s*Finding.*$/, ''),
          evidence: [],
          severity: 'medium',
          frequency: 0,
          impact: 'medium',
          participants: [],
          quotes: [],
          tags: []
        }
      } else if (currentFinding) {
        if (line.includes('Category:')) {
          currentFinding.category = line.split('Category:')[1]?.trim() || 'usability'
        } else if (line.includes('Finding:')) {
          currentFinding.finding = line.split('Finding:')[1]?.trim() || ''
        } else if (line.includes('Evidence:')) {
          currentFinding.evidence = this.extractListFromLine(line)
        } else if (line.includes('Severity:')) {
          currentFinding.severity = line.split('Severity:')[1]?.trim() || 'medium'
        } else if (line.includes('Frequency:')) {
          currentFinding.frequency = parseInt(line.split('Frequency:')[1]?.trim() || '0')
        } else if (line.includes('Impact:')) {
          currentFinding.impact = line.split('Impact:')[1]?.trim() || 'medium'
        } else if (line.includes('Participants:')) {
          currentFinding.participants = this.extractListFromLine(line)
        } else if (line.includes('Quotes:')) {
          currentFinding.quotes = this.extractListFromLine(line)
        } else if (line.includes('Tags:')) {
          currentFinding.tags = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentFinding) {
      findings.push(currentFinding)
    }
    
    return findings
  }

  private extractValue(lines: string[], key: string): string | null {
    const line = lines.find(l => l.includes(key))
    if (!line) return null
    
    const match = line.match(new RegExp(`${key}[:\-]\\s*(.+)`, 'i'))
    return match ? match[1].trim() : null
  }

  private extractList(lines: string[], section: string): string[] {
    const startIndex = lines.findIndex(l => l.includes(section))
    if (startIndex === -1) return []
    
    const items: string[] = []
    for (let i = startIndex + 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line.startsWith('-') || line.startsWith('•') || line.startsWith('*')) {
        items.push(line.replace(/^[-•*]\s*/, ''))
      } else if (line === '' || line.startsWith('#')) {
        break
      }
    }
    
    return items
  }

  private extractListFromLine(line: string): string[] {
    const content = line.split(':')[1]?.trim() || ''
    return content.split(',').map(item => item.trim()).filter(item => item.length > 0)
  }
}
