module.exports = app => {
    var router = require("express").Router();
    const message = require('../controllers/messageAI.js')

    router.get("/send", message.getMessage);
    app.use('/api', router);
}