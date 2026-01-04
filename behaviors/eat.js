import MCData from 'minecraft-data'
import consola from 'consola'
import { BOT_STATE } from '#utils/bot_status'
import ai from '#start/ai'
const NO_FOOD_CHAT_COOLDOWN = 30_000
let LAST_NO_FOOD_CHAT_AT = 0

export async function autoEat(bot) {
  if (BOT_STATE.isEating) return

  if (bot.food > 17) return

  BOT_STATE.isEating = true

  try {
    const MinecraftData = MCData(bot.version)
    while (bot.food < 20) {
      const foodIds = MinecraftData.foodsArray.map((f) => f.id)
      const foodItem = bot.inventory
        .items()
        .find((item) => foodIds.includes(item.type))

      if (!foodItem) {
        consola.info('[BOT HEALTH] Tidak ada makanan di inventory.')

        const now = Date.now()
        if (now - LAST_NO_FOOD_CHAT_AT >= NO_FOOD_CHAT_COOLDOWN) {
          LAST_NO_FOOD_CHAT_AT = now
          const message = await ai.generateReaction('Tidak ada makanan di inventory')
          bot.chat(message.content)
        }

        break
      }
      await bot.equip(foodItem, 'hand')

      consola.info(
        `[BOT HEALTH] Sedang makan ${foodItem.name}... (Food: ${bot.food}/20)`
      )
      await bot.consume()
      await bot.waitForTicks(10)
    }

    if (bot.food === 20) {
      consola.success('[BOT HEALTH] Sudah kenyang!')
      return
    }
  } catch (e) {
    if (!e.message.includes('cancelled')) {
      consola.error(`[BOT HEALTH] Error: ${e.message}`)
    }
  } finally {
    BOT_STATE.isEating = false
  }
}
