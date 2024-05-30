var mysql = require('mysql');
var con = mysql.createConnection({
 host: `${process.env.MYSQL_DB_HOST}`,
 user: `${process.env.MYSQL_USER}`,
 password: `${process.env.MYSQL_PASSWORD}`,
 port: 3306
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Povezan!");
    con.query("CREATE DATABASE DBWT19", function
   (err, result) {
    if (err) throw err;
    console.log("Baza kreirana");
    });
   });
