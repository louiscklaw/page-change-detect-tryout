const fs = require('fs')
const path = require('path')



const getJobsdbIndexWithPageNumber=(page_num)=>`https://hk.jobsdb.com/hk/jobs/information-technology/${page_num}?Key=quality%20assurance`

const getNewJobsIdOnly = (new_fetch_id_list, ignore_id_list) => {
  return new_fetch_id_list.filter(id => ignore_id_list.indexOf(id) == -1)
}

const sayHelloworld = () => {console.log(`helloworld from ${path.basename(__filename)}`)}

module.exports={
  getJobsdbIndexWithPageNumber,
  getNewJobsIdOnly,
  sayHelloworld
}