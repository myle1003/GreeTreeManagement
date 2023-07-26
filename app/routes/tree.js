module.exports = app => {
  const tree = require("../controllers/tree.js");

  var router = require("express").Router();


  router.get("/all", tree.findAll);

  router.get("/find/:id", tree.findOne);

  router.get("/findByCate/:id_category", tree.findSome);

  router.get("/search", tree.findTreeByName);

  app.use('/api/tree', router);
};
