import Lotto from '../domains/Lotto.js';
import LOTTO_CONFIG from '../../constants/lottoConfig.js';
import { Random } from '@woowacourse/mission-utils';

class LottoMachine {
  execute(money) {
    const lottos = [];
    const quantity = money / LOTTO_CONFIG.PRICE;
    for (let i = 0; i < quantity; i++) {
      const randomNumbers = this.#getRandomLottoNumbers();

      lottos.push(new Lotto(randomNumbers));
    }

    return lottos;
  }

  #getRandomLottoNumbers() {
    return Random.pickUniqueNumbersInRange(
      LOTTO_CONFIG.NUMBER_RANGE_FROM,
      LOTTO_CONFIG.NUMBER_RANGE_TO,
      LOTTO_CONFIG.NUMBERS_COUNT
    );
  }
}

export default LottoMachine;
