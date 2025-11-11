import WinningLotto from '../../../src/models/entities/WinningLotto';

describe('당첨 로또 클래스 테스트', () => {
  test('당점 로또 번호의 개수가 6개가 아니라면 예외가 발생한다.', () => {
    expect(() => {
      new WinningLotto([1, 2, 3, 4, 5], 6);
    }).toThrow('[ERROR]');
  });

  test('당첨 로또 번호에 중복된 숫자가 있으면 예외가 발생한다.', () => {
    expect(() => {
      new WinningLotto([1, 2, 3, 4, 5, 5], 6);
    }).toThrow('[ERROR]');
  });

  test('보너스 로또 번호가 당첨 로또 번호와 중복되면 예외가 발생한다.', () => {
    expect(() => {
      new WinningLotto([1, 2, 3, 4, 5, 6], 6);
    }).toThrow('[ERROR]');
  });

  test('로또 번호를 받아 자신 번호와 일치하는 번호의 개수를 반환한다.', () => {
    const LOTTO_NUBMERS = [1, 2, 3, 4, 5, 6];
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 7], 6);

    expect(winningLotto.calculateMatchCount(LOTTO_NUBMERS)).toBe(5);
  });

  test('로또 번호를 받아 자신의 보너스 번호와 일치하는 번호의 여부를 반환한다.', () => {
    const LOTTO_NUBMERS = [1, 2, 3, 4, 5, 6];

    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 7], 6);

    expect(winningLotto.calculateBonusMatch(LOTTO_NUBMERS)).toBe(true);
  });
});
