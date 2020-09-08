const { after } = require( "lodash" )


function getNewJobsIdOnly(today_jobs_detail_id, ignore_jobs_detail_id){
  var after_filter = today_jobs_detail_id.filter( (x) => { return ignore_jobs_detail_id.indexOf(x) == -1})
  return after_filter
}

function sayHelloworld(){
  console.log(`helloworld from ${__filename}`)
}

module.exports={
  sayHelloworld,
  getNewJobsIdOnly
}
