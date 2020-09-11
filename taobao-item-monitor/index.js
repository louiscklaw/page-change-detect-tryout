const assert = require('assert');
const puppeteer = require('puppeteer');

const { WebClient } = require('@slack/web-api');

const tidyParagraph = (para_in) => {
  return para_in.replace(/ /g,'').replace(/\n/g,'')
}

async function taobaoItemCheck() {
  try {
    const browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      defaultViewport: {
        width: 1920,
        height:1080*10
      }
    });
    const page = await browser.newPage();
    await page.goto('https://item.taobao.com/item.htm?spm=a230r.1.14.271.57d92d26yyBaXB&id=611982217209&ns=1&abbucket=6#detail');
    // await page.screenshot({path: 'taobao-GTX1050ti.png'});

    await page.waitFor(30000);

    await page.waitForSelector('#sufei-dialog-close')
    await page.click('#sufei-dialog-close');
    await page.screenshot({path: 'current_capture.png'});

    const live_text = await page.$eval('.tb-meta', el => el.innerText);
    const expected_text = tidyParagraph(`价格¥1399.00-累计评论-交易成功`)

    console.log('tidyParagraph(live_text)', tidyParagraph(live_text))
    console.log('expected_text',expected_text)

    await browser.close();

    assert.equal(tidyParagraph(live_text), expected_text, 'taobaoItemCheck changed')

  } catch (error) {

    console.log(error.name)

    if (error.name == 'AssertionError [ERR_ASSERTION]'){
      sendSlackMessage('page changed','./taobao-display-card.png', `expected: ${expected_text}, live: ${live_text}`)
      throw error
    }else{
      process.exit(99)
    }

  }
}

taobaoItemCheck()
