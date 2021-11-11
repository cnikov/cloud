var kart = require('nano')(process.env.DB_URL)

function AddProduct(name, price, image, category) {
  //faire un getBasket puis ajouter l'item pour ecraser le tout
  const basket = kart.getBasket(id)
  const item = basket.item + item   //lol si ca marche (aucun espoir)
  return new Promise((resolve, reject) => {
    kart.insert(
      // 1st argument of nano.insert()
      {
        'name': name,
        'price': price,
        'image': image,
        'category': category

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

function getProduct(name, category) {
  return new Promise((resolve, reject) => {
    kart.get(category, (error, success) => {
      if (success) {
        resolve(id)
      } else {
        reject(new Error(`To fetch information of basket (${category}). Reason: ${error.reason}.`))
      }
    }).get(name, (error, success) => {
      if (success) {
        resolve(name);
      } else {
        reject(new Error(`To fetch information of basket (${name}). Reason: ${error.reason}.`))
      }
    })
  })
}

module.exports = {
  AddProduct,
  getProduct,
  //getKart
}
