var kart = require('nano')(process.env.DB_URL_SK)
var catalog = require('nano')(process.env.DB_URL_C)

function AddToBasket(name, quantity, username, price, id) {

  return new Promise((resolve, reject) => {
    catalog.get(name, (err, succ)=>{  //on récupère le catalogue
      var new_basket
      if(succ){
        kart.get(username, (error, success) => {  //on recupère le panier
          if(success){  //si le panier existe deja
            var index = success.name.indexOf(name)
            console.log(index)
            console.log("cetait l'index")
            if (index <= -1){  //si l'objet n'est pas déja dans la db
              success.name.push(name)
              success.quantity.push(quantity)
              success.image.push(succ.image)
              success.price.push(price)
              success.id.push(id)
              new_basket = {
                '_rev': success._rev,
                'name': success.name,
                'quantity': success.quantity,
                'image': success.image,
                'price': success.price,
                'id': success.id
              }
            }else{
              console.log("tests sur les qtitess")
              console.log(index)
              console.log(success.quantity[index])
              success.quantity[index] = quantity + success.quantity[index]
              new_basket = {
                '_rev':  success._rev,
                'name': success.name,
                'quantity': success.quantity,
                'image': success.image,
                'price': success.price,
                'id': success.id
              }

            }
          }else{  //sinon, on crée le panier
            var nameList = []
            nameList.push(name)
            var quantityList = []
            quantityList.push(quantity)
            var imageList = []
            imageList.push(succ.image)
            var priceList = []
            priceList.push(succ.price)
            var idList = []
            idList.push(succ.id)
            new_basket = {
              'name': nameList,
              'quantity': quantityList,
              'image': imageList,
              'price': priceList,
              'id': idList
            }
          }
          kart.insert(new_basket, username, (error, suc) => {
            if(suc){
              resolve(username)
            }else{
              reject(new Error("Erreur d'ajout a la db"))
            }
          })

        })
      }else{
        reject(new Error("Erreur"))
      }
    })
    
  })
}

function getBasket(username) {
  console.log(username)
  return new Promise((resolve, reject) => {
    kart.get(username, (error, success) => {
      if (success) {
        resolve(success)
      } else {
        reject(new Error(`To fetch information of basket (${username}). Reason: ${error.reason}.`))
      }
    })
  })
}
function removeFromBasket(username, name){
  return new Promise((resolve, reject) =>{
    kart.get(username, (error, succes) => {
        if(succes){
          console.log(succes)
          let index = succes.name.indexOf(name)
          var newName = succes.name.splice(index,1)
          var newQ = succes.quantity.splice(index,1)
          var newURL = succes.image.splice(index,1)
          var newID = succes.id.splice(index,1)
          var new_basket = {
            '_rev': succes._rev,
            'name': newName,
            'quantity': newQ,
            'image': newURL,
            'id': newID
          }
        }
        kart.insert(new_basket, username, (error, success) => {
          if(success){
            resolve(username)
          }else{
            reject(new Error("Erreur d'ajout a la db"))
          }
          
    })
  })
})
}

module.exports = {
  AddToBasket,
  getBasket,
  removeFromBasket
}
