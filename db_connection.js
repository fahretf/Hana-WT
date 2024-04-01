var mysql = require('mysql');
var con = mysql.createConnection({
 host: "mysql-db",
 user: "root",
 password: "root",
 port: 3306
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Povezan!");
    con.query("CREATE DATABASE wt22", function
   (err, result) {
    if (err) throw err;
    console.log("Baza kreirana");
    });
   });
