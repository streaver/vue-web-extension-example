const puppeteer = require('puppeteer');
const path = require('path');

const pathToExtension = require('path').join(
  path.join(__dirname, '..', '..', '..', '..', 'dist')
);

const puppeteerArgs = [
  `--disable-extensions-except=${pathToExtension}`,
  `--load-extension=${pathToExtension}`,
  '--show-component-extension-options'
];

describe('Popup page', () => {
  let page, browser;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
      devtools: true,
      args: puppeteerArgs
    });

    page = await browser.newPage();

    await page.goto('https://google.com');
  });

  describe('when clicking radio buttons', () => {
    beforeAll(async () => {
      const extensionId = '<YOUR-EXTENSION-ID>'; // For ease, place this in the env variables
      const chromeExtPath = `chrome-extension://${extensionId}/popup/popup.html`;

      await page.goto(chromeExtPath, { waitUntil: 'domcontentloaded' });

      await page.reload();
    });

    afterAll(async () => {
      await browser.close();
    })

    it('has white background color by default', async () => {
      const bodyColor = await page.$eval('body', body => body.style.backgroundColor);

      expect(bodyColor).toEqual('');
    });

    it('changes the background color on click', async () => {
      const bodyColors = await page.$$eval(
        '.popup-body-color-radios input[type="radio"]',
        radios =>
          radios.map(radio => {
            radio.click();
            return document.querySelector('body').style.backgroundColor;
          })
      );

      expect(bodyColors).toEqual(
        [ 'rgb(191, 231, 197)', 'rgb(201, 218, 248)', 'rgb(244, 238, 188)'],
      );
    });

    it('finds 3 radio buttons for changing background color', async () => {
      const radioButtons = await page.$$eval('.popup-body-color-radios input[type="radio"]', radios => radios);

      expect(radioButtons).toHaveLength(3);
    });
  });

  // * NOT DO-ABLE YET *
  // Existing tools don't allow us to do this in this way yet.

  /* *** *** ***
  describe("when 'Do the magic!' button is clicked", () => {
    it('sends message to content script', async () => {
      // CLICK the button that triggers the sendMessage
      await page.click('#do-the-magic-btn');

      // expect the sendMessage was triggered
      /////////////////////////
      // it's not actually working because we can't load the content script here,
      // due to that, the communication between content script & popup is broken
      // and send message doesn't work.
      /////////////////////////
      expect(chrome.tabs.sendMessage).toHaveBeenCalled();

      // expect the sendMessage was triggered with some specific values
      /////////////////////////
      // it's not actually working because we can't load the content script here,
      // due to that, the communication between content script & popup is broken
      // and send message doesn't work.
      /////////////////////////
      expect(chrome.tabs.sendMessage).toHaveBeenCalledWith(
        expect.any(Number),
        {
          msg: { action: "print_in_console" }
        }
      );
    });
  });
  *** *** *** */
});
