import message from '#events/message/index'
import spawn from '#events/spawn/index'
import physicTick from '#events/physic_tick/index'
import healt from '#events/healt/index'
import chat from '#events/chat/index'
import pathfinder from '#events/pathfinder/index'

export default async (bot) => {
  chat(bot)
  message(bot)
  spawn(bot)
  physicTick(bot)
  healt(bot)
  pathfinder(bot)
}
