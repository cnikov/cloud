var kart = require('nano')(process.env.DB_URL_SK)
var catalog = require('nano')(process.env.DB_URL_C)

function AddToBasket(name, quantity, username) {

  return new Promise((resolve, reject) => {
    catalog.get(name, (err, succ)=>{  //on récupère le catalogue  /!\ EST CE QU'IL NE FAUT PAS D'ABORD GET LE KART
      // POUR QUE LE RETURN new PROMISE SOIT CORRECT ET QU'ON NE RETOURNE PAS LE CATALOGUE ?
      if(succ){
        kart.get(username, (error, success) => {  //on recupère le panier
          var new_basket
          if(success){  //si le panier existe deja ATTENTION AU PUSH QUI RETOURNE LA LONGUEUR !!
            success.name.push(name)
            success.quantity.push(quantity)
            success.image_url.push(succ.image)
            new_basket = {
              '_rev': success._rev,
              'name': success.name,
              'quantity': success.quantity,
              'image_url': success.image_url
            }
          }else{  //sinon, on crée le panier
            var nameList = []
            nameList.push(name)
            var quantityList = []
            quantityList.push(quantity)
            var imageList = []
            imageList.push(image_url)
            new_basket = {
              'name': nameList,
              'quantity': quantityList,
              'image_url': imageList
            }
          }
        })
      }else{
        reject(new Error("Erreur"))
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

function getBasket(username) {
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
          let index = succes.name.findIndex(x => x.name === name)
          var newName = succes.name.splice(index)
          var newQ = succes.quantity.splice(index)
          var newURL = succes.image_url.splice(index)
          var new_basket = {
            '_rev': succes._rev,
            'name': newName,
            'quantity': newQ,
            'image_url': newURL
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
