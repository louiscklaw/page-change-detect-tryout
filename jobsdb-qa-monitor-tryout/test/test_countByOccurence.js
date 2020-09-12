const fs = require('fs')
const path = require('path')
const process = require('process')
const chalk = require('chalk')
const _ = require('lodash')

const {SRC_LIB, TEST_HOME, trueIfEqualArray} = require('./common')
const { assert } = require( 'console' )

const countByOccurence = require(`${SRC_LIB}/countByOccurence`)

function test_countByOccurence(){
  const result = countByOccurence.countByOccurence('a-a-a','a')
  assert(1==result, 'test_countByOccurence failed')
}

function test_sayHelloworld(){
  return countByOccurence.sayHelloworld()
}

function test(){
  test_sayHelloworld()
  test_countByOccurence()
}

module.exports={
  test
}
