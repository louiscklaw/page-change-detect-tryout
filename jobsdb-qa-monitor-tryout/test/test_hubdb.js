const fs = require('fs')
const path = require('path')

const process = require('process')
const Hubdb = require('hubdb')

const GITHUB_TOKEN = process.env.GITHUB_TOKEN

var db = Hubdb({
  token: GITHUB_TOKEN,
  username: 'louiscklaw',
  repo: 'page-change-detect-tryout',
  branch: 'test_db'
 });

function test_add(){
  return db.add({hello:"helloworld"}, function() {
    console.log('adding done')
    db.list(function(err, res) {
      console.log(res)
    });
  });

}

function test_list(){
  return db.list((err, a)=>{
    console.log(JSON.stringify(a, null, 2))
    return a.map(json_file => {
      try {
        db.update(json_file.path, {another:'helloworld'},(err, result, id)=>{
          if (err) throw err
          console.log('update done')
          console.log('result',result)
        })

      } catch (error) {
        console.error(`error during processing file ${json_file.path}`)
      }
    })
  })

}


function test(){
 console.log(`testing ${path.basename(__filename)}`)
 test_add()
}

module.exports={
  test
}