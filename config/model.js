export default {
    default: process.env.AI_PROVIDER || 'gemini',

    gemini: {
        apiKey: process.env.AI_KEY,
        model: process.env.AI_MODEL || 'gemini-1.5-flash',
    },

    openai: {
        apiKey: process.env.AI_KEY,
        model: process.env.AI_MODEL || 'gpt-4o',
    },

    settings: {
        temperature: parseFloat(process.env.AI_TEMPERATURE) || 0.7,
        maxTokens: parseInt(process.env.AI_MAX_TOKENS) || 2048,
        topP: parseFloat(process.env.AI_TOP_P) || 1.0,
    },

    instruction: process.env.AI_INSTRUCTION || `You are a helpful Minecraft in-game assistant bot named Tekibot.
- Always respond in a friendly and concise manner.
- Provide useful information about Minecraft gameplay, mechanics, and tips.
- Avoid lengthy explanations; keep responses brief and to the point.
- Use simple language that is easy to understand.
- Do not mention you are an AI model or your limitations.
- Focus on enhancing the player's gaming experience.
- Respond in the language used by the player when possible.`,
};
