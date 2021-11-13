var kart = require('nano')(process.env.DB_URL_C)
function AddProduct(name, price, image, category, id) {
  //faire un getBasket puis ajouter l'item pour ecraser le tout
  //lol si ca marche (aucun espoir)
  return new Promise((resolve, reject) => {
    const db = kart.get('catalog')
    var newdb = db.token.catalog.category.insert(
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
      })
    kart.insert({
      catalog: newdb

    }, 'catalog',
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

function getProduct(dbid) {
  return new Promise((resolve, reject) => {
    kart.get(dbid, (error, success) => {
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
  AddProduct,
  getProduct,
  //getKart
}
