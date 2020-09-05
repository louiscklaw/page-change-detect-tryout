#!/usr/bin/env node
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
}

xiaomiPriceChangeCheck();

console.log('helloworld')