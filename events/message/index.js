import consola from 'consola'
import { BOT_STATE } from '#utils/bot_status'
import auth from '#events/message/auth_server'

export default async (bot) => {
  bot.on('message', (message) => {
    const msg = message.toString()
    if (!msg.includes('°C')) {
      consola.info(`[ SERVER MESSAGE ] ${msg}`)
    }

    // auth
    if (!BOT_STATE.isLoggedIn) {
      auth(bot, message)
    }

    if (!BOT_STATE.isLoggedIn) {
      return
    }
  })
}
