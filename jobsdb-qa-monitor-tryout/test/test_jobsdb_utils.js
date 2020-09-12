const fs = require('fs')
const path = require('path')
const process = require('process')

const _ = require('lodash')

const {SRC_LIB, TEST_HOME} = require('./common')

const jobsdb_utils = require(`${SRC_LIB}/jobsdb_utils`)

function assertEqualArray(aA,aB, msg) {
  console.assert(JSON.stringify(_.sortedUniq(aA))==JSON.stringify(_.sortedUniq(aB)), msg)
}

function test_getNewJobsIdOnly(){
  var {getNewJobsIdOnly}= jobsdb_utils
  assertEqualArray([3],getNewJobsIdOnly([1,2,3],[1,2,4]),'failed to get new jobs only')
}

function test_sayHelloworld(){
  return jobsdb_utils.sayHelloworld()
}

function test(){
  test_sayHelloworld()
  test_getNewJobsIdOnly()
}

module.exports={
  test
}
