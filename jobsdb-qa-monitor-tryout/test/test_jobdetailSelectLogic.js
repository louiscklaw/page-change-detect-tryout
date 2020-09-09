const fs = require('fs')
const path = require('path')
const process = require('process')
const chalk = require('chalk')
const _ = require('lodash')

const {SRC_LIB, TEST_HOME, trueIfEqualArray, JSON_SAMPLE_NEW_JOB_DETAILS} = require('./common')

const jobdetailSelectLogic = require(`${SRC_LIB}/jobdetailSelectLogic`)

function test_sendSlackAlert(){
  console.log(jobdetailSelectLogic.sendSlackAlert({hello:'world'}))
}

function test_jobdetailSelectLogic(){
  jobdetailSelectLogic.jobdetailSelectLogic(
    JSON_SAMPLE_NEW_JOB_DETAILS
  )
}

function test_sayHelloworld(){
  return jobdetailSelectLogic.sayHelloworld()
}

function test(){
  test_sayHelloworld()
  test_jobdetailSelectLogic()
  test_sendSlackAlert()
}

module.exports={
  test
}
