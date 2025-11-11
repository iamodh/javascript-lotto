import ERROR_MESSAGES from '../../constants/errorMessages.js';
import LOTTO_CONFIG from '../../constants/lottoConfig.js';

class WinningLotto {
  #numbers;
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    this.#validateNumbersCount(numbers);
    this.#validateNumbersDuplicates(numbers);
    this.#validateBonusNumberDuplicates(numbers, bonusNumber);

    this.#numbers = numbers;
    this.#bonusNumber = bonusNumber;
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

  #validateBonusNumberDuplicates(numbers, bonusNumber) {
    if (numbers.includes(bonusNumber)) {
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER_DUPLICATES);
    }
  }

  calculateRank(lotto) {
    const matchCount = lotto.matchCount(this.#numbers);
    const hasBonus = lotto.contains(this.#bonusNumber);

    return this.#determineRank(matchCount, hasBonus);
  }

  #determineRank(matchCount, hasBonus) {
    if (matchCount === 6) return 'FIRST';
    if (matchCount === 5 && hasBonus) return 'SECOND';
    if (matchCount === 5) return 'THIRD';
    if (matchCount === 4) return 'FOURTH';
    if (matchCount === 3) return 'FIFTH';
    else return 'NONE';
  }
}

export default WinningLotto;
