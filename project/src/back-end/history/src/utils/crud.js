//nano url to couchdb databases 
//history database
var hist = require('nano')(process.env.DB_URL_H)
// shopping cart database
//var cart = require('nano')(process.env.DB_URL_SK)
var axios = require('axios')
const url = "http://cloud-romtourpe.westeurope.cloudapp.azure.com:3006"

//post function to create document or update
function PostHistory(name) {
  return new Promise((resolve, reject) => {
    //check if history already exists for a specific user
    hist.get(name, (error, success) => {
      var newDoc
      if (success) {
        //get the shopping cart
        axios.get(`${url}/shopping-kart/${name}`)  //call sk microservice
          .then((res) => {
            if (res) {
              let names = res.data.token.name
              var newFile = {
                'product': names,
                'quantity': res.data.token.quantity
              }
              success.purchase.push(newFile)
              for (var i = 0; i < names.length; i++) {
                var index = success.items.indexOf(names[i])

                //if the product has never been bought
                if (index <= -1) {
                  success.items.push(names[i])
                  success.quantity.push(res.data.token.quantity[i])

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
        axios.get(`${url}/shopping-kart/${name}`)  //call sk microservice
          .then((res) => {
            if (res) {
              console.log(res.data.token)
              let names = res.data.token.name
              let qtity = res.data.token.quantity
              var newFile = {
                'product': names,
                'quantity': qtity
              }

              newDoc = {
                'purchase': [newFile],
                'items': names,
                'quantity': qtity,

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

}