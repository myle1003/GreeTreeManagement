module.exports = app => {
  const treeCategory = require("../controllers/treeCategory.js");

  var router = require("express").Router();


  router.get("/all", treeCategory.findAll);

  router.get("/find/:id", treeCategory.findOne);

  app.use('/api/category', router);
};
