import React, { Component } from 'react'
import axios from 'axios' // we use this library as HTTP client
// you can overwrite the URI of the authentication microservice
// with this environment variable
const url = "http://cloud-romtourpe.westeurope.cloudapp.azure.com:3010"


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
    var recommendation
    var username = JSON.parse(window.localStorage.getItem('username'))
    console.log("username   ",JSON.parse(window.localStorage.getItem('username')))
    axios.get(`${url}/views`)
      .then(res => {
        
          console.log(res.data.token.rows)
          for(var data of res.data.token.rows){
            console.log(data['key'],username)
            if(data['key'].localeCompare(username) == 0){
              recommendation = data.value
              console.log(recommendation)
            }
          }
        
        
        axios.get(`${url}/logs/product`).then((result) => {
          this.setState({
            recomm: recommendation[0][0],
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
    let cart = this.props.cart
    console.log(cart)

    if (typeof recomm[name] !== 'undefined') {
      var list = recomm[name]
      console.log(list)
      if (typeof imglst[name] != 'undefined') {
        var ImageList = GetImages(list, imglst)
        for(var item of cart){
          var ind =list.indexOf(item.name)
          if(ind>=0){
            ImageList.splice(ind,1)
            if(ImageList.length == 1){
              ImageList = []
            }
          }
        }
        console.log(ImageList)
        if(ImageList.length>0){
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
                <div className='product'>
                  <div className='product-image'>
                    <img src={ImageList[0]} />
                  </div>
                </div>
                <div className='product'>
                  <div className='product-image'>
                    <img src={ImageList[1]} />
                  </div>
                </div>
              </center>
            </div>
          </div >
        )}else{
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
                  <h3>Customers who bought this item also bought</h3>
    
                  <p>No recommendations</p>
    
    
                </center>
              </div>
            </div >
          )
        }
        
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
