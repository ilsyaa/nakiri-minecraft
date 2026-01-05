import { BOT_STATE, BOT_MODE } from '#utils/bot_status'
import pathfinder from 'mineflayer-pathfinder'
import mcDataFactory from 'minecraft-data'
const { GoalNear } = pathfinder.goals

export function startGotoBehavior({
  bot,
  target,
}) {
  const mcData = mcDataFactory(bot.version)

  const movements = new pathfinder.Movements(bot, mcData)
  movements.canDig = false
  movements.allow1by1towers = false
  movements.canOpenDoors = true
  movements.allowFreeMotion = true
  movements.allowParkour = true
  movements.allowSprinting = true
  bot.pathfinder.setMovements(movements)

  BOT_STATE.mode = BOT_MODE.GOTO

  bot.pathfinder.setGoal(new GoalNear(target.x, target.y, target.z, 2), true)
}
