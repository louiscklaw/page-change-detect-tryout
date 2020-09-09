const fs = require('fs')
const _ = require('lodash')

const {SRC_LIB} = require('./lib/common')
const { Console } = require( 'console' )

const { updateData, getData, putNewJobsIdToIgnore } = require(`${SRC_LIB}/hubdb_helper`)

const { getJobsdbIndexWithPageNumber } = require(`${SRC_LIB}/jobsdb_utils`)
const { getNewJobsIdOnly } = require(`${SRC_LIB}/getNewJobsIdOnly`)
const { fetchJobDetail, getJobDetailQuery } = require(`${SRC_LIB}/JobDetail`)
const {extractJobsdbJobsIndexJobsDetailId} = require(`${SRC_LIB}/extractJobsdbIndex`)

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
        console.log('FETCH: fetch jobs id')

        const new_job_detail_id = getNewJobsIdOnly(fetched_jobs_detail_id, str_json_jobs_id_ignore)

        // return new_job_detail_id
        if (new_job_detail_id.length  > 0){
          console.log('FETCH:new job detail id found')
        }else{
          console.log('FETCH:no job detail id found, exit process')
          process.exit(-1)
        }

        return new_job_detail_id
      })

      .then(async (new_job_detail_id)=>{
        // fetch new job detail
        console.log('FETCH: fetching new job detail')


        var test = await Promise.all(
          new_job_detail_id.map((x)=> fetchJobDetail( x ))
        ).then((values)=>{
          const job_details = values

          fs.writeFileSync('./new_job_details.json', JSON.stringify(job_details),{encoding:'utf-8'})
          return values
        })

        // console.log(test)
        return [new_job_detail_id, test]

      })
      .then((values)=>{
        console.log('SELECT: passing through selection logic')
        const new_job_detail_id = values[0]
        const job_details = values[1]

        fs.writeFileSync('./job_details.json', JSON.stringify(job_details),{encoding:'utf-8'})

        // update and send slack if job fullfill requirement
        const job_details_meet_requirement = jobdetailSelectLogic(job_details)
        const test = sendSlackAlert(job_details_meet_requirement)

        // console.log(job_details)
        return new_job_detail_id
      })

      // // TODO: resume me on production run
      // .then( (new_job_detail_id, job_details) => {
      //   // store processed jobs id into ignore list
      //   const merged_list=[...str_json_jobs_id_ignore, ...new_job_detail_id]
      //   const int_merged_list = merged_list.map( x => parseInt(x))
      //   putNewJobsIdToIgnore(_.uniq(int_merged_list).sort(), ()=>{
      //     console.log('store to ignore list done')
      //   })
      // })

    })


  } catch (error) {
    console.error('error during running testFetch')
    throw error
  }

}

testFetch()
