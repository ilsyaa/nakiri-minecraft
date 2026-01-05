import { startFollowBehavior } from '#behaviors/follow'
import { startGotoBehavior } from '#behaviors/goto'
import ai from '#start/ai'
import { BOT_MODE, BOT_STATE } from '#utils/bot_status'
import consola from 'consola'
import pathfinder from 'mineflayer-pathfinder'

export default async (bot, ctx) => {
  const msg = ctx.message.toString().trim()

  if (!msg.includes('nakiri')) return

  const pelr = await ai.processPlayerMessage(
    `${getBotStatus(bot)}\n\n${ctx.username}: ${msg}`
  )

  if (!pelr || !pelr.ok) {
    if (pelr) consola.warn('AI Response Not OK:', pelr.message)
    return
  }

  let content = null
  try {
    const jsonMatch = pelr.content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      content = JSON.parse(jsonMatch[0])
    }
  } catch (e) {
    consola.error('Gagal parse JSON dari AI:', e.message)
  }

  if (!content) return

  const targetName = content.target || ctx.username
  const target = Object.values(bot.players).find(
    (player) => player.username.toLowerCase() === targetName.toLowerCase()
  )

  if (!target) {
    consola.warn(`Player ${targetName} tidak ditemukan.`)
    return
  }

  switch (content.intent) {
    case 'FOLLOW':
      if (!target.entity)
        return bot.chat(
          await ai.generateReaction(`Aku gak liat ${targetName}, sini deketan!`)
        )

      startFollowBehavior({
        bot,
        target,
      })
      bot.chat(content.reply)
      break

    case 'GOTO_PLAYER':
      if (!target.entity) {
        return bot.chat(
          await ai.generateReaction(`${targetName} dimana?, aku gak liat!`)
        )
      }

      startGotoBehavior({
        bot,
        target: target.entity,
      })
      bot.chat(content.reply)
      break

    case 'STOP':
      BOT_STATE.mode = BOT_MODE.IDLE
      bot.pathfinder.setGoal(null)
      bot.chat(content.reply)
      break

    case 'CHAT':
      bot.chat(content.reply)
      break

    default:
      consola.info('Intent tidak dikenali:', content.intent)
      break
  }
}

const getBotStatus = (bot) => {
  const pos = bot.entity.position
  const health = Math.round(bot.health)
  const food = Math.round(bot.food)
  const biome = bot.blockAt(pos)?.biome.name || 'unknown'
  const dimension = bot.game.dimension

  return `[STATUS BOT]
- Lokasi: x: ${Math.round(pos.x)}, y: ${Math.round(pos.y)}, z: ${Math.round(
    pos.z
  )}
- Dimensi: ${dimension}
- Darah: ${health}/20
- Lapar: ${food}/20
- Biome: ${biome}
- Mode Saat Ini: ${BOT_STATE.mode}
- Sedang Mengikuti: ${BOT_STATE.followTargetEntity?.username || 'tidak ada'}
`.trim()
}
