const fs = require('fs')
const {SRC_LIB, TEST_HOME} = require('./common')

const parseJobDetail = require(`${SRC_LIB}/parseJobDetail`)

const test_job_detail_json = fs.readFileSync(`${TEST_HOME}/test_job_detail.json`,{encoding:'utf-8'})

function getTestJobDetail(){
  return JSON.parse(test_job_detail_json)
}

function test_sayHelloworld(){
  return parseJobDetail.sayHelloworld()
}

function test(){
  test_sayHelloworld()
}

module.exports={
  test
}