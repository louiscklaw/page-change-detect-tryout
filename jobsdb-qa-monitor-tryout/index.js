'use strict';

const assert = require('assert');
const puppeteer = require('puppeteer');


const tidyParagraph = (para_in) => {
  return para_in.replace(/ /g,'').replace(/\n/g,'')
}

async function jobsdbQAChangeCheck() {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto('https://hk.jobsdb.com/hk/jobs/information-technology/1?Key=quality%20assurance');

  await page.screenshot({ path: 'jobsdb.png' });

}

jobsdbQAChangeCheck();