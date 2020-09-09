const fs = require('fs')
const {SRC_LIB, TEST_HOME} = require('./common')

const parseJobIndex = require(`${SRC_LIB}/parseJobIndex`)

function test_getJobDetailId(){
  console.assert(getJobDetailId('jobCardHeading_100003007946839')=='100003007946839', 'error getting job detail id')
}

function test(){
  parseJobIndex.sayHelloworld()
}

module.exports={
  test,
  test_getJobDetailId
}
