export const BOT_MODE = {
  IDLE: 'idle',
  FOLLOW: 'follow',
  GOTO_PLAYER: 'goto_player'
}

export const BOT_STATE = {
  isLoggedIn: false,
  mode: BOT_MODE.IDLE,
  spawnPoint: null,
  followTarget: null,
  isEating: false,
}
