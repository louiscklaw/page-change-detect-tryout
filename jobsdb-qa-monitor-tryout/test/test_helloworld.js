const fs = require('fs')
const path = require('path')
const process = require('process')

const {_} = require('lodash')

const {SRC_HOME, TEST_HOME} = require('./common')

const helloworld = require(`${SRC_HOME}/helloworld`)

function assertEqualArray(aA,aB, msg) {
  console.assert(JSON.stringify(_.sortedUniq(aA))==JSON.stringify(_.sortedUniq(aB)), msg)
}

function test_sayHelloworld(){
  return helloworld.sayHelloworld()
}

function test(){
  test_sayHelloworld()
}

module.exports={
  test
}
