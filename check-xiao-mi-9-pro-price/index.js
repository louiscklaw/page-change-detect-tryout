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

  await page.goto('https://www.mi.com/hk/redmi-note-9-pro');

  await page.screenshot({ path: 'redmi-node-9-pro-screencapture.png' });

  const live_price_paragraph = await page.$eval('.text-content', el => el.innerText);

  const expected_price_paragraph = `延續傳奇

  Redmi Note 9 Pro

  6400萬像素四鏡頭 升級30W快充
  HK$1899

  送高透軟膠保護套及額外3個月保養*
  *用戶需在購買手機當天起計的7天內到
  https://buy.mi.com/hk/registration 註
  冊，即可獲得額外3個月保養。

  HK$ 1,899`

  const tidyed_live_price_paragraph = tidyParagraph(live_price_paragraph)
  const tidyed_expected_price_paragraph = tidyParagraph(expected_price_paragraph)

  await browser.close();

  assert.equal(tidyed_expected_price_paragraph, tidyed_live_price_paragraph, 'xiao mi note 9 pro price changed !!!!')
}

xiaomiPriceChangeCheck();