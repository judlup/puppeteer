'use strict';

const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');

module.exports.hello = async (event) => {

    const browser = await chromium.puppeteer.launch({
        executablePath: await chromium.executablePath,
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        headless: chromium.headless,
    });
    
    const page = await browser.newPage();

    await page.goto("https://google.com");

    const screenshot = await page.screenshot({ encoding: 'binary' });

    await browser.close();

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: `Complete screenshot of https://google.com`,
          input: event,
          res: screenshot.toString('base64')
        },
        null,
        2
      ),
    };
};
