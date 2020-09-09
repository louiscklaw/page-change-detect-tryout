const path = require('path')
const {countByOccurence} = require('./countByOccurence')

const parseJobDetail = require('./parseJobDetail')
const ratingUtil = require('./ratingUtil')

function performWordCount(json_in){
  const job_title = parseJobDetail.getJobTitle(json_in)
  console.log(parseJobDetail.getJobId(json_in))

  return [
      countByOccurence(job_title, 'QA'),
    ]
}

function rateJob(json_in){
  return  performWordCount(json_in).reduce((x,y) => x+y)
}

function sayHelloworld(){
  console.log(`helloworld from ${path.basename(__filename)}`)
}

module.exports={
  rateJob,
  sayHelloworld
}
