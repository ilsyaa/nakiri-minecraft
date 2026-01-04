import { startFollowBehavior } from '#behaviors/follow'
import ai from '#start/ai'
import { BOT_MODE, BOT_STATE } from '#utils/bot_status'
import pathfinder from 'mineflayer-pathfinder'

export default async (bot, ctx) => {
  const msg = ctx.message.toString().trim()

  const pelr = await ai.processPlayerMessage(msg)

  if (pelr.ok) {
    const content = JSON.parse(pelr.content)
    const target = bot.players[content.target] || bot.players[ctx.username]
    switch (content.intent) {
      case 'FOLLOW':
        startFollowBehavior({
          bot,
          target,
          chatMessage: content.reply
        })
        break
      case 'GOTO_PLAYER':
        break
      case 'STOP':
        BOT_STATE.mode = BOT_MODE.IDLE
        BOT_STATE.followTarget = null
        bot.pathfinder.setGoal(null)
        break
      case 'CHAT':
        bot.chat(content.reply)
      default:
        break
    }
  } else {
    console.log(pelr.message)
  }

  if (msg === '!follow') {
    const player = bot.players[ctx.username]

    if (!player || !player.entity) {
      bot.chat(`Maaf ${ctx.username}, aku tidak bisa melihatmu!`)
      return
    }

    startFollowBehavior({
      bot,
      target: player,
    })
  }
}
