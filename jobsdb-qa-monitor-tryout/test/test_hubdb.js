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

const add_data = (o, cb) => db.add(o, cb)
const remove_json_file = (json_file_path, cb)=>db.remove(json_file_path, cb)
const get_data = (json_id, cb) => db.get(json_id, cb)

function test_add(){
  add_data({hello:'world'}, (err,res)=>{
    console.log(res.content.name)
  })
}

function test_remove(json_filename_to_remove){
  db.remove(json_filename_to_remove,(err,res)=>{
  })


}

function test_list(){
  db.list((err, a)=>{
    // console.log(JSON.stringify(a, null, 2))
    // const paths = a.map(x => x.path)

    return paths
  })

}

function test_get(){
  db.get("test_get.json",(err, contents)=>{
    console.log('get', contents)
    console.assert(contents==[{hello:'get'}], 'cannot get from hubdb')
  })
}

function test_update(){
  var target_json = latest_json()

  db.get('test_update.json', (err, contents)=>{
    console.assert(contents==[{hello:'no update'}], 'cannot find not updated from hubdb')
    db.update("test_update.json",{hello:'updated'},(err, result, id)=>{
      db.get('test_update.json',(err, contents)=>{
        console.assert(contents==[{hello:'updated'}], 'cannot find updated value')
      })
    })
  })

}

// (err, res) => {
//   console.log('adding done')
//   console.log(`json file added ${res.content.name}`)

//   return res.content.name

function test(){
  const filename = test_add()
  test_remove(filename)

  //  test_list()
  //  test_get()
  //  test_update()
  // console.log(`testing ${path.basename(__filename)}`)
}

module.exports={
  test
}