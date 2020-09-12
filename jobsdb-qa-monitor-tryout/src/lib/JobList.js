#!/usr/bin/env node
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

const query_template={
  query: "query getLegacyJobs($country: String, $locale: String, $keyword: String, $createdAt: String, $jobFunctions: [Int], $categories: [String], $locations: [Int], $careerLevels: [Int], $minSalary: Int, $maxSalary: Int, $salaryType: Int, $candidateSalary: Int, $candidateSalaryCurrency: String, $datePosted: Int, $jobTypes: [Int], $workTypes: [String], $industries: [Int], $page: Int, $pageSize: Int, $companyId: String, $userAgent: String, $accNums: Int, $subAccount: Int, $minEdu: Int, $maxEdu: Int, $edus: [Int], $minExp: Int, $maxExp: Int, $seo: String, $searchFields: String, $candidateId: ID, $isDesktop: Boolean, $isCompanySearch: Boolean, $sort: String, $sVi: String, $duplicates: String, $flight: String, $solVisitorId: String) {  jobs(country: $country, locale: $locale, keyword: $keyword, createdAt: $createdAt, jobFunctions: $jobFunctions, categories: $categories, locations: $locations, careerLevels: $careerLevels, minSalary: $minSalary, maxSalary: $maxSalary, salaryType: $salaryType, candidateSalary: $candidateSalary, candidateSalaryCurrency: $candidateSalaryCurrency, datePosted: $datePosted, jobTypes: $jobTypes, workTypes: $workTypes, industries: $industries, page: $page, pageSize: $pageSize, companyId: $companyId, userAgent: $userAgent, accNums: $accNums, subAccount: $subAccount, minEdu: $minEdu, edus: $edus, maxEdu: $maxEdu, minExp: $minExp, maxExp: $maxExp, seo: $seo, searchFields: $searchFields, candidateId: $candidateId, isDesktop: $isDesktop, isCompanySearch: $isCompanySearch, sort: $sort, sVi: $sVi, duplicates: $duplicates, flight: $flight, solVisitorId: $solVisitorId) {    ...LegacyCompat_SearchResult  }}fragment LegacyCompat_SearchResult on SearchResult {  total  totalJobs  aigdpRelatedSearch  solMetadata  suggestedEmployer {    name    totalJobs  }  queryParameters {    key    searchFields    pageSize  }  gdpSearchAlgoGroup  experiments {    flight  }  jobs {    id    sourceCountryCode    isStandout    companyMeta {      id      isPrivate      name      logoUrl      slug    }    qualificationName    careerLevelName    workExperienceName    employmentTermName    jobTitle    jobUrl    jobTitleSlug    description    employmentTypes {      code      name    }    sellingPoints    locations {      code      name      slug      children {        code        name        slug      }    }    categories {      code      name      children {        code        name      }    }    postingDuration    postedAt    salaryRange {      currency      max      min      period      term    }    salaryVisible    bannerUrl    isClassified    solMetadata  }}",
  variables: {
    "careerLevels": [],
    "categories": [ "131" ],
    "country": "hk",
    "createdAt": null,
    "industries": [],
    "isDesktop": true,
    "jobFunctions": [ 131 ],
    "jobTypes": [],
    "keyword": "quality assurance",
    "locale": "en",
    "locations": [],
    "page": 4,
    "salaryType": 1,
    "solVisitorId": "e0fc5116-dc4d-40e4-917d-0fc539d40e60",
    "sVi": "",
    "userAgent": "Mozilla/5.0%20(X11;%20Ubuntu;%20Linux%20x86_64;%20rv:80.0)%20Gecko/20100101%20Firefox/80.0",
    "workTypes": []
  }
}


const query_template_test = (page_num) => {
  return {
    ...query_template,
    variables: {
      ...query_template.variables,
      page: page_num
    }
  }
}

function fetchJobList(page_num){

  return fetch('https://xapi.supercharge-srp.co/job-search/graphql?country=hk',{
    method: 'post',
    body:    JSON.stringify(query_template_test(page_num)),
    headers: test_header,
  })
    .then(r => r.json())

}

function sayHelloworld(){
  console.log(`helloworld from ${path.basename(__filename)}`)
}

module.exports={
  sayHelloworld,
  fetchJobList
}