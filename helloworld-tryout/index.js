'use strict';

const assert = require('assert');
const puppeteer = require('puppeteer');


const tidyParagraph = (para_in) => {
  return para_in.replace(/ /g,'').replace(/\n/g,'')
}

async function xiaomiPriceChangeCheck() {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    defaultViewport: {
      width: 1920,
      height:1080*10
    }
  });

  const page = await browser.newPage();

  await page.goto('http://127.0.0.1:8080');

  await page.screenshot({ path: 'screen-capture.png' });

  const live_h1 = await page.$eval('h1', el => el.innerText);

  const expected_h1 = `Example Louis`

  const tidyed_live_h1 = tidyParagraph(live_h1)
  const tidyed_h1 = tidyParagraph(expected_h1)

  await browser.close();

  assert.equal(tidyed_h1, tidyed_live_h1, 'hello change !!!!')
  // assert.notEqual(tidyed_h1, tidyed_live_h1, 'hello not change !!!!')
}

xiaomiPriceChangeCheck();