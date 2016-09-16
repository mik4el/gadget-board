import { GadgetBoardFrontendPage } from './app.po';

describe('gadget-board-frontend App', function() {
  let page: GadgetBoardFrontendPage;

  beforeEach(() => {
    page = new GadgetBoardFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
