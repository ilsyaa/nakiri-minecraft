import BaseProvider from '#utils/ai/index'
import env from '#start/env'
import fs from 'fs'
import path from 'path'
import consola from 'consola'

export default class BlackboxProvider extends BaseProvider {
  constructor() {
    super('blackbox')
    this.apiKey = env.get('BLACKBOX_API_KEY')
    this.model = env.get('BLACKBOX_MODEL')
    this.url = 'https://api.blackbox.ai/chat/completions'
    this.promptProccessMessage = fs.readFileSync(
      path.join(process.cwd(), 'utils/ai/prompts/player_message.txt'),
      'utf-8'
    )
    this.memory = new Set()
    this.maxHistory = 100
  }

  async generateReaction(staticText) {
    try {
      const instruction = `Ubah teks berikut menjadi gaya bicara Nakiri (cewek gamer, santai, ceria, lowercase, banyak singkatan). JANGAN gunakan format JSON, balas dengan teks saja. Teks: "${staticText}"`

      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages: [{ role: 'user', content: instruction }],
          temperature: 1.2,
        }),
      })

      const data = await response.json()
      const aiReply = data.choices[0].message.content.toLowerCase()

      if (this.memory.size >= this.maxHistory) {
        this.memory.delete(this.memory.keys().next().value)
      }

      this.memory.add(`(BOT Reaction): ${aiReply}`)

      return this.formatResponse({
        ok: true,
        content: aiReply,
        provider: this.providerName,
        model: this.model,
      })
    } catch (error) {
      return this.formatError(error)
    }
  }

  async processPlayerMessage(message) {
    try {
      if (this.memory.size >= this.maxHistory) {
        this.memory.delete(this.memory.keys().next().value)
      }
      this.memory.add(message)

      const messages = [
        {
          role: 'user',
          content: this.promptProccessMessage,
        },
        ...Array.from(this.memory).map((message) => ({
          role: 'user',
          content: message,
        })),
        {
          role: 'user',
          content: message,
        },
      ]

      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages,
          temperature: 1.0,
          topP: 0.95,
          stream: false,
        }),
      })

      const responseText = await response.json()

      return this.formatResponse({
        content: responseText.choices[0].message.content,
        model: this.model,
      })
    } catch (error) {
      this.memory.delete(message)
      return this.formatError(error)
    }
  }
}
