var kart = require('nano')(process.env.DB_URL_SK)
var catalog = require('nano')(process.env.DB_URL_C)

function AddToBasket(name, quantity, username) {

  return new Promise((resolve, reject) => {
    catalog.get(name, (err, succ)=>{  //on récupère le catalogue  /!\ EST CE QU'IL NE FAUT PAS D'ABORD GET LE KART
      // POUR QUE LE RETURN new PROMISE SOIT CORRECT ET QU'ON NE RETOURNE PAS LE CATALOGUE ?
      if(succ){
        kart.get(username, (error, success) => {  //on recupère le panier
          var new_basket
          if(success){  //si le panier existe deja 
            new_basket = {
              '_rev': success._rev,
              'name': success.name.push("name"),
              'quantity': success.quantity.push("quantity"),
              'total_price': JSON.stringify(success.getInt("price") + succ.getInt("price")),
              'image_url': success.image_url.push(succ.image)
            }
          }else{  //sinon, on crée le panier
            new_basket = {
              'name': [name],
              'quantity': [quantity],
              'total_price': JSON.stringify(succ.getInt("price")),
              'image_url': [succ.image]
            }
          }
        })
      }else{
        reject(new Error("Erreur"))
      }
      kart.insert(new_basket, username, (error, success) => {
        if(success){
          resolve(name)
        }else{
          reject(new Error("Erreur d'ajout a la db"))
        }
      })
    })
    
  })
}

function getBasket(id) {
  return new Promise((resolve, reject) => {
    kart.get(id, (error, success) => {
      if (success) {
        resolve(success)
      } else {
        reject(new Error(`To fetch information of basket (${id}). Reason: ${error.reason}.`))
      }
    })
  })
}

module.exports = {
  AddToBasket,
  getBasket,
  //getKart
}
