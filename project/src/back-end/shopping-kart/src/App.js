//const express = require('express')
//const log = require('debug')('users-d')

const appS = express.Router()
const db = require('./utils/crud')

appS.post('/shop', (req, res) => {
  var id = req.body.id
  var item = req.body.item
  log(`Adding a new item (${item}) identified in basket "${id}"`)
  return db.AddToBasket(id, item)
    .then((token) => {
      res.status(200).json({ status: 'success', token })
    })
    .catch((err) => {
      res.status(409).json({ status: 'error', message: String(err) })
    })
})

app.get('/shop/:id', (req, res) => {
  var id = req.params.id
  log(`Getting basket (${id})`)
  return db.getBasket(id)
    .then((token) => {
      res.status(200).json({ status: 'success', token })
    })
    .catch((err) => {
      res.status(404).json({ status: 'error', message: String(err) })
    })
})

module.exports = App
