const fs = require('fs')
const path = require('path')

const puppeteer = require('puppeteer');
const {getJobDetailId} = require('./parseJobIndex')

const tidyParagraph = (para_in) => {
  return para_in.replace(/ /g,'').replace(/\n/g,'')
}

async function extractJobsdbJobsIndexJobsDetailId(url_to_extract) {
  var output=[]

  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    defaultViewport: {
      width: 1920,
      height:1080*10
    }
  });

  const page = await browser.newPage();

  await page.goto(url_to_extract);

  await page.screenshot({ path: 'jobsdb.png' });

  // let bodyHTML = await page.evaluate(() => document.body.innerHTML);

  // const css_select_job_card_job_detail_link = '[data-automation~="job-card-0"] > article'

  // const job_card = await page.$eval(css_select_job_card_job_detail_link, el => el.outerHTML);
  const job_card_describedby = await page.evaluate(
    ()=>{
      // running in browser
      let output=[]
      let i=0
      try {
        while (true) {
          let job_card = document.querySelector(`[data-automation~="job-card-${i}"] > article`).attributes['aria-describedby'].value
          i++
          output.push(job_card)
        }
      } catch (error) {
        console.log('cannot grep job card anymore')
      }
      return output
    }
  );

  // console.log(getJobDetailId(job_card_describedby))
  output = job_card_describedby.map(x => getJobDetailId(x))

  // fs.writeFileSync('./source.html',bodyHTML,{encoding: 'utf-8'})

  await browser.close();

  return output
}

function sayHelloworld(){
  console.log(`helloworld from ${path.basename(__filename)}`)
}

module.exports={
  extractJobsdbJobsIndexJobsDetailId,
  sayHelloworld
}