import LottoResult from '../models/domains/LottoResult.js';
import WinningLotto from '../models/domains/WinningLotto.js';

class LottoController {
  #inputView;
  #outputView;
  #lottoMachine;
  #lottoChecker;
  #lottoConfig;

  constructor(inputView, outputView, lottoMachine, lottoChecker, lottoConfig) {
    this.#inputView = inputView;
    this.#outputView = outputView;
    this.#lottoChecker = lottoChecker;
    this.#lottoMachine = lottoMachine;
    this.#lottoConfig = lottoConfig;
  }

  async start() {
    try {
      const purchaseMoney = await this.#inputView.getPurchasePrice();
      this.#outputView.printNewLine();

      const lottos = this.#lottoMachine.execute(purchaseMoney);
      this.#outputView.printPurchasedLottos(lottos);
      this.#outputView.printNewLine();

      const winningNumbers = await this.#inputView.getWinningNumbers();
      const bonusNumber = await this.#inputView.getBonusNumber();
      this.#outputView.printNewLine();

      const winningLotto = new WinningLotto(
        winningNumbers,
        bonusNumber,
        this.#lottoConfig
      );

      const stats = this.#lottoChecker.calculateStats(lottos, winningLotto);
      this.#outputView.printWinningStatistic(stats);

      const lottoResult = new LottoResult(purchaseMoney, stats);
      this.#outputView.printProfitRate(lottoResult.calculateProfitRate());
    } catch (error) {
      this.#outputView.printError(error.message);
    }
  }
}

export default LottoController;
