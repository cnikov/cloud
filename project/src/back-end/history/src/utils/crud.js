var hist = require('nano')(process.env.DB_URL_H)
var cart = require('nano')(process.env.DB_URL_SK)


function PostHistory(name) {
  return new Promise((resolve, reject) => {
    hist.get(name, (error, success) => {
      var newDoc
      if (success) {
        cart.get(name, (error, succ) => {
          if (succ) {
            var newFile = {
              'product': succ.name,
              'quantity': succ.quantity
            }
            success.purchase.push(newFile)
            var amount = 0
            for (var i = 0; i < succ.name.length; i++) {
              amount = amount + succ.quantity[i] * parseInt(succ.price[i], 10)
              var index = success.items.indexOf(succ.name[i])
              console.log(index)
              console.log("cetait l'index")
              if (index <= -1) {
                success.items.push(succ.name[i])
                success.quantity.push(succ.quantity[i])

              }
            }
            success.totalAmount.push(amount)


          }
          newDoc = {
            '_rev': success._rev,
            'purchase': success.purchase,
            'items': success.items,
            'quantity': success.quantity,
            'totalAmount': success.totalAmount

          }
          hist.insert(newDoc, name, (error, success) => {
            if (success) {
              resolve(name)
            } else {
              reject(new Error("Erreur d'ajout a la db"))
            }
          })

        })

      } else {
        cart.get(name, (error, succ) => {
          if (succ) {
            var newFile = {
              'product': succ.name,
              'quantity': succ.quantity
            }
            var amount
            for (var i = 0; i < succ.name.length; i++) {
              amount = amount + succ.quantity[i] * parseInt(succ.price[i], 10)
            }
            newDoc = {
              'purchase': [newFile],
              'items': succ.name,
              'quantity': succ.quantity,
              'totalAmount': [amount]
            }
          }

          hist.insert(newDoc, name, (error, success) => {
            if (success) {
              resolve(name)
            } else {
              reject(new Error("Erreur d'ajout a la db"))
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
        //console.log(success)
        resolve(success)
      } else {
        reject(new Error(`To fetch information of basket. Reason: ${error.reason}.`))
      }

    })
  })

}
module.exports = {
  PostHistory,
  getHistory
  //getcatalog
}