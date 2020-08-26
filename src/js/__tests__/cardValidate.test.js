import puppetteer from 'puppeteer';

jest.setTimeout(30000); // default puppeteer timeout
describe('card validate', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:8080';
  beforeAll(async () => {
    browser = await puppetteer.launch();
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
  });
  describe('validate work', () => {
    test('should add .validing class for valid inn', async () => {
      await page.goto(baseUrl);
      const main = await page.$('.main');
      const input = await main.$('.numbers');
      await input.type('4242424242424242');
      const submit = await main.$('.click');
      submit.click();
      await page.waitForSelector('.validing');
    });
    test('not validing', async () => {
      await page.goto(baseUrl);
      const main = await page.$('.main');
      const input = await main.$('.numbers');
      await input.type('555');
      const submit = await main.$('.click');
      submit.click();
      await page.waitForSelector('.notValiding');
    });
    test('Visa', async () => {
      await page.goto(baseUrl);
      const main = await page.$('.main');
      const input = await main.$('.numbers');
      await input.type('424');
      await page.waitFor(() => {
        const parent = document.querySelector('.visa').parentNode;
        if (!parent.classList.contains('dark')) {
          return parent;
        }
        return '';
      });
    });
    test('maestro', async () => {
      await page.goto(baseUrl);
      const main = await page.$('.main');
      const input = await main.$('.numbers');
      await input.type('6777');
      await page.waitFor(() => {
        const parent = document.querySelector('.maestro').parentNode;
        if (!parent.classList.contains('dark')) {
          return parent;
        }
        return '';
      });
    });
    test('maestro return dark', async () => {
      await page.goto(baseUrl);
      const main = await page.$('.main');
      const input = await main.$('.numbers');
      await input.type('62');
      await page.keyboard.press('Backspace');
      await page.waitFor(() => {
        const parent = document.querySelector('.maestro').parentNode;
        if (parent.classList.contains('dark')) {
          return parent;
        }
        return '';
      });
    });
  });
});
