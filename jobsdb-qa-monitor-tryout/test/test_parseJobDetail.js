const fs = require('fs')
const {SRC_HOME, TEST_HOME} = require('./common')

const test_job_detail_json = fs.readFileSync(`${TEST_HOME}/test_job_detail.json`,{encoding:'utf-8'})

function sayHelloworld(){
  console.log(`helloworld from ${__filename}`)
}

function getTestJobDetail(){
  return JSON.parse(test_job_detail_json)
}

module.exports={
  sayHelloworld,
  getTestJobDetail
}