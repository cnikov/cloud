var fs = require(“fs”);
console.log(“\n *START transformation* \n”);
var content = fs.readFileSync(”db.json”);
var json = JSON.parse(content);
var docs = json.rows;
var newDocs = new Array();
docs.forEach(function(doc) {
var innerdoc = doc.doc;
delete innerdoc._rev;
newDocs.push(innerdoc);
});
var newJson = new Object();
newJson.docs = newDocs;
var newContent = JSON.stringify(newJson)
fs.writeFile(’db_u.json’, newContent, ‘utf8’, function(err) {
if (err) throw err;
console.log(‘complete’);
});
console.log(“\n *DONE transformation!* \n”);
