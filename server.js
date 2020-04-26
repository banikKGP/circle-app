const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require('socket.io')(http);
/**
 * @external bodyParser
 * @description Parse incoming request bodies in a middleware before your handlers,
 * available under the req.body property. This does not handle multipart bodies,
 * due to their complex and typically large nature
 */
bodyParser = require("body-parser");
/**
   * @external busboyBodyParser
   * @description It will add regular fields to req.body as per body-parser but
   * will also add uploaded files to req.files
   */
busboyBodyParser = require("busboy-body-parser");

const { connectionConfig } = require("./config/app");
const socketHandler =  require("./config/socket-handler")
//connection to database
require("./config/db");

//establishing socket connection
require("./config/socket-handler")(io);


app.use(bodyParser.urlencoded({extended: true, limit: "250mb"}));
app.use(bodyParser.json({limit: "250mb"}));
app.use(busboyBodyParser({limit: "250mb", multi: true}));

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header(
     "Access-Control-Allow-Headers",
     "Origin, Authorization, Content-Type, Accept"
   );
   res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE"
  );
   next();
 });

require("./routes")(app);

const port = connectionConfig.clientMsPort || 3000;
http.listen(port, () => console.log(`Listening on port ${port}...`));
