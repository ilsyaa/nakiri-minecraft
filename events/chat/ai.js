import { startFollowBehavior } from '#behaviors/follow'
import ai from '#start/ai'
import { BOT_MODE, BOT_STATE } from '#utils/bot_status'
import consola from 'consola'
import pathfinder from 'mineflayer-pathfinder'
const { GoalNear } = pathfinder.goals

export default async (bot, ctx) => {
  const msg = ctx.message.toString().trim()

  if (!msg.includes('nakiri')) return

  const pelr = await ai.processPlayerMessage(msg)

  if (!pelr || !pelr.ok) {
    if (pelr) consola.warn("AI Response Not OK:", pelr.message)
    return
  }

  let content = null
  try {
    const jsonMatch = pelr.content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      content = JSON.parse(jsonMatch[0])
    }
  } catch (e) {
    consola.error("Gagal parse JSON dari AI:", e.message)
  }

  if (!content) return

  const targetName = content.target || ctx.username
  const target = bot.players[targetName]

  if (!target) {
    consola.warn(`Player ${targetName} tidak ditemukan.`)
    return
  }

  switch (content.intent) {
    case 'FOLLOW':
      if (!target.entity) return bot.chat(`Aku gak liat ${targetName}, sini deketan!`)

      startFollowBehavior({
        bot,
        target,
        chatMessage: content.reply,
      })
      break

    case 'GOTO_PLAYER':
      if (!target.entity) return bot.chat(`${targetName} dimana?, aku gak liat!`)

      BOT_STATE.mode = BOT_MODE.GOTO_PLAYER
      bot.pathfinder.setGoal(new GoalNear(target.entity.position.x, target.entity.position.y, target.entity.position.z, 1))
      if (content.reply) bot.chat(content.reply)
      break

    case 'STOP':
      BOT_STATE.mode = BOT_MODE.IDLE
      BOT_STATE.followTarget = null
      bot.pathfinder.setGoal(null)
      if (content.reply) bot.chat(content.reply)
      break

    case 'CHAT':
      if (content.reply) bot.chat(content.reply)
      break

    default:
      consola.info("Intent tidak dikenali:", content.intent)
      break
  }
}
