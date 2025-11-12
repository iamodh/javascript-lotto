import LOTTO_CONFIG from './constants/lottoConfig.js';
import LottoController from './controllers/LottoController.js';
import DIContainer from './DIContainer.js';
import LottoResult from './models/domains/LottoResult.js';
// import FixedStrategy from './models/services/FixedStrategy.js';
import LottoMachine from './models/services/LottoMachine.js';
import RandomStrategy from './models/services/RandomStrategy.js';
import InputView from './views/InputView.js';
import OutputView from './views/OutputView.js';
class App {
  async run() {
    const container = new DIContainer();
    container.register('inputView', InputView);
    container.register('outputView', OutputView);
    // container.register('fixedStrategy', FixedStrategy, [[1, 2, 3, 4, 5, 6]]);
    container.register('randomStrategy', RandomStrategy, [
      LOTTO_CONFIG.NUMBER_RANGE_FROM,
      LOTTO_CONFIG.NUMBER_RANGE_TO,
      LOTTO_CONFIG.NUMBERS_COUNT,
    ]);
    container.register('lottoMachine', LottoMachine, ['randomStrategy']);
    container.register('lottoResult', LottoResult);

    container.register('lottoController', LottoController, [
      'inputView',
      'outputView',
      'lottoMachine',
      'lottoResult',
    ]);

    const controller = container.resolve('lottoController');
    await controller.start();
  }
}

export default App;
