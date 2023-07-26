const jwt = require("jsonwebtoken");
// require("dotenv").config();

async function auth1(req, res, next) {
  const token = req.headers?.authorization?.split(" ")[1]
  if (!token) {
    req.user= {id :1, id_role:1};
    // req.user.id_role = 0;
    next();
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
module.exports = auth1;
