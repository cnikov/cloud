//nano url to couchdb databases 
//history database
var log = require('nano')(process.env.DB_URL_L)
// shopping cart database
//var cart = require('nano')(process.env.DB_URL_SK)



//post function to create document or update
function PostlogsId(id){
  return new Promise((resolve, reject) => {
    log.get("id",(error,success) =>{
      var newDoc
      if(success){
        var current = parseInt(success.value.index,10)
        if(id>current){
          newDoc = {
            '_rev':success._rev,
            'type':'id',
            'value':{
              'index':index
            }
          }
          log.insert(newDoc, 'id', (error, success) => {
            if (success) {
              resolve(id)
            } else {
              reject(new Error("Error to insert history"))
            }
          })
        }
      }else{
        newDoc = {
          'type':'id',
          'value':{
            'index':index
          }
      }
      log.insert(newDoc, 'id', (error, success) => {
        if (success) {
          resolve(id)
        } else {
          reject(new Error("Error to insert history"))
        }
      })
    }
  })

  })
}
function PostlogsUser(name) {
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
        log.insert(newDoc, 'user', (error, success) => {
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
        log.insert(newDoc,'user', (error, success) => {
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
    var newDoc
    log.get('product',(error,success)=>{
      if(success){
      newDoc = {
      '_rev':success._rev,
      'type': 'product',
      'value': success.value,
          }
          //update
      try {
        newDoc['value'][name] = {
          'name':name, 
          'price':price,
          'image':image,
          'category':category,
          'id':id
        }
      }
      //add new item 
      catch (error) {
        newDoc['value'][name] = {
          'name':name, 
          'price':price,
          'image':image,
          'category':category,
          'id':id
        }
      }
      log.insert(newDoc, 'product', (error, success) => {
        if (success) {
          resolve(name)
        } else {
          reject(new Error("Error to insert history"))
        }
      })
      }
      else{
        newDoc = {
      'type': 'product',
      'value':{
        [name]:{
          'name':name, 
          'price':price,
          'image':image,
          'category':category,
          'id':id
        }
        
      }
        }
        log.insert(newDoc, 'product', (error, success) => {
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
  PostlogsId,
  getlogs

}