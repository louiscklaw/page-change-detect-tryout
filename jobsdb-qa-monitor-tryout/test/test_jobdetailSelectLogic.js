const {
  SRC_LIB,
  TEST_HOME,
  trueIfEqualArray,
  JSON_SAMPLE_JOB_DETAIL,
  JSON_SAMPLE_NEW_JOB_DETAILS
} = require( './common' )

const parseJobDetail = require(`${SRC_LIB}/parseJobDetail`)

const { assert } = require( 'console' )

const jobdetailSelectLogic = require(`${SRC_LIB}/jobdetailSelectLogic`)

function test_sendSlackAlert(){
  console.log(jobdetailSelectLogic.sendSlackAlert({hello:'world'}))
}

function test_jobdetailSelectLogic(){
  const result = jobdetailSelectLogic.jobdetailSelectLogic(JSON_SAMPLE_NEW_JOB_DETAILS).sort()

  assert(parseJobDetail.getJobId(result[0])=='100003007961010', 'test_jobdetailSelectLogic failed')

  assert(1==1, 'helloworld')
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
