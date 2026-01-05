import { Env } from '#utils/env'

export default await Env.create({
  SERVER_HOST: Env.schema.string(),
  SERVER_PORT: Env.schema.number(),

  BOT_USERNAME: Env.schema.string({ default: 'Nakiri' }),

  AI_PROVIDER: Env.schema.string({ default: 'gemini' }),

  OPENAI_API_KEY: Env.schema.string({ optional: true }),
  OPENAI_MODEL: Env.schema.string({ optional: true, default: 'gpt-4o' }),

  GEMINI_API_KEY: Env.schema.string({ optional: true }),
  GEMINI_MODEL: Env.schema.string({ optional: true, default: 'gemini-3-flash-preview' }),

  BLACKBOX_API_KEY: Env.schema.string({ optional: true }),
  BLACKBOX_MODEL: Env.schema.string({ optional: true, default: 'blackboxai/x-ai/grok-code-fast-1:free' }),

  OPENROUTER_API_KEY: Env.schema.string({ optional: true }),
  OPENROUTER_MODEL: Env.schema.string({ optional: true }),
})
