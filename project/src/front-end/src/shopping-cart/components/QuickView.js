import React, { Component } from 'react'
import axios from 'axios' // we use this library as HTTP client
// you can overwrite the URI of the authentication microservice
// with this environment variable
const url = "http://cloud-romtourpe.westeurope.cloudapp.azure.com:3010"

class QuickView extends Component {
  componentWillUnmount() {
    this.props.closeModal()
  }

  handleClose() {
    this.props.closeModal()
  }
  state = {
    recomm: []
  }

  componentDidMount() {
    axios.get(`${url}/logs/recommendation`)
      .then(res => {
        const recomm = res['data']['value'][this.props.product]['with'];
        this.setState({ recomm });
        console.log('myrecomm')
        console.log(recomm)

      })
  }

  render() {
    let product = this.props.product
    let name = product.name
    let image = product.image
    let price = product.price

    return (
      console.log(this.state.recomm),
      <div className={this.props.openModal ? 'modal-wrapper active' : 'modal-wrapper'}>
        <div className='modal' ref='modal'>
          <button type='button' className='close' onClick={this.handleClose.bind(this)}>&times;</button>
          <center>
            <div className='product'>
              <span className='product-name'>{name}</span>
              <br />
              <span className='product-price'>{price}</span>
              <div className='product-image'>
                <img src={image} alt={name} />
              </div>
            </div>
            <h2>About the product</h2>
            <p>{name}</p>
            <br />
            <h3>Customers who bought this item also bought</h3>
            <p>{this.state.recomm}</p>
          </center>
        </div>
      </div>
    )




  }
}

export default QuickView
