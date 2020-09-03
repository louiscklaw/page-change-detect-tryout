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
    // console.log(JSON.stringify(a, null, 2))
    const paths = a.map(x => x.path)
    const first_path = paths[0]

    db.update(first_path,{hello:'first_path'}, (err, result, id)=>{
      console.log('result',result)
    })

  })

}

function test_get(cb){
  db.get("another_helloworld_db.json",(err, contents)=>{
    console.log('get,', contents)
  })
  return cb()
}

function test_update(){
  db.update("another_helloworld_db.json",{hello:'world'},(err, result, id)=>{
    console.log('result,', result)
    console.log('id,',id)
  })

}

function test(){
 console.log(`testing ${path.basename(__filename)}`)
 test_add()
 test_list()
}

module.exports={
  test
}