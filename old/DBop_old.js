// Doing stuff with a database in Node.js

// Table was created with:
// CREATE TABLE PhotoLabels (fileName TEXT UNIQUE NOT NULL PRIMARY KEY, labels TEXT, favorite INTEGER)

var sqlite3 = require("sqlite3").verbose();  // use sqlite
var dbFile = "photos.db"
var db = new sqlite3.Database(dbFile);  // new object, old DB

function errorCallback(err) {
  if (err) {
		console.log("error: ",err,"\n");
  }
}

// function dataCallback(err, tableData) {
//   if (err) {
// 		console.log("error: ",err,"\n");
//   } else {
// 		console.log("got: ",tableData,"\n");
//   }
// }


function insertIntoDB(fname) {
	db.run(
		'INSERT OR REPLACE INTO photoLabels VALUES (?, "", 0)',
		[fname],
		errorCallback);
}

function dumpDB(query, response) {
	db.all('SELECT * FROM photoLabels',dataCallback);
	function dataCallback(err, tableData) {
    if (err) {
			console.log("error: ",err,"\n");
    } else {
			// console.log("got: ",tableData,"\n");
			response.status(200);
			response.type("text/json");
			response.send(tableData);
    }
	}
}

exports.insertIntoDB = insertIntoDB;
exports.dumpDB = dumpDB;