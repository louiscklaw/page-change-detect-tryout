const fs = require('fs')
const path = require('path')
const process = require('process')

const {_} = require('lodash')

const {SRC_HOME, TEST_HOME} = require('./common')

const JobDetail = require(`${SRC_HOME}/JobDetail`)

function assertEqualArray(aA,aB, msg) {
  console.assert(JSON.stringify(_.sortedUniq(aA))==JSON.stringify(_.sortedUniq(aB)), msg)
}

function test_getRequestBody(){
  var {getJobDetailQuery} = JobDetail
  // TODO: assertion ?
  var result = getJobDetailQuery('100003007947299')
  // console.log('test result', result )
  JSON.stringify(result, null, 2)
}

function test_JobDetail(){
  var {fetchJobDetail, getJobDetailQuery} = JobDetail
  fetchJobDetail( '100003007947299' )
    .then( result => {

      console.assert( typeof result != 'undefined', 'result data errror' )
      console.assert( typeof result.data != 'undefined', 'cannot find data in fetched result' )
    } )
}

function test_sayHelloworld(){
  return JobDetail.sayHelloworld()
}

function test(){
  test_sayHelloworld()
  test_getRequestBody()
  test_JobDetail()
}

module.exports={
  test
}
