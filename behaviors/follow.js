import consola from 'consola'
import { BOT_STATE, BOT_MODE } from '#utils/bot_status'
import pathfinder from 'mineflayer-pathfinder'
import mcDataFactory from 'minecraft-data'

export function startFollowBehavior(bot, target) {
  const mcData = mcDataFactory(bot.version)

  const movements = new pathfinder.Movements(bot, mcData)
  movements.canDig = false
  movements.allow1by1towers = false
  movements.canOpenDoors = true
  movements.allowFreeMotion = true
  movements.allowParkour = true
  bot.pathfinder.setMovements(movements)

  BOT_STATE.followTarget = target.entity
  BOT_STATE.mode = BOT_MODE.FOLLOW

  const { GoalFollow } = pathfinder.goals
  bot.pathfinder.setGoal(new GoalFollow(BOT_STATE.followTarget, 2), true)

  bot.chat(`Siap, aku ikuti kamu!`)
}
