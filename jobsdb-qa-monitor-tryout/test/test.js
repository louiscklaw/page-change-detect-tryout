var assert = require( 'assert' );
const fs = require('fs')
const path = require('path')

const process = require('process')
const Hubdb = require('hubdb');
const hubdb_helper = require( '../src/hubdb_helper' );
const { updateData } = require( '../src/hubdb_helper' );

const GITHUB_TOKEN = process.env.GITHUB_TOKEN

var db = Hubdb({
  token: GITHUB_TOKEN,
  username: 'louiscklaw',
  repo: 'page-change-detect-tryout',
  branch: 'test_db'
 });

describe( 'Array', function () {
  var active_json_file = ''
  describe( 'inner', function () {

    it( 'should add into ignore list', function () {
      assert.equal( 1, 1, 'erorr helloworld' )

      db.add( { grass: 'green' }, function (err, result, id) {
        updateData(id, {sky: 'blue'},(err, result)=>{
          console.log('update done')


          db.get(id, (err, content)=>{
            console.log(content)
          })
        })
      } );
    } )

  } );

  after( function () {
    console.log('bye bye')
  } );

} );
