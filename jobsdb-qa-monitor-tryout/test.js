#!/usr/bin/env node

function testFunction(cb) {
  cb(123321)
}

testFunction((output)=>{
  console.log(output)
})

console.log(testFunction((output)=>{
  return output
}))
