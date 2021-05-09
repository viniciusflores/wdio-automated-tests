import LoginPage from '../pageobjects/login.page';

describe('Example visual test for login page', () => {
  beforeEach(() => {
    LoginPage.open();
    browser.waitUntil(
      () => {
        const state = browser.execute(() => {
          return document.readyState;
        });
        // console.log(`state:${state}`);
        return state === 'complete';
      },
      {
        timeout: 60000, // 60secs
        timeoutMsg: 'Oops! Check your internet connection',
      },
    );
  });

  it('should compare a element', () => {
    expect(
      browser.checkElement(LoginPage.logoGithub, 'logo'),
    ).toBeLessThanOrEqual(0.1);
  });

  it('should compare a screen', () => {
    expect(browser.checkScreen('login_page')).toBeLessThanOrEqual(0.1);
  });

  it('should compare a fullPageScreen', () => {
    expect(
      browser.checkFullPageScreen('login_fullscreenpage'),
    ).toBeLessThanOrEqual(0.1);
  });
});
