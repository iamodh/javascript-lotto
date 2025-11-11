import { Console } from '@woowacourse/mission-utils';
import LottoResult from '../models/entities/LottoResult.js';
import PRIZE_CONFIG from '../constants/prizeConfig.js';

class OutputView {
  printPurchasedLottos(lottos) {
    Console.print(`${lottos.length}개를 구매했습니다.`);

    for (const lotto of lottos) {
      Console.print(`[${lotto.getSortedNumbers().join(', ')}]`);
    }
  }

  printWinningStatistic(winningStatistic) {
    Console.print('당첨 통계');
    Console.print('---');

    for (const [rank, count] of winningStatistic.entries()) {
      const money = PRIZE_CONFIG.MONEY[rank].toLocaleString();

      Console.print(
        `${PRIZE_CONFIG.CONDITION[rank]} (${money}원) - ${count}개`
      );
    }
  }

  printProfitRate(profitRate) {
    Console.print(`총 수익률은 ${profitRate}%입니다.`);
  }

  printError(error) {
    Console.print(error);
  }

  printNewLine() {
    Console.print('');
  }
}

export default OutputView;
