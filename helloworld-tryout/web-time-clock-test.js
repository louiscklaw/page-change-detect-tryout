const puppeteer = require('puppeteer')

async function web_time_clock() {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    defaultViewport: {
      width: 1920,
      height:1080*10
    }
  });

  const page = await browser.newPage();

  await page.goto('https://www.hko.gov.hk/en/gts/time/clock_e.html');

  await page.screenshot({ path: 'web-time-clock.png' });

  await browser.close();

}

web_time_clock()
