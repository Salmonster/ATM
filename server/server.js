var express = require("express");
var Path = require("path");
var routes = express.Router();
var browserify = require("browserify-middleware");
var db = require("../src/config");


routes.get("/app-bundle.js", browserify("./src/ATM.js"));
//
// Static assets (html, etc.)
//
var assetFolder = Path.resolve(__dirname, "../");
routes.use(express.static(assetFolder));

routes.use(require("body-parser").json());

routes.get("/api/balance", function(req, res) {
  db.select("amount")
    .from("pins")
    .where("pin", "=", req.query.pin)
    .asCallback(function(err, rows) {
      if (err || !rows.length) {
        res.status(400);
        res.json({Error: err});
      } else {
        res.json({balance: rows[0].amount});
      }
    })
})

routes.post("/api/transact", function(req, res) {
  console.log("req.body:", req.body.amount);
  console.log("req.query.pin:", req.query.pin);
  db.update("amount", req.body.amount)
    .from("pins")
    .where("pin", "=", req.query.pin)
    .asCallback(function(err, rows) {
      if (err) {
        res.status(400);
        res.json({Error: err});
      } else {
        res.sendStatus(200);
      }
    })
})

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
