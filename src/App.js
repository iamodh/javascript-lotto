import FIXED_NUMBERS from './constants/fixedNumbers.js';
import LottoController from './controllers/LottoController.js';
import DIContainer from './DIContainer.js';
import LottoConfig from './models/configs/LottoConfig.js';
import PrizeConfig from './models/configs/PrizeConfig.js';
import LottoMachine from './models/domains/LottoMachine.js';
import FixedStrategy from './models/domains/strategies/FixedStrategy.js';
import RandomStrategy from './models/domains/strategies/RandomStrategy.js';
import LottoChecker from './models/services/LottoChecker.js';
import InputView from './views/InputView.js';
import OutputView from './views/OutputView.js';

class App {
  async run(env) {
    const container = new DIContainer();

    container.register('lottoConfig', LottoConfig);
    container.register('prizeConfig', PrizeConfig);

    container.register('inputView', InputView, ['lottoConfig']);
    container.register('outputView', OutputView, ['prizeConfig']);

    if (env === 'dev') {
      container.register('fixedStrategy', FixedStrategy, [FIXED_NUMBERS]);
      container.register('lottoMachine', LottoMachine, [
        'fixedStrategy',
        'lottoConfig',
      ]);
    } else {
      container.register('randomStrategy', RandomStrategy, ['lottoConfig']);
      container.register('lottoMachine', LottoMachine, [
        'randomStrategy',
        'lottoConfig',
      ]);
    }

    container.register('lottoChecker', LottoChecker);
    container.register('lottoController', LottoController, [
      'inputView',
      'outputView',
      'lottoMachine',
      'lottoChecker',
      'lottoConfig',
      'prizeConfig',
    ]);

    const controller = container.resolve('lottoController');
    await controller.start();
  }
}

export default App;
