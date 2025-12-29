import consola from 'consola'
import { BOT_STATE } from '#utils/bot_status'

const AUTH_PASSWORD = 'test123'

export default async (bot, message) => {
  const msg = message.toString()

  if (msg.includes('/register')) {
    bot.chat(`/register ${AUTH_PASSWORD}`)
  }

  if (msg.includes('/login')) {
    bot.chat(`/login ${AUTH_PASSWORD}`)
  }

  if (msg.includes('Login suskes.')) {
    BOT_STATE.isLoggedIn = true
    consola.success('[ AUTH SERVER ] Bot berhasil login.')
  }
}
