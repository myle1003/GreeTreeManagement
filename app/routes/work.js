module.exports = app => {
  const work = require("../controllers/work.js");
  const auth = require('../middleware/auth');

  var router = require("express").Router();

  router.put("/update/:id", work.update);

  router.get("/all", auth, work.findSome);

  router.post("/filter", auth, work.findByFilter);

  router.get("/find/:id", work.findDetail);

  app.use('/api/work', router);
};
