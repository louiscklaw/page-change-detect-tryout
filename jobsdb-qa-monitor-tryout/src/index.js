const fs = require('fs')
const _ = require('lodash')
const { updateData, getData, putNewJobsIdToIgnore } = require('./hubdb_helper')
const { getJobsdbIndexWithPageNumber } = require('./jobsdb_utils')
const { getNewJobsIdOnly } = require('./getNewJobsIdOnly')
const { fetchJobDetail, getJobDetailQuery } = require('./JobDetail')

// const {getJobTitleSlug} = require('./parseJobDetail')

const {extractJobsdbJobsIndexJobsDetailId} = require('./extractJobsdbIndex')

// const test_json = getTestJobDetail()

async function testFetch() {
  try {
    var fetched_jobs_detail_id = []

    // // TODO: convert to promise here !
    // var json_jobs_id_ignore=[]
    getData('jobs_id_ignore.json',(err, json_jobs_id_ignore)=>{
      const str_json_jobs_id_ignore = json_jobs_id_ignore.map((x)=> x.toString())
      // console.log(str_json_jobs_id_ignore)

      extractJobsdbJobsIndexJobsDetailId(getJobsdbIndexWithPageNumber(0))
        .then(fetched_jobs_detail_id => {
          // json_jobs_id_ignore

          const new_job_detail_id = getNewJobsIdOnly(fetched_jobs_detail_id, ['100003007947299'])

          // return new_job_detail_id
          return ['100003007947299','100003007947299']
        })

        .then((new_job_detail_id)=>{
          Promise.all(
            new_job_detail_id.map((x)=> fetchJobDetail( x ))
          ).then((values)=>{
            const job_details = values
            console.log(job_details)
            fs.writeFileSync('./new_job_details.json', JSON.stringify(job_details),{encoding:'utf-8'})
          })
          return new_job_detail_id
        })
        .then( (new_job_detail_id) => {

          const merged_list=[...str_json_jobs_id_ignore, ...new_job_detail_id]

          const int_merged_list = merged_list.map( x => parseInt(x))
          console.log(int_merged_list)


          putNewJobsIdToIgnore(int_merged_list, ()=>{
            console.log('store to ignore list done')
          })
        })


    })


  } catch (error) {
    console.error('error during running testFetch')
    throw error
  }

}

testFetch()
