import { browser, by, element } from 'protractor';

export class RankitPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('rankit-root h1')).getText();
  }
}
