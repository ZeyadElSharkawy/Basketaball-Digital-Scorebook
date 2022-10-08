var mysql = require("mysql");

function dbQuery(sql, callback) {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "scorebook",
  });

  con.connect(function (err) {
    if (err) console.log(err);
    con.query(sql, function (err, result) {
      if (err) console.log(err);
      callback(result);
    });
  });
}

module.exports = dbQuery;
