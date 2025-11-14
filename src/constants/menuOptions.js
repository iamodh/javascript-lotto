const MAIN_OPTIONS = Object.freeze({
  1: '게임 시작',
  2: '설정',
  3: '종료',
});

const STRATEGY_OPTIONS = Object.freeze({
  1: '고정 숫자 사용',
  2: '랜덤 숫자 사용',
});

const SETTING_OPTIONS = Object.freeze({
  1: '로또 설정',
  2: '우승 금액 설정',
});

const LOTTO_SETTING_OPTIONS = Object.freeze({
  1: '로또 가격',
  2: '랜덤 숫자 범위',
  3: '로또 번호 개수',
});

const PRIZE_OPTIONS = Object.freeze({
  1: '1등',
  2: '2등',
  3: '3등',
  4: '4등',
  5: '5등',
});

export const MENU_OPTIONS = Object.freeze({
  MAIN_OPTIONS,
  STRATEGY_OPTIONS,
  SETTING_OPTIONS,
  LOTTO_SETTING_OPTIONS,
  PRIZE_OPTIONS,
});

export default MENU_OPTIONS;
