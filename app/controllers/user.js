const md5 = require('md5');
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const User1 = require("../models/user1.js");
const { findByName } = require('../models/tree.js');
const rooms = require('../models/rooms');

function validatEmail(x) {
  var atposition = x.indexOf("@");
  var dotposition = x.lastIndexOf(".");
  if (atposition < 1 || dotposition < (atposition + 2)
          || (dotposition + 2) >= x.length) {
      return false;
  }
  return true;
}


exports.create = (req, res) => {
  try {
  if (!req.body.login_name || !req.body.user_name || !req.body.email || !req.body.password) {
    res.status(400).json({message :'Vui lòng nhập đầy đủ thông tin.'});
  } else if (!validatEmail(req.body.email)){
      res.status(400).json({message :'Email chưa chính xác. Vui lòng nhập lại.'});
    } else {
  const user = new User({
    login_name: req.body.login_name,
    user_name: req.body.user_name,
    avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    email: req.body.email,
    password: req.body.password,
  });

  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else { 
      rooms.addNewRoom(data.id)
            .then(result => console.log(`Room: ${data.id} is added to database!`))
            .catch(error => console.log(error));
            
      res.status(200).json({message :'Bạn đã đăng ký thành công. Vui lòng đăng nhập để sử dụng.'});
    }
  });}
} catch (error) {
  res.send({ message:'Lỗi.' });
}
};

exports.findOne = (req, res) => {
  try{
  User.findById(req.user.id, req.user.id_role, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.id
        });
      }
    } else res.send(data[0]);
  });
} catch (error) {
  res.send({ message:'Lỗi.' });
}
}

exports.update = (req, res) => {
  // Validate Request
  try{
  if (!req.body.login_name || !req.body.user_name || !req.body.email || !req.body.password || !req.body.avatar) {
    res.status(400).json({message :'Vui lòng nhập đầy đủ thông tin.'});
  } else if (!validatEmail(req.body.email)){
      res.status(400).json({message :'Email chưa chính xác. Vui lòng nhập lại.'});
    } else {

  User.updateById(
    req.user.id, req.user.id_role, 
    new User(req.body),
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
      } else res.status(200).json({message :'Bạn đã thay đổi thông tin thành công.'});
    }
  );
    }
  } catch (error) {
    res.status(400).json({
      message: 'Invalid token',
      status: false
    });
  }
};



exports.auth = (req, res) => {
  try{
  if (!req.body.login_name || !req.body.password) {
    res.status(400).json({message :'Vui lòng nhập đầy đủ thông tin.'});
  }  else {
  User.auth(req.body.login_name, md5(req.body.password) , (err, data) => {
    let token;
    if (err) {
      User.authEmployee(req.body.login_name, md5(req.body.password) , (err, data) => {
        let token;
        if (err) {
          res.status(400).json({message :'Tên đăng nhập hoặc mật khẩu không đúng.'});
        } else {
          // console.log(data);
          token = jwt.sign({ Account: data[0].login_name, id: data[0].id, id_role: 1 }, "qlcx", {
            expiresIn: 14400000000000000000000,
        });
        res.json({ 
          token: token ,
          id_role: 1
        });
        }
      });
    } else {
      // console.log(data);
      token = jwt.sign({ Account: data[0].login_name, id: data[0].id, id_role: 0 }, "qlcx", {
        expiresIn: 1440,
    });
    res.json({ 
      token: token ,
      id_role: 0
    });
    }
  });}
} catch (error) {
  res.send({ message:'Lỗi.' });
}
};


exports.address = (req, res) => {  
  try {
  User.address(
    req.user.id,  
    new User(req.body),
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
      } else res.status(200).json({message :'Bạn đã thay đổi thông tin thành công.'});
    }
  )
} catch (error) {
  res.send({ message:'Lỗi.' });
}
    }


