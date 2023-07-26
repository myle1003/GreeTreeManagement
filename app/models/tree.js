const sql = require("./db.js");

// constructor
const Tree = function(tree) {
  this.id = tree.id;
  this.name = tree.name;
  this.description = tree.description;
  this.id_category = tree.id_category;
  this.image = tree.image;
};

Tree.getAll = (title, result) => {
  let query = "SELECT * FROM tree_examp ORDER BY tree_examp.name ASC";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tree: ", res);
    result(null, res);
  });
};

Tree.findById = (id, result) => {
  sql.query(`SELECT * FROM tree_examp WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("tree: ", res[0]);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Tree.findByIdCategory = (id_category, result) => {
  sql.query(`SELECT * FROM tree_examp WHERE id_category = ${id_category}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("tree: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Tree.findByName = (name, result) => {
  sql.query(`SELECT * FROM tree_examp WHERE name LIKE '%${name}%'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("tree: ", res[0]);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};
module.exports = Tree;
