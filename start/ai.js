import OpenAIProvider from '#utils/ai/providers/openai'
import GeminiProvider from '#utils/ai/providers/gemini'
import BlackboxProvider from '#utils/ai/providers/blackbox'
import env from '#start/env'

class AIManager {
  constructor() {
    this.providers = {
      openai: new OpenAIProvider(),
      gemini: new GeminiProvider(),
      blackbox: new BlackboxProvider(),
    }

    this.activeProvider = env.get('AI_PROVIDER')
  }

  driver(name = null) {
    const driverName = name || this.activeProvider
    const provider = this.providers[driverName]

    if (!provider) {
      throw new Error(`Provider AI [${driverName}] tidak didukung.`)
    }

    return provider
  }

  async generateReaction(staticText) {
    return this.driver().generateReaction(staticText)
  }

  async processPlayerMessage(message) {
    return this.driver().processPlayerMessage(message)
  }
}

const ai = new AIManager()
export default ai
