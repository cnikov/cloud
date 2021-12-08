const bcrypt = require('bcryptjs')
const tku = require('./en-de-coders')

var users = require('nano')(process.env.DB_URL)

var axios = require('axios')
const url = "http://cloud-romtourpe.westeurope.cloudapp.azure.com:3010"


function equalPassws(usrPass, usrDbPass) {
  return bcrypt.compareSync(usrPass, usrDbPass)
}


function createUser(usrName, passw) {


  return new Promise((resolve, reject) => {
    
    users.insert(
      // 1st argument of nano.insert()
      {
        'passw': bcrypt.hashSync(passw, bcrypt.genSaltSync()),

      },
      usrName, // 2nd argument of nano.insert()
      // callback to execute once the request to the DB is complete
      (error, success) => {
        if (success) {
          axios.post(`${url}/logs/user`,{'name':usrName}).then(()=>{
            resolve(tku.encodeToken(usrName))
          })
          
        } else {
          reject(
            new Error(`In the creation of user (${usrName}). Reason: ${error.reason}.`)
          )
        }
      }
    )
  })
}

function getUser(usrName, passw) {
  return new Promise((resolve, reject) => {
    users.get(usrName, (error, success) => {
      if (success) {
        if (!equalPassws(passw, success.passw)) {
          reject(new Error(`Passwords (for user: ${usrName}) do not match.`))
        }
        resolve(tku.encodeToken(usrName))
      } else {
        reject(new Error(`To fetch information of user (${usrName}). Reason: ${error.reason}.`))
      }
    })
  })
}

module.exports = {
  createUser,
  getUser,
}
