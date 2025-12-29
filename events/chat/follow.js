import { startFollowBehavior } from '#behaviors/follow'

export default async (bot, ctx) => {
  const msg = ctx.message.toString().trim()

  if (msg === '!follow') {
    const player = bot.players[ctx.username]

    if (!player || !player.entity) {
      bot.chat(`Maaf ${ctx.username}, aku tidak bisa melihatmu!`)
      return
    }

    startFollowBehavior(bot, player)
  }
}
