var kart = require('nano')(process.env.DB_URL_C)
function AddProduct(name, price, image, category, id) {
  //faire un getBasket puis ajouter l'item pour ecraser le tout
  //lol si ca marche (aucun espoir)
  return new Promise((resolve, reject) => {
    var catalog = 'catalog'
    //   kart.get(catalog, function (err, doc) {
    //     doc.catalog.category.id['name'] = name;
    //     doc.catalog.category.id['price'] = price;
    //     doc.catalog.category.id['image'] = image;
    //     doc.catalog.category.id['category'] = category;
    //     kart.insert(doc, function (err, body, header) {
    //       if (!err) {
    //         console.log(body);
    //         res.send('update website succeed');
    //       }
    //       else {
    //         console.log(err.error);
    //       }
    //     })

    //   })
    // })


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
