export default class AI {
  constructor(providerName) {
    this.providerName = providerName
  }

  async generateReaction(staticText) {
    throw new Error('Method generateReaction() harus diimplementasikan')
  }

  async processPlayerMessage(message) {
    throw new Error('Method processPlayerMessage() harus diimplementasikan')
  }

  formatResponse(data) {
    return {
      ok: true,
      content: data.content,
      provider: this.providerName,
      model: data.model,
    }
  }

  formatError(error) {
    return {
      ok: false,
      error: error.message || error,
      provider: this.providerName,
    }
  }
}
