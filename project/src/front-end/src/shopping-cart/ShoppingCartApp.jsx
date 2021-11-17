import React, { Component } from 'react'
import Header from './components/Header'
import Products from './components/Products'
import QuickView from './components/QuickView'
import Checkout from './components/Checkout'
import LocalPurchases from '../interfaces/LocalPurchases'
import axios from 'axios' // we use this library as HTTP client
const url = "http://cloud-romtourpe.westeurope.cloudapp.azure.com:3006" || 'http://localhost:3006'
const PurchasesService = LocalPurchases





class ShoppingCartApp extends Component {

  componentWillMount() { //gerer si un user a deja un panier ou non
    console.log(JSON.parse(window.localStorage.getItem('username')))
    var user = JSON.parse(window.localStorage.getItem('username'))
    if(user == null){
      console.log("Not connected, creating an empty basket")
      this.initialiseState(true)
    }else{
      console.log("well connected, loading your basket")
      this.initialiseState(false)
    }
    //this.initialiseState(true)
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
      console.log("je passe toujours par ici")
      this.state = {
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
    } else {
      console.log("mais je ne passe jamais ici")
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
      let username = JSON.parse(window.localStorage.getItem('username'))
      axios.get(`${url}/shopping-kart/${username}`)
        .then((res) =>{
          console.log(res)
          this.state.cart = res.data.token
          console.log(this.state.cart)
      })
      .catch((err) => {
        console.log("Not yet connected")
      })
    }
    this.state.purService.fetchProducts()   //recherche tous les differents produits de la db
    this.state.purService.fetchHistory()
    //console.log(this.state.cart)
  }

  handleCategory(event) { // Filter by Category
    this.setState({ category: event.target.value })
    console.log(this.state.category)
  }

  handleAddToCart(chosenProduct) { // Add to Cart
    let myCart = this.state.cart
    let productName = chosenProduct.name
    //let productID = chosenProduct.id
    let productQty = chosenProduct.quantity
    let username = JSON.parse(window.localStorage.getItem('username'))
    var data = {
      'name': productName,
      'quantity': productQty,
      'username': username,
      'price': chosenProduct.price
    }
    axios.post(`${url}/shopping-kart`, data)
    if (this.checkProduct(productName)) {
      let index = myCart.productName.findIndex(x => x.name === productName)
      myCart.quantity.splice(index, 1, Number(myCart[index].quantity) + Number(productQty))
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
    let cart = this.state.cart
    let index = cart.findIndex(x => x.id === id)
    let productName = cart[index].name
    let username = JSON.parse(window.localStorage.getItem('username'))
    var data = {
      'name': productName,
      'username': username,
    }
    axios.delete(`${url}/shopping-kart`, data)
      .then((res) => {
        window.localStorage.setItem('name', JSON.stringify(res.chosenproduct.name))
      })
    cart.splice(index, 1)
    this.setState({
      cart: cart
    })
    this.sumTotalItems(this.state.cart)
    this.sumTotalAmount(this.state.cart)
    e.preventDefault()
  }

  checkProduct(productName) {
    let cart = this.state.cart
    return cart.some(function (item) {
      return item.name === productName
    })
  }

  sumTotalItems() {
    let total = 0
    let cart = this.state.cart
    total = cart.name.length
    this.setState({
      totalItems: total
    })
  }

  sumTotalAmount() {
    let total = 0
    let cart = this.state.cart
    for (var i = 0; i < cart.length; i++) {
      // eslint-disable-next-line
      total += cart.price[i] * parseInt(cart.quantity[i])
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
    console.log('END of CHECKOUT')
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
