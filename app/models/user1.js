const sql = require("./db.js");
const md5 = require('md5');

// constructor
const User1 = function(user1) {
  this.longitude = user1.longitude;
  this.latitude = user1.latitude;
};


User1.updateByAddress = (id, user1, result) => {
  console.log(id);
    sql.query(
      "UPDATE employee SET longitude = ?, latitude = ? WHERE id = ?",
      [user1.longitude, user1.latitude, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated user: ", { id: id, ...user1 });
        result(null, { id: id, ...user1[0] });
      }
    );
  }



module.exports = User1;
