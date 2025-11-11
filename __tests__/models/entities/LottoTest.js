import Lotto from '/src/models/entities/Lotto';

describe('로또 클래스 테스트', () => {
  test('로또 번호의 개수가 6개가 아니라면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow('[ERROR]');
  });

  test('로또 번호에 중복된 숫자가 있으면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow('[ERROR]');
  });

  test('당첨 로또와 비교하여 자신의 등수를 계산한다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    const mockWinningLotto = {
      calculateMatchCount: (lottoNumbers) => {
        return 5;
      },
      calculateBonusMatch: (lottoNumbers) => {
        return true;
      },
    };

    expect(lotto.calculateRank(mockWinningLotto)).toBe(2);
  });
});
