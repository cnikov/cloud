import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import AdminForm from './web_page_sections/AdminForm'
import LoginForm from './web_page_sections/LoginForm'
import RegisterForm from './web_page_sections/RegisterForm'
import ShoppingCartApp from './shopping-cart/ShoppingCartApp'
import FlashMessages from './web_page_sections/FlashMessages'
import AuthenticationService from './interfaces/AuthenticationService'

import './shopping-cart/scss/style.css'
const catalog = require('./shopping-cart/components/catalog')
import axios from 'axios' // we use this library as HTTP client
// you can overwrite the URI of the authentication microservice
// with this environment variable
const url = process.env.REACT_APP_CATALOG_SERVICE_URL || 'http://localhost:3005'

class App extends Component {
  componentWillMount() {
    window.localStorage.clear()
    this.state = {
      showRegis: false,
      authenticated: false,
      showLogin: false,
      showAdm: false,
      saved: [],
      flashMessages: [],
      isAuthenticated: false,
      authService: new AuthenticationService()
    }
    this.state.authService.setHandlers(
      (msg, msgType) => { this.createFlashMessage(msg, msgType) },
      (newState) => { this.setState({ authenticated: newState }) },
      (route) => { this.props.history.push(route) }
    )
    axios.get(`${url}/format`).then((res) => {
      this.setState({
        products: res.data.token.doc
      })
    })
  }

  constructor(props) {
    super(props)
    this.logoutUser = this.logoutUser.bind(this)
    this.deleteFlashMessage = this.deleteFlashMessage.bind(this)
    this.createFlashMessage = this.createFlashMessage.bind(this)
    this.loginUser = this.loginUser.bind(this)
    this.registerUser = this.registerUser.bind(this)
    this.setAuthStatus = this.setAuthStatus.bind(this)
  }
  createFlashMessage(text, type = 'success') {
    const message = { text, type }
    this.setState({
      flashMessages: [...this.state.flashMessages, message]
    })
  }
  deleteFlashMessage(index) {
    if (index > 0) {
      this.setState({
        flashMessages: [
          ...this.state.flashMessages.slice(0, index),
          ...this.state.flashMessages.slice(index + 1)
        ]
      })
    } else {
      this.setState({
        flashMessages: [...this.state.flashMessages.slice(index + 1)]
      })
    }
  }
  registerUser(userData, callback) {
    this.state.authService.registerUser(userData, callback)
  }
  loginUser(userData, callback) {
    this.state.authService.loginUser(userData, callback)
  }
  logoutUser(e) {
    e.preventDefault()
    this.setAuthStatus(false, false, false, false)
    this.props.history.push('/')
    this.createFlashMessage('You are now logged out')
  }
  setAuthStatus(auth, showRegis, showLogin, showAdm) {
    this.setState({
      showRegis: showRegis,
      authenticated: auth,
      showLogin: showLogin,
      showAdm: showAdm
    })
  }

  render() {
    const { flashMessages, showRegis, authenticated, showLogin, showAdm, products } = this.state
    if (typeof products !== 'undefined') {
      return (
        <div >
          <FlashMessages
            deleteFlashMessage={this.deleteFlashMessage}
            messages={flashMessages} />
          <br />
          {console.log("mon produit")},
          {console.log(products)},
          <Switch>
            <Route exact path='/admin' render={() => {
              return <AdminForm
                componentWillMount
                products={this.state.products}
                createFlashMessage={this.createFlashMessage}
                setAuthStatus={this.setAuthStatus}
                logoutUser={this.logoutUser} />
            }} />
            <Route exact path='/register' render={() => {
              return <RegisterForm
                createFlashMessage={this.createFlashMessage}
                setAuthStatus={this.setAuthStatus}
                registerUser={this.registerUser} />
            }} />
            <Route exact path='/login' render={() => {
              return <LoginForm
                createFlashMessage={this.createFlashMessage}
                setAuthStatus={this.setAuthStatus}
                loginUser={this.loginUser} />
            }} />
            <Route exact path='/' render={() => {
              if (authenticated) {
                //redirect to admin
                if (JSON.parse(window.localStorage.getItem('username')) === 'admin') {
                  return <AdminForm
                    products={products}
                    createFlashMessage={this.createFlashMessage}
                    setAuthStatus={this.setAuthStatus}
                    logoutUser={this.logoutUser} />
                } else {
                  return <ShoppingCartApp
                    setAuthStatus={this.setAuthStatus}
                    authenticated={authenticated}
                    logoutUser={this.logoutUser} />
                }
              } else if (showRegis) {
                return <Redirect to='/register' />
              } else if (showLogin) {
                return <Redirect to='/login' />
              } else if (showAdm) {
                return <Redirect to='/admin' />
              } else {
                return <ShoppingCartApp
                  setAuthStatus={this.setAuthStatus}
                  authenticated={authenticated} />
              }
            }} />
            <Redirect to='/' />
          </Switch>
        </div>
      )

    }
    else {
      return (

        <div >
          <FlashMessages
            deleteFlashMessage={this.deleteFlashMessage}
            messages={flashMessages} />
          <br />
          <Switch>
            <Route exact path='/admin' render={() => {
              return <AdminForm
                componentWillMount
                products={this.state.products}
                createFlashMessage={this.createFlashMessage}
                setAuthStatus={this.setAuthStatus}
                logoutUser={this.logoutUser} />
            }} />
            <Route exact path='/register' render={() => {
              return <RegisterForm
                createFlashMessage={this.createFlashMessage}
                setAuthStatus={this.setAuthStatus}
                registerUser={this.registerUser} />
            }} />
            <Route exact path='/login' render={() => {
              return <LoginForm
                createFlashMessage={this.createFlashMessage}
                setAuthStatus={this.setAuthStatus}
                loginUser={this.loginUser} />
            }} />
            <Route exact path='/' render={() => {
              if (authenticated) {
                if (JSON.parse(window.localStorage.getItem('username')) === 'admin') {
                  return <AdminForm
                    products={catalog}
                    createFlashMessage={this.createFlashMessage}
                    setAuthStatus={this.setAuthStatus}
                    logoutUser={this.logoutUser} />



                } else {
                  return <ShoppingCartApp
                    setAuthStatus={this.setAuthStatus}
                    authenticated={authenticated}
                    logoutUser={this.logoutUser} />
                }
              } else if (showRegis) {
                return <Redirect to='/register' />
              } else if (showLogin) {
                return <Redirect to='/login' />
              } else if (showAdm) {
                return <Redirect to='/admin' />
              } else {
                return <ShoppingCartApp
                  setAuthStatus={this.setAuthStatus}
                  authenticated={authenticated} />
              }
            }} />
            <Redirect to='/' />
          </Switch>
        </div>
      )
    }

  }
}

export default App
