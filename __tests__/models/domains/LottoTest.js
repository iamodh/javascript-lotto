import LottoConfig from '../../../src/models/configs/LottoConfig';
import Lotto from '../../../src/models/domains/Lotto';

describe('로또 클래스 테스트', () => {
  let defaultLottoConfig;

  beforeEach(() => {
    defaultLottoConfig = new LottoConfig();
  });
  test('로또 번호의 개수가 설정과 같지 않다면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7], defaultLottoConfig);
    }).toThrow('[ERROR]');
  });

  test('로또 번호에 중복된 숫자가 있으면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5], defaultLottoConfig);
    }).toThrow('[ERROR]');
  });

  test('보너스 번호의 포함 여부를 반환한다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6], defaultLottoConfig);

    const BONUS_NUMBER = 6;

    expect(lotto.contains(BONUS_NUMBER)).toBe(true);
  });

  test('당첨 로또 번호와 일치하는 번호의 개수를 반환한다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6], defaultLottoConfig);

    const winningNumbers = [1, 2, 3, 4, 5, 7];

    expect(lotto.matchCount(winningNumbers)).toBe(5);
  });

  test('로또 번호를 오름차순으로 정렬하여 반환한다.', () => {
    const lotto = new Lotto([6, 5, 4, 3, 2, 1], defaultLottoConfig);
    expect(lotto.getSortedNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
