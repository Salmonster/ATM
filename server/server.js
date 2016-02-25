var express = require("express");
var Path = require("path");
var routes = express.Router();
var db = require("../src/config");


// routes.get("/api/tags-example", function(req, res) {
//   res.send(["node", "express"])
// })

//
// Static assets (html, etc.)
//
var assetFolder = Path.resolve(__dirname, "../");
routes.use(express.static(assetFolder));

// The Catch-all Route
//
routes.get("/*", function(req, res){
  res.sendFile( assetFolder + "/index.html" );
})

var app = express();

// Parse incoming request bodies as JSON
// app.use( require("body-parser").json() )

// Mount our main router
app.use("/", routes)

// Start the server
var port = process.env.PORT || 4000;
app.listen(port);
console.log("Listening on port", port);
