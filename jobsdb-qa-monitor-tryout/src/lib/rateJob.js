const path = require('path')

function rateJob(json_in){
  return  [
    1,2,3,4,5
    ].reduce((x,y) => x+y)
}

function sayHelloworld(){
  console.log(`helloworld from ${path.basename(__filename)}`)
}

module.exports={
  rateJob,
  sayHelloworld
}
