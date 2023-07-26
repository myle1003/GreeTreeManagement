const Map = require("../models/map.js");

exports.findAll = (req, res) => {
  try {
  const title = req.query.title;

  Map.getAll(title, (err, data) => {
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

