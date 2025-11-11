import ERROR_MESSAGES from '../../constants/errorMessages.js';
import LOTTO_CONFIG from '../../constants/lottoConfig.js';

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

  contains(number) {
    return this.#numbers.includes(number);
  }

  matchCount(other) {
    const totalCounts = this.#numbers.length + other.length;

    const unionCounts = new Set([...this.#numbers, ...other]).size;

    return totalCounts - unionCounts;
  }

  getSortedNumbers() {
    return this.#numbers.sort((a, b) => a - b);
  }
}

export default Lotto;
