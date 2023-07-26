module.exports = app => {
  const chatbox = require("../controllers/chatbox.js");

  var router = require("express").Router();


  router.get("/", chatbox.findAll);

  app.use('/api/chatbox', router);
};
