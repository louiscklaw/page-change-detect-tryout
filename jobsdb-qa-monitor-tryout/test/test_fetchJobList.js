const fs = require('fs')
const {SRC_LIB, TEST_HOME} = require('./common')

const fetchJobList = require(`${SRC_LIB}/fetchJobList`)

const test_job_list_json = fs.readFileSync(`${TEST_HOME}/test_job_list.json`,{encoding:'utf-8'})

function getTestJobDetail(){
  return JSON.parse(test_job_list_json)
}

function test_sayHelloworld(){
  return fetchJobList.sayHelloworld()
}

function test(){
  test_sayHelloworld()

  console.log('testing fetchJobList')
  fetchJobList.fetchJobList(1)
    .then(r_json => fs.writeFileSync('./jobsdb_index.json',JSON.stringify(r_json, null, 2), {encoding: 'utf-8'}))
    .then(r_json => console.log(JSON.stringify(r_json, null, 2)))
}

module.exports={
  getTestJobDetail,
  test
}