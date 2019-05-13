import { ProjetoEstoquePage } from './app.po';

describe('projeto-estoque App', function() {
  let page: ProjetoEstoquePage;

  beforeEach(() => {
    page = new ProjetoEstoquePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
