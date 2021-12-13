//nano url to couchdb databases 
//history database
var log = require('nano')(process.env.DB_URL_L)
// shopping cart database
//var cart = require('nano')(process.env.DB_URL_SK)



//post function to create document or update
function PostlogsRec(list1, list2) {
  return new Promise((resolve, reject) => {
    for(item of list1) {
    console.log(list1)
    console.log(list2)
    var newDoc
    const index = list1.indexOf(item)
    list1.splice(index, 1)
    list2.splice(index, 1)
    log.get("recommendation", (error, success) => {
      if (success) {
        try {
          var ToUpdate = success['value'][item]['with']
          for (var i = 0; i < list1.length; i++) {
            var updIndex = ToUpdate.indexOf(list1[i])
            if (updIndex < 0) {
              ToUpdate.push(list1[i])
              success['value'][item]['quantity'].push(list2[i])
            }
            else {
              success['value'][item]['quantity'] = parseInt(success['value'][item]['quantity'], 10) + parseInt(list2[i], 10)
            }
          }
          success['value'][item]['with'] = ToUpdate

        } catch (error) {
          success['value'][item] = {
            'with': list1,
            'quantity': list2
          }
        }
        newDoc = {
          '_rev': success._rev,
          'type': success.type,
          'value': success.value
        }
        //update db
        log.insert(newDoc, 'recommendation', (error, success) => {
          if (success) {
            resolve(item)
          } else {
            reject(new Error("Error to insert history"))
          }
        })
      }
      else {
        newDoc = {
          'type': 'recommendation',
          'value': {
            [item]: {
              'with': list1,
              'quantity': list2
            }
          }
        }
        log.insert(newDoc, 'recommendation', (error, success) => {
          if (success) {
            resolve(item)
          } else {
            reject(new Error("Error to insert history"))
          }
        })
      }
    })
  }

  })
}
function PostlogsId(id) {
  return new Promise((resolve, reject) => {
    log.get("id", (error, success) => {
      var newDoc
      if (success) {
        var current = parseInt(success.value.index, 10)
        console.log(current)
        if (parseInt(id) > current) {
          newDoc = {
            '_rev': success._rev,
            'type': 'id',
            'value': {
              'index': id
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
      } else {
        newDoc = {
          'type': 'id',
          'value': {
            'index': id
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
        userlist.push(name)
        newDoc = {
          '_rev': success._rev,
          "type": "user",
          "value": {
            "list": userlist
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
            "list": [name]
          }
        }
        log.insert(newDoc, 'user', (error, success) => {
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
function PostlogsProduct(name, price, image, category, id) {
  return new Promise((resolve, reject) => {
    var newDoc
    log.get('product', (error, success) => {
      if (success) {
        newDoc = {
          '_rev': success._rev,
          'type': 'product',
          'value': success.value,
        }
        //update
        try {
          newDoc['value'][name] = {
            'name': name,
            'price': price,
            'image': image,
            'category': category,
            'id': id
          }
        }
        //add new item 
        catch (error) {
          newDoc['value'][name] = {
            'name': name,
            'price': price,
            'image': image,
            'category': category,
            'id': id
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
      else {
        newDoc = {
          'type': 'product',
          'value': {
            [name]: {
              'name': name,
              'price': price,
              'image': image,
              'category': category,
              'id': id
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
function deleteProd(product){
  //first product
  return new Promise((resolve, reject) => {
  log.get("product",(error, success) => {
    var newDoc
    if(success){
      delete success['value'][product]
      newDoc = {
        '_rev': success._rev,
        'value': success.value
      }
      log.insert(newDoc,"product",(error, succes) => {
        if (succes) {
          // delete in recommendations.
          log.get('recommendation',(error, succ)=>{
            if(succ){
              var newDoc2
              delete succ['value'][product]
              var data =succ.value
              console.log(data)
              for(var item in data){
                console.log(item)
                var list1 = data[item]['with']
                console.log(list1)
                var list2 = data[item]['quantity']
                var index = list1.indexOf(product)
                if(index >=0){
                  list1.splice(index,1)
                  list2.splice(index,1)
                  succ['value'][item]['with'] = list1
                  succ['value'][item]['quantity'] = list2
                }
              }
              newDoc2 = {
                '_rev': succ._rev,
                'value': succ.value
              }
           
              log.insert(newDoc2,"recommendation",(error, successe) => {
                if (successe) {
                    resolve(product)
              }
              else {
                reject(new Error("Error to insert history"))
              }
             

              })
          }
        })
        }
         else {
          reject(new Error("Error to insert history"))
        }
        

      })
    }
  })
})
}
module.exports = {
  deleteProd,
  PostlogsUser,
  PostlogsRec,
  PostlogsProduct,
  PostlogsId,
  getlogs

}