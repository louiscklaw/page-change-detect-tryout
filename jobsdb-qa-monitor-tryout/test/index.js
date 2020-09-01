console.log('test done')

const {
  sayHelloworld,
  getJobDescription,
  getJobData,
  getJobDetail,
  getJobId,
  getDeeperJobDetail,
  getPageUrl,
  getJobTitle,
  getCompanyWebsite,
  getJobTitleSlug,
  getJobRequirement
} = require('../src/parseJobDetail')

const {getTestJobDetail} = require('./test_parseJobDetail')

const test_json = getTestJobDetail()


console.assert(getJobTitleSlug(test_json)=='it-hardware-engineer','fail to get job title')

console.assert(getJobId(test_json)=='100003007947299', 'fail to get job id')

console.assert(getPageUrl(test_json)=='https://hk.jobsdb.com/hk/en/job/it-hardware-engineer-100003007947299','fail to get job detail page')
