import { BudgeePage } from './app.po';

describe('budgee App', () => {
  let page: BudgeePage;

  beforeEach(() => {
    page = new BudgeePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
