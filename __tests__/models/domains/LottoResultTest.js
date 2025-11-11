import LottoResult from '../../../src/models/entities/LottoResult';

describe('LottoResult 클래스 테스트', () => {
  test('lottos와 winningLotto를 받아 우승 통계를 계산한다.', () => {
    const mockLottos = [{ numbers: [1, 2, 3, 4, 5, 6] }];

    const mockWinningLotto = {
      calculateRank: jest.fn().mockReturnValue('FIFTH'),
    };

    const lottoResult = new LottoResult();
    const EXPECTED_STATS = new Map([
      ['FIRST', 0],
      ['SECOND', 0],
      ['THIRD', 0],
      ['FOURTH', 0],
      ['FIFTH', 1],
    ]);

    const stats = lottoResult.calculateStatistics(mockLottos, mockWinningLotto);
    expect(stats).toEqual(EXPECTED_STATS);
  });

  test('구입 금액에 대한 수익률을 계산한다.', () => {
    const mockLottos = [{ numbers: [1, 2, 3, 4, 5, 6] }];
    const mockWinningLotto = {
      calculateRank: jest.fn().mockReturnValue('FIFTH'),
    };

    const lottoResult = new LottoResult();
    lottoResult.calculateStatistics(mockLottos, mockWinningLotto);
    const PURCHASE_MONEY = 8000;

    expect(lottoResult.calculateProfitRate(PURCHASE_MONEY)).toBeCloseTo(62.5);
  });
});
