import { Random } from '@woowacourse/mission-utils';

class RandomStrategy {
  #from;
  #to;
  #count;
  constructor(from, to, count) {
    this.#from = from;
    this.#to = to;
    this.#count = count;
  }

  generate() {
    return Random.pickUniqueNumbersInRange(this.#from, this.#to, this.#count);
  }
}

export default RandomStrategy;
