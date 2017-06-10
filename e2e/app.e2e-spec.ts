import { RankitPage } from './app.po';

describe('rankit App', () => {
  let page: RankitPage;

  beforeEach(() => {
    page = new RankitPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to rankit!!');
  });
});
