const sql = require("./db.js");

// constructor
const Address = function(address) {
  this.id = address.id;
  this.name = address.name;
};

Address.findWardsById = (id, result) => {
  sql.query(`SELECT * FROM wards WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("category: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Address.findCitiesById = (id, result) => {
  sql.query(`SELECT * FROM cities WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("category: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Address.findProvincesById = (id, result) => {
  sql.query(`SELECT * FROM provinces WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("category: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};
module.exports = Address;
