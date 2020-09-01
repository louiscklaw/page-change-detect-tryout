const fs = require('fs')
const process = require('process')
const Hubdb = require('hubdb')

const GITHUB_TOKEN = process.env.GITHUB_TOKEN

var db = Hubdb({
  token: GITHUB_TOKEN,
  username: 'louiscklaw',
  repo: 'page-change-detect-tryout',
  branch: 'db'
 });

// init record
db.add({hello:"中文字"}, function() {
  db.list(function(err, res) {
    console.log(res)
  });
});

db.list((err, a)=>{
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
  // a.forEach(json_file => {
  //   db.update(json_file.path, {another:'helloworld'},(err, result, id)=>{
  //     console.log('update done')
  //   })
  // })
})

// db.get("another_helloworld_db.json",(err, contents)=>{
//   console.log('get,', contents)
// })

// db.update("another_helloworld_db.json",{hello:'world'},(err, result, id)=>{
//   console.log('result,', result)
//   console.log('id,',id)
// })
