import LottoController from './controllers/LottoController.js';
import DIContainer from './DIContainer.js';
import LottoResult from './models/domains/LottoResult.js';
import LottoMachine from './models/services/LottoMachine.js';
import InputView from './views/InputView.js';
import OutputView from './views/OutputView.js';
class App {
  async run() {
    const container = new DIContainer();
    container.register('inputView', InputView);
    container.register('outputView', OutputView);
    container.register('lottoMachine', LottoMachine);
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
