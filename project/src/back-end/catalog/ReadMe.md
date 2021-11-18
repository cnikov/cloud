# Catalog Service

This service use 3 databases. One is a list of every name of items in the catalog it is called allitems in couchdb and listitem in the back-end <br />
The post method takes the name of the item and add it in the list by getting the id allItems or creating a new list with the product name if the database does not exist.<br />
The get method need an id which has to be allItems because it is the id of the database file. It returns the list of all the product's name<br />
The delete method takes the name of item that has to be removed and remove it to the list by getting it and re inserting it into the database.<br />
The other database is a database which stores every items individually in order to make some get name easily in the shopping cart service.<br />
The post takes 5 arguments which are name,price,image_url,category and id of each product and it create a document where the _id field is the name of the product<br />
The get method takes the name of the product as argument 
