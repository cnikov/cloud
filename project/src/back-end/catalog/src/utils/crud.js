//variables to get the couchdb databases using nano
//catalog
var catalog = require('nano')(process.env.DB_URL_C)

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
          form.insert(newDoc, nid, (error, success) => {
            if (success) {
              var data = {
                'name':name,
                'price':price,
                'image':image,
                'category':category,
                'id':id
            }
            //logs call
              axios.post(`${url}/logs/product`,data).then(()=>{
              axios.post(`${url}/logs/id`,{'id':id}).then(()=>{
              resolve(name)})})
            } else {
              reject(new Error("Erreur to add the item in format file"))
            }
        })
      })

  })
}

module.exports = {

  AddFormat,
  GetFormat,
  DeleteInFormat,

}