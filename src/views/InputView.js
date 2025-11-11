import { Console } from '@woowacourse/mission-utils';
import ERROR_MESSAGES from '../constants/errorMessages.js';
import LottoMachine from '../models/services/LottoMachine.js';
import Lotto from '../models/entities/Lotto.js';
import LOTTO_CONFIG from '../constants/lottoConfig.js';

class InputView {
  async getPurchasePrice() {
    const input = await Console.readLineAsync('구입금액을 입력해 주세요.\n');

    const purchasePrice = Number(input.trim());
    this.#validateNumberPositive(purchasePrice);
    this.#valiadtePurchasePrice(purchasePrice);

    return purchasePrice;
  }

  async getWinningNumbers() {
    const input = await Console.readLineAsync('당첨 번호를 입력해 주세요.\n');

    const numbers = input.split(',').map((number) => Number(number.trim()));

    numbers.forEach((number) => this.#validateNumberInRange(number));

    return numbers;
  }

  async getBonusNumber() {
    const input = await Console.readLineAsync('보너스 번호를 입력해 주세요.\n');

    const number = Number(input.trim());

    this.#validateNumberInRange(number);

    return number;
  }

  #validateNumberPositive(number) {
    if (Number.isNaN(number) || !Number.isInteger(number) || number === 0) {
      throw new Error(ERROR_MESSAGES.NUMBER_NOT_POSITIVE);
    }
  }

  #validateNumberInRange(number) {
    this.#validateNumberPositive(number);

    if (
      number < LOTTO_CONFIG.NUMBER_RANGE_FROM ||
      number > LOTTO_CONFIG.NUMBER_RANGE_TO
    ) {
      throw new Error(ERROR_MESSAGES.NUMBER_NOT_IN_RANGE);
    }
  }

  #valiadtePurchasePrice(purchasePrice) {
    if (purchasePrice % LOTTO_CONFIG.PRICE !== 0) {
      throw new Error(ERROR_MESSAGES.INVALID_PRICE);
    }
  }
}

export default InputView;
