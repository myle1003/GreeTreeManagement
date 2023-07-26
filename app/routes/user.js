module.exports = app => {
  const user = require("../controllers/user.js");  
  const user1 = require("../controllers/user1.js");  
  const auth = require('../middleware/auth');

  var router = require("express").Router();


  router.post("/login", user.auth);

  router.post("/register", user.create);

  router.get("/info", auth, user.findOne);

  router.put("/update", auth, user.update);

  router.put("/address", auth, user1.updateAddress);

  router.post("/address", auth, user.address);

  app.use('/api/user', router);
};
