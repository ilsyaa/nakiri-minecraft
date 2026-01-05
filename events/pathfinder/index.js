import ai from '#start/ai'
import env from '#start/env'
import { BOT_MODE, BOT_STATE } from '#utils/bot_status'

export default async (bot) => {
  bot.on('goal_reached', async () => {
    if (BOT_STATE.mode === BOT_MODE.GOTO) {
      bot.chat(await ai.generateReaction(`${env.get('BOT_USERNAME')} sampai!`))
      BOT_STATE.mode = BOT_MODE.IDLE
    }
  })

  bot.on('path_update', async (res) => {
    if (res.status === 'noPath') {
      bot.chat(
        await ai.generateReaction(
          `${env.get('BOT_USERNAME')} tidak bisa ke situ!`
        )
      )
      BOT_STATE.mode = BOT_MODE.IDLE
    }
  })
}
