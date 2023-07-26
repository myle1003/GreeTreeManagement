const Address = require("../models/address.js");

exports.findWard = (req, res) => {
  try {
  Address.findWardsById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found tree wards with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving wards with id " + req.params.id
        });
      }
    } else res.send(data);
  });
} catch (error) {
  res.send({ message:'Lỗi.' });
}
};

exports.findCities = (req, res) => {
  try {
  Address.findCitiesById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found tree city with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving city with id " + req.params.id
        });
      }
    } else res.send(data);
  });
} catch (error) {
  res.send({ message:'Lỗi.' });
}
};

exports.findProvinces = (req, res) => {
  try {
  Address.findProvincesById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found tree province with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving province with id " + req.params.id
        });
      }
    } else res.send(data);
  });
} catch (error) {
  res.send({ message:'Lỗi.' });
}
};


