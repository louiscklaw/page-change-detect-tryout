const {_} = require('lodash')
const {updateData, getData} = require('./hubdb_helper')

const {
  getJobsdbIndexWithPageNumber
} = require('./jobsdb_utils')

// const {getJobTitleSlug} = require('./parseJobDetail')

const {extractJobsdbJobsIndexJobsDetailId} = require('./extractJobsdbIndex')

// const test_json = getTestJobDetail()

async function testFetch() {
  try {
    var fetched_jobs_detail_id = []

    // TODO: convert to promise here !
    var json_jobs_id_ignore=[]
    getData('jobs_id_ignore.json',(err, content)=>{
      json_jobs_id_ignore = content
      console.log(content)
    })

    // E
    for (i=0; i< 2+1; i++){
      var temp = await extractJobsdbJobsIndexJobsDetailId(getJobsdbIndexWithPageNumber(i))
      fetched_jobs_detail_id.push(...temp)
    }

    const new_job_detail_id = getNewJobsIdOnly(fetched_jobs_detail_id, json_jobs_id_ignore)

    // T
    fetchJobDetail(getJobDetailQuery('100003007950955'))

    // L


    // save

    json_jobs_id_ignore.push(...all_jobs_detail_id)

    // TODO: add sorting here
    var json_to_store = _.uniq(json_jobs_id_ignore)

    updateData('jobs_id_ignore.json',json_to_store,(err, res)=>{
      console.log(res)
    })

    // done

  } catch (error) {
    console.error('error during running testFetch')
    throw error
  }

}

testFetch()