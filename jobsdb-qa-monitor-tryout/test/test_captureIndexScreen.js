const fs = require('fs')
const path = require('path')
const process = require('process')
const chalk = require('chalk')
const _ = require('lodash')

const {SRC_LIB, TEST_HOME, trueIfEqualArray} = require('./common')

const captureIndexScreen = require(`${SRC_LIB}/captureIndexScreen`)

function test_sayHelloworld(){
  return captureIndexScreen.sayHelloworld()
}

function test(){
  test_sayHelloworld()
}

module.exports={
  test
}
