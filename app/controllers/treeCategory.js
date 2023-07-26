const TreeCategory = require("../models/treeCategory.js");

exports.findAll = (req, res) => {
  try {
  const title = req.query.title;

  TreeCategory.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message 
      });
    else res.send(data);
  });
} catch (error) {
  res.send({ message:'Lỗi.' });
}
};

exports.findOne = (req, res) => {
  try {
  TreeCategory.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found tree category with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving tree category with id " + req.params.id
        });
      }
    } else res.send(data);
  });
} catch (error) {
  res.send({ message:'Lỗi.' });
}
};


