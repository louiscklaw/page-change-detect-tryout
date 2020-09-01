'use strict';

const assert = require('assert');
const puppeteer = require('puppeteer');
const fs = require('fs')


const tidyParagraph = (para_in) => {
  return para_in.replace(/ /g,'').replace(/\n/g,'')
}

async function jobsdbQAChangeCheck() {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    defaultViewport: {
      width: 1920,
      height:1080*10
    }
  });

  const page = await browser.newPage();

  await page.goto('https://hk.jobsdb.com/hk/jobs/information-technology/1?Key=quality%20assurance');

  await page.screenshot({ path: 'jobsdb.png' });

  let bodyHTML = await page.evaluate(() => document.body.innerHTML);

  const job_card = await page.$eval('[data-automation~="job-card-0"]', el => el.innerText);

  console.log(job_card)
  fs.writeFileSync('./source.html',bodyHTML,{encoding: 'utf-8'})

  await browser.close();
}

jobsdbQAChangeCheck();