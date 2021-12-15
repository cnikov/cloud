//variables to get the couchdb databases using nano
//format db
var form = require('nano')(process.env.DB_URL_L)
var axios = require('axios')
//const { BlobServiceClient } = require('@azure/storage-blob')
const url = "http://cloud-romtourpe.westeurope.cloudapp.azure.com:3010"
//const storageSasToken = "sv=2020-08-04&ss=b&srt=sco&sp=rwdlactfx&se=2022-02-01T01:07:03Z&st=2021-12-14T17:07:03Z&spr=https&sig=0F34OLet3mNjKL9gpYm1ZH%2FC2cRvYdi7lqNtP%2FtBLSM%3D"
//const storageResourceName = "image"
// storage name = csb10032001a19bea0a
// chaine de connection : BlobEndpoint=https://csb10032001a19bea0a.blob.core.windows.net/;QueueEndpoint=https://csb10032001a19bea0a.queue.core.windows.net/;FileEndpoint=https://csb10032001a19bea0a.file.core.windows.net/;TableEndpoint=https://csb10032001a19bea0a.table.core.windows.net/;SharedAccessSignature=sv=2020-08-04&ss=b&srt=sco&sp=rwdlactfx&se=2022-02-01T01:07:03Z&st=2021-12-14T17:07:03Z&spr=https&sig=0F34OLet3mNjKL9gpYm1ZH%2FC2cRvYdi7lqNtP%2FtBLSM%3D
// URL de la signature d'accès partagé du service BLOB : https://csb10032001a19bea0a.blob.core.windows.net/?sv=2020-08-04&ss=b&srt=sco&sp=rwdlactfx&se=2022-02-01T01:07:03Z&st=2021-12-14T17:07:03Z&spr=https&sig=0F34OLet3mNjKL9gpYm1ZH%2FC2cRvYdi7lqNtP%2FtBLSM%3D
//this function delete an item in the format database
function DeleteInFormat(name) {
  return new Promise((resolve, reject) => {
    form.get("format", (error, success) => {
      var newDoc
      if (success) {
        //axios get to get information on the product
        axios.get(`${url}/logs/product`).then((res)=>{
          data = res.data.token.value
          succ = data[name]
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
            var iddb = "format"
          //insert with the _id format
          form.insert(newDoc, iddb, (error, success) => {
            if (success) {
              axios.delete(`${url}/logs/${name}`).then(()=>{
                resolve(name)
              })
              
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
    /*const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    // Make sure your container was created
    const containerName = storageResourceName
    // Get a reference to the container
    const containerClient = blobServiceClient.getContainerClient(containerName);
    // Create a unique name for the blob
    const blobName = name;
    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    console.log('\nUploading to Azure storage as blob:\n\t', blobName);
    const bloburl = blockBlobClient.url
  
    // Upload data to the blob
    const data1 = image;
    blockBlobClient.upload(data1, data1.length);
    
    console.log("Blob was uploaded successfully. requestId: ");
    console.log("Blob URL: ", bloburl)*/
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