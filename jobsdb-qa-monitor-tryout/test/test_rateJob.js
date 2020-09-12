const {SRC_LIB, TEST_HOME, JSON_SAMPLE_JOB_DETAIL} = require('./common')

const rateJob = require(`${SRC_LIB}/rateJob`)

function test_rateJob(){
  console.log(rateJob.rateJob(JSON_SAMPLE_JOB_DETAIL))
}

function test_sayHelloworld(){
  return rateJob.sayHelloworld()
}

function test(){
  test_sayHelloworld()
  test_rateJob()
}

module.exports={
  test
}
