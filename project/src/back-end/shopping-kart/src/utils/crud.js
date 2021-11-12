var kart = require('nano')(process.env.DB_URL_SK)

function AddToBasket(id, item) {
  //faire un getBasket puis ajouter l'item pour ecraser le tout
  //const basket = kart.getBasket(id)
  //const item = basket.item + item   //lol si ca marche (aucun espoir)
  return new Promise((resolve, reject) => {
    kart.insert(
      // 1st argument of nano.insert()
      {
        'item': item,

      },
      id, // 2nd argument of nano.insert()
      // callback to execute once the request to the DB is complete
      (error, success) => {
        if (success) {
          resolve(id)  //quand on fera le log, c'est ce qui va apparaitre?
        } else {
          reject(
            new Error(`In adding (${item}). Reason: ${error.reason}.`)
          )
        }
      }
    )
  })
}

function getBasket(id) {
  return new Promise((resolve, reject) => {
    kart.get(id, (error, success) => {
      if (success) {
        resolve(id)
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
