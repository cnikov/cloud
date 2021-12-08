const axios = require('axios')
var kart = require('nano')(process.env.DB_URL_SK)
var url = "http://cloud-romtourpe.westeurope.cloudapp.azure.com:3005"
//Add an item to the user's basket
function AddToBasket(name, quantity, username, price, id) { 

  return new Promise((resolve, reject) => {
    axios.get(`${url}/catalog/${name}`)
      .then((res) => {
        var new_basket
      if(res){
        kart.get(username, (error, success) => {  //on recupère le panier
          if(success){  //si le panier existe deja
            var index = success.name.indexOf(name)
            if (index <= -1){  //si l'objet n'est pas déja dans la db
              success.name.push(name)
              success.quantity.push(quantity)
              success.image.push(res.data.token.image)
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
            imageList.push(res.data.token.image)
            var priceList = []
            priceList.push(res.data.token.price)
            var idList = []
            idList.push(res.data.token.id)
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
//Recuperer le panier d'un user
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
//Retirer un item d'un user, name est de nom de l'item a retirer
function removeFromBasket(username, name){
  return new Promise((resolve, reject) =>{
    kart.get(username, (error, succes) => {
        if(succes){
          let index = succes.name.indexOf(name)
          succes.name.splice(index,1)
          succes.price.splice(index, 1)
          succes.quantity.splice(index,1)
          succes.image.splice(index,1)
          succes.id.splice(index,1)
          var new_basket = {
            '_rev': succes._rev,
            'name': succes.name,
            'quantity': succes.quantity,
            'image': succes.image,
            'id': succes.id,
            'price': succes.price
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

//Retirer tous les items du panier d'un user.
function removeAllBasket(username){
  return new Promise((resolve, reject) =>{
    kart.get(username, (error, succes) => {
        if(succes){
          let n = []
          var new_basket = {
            '_rev': succes._rev,
            'name': n,
            'quantity': n,
            'image': n,
            'id': n,
            'price': n
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
  removeFromBasket,
  removeAllBasket,

}
