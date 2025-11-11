import LOTTO_CONFIG from '../../src/constants/lottoConfig';
import LottoMachine from '../../src/models/services/LottoMachine';
import { mockQuestions } from '/src/utils/mocks';
import Input from '/src/views/InputView';

describe('입력 뷰 클래스 테스트', () => {
  test('구입 금액을 입력 받아 숫자로 변환 후 반환한다.', async () => {
    mockQuestions(['3000']);

    const input = new Input();

    expect(await input.getPurchasePrice()).toBe(3000);
  });

  test('입력된 구입 금액이 양의 정수가 아니라면 예외가 발생한다.', () => {
    mockQuestions(['0']);

    const input = new Input();

    expect(async () => {
      await input.getPurchasePrice();
    }).rejects.toThrow('[ERROR]');
  });

  test('입력된 구입 금액이 로또의 가격으로 나누어 떨어지지 않으면 예외가 발생한다.', () => {
    mockQuestions(['3200']);

    const input = new Input();

    expect(async () => {
      await input.getPurchasePrice();
    }).rejects.toThrow('[ERROR]');
  });

  test('당첨 로또의 번호들을 입력 받아 숫자 배열로 변환 후 반환한다.', async () => {
    mockQuestions(['1,2,3,4,5,6']);

    const input = new Input();
    const numbers = await input.getWinningNumbers();

    expect(numbers).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('입력된 당첨 로또 번호 중 양의 정수가 아닌 번호가 있다면 예외가 발생한다.', () => {
    mockQuestions(['1,2,3,4,5,0']);

    const input = new Input();

    expect(async () => {
      await input.getWinningNumbers();
    }).rejects.toThrow('[ERROR]');
  });

  test('입력된 당첨 로또 번호 중 로또 번호의 범위에 포함되지 않는 번호가 있다면 예외가 발생한다.', () => {
    const NUMBER_NOT_IN_RANGE = LOTTO_CONFIG.NUMBER_RANGE_TO + 1;
    mockQuestions(['1,2,3,4,5,' + NUMBER_NOT_IN_RANGE]);

    const input = new Input();

    expect(async () => {
      await input.getWinningNumbers();
    }).rejects.toThrow('[ERROR]');
  });

  test('당첨 로또의 보너스 번호를 입력 받아 변환 후 반환한다.', async () => {
    mockQuestions(['10']);
    const input = new Input();
    const bonusNumber = await input.getBonusNumber();

    expect(bonusNumber).toBe(10);
  });

  test('당첨 로또의 보너스 번호가 양의 정수가 아니라면 예외가 발생한다.', () => {
    mockQuestions(['0']);
    const input = new Input();

    expect(async () => {
      await input.getBonusNumber();
    }).rejects.toThrow('[ERROR]');
  });

  test('당첨 로또의 보너스 번호가 로또 번호의 범위에 포함되지 않는다면 예외가 발생한다.', () => {
    const NUMBER_NOT_IN_RANGE = LOTTO_CONFIG.NUMBER_RANGE_TO + 1;

    mockQuestions([String(NUMBER_NOT_IN_RANGE)]);
    const input = new Input();

    expect(async () => {
      await input.getBonusNumber();
    }).rejects.toThrow('[ERROR]');
  });
});
