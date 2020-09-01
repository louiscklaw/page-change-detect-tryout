console.log('helloworld')

const {getJobTitleSlug} = require('./parseJobDetail')

const test_json = getTestJobDetail()

console.log(
  getJobTitleSlug(test_json)
)