//nano url to couchdb databases 
//history database
var hist = require('nano')(process.env.DB_URL_H)
// shopping cart database
var cart = require('nano')(process.env.DB_URL_SK)

//post function to create document or update
function PostHistory(name) {
  return new Promise((resolve, reject) => {
    //check if history already exists for a specific user
    hist.get(name, (error, success) => {
      var newDoc
      if (success) {
        //get the shopping cart
        cart.get(name, (error, succ) => {
          if (succ) {
            var newFile = {
              'product': succ.name,
              'quantity': succ.quantity
            }

            success.purchase.push(newFile)
            for (var i = 0; i < succ.name.length; i++) {
              var index = success.items.indexOf(succ.name[i])

              //if the product has never been bought
              if (index <= -1) {
                success.items.push(succ.name[i])
                success.quantity.push(succ.quantity[i])

              }
            }



          }
          newDoc = {
            '_rev': success._rev,
            'purchase': success.purchase,
            'items': success.items,
            'quantity': success.quantity,


          }
          hist.insert(newDoc, name, (error, success) => {
            if (success) {
              resolve(name)
            } else {
              reject(new Error("Error to insert history"))
            }
          })

        })

      } else {
        //case if history does not exist
        cart.get(name, (error, succ) => {
          if (succ) {
            var newFile = {
              'product': succ.name,
              'quantity': succ.quantity
            }

            newDoc = {
              'purchase': [newFile],
              'items': succ.name,
              'quantity': succ.quantity,

            }
          }

          hist.insert(newDoc, name, (error, success) => {
            if (success) {
              resolve(name)
            } else {
              reject(new Error("Error to insert history"))
            }
          })
        })

      }
    })
  })
}
function getHistory(name) {
  return new Promise((resolve, reject) => {
    hist.get(name, (error, success) => {
      if (success) {

        resolve(success)
      } else {
        reject(new Error(`To get history. Reason: ${error.reason}.`))
      }

    })
  })

}
module.exports = {
  PostHistory,
  getHistory
  //getcatalog
}