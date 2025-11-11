import { getLogSpy } from '/src/utils/mocks';
import Output from '/src/views/OutputView';

describe('출력 뷰 클래스 테스트', () => {
  test('정렬된 로또 번호들을 형식에 맞게 출력한다.', () => {
    const output = new Output();
    const logSpy = getLogSpy();

    const mockLottos = [
      { getSortedNumbers: () => [8, 21, 23, 41, 42, 43] },
      { getSortedNumbers: () => [3, 5, 11, 16, 32, 38] },
    ];

    const logs = [
      '2개를 구매했습니다.',
      '[8, 21, 23, 41, 42, 43]',
      '[3, 5, 11, 16, 32, 38]',
    ];

    output.printPurchasedLottos(mockLottos);

    // logSpy가 log를 포함한 string을 매개변수로 호출되었는지 테스트
    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test('당첨 통계를 받아 형식에 맞게 출력한다.', () => {
    const STATS_MAP = new Map([
      ['FIRST', 0],
      ['SECOND', 0],
      ['THIRD', 0],
      ['FOURTH', 0],
      ['FIFTH', 1],
    ]);

    const logSpy = getLogSpy();
    const output = new Output();

    output.printWinningStatistic(STATS_MAP);

    const logs = [
      '당첨 통계',
      '---',
      '3개 일치 (5,000원) - 1개',
      '4개 일치 (50,000원) - 0개',
      '5개 일치 (1,500,000원) - 0개',
      '5개 일치, 보너스 볼 일치 (30,000,000원) - 0개',
      '6개 일치 (2,000,000,000원) - 0개',
    ];

    logs.forEach((log) =>
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log))
    );
  });

  test('수익률을 받아 형식에 맞게 출력한다.', () => {
    const PROFIT_RATE = 62.5;
    const logSpy = getLogSpy();
    const log = '총 수익률은 62.5%입니다.';

    const output = new Output();
    output.printProfitRate(PROFIT_RATE);

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
  });
});
