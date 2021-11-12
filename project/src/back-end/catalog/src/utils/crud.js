var kart = require('nano')(process.env.DB_URL_C)
var dbid = "b5c3b922b0c90cb73d136ccc3a0008c6"
function AddProduct(name, price, image, category, id) {
  //faire un getBasket puis ajouter l'item pour ecraser le tout
  //lol si ca marche (aucun espoir)
  return new Promise((resolve, reject) => {
    kart.insert(
      // 1st argument of nano.insert()
      {
        category: {
          id: {
            'name': name,
            'price': price,
            'image': image,
            'category': category
          }

        }


      },
      // 2nd argument of nano.insert()
      // callback to execute once the request to the DB is complete
      (error, success) => {
        if (success) {
          resolve(name)  //quand on fera le log, c'est ce qui va apparaitre?
        } else {
          reject(
            new Error(`In adding (${name}). Reason: ${error.reason}.`)
          )
        }
      }
    )
  })
}

function getProduct() {
  return new Promise((resolve, reject) => {
    kart.get(dbid)
    .then((error, success) => {
      if (success) {
        //console.log(success)
        resolve(success)
      } else {
        reject(new Error(`To fetch information of basket (${category}). Reason: ${error.reason}.`))
      }
    })
  })
}

module.exports = {
  AddProduct,
  getProduct,
  //getKart
}
