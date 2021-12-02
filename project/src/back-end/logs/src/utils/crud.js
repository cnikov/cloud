//nano url to couchdb databases 
//history database
var log = require('nano')(process.env.DB_URL_L)
// shopping cart database
//var cart = require('nano')(process.env.DB_URL_SK)
var axios = require('axios')
const url = "http://cloud-romtourpe.westeurope.cloudapp.azure.com:3002"

//post function to create document or update
function PostlogsUser(name,) {
  return new Promise((resolve, reject) => {
    //check if history already exists for a specific user
    log.get("user", (error, success) => {
      var newDoc
      if (success) {
        var userlist = success.value.list
        userlist.puts(name)
        newDoc = {
          '_rev': success._rev,
          "type": "user",
          "value": {
            "list":userlist
          }
        }
        log.insert(newDoc, success._id, (error, success) => {
          if (success) {
            resolve(name)
          } else {
            reject(new Error("Error to insert history"))
          }
        })
      } else {
        newDoc = {
          "type": "user",
          "value": {
            "list":[name]
          }
        }
        log.insert(newDoc, (error, success) => {
          if (success) {
            resolve(name)
          } else {
            reject(new Error("Error to insert history"))
          }
        })
      }
    })
  })
}
function PostlogsProduct(name,price,image,category,id){
  return new Promise((resolve, reject) => {
    log.insert({
      'type': 'product',
      'value':{
        'name':name, 
        'price':price,
        'image':image,
        'category':category,
        'id':id
      }
    })
  })
}

function getlogs(type) {

  return new Promise((resolve, reject) => {
    log.get(type, (error, success) => {
      if (success) {

        resolve(success)
      } else {
        reject(new Error(`To get history. Reason: ${error.reason}.`))
      }

    })
  })

}
module.exports = {
  PostlogsUser,
  PostlogsProduct,
  getlogs

}