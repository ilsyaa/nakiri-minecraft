import { BOT_STATE } from '#utils/bot_status'
import ai from '#events/chat/ai'

export default async (bot) => {
  bot.on('chat', async (username, message) => {
    if (username === bot.username) return

    if (!BOT_STATE.isLoggedIn) {
      return
    }

    ai(bot, { username, message })
  })
}
