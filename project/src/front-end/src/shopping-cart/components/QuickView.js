import React, { Component } from 'react'
import axios from 'axios' // we use this library as HTTP client
// you can overwrite the URI of the authentication microservice
// with this environment variable
const url = "http://cloud-romtourpe.westeurope.cloudapp.azure.com:3010"

function sortTheList(data) {
  var list = []
  for (var i = 0; i < 3; i++) {
    var max = 0
    var index = -1
    for (var j = 0; j < data.with.length; j++) {
      if (list.indexOf(data.with[j]) < 0 && data.quantity[j] >= max) {
        max = data.quantity[j]
        index = j
      }
    }
    if (index != -1) {
      list.push(data.with[index])
    }

  }
  return list
}
function GetImages(list, data) {
  var MyList = []


  console.log(data)
  for (var i = 0; i < list.length; i++) {

    MyList.push(data[list[i]]['image'])

  }
  return MyList

}

class QuickView extends Component {
  componentWillUnmount() {
    this.props.closeModal()
  }

  handleClose() {
    this.props.closeModal()
  }
  state = {
    recomm: [],
    img: []
  };

  componentDidMount() {
    axios.get(`${url}/logs/recommendation`)
      .then(res => {
        axios.get(`${url}/logs/product`).then((result) => {
          this.setState({
            recomm: res['data']['token']['value'],
            img: result['data']['token']['value']
          });
        })


      })
  }

  render() {
    let product = this.props.product
    let name = product.name
    let image = product.image
    let price = product.price
    let recomm = this.state.recomm
    let imglst = this.state.img

    if (typeof recomm[name] !== 'undefined') {
      var list = sortTheList(recomm[name])
      console.log(list)
      if (typeof imglst[name] != 'undefined') {
        var ImageList = GetImages(list, imglst)
        console.log(ImageList)
        return (

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
                {console.log(recomm[name])}
                <h3>Customers who bought this item also bought</h3>
                <div className='product-image'>
                <img src={ImageList[0]} />


              </center>
            </div>
          </div >
        )
      } else {
        return (

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
                {console.log(recomm[name])}
                <h3>Customers who bought this item also bought</h3>

                <img src={list[0]} />


              </center>
            </div>
          </div >
        )
      }







    }
    else {
      return (

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
              {console.log(recomm[name])}
              <h3>Customers who bought this item also bought</h3>

              <p>No recommendations</p>


            </center>
          </div>
        </div >
      )

    }





  }
}

export default QuickView
