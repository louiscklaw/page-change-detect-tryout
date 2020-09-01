const {SRC_HOME} = require('./common')

const {getJobDetailId} = require(SRC_HOME+'/parseJobIndex')

function sayHelloworld(){
  console.log(`helloworld from ${__filename}`)
}

function test_getJobDetailId(){
  console.assert(getJobDetailId('jobCardHeading_100003007946839')=='100003007946839', 'error getting job detail id')
}

module.exports={
  sayHelloworld,
  test_getJobDetailId
}
