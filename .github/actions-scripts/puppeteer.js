const puppeteer = require('puppeteer')

async function exampe_com_check() {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    defaultViewport: {
      width: 1920,
      height:1080*10
    }
  });

  const page = await browser.newPage();

  await page.goto('http://www.example.com/');

  await page.screenshot({ path: 'screen-capture.png' });

  await browser.close();

}

exampe_com_check()