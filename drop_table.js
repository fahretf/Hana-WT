var mysql = require('mysql2');

var con = mysql.createConnection({
  host: `${process.env.MYSQL_DB_HOST}`,
  user: `${process.env.MYSQL_USER}`,
  password: `${process.env.MYSQL_PASSWORD}`,
  database: "DBWT19"
});

con.connect(function(err) {
  if (err) throw err;
  var sql = "DROP TABLE prisustvos, predmets, nastavniks, students";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table deleted");
  });
});