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
app.post('/logs/recommendation', (req, res) => {
  console.log("ici")
  var list1 = req.body.list1
  var list2 = req.body.list2
  for(var i= 0; i<list1.length-1; i++) {
    console.log('mon product')
    console.log(i)
    console.log(list1[i])
    db.PostlogsRec(list1[i],list1, list2).then((token) => {
      res.status(200).json({ status: 'success', token })
    }).catch((err) => {
      res.status(409).json({ status: 'error', message: String(err) })
    })
  }
  return db.PostlogsRec(list1[list1.length-1],list1, list2).then((token) => {
    res.status(200).json({ status: 'success', token })
  }).catch((err) => {
    res.status(409).json({ status: 'error', message: String(err) })
  })
})
app.post('/logs/id', (req, res) => {
  var id = req.body.id
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
  var id = req.body.id

  return db.PostlogsProduct(name, price, image, category, id).then((token) => {
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
app.delete('/logs/:name',(req, res) => {
  var product = req.params.name
  return db.deleteProd(product).then((token) => {
    res.status(200).json({ status: 'success', token })
  }).catch((err) => {
    res.status(409).json({ status: 'error', message: String(err) })
  })
})

module.exports = app