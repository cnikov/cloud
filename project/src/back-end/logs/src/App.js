const express = require('express')
const log = require('debug')('users-d')
const app = express.Router()
const db = require('./utils/crud')


app.post('/logs/user', (req, res) => {
  var name = req.body.name
  return db.PostlogsUser(name).then((token) => {
    res.status(200).json({ status: 'success', token })
  }).catch((err) => {
    res.status(409).json({ status: 'error', message: String(err) })
  })
})
app.post('/logs/id', (req, res) => {
  var namide = req.body.id
  return db.PostlogsId(id).then((token) => {
    res.status(200).json({ status: 'success', token })
  }).catch((err) => {
    res.status(409).json({ status: 'error', message: String(err) })
  })
})

app.post('/logs/product', (req, res) => {
  var name = req.body.name
  var price = req.body.price
  var image = req.body.image
  var category = req.body.category
  var id = req.body.category

  return db.PostlogsProduct(name,price,image,category,id).then((token) => {
    res.status(200).json({ status: 'success', token })
  }).catch((err) => {
    res.status(409).json({ status: 'error', message: String(err) })
  })
})
app.get('/logs/:type', (req, res) => {
  var type = req.params.type
  return db.getlogs(type).then((token) => {
    res.status(200).json({ status: 'success', token })
  }).catch((err) => {
    res.status(409).json({ status: 'error', message: String(err) })
  })
})

module.exports = app