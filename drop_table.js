var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "wt22"
});

con.connect(function(err) {
  if (err) throw err;
  var sql = "DROP TABLE prisustvos, predmets, nastavniks, students";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table deleted");
  });
});