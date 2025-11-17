class LottoConfig {
  #config;

  constructor(
    PRICE = 1000,
    NUMBER_RANGE_FROM = 1,
    NUMBER_RANGE_TO = 45,
    NUMBERS_COUNT = 6
  ) {
    this.#config = {
      PRICE: PRICE,
      NUMBER_RANGE_FROM: NUMBER_RANGE_FROM,
      NUMBER_RANGE_TO: NUMBER_RANGE_TO,
      NUMBERS_COUNT: NUMBERS_COUNT,
    };
  }

  getPrice() {
    return this.#config.PRICE;
  }

  getNumbersFrom() {
    return this.#config.NUMBER_RANGE_FROM;
  }

  getNumbersTo() {
    return this.#config.NUMBER_RANGE_TO;
  }

  getNumbersCount() {
    return this.#config.NUMBERS_COUNT;
  }

  updateConfigs(updates) {
    this.#config = { ...updates };
  }
}

export default LottoConfig;
