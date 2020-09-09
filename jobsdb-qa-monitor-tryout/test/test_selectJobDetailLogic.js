const fs = require('fs')
const path = require('path')
const process = require('process')
const chalk = require('chalk')
const {_} = require('lodash')

const {SRC_LIB, TEST_HOME, trueIfEqualArray} = require('./common')

const selectJobDetailLogic = require(`${SRC_LIB}/selectJobDetailLogic`)

function test_sayHelloworld(){
  return selectJobDetailLogic.sayHelloworld()
}

function test(){
  test_sayHelloworld()
}

module.exports={
  test
}
