const express = require('express')
const log = require('debug')('users-d')
const app = express.Router()
const db = require('./utils/crud')


app.post('/history/:name', (req, res) => {
  var name = req.params.name
  return db.PostHistory(name).then((token) => {
    res.status(200).json({ status: 'success', token })
  }).catch((err) => {
    res.status(409).json({ status: 'error', message: String(err) })
  })
})
app.get('/history/:name', (req, res) => {
  var name = req.params.name
  return db.getHistory(name).then((token) => {
    res.status(200).json({ status: 'success', token })
  }).catch((err) => {
    res.status(409).json({ status: 'error', message: String(err) })
  })
})

module.exports = app