//const express = require('express')
//const log = require('debug')('users-d')

const appS = express.Router()
const db = require('./utils/crud')

appS.post('/catalog', (req, res) => {
  var name = req.body.name
  var price = req.body.price
  var image = req.body.image
  var category = req.body.category
  log(`Adding a new item (${name}) identified in category "${category}"`)
  return db.AddProduct(name, price, image, category)
    .then((token) => {
      res.status(200).json({ status: 'success', token })
    })
    .catch((err) => {
      res.status(409).json({ status: 'error', message: String(err) })
    })
})

app.get('/catalog/:name/:category', (req, res) => {
  var name = req.params.name
  var category = req.params.category
  log(`Getting product (${name})`)
  return db.getProduct(name, categiry)
    .then((token) => {
      res.status(200).json({ status: 'success', token })
    })
    .catch((err) => {
      res.status(404).json({ status: 'error', message: String(err) })
    })
})

module.exports = App
