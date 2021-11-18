# Catalog Service

This service use 3 databases. One is a list of every name of items in the catalog it is called allitems in couchdb and listitem in the back-end <br />
The post method takes the name of the item and add it in the list by getting the id allItems or creating a new list with the product name if the database does not exist.<br />
The get method need an id which has to be allItems because it is the id of the database file. It returns the list of all the product's name<br />
The delete method takes the name of item that has to be removed and remove it to the list by getting it and re inserting it into the database.<br />
The other database is a database which stores every items individually in order to make some get name easily in the shopping cart service.<br />
The post takes 5 arguments which are name,price,image_url,category and id of each product and it create a document where the _id field is the name of the product<br />
The get method takes the name of the product as argument and give all the information about the product<br />
The delete method also take the name of the product in argument and erase the right document in the database because the _id = name<br />
The last databse create only one document which correspond to the expected format that the front end need to display each items.
```json
"_id": "catalog",
  "catalog": {
    "Vegetables": {
      "1": {
        'name': 'Brocolli',
        'price': 2.73,
        'image': 'https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/broccoli.jpg',
        'category': 'Vegetables'
      },
      "2": {
        'name': 'Cauliflower',
        'price': 6.30,
        'image': 'https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cauliflower.jpg',
        'category': 'Vegetables'
      },
      "3": {
        'name': 'Cucumber',
        'price': 5.60,
        'image': 'https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cucumber.jpg',
        'category': 'Vegetables'
      },
      "4": {
        'name': 'Beetroot',
        'price': 8.70,
        'image': 'https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/beetroot.jpg',
        'category': 'Vegetables'
      }
    },
    "Fruits": {
      "6": {
        'name': 'Apple',
        'price': 2.34,
        'image': 'https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/apple.jpg',
        'category': 'Fruits'
      },
      "7": {
        'name': 'Banana',
        'price': 1.69,
        'image': 'https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/banana.jpg',
        'category': 'Fruits'
      },
      "8": {
        'name': 'Grapes',
        'price': 5.98,
        'image': 'https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/grapes.jpg',
        'category': 'Fruits'
      },
      "9": {
        'name': 'Mango',
        'price': 6.80,
        'image': 'https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/mango.jpg',
        'category': 'Fruits'
      }
    }
  }
```
The post take the same id's of the 
