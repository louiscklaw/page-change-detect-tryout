const fs = require('fs')
const path = require('path')

const process = require('process')


function sayHelloworld(){
  console.log(`helloworld from ${path.basename(__filename)}`)
}

module.exports={
  sayHelloworld
}