import { Console } from '@woowacourse/mission-utils';
import MENU_OPTIONS from '../constants/menuOptions.js';
import { ERROR_MESSAGES } from '../constants/errorMessages.js';

class MenuView {
  async getOption(state) {
    this.#valiateState(state);
    this.#showOptions(state);

    const input = await Console.readLineAsync('옵션을 선택해주세요.\n');
    Console.print('');
    const number = Number(input.trim());

    this.#valiateOption(state, number);

    return number;
  }

  #showOptions(state) {
    for (const [number, text] of Object.entries(MENU_OPTIONS[state])) {
      Console.print(`${number} - ${text}`);
    }
  }

  #valiateState(state) {
    if (!MENU_OPTIONS[state]) {
      throw new Error(ERROR_MESSAGES.MENU_STATE_INVALID);
    }
  }

  #valiateOption(state, number) {
    if (!MENU_OPTIONS[state][number]) {
      throw new Error(ERROR_MESSAGES.MENU_OPTION_INVALID);
    }
  }

  async getLottoConfigUpdates() {
    const input = await Console.readLineAsync(
      '로또 가격, 랜덤 숫자 시작, 랜덤 숫자 끝, 로또 번호 개수 순서로 입력해주세요.\n'
    );

    const numbers = input.split(',').map((number) => Number(number.trim()));

    this.#validateLottoConfig(numbers);

    const [PRICE, NUMBER_RANGE_FROM, NUMBER_RANGE_TO, NUMBERS_COUNT] = numbers;

    return { PRICE, NUMBER_RANGE_FROM, NUMBER_RANGE_TO, NUMBERS_COUNT };
  }

  async getPrizeConfigUpdates() {
    const input = await Console.readLineAsync(
      '1등, 2등, 2등, 4등, 5등 금액 순서로 입력해주세요.\n'
    );

    const numbers = input.split(',').map((number) => Number(number.trim()));

    this.#validatePrizeConfig(numbers);

    const [FIRST, SECOND, THIRD, FOURTH, FIFTH] = numbers;

    return { FIRST, SECOND, THIRD, FOURTH, FIFTH };
  }

  #validateLottoConfig(numbers) {
    if (numbers.length !== 4) {
      throw new Error(ERROR_MESSAGES.SETTING_VALUE_INVALID);
    }
    ``;

    numbers.forEach((number) => this.#validateNumberPositive(number));
  }

  #validatePrizeConfig(numbers) {
    if (numbers.length !== 5) {
      throw new Error(ERROR_MESSAGES.SETTING_VALUE_INVALID);
    }

    numbers.forEach((number) => this.#validateNumberPositive(number));
  }

  #validateNumberPositive(number) {
    if (Number.isNaN(number) || !Number.isInteger(number) || number <= 0) {
      throw new Error(ERROR_MESSAGES.NUMBER_NOT_POSITIVE);
    }
  }
}

export default MenuView;
