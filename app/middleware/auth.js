const jwt = require("jsonwebtoken");
// require("dotenv").config();

async function auth(req, res, next) {
  const token = req.headers?.authorization?.split(" ")[1]
  if (!token) {
    res.status(401).json({
      message: "Vui lòng đăng nhập để sử dụng."
    });
  } else {
    try {
      const decoded = jwt.verify(token, "qlcx");
      req.user = decoded;
      console.log(req.user );
      console.log('sfs' );
      console.log(req.user.id );
      next();
    } catch (ex) {
      res.status(400).json({
        message: "Token đã hết hạn, bạn hãy đăng nhập lại"
      });
    }
  }
}
module.exports = auth;
