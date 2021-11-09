const bcrypt = require('bcryptjs')
const tku = require('./en-de-coders')

var users = require('nano')(process.env.DB_URL_USER)
var kart =  require('nano')(process.env.DB_URL_KART)
var kart_id = Math.random().toString(36).slice(2)

function equalPassws (usrPass, usrDbPass) {
  return bcrypt.compareSync(usrPass, usrDbPass)
}

function createUser (usrName, passw) {
  return new Promise((resolve, reject) => {
    users.insert(
      // 1st argument of nano.insert()
      { 'passw': bcrypt.hashSync(passw, bcrypt.genSaltSync()),
	'permission': "user",
	'kart-id': kart_id,
 },
      usrName, // 2nd argument of nano.insert()
      // callback to execute once the request to the DB is complete
      (error, success) => {
        if (success) {
          resolve(tku.encodeToken(usrName))
        } else {
          reject(
            new Error(`In the creation of user (${usrName}). Reason: ${error.reason}.`)
          )
        }
      }
    )
kart.insert({
'kart-id': kart_id,
'items': ""
}
	    (error, success) => {
        if (success) {
        } else {
          reject(
            new Error(`In the creation of user (${usrName}). Reason: ${error.reason}.`)
          )
        }
      }
)
  })
}

function getUser (usrName, passw) {
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
  getUser
}
