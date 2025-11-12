import Lotto from '../domains/Lotto.js';
import LOTTO_CONFIG from '../../constants/lottoConfig.js';

class LottoMachine {
  #numbersGenerator;

  constructor(numbersGenerator) {
    this.#numbersGenerator = numbersGenerator;
  }

  execute(money) {
    const lottos = [];
    const quantity = money / LOTTO_CONFIG.PRICE;
    for (let i = 0; i < quantity; i++) {
      const numbers = this.#numbersGenerator.generate();

      lottos.push(new Lotto(numbers));
    }

    return lottos;
  }
}

export default LottoMachine;
