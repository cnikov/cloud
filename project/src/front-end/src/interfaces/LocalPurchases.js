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
        var itemlist = []

        for (var i = 0; i < 1; i++) {
          axios.get(`${url}/catalog/${myList[i]}`).then((suc) => {
            var categories = suc.data.token
            itemlist.push(categories)

            // console.log("list")
            // console.log(categories.name);
            // console.log(categories.category);


          }).finally(() => {
            var index = 1
            let fetchItem

            for (var j = 0; j < itemlist.length; j++) {
              var cat = itemlist[j].category
              if (index === 1) {
                console.log("premier if")
                fetchItem = {
                  [cat]: {
                    [index]: {
                      'name': itemlist[j].name,
                      'price': itemlist[j].price,
                      'image': itemlist[j].image,
                      'category': itemlist[j].category
                    }
                  }



                }

                console.log(fetchItem)
                index++
              }

              else if (fetchItem.cat === null && index !== 1) {


                console.log("deuxieme if")
                fetchItem.cat = {
                  [index]: {
                    'name': itemlist[j].name,
                    'price': itemlist[j].price,
                    'image': itemlist[j].image,
                    'category': itemlist[j].category

                  }



                }
                index++
                console.log(fetchItem)
              }
              else {
                console.log("troisieme if")
                fetchItem.cat.index = {
                  'name': itemlist[j].name,
                  'price': itemlist[j].price,
                  'image': itemlist[j].image,
                  'category': itemlist[j].category
                }
                index++
              }
            }
            console.log(fetchItem)
            this.setProducts(fetchItem)
          })
        }







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
