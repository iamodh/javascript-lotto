import MENU_OPTIONS from '../../src/constants/menuOptions';
import MenuView from '../../src/views/MenuView';
import { mockQuestions } from '../../src/utils/mocks';

describe('메뉴 뷰 클래스 테스트', () => {
  test('존재하지 않는 메뉴 상태를 전달 받으면 예외가 발생한다.', () => {
    const STATE = 'NOT_EXISTING';
    const menuView = new MenuView();

    expect(async () => await menuView.getOption(STATE)).rejects.toThrow(
      '[ERROR]'
    );
  });

  test('존재하지 않는 옵션을 입력하면 예외가 발생한다.', () => {
    const STATE = Object.keys(MENU_OPTIONS)[0];
    const menuView = new MenuView();
    const INPUT = String(Object.keys(MENU_OPTIONS[STATE]).length + 1);
    mockQuestions([INPUT]);

    expect(async () => await menuView.getOption(STATE)).rejects.toThrow(
      '[ERROR]'
    );
  });

  test('선택한 옵션 번호를 반환한다.', async () => {
    const STATE = Object.keys(MENU_OPTIONS)[0];
    const menuView = new MenuView();
    mockQuestions(['1']);

    expect(await menuView.getOption(STATE)).toBe(1);
  });
});
