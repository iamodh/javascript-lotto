class LottoResult {
  #purchaseMoney;
  #stats;
  #prizeConfig;

  constructor(purchaseMoney, stats, prizeConfig) {
    this.#purchaseMoney = purchaseMoney;
    this.#stats = stats;
    this.#prizeConfig = prizeConfig;
  }

  calculateProfitRate() {
    const totalPrize = this.#calculateTotalPrize();

    return Math.round((totalPrize / this.#purchaseMoney) * 100 * 10) / 10;
  }

  #calculateTotalPrize() {
    let totalPrize = 0;
    for (const [rank, count] of this.#stats.entries()) {
      totalPrize += (this.#prizeConfig.getPrize(rank) || 0) * count;
    }

    return totalPrize;
  }
}

export default LottoResult;
