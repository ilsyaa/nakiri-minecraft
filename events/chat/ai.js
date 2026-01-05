import { startFollowBehavior } from '#behaviors/follow'
import { startGotoBehavior } from '#behaviors/goto'
import ai from '#start/ai'
import { BOT_MODE, BOT_STATE } from '#utils/bot_status'
import consola from 'consola'
import pathfinder from 'mineflayer-pathfinder'

export default async (bot, ctx) => {
  const msg = ctx.message.toString().trim()

  if (!msg.includes(env.get('BOT_USERNAME').toLowerCase())) return

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

  console.log(content)

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

    case 'GOTO':
      if (!target.entity) {
        return bot.chat(
          await ai.generateReaction(`${targetName} dimana?, aku gak liat!`)
        )
      }

      startGotoBehavior({
        bot,
        target: target,
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
  const modeName =
    Object.keys(BOT_MODE).find((key) => BOT_MODE[key] === BOT_STATE.mode) ||
    'UNKNOWN'
  let aktivitas = modeName.toLowerCase().replace(/_/g, ' ')

  const pos = bot.entity.position
  const health = Math.round(bot.health)
  const food = Math.round(bot.food)
  const biome = bot.blockAt(pos)?.biome.name || 'unknown'

  const inv =
    bot.inventory
      .items()
      .map((i) => `${i.displayName} x${i.count}`)
      .join(', ') || 'kosong'

  return `[STATUS BOT]
- Lokasi: ${Math.round(pos.x)}, ${Math.round(pos.y)}, ${Math.round(pos.z)} (${
    bot.game.dimension
  })
- Tempat: Biome ${biome}s
- Fisik: HP ${health}/20, Lapar ${food}/20
- Aktivitas: ${aktivitas}
- Isi Tas / Inventori: ${inv}
`.trim()
}
