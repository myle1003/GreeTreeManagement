const Work = require("../models/work.js");



exports.update = (req, res) => {
try {
  Work.updateById(
    req.params.id,
    req.body.status,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Bạn không có việc vào ngày này.`
          });
        } else {
          res.status(500).send({
            message: "Error updating work"
          });
        }
      } else res.send(data);
    }
  );
} catch (error) {
  res.send({ message:'Lỗi.' });
}
};

exports.findSome = (req, res) => {
  try {
  Work.findByIdEmployee(req.user.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Bạn không có việc vào ngày này.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving work"
        });
      }
    } else res.send(data);
  });
} catch (error) {
  res.send({ message:'Lỗi.' });
}
};

exports.findByFilter = (req, res) => {
  try {
  console.log(req.user.id);
  Work.findByFilter(req.user.id, req.body.start_day,(err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Bạn không có việc vào ngày này.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving work"
        });
      }
    } else res.send(data);
  });
} catch (error) {
  res.send({ message:'Lỗi.' });
}
};

exports.findDetail = (req, res) => {
  try {
  Work.findDetail(req.params.id ,(err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Bạn không có việc vào ngày này.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving work"
        });
      }
    } else res.send(data);
  });
} catch (error) {
  res.send({ message:'Lỗi.' });
}
};

