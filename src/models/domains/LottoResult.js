import PRIZE_CONFIG from '../../constants/prizeConfig.js';

class LottoResult {
  #purchaseMoney;
  #stats;

  constructor(purchaseMoney, stats) {
    this.#purchaseMoney = purchaseMoney;
    this.#stats = stats;
  }

  calculateProfitRate() {
    const totalPrize = this.#calculateTotalPrize();

    return Math.round((totalPrize / this.#purchaseMoney) * 100 * 10) / 10;
  }

  #calculateTotalPrize() {
    let totalPrize = 0;
    for (const [rank, count] of this.#stats.entries()) {
      totalPrize += (PRIZE_CONFIG.MONEY[rank] || 0) * count;
    }

    return totalPrize;
  }
}

export default LottoResult;
