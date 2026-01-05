import { lookAtNearestPlayer } from '#behaviors/look_at'
import { mimicTwerk } from '#behaviors/twerk'
import { wander } from '#behaviors/wander'
import { BOT_MODE, BOT_STATE } from '#utils/bot_status'

export default async (bot) => {
  bot.on('physicTick', () => {
    if (!BOT_STATE.isLoggedIn) return

    lookAtNearestPlayer(bot)
    mimicTwerk(bot)
    // wander(bot)
  })
}
