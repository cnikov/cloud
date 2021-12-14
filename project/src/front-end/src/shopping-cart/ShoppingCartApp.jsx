import React, { Component } from 'react'
import Header from './components/Header'
import Products from './components/Products'
import QuickView from './components/QuickView'
import Checkout from './components/Checkout'
import LocalPurchases from '../interfaces/LocalPurchases'
import axios from 'axios' // we use this library as HTTP client
const url = process.env.REACT_APP_SHOPKART_SERVICE_URL || 'http://localhost:3006'
const url2 = "http://cloud-romtourpe.westeurope.cloudapp.azure.com:3010"
const urlProducts = process.env.REACT_APP_CATALOG_SERVICE_URL || 'http://localhost:3005'
const PurchasesService = LocalPurchases




function post(user,l1,l2,l3,N){

  if (N==0){
    return
  }
   
  else{
    var data = {
      'user':user,
      'item':l3[0],
      'list1':l1,
      'list2':l2
    }
    axios.post(`${url2}/logs/recommendation`,data).then(()=>{
      l3.splice(0,1)
      N--

      return post(user,l1,l2,l3,N)
    })
  }

}


class ShoppingCartApp extends Component {

  componentWillMount() {
    this.initialiseState(true)
  }
  constructor(props) {
    super(props)
    this.handleCategory = this.handleCategory.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.sumTotalItems = this.sumTotalItems.bind(this)
    this.sumTotalAmount = this.sumTotalAmount.bind(this)
    this.checkProduct = this.checkProduct.bind(this)
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.endCheckout = this.endCheckout.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
  }
  initialiseState(firstCall) {
    if (firstCall) {
      this.state = {
        username:'',
        products: [],
        cart: [],
        totalItems: 0,
        totalAmount: 0,
        term: '',
        category: '',
        cartBounce: false,
        quickViewProduct: {},
        modalActive: false,
        doCheckout: false,
        purchaseId: null,
        oldPurchases: [],
        purService: new PurchasesService()
      }
      this.state.purService.setHandlers(

        (list) => { this.setState({ products: list }) },
        (hist) => { this.setState({ oldPurchases: hist }) }
      )
      console.log(this.state.purService)
    } else {
      this.setState({
        products: [],
        cart: [],
        totalItems: 0,
        totalAmount: 0,
        term: '',
        category: '',
        cartBounce: false,
        quickViewProduct: {},
        modalActive: false,
        doCheckout: false,
        purchaseId: null,
        oldPurchases: []
      })
    }
    this.state.purService.fetchProducts()   //recherche tous les differents produits de la db
    this.state.purService.fetchHistory()    // est ce que c'est pas ce qui est fait les lignes d'apres ?
    let username = JSON.parse(window.localStorage.getItem('username'))
    
    axios.get(`${url}/shopping-kart/${username}`)
      .then((res) => {
        var prod = res.data.token
        for (var i = 0; i < prod.name.length; i++) {
          var n = prod.name[i]
          var q = prod.quantity[i]      
          var p = prod.price[i]
          var id = prod.id[i]
          var im = prod.image[i]
          let add = {
            'name': n,
            'price': p,
            'quantity': q,
            'id': id,
            'image': im
          }
          this.state.cart.push(add)
        }
        //this.state.cart = res.data.token  --> WTF ?
        this.sumTotalItems(this.state.cart)
        this.sumTotalAmount(this.state.cart)
      })
      .catch((err) => {
        console.log("Not yet connected")
      })
  }

  handleCategory(event) { // Filter by Category
    this.setState({ category: event.target.value })
    console.log(this.state.category)
  }

  handleAddToCart(chosenProduct) { // Add to Cart
    let username = JSON.parse(window.localStorage.getItem('username'))
    let productName = chosenProduct.name
    let myCart = this.state.cart
    let productID = chosenProduct.id
    let productQty = chosenProduct.quantity
    var data = {
      'name': productName,
      'quantity': productQty,
      'username': username,
      'price': chosenProduct.price,
      'id': productID
    }
    axios.post(`${url}/shopping-kart`, data)
    if (this.checkProduct(productID)) {
      let index = myCart.findIndex(x => x.id === productID)
      myCart[index].quantity = Number(myCart[index].quantity) + Number(productQty)
      this.setState({
        cart: myCart
      })
    } else {
      myCart.push(chosenProduct)
    }
    this.setState({
      cart: myCart,
      cartBounce: true
    })
    setTimeout(function () {
      this.setState({ cartBounce: false })
    }.bind(this), 1000)
    this.sumTotalItems(this.state.cart)
    this.sumTotalAmount(this.state.cart)
  }

  handleRemoveProduct(id, e) { //relier back-end
    let mycart = this.state.cart
    let index = mycart.findIndex(x => x.id === id)
    let productName = mycart[index].name
    let username = JSON.parse(window.localStorage.getItem('username'))
    
    axios.delete(`${url}/shopping-kart/${productName}/${username}`)
    mycart.splice(index, 1)
    this.setState({
      username:username,
      cart: mycart
    })
    this.sumTotalItems(this.state.cart)
    this.sumTotalAmount(this.state.cart)
    e.preventDefault()
  }

  checkProduct(productID) {
    let cart = this.state.cart
    return cart.some(function (item) {
      return item.id === productID
    })
  }

  sumTotalItems() {
    let total = 0
    let cart = this.state.cart
    total = cart.length
    this.setState({
      totalItems: total
    })
  }

  sumTotalAmount() {
    let total = 0
    let cart = this.state.cart
    for (var i = 0; i < cart.length; i++) {
      // eslint-disable-next-line
      total += cart[i].price * parseInt(cart[i].quantity)
    }
    this.setState({
      totalAmount: Number((total).toFixed(2))
    })
  }

  openModal(product) { // Open Modal
    this.setState({
      quickViewProduct: product,
      modalActive: true
    })
  }

  closeModal() { // Close Modal
    this.setState({
      modalActive: false
    })
  }

  handleCheckout(e) {
    e.preventDefault()
    this.setState({ doCheckout: true })
  }

  endCheckout() {
    //post tout avec tout super :) 

    console.log('END of CHECKOUT')
    let username = JSON.parse(window.localStorage.getItem('username'))
    var l1 = []
    var l2 = []
    var l3 = []
    console.log("my cart is :")
    console.log(this.state.cart)
    for(var item of this.state.cart){
      l1.push(item.name)
      l2.push(item.quantity)
      l3.push(item.name)
      

    }
     post(username,l1,l2,l3,l1.length)
     
      
  
    axios.delete(`${url}/shopping-kart/${username}`)
    this.initialiseState(false)
    // TODO
    // this.getPurHistory()
    this.setState({ doCheckout: false })
  }

  /* eslint-disable */
  render() {
    const { doCheckout } = this.state
    return (
      <div>
        {doCheckout ?
          <Checkout
            id={this.state.purchaseId}
            purchase={this.state.cart}
            oldPurchases={this.state.oldPurchases}
            endCheckout={this.endCheckout}
            postPurchase={
              (purs, items) => { this.state.purService.postPurchase(purs, items) }
            }
          />
          : <div>
            <Header
              cartBounce={this.state.cartBounce}
              total={this.state.totalAmount}
              totalItems={this.state.totalItems}
              cartItems={this.state.cart}
              removeProduct={this.handleRemoveProduct}
              handleCategory={this.handleCategory}
              categoryTerm={this.state.category}
              handleCheckout={this.handleCheckout}
              setAuthStatus={this.props.setAuthStatus}
              authenticated={this.props.authenticated}
              logoutUser={this.props.logoutUser} />
            <Products
              productsList={this.state.products}
              searchTerm={this.state.term}
              addToCart={this.handleAddToCart}
              openModal={this.openModal}
              authenticated={this.props.authenticated} />
            <QuickView
              username={this.state.username}
              product={this.state.quickViewProduct}
              openModal={this.state.modalActive}
              closeModal={this.closeModal} />
          </div>
        }
      </div>
    )
  }
}

export default ShoppingCartApp
