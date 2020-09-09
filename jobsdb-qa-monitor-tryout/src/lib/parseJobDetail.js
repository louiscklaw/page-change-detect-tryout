const fs = require('fs')
const path = require('path')

function getJobData(json_in){
  return json_in['data']
}

function getJobDetail(json_in){
  return getJobData(json_in).jobDetail
}

function getDeeperJobDetail(json_in){
  return getJobDetail(json_in).jobDetail
}

function getJobId(json_in){
  return getJobDetail(json_in).id
}

function getJobDescription(json_in){
  return getDeeperJobDetail(json_in).jobDescription
}

function getJobRequirement(json_in){
  return getDeeperJobDetail(json_in).jobRequirement
}

function getPageUrl(json_in){
  return getJobDetail(json_in).pageUrl
}

function getJobHeader(json_in){
  return getJobDetail(json_in).header
}

function getJobTitle(json_in){
  return getJobHeader(json_in).jobTitle
}

function getCompanyDetail(json_in){
  return getJobDetail(json_in).companyDetail
}

function getCompanyWebsite(json_in){
  return getCompanyDetail(json_in).companyWebsite
}

function getJobTitleSlug(json_in){
  return getJobDetail(json_in).jobTitleSlug
}

function sayHelloworld(){
  console.log(`helloworld from ${path.basename(__filename)}`)
}


module.exports={
  sayHelloworld,
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
}