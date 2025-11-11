import WinningLotto from '../models/domains/WinningLotto.js';

class LottoController {
  #inputView;
  #outputView;
  #lottoMachine;
  #lottoResult;

  constructor(inputView, outputView, lottoMachine, lottoResult) {
    this.#inputView = inputView;
    this.#outputView = outputView;
    this.#lottoMachine = lottoMachine;
    this.#lottoResult = lottoResult;
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

      const winningLotto = new WinningLotto(winningNumbers, bonusNumber);

      const stats = this.#lottoResult.calculateStatistics(lottos, winningLotto);
      this.#outputView.printWinningStatistic(stats);

      const profitRate = this.#lottoResult.calculateProfitRate(purchaseMoney);
      this.#outputView.printProfitRate(profitRate);
    } catch (error) {
      this.#outputView.printError(error.message);
    }
  }
}

export default LottoController;
