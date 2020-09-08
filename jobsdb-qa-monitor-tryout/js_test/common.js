const fs=require('fs')
const _ = require('lodash')

const TEST_HOME=__dirname
const PROJ_HOME=__dirname+'/..'
const SRC_HOME = PROJ_HOME+'/src'

function trueIfEqualArray(aA,aB, msg) {
  return JSON.stringify(_.sortedUniq(aA))==JSON.stringify(_.sortedUniq(aB))
}

module.exports={
  PROJ_HOME,
  TEST_HOME,
  SRC_HOME,
  trueIfEqualArray
}