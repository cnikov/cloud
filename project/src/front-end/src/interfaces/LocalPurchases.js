const products = require('../shopping-cart/components/catalog')
import axios from 'axios' // we use this library as HTTP client
// you can overwrite the URI of the authentication microservice
// with this environment variable
const url = 'http://cloud-romtourpe.westeurope.cloudapp.azure.com:3005' || 'http://localhost:3005'

class LocalPurchases {

  constructor() {

    window.localStorage.setItem('purchases', JSON.stringify([]))    //mettre les purchases du dernier panier
  } //getUser --> db user puis avec le userID appeler getBasket --> db shopping-db
  setHandlers(setProductsList, setPurHistory) {
    this.setProducts = setProductsList
    this.setPurHistory = setPurHistory
  }
  fetchProducts() {


    axios.get(`${url}/listitem`)
      .then((res) => {
        console.log(res.data.token.name)

        var myList = res.data.token.list
        var fetchItem
        for (var i = 0; i < myList.length; i++) {
          axios.get(`${url}/catalog/${myList[i]}`).then((suc) => {
            var categories = suc.data.token

            var id = 1
            console.log("list")
            console.log(categories.name);
            console.log(categories);
            var cat = categories.category
            if (fetchItem === null) {
              console.log("premier if")
              fetchItem = {
                [cat]: {
                  [id]: {
                    'name': categories.name,
                    'price': categories.price,
                    'image': categories.image,
                    'category': categories.category
                  }
                }
              }
              console.log(fetchItem)

            }
            else if (fetchItem.cat === null && i !== 0) {
              console.log("deuxieme if")
              fetchItem.cat = {
                [id]: {
                  'name': categories.name,
                  'price': categories.price,
                  'image': categories.image,
                  'category': categories.category
                }


              }
              console.log(fetchItem)
            }
            else {
              console.log("troisieme if")
              fetchItem.cat.id = {
                'name': categories.name,
                'price': categories.price,
                'image': categories.image,
                'category': categories.category
              }
            }
            id++


          })
        }

        console.log(fetchItem);
        this.setProducts(products)

      })
      .catch((error) => {
        console.error(error.message)
        //onErr(`User [${data.username}] is not registered or his credentials are incorrect.`)
      })
  }
  fetchHistory() {
    var purchases = JSON.parse(window.localStorage.getItem('purchases'))   //mettre les purchases du dernier panier?
    purchases = purchases.map((pur) => {
      pur.items = pur.items.map((i) => {
        i.name = products[i.category][i.id]['name']
        i.image = products[i.category][i.id]['image']
        return i
      })
      return pur
    })
    this.setPurHistory(purchases)
  }
  postPurchase(p, items) {
    p['items'] = items
    var purchases = JSON.parse(window.localStorage.getItem('purchases'))
    purchases.push(p)
    window.localStorage.setItem('purchases', JSON.stringify(purchases))
  }
}

export default LocalPurchases
