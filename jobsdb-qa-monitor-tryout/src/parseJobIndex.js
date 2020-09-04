const fs = require('fs')
const path = require('path')

function sayHelloworld(){
  console.log(`helloworld from ${path.basename(__filename)}`)
}

function getJobDetailId(full_aria_described_by){
  return full_aria_described_by.split('_')[1]
}

function getJobCardFromIndex(index_page_html){
  // TODO: implement me
}

function getJobsIdFromJobCard(index_page_html){
  // TODO: implement me
}

module.exports={
  sayHelloworld,
  getJobCardFromIndex,
  getJobsIdFromJobCard,
  getJobDetailId
}
