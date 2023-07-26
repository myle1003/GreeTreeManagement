module.exports = app => {
  const map = require("../controllers/map.js");

  var router = require("express").Router();


  router.get("/all", map.findAll);


  app.use('/api/map', router);
};
