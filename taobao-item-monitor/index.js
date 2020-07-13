'use strict';

const assert = require('assert');
const puppeteer = require('puppeteer');

const tidyParagraph = (para_in) => {
  return para_in.replace(/ /g,'').replace(/\n/g,'')
}

async function taobaoItemCheck() {


  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://item.taobao.com/item.htm?spm=a230r.1.14.271.57d92d26yyBaXB&id=611982217209&ns=1&abbucket=6#detail');

    const live_text = await page.$eval('.tb-meta', el => el.innerText);
    const expected_text = tidyParagraph(`价格¥1499.001`)

    await browser.close();
    assert.equal(live_text, expected_text, 'taobaoItemCheck changed')
  } catch (error) {
    console.log(error.name)
    if (error.name == 'AssertionError [ERR_ASSERTION]'){
      throw error

    }else{
      process.exit()
    }
  }




}

taobaoItemCheck()