var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { chromium } = require('playwright');
(() => __awaiter(this, void 0, void 0, function* () {
    const browser = yield chromium.launch({
        headless: false,
        args: [
            '--disable-features=AutomationControlled',
            '--user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"'
        ]
    });
    const context = yield browser.newContext();
    const page = yield context.newPage();
    yield page.goto('https://bard.google.com/?hl=en');
    yield page.waitForSelector('textarea', { timeout: 10000 });
    const textarea = yield page.$('textarea');
    if (textarea) {
        yield textarea.click();
        yield textarea.type('What is the capital of Ireland?');
        yield textarea.press('Enter');
    }
    else {
        throw new Error('Unable to find textarea');
    }
    yield page.waitForTimeout(1000);
    const message = yield page.$('.message-content');
    const messageText = yield message.textContent();
    if (!messageText.includes('Dublin')) {
        throw new Error('Expected message to contain Dublin but got: ' + messageText);
    }
    yield browser.close();
}))();
