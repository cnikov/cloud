const express = require('express')
const log = require('debug')('users-d')
const app = express.Router()
const db = require('./utils/crud')


app.post('/logs/user', (req, res) => {
  var name = req.params.name
  return db.PostlogsUser(name).then((token) => {
    res.status(200).json({ status: 'success', token })
  }).catch((err) => {
    res.status(409).json({ status: 'error', message: String(err) })
  })
})
app.post('/logs/product', (req, res) => {
  var name = req.params.name
  return db.PostlogsProduct(name).then((token) => {
    res.status(200).json({ status: 'success', token })
  }).catch((err) => {
    res.status(409).json({ status: 'error', message: String(err) })
  })
})
app.get('/logs/:type/:value', (req, res) => {
  var type = req.params.type
  var value = req.params.value
  return db.getlogs(type,value).then((token) => {
    res.status(200).json({ status: 'success', token })
  }).catch((err) => {
    res.status(409).json({ status: 'error', message: String(err) })
  })
})

module.exports = app