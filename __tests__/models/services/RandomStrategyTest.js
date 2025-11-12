import RandomStrategy from '../../../src/models/services/RandomStrategy';

describe('랜덤 전략 클래스 테스트', () => {
  test('주어진 범위 내에서 count개의 랜덤한 번호를 생성한다.', () => {
    const FROM = 1;
    const TO = 10;
    const COUNT = 5;

    const randomStrategy = new RandomStrategy(FROM, TO, COUNT);

    expect(randomStrategy.generate().length).toBe(COUNT);
  });
});
