const express = require('express')
const log = require('debug')('users-d')

const appS = express.Router()
const db = require('./utils/crud')

appS.post('/shopping-kart', (req, res) => { //clarifier
  //var id = req.body.id   //basket id
  var name = req.body.name
  var quantity = req.body.quantity
  var username = req.body.username

  //log(`Adding a new item (${item}) identified in basket "${id}"`)
  return db.AddToBasket(name, quantity, username)
    .then((token) => {
      res.status(200).json({ status: 'success', token })
    })
    .catch((err) => {
      res.status(409).json({ status: 'error', message: String(err) })
    })
})

appS.get('/shopping-kart/:id', (req, res) => {  //id est le username
  var id = req.params.id
  //log(`Getting basket (${id})`)
  return db.getBasket(id)
    .then((token) => {
      res.status(200).json({ status: 'success', token })
    })
    .catch((err) => {
      res.status(404).json({ status: 'error', message: String(err) })
    })
})

module.exports = appS
