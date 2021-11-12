import React, { Component } from 'react'
import Header from './components/Header'
import Products from './components/Products'
import QuickView from './components/QuickView'
import Checkout from './components/Checkout'
import LocalPurchases from '../interfaces/LocalPurchases'
import axios from 'axios' // we use this library as HTTP client
const url = process.env.REACT_APP_SHOPKART_SERVICE_URL || 'http://localhost:3004'
const PurchasesService = LocalPurchases
//var kart = require('nano')(process.env.DB_URL_KART) nano pour backend non?




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
    this.state.purService.fetchProducts()   //recherche les anciens produits dans la db (d'un ancien panier)
    this.state.purService.fetchHistory()  
  }

  handleCategory(event) { // Filter by Category
    this.setState({ category: event.target.value })
    console.log(this.state.category)
  }

  handleAddToCart(chosenProduct) { // Add to Cart
    let myCart = this.state.cart
    let productID = chosenProduct.id
    let productQty = chosenProduct.quantity
    /*axios.get(`${url}/shopping_kart/${myCart}`) // Perform an HTTP GET rquest to a url.
            .then((res) => {
                //window.localStorage.setItem('name', JSON.stringify(res.chosenproduct.name))
                this.products = res.products
                this.onSucc(`Welcome back [${data.username}]!`)
                this.changeRoute('/')
            })*/
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

  handleRemoveProduct(id, e) {
    let cart = this.state.cart
    let index = cart.findIndex(x => x.id === id)
    cart.splice(index, 1)
    this.setState({
      cart: cart
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
