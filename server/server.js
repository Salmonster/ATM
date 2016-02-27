var express = require("express");
var Path = require("path");
var routes = express.Router();
var browserify = require("browserify-middleware");


var runServer = function(db) {
  routes.get("/app-bundle.js", browserify("./src/ATM.js"));

  // Default path for static assets (html, etc.)
  var assetFolder = Path.resolve(__dirname, "../");
  routes.use(express.static(assetFolder));

  // Parse incoming request bodies as JSON
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
    db.update("amount", req.body.transaction)
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

  routes.get("/test", function(req, res){
    res.sendFile( assetFolder + "/spec/SpecRunner.html" );
  })

  // The Catch-all Route
  routes.get("/*", function(req, res){
    res.sendFile( assetFolder + "/index.html" );
  })

  // Create our Express instance then mount our main router using routes defined above.
  var app = express();
  app.use("/", routes);

  // Start the server
  var port = process.env.PORT || 4000;
  console.log("Listening on port", port);
  return app.listen(port);
}

module.exports = runServer;
