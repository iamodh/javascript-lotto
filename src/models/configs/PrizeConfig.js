class PrizeConfig {
  #config;

  constructor(
    FIRST = 2000000000,
    SECOND = 30000000,
    THIRD = 1500000,
    FOURTH = 50000,
    FIFTH = 5000
  ) {
    this.#config = {
      FIRST,
      SECOND,
      THIRD,
      FOURTH,
      FIFTH,
    };
  }

  getPrize(rank) {
    return this.#config[rank];
  }

  updateConfigs(updates) {
    this.#config = { ...updates };
  }
}

export default PrizeConfig;
