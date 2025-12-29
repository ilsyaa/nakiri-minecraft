import { BOT_STATE } from '#utils/bot_status'
import follow from '#events/chat/follow'

export default async (bot) => {
  bot.on('chat', async (username, message) => {
    if (username === bot.username) return

    if (!BOT_STATE.isLoggedIn) {
      return
    }

    follow(bot, { username, message })
  })
}
