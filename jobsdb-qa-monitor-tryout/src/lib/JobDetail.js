const fs = require('fs')
const path = require('path')

const fetch = require('node-fetch');

const test_header={
  'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:80.0) Gecko/20100101 Firefox/80.0',
  'Accept': '*/*',
  'Accept-Language': 'en-US,en;q=0.5',
  'Referer': 'https://hk.jobsdb.com/hk/jobs/information-technology/1?Key=quality%20assurance',
  'content-type': 'application/json',
  'Origin': 'https://hk.jobsdb.com',
  'DNT': '1',
  'Connection': 'keep-alive',
  'Pragma': 'no-cache',
  'Cache-Control': 'no-cache',
  'TE': 'Trailers'
}

function fetchJobDetail(jobs_detail_id){

  return fetch('https://xapi.supercharge-srp.co/job-search/graphql?country=hk',{
    method: 'post',
    body:    JSON.stringify(getJobDetailQuery(jobs_detail_id)),
    headers: test_header,
  })
    .then(r => r.json())

}

function getJobDetailQuery(jobs_detail_id){
  return {
    query: "query getJobDetail($jobId: String, $locale: String, $country: String, $candidateId: ID, $solVisitorId: String, $flight: String) {  jobDetail(jobId: $jobId, locale: $locale, country: $country, candidateId: $candidateId, solVisitorId: $solVisitorId, flight: $flight) {    id    pageUrl    jobTitleSlug    applyUrls {      mobile      external      loggedInApply    }    isExpired    isConfidential    isClassified    accountNum    advertisementId    subAccount    showMoreJobs    adType    header {      banner {        bannerUrls {          large        }      }      salary {        max        min        type        extraInfo        currency        isVisible      }      logoUrls {        small        medium        large        normal      }      jobTitle      company {        name        url      }      review {        rating        numberOfReviewer      }      expiration      postedDate      isInternship    }    companyDetail {      companyWebsite      companySnapshot {        avgProcessTime        registrationNo        employmentAgencyPersonnelNumber        employmentAgencyNumber        telephoneNumber        workingHours        website        facebook        size        dressCode        nearbyLocations      }      companyOverview {        html      }      videoUrl      companyPhotos {        caption        url      }    }    jobDetail {      summary      jobDescription {        html      }      jobRequirement {        careerLevel        yearsOfExperience        qualification        fieldOfStudy        industryValue {          value          label        }        skills        employmentType        languages        postedDate        closingDate        jobFunctionValue {          code          name          children {            code            name          }        }        benefits      }      whyJoinUs    }    location {      location      locationId      omnitureLocationId    }    sourceCountry  }}",
    variables: {
      "candidateId":"",
      "country":"hk",
      "jobId":jobs_detail_id.toString(),
      "locale":"en",
      "solVisitorId":"e0fc5116-dc4d-40e4-917d-0fc539d40e60"}

  }
  return test_body={
    query: "query getJobDetail($jobId: String, $locale: String, $country: String, $candidateId: ID, $solVisitorId: String, $flight: String) {  jobDetail(jobId: $jobId, locale: $locale, country: $country, candidateId: $candidateId, solVisitorId: $solVisitorId, flight: $flight) {    id    pageUrl    jobTitleSlug    applyUrls {      mobile      external      loggedInApply    }    isExpired    isConfidential    isClassified    accountNum    advertisementId    subAccount    showMoreJobs    adType    header {      banner {        bannerUrls {          large        }      }      salary {        max        min        type        extraInfo        currency        isVisible      }      logoUrls {        small        medium        large        normal      }      jobTitle      company {        name        url      }      review {        rating        numberOfReviewer      }      expiration      postedDate      isInternship    }    companyDetail {      companyWebsite      companySnapshot {        avgProcessTime        registrationNo        employmentAgencyPersonnelNumber        employmentAgencyNumber        telephoneNumber        workingHours        website        facebook        size        dressCode        nearbyLocations      }      companyOverview {        html      }      videoUrl      companyPhotos {        caption        url      }    }    jobDetail {      summary      jobDescription {        html      }      jobRequirement {        careerLevel        yearsOfExperience        qualification        fieldOfStudy        industryValue {          value          label        }        skills        employmentType        languages        postedDate        closingDate        jobFunctionValue {          code          name          children {            code            name          }        }        benefits      }      whyJoinUs    }    location {      location      locationId      omnitureLocationId    }    sourceCountry  }}",
    variables: {
      "candidateId":"",
      "country":"hk",
      "jobId": jobs_detail_id.toString(),
      "locale":"en",
      "solVisitorId":"e0fc5116-dc4d-40e4-917d-0fc539d40e60"}

  }

}

function sayHelloworld(){
  console.log(`helloworld from ${path.basename(__filename)}`)
}

fetch('https://xapi.supercharge-srp.co/job-search/graphql?country=hk',{
  method: 'post',
  body:    JSON.stringify(getJobDetailQuery('111')),
  headers: test_header,
})
  .then(r => r.json())

module.exports={
  sayHelloworld,
  fetchJobDetail,
  getJobDetailQuery
}