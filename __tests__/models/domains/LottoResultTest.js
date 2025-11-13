import LottoResult from '../../../src/models/domains/LottoResult';

describe('LottoResult 클래스 테스트', () => {
  test('구입 금액에 대한 수익률을 계산한다.', () => {
    const PURCHASE_MONEY = 8000;
    const fakeStats = new Map([
      ['FIRST', 0],
      ['SECOND', 0],
      ['THIRD', 0],
      ['FOURTH', 0],
      ['FIFTH', 1],
    ]);

    const lottoResult = new LottoResult(PURCHASE_MONEY, fakeStats);

    expect(lottoResult.calculateProfitRate()).toBeCloseTo(62.5);
  });
});
