const fs = require('fs')
const path = require('path')

const process = require('process')
const Hubdb = require('hubdb')

const GITHUB_TOKEN = process.env.GITHUB_TOKEN

var db = Hubdb({
  token: GITHUB_TOKEN,
  username: 'louiscklaw',
  repo: 'page-change-detect-tryout',
  branch: 'db'
 });

const addData = (o, cb) => db.add(o, cb)
const removeJsonFile = (json_file_path, cb)=>db.remove(json_file_path, cb)
const getData = (json_id, cb) => db.get(json_id, cb)
const updateData = (json_id,data, cb)=>db.update(json_id, data, cb)

module.exports={
  addData,
  removeJsonFile,
  getData,
  updateData
}
