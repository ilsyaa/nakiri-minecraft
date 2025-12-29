import config from '#config';

export default async (bot) => {
  const agentConfig = config.agent;
  consola.info(`[ AGENT ] Using AI Provider: ${agentConfig.default}`);

  // Here you can initialize your AI agent with the selected provider and model
  // For example:
  // const aiAgent = new AIAgent(agentConfig[agentConfig.default]);

  // You can then use aiAgent to process messages or perform tasks
}
