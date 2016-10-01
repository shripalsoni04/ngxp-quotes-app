import { AppCommonVM } from '../x-shared/app/app-common.view-model';

describe('App View Model', () => {

  let appCommonVM: AppCommonVM;

  beforeEach(() => {
    appCommonVM = new AppCommonVM();
  });

  it('should have initial counter value greater than 0', () => {
    expect(appCommonVM.counter).toBeGreaterThan(0);
  });

  it('should decreament count by 1', () => {
    let initialCount = appCommonVM.counter;
    appCommonVM.onTap();
    expect(appCommonVM.counter).toEqual(initialCount - 1);
  });

  it('should have tap count left in message when count greater than 0', () => {
    expect(appCommonVM.message).toContain('taps left');
  });

  it('should have proper message when 0 count ', () => {
    appCommonVM.counter = 0;
    expect(appCommonVM.message).toContain('Hoorraaay! \nYou are ready to start building!');
  });
});
