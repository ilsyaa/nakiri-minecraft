export const BOT_MODE = {
  IDLE: 'idle',
  FOLLOW: 'follow',
  GOTO: 'goto',
}

export const BOT_STATE = {
  isLoggedIn: false,
  mode: BOT_MODE.IDLE,
  spawnPoint: null,
  followTargetEntity: null,
  isEating: false,
}
