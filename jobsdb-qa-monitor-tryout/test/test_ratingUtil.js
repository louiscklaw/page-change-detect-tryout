const fs = require('fs')
const path = require('path')
const process = require('process')
const chalk = require('chalk')
const _ = require('lodash')

const {SRC_LIB, TEST_HOME, trueIfEqualArray} = require('./common')
const { assert } = require( 'console' )

const ratingUtil = require(`${SRC_LIB}/ratingUtil`)

function test_isEmpty(){
  assert( ratingUtil.isEmpty( '   ' ) == true )
  assert( ratingUtil.isEmpty( '' ) == true )
  assert( ratingUtil.isEmpty( 'apple' ) == false )
}

function test_isNull(){
  assert(ratingUtil.isNull(null) == true)
  assert(ratingUtil.isNull(1) != true)
}

function test_sayHelloworld(){
  return ratingUtil.sayHelloworld()
}

function test(){
  test_sayHelloworld()
  test_isEmpty()
  test_isNull()
}

module.exports={
  test
}
