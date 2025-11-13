import DEV_CONFIG from './constants/devConfig.js';
import LOTTO_CONFIG from './constants/lottoConfig.js';
import LottoController from './controllers/LottoController.js';
import DIContainer from './DIContainer.js';
import FixedStrategy from './models/services/FixedStrategy.js';
import LottoChecker from './models/services/LottoChecker.js';
import LottoMachine from './models/services/LottoMachine.js';
import RandomStrategy from './models/services/RandomStrategy.js';
import InputView from './views/InputView.js';
import OutputView from './views/OutputView.js';

class App {
  async run(env) {
    const container = new DIContainer();
    container.register('inputView', InputView);
    container.register('outputView', OutputView);

    if (env === 'dev') {
      container.register('fixedStrategy', FixedStrategy, [
        DEV_CONFIG.FIXED_NUMBERS,
      ]);
      container.register('lottoMachine', LottoMachine, ['fixedStrategy']);
    } else {
      container.register('randomStrategy', RandomStrategy, [
        LOTTO_CONFIG.NUMBER_RANGE_FROM,
        LOTTO_CONFIG.NUMBER_RANGE_TO,
        LOTTO_CONFIG.NUMBERS_COUNT,
      ]);
      container.register('lottoMachine', LottoMachine, ['randomStrategy']);
    }

    container.register('lottoChecker', LottoChecker);
    container.register('lottoController', LottoController, [
      'inputView',
      'outputView',
      'lottoMachine',
      'lottoChecker',
      'lottoResult',
    ]);

    const controller = container.resolve('lottoController');
    await controller.start();
  }
}

export default App;
