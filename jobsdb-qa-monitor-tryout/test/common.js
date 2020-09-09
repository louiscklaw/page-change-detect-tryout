const fs=require('fs')
const _ = require('lodash')

const {SRC_LIB, SRC_HOME, PROJ_HOME}=require('../src/lib/common')
const TEST_HOME=__dirname



function trueIfEqualArray(aA,aB, msg) {
  return JSON.stringify(_.sortedUniq(aA))==JSON.stringify(_.sortedUniq(aB))
}

module.exports={
  PROJ_HOME,
  TEST_HOME,
  SRC_HOME,
  SRC_LIB,
  trueIfEqualArray
}