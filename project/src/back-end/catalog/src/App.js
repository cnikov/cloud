const express = require('express')
const log = require('debug')('users-d')
const app = express.Router()
const db = require('./utils/crud')




app.post('/listitem', (req, res) => {
  var name = req.body.name
  log(`Adding a new item (${name}) identifie`)

  return db.FillTheList(name).then((token) => {
    res.status(200).json({ status: 'success', token })
  }).catch((err) => {
    res.status(409).json({ status: 'error', message: String(err) })
  })
})
app.post('/catalog', (req, res) => {
  var name = req.body.name
  var price = req.body.price
  var image = req.body.image
  var category = req.body.category
  //var id = req.body.id
  log(`Adding a new item (${name}) identified in category "${category}"`)
  return db.AddProduct(name, price, image, category)
    .then((token) => {
      res.status(200).json({ status: 'success', token })
    })
    .catch((err) => {
      res.status(409).json({ status: 'error', message: String(err) })
    })
})
app.get('/listitem/:id', (req, res) => {
  var id = req.params.id
  return db.GetList(id).then((token) => {
    res.status(200).json({ status: 'success', token })
  }).catch((err) => {
    res.status(404).json({ status: 'error', message: String(err) })
  })
})
app.get('/catalog/:name', (req, res) => {
  var dbid = req.params.name
  return db.getProduct(dbid)
    .then((token) => {
      res.status(200).json({ status: 'success', token })
    })
    .catch((err) => {
      res.status(404).json({ status: 'error', message: String(err) })
    })
})
module.exports = app