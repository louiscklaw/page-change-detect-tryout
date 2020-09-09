const path = require('path')

function countByOccurence(){
  return 1
}

function sayHelloworld(){
  console.log(`helloworld from ${path.basename(__filename)}`)
}

module.exports={
  countByOccurence,
  sayHelloworld
}
