const fs=require('fs')
const _ = require('lodash')

const {SRC_LIB, SRC_HOME, PROJ_HOME}=require('../src/lib/common')
const TEST_HOME = __dirname

const JSON_SAMPLE_HOME = `${TEST_HOME}/json_samples`
const SAMPLE_NEW_JOB_DETAILS_FILEPATH = `${JSON_SAMPLE_HOME}/sample_new_job_details.json`

const JSON_SAMPLE_NEW_JOB_DETAILS=JSON.parse(fs.readFileSync(SAMPLE_NEW_JOB_DETAILS_FILEPATH,{encoding:'utf-8'}))

function trueIfEqualArray( aA, aB, msg ) {
  return JSON.stringify( _.sortedUniq( aA ) ) == JSON.stringify( _.sortedUniq( aB ) )
}

module.exports = {
  PROJ_HOME,
  TEST_HOME,
  SRC_HOME,
  SRC_LIB,
  trueIfEqualArray,
  JSON_SAMPLE_NEW_JOB_DETAILS
}