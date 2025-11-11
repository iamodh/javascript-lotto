import PRIZE_CONFIG from '../../constants/prizeConfig.js';

// 로또를 받아 rank를 입력
class LottoResult {
  #result = new Map([
    ['FIRST', 0],
    ['SECOND', 0],
    ['THIRD', 0],
    ['FOURTH', 0],
    ['FIFTH', 0],
  ]);

  calculateStatistics(lottos, winningLotto) {
    for (const lotto of lottos) {
      const rank = winningLotto.calculateRank(lotto);
      this.#addRank(rank);
    }
    return this.#result;
  }

  #addRank(rank) {
    if (rank === 'NONE') {
      return;
    }
    this.#result.set(rank, this.#result.get(rank) + 1);
  }

  calculateProfitRate(purchaseMoney) {
    const totalPrize = this.#calculateTotalPrize();

    return Math.round((totalPrize / purchaseMoney) * 100 * 10) / 10;
  }

  #calculateTotalPrize() {
    let totalPrize = 0;
    for (const [rank, count] of this.#result.entries()) {
      totalPrize += (PRIZE_CONFIG.MONEY[rank] || 0) * count;
    }

    return totalPrize;
  }
}

export default LottoResult;
