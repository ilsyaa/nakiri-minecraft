import OpenAI from 'openai'
import BaseProvider from '#utils/ai/index'
import env from '#start/env'
import fs from 'fs'
import path from 'path'

export default class OpenAIProvider extends BaseProvider {
  constructor() {
    super('openai')
    this.apiKey = env.get('OPENAI_API_KEY')
    this.model = env.get('OPENAI_MODEL')
    this.promptProccessMessage = fs.readFileSync(path.join(process.cwd(), 'utils/ai/prompts/player_message.txt'), 'utf-8')
  }

  async processPlayerMessage(message) {
    try {
      const client = new OpenAI({ apiKey: this.apiKey })
      const completion = await client.chat.completions.create({
        model: this.model,
        messages: [{ role: 'user', parts: [{ text: this.promptProccessMessage }] }],
        ...options,
      })

      return this.formatResponse({
        content: completion.choices[0].message.content,
        model: completion.model,
      })
    } catch (error) {
      return this.formatError(error)
    }
  }
}
