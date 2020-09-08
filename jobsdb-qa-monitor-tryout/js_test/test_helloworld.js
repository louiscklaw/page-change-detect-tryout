const fs = require('fs')
const path = require('path')
const process = require('process')
const chalk = require('chalk')
const {_} = require('lodash')

const {SRC_HOME, TEST_HOME, trueIfEqualArray} = require('./common')

const helloworld = require(`${SRC_HOME}/helloworld`)

function test_sayHelloworld(){
  return helloworld.sayHelloworld()
}

function test(){
  test_sayHelloworld()
}

module.exports={
  test
}
