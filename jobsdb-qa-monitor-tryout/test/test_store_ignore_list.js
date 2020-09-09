const fs = require('fs')
const path = require('path')
const process = require('process')
const chalk = require('chalk')
const {_} = require('lodash')

const {SRC_LIB, SRC_HOME, TEST_HOME} = require('./common')

const hubdb_helper = require(`${SRC_LIB}/hubdb_helper`)

function test_store_to_ignore_list_procedure(){

}

function test_sayHelloworld(){
  return hubdb_helper.sayHelloworld()
}

function test(){
  test_sayHelloworld()
  test_store_to_ignore_list_procedure()
}

module.exports={
  test
}
