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
 
  var user = req.body.user
  var item = req.body.item
  var list1 = req.body.list1
  var list2 = req.body.list2
  return db.PostlogsRec(user,item, list1, list2).then((token) => {
    res.status(200).json({ status: 'success', token })
  }).catch((err) => {
    res.status(409).json({ status: 'error', message: String(err) })
  })
})
app.post('/logs/recommendation2', (req, res) => {
  
  var item = req.body.item
  var list1 = req.body.list1
  var list2 = req.body.list2
  return db.PostlogsRec2(item, list1, list2).then((token) => {
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
app.get('/views',(req, res)=>{
  return db.getView().then((token) => {
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