var catalog = require('nano')(process.env.DB_URL_C)
var database = require('nano')('http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/catalog')


function AddProduct(name, price, image, category, id) {
  //faire un getBasket puis ajouter l'item pour ecraser le tout
  //lol si ca marche (aucun espoir)
  return new Promise((resolve, reject) => {
    const id_db = 'catalog'
    const new_product = {
      id: {
        'name': name,
        'price': price,
        'image': image,
        'category': category
      }
    }
    var catalogs = 'catalog'
    const dblist = database.info()
    console.log(dblist)
    if (dblist != null) {


      const doc = catalog.get(id_db)

      doc[category.id].add(new_product)
      catalog.destroy(id_db)
      catalog.insert(doc)
    }
    else {


      catalog.insert(
        // 1st argument of nano.insert()
        {
          "catalog": {
            category: {
              id: {
                'name': name,
                'price': price,
                'image': image,
                'category': category
              }
            }
          }
        }, 'catalog',
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
    }
    //   catalog.get(catalog, function (err, doc) {
    //     doc.catalog.category.id['name'] = name;
    //     doc.catalog.category.id['price'] = price;
    //     doc.catalog.category.id['image'] = image;
    //     doc.catalog.category.id['category'] = category;
    //     catalog.insert(doc, function (err, body, header) {
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

  })
}

function getProduct(dbid) {
  return new Promise((resolve, reject) => {
    catalog.get(dbid, (error, success) => {
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
  //getcatalog
}
