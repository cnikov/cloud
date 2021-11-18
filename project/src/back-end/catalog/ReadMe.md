# Catalog Service

This service use 3 databases. One is a list of every name of items in the catalog it is called allitems in couchdb and listitem in the back-end <br />
The post method takes the name of the item and add it in the list by getting the id allItems or creating a new list with the product name if the database does not exist.<br />
The get method need an id which has to be allItems because it is the id of the database file. It returns the list of all the product's name<br />
The delete method takes the name of item that has to be removed and remove it to the list by getting it and re inserting it into the database.<br />
The other database is a database which stores every items individually in order to make some get name easily in the shopping cart service it is the catalog database.<br />
The post takes 5 arguments which are name,price,image_url,category and id of each product and it create a document where the _id field is the name of the product<br />
The get method takes the name of the product as argument and give all the information about the product<br />
The delete method also take the name of the product in argument and erase the right document in the database because the _id = name<br />
The last databse create only one document which correspond to the expected format that the front end need to display each items it is called the format database.
```json
{
  "_id": "format",
  "_rev": "8-c9c67c5a35c8a25f15238796ccb444a1",
  "doc": {
    "Vegetable": {
      "1": {
        "name": "Brocolli",
        "price": "2",
        "image": "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/broccoli.jpg",
        "category": "Vegetable"
      },
      "2": {
        "name": "Cauliflower",
        "price": "6",
        "image": "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cauliflower.jpg",
        "category": "Vegetable"
      },
      "3": {
        "name": "Cucumber",
        "price": "5.5",
        "image": "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cucumber.jpg",
        "category": "Vegetable"
      },
      "4": {
        "name": "Beetroot",
        "price": "8.7",
        "image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/beetroot.jpg",
        "category": "Vegetable"
      }
    },
    "Fruits": {
      "6": {
        "name": "Apple",
        "price": "2.34",
        "image": "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/apple.jpg",
        "category": "Fruits"
      },
      "7": {
        "name": "Banana",
        "price": "1.69",
        "image": "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/banana.jpg",
        "category": "Fruits"
      },
      "8": {
        "name": "Grapes",
        "price": "5.98",
        "image": "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/grapes.jpg",
        "category": "Fruits"
      },
      "9": {
        "name": "Mango",
        "price": "6.80",
        "image": "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/mango.jpg",
        "category": "Fruits"
      }
    }
  }
}
```
The post take the same arguments of the catalog database and put the item in the right category to match the good format <br />
The get return the entire document with no argument because it gets the _id format <br />
The delete takes the name as argument and get the catalog database to have more information about the product and remove it in the database format. If the item is the last of its category the category is also removed.<br />
The database with the list of all names is useful to know how much items we have in the catalog. The catalog is useful to get the informations of each product if we know its name and the format is useful for the front-end view.<br />
This service is used by the shopping cart service to get every detail about each products that are adds in the shopping cart


