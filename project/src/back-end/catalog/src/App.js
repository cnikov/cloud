const express = require('express')
const log = require('debug')('users-d')
const app = express.Router()
const db = require('./utils/crud')

//delete call for the list of name
app.delete('/listitem/:name', (req, res) => {
  var name = req.params.name
  return db.RemoveTheList(name).then((token) => {
    res.status(200).json({ status: 'success', token })
  }).catch((err) => {
    res.status(409).json({ status: 'error', message: String(err) })
  })
})
//delete call for the catalog
app.delete('/catalog/:name', (req, res) => {
  var name = req.params.name
  return db.RemoveItem(name).then((token) => {
    res.status(200).json({ status: 'success', token })
  }).catch((err) => {
    res.status(409).json({ status: 'error', message: String(err) })
  })
})
//delete call for the format file
app.delete('/format/:name', (req, res) => {
  var name = req.params.name
  return db.DeleteInFormat(name).then((token) => {
    res.status(200).json({ status: 'success', token })
  }).catch((err) => {
    res.status(409).json({ status: 'error', message: String(err) })
  })
})
//post for the format file
app.post('/format', (req, res) => {
  var name = req.body.name
  var price = req.body.price
  var image = req.body.image
  var category = req.body.category
  var id = req.body.id
  return db.AddFormat(name, price, image, category, id).then((token) => {
    res.status(200).json({ status: 'success', token })
  }).catch((err) => {
    res.status(409).json({ status: 'error', message: String(err) })
  })
})
//post fir the list of name
app.post('/listitem', (req, res) => {
  var name = req.body.name
  log(`Adding a new item (${name}) identifie`)

  return db.FillTheList(name).then((token) => {
    res.status(200).json({ status: 'success', token })
  }).catch((err) => {
    res.status(409).json({ status: 'error', message: String(err) })
  })
})
//post for the catalog
app.post('/catalog', (req, res) => {
  var name = req.body.name
  var price = req.body.price
  var image = req.body.image
  var category = req.body.category
  var id = req.body.id
  log(`Adding a new item (${name}) identified in category "${category}"`)
  return db.AddProduct(name, price, image, category, id)
    .then((token) => {
      res.status(200).json({ status: 'success', token })
    })
    .catch((err) => {
      res.status(409).json({ status: 'error', message: String(err) })
    })
})
//get for the format file
app.get('/format', (req, res) => {
  var id = 'format'
  return db.GetFormat(id).then((token) => {
    res.status(200).json({ status: 'success', token })
  }).catch((err) => {
    res.status(404).json({ status: 'error', message: String(err) })
  })
})
//get for the list of name
app.get('/listitem', (req, res) => {
  var id = 'allItems'
  return db.GetList(id).then((token) => {
    res.status(200).json({ status: 'success', token })
  }).catch((err) => {
    res.status(404).json({ status: 'error', message: String(err) })
  })
})
//get for the catalog
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