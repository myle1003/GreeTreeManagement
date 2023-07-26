const sql = require("./db.js");
const md5 = require('md5');

// constructor
const User = function(user) {
  this.login_name = user.login_name;
  this.user_name = user.user_name;
  this.avatar = user.avatar;
  this.email = user.email;
  this.password = user.password;
};

User.findById = (id,id_role, result) => {
  if (id_role == 0 ){
    sql.query(`SELECT id, login_name, user_name, email, avatar FROM customer_user WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("user: ", res[0]);
        result(null, res);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  } else {
    sql.query(`SELECT id, login_name, name as user_name, email, image as avatar FROM employee WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("user: ", res[0]);
        result(null, res);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  }
};

User.updateById = (id,id_role, user, result) => {
  console.log(id);
  if (id_role == 0 ){
    sql.query(
      "UPDATE customer_user SET login_name = ?, avatar = ?, user_name = ?, email = ?, password = ? WHERE id = ?",
      [user.login_name, user.avatar, user.user_name, user.email, md5(user.password), id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;user_name
        }

        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
      }
    );
  } else {
    sql.query(
      "UPDATE employee SET login_name = ?, image = ?, name = ?, email = ?, password = ? WHERE id = ?",
      [user.login_name, user.avatar, user.user_name, user.email,md5(user.password), id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;user_name
        }

        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user[0] });
      }
    );
  }
};

User.auth = (login_name, password, result) => {
  sql.query(`SELECT * FROM customer_user WHERE login_name = '${login_name}' AND password = '${password}' `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("user: ", res[0]);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

User.authEmployee = (login_name, password, result) => {
  sql.query(`SELECT * FROM employee WHERE login_name = '${login_name}' AND password = '${password}' `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("user: ", res[0]);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

User.create = (newUser, result) => {

  sql.query(`SELECT customer_user.id FROM customer_user ORDER BY customer_user.id DESC`, (err, res) => {  
    if (res.length) {
      newUser.id = res[0].id + 1;
      newUser.password = md5(newUser.password)

      sql.query("INSERT INTO customer_user SET ?", newUser, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.newUser, ...newUser });
      });
    }
  });
};

User.address = (id, user, result) => {
  console.log(id);
  if (id_role == 0 ){
    sql.query(
      "UPDATE employee SET longitude = ?, latitude = ? WHERE id = ?",
      [user.longitude, user.latitude, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;user_name
        }

        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
      }
    );
  } 
};

module.exports = User;
