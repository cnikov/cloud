import React, { Component } from 'react'
import axios from 'axios' // we use this library as HTTP client
// you can overwrite the URI of the authentication microservice
// environment variable to access log service
//const url = process.env.REACT_APP_LOGS_SERVICE_URL|| 'http://localhost:3010'
const url = 'http://cloud-romtourpe.westeurope.cloudapp.azure.com:3010'
//create a list with the image of each item of list where data is the catalog with all products info
function GetImages(list, data) {
  var MyList = []
  for (var i = 0; i < list.length; i++) {
    //get the image of a specific product
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
    //recomm1 state for the list of user recommendation
    recomm1: [],
    //recomm2 state for the list of general recommendation
    recomm2:[],
    //list of img url
    img: []
  };
  //at launch 
  componentDidMount() { 
    var recommendation
    var recommendation2
    var username = JSON.parse(window.localStorage.getItem('username'))
    //get the general recommendation mapping
    axios.get(`${url}/view2`).then((result)=>{
      //get the user recommendation mapping
      axios.get(`${url}/view1`)
      .then(res => { 
          recommendation2 = result.data.token.rows[0].value
          for(var data of res.data.token.rows){
            if(data['key'].localeCompare(username) == 0){
              recommendation = data.value
              console.log(recommendation)
            }
          }
          //get catalog from logs
        axios.get(`${url}/logs/product`).then((resultt) => {
          this.setState({
            recomm2:recommendation2[0][0],
            img: resultt['data']['token']['value'],
          });
          this.setState({
            recomm1: recommendation[0][0],
          });
        })
      })
    })
  }

  render() {
    console.log(this.props.authenticated)
    //user recom
    var recommendation
    //general recomm
    var recommendation2
    var username = JSON.parse(window.localStorage.getItem('username'))
   
    //setting the state without passing be DidMount in order to dont reload the page
    axios.get(`${url}/view2`).then((result)=>{
      axios.get(`${url}/view1`)
      .then(res => {
          console.log(result.data.token.rows)
          recommendation2 = result.data.token.rows[0].value
          console.log('recom2   ',recommendation2[0][0])
          for(var data of res.data.token.rows){
            console.log(data['key'],username)
            if(data['key'].localeCompare(username) == 0){
              recommendation = data.value
              console.log(recommendation)
            }
          } 
        axios.get(`${url}/logs/product`).then((resultt) => {
          this.setState({
            recomm2:recommendation2[0][0],
            img: resultt['data']['token']['value'],
          });
          if(this.props.authenticated){
          this.setState({
            recomm1: recommendation[0][0],
          });}
          else{
            this.setState({
              recomm1:[],
            });
          }  
        })
      })
    })

    let product = this.props.product
    let name = product.name
    let image = product.image
    let price = product.price
    let recomm = this.state.recomm1
    let imglst = this.state.img
    let cart = this.props.cart
    let recomm2 = this.state.recomm2
    //check if there is some general recommendations
    if(typeof recomm2[name] !== 'undefined') {
    var list2 = recomm2[name]
    //check for user recommendation
    if (typeof recomm[name] !== 'undefined') {
      var list = recomm[name]
      if (typeof imglst[name] != 'undefined') {

        var ImageList = GetImages(list, imglst)
        //handle the case if the item is in shopping cart it should not be displayed in the recom
        //so if the item is in the cart we need to splice the list of recommendations
        for(var item of cart){
          var ind =list.indexOf(item.name)
          if(ind>=0){
            if(ImageList.length == 1){
              ImageList = []
            }
            list.splice(ind, 1)
            ImageList.splice(ind,1)
          }
        }
        //case there is some items in the recomm list after handling the shopping cart cases
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
                <h3>You used to buy this item with</h3>
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
        )}
        //all the recommendations are in the cart
        else{
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
      //case where there is no image
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
                <p> {list[0]},  {list[1]},  {list[2]} </p>
              </center>
            </div>
          </div >
        )
      }  
  }
  //not connected
  else{
    //check for the images
    if(typeof imglst[name] != 'undefined'){
    var ImageList2 = GetImages(list2, imglst)
    for(var item of cart){
      //splice if item in the cart
      var ind =list2.indexOf(item.name)
      if(ind>=0){
        if(ImageList2.length == 1){
          ImageList2 = []
        }
        list2.splice(ind, 1)
        ImageList2.splice(ind,1)
      }
    }
    //check after splicing
    if(ImageList2.length>0){
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
            <div className='product'>
              <div className='product-image'>
                <img src={ImageList2[0]} />
              </div>
            </div>
            <div className='product'>
              <div className='product-image'>
                <img src={ImageList2[1]} />
              </div>
            </div>
          </center>
        </div>
      </div >
    )}
    else{
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
    }}
    //no image
    else{
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
              <p> {list2[0]},{list2[1]},{list2[2]} </p>
            </center>
          </div>
        </div >
      )
    }
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
