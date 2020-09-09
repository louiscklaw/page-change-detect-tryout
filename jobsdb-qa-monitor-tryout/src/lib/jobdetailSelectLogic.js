const path = require('path')

const {rateJob} = require('./rateJob')

const {
  getJobDescription,
  getJobData,
  getJobDetail,
  getJobId,
  getDeeperJobDetail,
  getPageUrl,
  getJobTitle,
  getCompanyWebsite,
  getJobTitleSlug,
  getJobRequirement
} = require('./parseJobDetail')

function jobdetailSelectLogic(json_in){
  const marks = json_in.map(
    x => [x, rateJob(x)]
  )
  return marks.filter(x => x > 5)
}

function sendSlackAlert(json_in){
  return json_in
}

function sayHelloworld(){
  console.log(`helloworld from ${path.basename(__filename)}`)
}

module.exports={
  sendSlackAlert,
  jobdetailSelectLogic,
  sayHelloworld
}