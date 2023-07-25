const { chromium } = require('playwright');

(async () => {

  const browser = await chromium.launch({
    headless: false,
    args: [
      '--disable-features=AutomationControlled',
      '--user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"'
    ]
  });

  const context = await browser.newContext();

  const page = await context.newPage();

  await page.goto('https://bard.google.com/?hl=en');

  await page.waitForSelector('textarea', {timeout: 10000});

  const textarea = await page.$('textarea');

  if (textarea) {
    await textarea.click();
    await textarea.type('What is the capital of Ireland?');
    await textarea.press('Enter');
  } else {
    throw new Error('Unable to find textarea');
  }

  await page.waitForTimeout(1000);

  const message = await page.$('.message-content');
  const messageText = await message.textContent();

  if (!messageText.includes('Dublin')) {
    throw new Error('Expected message to contain Dublin but got: ' + messageText);
  }

  await browser.close();

})();