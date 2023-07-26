const work = require("../routes/work.js");
const sql = require("./db.js");

// constructor
const Work = function(work) {
  this.id = tree.id;
  this.name = tree.name;
  this.level = tree.level;
  this.list_work = tree.list_work;
  this.status = tree.status;
};

Work.updateById = (id, status, result) => {
    sql.query(
      "UPDATE work SET status = ? WHERE id = ?",
      [status, id],
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

        console.log("updated work: ", { id: id, ...work });
        result(null, { id: id, ...work });
      }
    );
  
};

Work.findByIdEmployee = (id_employee, result) => {
  sql.query(`select w.id, w.name, w.start_day, w.end_day, w.level, w.status, t.name as tools_name, 
  t.description as tools_description, tree.name as tree_name, tree.tree_code
  from work_employee as e
      join work w on e.id_work = w.id 
      join work_tools wt on w.id = wt.id_work
      join tools t on t.id = wt.id_tools
      join work_tree wtree on w.id = wtree.id_work
      join tree on tree.id = wtree.id_tree
      where e.id_employee = ${id_employee} 
      ORDER BY w.level DESC `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("work: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};
// join from (select * from work uw where uw.start_day = ${start_day}) w on e.id_work = w.id 

Work.findByFilter = (id_employee, start_day, result) => {
  console.log(id_employee);
  console.log(start_day);
  sql.query(`select distinct w.id, w.name, w.level, w.status
  from work_employee as e
      left join work w on e.id_work = w.id 
      left join work_tools wt on w.id = wt.id_work
      left join tools t on t.id = wt.id_tools
      left join work_tree wtree on w.id = wtree.id_work
      left join tree on tree.id = wtree.id_tree
      where e.id_employee = ${id_employee} 
      and w.start_day <= '${start_day}' 
      and w.end_day >= '${start_day}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("work: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Work.findDetail = (id, result) => {
  sql.query(`select w.id, w.name, w.start_day, w.end_day, w.level, w.status, t.name as tools_name, 
  t.description as tools_description, tree.name as tree_name, tree.tree_code, tree.size as tree_size,
  tree.longitude as tree_longitude, tree.latitude as tree_latitude, 
  tree.take_care_day as tree_take_care_day, provinces.name as tree_provinces,
  cities.name as tree_cities, wards.name as tree_wards, tree.address as tree_address, tree.image as tree_image
  from work as w
      join work_tools wt on w.id = wt.id_work
      join tools t on t.id = wt.id_tools
      join work_tree wtree on w.id = wtree.id_work
      join tree on tree.id = wtree.id_tree 
      join wards on wards.id = tree.wards
      join cities on cities.id = tree.cities
      join provinces on provinces.id = tree.provinces
      where w.id = ${id} `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("work: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};


// Work.findByFilter = (id_employee, start_day, result) => {
//   console.log(id_employee);
//   console.log(start_day);
//   sql.query(`select w.id, w.name, w.start_day, w.end_day, w.level, w.status, t.name as tools_name, 
//   t.description as tools_description, tree.name as tree_name, tree.tree_code
//   from work_employee as e
//       left join work w on e.id_work = w.id 
//       left join work_tools wt on w.id = wt.id_work
//       left join tools t on t.id = wt.id_tools
//       left join work_tree wtree on w.id = wtree.id_work
//       left join tree on tree.id = wtree.id_tree
//       where e.id_employee = ${id_employee} 
//       and w.start_day <= '${start_day}' 
//       and w.end_day >= '${start_day}' 
//       ORDER BY w.start_day ASC, w.end_day ASC, w.level DESC `, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log("work: ", res);
//       result(null, res[0]);
//       return;
//     }

//     result({ kind: "not_found" }, null);
//   });
// };

module.exports = Work;
