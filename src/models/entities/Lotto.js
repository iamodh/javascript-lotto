import LOTTO_CONFIG from '../../constants/lottoConfig.js';
import ERROR_MESSAGES from '../../constants/errorMessages.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validateNumbersCount(numbers);
    this.#validateNumbersDuplicates(numbers);
    this.#numbers = numbers;
  }

  #validateNumbersCount(numbers) {
    if (numbers.length !== LOTTO_CONFIG.NUMBERS_COUNT) {
      throw new Error(ERROR_MESSAGES.NUMBERS_INVALID_COUNT);
    }
  }

  #validateNumbersDuplicates(numbers) {
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) {
      throw new Error(ERROR_MESSAGES.NUMBERS_DUPLICATES);
    }
  }

  calculateRank(winningLotto) {
    const matchCount = winningLotto.calculateMatchCount(this.#numbers);
    const hasBonus = winningLotto.calculateBonusMatch(this.#numbers);

    return this.#determineRank(matchCount, hasBonus);
  }

  #determineRank(matchCount, hasBonus) {
    if (matchCount === 6) return 1;
    if (matchCount === 5 && hasBonus) return 2;
    if (matchCount === 5) return 3;
    if (matchCount === 4) return 4;
    if (matchCount === 3) return 3;
    return null;
  }
}

export default Lotto;
