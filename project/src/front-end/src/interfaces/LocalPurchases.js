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
    var catalog = 'catalog'

    axios.get(`${url}`)
      .then((res) => {
        let categories = Object.keys(res)
        var newList
        var id = 1
        for (var i = 0; i < categories.length; i++) {
          if (newList[categories.category == null]) {
            var name = categories.category
            var name = [id][categories.name, categories.price, categories.image, categories.category]
            id++
            newList.push(name)
          }
          else {
            var list = [id][categories.name, categories.price, categories.image, categories.category]
            id++
            newList[categories.category].push(list)
          }
        }
        console.log(newList);
        this.setProducts(newList)

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
