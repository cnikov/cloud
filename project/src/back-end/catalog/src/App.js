const express = require('express')
const log = require('debug')('users-d')

const app = express.Router()
const db = require('./utils/crud')

app.post('/catalog', (req, res) => {
  var name = req.body.category.id.name
  var price = req.body.category.id.price
  var image = req.body.category.id.image
  var category = req.body.category.id.category
  var id = req.body.category.id
  log(`Adding a new item (${name}) identified in category "${category}"`)
  return null
    .then((token) => {
      res.status(200).json({ status: 'success', token })
    })
    .catch((err) => {
      res.status(409).json({ status: 'error', message: String(err) })
    })
})

app.get('/catalog/catalog', (req, res) => {

  return db.getProduct()
    .then((token) => {
      res.status(200).json({ status: 'success', token })
    })
    .catch((err) => {
      res.status(404).json({ status: 'error', message: String(err) })
    })
})

module.exports = app
