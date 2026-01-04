import { GoogleGenerativeAI } from '@google/generative-ai'
import BaseProvider from '#utils/ai/index'
import env from '#start/env'
import fs from 'fs'
import path from 'path'

export default class GeminiProvider extends BaseProvider {
  constructor() {
    super('gemini')
    this.apiKey = env.get('GEMINI_API_KEY')
    this.model = env.get('GEMINI_MODEL')
    this.promptProccessMessage = fs.readFileSync(
      path.join(process.cwd(), 'utils/ai/prompts/player_message.txt'),
      'utf-8'
    )
  }

  async processPlayerMessage(message) {
    try {
      const genAI = new GoogleGenerativeAI(this.apiKey)
      const model = genAI.getGenerativeModel({
        model: this.model,
        systemInstruction: this.promptProccessMessage,
      })

      const generationConfig = {
        temperature: 1.0,
        topP: 0.95,
        // maxOutputTokens: 100,
      }

      if (!this.chatSession) {
        this.chatSession = model.startChat({
          generationConfig,
          history: [],
        })
      }

      const result = await this.chatSession.sendMessage(message)
      const responseText = result.response.text()

      return this.formatResponse({
        content: responseText,
        model: this.model,
      })
    } catch (error) {
      return this.formatError(error)
    }
  }
}
