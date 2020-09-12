const fs = require('fs')
const {SRC_LIB, TEST_HOME, trueIfEqualArray} = require('./common')
const chalk = require('chalk')


const getNewJobsIdOnly = require(`${SRC_LIB}/getNewJobsIdOnly`)

function test_getNewJobsIdOnly(){
  var result=getNewJobsIdOnly.getNewJobsIdOnly([1,2,3,4],[1,2])
  console.assert(trueIfEqualArray([3,4],result, 'array error'), 'test error')

  var result1 = getNewJobsIdOnly.getNewJobsIdOnly([
    '100003007959152', '100003007958710',
    '100003007957777', '100003007957418',
    '100003007956116', '100003007955840',
    '100003007954994', '100003007953639',
    '100003007953741', '100003007953727',
    '100003005460460', '100003007953683',
    '100003007953108', '100003007952083',
    '100003007950955', '100003007948342',
    '100003007946839', '100003007945855',
    '100003007945334', '100003007944767',
    '100003007941951', '100003007941755',
    '100003007940711', '100003007939378',
    '100003007938838', '100003007938713',
    '100003007938646', '100003007938021',
    '100003007937194', '100003007937003'
  ],['100003007959152']
  )

  console.assert(trueIfEqualArray(
    // expected result
    [
      '100003007958710', '100003007957777',
      '100003007957418', '100003007956116',
      '100003007955840', '100003007954994',
      '100003007953639', '100003007953741',
      '100003007953727', '100003005460460',
      '100003007953683', '100003007953108',
      '100003007952083', '100003007950955',
      '100003007948342', '100003007946839',
      '100003007945855', '100003007945334',
      '100003007944767', '100003007941951',
      '100003007941755', '100003007940711',
      '100003007939378', '100003007938838',
      '100003007938713', '100003007938646',
      '100003007938021', '100003007937194',
      '100003007937003'
    ],
    // actual result
    result1, 'array error'), chalk.red('test error'))
}

function test_sayHelloworld(){
  return getNewJobsIdOnly.sayHelloworld()
}

function test(){
  test_sayHelloworld()
  test_getNewJobsIdOnly()
}

module.exports={
  getNewJobsIdOnly,
  test
}