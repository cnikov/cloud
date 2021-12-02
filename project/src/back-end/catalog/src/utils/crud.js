//variables to get the couchdb databases using nano
//catalog
var catalog = require('nano')(process.env.DB_URL_C)
//list of name
var fill = require('nano')(process.env.DB_URL_F)
//format db
var form = require('nano')(process.env.DB_URL_L)
var axios = require('axios')
const url = "http://cloud-romtourpe.westeurope.cloudapp.azure.com:3010"

//this function delete an item in the format database
function DeleteInFormat(name) {
  return new Promise((resolve, reject) => {
    form.get("format", (error, success) => {
      var newDoc
      if (success) {
        catalog.get(name, (err, succ) => {
          if (succ) {
            delete success['doc'][succ.category][succ.id]
            var size = Object.keys(success['doc'][succ.category]).length;
            //case if last one in the category
            if (size == 0) {
              delete success['doc'][succ.category]
            }
            newDoc = {
              '_rev': success._rev,
              'doc': success.doc
            }
          }
          var iddb = "format"
          //insert with the _id format
          form.insert(newDoc, iddb, (error, success) => {
            if (success) {
              resolve(name)
            } else {
              reject(new Error("Erreur to delete product"))
            }
          })
        })
      }

    })
  })
}
//remove an item from the catalog only delete the entire document which has name as id
function RemoveItem(name) {
  return new Promise((resolve, reject) => {
    catalog.get(name, (error, success) => {
      if (success) {
        catalog.destroy(name, success._rev, (error, success) => {
          if (success) {
            resolve(name)
          } else {
            reject(new Error("Erreur to remove item"))
          }
        })
      }
    })
  })
}
//remove a name from the list of name
function RemoveTheList(name) {
  return new Promise((resolve, reject) => {
    fill.get("allItems", (error, success) => {

      var newFill
      if (success) {
        const index = success.list.indexOf(name)
        success.list.splice(index, 1)
        newFill = {
          '_rev': success._rev,
          'list': success.list
        }
      }
      const id = "allItems"
      fill.insert(newFill, id, (error, success) => {
        if (success) {
          resolve(name)
        } else {
          reject(new Error("Erreur to remove from the list"))
        }
      })
    })
  })
}
//Get the list of name
function GetList(dbid) {
  return new Promise((resolve, reject) => {
    fill.get(dbid, (error, success) => {
      if (success) {
        resolve(success)
      } else {
        reject(new Error(`To get from the list. Reason: ${error.reason}.`))
      }
    })
  })
}
//Get the document in the right format for the front end
function GetFormat(dbid) {
  return new Promise((resolve, reject) => {
    form.get(dbid, (error, success) => {
      if (success) {
        resolve(success)
      } else {
        reject(new Error(`To get the format file: ${error.reason}.`))
      }
    })
  })
}
//Add an element in the document with the right format
function AddFormat(name, price, image, category, id) {
  return new Promise((resolve, reject) => {
    

    form.get("format", (error, success) => {
      if (success) {
        newDoc = {
          '_rev': success._rev,
          'doc': success.doc
        }
        //check if the category exist
        try {
          newDoc['doc'][category][id] = {
            'name': name,
            'price': price,
            'image': image,
            'category': category
          }
        } catch (exception) {
          newDoc['doc'][category] = {
            [id]: {
              'name': name,
              'price': price,
              'image': image,
              'category': category
            }
          }
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
      var data = {
        'name':name,
        'price':price,
        'image':image,
        'category':category,
        'id':id
    }
      axios.post(`${url}/logs/product`,data).then(()=>{form.insert(newDoc, nid, (error, success) => {
        if (success) {
          resolve(name)
        } else {
          reject(new Error("Erreur to add the item in format file"))
        }
      })})
        
      })

  })
}
//Add a name of product in the list of name
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
          reject(new Error("Error to add item in the list of name"))
        }
      })
    })
  })
}
//Add a product document in the catalog
function AddProduct(name, price, image, category, id) {

  return new Promise((resolve, reject) => {
    catalog.get(name, (error, success) => {
      var new_product
      if (success) {
        new_product = {
          '_rev': success._rev,
          'name': name,
          'price': price,
          'image': image,
          'category': category,
          'id': id
        }
      } else {
        new_product = {
          'name': name,
          'price': price,
          'image': image,
          'category': category,
          'id': id
        }
      }
      catalog.insert(new_product, name, (error, success) => {
        if (success) {
          resolve(name)
        } else {
          reject(new Error("Error to add item in catalog"))
        }
      })
    })
  })
}
//Get a product from the catalog
function getProduct(dbid) {
  return new Promise((resolve, reject) => {
    catalog.get(dbid, (error, success) => {
      if (success) {
        resolve(success)
      } else {
        reject(new Error(`To get product. Reason: ${error.reason}.`))
      }
    })
  })
}

module.exports = {
  AddProduct,
  getProduct,
  FillTheList,
  GetList,
  AddFormat,
  GetFormat,
  RemoveTheList,
  RemoveItem,
  DeleteInFormat,

}