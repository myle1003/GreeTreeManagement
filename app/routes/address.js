module.exports = app => {
  const address = require("../controllers/address.js");

  var router = require("express").Router();


 

  router.get("/wards/:id", address.findWard);

  router.get("/cities/:id", address.findCities);

  router.get("/provinces/:id", address.findProvinces);

  app.use('/api/address', router);
};
