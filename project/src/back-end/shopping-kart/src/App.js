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
  
  //log(`Adding a new item (${item}) identified in basket "${id}"`)
})

appS.get('/shopping-kart/:username', (req, res) => {  //id est le username
  var username = req.params.username
  //log(`Getting basket (${id})`)
  return db.getBasket(username)
    .then((token) => {
      res.status(200).json({ status: 'success', token })
    })
    .catch((err) => {
      res.status(404).json({ status: 'error', message: String(err) })
    })
})

appS.delete('/shopping-kart', (req, res) => { 
  var name = req.body.name
  var username = req.body.username
  return db.removeFromBasket(username, name)
      .then((token) => {
        res.status(200).json({ status: 'success', token })
     })
     .catch((err) => {
       res.status(409).json({ status: 'error', message: String(err) })
     })
})

module.exports = appS
