// expressJS implementation
const express = require('express');
const morgan = require('morgan');
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 8080;
// socketIO implementation
const httpServer = createServer(app);

const io = new Server(httpServer, {
  allowEIO3: true
});

// server-side array for keeping track of users in a room
let userList = [];

// for GETTING html pages + static files (CSS, images, etc)
app.use( express.static('public') );
// for POSTING JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connecting to routing file
require('./app/routes/apiRoute.js')(app, userList);
require("./app/routes/tutorial.routes.js")(app, userList);

require("./app/routes/user.js")(app, userList);
require("./app/routes/treeCategory.js")(app, userList);
require("./app/routes/tree.js")(app, userList);
require("./app/routes/work.js")(app, userList);
require("./app/routes/address.js")(app, userList);
require("./app/routes/chatbot.js")(app, userList);
require("./app/routes/Staff.js")(app, userList);
require("./app/routes/map.js")(app, userList);
// connecting to socketIO routing

io.on('connection', (socket) => require('./app/routes/socketRoute.js')(io, socket, userList));

// start server
httpServer.listen(PORT, () => {
    console.log('listening on port', PORT);
});
