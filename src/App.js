import LottoController from './controllers/LottoController.js';
import DIContainer from './DIContainer.js';
import LottoConfig from './models/configs/LottoConfig.js';
import PrizeConfig from './models/configs/PrizeConfig.js';
import LottoMachine from './models/domains/LottoMachine.js';
import RandomStrategy from './models/domains/strategies/RandomStrategy.js';
import LottoChecker from './models/services/LottoChecker.js';
import InputView from './views/InputView.js';
import MenuView from './views/MenuView.js';
import OutputView from './views/OutputView.js';

class App {
  #container;

  constructor() {
    this.#container = new DIContainer();
    this.#injectDependencies();
  }

  async run() {
    let isRunning = true;
    let state = 'MAIN_OPTIONS';
    let option;

    const menuView = this.#container.resolve('menuView');
    const outputView = this.#container.resolve('outputView');
    const lottoConfig = this.#container.resolve('lottoConfig');
    const prizeConfig = this.#container.resolve('prizeConfig');

    while (isRunning) {
      try {
        if (state === 'MAIN_OPTIONS') {
          option = await menuView.getOption(state);
          if (option === 1) {
            const controller = this.#container.resolve('lottoController');
            await controller.start();
            outputView.printNewLine();
          } else if (option === 2) {
            state = 'STRATEGY_OPTIONS';
          } else if (option === 3) {
            state = 'SETTING_OPTIONS';
          } else if (option === 4) {
            isRunning = false;
          }
        } else if (state === 'STRATEGY_OPTIONS') {
          option = await menuView.getOption(state);
          if (option === 1) {
            // 랜덤 숫자 사용
          } else if (option === 2) {
            // 고정 숫자 사용
          }
          state = 'MAIN_OPTIONS';
        } else if (state === 'SETTING_OPTIONS') {
          option = await menuView.getOption(state);
          if (option === 1) {
            const updates = await menuView.getLottoConfigUpdates();
            lottoConfig.updateConfigs(updates);
          } else if (option === 2) {
            const updates = await menuView.getPrizeConfigUpdates();
            prizeConfig.updateConfigs(updates);
          }
          state = 'MAIN_OPTIONS';
        }
      } catch (error) {
        outputView.printError(error.message);
      }
    }
  }

  #injectDependencies() {
    const container = this.#container;

    container.register('menuView', MenuView, 'singleton');
    container.register('lottoConfig', LottoConfig, 'singleton');
    container.register('prizeConfig', PrizeConfig, 'singleton');

    container.register('inputView', InputView, 'singleton', ['lottoConfig']);
    container.register('outputView', OutputView, 'singleton', ['prizeConfig']);

    container.register('randomStrategy', RandomStrategy, 'singleton', [
      'lottoConfig',
    ]);
    container.register('lottoMachine', LottoMachine, 'transient', [
      'lottoConfig',
      'randomStrategy',
    ]);

    container.register('lottoChecker', LottoChecker, 'singleton');
    container.register('lottoController', LottoController, 'transient', [
      'lottoConfig',
      'prizeConfig',
      'inputView',
      'outputView',
      'lottoMachine',
      'lottoChecker',
    ]);
  }
}

export default App;
