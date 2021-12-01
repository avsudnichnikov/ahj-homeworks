import puppetteer from 'puppeteer';

jest.setTimeout(30000);
describe('popover', () => {
  let browser;
  let page;
  const baseUrl = 'http://localhost:9000';
  beforeAll(async () => {
    browser = await puppetteer.launch({
      headless: false,
      devtools: true,
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
  });

  describe('popover', () => {
    test('create arrow', async () => {
      await page.goto(baseUrl);
      await page.waitForSelector('.arrow');
    });
    test('popover visible', async () => {
      await page.goto(baseUrl);
      const button = await page.$('.btn');
      button.click();
      await page.waitForSelector('.popover.visible');
    });
  });
});
