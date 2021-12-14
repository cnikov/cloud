//nano url to couchdb databases 
//history database
var log = require('nano')(process.env.DB_URL_L)
// shopping cart database
//var cart = require('nano')(process.env.DB_URL_SK)



//post function to create document or update
function PostlogsRec(user,item, list1, list2) {
  return new Promise((resolve, reject) => {
    var newDoc
    //first we delete the item form the lists
    const index = list1.indexOf(item)
    list1.splice(index, 1)
    list2.splice(index, 1)

    log.get("recommendation", (error, success) => {
      if (success) {
        //check if the item is already in the recommendations
        //check first if the user is already in recomendaitons
        try{
          var updatingUser = success['value'][user][item]
        try{
          var ToUpdate = success['value'][user][item]['with']
          for (var i = 0; i < list1.length; i++) {
            // check if the item isq in the list 
            //the index to update uf the item exists
            var updIndex = ToUpdate.indexOf(list1[i])
            //if the item is not already in the "with" associations
            if (updIndex < 0) {
              //push the item in the list
              ToUpdate.push(list1[i])
              success['value'][user][item]['quantity'].push(list2[i])
            }
            //if the item already exists...
            else {
              //update the quantity
              success['value'][user][item]['quantity'][updIndex] = parseInt(success['value'][user][item]['quantity'][updIndex], 10) + parseInt(list2[i], 10)
            }
          }
          success['value'][user][item]['with'] = ToUpdate

        } catch (error) {
          //we have to create a new item in the list
          success['value'][user][item] = {
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
        })}catch (error) {
          success['value'][user] = {
            [item]:{
              'with':list1,
              'quantity':list2
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
      }
      else {
        newDoc = {
          'type': 'recommendation',
          'value': {[user]:{
            [item]: {
              'with': list1,
              'quantity': list2
            }
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
  })
}
//post the maximum id in the logs
function PostlogsId(id) {
  return new Promise((resolve, reject) => {
    log.get("id", (error, success) => {
      var newDoc
      if (success) {
        var current = parseInt(success.value.index, 10)
        //check if the id is greater than the actual id
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
//post a username in a list of username
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
//post a new product
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
//delete product from recommandation and products
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
          log.get('user',(error,reusi)=>{
            if(reusi){
              log.get('recommendation',(error, succ)=>{
                if(succ){
                for(var user of reusi.value.list){
                  try{
                    
                      var newDoc2
                      delete succ['value'][user][product]
                      var data =succ['value'][user]
                     
                      for(var item in data){
                        var list1 = data[item]['with']
                        var list2 = data[item]['quantity']
                        var index = list1.indexOf(product)
                        if(index >=0){
                          list1.splice(index,1)
                          list2.splice(index,1)
                          succ['value'][user][item]['with'] = list1
                          succ['value'][user][item]['quantity'] = list2
                        }
                      }
                      
                     
                  }catch(e){
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
               
  
                })}else{resolve(product)}
                
            })
            }else{resolve(product)}
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
function getView(){
  return new Promise((resolve, reject) => {
    log.get('_design/queries/_view/movies_per_category?group=true', (error, success) => {
      if (success) {

        resolve(success);
      } else {
        reject(new Error(`To get history. Reason: ${error.reason}.`))
      }

    })
  })

}
module.exports = {
  deleteProd,
  getView,
  PostlogsUser,
  PostlogsRec,
  PostlogsProduct,
  PostlogsId,
  getlogs

}