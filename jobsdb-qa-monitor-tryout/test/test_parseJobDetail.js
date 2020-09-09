const fs = require('fs')
const {SRC_LIB, TEST_HOME, trueIfEqualArray, JSON_SAMPLE_NEW_JOB_DETAILS} = require('./common')
const { assert } = require( 'console' )

const parseJobDetail = require(`${SRC_LIB}/parseJobDetail`)

function test_getJobId(){
  // console.log(parseJobDetail.getJobId(JSON_SAMPLE_NEW_JOB_DETAILS[0]))
  assert('100003007961010'==parseJobDetail.getJobId(JSON_SAMPLE_NEW_JOB_DETAILS[0]), 'test call getJobData failed')
}

function test_getCompanyWebsite(){
  // console.log(parseJobDetail.getCompanyWebsite(JSON_SAMPLE_NEW_JOB_DETAILS[0]))
  assert('http://www.excel.com.hk'==parseJobDetail.getCompanyWebsite(JSON_SAMPLE_NEW_JOB_DETAILS[0]), 'test call getJobData failed')
}

function test_getJobTitle(){
  // console.log(parseJobDetail.getJobTitle(JSON_SAMPLE_NEW_JOB_DETAILS[0]))
  assert('Project Manager/System Analyst – Quality Assurance for banking project'==parseJobDetail.getJobTitle(JSON_SAMPLE_NEW_JOB_DETAILS[0]), 'test call getJobTitle failed')
}

function test_sayHelloworld(){
  return parseJobDetail.sayHelloworld()
}

function test(){
  test_sayHelloworld()
  // getTestJobDetail()
  test_getJobId()
  test_getCompanyWebsite()
  test_getJobTitle()
}

module.exports={
  test
}