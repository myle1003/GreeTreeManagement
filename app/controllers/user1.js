const md5 = require('md5');
const jwt = require("jsonwebtoken");
const User1 = require("../models/user1.js");

exports.updateAddress = (req, res) => {
  // Validate Request
  if (!req.body.longitude || !req.body.latitude) {
    res.status(400).json({message :'Vui lòng nhập đầy đủ thông tin.'});
  } else  {
console.log(req.body.longitude);
  User1.updateByAddress(
    req.user.id, new User1(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Không tìm thấy người dùng .`
          });
        } else {
          res.status(500).send({
            message: "Error updating User"
          });
        }
      } else res.status(200).json({message :'Bạn đã cập nhập vị trí thành công.'});
    }
  );
    }
};



