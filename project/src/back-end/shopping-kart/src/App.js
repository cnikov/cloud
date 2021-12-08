const express = require('express')
const log = require('debug')('users-d')

const appS = express.Router()
const db = require('./utils/crud')

appS.post('/shopping-kart', (req, res) => { 
  var name = req.body.name
  var quantity = req.body.quantity
  var username = req.body.username
  var price = req.body.price
  var id = req.body.id
  return db.AddToBasket(name, quantity, username, price, id)
  .then((token) => {
    res.status(200).json({ status: 'success', token })
  })
  .catch((err) => {
    res.status(409).json({ status: 'error', message: String(err) })
  })
})

appS.get('/shopping-kart/:username', (req, res) => { 
  var username = req.params.username
  return db.getBasket(username)
    .then((token) => {
      res.status(200).json({ status: 'success', token })
    })
    .catch((err) => {
      res.status(404).json({ status: 'error', message: String(err) })
    })
})

appS.delete('/shopping-kart/:name/:username', (req, res) => { 
  var name = req.params.name
  var username = req.params.username
  return db.removeFromBasket(username, name)
      .then((token) => {
        res.status(200).json({ status: 'success', token })
     })
     .catch((err) => {
       res.status(409).json({ status: 'error', message: String(err) })
     })
})

appS.delete('/shopping-kart/:username', (req, res) => { 
  var username = req.params.username
  return db.removeAllBasket(username)
      .then((token) => {
        res.status(200).json({ status: 'success', token })
     })
     .catch((err) => {
       res.status(409).json({ status: 'error', message: String(err) })
     })
})

module.exports = appS
