import Lotto from './Lotto.js';

class LottoMachine {
  #numbersGenerator;
  #lottoConfig;
  constructor(numbersGenerator, lottoConfig) {
    this.#numbersGenerator = numbersGenerator;
    this.#lottoConfig = lottoConfig;
  }

  execute(money) {
    const lottos = [];
    const quantity = money / this.#lottoConfig.getPrice();
    for (let i = 0; i < quantity; i++) {
      const numbers = this.#numbersGenerator.generate();

      lottos.push(new Lotto(numbers, this.#lottoConfig));
    }

    return lottos;
  }
}

export default LottoMachine;
