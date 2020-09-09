const fs = require('fs')
const path = require('path')

const process = require('process')
const Hubdb = require('hubdb')

function sayHelloworld(){
  console.log(`helloworld from ${path.basename(__filename)}`)
}

module.exports={
  sayHelloworld
}