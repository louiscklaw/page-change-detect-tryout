'use strict';

const assert = require('assert');
const puppeteer = require('puppeteer');

const tidyParagraph = (para_in) => {
  return para_in.replace(/ /g,'').replace(/\n/g,'')
}

const sendSlackMessage = () => {
  console.log('shall i implement this ?')
}

async function taobaoItemCheck() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://item.taobao.com/item.htm?spm=a230r.1.14.271.57d92d26yyBaXB&id=611982217209&ns=1&abbucket=6#detail');
    await page.screenshot({path: 'taobao.png'});

    await page.waitFor(1000);
    await page.waitForSelector('#sufei-dialog-close')
    await page.click('#sufei-dialog-close');
    await page.screenshot({path: 'taobao1.png'});

    const live_text = await page.$eval('.tb-meta', el => el.innerText);
    const expected_text = tidyParagraph(`价格\n¥1399.00`)

    console.log('tidyParagraph(live_text)', tidyParagraph(live_text))
    console.log('expected_text',expected_text)

    await browser.close();
    assert.equal(tidyParagraph(live_text), expected_text, 'taobaoItemCheck changed')
  } catch (error) {

    console.log(error.name)

    if (error.name == 'AssertionError [ERR_ASSERTION]'){
      sendSlackMessage('page changed','./taobao.png', `expected: ${expected_text}, live: ${live_text}`)
      throw error
    }else{
      process.exit(99)
    }

  }
}

taobaoItemCheck()
