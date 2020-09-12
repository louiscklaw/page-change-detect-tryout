const path = require('path')

function isEmpty(string_in){
  return string_in.trim() == ''
}

function isNotEmpty(string_in){
  return !isEmpty(string_in)
}

function isNull(o_in){
  return o_in == null
}

function sayHelloworld(){
  console.log(`helloworld from ${path.basename(__filename)}`)
}

module.exports={
  sayHelloworld,
  isNotEmpty,
  isEmpty,
  isNull
}
