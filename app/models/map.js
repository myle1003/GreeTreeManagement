const sql = require("./db.js");

// constructor
const Map = function(map) {
  this.id = map.id;
  this.name = map.name;
  this.treeCode = map.treeCode;
  this.longitude = map.longitude;
  this.latitude = tree.latitude;
  this.size = tree.size;
};

Map.getAll = (title, result) => {
  let query = `SELECT tree.id, tree.name, tree.tree_code, tree.longitude, tree.latitude,
  tree.size, tree.status, tree.image, tree.address, 
  provinces.name as provinces_name, cities.name as cities_name,
  wards.name as wards_name  
  from tree 
      left join tree_category cate on cate.id = tree.id_category 
      left join wards on wards.id = tree.wards
      left join cities on cities.id = tree.cities
      left join provinces on provinces.id = tree.provinces`;

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


module.exports = Map;
