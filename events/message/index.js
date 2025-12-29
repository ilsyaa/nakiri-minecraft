import consola from 'consola'
import auth from '#events/message/auth_server'
import { BOT_STATE } from '#utils/bot_status'

import model from '#utils/agent/app'

console.log(model);

export default async (bot) => {
  bot.on('message', (message) => {
    const msg = message.toString()
    if (!msg.includes('°C')) {
      consola.info(`[ SERVER MESSAGE ] ${msg}`)
    }

    // auth
    if (!BOT_STATE.isLoggedIn) {
      auth(bot, msg)
    }

    if (!BOT_STATE.isLoggedIn) {
      return
    }
  })
}
