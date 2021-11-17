var catalog = require('nano')(process.env.DB_URL_C)
var fill = require('nano')(process.env.DB_URL_F)
var form = require('nano')(process.env.DB_URL_L)

function GetList(dbid) {
  return new Promise((resolve, reject) => {
    fill.get(dbid, (error, success) => {
      if (success) {
        //console.log(success)
        resolve(success)
      } else {
        reject(new Error(`To fetch information of basket. Reason: ${error.reason}.`))
      }
    })
  })
}
function GetFormat(dbid) {
  return new Promise((resolve, reject) => {
    form.get(dbid, (error, success) => {
      if (success) {
        //console.log(success)
        resolve(success)
      } else {
        reject(new Error(`To fetch information of basket. Reason: ${error.reason}.`))
      }
    })
  })
}
function AddFormat(name, price, image, category, id) {
  return new Promise((resolve, reject) => {
    var newDoc
    form.get("format", (error, success) => {
      if (success) {
        newDoc.doc[category][id] = {
          'name': name,
          'price': price,
          'image': image,
          'category': category
        }
      } else {
        newDoc = {
          'doc': {
            [category]: {
              [id]: {
                'name': name,
                'price': price,
                'image': image,
                'category': category
              }
            }
          }

        }
      }
      const nid = "format"
      form.insert(newDoc, nid, (error, success) => {
        if (success) {
          resolve(name)
        } else {
          reject(new Error("Erreur d'ajout a la db"))
        }
      })
    })

  })
}
function FillTheList(name) {
  return new Promise((resolve, reject) => {
    var newDoc
    fill.get("allItems", (error, success) => {
      if (success) {
        var newList = success.list.push(name)
        newDoc = {
          '_rev': success._rev,
          'name': "allmytables",
          'list': success.list
        }

      }

      else {
        var newList = [name]
        newDoc = {
          'name': "allmytables",
          'list': newList
        }
      }
      const id = "allItems"
      fill.insert(newDoc, id, (error, success) => {
        if (success) {
          resolve(name)
        } else {
          reject(new Error("Erreur d'ajout a la db"))
        }
      })
    })
  })
}

function AddProduct(name, price, image, category) {
  //faire un getBasket puis ajouter l'item pour ecraser le tout
  //lol si ca marche (aucun espoir)
  //const nproduct = {
  //brackets pour recuperer le nom de champ et pas "name"
  //   '_rev': product._rev,
  // 'name': name,
  // 'price': price,
  // 'image': image,
  // 'category': category


  return new Promise((resolve, reject) => {
    //const id_db = 'catalog/catalog'
    catalog.get(name, (error, success) => {

      var new_product
      if (success) {
        new_product = {
          //brackets pour recuperer le nom de champ et pas "name"
          '_rev': success._rev,
          'name': name,
          'price': price,
          'image': image,
          'category': category

        }
      } else {
        new_product = {
          //brackets pour recuperer le nom de champ et pas "name" get puis contenu.push pour ajouter a une liste et reinsert
          'name': name,
          'price': price,
          'image': image,
          'category': category

        }
      }

      catalog.insert(new_product, name, (error, success) => {
        if (success) {
          resolve(name)
        } else {
          reject(new Error("Erreur d'ajout a la db"))
        }
      })
    })
  })
}

/*var catalogs = 'catalog'
try {
  const doc = catalog.get(id_db)
  console.log("hey")
  doc.add(new_product)
  //catalog.destroy(id_db)
  catalog.insert(doc)
}
catch (exception) {
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
}*/
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

//})
//}

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
//catalog.get(product, (error, success) = > {
//if(success){
//catalog.destroy(success._id, catalog._rev)
//}
//})
//
module.exports = {
  AddProduct,
  getProduct,
  FillTheList,
  GetList,
  AddFormat,
  GetFormat,
  //getcatalog
}